"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var question_view_model_1 = require("./question-view-model");
var platform_1 = require("platform");
var application_1 = require("application");
var settings_service_1 = require("../services/settings.service");
var vm;
var optionList;
var scrollView;
function onPageLoaded(args) {
    if (!platform_1.isAndroid) {
        return;
    }
    var page = args.object;
    page.on(application_1.AndroidApplication.activityBackPressedEvent, onActivityBackPressedEvent, this);
}
exports.onPageLoaded = onPageLoaded;
function onActivityBackPressedEvent(args) {
    previous();
    args.cancel = true;
}
exports.onActivityBackPressedEvent = onActivityBackPressedEvent;
function handleSwipe(args) {
    if (args.direction == 1) {
        previous();
    }
    else if (args.direction == 2) {
        next();
    }
}
exports.handleSwipe = handleSwipe;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (args.isBackNavigation) {
        return;
    }
    var page = args.object;
    optionList = page.getViewById("optionList");
    scrollView = page.getViewById("scrollView");
    vm = new question_view_model_1.QuestionViewModel(settings_service_1.SettingsService.QUICK);
    page.bindingContext = vm;
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
function previous() {
    vm.previous();
    scrollView.scrollToVerticalOffset(0, false);
}
exports.previous = previous;
function next() {
    vm.next();
    scrollView.scrollToVerticalOffset(0, false);
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
function showMap() {
    vm.showMap();
}
exports.showMap = showMap;
function showAnswer() {
    vm.showAnswer();
}
exports.showAnswer = showAnswer;
function selectOption(args) {
    vm.selectOption(args);
    optionList.refresh();
}
exports.selectOption = selectOption;
function goToEditPage() {
    vm.goToEditPage();
}
exports.goToEditPage = goToEditPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQUFpQztBQUVqQyw2REFBd0Q7QUFFeEQscUNBQW1DO0FBQ25DLDJDQUE2RjtBQUM3RixpRUFBNkQ7QUFJN0QsSUFBSSxFQUFxQixDQUFDO0FBQzFCLElBQUksVUFBNkIsQ0FBQztBQUNsQyxJQUFJLFVBQXNCLENBQUM7QUFFM0Isc0JBQTZCLElBQWU7SUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBUyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0YsQ0FBQztBQU5ELG9DQU1DO0FBRUQsb0NBQTJDLElBQXlDO0lBQ2hGLFFBQVEsRUFBRSxDQUFDO0lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDdkIsQ0FBQztBQUhELGdFQUdDO0FBRUQscUJBQTRCLElBQUk7SUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDM0IsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0FBQ0wsQ0FBQztBQU5ELGtDQU1DO0FBRUQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsRUFBRSxHQUFHLElBQUksdUNBQWlCLENBQUMsa0NBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBZkQsd0NBZUM7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQ7SUFDSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDZCxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFIRCw0QkFHQztBQUVEO0lBQ0ksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1YsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBSEQsb0JBR0M7QUFFRDtJQUNJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixDQUFDO0FBRkQsd0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFGRCxvQkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFGRCwwQkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BCLENBQUM7QUFGRCxnQ0FFQztBQUVELHNCQUE2QixJQUFJO0lBQzdCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pCLENBQUM7QUFIRCxvQ0FHQztBQUVEO0lBQ0ksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3RCLENBQUM7QUFGRCxvQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7UmFkU2lkZURyYXdlcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7dG9wbW9zdH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7TmF2aWdhdGVkRGF0YSwgUGFnZX0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHtRdWVzdGlvblZpZXdNb2RlbH0gZnJvbSBcIi4vcXVlc3Rpb24tdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBMaXN0VmlldyBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7aXNBbmRyb2lkfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHthbmRyb2lkLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgQW5kcm9pZEFwcGxpY2F0aW9ufSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U3dpcGVHZXN0dXJlRXZlbnREYXRhfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHtTY3JvbGxWaWV3fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiO1xyXG5cclxubGV0IHZtOiBRdWVzdGlvblZpZXdNb2RlbDtcclxubGV0IG9wdGlvbkxpc3Q6IExpc3RWaWV3Lkxpc3RWaWV3O1xyXG5sZXQgc2Nyb2xsVmlldzogU2Nyb2xsVmlldztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblBhZ2VMb2FkZWQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBwYWdlID0gYXJncy5vYmplY3Q7XHJcbiAgICBwYWdlLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIG9uQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCB0aGlzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50KGFyZ3M6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSB7XHJcbiAgICBwcmV2aW91cygpO1xyXG4gICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3dpcGUoYXJncykge1xyXG4gICAgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcclxuICAgICAgICBwcmV2aW91cygpO1xyXG4gICAgfSBlbHNlIGlmKGFyZ3MuZGlyZWN0aW9uID09IDIpe1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgb3B0aW9uTGlzdCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJvcHRpb25MaXN0XCIpO1xyXG4gICAgc2Nyb2xsVmlldyA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJzY3JvbGxWaWV3XCIpO1xyXG4gICAgdm0gPSBuZXcgUXVlc3Rpb25WaWV3TW9kZWwoU2V0dGluZ3NTZXJ2aWNlLlFVSUNLKTtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2bTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJldmlvdXMoKTogdm9pZCB7XHJcbiAgICB2bS5wcmV2aW91cygpO1xyXG4gICAgc2Nyb2xsVmlldy5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KDAsIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5leHQoKTogdm9pZCB7XHJcbiAgICB2bS5uZXh0KCk7XHJcbiAgICBzY3JvbGxWaWV3LnNjcm9sbFRvVmVydGljYWxPZmZzZXQoMCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd01hcCgpOiB2b2lkIHtcclxuICAgIHZtLnNob3dNYXAoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dBbnN3ZXIoKTogdm9pZCB7XHJcbiAgICB2bS5zaG93QW5zd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RPcHRpb24oYXJncyk6IHZvaWQge1xyXG4gICAgdm0uc2VsZWN0T3B0aW9uKGFyZ3MpO1xyXG4gICAgb3B0aW9uTGlzdC5yZWZyZXNoKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnb1RvRWRpdFBhZ2UoKTogdm9pZCB7XHJcbiAgICB2bS5nb1RvRWRpdFBhZ2UoKTtcclxufSJdfQ==