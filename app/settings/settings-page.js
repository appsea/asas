"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toast = require("nativescript-toast");
var settings_view_model_1 = require("./settings-view-model");
var frame_1 = require("ui/frame");
var vm;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtcGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwwQ0FBNEM7QUFFNUMsNkRBQXdEO0FBRXhELGtDQUFtQztBQUVuQyxJQUFJLEVBQXFCLENBQUM7QUFFMUIsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RDs7T0FFRztJQUVILElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsRUFBRSxHQUFHLElBQUksdUNBQWlCLEVBQUUsQ0FBQztJQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBYkQsd0NBYUM7QUFFRCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRDtJQUNJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNWLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFIRCxvQkFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhLCBPYnNlcnZhYmxlfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XHJcbmltcG9ydCB7TmF2aWdhdGVkRGF0YSwgUGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtTZXR0aW5nc1ZpZXdNb2RlbH0gZnJvbSBcIi4vc2V0dGluZ3Mtdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcblxyXG5sZXQgdm06IFNldHRpbmdzVmlld01vZGVsO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvKmlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9Ki9cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICB2bSA9IG5ldyBTZXR0aW5nc1ZpZXdNb2RlbCgpO1xyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IHZtO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2F2ZSgpOiB2b2lkIHtcclxuICAgIHZtLnNhdmUoKTtcclxuICAgIFRvYXN0Lm1ha2VUZXh0KFwiU2F2ZWQhISFcIiwgXCJsb25nXCIpLnNob3coKTtcclxufSJdfQ==