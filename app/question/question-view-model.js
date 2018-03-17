"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs = require("ui/dialogs");
var observable_1 = require("data/observable");
var question_service_1 = require("../services/question.service");
var settings_service_1 = require("../services/settings.service");
var navigationModule = require("../shared/navigation");
var QuestionViewModel = /** @class */ (function (_super) {
    __extends(QuestionViewModel, _super);
    function QuestionViewModel(mode) {
        var _this = _super.call(this) || this;
        _this._questionService = question_service_1.QuestionService.getInstance();
        _this._settingsService = settings_service_1.SettingsService.getInstance();
        _this._state = _this._settingsService.readCache(mode);
        _this._mode = mode;
        _this.showFromState();
        return _this;
    }
    QuestionViewModel.prototype.showFromState = function () {
        if (this._state.questionNumber != 0 && (this._state.questions.length >= this._state.questionNumber || this._state.questionNumber === this._state.totalQuestions)) {
            this._question = this._state.questions[this._state.questionNumber - 1];
        }
        else {
            this.next();
        }
    };
    QuestionViewModel.prototype.previous = function () {
        if (this._state.questionNumber > 1) {
            this._state.questionNumber = this._state.questionNumber - 1;
            this._question = this._state.questions[this._state.questionNumber - 1];
            this.saveAndPublish(this._mode, this._state);
        }
    };
    QuestionViewModel.prototype.next = function () {
        if ((this._state.questionNumber < this._state.totalQuestions) || this.isPractice()) {
            if (this._state.questions.length > 0 && this._state.questions.length > this._state.questionNumber) {
                this._state.questionNumber = this._state.questionNumber + 1;
                this._question = this._state.questions[this._state.questionNumber - 1];
                this.saveAndPublish(this._mode, this._state);
            }
            else {
                QuestionViewModel.attempt = true;
                this.fetchUniqueQuestion();
            }
        }
    };
    QuestionViewModel.prototype.fetchUniqueQuestion = function () {
        var _this = this;
        this._questionService.getNextQuestion().then(function (que) {
            if (!_this.alreadyAsked(que)) {
                _this._state.questionNumber = _this._state.questionNumber + 1;
                _this._question = que;
                _this._state.questions.push(_this._question);
                _this.saveAndPublish(_this._mode, _this._state);
                QuestionViewModel.attempt = false;
            }
            else {
                if (_this._settingsService.allQuestionsAsked(_this.state.questions.length)) {
                    _this.fetchUniqueQuestion();
                }
                else {
                    dialogs.confirm("Hurray!! You are done practicing all the questions. Click Ok to restart.").then(function (proceed) {
                        if (proceed) {
                            settings_service_1.SettingsService.getInstance().clearCache(_this._mode);
                            navigationModule.toPage("question/practice");
                        }
                    });
                }
            }
        });
    };
    QuestionViewModel.prototype.alreadyAsked = function (newQuestion) {
        var result = this.state.questions.find(function (question) { return question.number === newQuestion.number; });
        var alreadyAsked = result != null;
        return alreadyAsked;
    };
    QuestionViewModel.prototype.quit = function () {
        var _this = this;
        dialogs.confirm("Are you sure you want to quit?").then(function (proceed) {
            if (proceed) {
                _this.showResult();
            }
        });
    };
    QuestionViewModel.prototype.submit = function () {
        var _this = this;
        dialogs.confirm("Are you sure you want to submit?").then(function (proceed) {
            if (proceed) {
                _this.showResult();
            }
        });
    };
    Object.defineProperty(QuestionViewModel.prototype, "question", {
        get: function () {
            if (!this._question) {
                this._question = { description: '', options: [], explanation: '' };
            }
            return this._question;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionViewModel.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionViewModel.prototype, "allQuestionsAsked", {
        get: function () {
            return this._state.questions.length == this._state.totalQuestions;
        },
        enumerable: true,
        configurable: true
    });
    QuestionViewModel.prototype.isPractice = function () {
        return this._mode === settings_service_1.SettingsService.PRACTICE;
    };
    Object.defineProperty(QuestionViewModel.prototype, "options", {
        get: function () {
            return this._question.options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionViewModel.prototype, "questionNumber", {
        get: function () {
            this._questionNumber = this._state.questionNumber;
            return this._questionNumber;
        },
        enumerable: true,
        configurable: true
    });
    QuestionViewModel.prototype.publish = function () {
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'question',
            value: this._question
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'options',
            value: this._question.options
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'state',
            value: this._state
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'questionNumber',
            value: this._state.questionNumber
        });
    };
    QuestionViewModel.prototype.showResult = function () {
        this._settingsService.clearCache(this._mode);
        this._state.mode = this._mode;
        navigationModule.gotoResultPage(this._state);
    };
    QuestionViewModel.prototype.showAnswer = function () {
        this.question.options.forEach(function (option) { return option.show = true; });
        this.question.show = true;
        this.publish();
    };
    QuestionViewModel.prototype.selectOption = function (args) {
        var selectedOption = args.view.bindingContext;
        if (selectedOption.selected) {
            selectedOption.selected = false;
            this.question.skipped = true;
        }
        else {
            this.question.options.forEach(function (item, index) {
                if (item.tag === selectedOption.tag) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
            });
            this.question.skipped = false;
        }
        this.saveAndPublish(this._mode, this._state);
    };
    QuestionViewModel.prototype.saveAndPublish = function (_mode, _state) {
        this._settingsService.saveCache(this._mode, this._state);
        this.publish();
    };
    QuestionViewModel.prototype.showMap = function () {
        this._state.mode = this._mode;
        navigationModule.gotoQuestionMap(this._state);
    };
    return QuestionViewModel;
}(observable_1.Observable));
exports.QuestionViewModel = QuestionViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBc0M7QUFDdEMsOENBQXNEO0FBRXRELGlFQUE2RDtBQUM3RCxpRUFBNkQ7QUFDN0QsdURBQXlEO0FBR3pEO0lBQXVDLHFDQUFVO0lBVzdDLDJCQUFZLElBQVk7UUFBeEIsWUFDSSxpQkFBTyxTQU1WO1FBTEcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLHlDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9KLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENB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O0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBNUxELENBQXVDLHVCQUFVLEdBNExoRDtBQTVMWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7SU9wdGlvbiwgSVF1ZXN0aW9uLCBTdGF0ZX0gZnJvbSBcIi4uL3NoYXJlZC9xdWVzdGlvbnMubW9kZWxcIjtcclxuaW1wb3J0IHtRdWVzdGlvblNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9xdWVzdGlvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvc2V0dGluZ3Muc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBuYXZpZ2F0aW9uTW9kdWxlIGZyb20gJy4uL3NoYXJlZC9uYXZpZ2F0aW9uJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25WaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIHByaXZhdGUgX3F1ZXN0aW9uU2VydmljZTogUXVlc3Rpb25TZXJ2aWNlO1xyXG4gICAgcHJpdmF0ZSBfc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U7XHJcblxyXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb246IElRdWVzdGlvbjtcclxuICAgIHByaXZhdGUgX3N0YXRlOiBTdGF0ZTtcclxuICAgIHByaXZhdGUgX3F1ZXN0aW9uTnVtYmVyOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbW9kZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXR0ZW1wdDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2RlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uU2VydmljZSA9IFF1ZXN0aW9uU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZSA9IFNldHRpbmdzU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnJlYWRDYWNoZShtb2RlKTtcclxuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcclxuICAgICAgICB0aGlzLnNob3dGcm9tU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dGcm9tU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICE9IDAgJiYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPj0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgfHwgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPT09IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMTtcclxuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQW5kUHVibGlzaCh0aGlzLl9tb2RlLCB0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA8IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSB8fCB0aGlzLmlzUHJhY3RpY2UoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA+IDAgJiYgdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA+IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICsgMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVBbmRQdWJsaXNoKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFF1ZXN0aW9uVmlld01vZGVsLmF0dGVtcHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaFVuaXF1ZVF1ZXN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmZXRjaFVuaXF1ZVF1ZXN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uU2VydmljZS5nZXROZXh0UXVlc3Rpb24oKS50aGVuKChxdWU6IElRdWVzdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxyZWFkeUFza2VkKHF1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgKyAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSBxdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMucHVzaCh0aGlzLl9xdWVzdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVBbmRQdWJsaXNoKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcclxuICAgICAgICAgICAgICAgIFF1ZXN0aW9uVmlld01vZGVsLmF0dGVtcHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXR0aW5nc1NlcnZpY2UuYWxsUXVlc3Rpb25zQXNrZWQodGhpcy5zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hVbmlxdWVRdWVzdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0oXCJIdXJyYXkhISBZb3UgYXJlIGRvbmUgcHJhY3RpY2luZyBhbGwgdGhlIHF1ZXN0aW9ucy4gQ2xpY2sgT2sgdG8gcmVzdGFydC5cIikudGhlbigocHJvY2VlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2VlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3NTZXJ2aWNlLmdldEluc3RhbmNlKCkuY2xlYXJDYWNoZSh0aGlzLl9tb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2R1bGUudG9QYWdlKFwicXVlc3Rpb24vcHJhY3RpY2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWxyZWFkeUFza2VkKG5ld1F1ZXN0aW9uOiBJUXVlc3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5zdGF0ZS5xdWVzdGlvbnMuZmluZChxdWVzdGlvbiA9PiBxdWVzdGlvbi5udW1iZXIgPT09IG5ld1F1ZXN0aW9uLm51bWJlcik7XHJcbiAgICAgICAgbGV0IGFscmVhZHlBc2tlZCA9IHJlc3VsdCAhPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBhbHJlYWR5QXNrZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcXVpdCgpOiB2b2lkIHtcclxuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcXVpdD9cIikudGhlbigocHJvY2VlZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvY2VlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXQoKTogdm9pZCB7XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHN1Ym1pdD9cIikudGhlbigocHJvY2VlZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJvY2VlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcXVlc3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9xdWVzdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHtkZXNjcmlwdGlvbjogJycsIG9wdGlvbnM6IFtdLCBleHBsYW5hdGlvbjogJyd9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhbGxRdWVzdGlvbnNBc2tlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA9PSB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpc1ByYWN0aWNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlID09PSBTZXR0aW5nc1NlcnZpY2UuUFJBQ1RJQ0U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG9wdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uLm9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHF1ZXN0aW9uTnVtYmVyKCkge1xyXG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwdWJsaXNoKCkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncXVlc3Rpb24nLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fcXVlc3Rpb25cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ29wdGlvbnMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fcXVlc3Rpb24ub3B0aW9uc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnc3RhdGUnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fc3RhdGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9uTnVtYmVyJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLmNsZWFyQ2FjaGUodGhpcy5fbW9kZSk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUubW9kZSA9IHRoaXMuX21vZGU7XHJcbiAgICAgICAgbmF2aWdhdGlvbk1vZHVsZS5nb3RvUmVzdWx0UGFnZSh0aGlzLl9zdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Fuc3dlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnNob3cgPSB0cnVlKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdE9wdGlvbihhcmdzOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRPcHRpb246IElPcHRpb24gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XHJcbiAgICAgICAgaWYoc2VsZWN0ZWRPcHRpb24uc2VsZWN0ZWQpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZE9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uLnNraXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uLm9wdGlvbnMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnRhZyA9PT0gc2VsZWN0ZWRPcHRpb24udGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb24uc2tpcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVBbmRQdWJsaXNoKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2F2ZUFuZFB1Ymxpc2goX21vZGU6IHN0cmluZywgX3N0YXRlOiBTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5zYXZlQ2FjaGUodGhpcy5fbW9kZSwgdGhpcy5fc3RhdGUpO1xyXG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93TWFwKCkge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLm1vZGUgPSB0aGlzLl9tb2RlO1xyXG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b1F1ZXN0aW9uTWFwKHRoaXMuX3N0YXRlKTtcclxuICAgIH1cclxufSJdfQ==