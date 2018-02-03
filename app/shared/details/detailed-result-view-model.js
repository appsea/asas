"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var DetailedResultViewModel = /** @class */ (function (_super) {
    __extends(DetailedResultViewModel, _super);
    function DetailedResultViewModel(state) {
        var _this = _super.call(this) || this;
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
        var _this = this;
        this._message = "All";
        this.allQuestions.forEach(function (que) {
            if (_this.isSkipped(que)) {
                que.question.skipped = true;
            }
            else {
                que.question.skipped = false;
            }
        });
        this._questions = this.allQuestions;
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.correct = function () {
        var _this = this;
        this._message = "Correct";
        this._questions = this.allQuestions.filter(function (question) { return _this.isCorrect(question); });
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.incorrect = function () {
        var _this = this;
        this._questions = this.allQuestions.filter(function (question) { return !_this.isSkipped(question) && !_this.isCorrect(question); });
        this._message = "Incorrect";
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.skipped = function () {
        var _this = this;
        this._message = "Skipped";
        this._questions = this.allQuestions.filter(function (question) { return _this.isSkipped(question); });
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
    DetailedResultViewModel.prototype.isCorrect = function (question) {
        var isCorrect = false;
        for (var _i = 0, _a = question.question.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.selected && option.correct) {
                isCorrect = true;
                break;
            }
        }
        return isCorrect;
    };
    DetailedResultViewModel.prototype.isSkipped = function (question) {
        var isSkipped = true;
        for (var _i = 0, _a = question.question.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.selected) {
                isSkipped = false;
                break;
            }
        }
        return isSkipped;
    };
    return DetailedResultViewModel;
}(observable_1.Observable));
exports.DetailedResultViewModel = DetailedResultViewModel;
