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
        if (this._state.questions.length > this._state.questionNumber || this._state.questionNumber === this._state.totalQuestions) {
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
            this._settingsService.saveCache(settings_service_1.SettingsService.MAIN, this._state);
            this.publish();
        }
    };
    QuestionViewModel.prototype.next = function () {
        var _this = this;
        if ((this._state.questionNumber < this._state.totalQuestions) || this.isPractice()) {
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
    QuestionViewModel.prototype.isPractice = function () {
        return this._mode === settings_service_1.SettingsService.PRACTICE;
    };
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
    Object.defineProperty(QuestionViewModel.prototype, "showAnswerFlag", {
        get: function () {
            return this._showAnswerFlag;
        },
        enumerable: true,
        configurable: true
    });
    QuestionViewModel.prototype.publish = function () {
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'question', value: this._question });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'options', value: this._question.question.options });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'state', value: this._state });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'questionNumber', value: this._state.questionNumber });
        this.notify({ object: this, eventName: observable_1.Observable.propertyChangeEvent, propertyName: 'showAnswerFlag', value: this._showAnswerFlag });
    };
    QuestionViewModel.prototype.showResult = function () {
        this._settingsService.clearCache(settings_service_1.SettingsService.MAIN);
        navigationModule.gotoResultPage(this._state);
    };
    QuestionViewModel.prototype.showAnswer = function () {
        this.question.question.options.forEach(function (option) { return option.show = true; });
        this.publish();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBc0M7QUFDdEMsOENBQXNEO0FBRXRELGlFQUE2RDtBQUM3RCxpRUFBNkQ7QUFDN0QsdURBQXlEO0FBRXpEO0lBQXVDLHFDQUFVO0lBVzdDLDJCQUFZLElBQVc7UUFBdkIsWUFDSSxpQkFBTyxTQU1WO1FBTEcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLHlDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN6SCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVNLG9DQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsZUFBZSxH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QUNqRCxDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLElBQUcsT0FBQSxNQUFNLENBQUMsSUFBSSxHQUFDLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsd0NBQVksR0FBWixVQUFhLElBQVM7UUFDbEIsSUFBSSxjQUFjLEdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQy9DLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBMUlELENBQXVDLHVCQUFVLEdBMEloRDtBQTFJWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtJT3B0aW9uLCBJUXVlc3Rpb24sIElRdWVzdGlvbldyYXBwZXIsIFN0YXRlfSBmcm9tIFwiLi4vc2hhcmVkL3F1ZXN0aW9ucy5tb2RlbFwiO1xuaW1wb3J0IHtRdWVzdGlvblNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIG5hdmlnYXRpb25Nb2R1bGUgZnJvbSAnLi4vc2hhcmVkL25hdmlnYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25WaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9xdWVzdGlvblNlcnZpY2U6IFF1ZXN0aW9uU2VydmljZTtcbiAgICBwcml2YXRlIF9zZXR0aW5nc1NlcnZpY2U6IFNldHRpbmdzU2VydmljZTtcblxuICAgIHByaXZhdGUgX3F1ZXN0aW9uOiBJUXVlc3Rpb25XcmFwcGVyO1xuICAgIHByaXZhdGUgX3N0YXRlOiBTdGF0ZTtcbiAgICBwcml2YXRlIF9xdWVzdGlvbk51bWJlcjogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfc2hvd0Fuc3dlckZsYWc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfbW9kZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IobW9kZTpzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25TZXJ2aWNlID0gUXVlc3Rpb25TZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZSA9IFNldHRpbmdzU2VydmljZS5nZXRJbnN0YW5jZSgpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3NldHRpbmdzU2VydmljZS5yZWFkQ2FjaGUobW9kZSk7XG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xuICAgICAgICB0aGlzLnNob3dGcm9tU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dGcm9tU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID4gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgfHwgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPT09IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3Nob3dBbnN3ZXJGbGFnID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxO1xuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5zYXZlQ2FjaGUoU2V0dGluZ3NTZXJ2aWNlLk1BSU4sIHRoaXMuX3N0YXRlKTtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA8IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSB8fCB0aGlzLmlzUHJhY3RpY2UoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGg+MCAmJiB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID4gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uc1t0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciAtIDFdO1xuICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWVzdGlvblNlcnZpY2UuZ2V0TmV4dFF1ZXN0aW9uKCkudGhlbigocXVlOiBJUXVlc3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciArIDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0ge3F1ZXN0aW9uOiBxdWV9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMucHVzaCh0aGlzLl9xdWVzdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5zYXZlQ2FjaGUoU2V0dGluZ3NTZXJ2aWNlLk1BSU4sIHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBxdWl0KCk6IHZvaWQge1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcXVpdD9cIikudGhlbigocHJvY2VlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3VibWl0KCk6IHZvaWQge1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3VibWl0P1wiKS50aGVuKChwcm9jZWVkKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvY2VlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgcXVlc3Rpb24oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9xdWVzdGlvbil7XG4gICAgICAgICAgICB0aGlzLl9xdWVzdGlvbiA9IHtxdWVzdGlvbjoge2Rlc2NyaXB0aW9uOicnICwgb3B0aW9uczogW119fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb247XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IGFsbFF1ZXN0aW9uc0Fza2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCA9PT0gdGhpcy5fc3RhdGUudG90YWxRdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgaXNQcmFjdGljZSgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZSA9PT0gU2V0dGluZ3NTZXJ2aWNlLlBSQUNUSUNFO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgcXVlc3Rpb25OdW1iZXIoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXI7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk51bWJlcjtcbiAgICB9XG5cbiAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0Fuc3dlckZsYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93QW5zd2VyRmxhZztcbiAgICB9XG5cbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAncXVlc3Rpb24nLCB2YWx1ZTogdGhpcy5fcXVlc3Rpb259KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdvcHRpb25zJywgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uLnF1ZXN0aW9uLm9wdGlvbnN9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdzdGF0ZScsIHZhbHVlOiB0aGlzLl9zdGF0ZX0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9uTnVtYmVyJywgdmFsdWU6IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAnc2hvd0Fuc3dlckZsYWcnLCB2YWx1ZTogdGhpcy5fc2hvd0Fuc3dlckZsYWd9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dSZXN1bHQoKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5jbGVhckNhY2hlKFNldHRpbmdzU2VydmljZS5NQUlOKTtcbiAgICAgICAgbmF2aWdhdGlvbk1vZHVsZS5nb3RvUmVzdWx0UGFnZSh0aGlzLl9zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2hvd0Fuc3dlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5xdWVzdGlvbi5vcHRpb25zLmZvckVhY2gob3B0aW9uPT4gb3B0aW9uLnNob3c9dHJ1ZSk7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIHNlbGVjdE9wdGlvbihhcmdzOiBhbnkpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9uOklPcHRpb24gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9ucy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYoaXRlbS50YWcgPT09IHNlbGVjdGVkT3B0aW9uLnRhZyl7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uLnF1ZXN0aW9uLnNraXBwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxufSJdfQ==