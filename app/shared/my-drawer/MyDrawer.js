"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var MyDrawer_view_model_1 = require("./MyDrawer-view-model");
var SocialShare = require("nativescript-social-share");
var nativescript_exit_1 = require("nativescript-exit");
var settings_service_1 = require("../../services/settings.service");
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
    settings_service_1.SettingsService.getInstance().saveRoute(componentRoute);
    frame_1.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}
exports.onNavigationItemTap = onNavigationItemTap;
function share(args) {
    SocialShare.shareText("https://goo.gl/KgZQhA\n" +
        "Hi there, Take a look at the Base Sas Quiz which I am using for preparing For Base SAS Certification!!!");
}
exports.share = share;
function logout(args) {
    nativescript_exit_1.exit();
}
exports.logout = logout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlEcmF3ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeURyYXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGtDQUFpQztBQUVqQyw2REFBd0Q7QUFDeEQsdURBQXlEO0FBQ3pELHVEQUF1QztBQUN2QyxvRUFBZ0U7QUFFaEU7OzhEQUU4RDtBQUM5RCxrQkFBeUIsSUFBZTtJQUNwQyxJQUFNLFNBQVMsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckQsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLHVDQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFMRCw0QkFLQztBQUVEOzs7OzhEQUk4RDtBQUM5RCw2QkFBb0MsSUFBZTtJQUMvQyxJQUFNLFNBQVMsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsa0NBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEQsZUFBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2YsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCxrREFVQztBQUVELGVBQXNCLElBQWU7SUFDakMsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUI7UUFDM0MseUdBQXlHLENBQUMsQ0FBQztBQUNuSCxDQUFDO0FBSEQsc0JBR0M7QUFFRCxnQkFBdUIsSUFBZTtJQUNsQyx3QkFBSSxFQUFFLENBQUM7QUFDWCxDQUFDO0FBRkQsd0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge3RvcG1vc3R9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQge0dyaWRMYXlvdXR9IGZyb20gXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XHJcbmltcG9ydCB7TXlEcmF3ZXJWaWV3TW9kZWx9IGZyb20gXCIuL015RHJhd2VyLXZpZXctbW9kZWxcIjtcclxuaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSAnbmF0aXZlc2NyaXB0LXNvY2lhbC1zaGFyZSc7XHJcbmltcG9ydCB7ZXhpdH0gZnJvbSAnbmF0aXZlc2NyaXB0LWV4aXQnO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcImxvYWRlZFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIHdyYXBwaW5nIGxheW91dCBlbGVtZW50IHRvIGJpbmQgdGhlIHZpZXcgbW9kZWwgdG8geW91ciB2aWV3LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25Mb2FkZWQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSA8R3JpZExheW91dD5hcmdzLm9iamVjdDtcclxuICAgIGNvbnN0IGNvbXBvbmVudFRpdGxlID0gY29tcG9uZW50LmdldChcInNlbGVjdGVkUGFnZVwiKTtcclxuXHJcbiAgICBjb21wb25lbnQuYmluZGluZ0NvbnRleHQgPSBuZXcgTXlEcmF3ZXJWaWV3TW9kZWwoY29tcG9uZW50VGl0bGUpO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJ0YXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSA8R3JpZExheW91dD4gY29tcG9uZW50IGZvciBoYW5kbGluZyBuYXZpZ2F0aW9uIGl0ZW0gdGFwcy5cclxuKiBUaGUgXCJ0YXBcIiBldmVudCBoYW5kbGVyIG9mIHRoZSBhcHAgZHJhd2VyIDxHcmlkTGF5b3V0PiBpdGVtIGlzIHVzZWQgdG8gbmF2aWdhdGUgdGhlIGFwcFxyXG4qIGJhc2VkIG9uIHRoZSB0YXBwZWQgbmF2aWdhdGlvbkl0ZW0ncyByb3V0ZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGlvbkl0ZW1UYXAoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSA8R3JpZExheW91dD5hcmdzLm9iamVjdDtcclxuICAgIGNvbnN0IGNvbXBvbmVudFJvdXRlID0gY29tcG9uZW50LmdldChcInJvdXRlXCIpO1xyXG4gICAgU2V0dGluZ3NTZXJ2aWNlLmdldEluc3RhbmNlKCkuc2F2ZVJvdXRlKGNvbXBvbmVudFJvdXRlKTtcclxuICAgIHRvcG1vc3QoKS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgbW9kdWxlTmFtZTogY29tcG9uZW50Um91dGUsXHJcbiAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hhcmUoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBTb2NpYWxTaGFyZS5zaGFyZVRleHQoXCJodHRwczovL2dvby5nbC9LZ1pRaEFcXG5cIiArXHJcbiAgICAgICAgXCJIaSB0aGVyZSwgVGFrZSBhIGxvb2sgYXQgdGhlIEJhc2UgU2FzIFF1aXogd2hpY2ggSSBhbSB1c2luZyBmb3IgcHJlcGFyaW5nIEZvciBCYXNlIFNBUyBDZXJ0aWZpY2F0aW9uISEhXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0KGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgZXhpdCgpO1xyXG59Il19