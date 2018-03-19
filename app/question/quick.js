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
    /*if (args.isBackNavigation) {
        return;
    }*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQUFtQztBQUVuQyw2REFBMEQ7QUFFMUQseUNBQTJDO0FBQzNDLHFDQUFxQztBQUNyQywyQ0FBc0Y7QUFDdEYsaUVBQTZEO0FBSTdELElBQUksRUFBcUIsQ0FBQztBQUMxQixJQUFJLFVBQTZCLENBQUM7QUFDbEMsSUFBSSxVQUFzQixDQUFDO0FBRTNCLHNCQUE2QixJQUFlO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztRQUMxRyxRQUFRLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVJELG9DQVFDO0FBRUQscUJBQTRCLElBQUk7SUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDM0IsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0FBQ0wsQ0FBQztBQU5ELGtDQU1DO0FBRUQ7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlEOztPQUVHO0lBRUgsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxFQUFFLEdBQUcsSUFBSSx1Q0FBaUIsQ0FBQyxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFmRCx3Q0FlQztBQUVEOzs7OzhEQUk4RDtBQUM5RCwyQkFBa0MsSUFBZTtJQUM3QyxJQUFNLFVBQVUsR0FBa0IsZUFBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBSEQsOENBR0M7QUFFRDtJQUNJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNkLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUhELDRCQUdDO0FBRUQ7SUFDSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDVixVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFIRCxvQkFHQztBQUVEO0lBQ0ksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hCLENBQUM7QUFGRCx3QkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUZELG9CQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDakIsQ0FBQztBQUZELDBCQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQUZELGdDQUVDO0FBRUQsc0JBQTZCLElBQUk7SUFDN0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUhELG9DQUdDO0FBRUQ7SUFDSSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDdEIsQ0FBQztBQUZELG9DQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBRdWVzdGlvblZpZXdNb2RlbCB9IGZyb20gXCIuL3F1ZXN0aW9uLXZpZXctbW9kZWxcIjtcclxuaW1wb3J0ICogYXMgTGlzdFZpZXcgZnJvbSBcInVpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN3aXBlR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIjtcclxuXHJcbmxldCB2bTogUXVlc3Rpb25WaWV3TW9kZWw7XHJcbmxldCBvcHRpb25MaXN0OiBMaXN0Vmlldy5MaXN0VmlldztcclxubGV0IHNjcm9sbFZpZXc6IFNjcm9sbFZpZXc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgaWYgKCFpc0FuZHJvaWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgIHByZXZpb3VzKCk7XHJcbiAgICAgICAgZGF0YS5jYW5jZWwgPSB0cnVlO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTd2lwZShhcmdzKSB7XHJcbiAgICBpZiAoYXJncy5kaXJlY3Rpb24gPT0gMSkge1xyXG4gICAgICAgIHByZXZpb3VzKCk7XHJcbiAgICB9IGVsc2UgaWYoYXJncy5kaXJlY3Rpb24gPT0gMil7XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgLyppZiAoYXJncy5pc0JhY2tOYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSovXHJcblxyXG4gICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgb3B0aW9uTGlzdCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJvcHRpb25MaXN0XCIpO1xyXG4gICAgc2Nyb2xsVmlldyA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJzY3JvbGxWaWV3XCIpO1xyXG4gICAgdm0gPSBuZXcgUXVlc3Rpb25WaWV3TW9kZWwoU2V0dGluZ3NTZXJ2aWNlLlFVSUNLKTtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2bTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJldmlvdXMoKTogdm9pZCB7XHJcbiAgICB2bS5wcmV2aW91cygpO1xyXG4gICAgc2Nyb2xsVmlldy5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KDAsIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5leHQoKTogdm9pZCB7XHJcbiAgICB2bS5uZXh0KCk7XHJcbiAgICBzY3JvbGxWaWV3LnNjcm9sbFRvVmVydGljYWxPZmZzZXQoMCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd01hcCgpOiB2b2lkIHtcclxuICAgIHZtLnNob3dNYXAoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dBbnN3ZXIoKTogdm9pZCB7XHJcbiAgICB2bS5zaG93QW5zd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RPcHRpb24oYXJncyk6IHZvaWQge1xyXG4gICAgdm0uc2VsZWN0T3B0aW9uKGFyZ3MpO1xyXG4gICAgb3B0aW9uTGlzdC5yZWZyZXNoKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnb1RvRWRpdFBhZ2UoKTogdm9pZCB7XHJcbiAgICB2bS5nb1RvRWRpdFBhZ2UoKTtcclxufSJdfQ==