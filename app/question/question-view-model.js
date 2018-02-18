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
        this._showAnswerFlag = false;
        if (this._state.questionNumber > 1) {
            this._state.questionNumber = this._state.questionNumber - 1;
            this._question = this._state.questions[this._state.questionNumber - 1];
            this.saveAndPublish(this._mode, this._state);
        }
    };
    QuestionViewModel.prototype.next = function () {
        var _this = this;
        if ((this._state.questionNumber < this._state.totalQuestions) || this.isPractice()) {
            if (this._state.questions.length > 0 && this._state.questions.length > this._state.questionNumber) {
                this._state.questionNumber = this._state.questionNumber + 1;
                this._question = this._state.questions[this._state.questionNumber - 1];
                this.saveAndPublish(this._mode, this._state);
            }
            else {
                this._questionService.getNextQuestion().then(function (que) {
                    _this._state.questionNumber = _this._state.questionNumber + 1;
                    _this._question = que;
                    _this._state.questions.push(_this._question);
                    _this.saveAndPublish(_this._mode, _this._state);
                });
            }
        }
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
                this._question = { description: '', options: [] };
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
    Object.defineProperty(QuestionViewModel.prototype, "message", {
        get: function () {
            return this.message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionViewModel.prototype, "showAnswerFlag", {
        get: function () {
            return this._showAnswerFlag;
        },
        enumerable: true,
        configurable: true
    });
    QuestionViewModel.prototype.publish = function () {
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'question', value: this._question });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'options', value: this._question.options });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'state', value: this._state });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'questionNumber', value: this._state.questionNumber });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'showAnswerFlag', value: this._showAnswerFlag });
    };
    QuestionViewModel.prototype.showResult = function () {
        this._settingsService.clearCache(this._mode);
        this._state.mode = this._mode;
        navigationModule.gotoResultPage(this._state);
    };
    QuestionViewModel.prototype.showAnswer = function () {
        this.question.options.forEach(function (option) { return option.show = true; });
        this.publish();
    };
    QuestionViewModel.prototype.selectOption = function (args) {
        var selectedOption = args.view.bindingContext;
        this.question.options.forEach(function (item, index) {
            if (item.tag === selectedOption.tag) {
                item.selected = true;
            }
            else {
                item.selected = false;
            }
        });
        this.question.skipped = false;
        this.saveAndPublish(this._mode, this._state);
    };
    QuestionViewModel.prototype.saveAndPublish = function (_mode, _state) {
        this._settingsService.saveCache(this._mode, this._state);
        this.publish();
    };
    return QuestionViewModel;
}(observable_1.Observable));
exports.QuestionViewModel = QuestionViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBc0M7QUFDdEMsOENBQXNEO0FBRXRELGlFQUE2RDtBQUM3RCxpRUFBNkQ7QUFDN0QsdURBQXlEO0FBRXpEO0lBQXVDLHFDQUFVO0lBVzdDLDJCQUFZLElBQVc7UUFBdkIsWUFDSSxpQkFBTyxTQU1WO1FBTEcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLHlDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9KLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENB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ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHtFdmVudERhdGEsIE9ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7SU9wdGlvbiwgSVF1ZXN0aW9uLCBTdGF0ZX0gZnJvbSBcIi4uL3NoYXJlZC9xdWVzdGlvbnMubW9kZWxcIjtcbmltcG9ydCB7UXVlc3Rpb25TZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvcXVlc3Rpb24uc2VydmljZVwiO1xuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9zZXR0aW5ncy5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBuYXZpZ2F0aW9uTW9kdWxlIGZyb20gJy4uL3NoYXJlZC9uYXZpZ2F0aW9uJztcblxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25TZXJ2aWNlOiBRdWVzdGlvblNlcnZpY2U7XG4gICAgcHJpdmF0ZSBfc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U7XG5cbiAgICBwcml2YXRlIF9xdWVzdGlvbjogSVF1ZXN0aW9uO1xuICAgIHByaXZhdGUgX3N0YXRlOiBTdGF0ZTtcbiAgICBwcml2YXRlIF9xdWVzdGlvbk51bWJlcjogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfc2hvd0Fuc3dlckZsYWc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfbW9kZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IobW9kZTpzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25TZXJ2aWNlID0gUXVlc3Rpb25TZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZSA9IFNldHRpbmdzU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3NldHRpbmdzU2VydmljZS5yZWFkQ2FjaGUobW9kZSk7XG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLnNob3dGcm9tU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dGcm9tU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAhPSAwICYmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID49IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIHx8IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID09PSB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2hvd0Fuc3dlckZsYWcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDE7XG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xuICAgICAgICAgICAgdGhpcy5zYXZlQW5kUHVibGlzaCh0aGlzLl9tb2RlLCB0aGlzLl9zdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0KCk6IHZvaWQge1xuICAgICAgICBpZiAoKHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIDwgdGhpcy5fc3RhdGUudG90YWxRdWVzdGlvbnMpIHx8IHRoaXMuaXNQcmFjdGljZSgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA+IDAgJiYgdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA+IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVBbmRQdWJsaXNoKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb25TZXJ2aWNlLmdldE5leHRRdWVzdGlvbigpLnRoZW4oKHF1ZTogSVF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgKyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHF1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25zLnB1c2godGhpcy5fcXVlc3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVBbmRQdWJsaXNoKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHF1aXQoKTogdm9pZCB7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBxdWl0P1wiKS50aGVuKChwcm9jZWVkKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvY2VlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWJtaXQoKTogdm9pZCB7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdWJtaXQ/XCIpLnRoZW4oKHByb2NlZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBxdWVzdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuX3F1ZXN0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0ge2Rlc2NyaXB0aW9uOicnICwgb3B0aW9uczogW119XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uO1xuICAgIH1cblxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IGFsbFF1ZXN0aW9uc0Fza2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA9PSB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucztcbiAgICB9XG5cbiAgICBpc1ByYWN0aWNlKCk6Ym9vbGVhbntcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGUgPT09IFNldHRpbmdzU2VydmljZS5QUkFDVElDRTtcbiAgICB9XG5cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uLm9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IHF1ZXN0aW9uTnVtYmVyKCkge1xuICAgICAgICB0aGlzLl9xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyO1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25OdW1iZXI7XG4gICAgfVxuXG4gICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dBbnN3ZXJGbGFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0Fuc3dlckZsYWc7XG4gICAgfVxuXG4gICAgcHVibGljIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAncXVlc3Rpb24nLCB2YWx1ZTogdGhpcy5fcXVlc3Rpb259KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdvcHRpb25zJywgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uLm9wdGlvbnN9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdzdGF0ZScsIHZhbHVlOiB0aGlzLl9zdGF0ZX0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9uTnVtYmVyJywgdmFsdWU6IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAnc2hvd0Fuc3dlckZsYWcnLCB2YWx1ZTogdGhpcy5fc2hvd0Fuc3dlckZsYWd9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd1Jlc3VsdCgpIHtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLmNsZWFyQ2FjaGUodGhpcy5fbW9kZSk7XG4gICAgICAgIHRoaXMuX3N0YXRlLm1vZGUgPSB0aGlzLl9tb2RlO1xuICAgICAgICBuYXZpZ2F0aW9uTW9kdWxlLmdvdG9SZXN1bHRQYWdlKHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBzaG93QW5zd2VyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnF1ZXN0aW9uLm9wdGlvbnMuZm9yRWFjaChvcHRpb249PiBvcHRpb24uc2hvdz10cnVlKTtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0T3B0aW9uKGFyZ3M6IGFueSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRPcHRpb246SU9wdGlvbiA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dDtcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5vcHRpb25zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZihpdGVtLnRhZyA9PT0gc2VsZWN0ZWRPcHRpb24udGFnKXtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucXVlc3Rpb24uc2tpcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNhdmVBbmRQdWJsaXNoKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZUFuZFB1Ymxpc2goX21vZGU6IHN0cmluZywgX3N0YXRlOiBTdGF0ZSkge1xuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZUNhY2hlKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxufSJdfQ==