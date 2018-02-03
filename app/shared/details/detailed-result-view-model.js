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
        this.allQuestions.forEach(function (que) {
            if (_this.isSkipped(que)) {
                que.question.skipped = true;
            }
            else {
                que.question.skipped = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsZWQtcmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxlZC1yZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUd0RDtJQUE2QywyQ0FBVTtJQU1uRCxpQ0FBWSxLQUFZO1FBQXhCLFlBQ0ksaUJBQU8sU0FHVjtRQUZHLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxLQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7O0lBQ2YsQ0FBQztJQUVPLHlDQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLFdBQVc7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3pCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtZQUN6QyxZQUFZLEVBQUUsTUFBTTtZQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLHVCQUFVLENBQUMsbUJBQW1CO1lBQ3pDLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN2QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQUcsR0FBSDtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQzFCLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNwQixHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDaEMsQ0FBQztZQUFDLElBQUksQ0FBQSxDQUFDO2dCQUNILEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNqQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHlDQUFPLEdBQVA7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUcsT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELDJDQUFTLEdBQVQ7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUcsT0FBQSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUF0RCxDQUFzRCxDQUFDLENBQUM7UUFDOUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHlDQUFPLEdBQVA7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUcsT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHNCQUFJLHlDQUFJO2FBQVI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRDQUFPO2FBQVg7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhDQUFTO2FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZDQUFRO2FBQVo7WUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRU8sMkNBQVMsR0FBakIsVUFBa0IsUUFBMEI7UUFDeEMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFpQixVQUF5QixFQUF6QixLQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUF6QixjQUF5QixFQUF6QixJQUF5QjtZQUF6QyxJQUFNLE1BQU0sU0FBQTtZQUNiLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztZQUNWLENBQUM7U0FDSjtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLDJDQUFTLEdBQWpCLFVBQWtCLFFBQTBCO1FBQ3hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixHQUFHLENBQUMsQ0FBaUIsVUFBeUIsRUFBekIsS0FBQSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBekIsY0FBeUIsRUFBekIsSUFBeUI7WUFBekMsSUFBTSxNQUFNLFNBQUE7WUFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsS0FBSyxDQUFDO1lBQ1YsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLEFBekdELENBQTZDLHVCQUFVLEdBeUd0RDtBQXpHWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtJUXVlc3Rpb25XcmFwcGVyLCBTdGF0ZX0gZnJvbSBcIi4uL3F1ZXN0aW9ucy5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgRGV0YWlsZWRSZXN1bHRWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcbiAgICBwcml2YXRlIF9xdWVzdGlvbnM6IEFycmF5PElRdWVzdGlvbldyYXBwZXI+O1xuICAgIHByaXZhdGUgYWxsUXVlc3Rpb25zOiBBcnJheTxJUXVlc3Rpb25XcmFwcGVyPjtcbiAgICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfc2l6ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc3RhdGU6IFN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYWxsUXVlc3Rpb25zID0gc3RhdGUucXVlc3Rpb25zO1xuICAgICAgICB0aGlzLmFsbCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHVibGlzaCgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdxdWVzdGlvbnMnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3F1ZXN0aW9uc1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdzaXplJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9zaXplXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ21lc3NhZ2UnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuX21lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZXNzYWdlID0gXCJBbGxcIjtcbiAgICAgICAgdGhpcy5hbGxRdWVzdGlvbnMuZm9yRWFjaChxdWU9PiB7XG4gICAgICAgICAgIGlmKHRoaXMuaXNTa2lwcGVkKHF1ZSkpe1xuICAgICAgICAgICAgICAgcXVlLnF1ZXN0aW9uLnNraXBwZWQgPSB0cnVlO1xuICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICBxdWUucXVlc3Rpb24uc2tpcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9xdWVzdGlvbnMgPSB0aGlzLmFsbFF1ZXN0aW9ucztcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIGNvcnJlY3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSBcIkNvcnJlY3RcIjtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gdGhpcy5pc0NvcnJlY3QocXVlc3Rpb24pKTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHRoaXMuX3F1ZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgIHRoaXMucHVibGlzaCgpO1xuICAgIH1cblxuICAgIGluY29ycmVjdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcXVlc3Rpb25zID0gdGhpcy5hbGxRdWVzdGlvbnMuZmlsdGVyKHF1ZXN0aW9uPT4gIXRoaXMuaXNTa2lwcGVkKHF1ZXN0aW9uKSAmJiAhdGhpcy5pc0NvcnJlY3QocXVlc3Rpb24pKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZSA9IFwiSW5jb3JyZWN0XCI7XG4gICAgICAgIHRoaXMuX3NpemUgPSB0aGlzLl9xdWVzdGlvbnMubGVuZ3RoO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBza2lwcGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZXNzYWdlID0gXCJTa2lwcGVkXCI7XG4gICAgICAgIHRoaXMuX3F1ZXN0aW9ucyA9IHRoaXMuYWxsUXVlc3Rpb25zLmZpbHRlcihxdWVzdGlvbj0+IHRoaXMuaXNTa2lwcGVkKHF1ZXN0aW9uKSk7XG4gICAgICAgIHRoaXMuX3NpemUgPSB0aGlzLl9xdWVzdGlvbnMubGVuZ3RoO1xuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgfVxuXG4gICAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlO1xuICAgIH1cblxuICAgIGdldCBxdWVzdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVzdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGdldENvbG9yKCkge1xuICAgICAgICByZXR1cm4gJ3NraXBwZWQnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNDb3JyZWN0KHF1ZXN0aW9uOiBJUXVlc3Rpb25XcmFwcGVyKSB7XG4gICAgICAgIGxldCBpc0NvcnJlY3QgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgcXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCAmJiBvcHRpb24uY29ycmVjdCkge1xuICAgICAgICAgICAgICAgIGlzQ29ycmVjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzQ29ycmVjdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU2tpcHBlZChxdWVzdGlvbjogSVF1ZXN0aW9uV3JhcHBlcikge1xuICAgICAgICBsZXQgaXNTa2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgcXVlc3Rpb24ucXVlc3Rpb24ub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGlzU2tpcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1NraXBwZWQ7XG4gICAgfVxufSJdfQ==