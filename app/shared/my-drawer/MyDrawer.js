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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlEcmF3ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeURyYXdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGtDQUFtQztBQUVuQyw2REFBMEQ7QUFDMUQsdURBQXlEO0FBQ3pELHVEQUF1QztBQUN2QyxvRUFBZ0U7QUFFaEU7OzhEQUU4RDtBQUM5RCxrQkFBeUIsSUFBZTtJQUNwQyxJQUFNLFNBQVMsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckQsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLHVDQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFMRCw0QkFLQztBQUVEOzs7OzhEQUk4RDtBQUM5RCw2QkFBb0MsSUFBZTtJQUMvQyxJQUFNLFNBQVMsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFDLElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsa0NBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEQsZUFBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2YsVUFBVSxFQUFFLGNBQWM7UUFDMUIsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCxrREFVQztBQUVELGVBQXNCLElBQWU7SUFDakMsV0FBVyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUI7UUFDM0MseUdBQXlHLENBQUMsQ0FBQztBQUNuSCxDQUFDO0FBSEQsc0JBR0M7QUFFRCxnQkFBdUIsSUFBZTtJQUNsQyx3QkFBSSxFQUFFLENBQUM7QUFDWCxDQUFDO0FBRkQsd0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCI7XHJcbmltcG9ydCB7IE15RHJhd2VyVmlld01vZGVsIH0gZnJvbSBcIi4vTXlEcmF3ZXItdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBTb2NpYWxTaGFyZSBmcm9tICduYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlJztcclxuaW1wb3J0IHtleGl0fSBmcm9tICduYXRpdmVzY3JpcHQtZXhpdCc7XHJcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2V0dGluZ3Muc2VydmljZVwiO1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwibG9hZGVkXCIgZXZlbnQgaGFuZGxlciBvZiB0aGUgd3JhcHBpbmcgbGF5b3V0IGVsZW1lbnQgdG8gYmluZCB0aGUgdmlldyBtb2RlbCB0byB5b3VyIHZpZXcuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWRlZChhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IDxHcmlkTGF5b3V0PmFyZ3Mub2JqZWN0O1xyXG4gICAgY29uc3QgY29tcG9uZW50VGl0bGUgPSBjb21wb25lbnQuZ2V0KFwic2VsZWN0ZWRQYWdlXCIpO1xyXG5cclxuICAgIGNvbXBvbmVudC5iaW5kaW5nQ29udGV4dCA9IG5ldyBNeURyYXdlclZpZXdNb2RlbChjb21wb25lbnRUaXRsZSk7XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcInRhcFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIDxHcmlkTGF5b3V0PiBjb21wb25lbnQgZm9yIGhhbmRsaW5nIG5hdmlnYXRpb24gaXRlbSB0YXBzLlxyXG4qIFRoZSBcInRhcFwiIGV2ZW50IGhhbmRsZXIgb2YgdGhlIGFwcCBkcmF3ZXIgPEdyaWRMYXlvdXQ+IGl0ZW0gaXMgdXNlZCB0byBuYXZpZ2F0ZSB0aGUgYXBwXHJcbiogYmFzZWQgb24gdGhlIHRhcHBlZCBuYXZpZ2F0aW9uSXRlbSdzIHJvdXRlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW9uSXRlbVRhcChhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IDxHcmlkTGF5b3V0PmFyZ3Mub2JqZWN0O1xyXG4gICAgY29uc3QgY29tcG9uZW50Um91dGUgPSBjb21wb25lbnQuZ2V0KFwicm91dGVcIik7XHJcbiAgICBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5zYXZlUm91dGUoY29tcG9uZW50Um91dGUpO1xyXG4gICAgdG9wbW9zdCgpLm5hdmlnYXRlKHtcclxuICAgICAgICBtb2R1bGVOYW1lOiBjb21wb25lbnRSb3V0ZSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFyZShhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcclxuICAgIFNvY2lhbFNoYXJlLnNoYXJlVGV4dChcImh0dHBzOi8vZ29vLmdsL0tnWlFoQVxcblwiICtcclxuICAgICAgICBcIkhpIHRoZXJlLCBUYWtlIGEgbG9vayBhdCB0aGUgQmFzZSBTYXMgUXVpeiB3aGljaCBJIGFtIHVzaW5nIGZvciBwcmVwYXJpbmcgRm9yIEJhc2UgU0FTIENlcnRpZmljYXRpb24hISFcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBleGl0KCk7XHJcbn0iXX0=