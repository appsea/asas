"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var question_view_model_1 = require("./question-view-model");
var application = require("application");
var platform_1 = require("platform");
var application_1 = require("application");
var settings_service_1 = require("../services/settings.service");
var vm;
var optionList;
function onPageLoaded(args) {
    if (!platform_1.isAndroid) {
        return;
    }
    application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
        previous();
        data.cancel = true;
    });
}
exports.onPageLoaded = onPageLoaded;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    var page = args.object;
    optionList = page.getViewById("optionList");
    vm = new question_view_model_1.QuestionViewModel(settings_service_1.SettingsService.MAIN);
    page.bindingContext = vm;
    application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
        previous();
        data.cancel = true;
    });
}
exports.onNavigatingTo = onNavigatingTo;
/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
function onDrawerButtonTap(args) {
    var sideDrawer = frame_1.topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}
exports.onDrawerButtonTap = onDrawerButtonTap;
function handleSwipe(args) {
    if (args.direction == 1) {
        previous();
    }
    else if (args.direction == 2) {
        next();
    }
}
exports.handleSwipe = handleSwipe;
function showMap() {
    vm.showMap();
}
exports.showMap = showMap;
function previous() {
    vm.previous();
}
exports.previous = previous;
function next() {
    vm.next();
}
exports.next = next;
function submit() {
    vm.submit();
}
exports.submit = submit;
function quit() {
    vm.quit();
}
exports.quit = quit;
function showAnswer() {
    vm.showAnswer();
}
exports.showAnswer = showAnswer;
function selectOption(args) {
    vm.selectOption(args);
    optionList.refresh();
}
exports.selectOption = selectOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQ0FBbUM7QUFJbkMsNkRBQTBEO0FBRTFELHlDQUEyQztBQUMzQyxxQ0FBcUM7QUFDckMsMkNBQXNGO0FBQ3RGLGlFQUE2RDtBQUU3RCxJQUFJLEVBQXFCLENBQUM7QUFDMUIsSUFBSSxVQUE2QixDQUFDO0FBRWxDLHNCQUE2QixJQUFlO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztRQUMxRyxRQUFRLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELG9DQVFDO0FBRUQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsRUFBRSxHQUFHLElBQUksdUNBQWlCLENBQUMsa0NBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN6QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQ0FBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQXlDO1FBQzFHLFFBQVEsRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBZEQsd0NBY0M7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQscUJBQTRCLElBQUk7SUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDM0IsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0FBQ0wsQ0FBQztBQU5ELGtDQU1DO0FBRUQ7SUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDakIsQ0FBQztBQUZELDBCQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEIsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRkQsb0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixDQUFDO0FBRkQsd0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFGRCxvQkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BCLENBQUM7QUFGRCxnQ0FFQztBQUVELHNCQUE2QixJQUFJO0lBQzdCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pCLENBQUM7QUFIRCxvQ0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQgeyBOYXZpZ2F0ZWREYXRhLCBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7IFF1ZXN0aW9uVmlld01vZGVsIH0gZnJvbSBcIi4vcXVlc3Rpb24tdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBMaXN0VmlldyBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuXHJcbmxldCB2bTogUXVlc3Rpb25WaWV3TW9kZWw7XHJcbmxldCBvcHRpb25MaXN0OiBMaXN0Vmlldy5MaXN0VmlldztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblBhZ2VMb2FkZWQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIG9wdGlvbkxpc3QgPSBwYWdlLmdldFZpZXdCeUlkKFwib3B0aW9uTGlzdFwiKTtcclxuICAgIHZtID0gbmV3IFF1ZXN0aW9uVmlld01vZGVsKFNldHRpbmdzU2VydmljZS5NQUlOKTtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2bTtcclxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3dpcGUoYXJncykge1xyXG4gICAgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcclxuICAgICAgICBwcmV2aW91cygpO1xyXG4gICAgfSBlbHNlIGlmKGFyZ3MuZGlyZWN0aW9uID09IDIpe1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNYXAoKTogdm9pZCB7XHJcbiAgICB2bS5zaG93TWFwKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91cygpOiB2b2lkIHtcclxuICAgIHZtLnByZXZpb3VzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0KCk6IHZvaWQge1xyXG4gICAgdm0ubmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Fuc3dlcigpOiB2b2lkIHtcclxuICAgIHZtLnNob3dBbnN3ZXIoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdE9wdGlvbihhcmdzKTogdm9pZCB7XHJcbiAgICB2bS5zZWxlY3RPcHRpb24oYXJncyk7XHJcbiAgICBvcHRpb25MaXN0LnJlZnJlc2goKTtcclxufVxyXG5cclxuIl19