"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var DetailedResultViewModel = /** @class */ (function (_super) {
    __extends(DetailedResultViewModel, _super);
    function DetailedResultViewModel(state) {
        var _this = _super.call(this) || this;
        _this._questions = [];
        _this.state = state;
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
        this.allQuestions.forEach(function (question) {
            if (_this.isSkipped(question)) {
                question.skipped = true;
            }
            else {
                question.skipped = false;
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
        for (var _i = 0, _a = question.options; _i < _a.length; _i++) {
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
        for (var _i = 0, _a = question.options; _i < _a.length; _i++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsZWQtcmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxlZC1yZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUd0RDtJQUE2QywyQ0FBVTtJQU9uRCxpQ0FBWSxLQUFZO1FBQXhCLFlBQ0ksaUJBQU8sU0FJVjtRQVhPLGdCQUFVLEdBQXFCLEVBQUUsQ0FBQztRQVF0QyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDcEMsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOztJQUNmLENBQUM7SUFFTyx5Q0FBTyxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLHVCQUFVLENBQUMsbUJBQW1CO1lBQ3pDLFlBQVksRUFBRSxXQUFXO1lBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLE1BQU07WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsU0FBUztZQUN2QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFHLEdBQUg7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZ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O2dCQUNwQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixLQUFLLENBQUM7WUFDVixDQUFDO1NBQ0o7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTywyQ0FBUyxHQUFqQixVQUFrQixRQUFtQjtRQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsR0FBRyxDQUFDLENBQWlCLFVBQWdCLEVBQWhCLEtBQUEsUUFBUSxDQUFDLE9BQU8sRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0I7WUFBaEMsSUFBTSxNQUFNLFNBQUE7WUFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsS0FBSyxDQUFDO1lBQ1YsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBM0dELENBQTZDLHVCQUFVLEdBMkd0RDtBQTNHWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtJUXVlc3Rpb24sIFN0YXRlfSBmcm9tIFwiLi4vcXVlc3Rpb25zLm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBEZXRhaWxlZFJlc3VsdFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIHByaXZhdGUgX3F1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uPiA9IFtdO1xuICAgIHByaXZhdGUgYWxsUXVlc3Rpb25zOiBBcnJheTxJUXVlc3Rpb24+O1xuICAgIHByaXZhdGUgX21lc3NhZ2U6IHN0cmluZztcbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzdGF0ZTogU3RhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihzdGF0ZTogU3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmFsbFF1ZXN0aW9ucyA9IHN0YXRlLnF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5hbGwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHB1Ymxpc2goKSB7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncXVlc3Rpb25zJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9xdWVzdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnc2l6ZScsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fc2l6ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdtZXNzYWdlJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IFwiQWxsXCI7XG4gICAgICAgIHRoaXMuYWxsUXVlc3Rpb25zLmZvckVhY2gocXVlc3Rpb249PiB7XG4gICAgICAgICAgIGlmKHRoaXMuaXNTa2lwcGVkKHF1ZXN0aW9uKSl7XG4gICAgICAgICAgICAgICBxdWVzdGlvbi5za2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgcXVlc3Rpb24uc2tpcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSB0aGlzLmFsbFF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIGNvcnJlY3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIkNvcnJlY3RcIjtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gdGhpcy5pc0NvcnJlY3QocXVlc3Rpb24pKTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIGluY29ycmVjdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gIXRoaXMuaXNTa2lwcGVkKHF1ZXN0aW9uKSAmJiAhdGhpcy5pc0NvcnJlY3QocXVlc3Rpb24pKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IFwiSW5jb3JyZWN0XCI7XG4gICAgICAgIHRoaXMuX3NpemUgPSB0aGlzLl9xdWVzdGlvbnMubGVuZ3RoO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBza2lwcGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZXNzYWdlID0gXCJTa2lwcGVkXCI7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9ucyA9IHRoaXMuYWxsUXVlc3Rpb25zLmZpbHRlcihxdWVzdGlvbj0+IHRoaXMuaXNTa2lwcGVkKHF1ZXN0aW9uKSk7XG4gICAgICAgIHRoaXMuX3NpemUgPSB0aGlzLl9xdWVzdGlvbnMubGVuZ3RoO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlO1xuICAgIH1cblxuICAgIGdldCBxdWVzdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGdldENvbG9yKCkge1xuICAgICAgICByZXR1cm4gJ3NraXBwZWQnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNDb3JyZWN0KHF1ZXN0aW9uOiBJUXVlc3Rpb24pIHtcbiAgICAgICAgbGV0IGlzQ29ycmVjdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBxdWVzdGlvbi5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkICYmIG9wdGlvbi5jb3JyZWN0KSB7XG4gICAgICAgICAgICAgICAgaXNDb3JyZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNDb3JyZWN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTa2lwcGVkKHF1ZXN0aW9uOiBJUXVlc3Rpb24pIHtcbiAgICAgICAgbGV0IGlzU2tpcHBlZCA9IHRydWU7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHF1ZXN0aW9uLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpc1NraXBwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNTa2lwcGVkO1xuICAgIH1cbn0iXX0=