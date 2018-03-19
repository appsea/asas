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
var scrollView;
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
    scrollView = page.getViewById("scrollView");
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
function goToEditPage() {
    vm.goToEditPage();
}
exports.goToEditPage = goToEditPage;
function selectOption(args) {
    vm.selectOption(args);
    optionList.refresh();
}
exports.selectOption = selectOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQ0FBbUM7QUFJbkMsNkRBQTBEO0FBRTFELHlDQUEyQztBQUMzQyxxQ0FBcUM7QUFDckMsMkNBQXNGO0FBQ3RGLGlFQUE2RDtBQUc3RCxJQUFJLEVBQXFCLENBQUM7QUFDMUIsSUFBSSxVQUE2QixDQUFDO0FBQ2xDLElBQUksVUFBc0IsQ0FBQztBQUUzQixzQkFBNkIsSUFBZTtJQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdDQUFrQixDQUFDLHdCQUF3QixFQUFFLFVBQUMsSUFBeUM7UUFDMUcsUUFBUSxFQUFFLENBQUM7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCxvQ0FRQztBQUVEOzs4REFFOEQ7QUFDOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLEVBQUUsR0FBRyxJQUFJLHVDQUFpQixDQUFDLGtDQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDekIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztRQUMxRyxRQUFRLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWZELHdDQWVDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVELHFCQUE0QixJQUFJO0lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixRQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO1FBQzNCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztBQUNMLENBQUM7QUFORCxrQ0FNQztBQUVEO0lBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFGRCwwQkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xCLENBQUM7QUFGRCw0QkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUZELG9CQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsQ0FBQztBQUZELHdCQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRkQsb0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN0QixDQUFDO0FBRkQsb0NBRUM7QUFFRCxzQkFBNkIsSUFBSTtJQUM3QixFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBSEQsb0NBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHsgTmF2aWdhdGVkRGF0YSwgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcblxyXG5pbXBvcnQgeyBRdWVzdGlvblZpZXdNb2RlbCB9IGZyb20gXCIuL3F1ZXN0aW9uLXZpZXctbW9kZWxcIjtcclxuaW1wb3J0ICogYXMgTGlzdFZpZXcgZnJvbSBcInVpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNjcm9sbFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiO1xyXG5cclxubGV0IHZtOiBRdWVzdGlvblZpZXdNb2RlbDtcclxubGV0IG9wdGlvbkxpc3Q6IExpc3RWaWV3Lkxpc3RWaWV3O1xyXG5sZXQgc2Nyb2xsVmlldzogU2Nyb2xsVmlldztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblBhZ2VMb2FkZWQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIG9wdGlvbkxpc3QgPSBwYWdlLmdldFZpZXdCeUlkKFwib3B0aW9uTGlzdFwiKTtcclxuICAgIHNjcm9sbFZpZXcgPSBwYWdlLmdldFZpZXdCeUlkKFwic2Nyb2xsVmlld1wiKTtcclxuICAgIHZtID0gbmV3IFF1ZXN0aW9uVmlld01vZGVsKFNldHRpbmdzU2VydmljZS5NQUlOKTtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2bTtcclxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3dpcGUoYXJncykge1xyXG4gICAgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcclxuICAgICAgICBwcmV2aW91cygpO1xyXG4gICAgfSBlbHNlIGlmKGFyZ3MuZGlyZWN0aW9uID09IDIpe1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNYXAoKTogdm9pZCB7XHJcbiAgICB2bS5zaG93TWFwKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91cygpOiB2b2lkIHtcclxuICAgIHZtLnByZXZpb3VzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0KCk6IHZvaWQge1xyXG4gICAgdm0ubmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Fuc3dlcigpOiB2b2lkIHtcclxuICAgIHZtLnNob3dBbnN3ZXIoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdvVG9FZGl0UGFnZSgpOiB2b2lkIHtcclxuICAgIHZtLmdvVG9FZGl0UGFnZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0T3B0aW9uKGFyZ3MpOiB2b2lkIHtcclxuICAgIHZtLnNlbGVjdE9wdGlvbihhcmdzKTtcclxuICAgIG9wdGlvbkxpc3QucmVmcmVzaCgpO1xyXG59XHJcblxyXG4iXX0=