"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var question_util_1 = require("../../services/question.util");
var DetailedResultViewModel = /** @class */ (function (_super) {
    __extends(DetailedResultViewModel, _super);
    function DetailedResultViewModel(state) {
        var _this = _super.call(this) || this;
        _this._questions = [];
        _this.state = state;
        _this.allQuestions = state.questions;
        _this.all();
        return _this;
    }
    DetailedResultViewModel.prototype.publish = function () {
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'questions',
            value: this._questions
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'size',
            value: this._size
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'message',
            value: this._message
        });
    };
    DetailedResultViewModel.prototype.all = function () {
        this._message = "All";
        this.allQuestions.forEach(function (question) {
            if (question_util_1.QuestionUtil.isSkipped(question)) {
                question.skipped = true;
            }
            else {
                question.skipped = false;
            }
        });
        this._questions = this.allQuestions;
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.correct = function () {
        this._message = "Correct";
        this._questions = this.allQuestions.filter(function (question) { return question_util_1.QuestionUtil.isCorrect(question); });
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.incorrect = function () {
        this._questions = this.allQuestions.filter(function (question) { return question_util_1.QuestionUtil.isWrong(question); });
        this._message = "Incorrect";
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.skipped = function () {
        this._message = "Skipped";
        this._questions = this.allQuestions.filter(function (question) { return question_util_1.QuestionUtil.isSkipped(question); });
        this._size = this._questions.length;
        this.publish();
    };
    Object.defineProperty(DetailedResultViewModel.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailedResultViewModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailedResultViewModel.prototype, "questions", {
        get: function () {
            return this._questions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailedResultViewModel.prototype, "getColor", {
        get: function () {
            return 'skipped';
        },
        enumerable: true,
        configurable: true
    });
    return DetailedResultViewModel;
}(observable_1.Observable));
exports.DetailedResultViewModel = DetailedResultViewModel;
