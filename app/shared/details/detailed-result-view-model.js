"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var question_util_1 = require("../../services/question.util");
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
        this._message = "All";
        this.allQuestions.forEach(function (question) {
            if (question_util_1.QuestionUtil.isSkipped(question)) {
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
        this._message = "Correct";
        this._questions = this.allQuestions.filter(function (question) { return question_util_1.QuestionUtil.isCorrect(question); });
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.incorrect = function () {
        this._questions = this.allQuestions.filter(function (question) { return question_util_1.QuestionUtil.isWrong(question); });
        this._message = "Incorrect";
        this._size = this._questions.length;
        this.publish();
    };
    DetailedResultViewModel.prototype.skipped = function () {
        this._message = "Skipped";
        this._questions = this.allQuestions.filter(function (question) { return question_util_1.QuestionUtil.isSkipped(question); });
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
    return DetailedResultViewModel;
}(observable_1.Observable));
exports.DetailedResultViewModel = DetailedResultViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsZWQtcmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxlZC1yZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUV0RCw4REFBMEQ7QUFFMUQ7SUFBNkMsMkNBQVU7SUFPbkQsaUNBQVksS0FBWTtRQUF4QixZQUNJLGlCQUFPLFNBSVY7UUFYTyxnQkFBVSxHQUFxQixFQUFFLENBQUM7UUFRdEMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7SUFDZixDQUFDO0lBRU8seUNBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsV0FBVztZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLHVCQUFVLENBQUMsbUJBQW1CO1lBQ3pDLFlBQVksRUFBRSxNQUFNO1lBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFNBQVM7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxQ0FBRyxHQUFIO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1lBQy9CLEVBQUUsQ0FBQSxDQUFDLDRCQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDakMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQSxDQUFDO2dCQUNILFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQzdCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQseUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUcsT0FBQSw0QkFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBRyxPQUFBLDRCQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHlDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFHLE9BQUEsNEJBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0JBQUkseUNBQUk7YUFBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQU87YUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksOENBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNkNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDTCw4QkFBQztBQUFELENBQUMsQUFyRkQsQ0FBNkMsdUJBQVUsR0FxRnREO0FBckZZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7SVF1ZXN0aW9uLCBTdGF0ZX0gZnJvbSBcIi4uL3F1ZXN0aW9ucy5tb2RlbFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uVXRpbH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3F1ZXN0aW9uLnV0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEZXRhaWxlZFJlc3VsdFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgcHJpdmF0ZSBfcXVlc3Rpb25zOiBBcnJheTxJUXVlc3Rpb24+ID0gW107XHJcbiAgICBwcml2YXRlIGFsbFF1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uPjtcclxuICAgIHByaXZhdGUgX21lc3NhZ2U6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgc3RhdGU6IFN0YXRlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlOiBTdGF0ZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuYWxsUXVlc3Rpb25zID0gc3RhdGUucXVlc3Rpb25zO1xyXG4gICAgICAgIHRoaXMuYWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwdWJsaXNoKCkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAncXVlc3Rpb25zJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnc2l6ZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9zaXplXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdtZXNzYWdlJyxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX21lc3NhZ2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IFwiQWxsXCI7XHJcbiAgICAgICAgdGhpcy5hbGxRdWVzdGlvbnMuZm9yRWFjaChxdWVzdGlvbj0+IHtcclxuICAgICAgICAgICBpZihRdWVzdGlvblV0aWwuaXNTa2lwcGVkKHF1ZXN0aW9uKSl7XHJcbiAgICAgICAgICAgICAgIHF1ZXN0aW9uLnNraXBwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgcXVlc3Rpb24uc2tpcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSB0aGlzLmFsbFF1ZXN0aW9ucztcclxuICAgICAgICB0aGlzLl9zaXplID0gdGhpcy5fcXVlc3Rpb25zLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBjb3JyZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIkNvcnJlY3RcIjtcclxuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSB0aGlzLmFsbFF1ZXN0aW9ucy5maWx0ZXIocXVlc3Rpb249PiBRdWVzdGlvblV0aWwuaXNDb3JyZWN0KHF1ZXN0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5jb3JyZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3F1ZXN0aW9ucyA9IHRoaXMuYWxsUXVlc3Rpb25zLmZpbHRlcihxdWVzdGlvbj0+IFF1ZXN0aW9uVXRpbC5pc1dyb25nKHF1ZXN0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IFwiSW5jb3JyZWN0XCI7XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcHBlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlID0gXCJTa2lwcGVkXCI7XHJcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gUXVlc3Rpb25VdGlsLmlzU2tpcHBlZChxdWVzdGlvbikpO1xyXG4gICAgICAgIHRoaXMuX3NpemUgPSB0aGlzLl9xdWVzdGlvbnMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtZXNzYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBxdWVzdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXN0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ2V0Q29sb3IoKSB7XHJcbiAgICAgICAgcmV0dXJuICdza2lwcGVkJztcclxuICAgIH1cclxufSJdfQ==