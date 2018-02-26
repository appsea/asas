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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24udXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUVJO0lBQXNCLENBQUM7SUFFaEIsc0JBQVMsR0FBaEIsVUFBaUIsUUFBbUI7UUFDaEMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFpQixVQUFnQixFQUFoQixLQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCO1lBQWhDLElBQU0sTUFBTSxTQUFBO1lBQ2IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDakIsS0FBSyxDQUFDO1lBQ1YsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0sc0JBQVMsR0FBaEIsVUFBaUIsUUFBbUI7UUFDaEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxDQUFpQixVQUFnQixFQUFoQixLQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCO1lBQWhDLElBQU0sTUFBTSxTQUFBO1lBQ2IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQztZQUNWLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVNLG9CQUFPLEdBQWQsVUFBZSxRQUFtQjtRQUM5QixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUXVlc3Rpb259IGZyb20gXCIuLi9zaGFyZWQvcXVlc3Rpb25zLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25VdGlsIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCl7fVxyXG5cclxuICAgIHN0YXRpYyBpc0NvcnJlY3QocXVlc3Rpb246IElRdWVzdGlvbikge1xyXG4gICAgICAgIGxldCBpc0NvcnJlY3QgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBxdWVzdGlvbi5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgJiYgb3B0aW9uLmNvcnJlY3QpIHtcclxuICAgICAgICAgICAgICAgIGlzQ29ycmVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNDb3JyZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1NraXBwZWQocXVlc3Rpb246IElRdWVzdGlvbikge1xyXG4gICAgICAgIGxldCBpc1NraXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHF1ZXN0aW9uLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgaXNTa2lwcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNTa2lwcGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1dyb25nKHF1ZXN0aW9uOiBJUXVlc3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNTa2lwcGVkKHF1ZXN0aW9uKSAmJiAhdGhpcy5pc0NvcnJlY3QocXVlc3Rpb24pO1xyXG4gICAgfVxyXG59Il19