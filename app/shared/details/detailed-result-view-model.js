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
            propertyName: 'totalQuestions',
            value: this.totalQuestions
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
        this.publish();
    };
    DetailedResultViewModel.prototype.correct = function () {
        var _this = this;
        this._message = "Correct";
        this._questions = this.allQuestions.filter(function (question) { return _this.isCorrect(question); });
        this.publish();
    };
    DetailedResultViewModel.prototype.incorrect = function () {
        var _this = this;
        this._questions = this.allQuestions.filter(function (question) { return !_this.isSkipped(question) && !_this.isCorrect(question); });
        this._message = "Incorrect";
        this.publish();
    };
    DetailedResultViewModel.prototype.skipped = function () {
        var _this = this;
        this._message = "Skipped";
        this._questions = this.allQuestions.filter(function (question) { return _this.isSkipped(question); });
        this.publish();
    };
    Object.defineProperty(DetailedResultViewModel.prototype, "totalQuestions", {
        get: function () {
            return this.questions.length;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsZWQtcmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxlZC1yZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUd0RDtJQUE2QywyQ0FBVTtJQUtuRCxpQ0FBWSxLQUFZO1FBQXhCLFlBQ0ksaUJBQU8sU0FHVjtRQUZHLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxLQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7O0lBQ2YsQ0FBQztJQUVPLHlDQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFdBQVc7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsZ0JBQWdCO1lBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYztTQUM3QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFNBQVM7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxQ0FBRyxHQUFIO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDMUIsRUFBRSxDQUFBLENBQUMsS0FBSSxDQUFDLFNB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QUF6QyxJQUFNLE1BQU0sU0FBQTtZQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixLQUFLLENBQUM7WUFDVixDQUFDO1NBQ0o7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQUFwR0QsQ0FBNkMsdUJBQVUsR0FvR3REO0FBcEdZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQge0lRdWVzdGlvbldyYXBwZXIsIFN0YXRlfSBmcm9tIFwiLi4vcXVlc3Rpb25zLm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBEZXRhaWxlZFJlc3VsdFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uV3JhcHBlcj47XG4gICAgcHJpdmF0ZSBhbGxRdWVzdGlvbnM6IEFycmF5PElRdWVzdGlvbldyYXBwZXI+O1xuICAgIHByaXZhdGUgX21lc3NhZ2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHN0YXRlOiBTdGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFsbFF1ZXN0aW9ucyA9IHN0YXRlLnF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5hbGwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncXVlc3Rpb25zJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9xdWVzdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAndG90YWxRdWVzdGlvbnMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudG90YWxRdWVzdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnbWVzc2FnZScsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIkFsbFwiO1xuICAgICAgICB0aGlzLmFsbFF1ZXN0aW9ucy5mb3JFYWNoKHF1ZT0+IHtcbiAgICAgICAgICAgaWYodGhpcy5pc1NraXBwZWQocXVlKSl7XG4gICAgICAgICAgICAgICBxdWUucXVlc3Rpb24uc2tpcHBlZCA9IHRydWU7XG4gICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgIHF1ZS5xdWVzdGlvbi5za2lwcGVkID0gZmFsc2U7XG4gICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9ucyA9IHRoaXMuYWxsUXVlc3Rpb25zO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBjb3JyZWN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZXNzYWdlID0gXCJDb3JyZWN0XCI7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9ucyA9IHRoaXMuYWxsUXVlc3Rpb25zLmZpbHRlcihxdWVzdGlvbj0+IHRoaXMuaXNDb3JyZWN0KHF1ZXN0aW9uKSk7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIGluY29ycmVjdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gIXRoaXMuaXNTa2lwcGVkKHF1ZXN0aW9uKSAmJiAhdGhpcy5pc0NvcnJlY3QocXVlc3Rpb24pKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IFwiSW5jb3JyZWN0XCI7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIHNraXBwZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIlNraXBwZWRcIjtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gdGhpcy5pc1NraXBwZWQocXVlc3Rpb24pKTtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxuXG4gICAgZ2V0IHRvdGFsUXVlc3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgICB9XG5cbiAgICBnZXQgcXVlc3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25zO1xuICAgIH1cblxuICAgIGdldCBnZXRDb2xvcigpIHtcbiAgICAgICAgcmV0dXJuICdza2lwcGVkJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQ29ycmVjdChxdWVzdGlvbjogSVF1ZXN0aW9uV3JhcHBlcikge1xuICAgICAgICBsZXQgaXNDb3JyZWN0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHF1ZXN0aW9uLnF1ZXN0aW9uLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQgJiYgb3B0aW9uLmNvcnJlY3QpIHtcbiAgICAgICAgICAgICAgICBpc0NvcnJlY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0NvcnJlY3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NraXBwZWQocXVlc3Rpb246IElRdWVzdGlvbldyYXBwZXIpIHtcbiAgICAgICAgbGV0IGlzU2tpcHBlZCA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHF1ZXN0aW9uLnF1ZXN0aW9uLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpc1NraXBwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNTa2lwcGVkO1xuICAgIH1cbn0iXX0=