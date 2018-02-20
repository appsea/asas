"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionUtil = /** @class */ (function () {
    function QuestionUtil() {
    }
    QuestionUtil.isCorrect = function (question) {
        var isCorrect = false;
        for (var _i = 0, _a = question.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.selected && option.correct) {
                isCorrect = true;
                break;
            }
        }
        return isCorrect;
    };
    QuestionUtil.isSkipped = function (question) {
        var isSkipped = true;
        for (var _i = 0, _a = question.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.selected) {
                isSkipped = false;
                break;
            }
        }
        return isSkipped;
    };
    QuestionUtil.isWrong = function (question) {
        return !this.isSkipped(question) && !this.isCorrect(question);
    };
    return QuestionUtil;
}());
exports.QuestionUtil = QuestionUtil;
