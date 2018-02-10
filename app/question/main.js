"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var question_view_model_1 = require("./question-view-model");
var application = require("application");
var platform_1 = require("platform");
var application_1 = require("application");
var settings_service_1 = require("../services/settings.service");
var vm;
var list;
function onPageLoaded(args) {
    settings_service_1.SettingsService.getInstance().saveRoute("question/main");
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
    /*if (args.isBackNavigation) {
        return;
    }*/
    var page = args.object;
    list = page.getViewById("listView");
    vm = new question_view_model_1.QuestionViewModel(settings_service_1.SettingsService.MAIN);
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
    list.refresh();
}
exports.selectOption = selectOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQ0FBbUM7QUFHbkMsNkRBQTBEO0FBRTFELHlDQUEyQztBQUMzQyxxQ0FBcUM7QUFDckMsMkNBQXNGO0FBQ3RGLGlFQUE2RDtBQUU3RCxJQUFJLEVBQXFCLENBQUM7QUFDMUIsSUFBSSxJQUF1QixDQUFDO0FBRTVCLHNCQUE2QixJQUFlO0lBQ3hDLGtDQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztRQUMxRyxRQUFRLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVRELG9DQVNDO0FBRUQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlEOztPQUVHO0lBRUgsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxFQUFFLEdBQUcsSUFBSSx1Q0FBaUIsQ0FBQyxrQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFkRCx3Q0FjQztBQUVEOzs7OzhEQUk4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRDtJQUNJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNsQixDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFGRCxvQkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hCLENBQUM7QUFGRCx3QkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUZELG9CQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQUZELGdDQUVDO0FBRUQsc0JBQTZCLElBQUk7SUFDN0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQUhELG9DQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5pbXBvcnQgeyBRdWVzdGlvblZpZXdNb2RlbCB9IGZyb20gXCIuL3F1ZXN0aW9uLXZpZXctbW9kZWxcIjtcbmltcG9ydCAqIGFzIExpc3RWaWV3IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcblxubGV0IHZtOiBRdWVzdGlvblZpZXdNb2RlbDtcbmxldCBsaXN0OiBMaXN0Vmlldy5MaXN0VmlldztcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFnZUxvYWRlZChhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcbiAgICBTZXR0aW5nc1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5zYXZlUm91dGUoXCJxdWVzdGlvbi9tYWluXCIpO1xuICAgIGlmICghaXNBbmRyb2lkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoZGF0YTogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcbiAgICAgICAgcHJldmlvdXMoKTtcbiAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xuICAgIH0pO1xufVxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgLyppZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9Ki9cblxuICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcbiAgICBsaXN0ID0gcGFnZS5nZXRWaWV3QnlJZChcImxpc3RWaWV3XCIpO1xuICAgIHZtID0gbmV3IFF1ZXN0aW9uVmlld01vZGVsKFNldHRpbmdzU2VydmljZS5NQUlOKTtcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdm07XG59XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXG4qIHVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNpZGVEcmF3ZXJcIik7XG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB2bS5wcmV2aW91cygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dCgpOiB2b2lkIHtcbiAgICB2bS5uZXh0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXQoKTogdm9pZCB7XG4gICAgdm0uc3VibWl0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xuICAgIHZtLnF1aXQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dBbnN3ZXIoKTogdm9pZCB7XG4gICAgdm0uc2hvd0Fuc3dlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0T3B0aW9uKGFyZ3MpOiB2b2lkIHtcbiAgICB2bS5zZWxlY3RPcHRpb24oYXJncyk7XG4gICAgbGlzdC5yZWZyZXNoKCk7XG59XG5cbiJdfQ==