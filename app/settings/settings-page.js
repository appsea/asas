"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toast = require("nativescript-toast");
var settings_view_model_1 = require("./settings-view-model");
var frame_1 = require("ui/frame");
var navigationModule = require("../shared/navigation");
var application_1 = require("application");
var platform_1 = require("platform");
var vm;
function onPageLoaded(args) {
    if (!platform_1.isAndroid) {
        return;
    }
    var page = args.object;
    page.on(application_1.AndroidApplication.activityBackPressedEvent, onActivityBackPressedEvent, this);
}
exports.onPageLoaded = onPageLoaded;
function onActivityBackPressedEvent(args) {
    navigationModule.goBack();
    args.cancel = true;
}
exports.onActivityBackPressedEvent = onActivityBackPressedEvent;
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    /*if (args.isBackNavigation) {
        return;
    }*/
    var page = args.object;
    vm = new settings_view_model_1.SettingsViewModel();
    page.bindingContext = vm;
}
exports.onNavigatingTo = onNavigatingTo;
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function save() {
    vm.save();
    Toast.makeText("Saved!!!", "long").show();
}
exports.save = save;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwwQ0FBNEM7QUFFNUMsNkRBQXdEO0FBRXhELGtDQUFpQztBQUNqQyx1REFBeUQ7QUFDekQsMkNBQW9GO0FBQ3BGLHFDQUFtQztBQUVuQyxJQUFJLEVBQXFCLENBQUM7QUFFMUIsc0JBQTZCLElBQWU7SUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBUyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0YsQ0FBQztBQU5ELG9DQU1DO0FBRUQsb0NBQTJDLElBQXlDO0lBQ2hGLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLENBQUM7QUFIRCxnRUFHQztBQUVELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQ7O09BRUc7SUFFSCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLEVBQUUsR0FBRyxJQUFJLHVDQUFpQixFQUFFLENBQUM7SUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQWJELHdDQWFDO0FBRUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQ7SUFDSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDVixLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QyxDQUFDO0FBSEQsb0JBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tICduYXRpdmVzY3JpcHQtdG9hc3QnO1xyXG5pbXBvcnQge05hdmlnYXRlZERhdGEsIFBhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7U2V0dGluZ3NWaWV3TW9kZWx9IGZyb20gXCIuL3NldHRpbmdzLXZpZXctbW9kZWxcIjtcclxuaW1wb3J0IHtSYWRTaWRlRHJhd2VyfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHt0b3Btb3N0fSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0ICogYXMgbmF2aWdhdGlvbk1vZHVsZSBmcm9tICcuLi9zaGFyZWQvbmF2aWdhdGlvbic7XHJcbmltcG9ydCB7QW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEsIEFuZHJvaWRBcHBsaWNhdGlvbn0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7aXNBbmRyb2lkfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmxldCB2bTogU2V0dGluZ3NWaWV3TW9kZWw7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgaWYgKCFpc0FuZHJvaWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcGFnZSA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgcGFnZS5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCBvbkFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkFjdGl2aXR5QmFja1ByZXNzZWRFdmVudChhcmdzOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkge1xyXG4gICAgbmF2aWdhdGlvbk1vZHVsZS5nb0JhY2soKTtcclxuICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvKmlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9Ki9cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICB2bSA9IG5ldyBTZXR0aW5nc1ZpZXdNb2RlbCgpO1xyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IHZtO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZSgpOiB2b2lkIHtcclxuICAgIHZtLnNhdmUoKTtcclxuICAgIFRvYXN0Lm1ha2VUZXh0KFwiU2F2ZWQhISFcIiwgXCJsb25nXCIpLnNob3coKTtcclxufSJdfQ==