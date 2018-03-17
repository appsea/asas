"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var question_view_model_1 = require("./question-view-model");
var application = require("application");
var application_1 = require("application");
var settings_service_1 = require("../services/settings.service");
var vm;
var optionList;
var lab;
var _page;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (!settings_service_1.SettingsService.route()) {
        var page = args.object;
        _page = page;
        optionList = page.getViewById("optionList");
        lab = page.getViewById("lab");
        vm = new question_view_model_1.QuestionViewModel(settings_service_1.SettingsService.PRACTICE);
        page.bindingContext = vm;
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            previous();
            data.cancel = true;
        });
    }
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
    console.log(args.direction);
    if (args.direction == 1) {
        previous();
    }
    else if (args.direction == 2) {
        next();
    }
}
exports.handleSwipe = handleSwipe;
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
    optionList.refresh();
}
exports.showAnswer = showAnswer;
function showExplanation() {
    console.log("Explanation would be shown...");
}
exports.showExplanation = showExplanation;
function selectOption(args) {
    vm.showAnswer();
    vm.selectOption(args);
    optionList.refresh();
}
exports.selectOption = selectOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJhY3RpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmFjdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQUFtQztBQUduQyw2REFBMEQ7QUFFMUQseUNBQTJDO0FBRTNDLDJDQUFzRjtBQUN0RixpRUFBNkQ7QUFFN0QsSUFBSSxFQUFxQixDQUFDO0FBQzFCLElBQUksVUFBNkIsQ0FBQztBQUNsQyxJQUFJLEdBQVEsQ0FBQztBQUNiLElBQUksS0FBVSxDQUFDO0FBRWY7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELEVBQUUsQ0FBQSxDQUFDLENBQUMsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBLENBQUM7UUFDekIsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsRUFBRSxHQUFHLElBQUksdUNBQWlCLENBQUMsa0NBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQ0FBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQXlDO1lBQzFHLFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQztBQWxCRCx3Q0FrQkM7QUFFRDs7Ozs4REFJOEQ7QUFDOUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBTSxVQUFVLEdBQWtCLGVBQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUhELDhDQUdDO0FBRUQscUJBQTRCLElBQUk7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDM0IsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0FBQ0wsQ0FBQztBQVBELGtDQU9DO0FBRUQ7SUFDSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEIsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRkQsb0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixDQUFDO0FBRkQsd0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFGRCxvQkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBSEQsZ0NBR0M7QUFFRDtJQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRkQsMENBRUM7QUFFRCxzQkFBNkIsSUFBSTtJQUM3QixFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEIsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUpELG9DQUlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRlZERhdGEsIFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHsgUXVlc3Rpb25WaWV3TW9kZWwgfSBmcm9tIFwiLi9xdWVzdGlvbi12aWV3LW1vZGVsXCI7XHJcbmltcG9ydCAqIGFzIExpc3RWaWV3IGZyb20gXCJ1aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvc2V0dGluZ3Muc2VydmljZVwiO1xyXG5cclxubGV0IHZtOiBRdWVzdGlvblZpZXdNb2RlbDtcclxubGV0IG9wdGlvbkxpc3Q6IExpc3RWaWV3Lkxpc3RWaWV3O1xyXG5sZXQgbGFiOiBhbnk7XHJcbmxldCBfcGFnZTogYW55O1xyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlmKCFTZXR0aW5nc1NlcnZpY2Uucm91dGUoKSl7XHJcbiAgICAgICAgY29uc3QgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIF9wYWdlID0gcGFnZTtcclxuICAgICAgICBvcHRpb25MaXN0ID0gcGFnZS5nZXRWaWV3QnlJZChcIm9wdGlvbkxpc3RcIik7XHJcbiAgICAgICAgbGFiID0gcGFnZS5nZXRWaWV3QnlJZChcImxhYlwiKTtcclxuICAgICAgICB2bSA9IG5ldyBRdWVzdGlvblZpZXdNb2RlbChTZXR0aW5nc1NlcnZpY2UuUFJBQ1RJQ0UpO1xyXG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2bTtcclxuICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBwcmV2aW91cygpO1xyXG4gICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgUmFkU2lkZURyYXdlciB2aWV3IGFuZFxyXG4qIHVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uRHJhd2VyQnV0dG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNpZGVEcmF3ZXJcIik7XHJcbiAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN3aXBlKGFyZ3MpIHtcclxuICAgIGNvbnNvbGUubG9nKGFyZ3MuZGlyZWN0aW9uKTtcclxuICAgIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgIH0gZWxzZSBpZihhcmdzLmRpcmVjdGlvbiA9PSAyKXtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91cygpOiB2b2lkIHtcclxuICAgIHZtLnByZXZpb3VzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0KCk6IHZvaWQge1xyXG4gICAgdm0ubmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Fuc3dlcigpOiB2b2lkIHtcclxuICAgIHZtLnNob3dBbnN3ZXIoKTtcclxuICAgIG9wdGlvbkxpc3QucmVmcmVzaCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0V4cGxhbmF0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJFeHBsYW5hdGlvbiB3b3VsZCBiZSBzaG93bi4uLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdE9wdGlvbihhcmdzKTogdm9pZCB7XHJcbiAgICB2bS5zaG93QW5zd2VyKCk7XHJcbiAgICB2bS5zZWxlY3RPcHRpb24oYXJncyk7XHJcbiAgICBvcHRpb25MaXN0LnJlZnJlc2goKTtcclxufSJdfQ==