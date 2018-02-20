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
