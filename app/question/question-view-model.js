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
        _this._settingsService.clearAll();
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
            this._settingsService.saveCache("main", this._state);
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
        this._settingsService.saveCache("main", this._state);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBc0M7QUFDdEMsOENBQXNEO0FBRXRELGlFQUE2RDtBQUM3RCxpRUFBNkQ7QUFDN0QsdURBQXlEO0FBRXpEO0lBQXVDLHFDQUFVO0lBVTdDO1FBQUEsWUFDSSxpQkFBTyxTQU1WO1FBTEcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxrQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLHlDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN6SCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVNLG9DQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMs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Q0FBQztnQkFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekIsQ0FBQztZQUFBLElBQUksQ0FBQSxDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFuSUQsQ0FBdUMsdUJBQVUsR0FtSWhEO0FBbklZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQge0lPcHRpb24sIElRdWVzdGlvbiwgSVF1ZXN0aW9uV3JhcHBlciwgU3RhdGV9IGZyb20gXCIuLi9zaGFyZWQvcXVlc3Rpb25zLm1vZGVsXCI7XG5pbXBvcnQge1F1ZXN0aW9uU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3F1ZXN0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvc2V0dGluZ3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgbmF2aWdhdGlvbk1vZHVsZSBmcm9tICcuLi9zaGFyZWQvbmF2aWdhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBRdWVzdGlvblZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uU2VydmljZTogUXVlc3Rpb25TZXJ2aWNlO1xuICAgIHByaXZhdGUgX3NldHRpbmdzU2VydmljZTogU2V0dGluZ3NTZXJ2aWNlO1xuXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb246IElRdWVzdGlvbldyYXBwZXI7XG4gICAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlO1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uTnVtYmVyOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHNob3dBbnN3ZXJGbGFnOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uU2VydmljZSA9IFF1ZXN0aW9uU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2UgPSBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLmNsZWFyQWxsKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnJlYWRDYWNoZShTZXR0aW5nc1NlcnZpY2UuTUFJTik7XG4gICAgICAgIHRoaXMuc2hvd0Zyb21TdGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0Zyb21TdGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPiB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciB8fCB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9PT0gdGhpcy5fc3RhdGUudG90YWxRdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwcmV2aW91cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93QW5zd2VyRmxhZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMTtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZUNhY2hlKFwibWFpblwiLCB0aGlzLl9zdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA8IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aD4wICYmIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPiB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XG4gICAgICAgICAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uU2VydmljZS5nZXROZXh0UXVlc3Rpb24oKS50aGVuKChxdWU6IElRdWVzdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB7cXVlc3Rpb246IHF1ZX07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5wdXNoKHRoaXMuX3F1ZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnNhdmVDYWNoZShcIm1haW5cIiwgdGhpcy5fc3RhdGUpO1xuICAgIH1cblxuICAgIHF1aXQoKTogdm9pZCB7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBxdWl0P1wiKS50aGVuKChwcm9jZWVkKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvY2VlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWJtaXQoKTogdm9pZCB7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdWJtaXQ/XCIpLnRoZW4oKHByb2NlZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBxdWVzdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuX3F1ZXN0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0ge3F1ZXN0aW9uOiB7ZGVzY3JpcHRpb246JycgLCBvcHRpb25zOiBbXX19O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbjtcbiAgICB9XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgYWxsUXVlc3Rpb25zQXNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID09PSB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgaXNQcmFjdGljZSgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgcXVlc3Rpb25OdW1iZXIoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXI7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk51bWJlcjtcbiAgICB9XG5cbiAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAncXVlc3Rpb24nLCB2YWx1ZTogdGhpcy5fcXVlc3Rpb259KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdvcHRpb25zJywgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uLnF1ZXN0aW9uLm9wdGlvbnN9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdzdGF0ZScsIHZhbHVlOiB0aGlzLl9zdGF0ZX0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9uTnVtYmVyJywgdmFsdWU6IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93UmVzdWx0KCkge1xuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2UuY2xlYXJDYWNoZShTZXR0aW5nc1NlcnZpY2UuTUFJTik7XG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b1Jlc3VsdFBhZ2UodGhpcy5fc3RhdGUpO1xuICAgIH1cblxuICAgIHNob3dBbnN3ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd0Fuc3dlckZsYWcgPSB0cnVlO1xuICAgIH1cblxuICAgIHNlbGVjdE9wdGlvbihhcmdzOiBhbnkpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9uOklPcHRpb24gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9ucy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYoaXRlbS50YWcgPT09IHNlbGVjdGVkT3B0aW9uLnRhZyl7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uLnF1ZXN0aW9uLnNraXBwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxufSJdfQ==