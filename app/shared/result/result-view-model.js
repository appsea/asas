"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var navigationModule = require("../navigation");
var question_util_1 = require("../../services/question.util");
var settings_service_1 = require("../../services/settings.service");
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
        settings_service_1.SettingsService.getInstance().saveScore(this._state.mode, Number(this._percentage));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXN1bHQtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFzRDtBQUV0RCxnREFBa0Q7QUFDbEQsOERBQTBEO0FBQzFELG9FQUFnRTtBQUVoRTtJQUFxQyxtQ0FBVTtJQU8zQyx5QkFBWSxLQUFZO1FBQXhCLFlBQ0ksaUJBQU8sU0FJVjtRQVhELGNBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsaUJBQVcsR0FBVyxHQUFHLENBQUM7UUFFbEIsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBSXpCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O0lBQ3BCLENBQUM7SUFFTyxrQ0FBUSxHQUFoQjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUNiO1lBQ0ksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ3pDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN0QyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDN0MsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLGlDQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUI7WUFDekMsWUFBWSxFQUFFLE9BQU87WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3JCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUM7WUFDUixNQUFNLEVB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QUFxQyx1QkFBVSxHQStGOUM7QUEvRlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge1N0YXRlfSBmcm9tIFwiLi4vcXVlc3Rpb25zLm1vZGVsXCI7XHJcbmltcG9ydCAqIGFzIG5hdmlnYXRpb25Nb2R1bGUgZnJvbSAnLi4vbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7UXVlc3Rpb25VdGlsfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvcXVlc3Rpb24udXRpbFwiO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bHRWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIF9jb3JyZWN0OiBudW1iZXIgPSAwO1xyXG4gICAgX3BlcmNlbnRhZ2U6IHN0cmluZyA9IFwiMFwiO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlO1xyXG4gICAgcHJpdmF0ZSBfd3Jvbmc6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9za2lwcGVkOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlOiBTdGF0ZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVJlc3VsdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuc2V0KFwicmVzdWx0XCIsXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHsgQnJhbmQ6IFwiQ29ycmVjdFwiLCBDb3VudDogdGhpcy5fY29ycmVjdH0sXHJcbiAgICAgICAgICAgICAgICB7IEJyYW5kOiBcIldyb25nXCIsIENvdW50OiB0aGlzLl93cm9uZyB9LFxyXG4gICAgICAgICAgICAgICAgeyBCcmFuZDogXCJTa2lwcGVkXCIsIENvdW50OiB0aGlzLl9za2lwcGVkIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHB1Ymxpc2goKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xyXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6ICdzdGF0ZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9zdGF0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnd3JvbmcnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fd3JvbmdcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGlmeSh7XHJcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsXHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogJ3BlcmNlbnRhZ2UnLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fcGVyY2VudGFnZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm90aWZ5KHtcclxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxyXG4gICAgICAgICAgICBldmVudE5hbWU6IE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCxcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiAnY29ycmVjdCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9jb3JyZWN0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RGV0YWlsZWRSZXN1bHQoKSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbk1vZHVsZS5nb3RvUmVzdWx0UGFnZSh0aGlzLl9zdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0Fuc3dlcigpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FsY3VsYXRlUmVzdWx0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgcXVlc3Rpb24gb2YgdGhpcy5fc3RhdGUucXVlc3Rpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChRdWVzdGlvblV0aWwuaXNDb3JyZWN0KHF1ZXN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29ycmVjdCA9IHRoaXMuX2NvcnJlY3QgKyAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoUXVlc3Rpb25VdGlsLmlzU2tpcHBlZChxdWVzdGlvbikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpcHBlZCA9IHRoaXMuX3NraXBwZWQgKyAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JvbmcgPSB0aGlzLl93cm9uZyArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGVyY2VudGFnZSA9ICh0aGlzLl9jb3JyZWN0ICogMTAwIC8gdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aCkudG9GaXhlZCgyKTtcclxuICAgICAgICBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5zYXZlU2NvcmUodGhpcy5fc3RhdGUubW9kZSwgTnVtYmVyKHRoaXMuX3BlcmNlbnRhZ2UpKTtcclxuICAgICAgICB0aGlzLnB1Ymxpc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd3JvbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyb25nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb3JyZWN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3JyZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwZXJjZW50YWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJjZW50YWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3RhbFF1ZXN0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUucXVlc3Rpb25zLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGRldGFpbGVkUmVzdWx0KCkge1xyXG4gICAgICAgIG5hdmlnYXRpb25Nb2R1bGUuZ290b0RldGFpbHNQYWdlKHRoaXMuX3N0YXRlKTtcclxuICAgIH1cclxufSJdfQ==