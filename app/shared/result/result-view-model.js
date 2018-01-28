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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUV0RCxnREFBa0Q7QUFFbEQ7SUFBcUMsbUNBQVU7SUFNM0MseUJBQVksS0FBWTtRQUF4QixZQUNJLGlCQUFPLFNBR1Y7UUFURCxjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFJdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOztJQUMzQixDQUFDO0lBRU8saUNBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDckIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLHVCQUFVLENBQUMsbUJBQW1CO1lBQ3pDLFlBQVksRUFBRSxPQUFPO1lBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFlBQVk7WUFDMUIsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzFCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsU0FBUztZQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDRDQUFrQixHQUExQjtRQUNJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELG9DQUFVLEdBQVY7SUFDQSxDQUFDO0lBRU0seUNBQWUsR0FBdEI7UUFDSSxJQUFJLFNBQWtCLENBQUM7UUFFdkIsR0FBRyxDQUFDLENBQW1CLFVBQXFCLEVBQXJCLEtBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQXJCLGNBQXFCLEVBQXJCLElBQXFCO1lBQXZDLElBQU0sUUFBUSxTQUFBO1lBQ2YsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUNsQixHQUFHLENBQUMsQ0FBaUIsVUFBeUIsRUFBekIsS0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBekIsY0FBeUIsRUFBekIsSUFBeUI7Z0JBQXpDLElBQU0sTUFBTSxTQUFBO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLEtBQUssQ0FBQztnQkFDVixDQUFDO2FBQ0o7WUFDRCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbEMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDdEUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBSSxrQ0FBSzthQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBTzthQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBVTthQUFkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQ0FBYzthQUFsQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFRCx3Q0FBYyxHQUFkO1FBQ0ksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBdEZELENBQXFDLHVCQUFVLEdBc0Y5QztBQXRGWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQge1N0YXRlfSBmcm9tIFwiLi4vcXVlc3Rpb25zLm1vZGVsXCI7XG5pbXBvcnQgKiBhcyBuYXZpZ2F0aW9uTW9kdWxlIGZyb20gJy4uL25hdmlnYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgUmVzdWx0Vmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgX2NvcnJlY3Q6IG51bWJlciA9IDA7XG4gICAgX3BlcmNlbnRhZ2U6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlO1xuICAgIHByaXZhdGUgX3dyb25nOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3Ioc3RhdGU6IFN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUmVzdWx0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwdWJsaXNoKCkge1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3N0YXRlJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9zdGF0ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICd3cm9uZycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fd3JvbmdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncGVyY2VudGFnZScsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fcGVyY2VudGFnZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdjb3JyZWN0JyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9jb3JyZWN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0RldGFpbGVkUmVzdWx0KCkge1xuICAgICAgICBuYXZpZ2F0aW9uTW9kdWxlLmdvdG9SZXN1bHRQYWdlKHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBzaG93QW5zd2VyKCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBjYWxjdWxhdGVSZXN1bHQoKTogdm9pZCB7XG4gICAgICAgIGxldCBpc0NvcnJlY3Q6IGJvb2xlYW47XG5cbiAgICAgICAgZm9yIChjb25zdCBxdWVzdGlvbiBvZiB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIGlzQ29ycmVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgcXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgJiYgb3B0aW9uLmNvcnJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNDb3JyZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ29ycmVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvcnJlY3QgPSB0aGlzLl9jb3JyZWN0ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JvbmcgPSB0aGlzLl93cm9uZyArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9IHRoaXMuX2NvcnJlY3QgKiAxMDAgLyB0aGlzLl9zdGF0ZS5xdWVzdGlvbnMubGVuZ3RoO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBnZXQgd3JvbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93cm9uZztcbiAgICB9XG5cbiAgICBnZXQgY29ycmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvcnJlY3Q7XG4gICAgfVxuXG4gICAgZ2V0IHBlcmNlbnRhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJjZW50YWdlO1xuICAgIH1cblxuICAgIGdldCB0b3RhbFF1ZXN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLnF1ZXN0aW9ucy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZGV0YWlsZWRSZXN1bHQoKSB7XG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b0RldGFpbHNQYWdlKHRoaXMuX3N0YXRlKTtcbiAgICB9XG59Il19