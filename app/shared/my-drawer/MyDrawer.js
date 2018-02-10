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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlEcmF3ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeURyYXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGtDQUFtQztBQUVuQyw2REFBMEQ7QUFDMUQsdURBQXlEO0FBQ3pELHVEQUF1QztBQUV2Qzs7OERBRThEO0FBQzlELGtCQUF5QixJQUFlO0lBQ3BDLElBQU0sU0FBUyxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRCxTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksdUNBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUxELDRCQUtDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDZCQUFvQyxJQUFlO0lBQy9DLElBQU0sU0FBUyxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxlQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDZixVQUFVLEVBQUUsY0FBYztRQUMxQixVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTTtTQUNmO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELGtEQVVDO0FBRUQsZUFBc0IsSUFBZTtJQUNqQyxXQUFXLENBQUMsU0FBUyxDQUFDLHdFQUF3RTtRQUMxRix5R0FBeUcsQ0FBQyxDQUFDO0FBQ25ILENBQUM7QUFIRCxzQkFHQztBQUVELGdCQUF1QixJQUFlO0lBQ2xDLHdCQUFJLEVBQUUsQ0FBQztBQUNYLENBQUM7QUFGRCx3QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiO1xuaW1wb3J0IHsgTXlEcmF3ZXJWaWV3TW9kZWwgfSBmcm9tIFwiLi9NeURyYXdlci12aWV3LW1vZGVsXCI7XG5pbXBvcnQgKiBhcyBTb2NpYWxTaGFyZSBmcm9tICduYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlJztcbmltcG9ydCB7ZXhpdH0gZnJvbSAnbmF0aXZlc2NyaXB0LWV4aXQnO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBVc2UgdGhlIFwibG9hZGVkXCIgZXZlbnQgaGFuZGxlciBvZiB0aGUgd3JhcHBpbmcgbGF5b3V0IGVsZW1lbnQgdG8gYmluZCB0aGUgdmlldyBtb2RlbCB0byB5b3VyIHZpZXcuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IDxHcmlkTGF5b3V0PmFyZ3Mub2JqZWN0O1xuICAgIGNvbnN0IGNvbXBvbmVudFRpdGxlID0gY29tcG9uZW50LmdldChcInNlbGVjdGVkUGFnZVwiKTtcblxuICAgIGNvbXBvbmVudC5iaW5kaW5nQ29udGV4dCA9IG5ldyBNeURyYXdlclZpZXdNb2RlbChjb21wb25lbnRUaXRsZSk7XG59XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIFVzZSB0aGUgXCJ0YXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSA8R3JpZExheW91dD4gY29tcG9uZW50IGZvciBoYW5kbGluZyBuYXZpZ2F0aW9uIGl0ZW0gdGFwcy5cbiogVGhlIFwidGFwXCIgZXZlbnQgaGFuZGxlciBvZiB0aGUgYXBwIGRyYXdlciA8R3JpZExheW91dD4gaXRlbSBpcyB1c2VkIHRvIG5hdmlnYXRlIHRoZSBhcHBcbiogYmFzZWQgb24gdGhlIHRhcHBlZCBuYXZpZ2F0aW9uSXRlbSdzIHJvdXRlLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpb25JdGVtVGFwKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IDxHcmlkTGF5b3V0PmFyZ3Mub2JqZWN0O1xuICAgIGNvbnN0IGNvbXBvbmVudFJvdXRlID0gY29tcG9uZW50LmdldChcInJvdXRlXCIpO1xuXG4gICAgdG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgbW9kdWxlTmFtZTogY29tcG9uZW50Um91dGUsXG4gICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoYXJlKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xuICAgIFNvY2lhbFNoYXJlLnNoYXJlVGV4dChcImh0dHBzOi8vcGxheS5nb29nbGUuY29tL3N0b3JlL2FwcHMvZGV0YWlscz9pZD1jb20uZXh1YmVyYW50LnF1aXouc2FzXFxuXCIgK1xuICAgICAgICBcIkhpIHRoZXJlLCBUYWtlIGEgbG9vayBhdCB0aGUgQmFzZSBTYXMgUXVpeiB3aGljaCBJIGFtIHVzaW5nIGZvciBwcmVwYXJpbmcgRm9yIEJhc2UgU0FTIENlcnRpZmljYXRpb24hISFcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XG4gICAgZXhpdCgpO1xufSJdfQ==