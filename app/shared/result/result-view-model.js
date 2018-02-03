"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var navigationModule = require("../navigation");
var ResultViewModel = /** @class */ (function (_super) {
    __extends(ResultViewModel, _super);
    function ResultViewModel(state) {
        var _this = _super.call(this) || this;
        _this._correct = 0;
        _this._percentage = 0;
        _this._wrong = 0;
        _this._state = state;
        _this.calculateResult();
        return _this;
    }
    ResultViewModel.prototype.publish = function () {
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'state',
            value: this._state
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'wrong',
            value: this._wrong
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'percentage',
            value: this._percentage
        });
        this.notify({
            object: this,
            eventName: observable_1.Observable.propertyChangeEvent,
            propertyName: 'correct',
            value: this._correct
        });
    };
    ResultViewModel.prototype.showDetailedResult = function () {
        navigationModule.gotoResultPage(this._state);
    };
    ResultViewModel.prototype.showAnswer = function () {
    };
    ResultViewModel.prototype.calculateResult = function () {
        var isCorrect;
        for (var _i = 0, _a = this._state.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            isCorrect = false;
            for (var _b = 0, _c = question.question.options; _b < _c.length; _b++) {
                var option = _c[_b];
                if (option.selected && option.correct) {
                    isCorrect = true;
                    break;
                }
            }
            if (isCorrect) {
                this._correct = this._correct + 1;
            }
            else {
                this._wrong = this._wrong + 1;
            }
        }
        this._percentage = this._correct * 100 / this._state.questions.length;
        this.publish();
    };
    Object.defineProperty(ResultViewModel.prototype, "wrong", {
        get: function () {
            return this._wrong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultViewModel.prototype, "correct", {
        get: function () {
            return this._correct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultViewModel.prototype, "percentage", {
        get: function () {
            return this._percentage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultViewModel.prototype, "totalQuestions", {
        get: function () {
            return this._state.questions.length;
        },
        enumerable: true,
        configurable: true
    });
    ResultViewModel.prototype.detailedResult = function () {
        navigationModule.gotoDetailsPage(this._state);
    };
    return ResultViewModel;
}(observable_1.Observable));
exports.ResultViewModel = ResultViewModel;
