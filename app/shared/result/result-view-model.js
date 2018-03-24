"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var navigationModule = require("../navigation");
var question_util_1 = require("../../services/question.util");
var settings_service_1 = require("../../services/settings.service");
var ResultViewModel = /** @class */ (function (_super) {
    __extends(ResultViewModel, _super);
    function ResultViewModel(state) {
        var _this = _super.call(this) || this;
        _this._correct = 0;
        _this._percentage = "0";
        _this._wrong = 0;
        _this._skipped = 0;
        _this._state = state;
        _this.calculateResult();
        _this.initData();
        return _this;
    }
    ResultViewModel.prototype.initData = function () {
        this.set("result", [
            { Brand: "Correct", Count: this._correct },
            { Brand: "Wrong", Count: this._wrong },
            { Brand: "Skipped", Count: this._skipped }
        ]);
    };
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
        for (var _i = 0, _a = this._state.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            if (question_util_1.QuestionUtil.isCorrect(question)) {
                this._correct = this._correct + 1;
            }
            else if (question_util_1.QuestionUtil.isSkipped(question)) {
                this._skipped = this._skipped + 1;
            }
            else {
                this._wrong = this._wrong + 1;
            }
        }
        this._percentage = (this._correct * 100 / this._state.questions.length).toFixed(2);
        settings_service_1.SettingsService.getInstance().saveScore(this._state.mode, Number(this._percentage));
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
    Object.defineProperty(ResultViewModel.prototype, "state", {
        get: function () {
            return this._state;
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
