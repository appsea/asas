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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsZWQtcmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxlZC1yZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUV0RCw4REFBMEQ7QUFFMUQ7SUFBNkMsMkNBQVU7SUFPbkQsaUNBQVksS0FBWTtRQUF4QixZQUNJLGlCQUFPLFNBSVY7UUFYTyxnQkFBVSxHQUFxQixFQUFFLENBQUM7UUFRdEMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7SUFDZixDQUFDO0lBRU8seUNBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsV0FBVztZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLHVCQUFVLENBQUMsbUJBQW1CO1lBQ3pDLFlBQVksRUFBRSxNQUFNO1lBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFNBQVM7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3ZCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxxQ0FBRyxHQUFIO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1lBQy9CLEVBQUUsQ0FBQSxDQUFDLDRCQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDakMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQSxDQUFDO2dCQUNILFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQzdCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQseUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUcsT0FBQSw0QkFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCwyQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLFFBQVEsSUFBRyxPQUFBLDRCQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHlDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQUEsUUFBUSxJQUFHLE9BQUEsNEJBQVksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0JBQUkseUNBQUk7YUFBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQU87YUFBWDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksOENBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNkNBQVE7YUFBWjtZQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDTCw4QkFBQztBQUFELENBQUMsQUFyRkQsQ0FBNkMsdUJBQVUsR0FxRnREO0FBckZZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQge0lRdWVzdGlvbiwgU3RhdGV9IGZyb20gXCIuLi9xdWVzdGlvbnMubW9kZWxcIjtcbmltcG9ydCB7UXVlc3Rpb25VdGlsfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcXVlc3Rpb24udXRpbFwiO1xuXG5leHBvcnQgY2xhc3MgRGV0YWlsZWRSZXN1bHRWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9xdWVzdGlvbnM6IEFycmF5PElRdWVzdGlvbj4gPSBbXTtcbiAgICBwcml2YXRlIGFsbFF1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uPjtcbiAgICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgc3RhdGU6IFN0YXRlO1xuXG4gICAgY29uc3RydWN0b3Ioc3RhdGU6IFN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5hbGxRdWVzdGlvbnMgPSBzdGF0ZS5xdWVzdGlvbnM7XG4gICAgICAgIHRoaXMuYWxsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwdWJsaXNoKCkge1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3F1ZXN0aW9ucycsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fcXVlc3Rpb25zXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3NpemUnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3NpemVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm90aWZ5KHtcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnbWVzc2FnZScsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIkFsbFwiO1xuICAgICAgICB0aGlzLmFsbFF1ZXN0aW9ucy5mb3JFYWNoKHF1ZXN0aW9uPT4ge1xuICAgICAgICAgICBpZihRdWVzdGlvblV0aWwuaXNTa2lwcGVkKHF1ZXN0aW9uKSl7XG4gICAgICAgICAgICAgICBxdWVzdGlvbi5za2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgcXVlc3Rpb24uc2tpcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSB0aGlzLmFsbFF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIGNvcnJlY3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIkNvcnJlY3RcIjtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gUXVlc3Rpb25VdGlsLmlzQ29ycmVjdChxdWVzdGlvbikpO1xuICAgICAgICB0aGlzLl9zaXplID0gdGhpcy5fcXVlc3Rpb25zLmxlbmd0aDtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxuXG4gICAgaW5jb3JyZWN0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSB0aGlzLmFsbFF1ZXN0aW9ucy5maWx0ZXIocXVlc3Rpb249PiBRdWVzdGlvblV0aWwuaXNXcm9uZyhxdWVzdGlvbikpO1xuICAgICAgICB0aGlzLl9tZXNzYWdlID0gXCJJbmNvcnJlY3RcIjtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIHNraXBwZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIlNraXBwZWRcIjtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gUXVlc3Rpb25VdGlsLmlzU2tpcHBlZChxdWVzdGlvbikpO1xuICAgICAgICB0aGlzLl9zaXplID0gdGhpcy5fcXVlc3Rpb25zLmxlbmd0aDtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgIH1cblxuICAgIGdldCBtZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVzc2FnZTtcbiAgICB9XG5cbiAgICBnZXQgcXVlc3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlc3Rpb25zO1xuICAgIH1cblxuICAgIGdldCBnZXRDb2xvcigpIHtcbiAgICAgICAgcmV0dXJuICdza2lwcGVkJztcbiAgICB9XG59Il19