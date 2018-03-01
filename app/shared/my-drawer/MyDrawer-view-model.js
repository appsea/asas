"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var observable_property_decorator_1 = require("../../shared/observable-property-decorator");
/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer custom component view model.
*************************************************************/
var MyDrawerViewModel = /** @class */ (function (_super) {
    __extends(MyDrawerViewModel, _super);
    /* ***********************************************************
    * Use the MyDrawer view model constructor to initialize the properties data values.
    *************************************************************/
    function MyDrawerViewModel(selectedPage) {
        var _this = _super.call(this) || this;
        _this.selectedPage = selectedPage;
        return _this;
    }
    __decorate([
        observable_property_decorator_1.ObservableProperty(),
        __metadata("design:type", String)
    ], MyDrawerViewModel.prototype, "selectedPage", void 0);
    return MyDrawerViewModel;
}(observable_1.Observable));
exports.MyDrawerViewModel = MyDrawerViewModel;
