"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var MyDrawer_view_model_1 = require("./MyDrawer-view-model");
var SocialShare = require("nativescript-social-share");
var nativescript_exit_1 = require("nativescript-exit");
/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
function onLoaded(args) {
    var component = args.object;
    var componentTitle = component.get("selectedPage");
    component.bindingContext = new MyDrawer_view_model_1.MyDrawerViewModel(componentTitle);
}
exports.onLoaded = onLoaded;
/* ***********************************************************
* Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
* The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
function onNavigationItemTap(args) {
    var component = args.object;
    var componentRoute = component.get("route");
    frame_1.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}
exports.onNavigationItemTap = onNavigationItemTap;
function share(args) {
    SocialShare.shareText("https://play.google.com/store/apps/details?id=com.exuberant.quiz.sas\n" +
        "Hi there, Take a look at the Base Sas Quiz which I am using for preparing For Base SAS Certification!!!");
}
exports.share = share;
function logout(args) {
    nativescript_exit_1.exit();
}
exports.logout = logout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlEcmF3ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeURyYXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGtDQUFtQztBQUVuQyw2REFBMEQ7QUFDMUQsdURBQXlEO0FBQ3pELHVEQUF1QztBQUV2Qzs7OERBRThEO0FBQzlELGtCQUF5QixJQUFlO0lBQ3BDLElBQU0sU0FBUyxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRCxTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksdUNBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUxELDRCQUtDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDZCQUFvQyxJQUFlO0lBQy9DLElBQU0sU0FBUyxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELGtEQVVDO0FBRUQsZUFBc0IsSUFBZTtJQUNqQyxXQUFXLENBQUMsU0FBUyxDQUFDLHdFQUF3RTtRQUMxRix5R0FBeUcsQ0FBQyxDQUFDO0FBQ25ILENBQUM7QUFIRCxzQkFHQztBQUVELGdCQUF1QixJQUFlO0lBQ2xDLHdCQUFJLEVBQUUsQ0FBQztBQUNYLENBQUM7QUFGRCx3QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBHcmlkTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcclxuaW1wb3J0IHsgTXlEcmF3ZXJWaWV3TW9kZWwgfSBmcm9tIFwiLi9NeURyYXdlci12aWV3LW1vZGVsXCI7XHJcbmltcG9ydCAqIGFzIFNvY2lhbFNoYXJlIGZyb20gJ25hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmUnO1xyXG5pbXBvcnQge2V4aXR9IGZyb20gJ25hdGl2ZXNjcmlwdC1leGl0JztcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcImxvYWRlZFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIHdyYXBwaW5nIGxheW91dCBlbGVtZW50IHRvIGJpbmQgdGhlIHZpZXcgbW9kZWwgdG8geW91ciB2aWV3LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25Mb2FkZWQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSA8R3JpZExheW91dD5hcmdzLm9iamVjdDtcclxuICAgIGNvbnN0IGNvbXBvbmVudFRpdGxlID0gY29tcG9uZW50LmdldChcInNlbGVjdGVkUGFnZVwiKTtcclxuXHJcbiAgICBjb21wb25lbnQuYmluZGluZ0NvbnRleHQgPSBuZXcgTXlEcmF3ZXJWaWV3TW9kZWwoY29tcG9uZW50VGl0bGUpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJ0YXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSA8R3JpZExheW91dD4gY29tcG9uZW50IGZvciBoYW5kbGluZyBuYXZpZ2F0aW9uIGl0ZW0gdGFwcy5cclxuKiBUaGUgXCJ0YXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSBhcHAgZHJhd2VyIDxHcmlkTGF5b3V0PiBpdGVtIGlzIHVzZWQgdG8gbmF2aWdhdGUgdGhlIGFwcFxyXG4qIGJhc2VkIG9uIHRoZSB0YXBwZWQgbmF2aWdhdGlvbkl0ZW0ncyByb3V0ZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGlvbkl0ZW1UYXAoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSA8R3JpZExheW91dD5hcmdzLm9iamVjdDtcclxuICAgIGNvbnN0IGNvbXBvbmVudFJvdXRlID0gY29tcG9uZW50LmdldChcInJvdXRlXCIpO1xyXG5cclxuICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogY29tcG9uZW50Um91dGUsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hhcmUoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBTb2NpYWxTaGFyZS5zaGFyZVRleHQoXCJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS9zdG9yZS9hcHBzL2RldGFpbHM/aWQ9Y29tLmV4dWJlcmFudC5xdWl6LnNhc1xcblwiICtcclxuICAgICAgICBcIkhpIHRoZXJlLCBUYWtlIGEgbG9vayBhdCB0aGUgQmFzZSBTYXMgUXVpeiB3aGljaCBJIGFtIHVzaW5nIGZvciBwcmVwYXJpbmcgRm9yIEJhc2UgU0FTIENlcnRpZmljYXRpb24hISFcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBleGl0KCk7XHJcbn0iXX0=