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
        this.set("pieSource", [
            { Brand: "Correct", Amount: this._correct },
            { Brand: "Wrong", Amount: this._wrong },
            { Brand: "Skipped", Amount: this._skipped }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUV0RCxnREFBa0Q7QUFDbEQsOERBQTBEO0FBRTFEO0lBQXFDLG1DQUFVO0lBTzNDLHlCQUFZLEtBQVk7UUFBeEIsWUFDSSxpQkFBTyxTQUlWO1FBWEQsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixpQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUVsQixZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFJekIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7SUFDcEIsQ0FBQztJQUVPLGtDQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQ2hCO1lBQ0ksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQzFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDOUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVPLGlDQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLE9BQU87WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3JCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLHVCQUFVLENBQUMsbUJBQW1CO1lBQ3pDLFlBQVksRUFBRSxZQUFZO1lBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVztTQUMxQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFNBQVM7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyw0Q0FBa0IsR0FBMUI7UUFDSSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxvQ0FBVSxHQUFWO0lBQ0EsQ0FBQztJQUVNLHlDQUFlLEdBQXRCO1FBQ0ksR0FBRyxDQUFDLENBQW1CLFVBQXFCLEVBQXJCLEtBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQXJCLGNBQXFCLEVBQXJCLElBQXFCO1lBQXZDLElBQU0sUUFBUSxTQUFBO1lBQ2YsRUFBRSxDQUFDLENBQUMsNEJBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsNEJBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBSSxrQ0FBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBTzthQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBVTthQUFkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQ0FBYzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrQ0FBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCx3Q0FBYyxHQUFkO1FBQ0ksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBOUZELENBQXFDLHVCQUFVLEdBOEY5QztBQTlGWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQge1N0YXRlfSBmcm9tIFwiLi4vcXVlc3Rpb25zLm1vZGVsXCI7XG5pbXBvcnQgKiBhcyBuYXZpZ2F0aW9uTW9kdWxlIGZyb20gJy4uL25hdmlnYXRpb24nO1xuaW1wb3J0IHtRdWVzdGlvblV0aWx9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9xdWVzdGlvbi51dGlsXCI7XG5cbmV4cG9ydCBjbGFzcyBSZXN1bHRWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBfY29ycmVjdDogbnVtYmVyID0gMDtcbiAgICBfcGVyY2VudGFnZTogc3RyaW5nID0gXCIwXCI7XG4gICAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlO1xuICAgIHByaXZhdGUgX3dyb25nOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3NraXBwZWQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihzdGF0ZTogU3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVSZXN1bHQoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2V0KFwicGllU291cmNlXCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgeyBCcmFuZDogXCJDb3JyZWN0XCIsIEFtb3VudDogdGhpcy5fY29ycmVjdH0sXG4gICAgICAgICAgICAgICAgeyBCcmFuZDogXCJXcm9uZ1wiLCBBbW91bnQ6IHRoaXMuX3dyb25nIH0sXG4gICAgICAgICAgICAgICAgeyBCcmFuZDogXCJTa2lwcGVkXCIsIEFtb3VudDogdGhpcy5fc2tpcHBlZCB9XG4gICAgICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnc3RhdGUnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3N0YXRlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3dyb25nJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl93cm9uZ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdwZXJjZW50YWdlJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9wZXJjZW50YWdlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ2NvcnJlY3QnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX2NvcnJlY3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RGV0YWlsZWRSZXN1bHQoKSB7XG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b1Jlc3VsdFBhZ2UodGhpcy5fc3RhdGUpO1xuICAgIH1cblxuICAgIHNob3dBbnN3ZXIoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbGN1bGF0ZVJlc3VsdCgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBxdWVzdGlvbiBvZiB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChRdWVzdGlvblV0aWwuaXNDb3JyZWN0KHF1ZXN0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvcnJlY3QgPSB0aGlzLl9jb3JyZWN0ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihRdWVzdGlvblV0aWwuaXNTa2lwcGVkKHF1ZXN0aW9uKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpcHBlZCA9IHRoaXMuX3NraXBwZWQgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93cm9uZyA9IHRoaXMuX3dyb25nICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wZXJjZW50YWdlID0gKHRoaXMuX2NvcnJlY3QgKiAxMDAgLyB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoKS50b0ZpeGVkKDIpO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBnZXQgd3JvbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cm9uZztcbiAgICB9XG5cbiAgICBnZXQgY29ycmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvcnJlY3Q7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmNlbnRhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJjZW50YWdlO1xuICAgIH1cblxuICAgIGdldCB0b3RhbFF1ZXN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuXG4gICAgZGV0YWlsZWRSZXN1bHQoKSB7XG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b0RldGFpbHNQYWdlKHRoaXMuX3N0YXRlKTtcbiAgICB9XG59Il19