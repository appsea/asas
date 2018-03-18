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
    QuestionViewModel.prototype.goToEditPage = function () {
        this._state.mode = this._mode;
        navigationModule.gotoEditPage(this._state);
    };
    return QuestionViewModel;
}(observable_1.Observable));
exports.QuestionViewModel = QuestionViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBc0M7QUFDdEMsOENBQXNEO0FBRXRELGlFQUE2RDtBQUM3RCxpRUFBNkQ7QUFDN0QsdURBQXlEO0FBR3pEO0lBQXVDLHFDQUFVO0lBVzdDLDJCQUFZLElBQVk7UUFBeEIsWUFDSSxpQkFBTyxTQU1WO1FBTEcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLHlDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9KLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENB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O0lBRU0sd0NBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQWpNRCxDQUF1Qyx1QkFBVSxHQWlNaEQ7QUFqTVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge0lPcHRpb24sIElRdWVzdGlvbiwgU3RhdGV9IGZyb20gXCIuLi9zaGFyZWQvcXVlc3Rpb25zLm1vZGVsXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25TZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvcXVlc3Rpb24uc2VydmljZVwiO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgbmF2aWdhdGlvbk1vZHVsZSBmcm9tICcuLi9zaGFyZWQvbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXkvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcbiAgICBwcml2YXRlIF9xdWVzdGlvblNlcnZpY2U6IFF1ZXN0aW9uU2VydmljZTtcclxuICAgIHByaXZhdGUgX3NldHRpbmdzU2VydmljZTogU2V0dGluZ3NTZXJ2aWNlO1xyXG5cclxuICAgIHByaXZhdGUgX3F1ZXN0aW9uOiBJUXVlc3Rpb247XHJcbiAgICBwcml2YXRlIF9zdGF0ZTogU3RhdGU7XHJcbiAgICBwcml2YXRlIF9xdWVzdGlvbk51bWJlcjogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX21vZGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgc3RhdGljIGF0dGVtcHQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IobW9kZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvblNlcnZpY2UgPSBRdWVzdGlvblNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2UgPSBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3NldHRpbmdzU2VydmljZS5yZWFkQ2FjaGUobW9kZSk7XHJcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XHJcbiAgICAgICAgdGhpcy5zaG93RnJvbVN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RnJvbVN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAhPSAwICYmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID49IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIHx8IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID09PSB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucykpIHtcclxuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDE7XHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUFuZFB1Ymxpc2godGhpcy5fbW9kZSwgdGhpcy5fc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXh0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgodGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPCB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucykgfHwgdGhpcy5pc1ByYWN0aWNlKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPiAwICYmIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPiB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciArIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlQW5kUHVibGlzaCh0aGlzLl9tb2RlLCB0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBRdWVzdGlvblZpZXdNb2RlbC5hdHRlbXB0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2hVbmlxdWVRdWVzdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmV0Y2hVbmlxdWVRdWVzdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvblNlcnZpY2UuZ2V0TmV4dFF1ZXN0aW9uKCkudGhlbigocXVlOiBJUXVlc3Rpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFscmVhZHlBc2tlZChxdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICsgMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gcXVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25zLnB1c2godGhpcy5fcXVlc3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlQW5kUHVibGlzaCh0aGlzLl9tb2RlLCB0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBRdWVzdGlvblZpZXdNb2RlbC5hdHRlbXB0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3NTZXJ2aWNlLmFsbFF1ZXN0aW9uc0Fza2VkKHRoaXMuc3RhdGUucXVlc3Rpb25zLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZldGNoVW5pcXVlUXVlc3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiSHVycmF5ISEgWW91IGFyZSBkb25lIHByYWN0aWNpbmcgYWxsIHRoZSBxdWVzdGlvbnMuIENsaWNrIE9rIHRvIHJlc3RhcnQuXCIpLnRoZW4oKHByb2NlZWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNldHRpbmdzU2VydmljZS5nZXRJbnN0YW5jZSgpLmNsZWFyQ2FjaGUodGhpcy5fbW9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kdWxlLnRvUGFnZShcInF1ZXN0aW9uL3ByYWN0aWNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFscmVhZHlBc2tlZChuZXdRdWVzdGlvbjogSVF1ZXN0aW9uKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuc3RhdGUucXVlc3Rpb25zLmZpbmQocXVlc3Rpb24gPT4gcXVlc3Rpb24ubnVtYmVyID09PSBuZXdRdWVzdGlvbi5udW1iZXIpO1xyXG4gICAgICAgIGxldCBhbHJlYWR5QXNrZWQgPSByZXN1bHQgIT0gbnVsbDtcclxuICAgICAgICByZXR1cm4gYWxyZWFkeUFza2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHF1aXQoKTogdm9pZCB7XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHF1aXQ/XCIpLnRoZW4oKHByb2NlZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0KCk6IHZvaWQge1xyXG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdWJtaXQ/XCIpLnRoZW4oKHByb2NlZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHF1ZXN0aW9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB7ZGVzY3JpcHRpb246ICcnLCBvcHRpb25zOiBbXSwgZXhwbGFuYXRpb246ICcnfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWxsUXVlc3Rpb25zQXNrZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPT0gdGhpcy5fc3RhdGUudG90YWxRdWVzdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNQcmFjdGljZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZSA9PT0gU2V0dGluZ3NTZXJ2aWNlLlBSQUNUSUNFO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvcHRpb25zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbi5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBxdWVzdGlvbk51bWJlcigpIHtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHVibGlzaCgpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9uJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdvcHRpb25zJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uLm9wdGlvbnNcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3N0YXRlJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3N0YXRlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdxdWVzdGlvbk51bWJlcicsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlclxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UmVzdWx0KCkge1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5jbGVhckNhY2hlKHRoaXMuX21vZGUpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlLm1vZGUgPSB0aGlzLl9tb2RlO1xyXG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b1Jlc3VsdFBhZ2UodGhpcy5fc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBbnN3ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5zaG93ID0gdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5zaG93ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RPcHRpb24oYXJnczogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9uOiBJT3B0aW9uID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xyXG4gICAgICAgIGlmKHNlbGVjdGVkT3B0aW9uLnNlbGVjdGVkKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbi5za2lwcGVkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbi5vcHRpb25zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50YWcgPT09IHNlbGVjdGVkT3B0aW9uLnRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uLnNraXBwZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYXZlQW5kUHVibGlzaCh0aGlzLl9tb2RlLCB0aGlzLl9zdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVBbmRQdWJsaXNoKF9tb2RlOiBzdHJpbmcsIF9zdGF0ZTogU3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZUNhY2hlKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcclxuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd01hcCgpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZS5tb2RlID0gdGhpcy5fbW9kZTtcclxuICAgICAgICBuYXZpZ2F0aW9uTW9kdWxlLmdvdG9RdWVzdGlvbk1hcCh0aGlzLl9zdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvVG9FZGl0UGFnZSgpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZS5tb2RlID0gdGhpcy5fbW9kZTtcclxuICAgICAgICBuYXZpZ2F0aW9uTW9kdWxlLmdvdG9FZGl0UGFnZSh0aGlzLl9zdGF0ZSlcclxuICAgIH1cclxufSJdfQ==