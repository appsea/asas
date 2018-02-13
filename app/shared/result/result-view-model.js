"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var navigationModule = require("../navigation");
var question_util_1 = require("../../services/question.util");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUV0RCxnREFBa0Q7QUFDbEQsOERBQTBEO0FBRTFEO0lBQXFDLG1DQUFVO0lBTzNDLHlCQUFZLEtBQVk7UUFBeEIsWUFDSSxpQkFBTyxTQUlWO1FBWEQsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUVsQixZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFJekIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7SUFDcEIsQ0FBQztJQUVPLGtDQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQ2I7WUFDSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDekMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtTQUM3QyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU8saUNBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLHVCQUFVLENBQUMsbUJBQW1CO1lBQ3pDLFlBQVksRUFBRSxPQUFPO1lBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFlBQVk7WUFDMUIsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzFCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsU0FBUztZQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDRDQUFrQixHQUExQjtRQUNJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELG9DQUFVLEdBQVY7SUFDQSxDQUFDO0lBRU0seUNBQWUsR0FBdEI7UUFDSSxHQUFHLENBQUMsQ0FBbUIsVUFBcUIsRUFBckIsS0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBckIsY0FBcUIsRUFBckIsSUFBcUI7WUFBdkMsSUFBTSxRQUFRLFNBQUE7WUFDZixFQUFFLENBQUMsQ0FBQyw0QkFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyw0QkFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbEMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHNCQUFJLGtDQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9DQUFPO2FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFVO2FBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJDQUFjO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtDQUFLO2FBQVQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHdDQUFjLEdBQWQ7UUFDSSxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUE5RkQsQ0FBcUMsdUJBQVUsR0E4RjlDO0FBOUZZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudERhdGEsIE9ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHtTdGF0ZX0gZnJvbSBcIi4uL3F1ZXN0aW9ucy5tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBuYXZpZ2F0aW9uTW9kdWxlIGZyb20gJy4uL25hdmlnYXRpb24nO1xyXG5pbXBvcnQge1F1ZXN0aW9uVXRpbH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3F1ZXN0aW9uLnV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bHRWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIF9jb3JyZWN0OiBudW1iZXIgPSAwO1xyXG4gICAgX3BlcmNlbnRhZ2U6IHN0cmluZyA9IFwiMFwiO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlO1xyXG4gICAgcHJpdmF0ZSBfd3Jvbmc6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9za2lwcGVkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlOiBTdGF0ZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVJlc3VsdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuc2V0KFwicmVzdWx0XCIsXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHsgQnJhbmQ6IFwiQ29ycmVjdFwiLCBDb3VudDogdGhpcy5fY29ycmVjdH0sXHJcbiAgICAgICAgICAgICAgICB7IEJyYW5kOiBcIldyb25nXCIsIENvdW50OiB0aGlzLl93cm9uZyB9LFxyXG4gICAgICAgICAgICAgICAgeyBCcmFuZDogXCJTa2lwcGVkXCIsIENvdW50OiB0aGlzLl9za2lwcGVkIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwdWJsaXNoKCkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnc3RhdGUnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fc3RhdGVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3dyb25nJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3dyb25nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdwZXJjZW50YWdlJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3BlcmNlbnRhZ2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ2NvcnJlY3QnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fY29ycmVjdFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0RldGFpbGVkUmVzdWx0KCkge1xyXG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b1Jlc3VsdFBhZ2UodGhpcy5fc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBbnN3ZXIoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbGN1bGF0ZVJlc3VsdCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAoUXVlc3Rpb25VdGlsLmlzQ29ycmVjdChxdWVzdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvcnJlY3QgPSB0aGlzLl9jb3JyZWN0ICsgMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKFF1ZXN0aW9uVXRpbC5pc1NraXBwZWQocXVlc3Rpb24pKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NraXBwZWQgPSB0aGlzLl9za2lwcGVkICsgMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyb25nID0gdGhpcy5fd3JvbmcgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BlcmNlbnRhZ2UgPSAodGhpcy5fY29ycmVjdCAqIDEwMCAvIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGgpLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdyb25nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93cm9uZztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29ycmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29ycmVjdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGVyY2VudGFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGVyY2VudGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdG90YWxRdWVzdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRhaWxlZFJlc3VsdCgpIHtcclxuICAgICAgICBuYXZpZ2F0aW9uTW9kdWxlLmdvdG9EZXRhaWxzUGFnZSh0aGlzLl9zdGF0ZSk7XHJcbiAgICB9XHJcbn0iXX0=