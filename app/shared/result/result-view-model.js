"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var navigationModule = require("../navigation");
var ResultViewModel = /** @class */ (function (_super) {
    __extends(ResultViewModel, _super);
    function ResultViewModel(state) {
        var _this = _super.call(this) || this;
        _this._correct = 0;
        _this._percentage = "0";
        _this._wrong = 0;
        _this._state = state;
        _this.calculateResult();
        _this.initData();
        return _this;
    }
    ResultViewModel.prototype.initData = function () {
        this.set("pieSource", [
            { Brand: "Audi", Amount: 10 },
            { Brand: "Mercedes", Amount: 76 },
            { Brand: "Fiat", Amount: 60 },
            { Brand: "BMW", Amount: 24 },
            { Brand: "Crysler", Amount: 40 }
        ]);
        this.set("sourceItems", [
            { Name: "Groceries", Sales: 25, Margin: 10 },
            { Name: "Tools", Sales: 34, Margin: 20 },
            { Name: "Electronics", Sales: 15, Margin: 25 },
            { Name: "Gardening", Sales: 40, Margin: 5 }
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
        var isCorrect;
        for (var _i = 0, _a = this._state.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            isCorrect = false;
            for (var _b = 0, _c = question.options; _b < _c.length; _b++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUV0RCxnREFBa0Q7QUFFbEQ7SUFBcUMsbUNBQVU7SUFNM0MseUJBQVksS0FBWTtRQUF4QixZQUNJLGlCQUFPLFNBSVY7UUFWRCxjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGlCQUFXLEdBQVcsR0FBRyxDQUFDO1FBRWxCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFJdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7SUFDcEIsQ0FBQztJQUVPLGtDQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQ2hCO1lBQ0ksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDN0IsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDakMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDN0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDNUIsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDbkMsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7WUFDcEIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUM1QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLEVBQUUs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RUQsc0JBQUksdUNBQVU7YUFBZDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkNBQWM7YUFBbEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksa0NBQUs7YUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsd0NBQWMsR0FBZDtRQUNJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTlHRCxDQUFxQyx1QkFBVSxHQThHOUM7QUE5R1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSBcIi4uL3F1ZXN0aW9ucy5tb2RlbFwiO1xuaW1wb3J0ICogYXMgbmF2aWdhdGlvbk1vZHVsZSBmcm9tICcuLi9uYXZpZ2F0aW9uJztcblxuZXhwb3J0IGNsYXNzIFJlc3VsdFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIF9jb3JyZWN0OiBudW1iZXIgPSAwO1xuICAgIF9wZXJjZW50YWdlOiBzdHJpbmcgPSBcIjBcIjtcbiAgICBwcml2YXRlIF9zdGF0ZTogU3RhdGU7XG4gICAgcHJpdmF0ZSBfd3Jvbmc6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihzdGF0ZTogU3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVSZXN1bHQoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2V0KFwicGllU291cmNlXCIsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgeyBCcmFuZDogXCJBdWRpXCIsIEFtb3VudDogMTAgfSxcbiAgICAgICAgICAgICAgICB7IEJyYW5kOiBcIk1lcmNlZGVzXCIsIEFtb3VudDogNzYgfSxcbiAgICAgICAgICAgICAgICB7IEJyYW5kOiBcIkZpYXRcIiwgQW1vdW50OiA2MCB9LFxuICAgICAgICAgICAgICAgIHsgQnJhbmQ6IFwiQk1XXCIsIEFtb3VudDogMjQgfSxcbiAgICAgICAgICAgICAgICB7IEJyYW5kOiBcIkNyeXNsZXJcIiwgQW1vdW50OiA0MCB9XG4gICAgICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLnNldChcInNvdXJjZUl0ZW1zXCIsIFtcbiAgICAgICAgICAgIHsgTmFtZTogXCJHcm9jZXJpZXNcIiwgU2FsZXM6IDI1LCBNYXJnaW46IDEwIH0sXG4gICAgICAgICAgICB7IE5hbWU6IFwiVG9vbHNcIiwgU2FsZXM6IDM0LCBNYXJnaW46IDIwIH0sXG4gICAgICAgICAgICB7IE5hbWU6IFwiRWxlY3Ryb25pY3NcIiwgU2FsZXM6IDE1LCBNYXJnaW46IDI1IH0sXG4gICAgICAgICAgICB7IE5hbWU6IFwiR2FyZGVuaW5nXCIsIFNhbGVzOiA0MCwgTWFyZ2luOiA1IH1cbiAgICAgICAgXSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnc3RhdGUnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3N0YXRlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3dyb25nJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl93cm9uZ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdwZXJjZW50YWdlJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9wZXJjZW50YWdlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ2NvcnJlY3QnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX2NvcnJlY3RcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93RGV0YWlsZWRSZXN1bHQoKSB7XG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b1Jlc3VsdFBhZ2UodGhpcy5fc3RhdGUpO1xuICAgIH1cblxuICAgIHNob3dBbnN3ZXIoKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbGN1bGF0ZVJlc3VsdCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlzQ29ycmVjdDogYm9vbGVhbjtcblxuICAgICAgICBmb3IgKGNvbnN0IHF1ZXN0aW9uIG9mIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucykge1xuICAgICAgICAgICAgaXNDb3JyZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBxdWVzdGlvbi5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCAmJiBvcHRpb24uY29ycmVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpc0NvcnJlY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNDb3JyZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ycmVjdCA9IHRoaXMuX2NvcnJlY3QgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93cm9uZyA9IHRoaXMuX3dyb25nICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wZXJjZW50YWdlID0gKHRoaXMuX2NvcnJlY3QgKiAxMDAgLyB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoKS50b0ZpeGVkKDIpO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBnZXQgd3JvbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cm9uZztcbiAgICB9XG5cbiAgICBnZXQgY29ycmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvcnJlY3Q7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmNlbnRhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJjZW50YWdlO1xuICAgIH1cblxuICAgIGdldCB0b3RhbFF1ZXN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfVxuXG4gICAgZGV0YWlsZWRSZXN1bHQoKSB7XG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b0RldGFpbHNQYWdlKHRoaXMuX3N0YXRlKTtcbiAgICB9XG59Il19