"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs = require("ui/dialogs");
var observable_1 = require("data/observable");
var question_service_1 = require("../services/question.service");
var settings_service_1 = require("../services/settings.service");
var navigationModule = require("../shared/navigation");
var HomeViewModel = /** @class */ (function (_super) {
    __extends(HomeViewModel, _super);
    function HomeViewModel() {
        var _this = _super.call(this) || this;
        _this._questionService = new question_service_1.QuestionService();
        _this._settingsService = new settings_service_1.SettingsService();
        _this._settingsService.clearAll();
        _this._state = _this._settingsService.readCache("main");
        _this.showFromState();
        return _this;
    }
    HomeViewModel.prototype.showFromState = function () {
        if (this._state.questions.length > this._state.questionNumber || this._state.questionNumber === this._state.totalQuestions) {
            this._question = this._state.questions[this._state.questionNumber - 1];
        }
        else {
            this.next();
        }
    };
    HomeViewModel.prototype.previous = function () {
        this.showAnswerFlag = false;
        if (this._state.questionNumber > 1) {
            this._state.questionNumber = this._state.questionNumber - 1;
            this._question = this._state.questions[this._state.questionNumber - 1];
            this._settingsService.saveCache("main", this._state);
            this.publish();
        }
    };
    HomeViewModel.prototype.next = function () {
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
    HomeViewModel.prototype.quit = function () {
        var _this = this;
        dialogs.confirm("Are you sure you want to quit?").then(function (proceed) {
            if (proceed) {
                _this.showResult();
            }
        });
    };
    HomeViewModel.prototype.submit = function () {
        var _this = this;
        dialogs.confirm("Are you sure you want to submit?").then(function (proceed) {
            if (proceed) {
                _this.showResult();
            }
        });
    };
    Object.defineProperty(HomeViewModel.prototype, "question", {
        get: function () {
            if (!this._question) {
                this._question = { question: { description: '', options: [] } };
            }
            return this._question;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewModel.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewModel.prototype, "allQuestionsAsked", {
        get: function () {
            return this._state.questions.length === this._state.totalQuestions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewModel.prototype, "isPractice", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewModel.prototype, "options", {
        get: function () {
            return this._question.question.options;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewModel.prototype, "questionNumber", {
        get: function () {
            this._questionNumber = this._state.questionNumber;
            return this._questionNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeViewModel.prototype, "message", {
        get: function () {
            return this.message;
        },
        enumerable: true,
        configurable: true
    });
    HomeViewModel.prototype.publish = function () {
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'question', value: this._question });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'options', value: this._question.question.options });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'state', value: this._state });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'questionNumber', value: this._state.questionNumber });
    };
    HomeViewModel.prototype.showResult = function () {
        this._settingsService.clearCache(settings_service_1.SettingsService.MAIN);
        navigationModule.gotoResultPage(this._state);
    };
    HomeViewModel.prototype.showAnswer = function () {
        this.showAnswerFlag = true;
    };
    HomeViewModel.prototype.selectOption = function (args) {
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
    return HomeViewModel;
}(observable_1.Observable));
exports.HomeViewModel = HomeViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXNDO0FBQ3RDLDhDQUFzRDtBQUV0RCxpRUFBNkQ7QUFDN0QsaUVBQTZEO0FBQzdELHVEQUF5RDtBQUV6RDtJQUFtQyxpQ0FBVTtJQVV6QztRQUFBLFlBQ0ksaUJBQU8sU0FNVjtRQUxHLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUM5QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDOUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBQ3pCLENBQUM7SUFFTyxxQ0FBYSxHQUFyQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDekgsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFFTSxnQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsRUFB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QUcsSUFBSSxDQUFDO1lBQ3pCLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBbklELENBQW1DLHVCQUFVLEdBbUk1QztBQW5JWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQge0lPcHRpb24sIElRdWVzdGlvbiwgSVF1ZXN0aW9uV3JhcHBlciwgU3RhdGV9IGZyb20gXCIuLi9zaGFyZWQvcXVlc3Rpb25zLm1vZGVsXCI7XG5pbXBvcnQge1F1ZXN0aW9uU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3F1ZXN0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvc2V0dGluZ3Muc2VydmljZVwiO1xuaW1wb3J0ICogYXMgbmF2aWdhdGlvbk1vZHVsZSBmcm9tICcuLi9zaGFyZWQvbmF2aWdhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBIb21lVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25TZXJ2aWNlOiBRdWVzdGlvblNlcnZpY2U7XG4gICAgcHJpdmF0ZSBfc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U7XG5cbiAgICBwcml2YXRlIF9xdWVzdGlvbjogSVF1ZXN0aW9uV3JhcHBlcjtcbiAgICBwcml2YXRlIF9zdGF0ZTogU3RhdGU7XG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25OdW1iZXI6IG51bWJlcjtcblxuICAgIHByaXZhdGUgc2hvd0Fuc3dlckZsYWc6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25TZXJ2aWNlID0gbmV3IFF1ZXN0aW9uU2VydmljZSgpO1xuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2UgPSBuZXcgU2V0dGluZ3NTZXJ2aWNlKCk7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5jbGVhckFsbCgpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3NldHRpbmdzU2VydmljZS5yZWFkQ2FjaGUoXCJtYWluXCIpO1xuICAgICAgICB0aGlzLnNob3dGcm9tU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dGcm9tU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID4gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgfHwgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPT09IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2hvd0Fuc3dlckZsYWcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDE7XG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnNhdmVDYWNoZShcIm1haW5cIiwgdGhpcy5fc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPCB0aGlzLl9zdGF0ZS50b3RhbFF1ZXN0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGg+MCAmJiB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID4gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xuICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWVzdGlvblNlcnZpY2UuZ2V0TmV4dFF1ZXN0aW9uKCkudGhlbigocXVlOiBJUXVlc3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciArIDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0ge3F1ZXN0aW9uOiBxdWV9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMucHVzaCh0aGlzLl9xdWVzdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5zYXZlQ2FjaGUoXCJtYWluXCIsIHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBxdWl0KCk6IHZvaWQge1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcXVpdD9cIikudGhlbigocHJvY2VlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3VibWl0KCk6IHZvaWQge1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3VibWl0P1wiKS50aGVuKChwcm9jZWVkKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvY2VlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgcXVlc3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9xdWVzdGlvbil7XG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHtxdWVzdGlvbjoge2Rlc2NyaXB0aW9uOicnICwgb3B0aW9uczogW119fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb247XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IGFsbFF1ZXN0aW9uc0Fza2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA9PT0gdGhpcy5fc3RhdGUudG90YWxRdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGlzUHJhY3RpY2UoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9uLnF1ZXN0aW9uLm9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IHF1ZXN0aW9uTnVtYmVyKCkge1xuICAgICAgICB0aGlzLl9xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyO1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25OdW1iZXI7XG4gICAgfVxuXG4gICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwdWJsaXNoKCkge1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9uJywgdmFsdWU6IHRoaXMuX3F1ZXN0aW9ufSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAnb3B0aW9ucycsIHZhbHVlOiB0aGlzLl9xdWVzdGlvbi5xdWVzdGlvbi5vcHRpb25zfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAnc3RhdGUnLCB2YWx1ZTogdGhpcy5fc3RhdGV9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdxdWVzdGlvbk51bWJlcicsIHZhbHVlOiB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlcn0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd1Jlc3VsdCgpIHtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLmNsZWFyQ2FjaGUoU2V0dGluZ3NTZXJ2aWNlLk1BSU4pO1xuICAgICAgICBuYXZpZ2F0aW9uTW9kdWxlLmdvdG9SZXN1bHRQYWdlKHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBzaG93QW5zd2VyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dBbnN3ZXJGbGFnID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZWxlY3RPcHRpb24oYXJnczogYW55KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZE9wdGlvbjpJT3B0aW9uID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xuICAgICAgICB0aGlzLnF1ZXN0aW9uLnF1ZXN0aW9uLm9wdGlvbnMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKGl0ZW0udGFnID09PSBzZWxlY3RlZE9wdGlvbi50YWcpe1xuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5xdWVzdGlvbi5za2lwcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cbn0iXX0=