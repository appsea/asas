"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs = require("ui/dialogs");
var observable_1 = require("data/observable");
var question_service_1 = require("../services/question.service");
var settings_service_1 = require("../services/settings.service");
var navigationModule = require("../shared/navigation");
var QuestionViewModel = /** @class */ (function (_super) {
    __extends(QuestionViewModel, _super);
    function QuestionViewModel() {
        var _this = _super.call(this) || this;
        _this._questionService = question_service_1.QuestionService.getInstance();
        _this._settingsService = settings_service_1.SettingsService.getInstance();
        _this._state = _this._settingsService.readCache(settings_service_1.SettingsService.MAIN);
        _this.showFromState();
        return _this;
    }
    QuestionViewModel.prototype.showFromState = function () {
        if (this._state.questions.length > this._state.questionNumber || this._state.questionNumber === this._state.totalQuestions) {
            this._question = this._state.questions[this._state.questionNumber - 1];
        }
        else {
            this.next();
        }
    };
    QuestionViewModel.prototype.previous = function () {
        this.showAnswerFlag = false;
        if (this._state.questionNumber > 1) {
            this._state.questionNumber = this._state.questionNumber - 1;
            this._question = this._state.questions[this._state.questionNumber - 1];
            this._settingsService.saveCache(settings_service_1.SettingsService.MAIN, this._state);
            this.publish();
        }
    };
    QuestionViewModel.prototype.next = function () {
        var _this = this;
        if (this._state.questionNumber < this._state.totalQuestions) {
            if (this._state.questions.length > 0 && this._state.questions.length > this._state.questionNumber) {
                this._state.questionNumber = this._state.questionNumber + 1;
                this._question = this._state.questions[this._state.questionNumber - 1];
                this.publish();
            }
            else {
                this._questionService.getNextQuestion().then(function (que) {
                    _this._state.questionNumber = _this._state.questionNumber + 1;
                    _this._question = { question: que };
                    _this._state.questions.push(_this._question);
                    _this.publish();
                });
            }
        }
        this._settingsService.saveCache(settings_service_1.SettingsService.MAIN, this._state);
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
                this._question = { question: { description: '', options: [] } };
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
            return this._state.questions.length === this._state.totalQuestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionViewModel.prototype, "isPractice", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionViewModel.prototype, "options", {
        get: function () {
            return this._question.question.options;
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
    QuestionViewModel.prototype.publish = function () {
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'question', value: this._question });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'options', value: this._question.question.options });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'state', value: this._state });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'questionNumber', value: this._state.questionNumber });
    };
    QuestionViewModel.prototype.showResult = function () {
        this._settingsService.clearCache(settings_service_1.SettingsService.MAIN);
        navigationModule.gotoResultPage(this._state);
    };
    QuestionViewModel.prototype.showAnswer = function () {
        this.showAnswerFlag = true;
    };
    QuestionViewModel.prototype.selectOption = function (args) {
        var selectedOption = args.view.bindingContext;
        this.question.question.options.forEach(function (item, index) {
            if (item.tag === selectedOption.tag) {
                item.selected = true;
            }
            else {
                item.selected = false;
            }
        });
        this.question.question.skipped = false;
        this.publish();
    };
    return QuestionViewModel;
}(observable_1.Observable));
exports.QuestionViewModel = QuestionViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBc0M7QUFDdEMsOENBQXNEO0FBRXRELGlFQUE2RDtBQUM3RCxpRUFBNkQ7QUFDN0QsdURBQXlEO0FBRXpEO0lBQXVDLHFDQUFVO0lBVTdDO1FBQUEsWUFDSSxpQkFBTyxTQUtWO1FBSkcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGtDQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztJQUN6QixDQUFDO0lBRU8seUNBQWEsR0FBckI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3pILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRU0sb0NBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElB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LFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekIsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFsSUQsQ0FBdUMsdUJBQVUsR0FrSWhEO0FBbElZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQge0lPcHRpb24sIElRdWVzdGlvbiwgSVF1ZXN0aW9uV3JhcHBlciwgU3RhdGV9IGZyb20gXCIuLi9zaGFyZWQvcXVlc3Rpb25zLm1vZGVsXCI7XG5pbXBvcnQge1F1ZXN0aW9uU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3F1ZXN0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvc2V0dGluZ3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgbmF2aWdhdGlvbk1vZHVsZSBmcm9tICcuLi9zaGFyZWQvbmF2aWdhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBRdWVzdGlvblZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uU2VydmljZTogUXVlc3Rpb25TZXJ2aWNlO1xuICAgIHByaXZhdGUgX3NldHRpbmdzU2VydmljZTogU2V0dGluZ3NTZXJ2aWNlO1xuXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb246IElRdWVzdGlvbldyYXBwZXI7XG4gICAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlO1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uTnVtYmVyOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHNob3dBbnN3ZXJGbGFnOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uU2VydmljZSA9IFF1ZXN0aW9uU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2UgPSBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLl9zZXR0aW5nc1NlcnZpY2UucmVhZENhY2hlKFNldHRpbmdzU2VydmljZS5NQUlOKTtcbiAgICAgICAgdGhpcy5zaG93RnJvbVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RnJvbVN0YXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA+IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIHx8IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID09PSB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dBbnN3ZXJGbGFnID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxO1xuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5zYXZlQ2FjaGUoU2V0dGluZ3NTZXJ2aWNlLk1BSU4sIHRoaXMuX3N0YXRlKTtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIDwgdGhpcy5fc3RhdGUudG90YWxRdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoPjAgJiYgdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA+IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb25TZXJ2aWNlLmdldE5leHRRdWVzdGlvbigpLnRoZW4oKHF1ZTogSVF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgKyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHtxdWVzdGlvbjogcXVlfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25zLnB1c2godGhpcy5fcXVlc3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZUNhY2hlKFNldHRpbmdzU2VydmljZS5NQUlOLCB0aGlzLl9zdGF0ZSk7XG4gICAgfVxuXG4gICAgcXVpdCgpOiB2b2lkIHtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHF1aXQ/XCIpLnRoZW4oKHByb2NlZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1Ym1pdCgpOiB2b2lkIHtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHN1Ym1pdD9cIikudGhlbigocHJvY2VlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHF1ZXN0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5fcXVlc3Rpb24pe1xuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB7cXVlc3Rpb246IHtkZXNjcmlwdGlvbjonJyAsIG9wdGlvbnM6IFtdfX07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uO1xuICAgIH1cblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICAgIH1cblxuICAgIGdldCBhbGxRdWVzdGlvbnNBc2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPT09IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zO1xuICAgIH1cblxuICAgIGdldCBpc1ByYWN0aWNlKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbi5xdWVzdGlvbi5vcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBxdWVzdGlvbk51bWJlcigpIHtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlcjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uTnVtYmVyO1xuICAgIH1cblxuICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHVibGlzaCgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdxdWVzdGlvbicsIHZhbHVlOiB0aGlzLl9xdWVzdGlvbn0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ29wdGlvbnMnLCB2YWx1ZTogdGhpcy5fcXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9uc30pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ3N0YXRlJywgdmFsdWU6IHRoaXMuX3N0YXRlfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAncXVlc3Rpb25OdW1iZXInLCB2YWx1ZTogdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXJ9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dSZXN1bHQoKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5jbGVhckNhY2hlKFNldHRpbmdzU2VydmljZS5NQUlOKTtcbiAgICAgICAgbmF2aWdhdGlvbk1vZHVsZS5nb3RvUmVzdWx0UGFnZSh0aGlzLl9zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2hvd0Fuc3dlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93QW5zd2VyRmxhZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc2VsZWN0T3B0aW9uKGFyZ3M6IGFueSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRPcHRpb246SU9wdGlvbiA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dDtcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5xdWVzdGlvbi5vcHRpb25zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZihpdGVtLnRhZyA9PT0gc2VsZWN0ZWRPcHRpb24udGFnKXtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucXVlc3Rpb24ucXVlc3Rpb24uc2tpcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG59Il19