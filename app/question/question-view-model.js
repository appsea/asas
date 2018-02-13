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
            this._settingsService.saveCache(this._mode, this._state);
            this.publish();
        }
    };
    QuestionViewModel.prototype.next = function () {
        var _this = this;
        if ((this._state.questionNumber < this._state.totalQuestions) || this.isPractice()) {
            if (this._state.questions.length > 0 && this._state.questions.length > this._state.questionNumber) {
                this._state.questionNumber = this._state.questionNumber + 1;
                this._question = this._state.questions[this._state.questionNumber - 1];
                this._settingsService.saveCache(this._mode, this._state);
                this.publish();
            }
            else {
                this._questionService.getNextQuestion().then(function (que) {
                    _this._state.questionNumber = _this._state.questionNumber + 1;
                    _this._question = que;
                    _this._state.questions.push(_this._question);
                    _this._settingsService.saveCache(_this._mode, _this._state);
                    _this.publish();
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
        this.publish();
    };
    return QuestionViewModel;
}(observable_1.Observable));
exports.QuestionViewModel = QuestionViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBc0M7QUFDdEMsOENBQXNEO0FBRXRELGlFQUE2RDtBQUM3RCxpRUFBNkQ7QUFDN0QsdURBQXlEO0FBRXpEO0lBQXVDLHFDQUFVO0lBVzdDLDJCQUFZLElBQVc7UUFBdkIsWUFDSSxpQkFBTyxTQU1WO1FBTEcsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUVPLHlDQUFhLEdBQXJCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9KLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENB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QUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDOUIsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU0sSUFBRyxPQUFBLE1BQU0sQ0FBQyxJQUFJLEdBQUMsSUFBSSxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWEsSUFBUztRQUNsQixJQUFJLGNBQWMsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUN0QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN6QixDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBN0lELENBQXVDLHVCQUFVLEdBNkloRDtBQTdJWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtJT3B0aW9uLCBJUXVlc3Rpb24sIFN0YXRlfSBmcm9tIFwiLi4vc2hhcmVkL3F1ZXN0aW9ucy5tb2RlbFwiO1xuaW1wb3J0IHtRdWVzdGlvblNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9xdWVzdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIG5hdmlnYXRpb25Nb2R1bGUgZnJvbSAnLi4vc2hhcmVkL25hdmlnYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25WaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9xdWVzdGlvblNlcnZpY2U6IFF1ZXN0aW9uU2VydmljZTtcbiAgICBwcml2YXRlIF9zZXR0aW5nc1NlcnZpY2U6IFNldHRpbmdzU2VydmljZTtcblxuICAgIHByaXZhdGUgX3F1ZXN0aW9uOiBJUXVlc3Rpb247XG4gICAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlO1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uTnVtYmVyOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIF9zaG93QW5zd2VyRmxhZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9tb2RlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2RlOnN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9xdWVzdGlvblNlcnZpY2UgPSBRdWVzdGlvblNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlID0gU2V0dGluZ3NTZXJ2aWNlLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnJlYWRDYWNoZShtb2RlKTtcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMuc2hvd0Zyb21TdGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0Zyb21TdGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICE9IDAgJiYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPj0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgfHwgdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPT09IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB0aGlzLl9zdGF0ZS5xdWVzdGlvbnNbdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaG93QW5zd2VyRmxhZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMTtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZUNhY2hlKHRoaXMuX21vZGUsIHRoaXMuX3N0YXRlKTtcbiAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCh0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA8IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zKSB8fCB0aGlzLmlzUHJhY3RpY2UoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPiAwICYmIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGggPiB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXIgKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uID0gdGhpcy5fc3RhdGUucXVlc3Rpb25zW3RoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyIC0gMV07XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnNhdmVDYWNoZSh0aGlzLl9tb2RlLCB0aGlzLl9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXN0aW9uU2VydmljZS5nZXROZXh0UXVlc3Rpb24oKS50aGVuKChxdWU6IElRdWVzdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5xdWVzdGlvbk51bWJlciA9IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSBxdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5wdXNoKHRoaXMuX3F1ZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnNhdmVDYWNoZSh0aGlzLl9tb2RlLCB0aGlzLl9zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcXVpdCgpOiB2b2lkIHtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHF1aXQ/XCIpLnRoZW4oKHByb2NlZWQpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9jZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1Ym1pdCgpOiB2b2lkIHtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHN1Ym1pdD9cIikudGhlbigocHJvY2VlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2NlZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHF1ZXN0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5fcXVlc3Rpb24pe1xuICAgICAgICAgICAgdGhpcy5fcXVlc3Rpb24gPSB7ZGVzY3JpcHRpb246JycgLCBvcHRpb25zOiBbXX1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb247XG4gICAgfVxuXG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgYWxsUXVlc3Rpb25zQXNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoID09IHRoaXMuX3N0YXRlLnRvdGFsUXVlc3Rpb25zO1xuICAgIH1cblxuICAgIGlzUHJhY3RpY2UoKTpib29sZWFue1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZSA9PT0gU2V0dGluZ3NTZXJ2aWNlLlBSQUNUSUNFO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb24ub3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgcXVlc3Rpb25OdW1iZXIoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9uTnVtYmVyID0gdGhpcy5fc3RhdGUucXVlc3Rpb25OdW1iZXI7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbk51bWJlcjtcbiAgICB9XG5cbiAgICBnZXQgbWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0Fuc3dlckZsYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93QW5zd2VyRmxhZztcbiAgICB9XG5cbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAncXVlc3Rpb24nLCB2YWx1ZTogdGhpcy5fcXVlc3Rpb259KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdvcHRpb25zJywgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uLm9wdGlvbnN9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoeyBvYmplY3Q6IHRoaXMsIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eU5hbWU6ICdzdGF0ZScsIHZhbHVlOiB0aGlzLl9zdGF0ZX0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7IG9iamVjdDogdGhpcywgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9uTnVtYmVyJywgdmFsdWU6IHRoaXMuX3N0YXRlLnF1ZXN0aW9uTnVtYmVyfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHsgb2JqZWN0OiB0aGlzLCBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgcHJvcGVydHlOYW1lOiAnc2hvd0Fuc3dlckZsYWcnLCB2YWx1ZTogdGhpcy5fc2hvd0Fuc3dlckZsYWd9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dSZXN1bHQoKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZS5jbGVhckNhY2hlKHRoaXMuX21vZGUpO1xuICAgICAgICB0aGlzLl9zdGF0ZS5tb2RlID0gdGhpcy5fbW9kZTtcbiAgICAgICAgbmF2aWdhdGlvbk1vZHVsZS5nb3RvUmVzdWx0UGFnZSh0aGlzLl9zdGF0ZSk7XG4gICAgfVxuXG4gICAgc2hvd0Fuc3dlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5vcHRpb25zLmZvckVhY2gob3B0aW9uPT4gb3B0aW9uLnNob3c9dHJ1ZSk7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIHNlbGVjdE9wdGlvbihhcmdzOiBhbnkpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkT3B0aW9uOklPcHRpb24gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XG4gICAgICAgIHRoaXMucXVlc3Rpb24ub3B0aW9ucy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYoaXRlbS50YWcgPT09IHNlbGVjdGVkT3B0aW9uLnRhZyl7XG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uLnNraXBwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxufSJdfQ==