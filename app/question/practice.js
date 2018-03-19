"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var LabelModule = require("tns-core-modules/ui/label");
var text_view_1 = require("ui/text-view");
var question_view_model_1 = require("./question-view-model");
var application = require("application");
var application_1 = require("application");
var settings_service_1 = require("../services/settings.service");
var nativescript_popup_1 = require("nativescript-popup");
var vm;
var optionList;
var explanationLabel;
var suggestionButton;
var _page;
var scrollView;
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
        explanationLabel = page.getViewById("explanation");
        scrollView = page.getViewById("scrollView");
        suggestionButton = page.getViewById("suggestionButton");
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
    if (args.direction == 1) {
        previous();
    }
    else if (args.direction == 2) {
        next();
    }
}
exports.handleSwipe = handleSwipe;
function moveToLast() {
    suggestionButton = _page.getViewById("suggestionButton");
    scrollView.scrollToVerticalOffset(suggestionButton.getLocationRelativeTo(scrollView).y, false);
}
exports.moveToLast = moveToLast;
function goToEditPage() {
    vm.goToEditPage();
}
exports.goToEditPage = goToEditPage;
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
function showAnswer() {
    vm.showAnswer();
    optionList.refresh();
    moveToLast();
}
exports.showAnswer = showAnswer;
function showExplanation() {
    console.log("Explanation would be shown...");
    var popup = new nativescript_popup_1.Popup({
        backgroundColor: '#198696',
        height: 500,
        width: 500,
        unit: 'dp',
        elevation: 100,
        borderRadius: 25
    });
    var view = new LabelModule.Label();
    view.text = "Test";
    /* Android */
    var nativeView = new text_view_1.TextView();
    nativeView.text = "Native";
    nativeView.width = 50;
    nativeView.height = 50;
    /* -- Android */
    //popup.showPopup(anchor: View | nativeView , view: View | nativeView);
    console.log("About to show popup...");
    popup.showPopup(view, nativeView);
    console.log("Done...");
}
exports.showExplanation = showExplanation;
function selectOption(args) {
    vm.showAnswer();
    vm.selectOption(args);
    optionList.refresh();
    moveToLast();
}
exports.selectOption = selectOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJhY3RpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmFjdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQUFpQztBQUdqQyx1REFBeUQ7QUFFekQsMENBQXNDO0FBQ3RDLDZEQUF3RDtBQUN4RCx5Q0FBMkM7QUFDM0MsMkNBQW9GO0FBRXBGLGlFQUE2RDtBQUM3RCx5REFBeUM7QUFJekMsSUFBSSxFQUFxQixDQUFDO0FBQzFCLElBQUksVUFBb0IsQ0FBQztBQUN6QixJQUFJLGdCQUFtQyxDQUFDO0FBQ3hDLElBQUksZ0JBQXFDLENBQUM7QUFDMUMsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLFVBQXNCLENBQUM7QUFFM0I7OzhEQUU4RDtBQUM5RCx3QkFBK0IsSUFBbUI7SUFDOUM7Ozs7a0VBSThEO0lBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsa0NBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEQsRUFBRSxHQUFHLElBQUksdUNBQWlCLENBQUMsa0NBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQ0FBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQXlDO1lBQzFHLFFBQVEs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O0FBRUQsc0JBQTZCLElBQUk7SUFDN0IsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLFVBQVUsRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFMRCxvQ0FLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnREYXRhfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7UmFkU2lkZURyYXdlcn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQge3RvcG1vc3R9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQge05hdmlnYXRlZERhdGEsIFBhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7U2Nyb2xsVmlld30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIjtcclxuaW1wb3J0ICogYXMgTGFiZWxNb2R1bGUgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuaW1wb3J0ICogYXMgQnV0dG9uTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQge1RleHRWaWV3fSBmcm9tIFwidWkvdGV4dC12aWV3XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25WaWV3TW9kZWx9IGZyb20gXCIuL3F1ZXN0aW9uLXZpZXctbW9kZWxcIjtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7QW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEsIEFuZHJvaWRBcHBsaWNhdGlvbn0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7aXNBbmRyb2lkfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7UG9wdXB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wb3B1cCc7XHJcbmltcG9ydCB7UmVwZWF0ZXJ9IGZyb20gJ3VpL3JlcGVhdGVyJztcclxuaW1wb3J0IHtMYWJlbH0gZnJvbSAndWkvbGFiZWwnO1xyXG5cclxubGV0IHZtOiBRdWVzdGlvblZpZXdNb2RlbDtcclxubGV0IG9wdGlvbkxpc3Q6IFJlcGVhdGVyO1xyXG5sZXQgZXhwbGFuYXRpb25MYWJlbDogTGFiZWxNb2R1bGUuTGFiZWw7XHJcbmxldCBzdWdnZXN0aW9uQnV0dG9uOiBCdXR0b25Nb2R1bGUuQnV0dG9uO1xyXG5sZXQgX3BhZ2U6IGFueTtcclxubGV0IHNjcm9sbFZpZXc6IFNjcm9sbFZpZXc7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFVzZSB0aGUgXCJvbk5hdmlnYXRpbmdUb1wiIGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcGFnZSBiaW5kaW5nIGNvbnRleHQuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbk5hdmlnYXRpbmdUbyhhcmdzOiBOYXZpZ2F0ZWREYXRhKSB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJvbk5hdmlnYXRpbmdUb1wiIGV2ZW50IGhhbmRsZXIgbGV0cyB5b3UgZGV0ZWN0IGlmIHRoZSB1c2VyIG5hdmlnYXRlZCB3aXRoIGEgYmFjayBidXR0b24uXHJcbiAgICAqIFNraXBwaW5nIHRoZSByZS1pbml0aWFsaXphdGlvbiBvbiBiYWNrIG5hdmlnYXRpb24gbWVhbnMgdGhlIHVzZXIgd2lsbCBzZWUgdGhlXHJcbiAgICAqIHBhZ2UgaW4gdGhlIHNhbWUgZGF0YSBzdGF0ZSB0aGF0IGhlIGxlZnQgaXQgaW4gYmVmb3JlIG5hdmlnYXRpbmcuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgaWYgKCFTZXR0aW5nc1NlcnZpY2Uucm91dGUoKSkge1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgICAgICBfcGFnZSA9IHBhZ2U7XHJcbiAgICAgICAgb3B0aW9uTGlzdCA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJvcHRpb25MaXN0XCIpO1xyXG4gICAgICAgIGV4cGxhbmF0aW9uTGFiZWwgPSBwYWdlLmdldFZpZXdCeUlkKFwiZXhwbGFuYXRpb25cIik7XHJcbiAgICAgICAgc2Nyb2xsVmlldyA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJzY3JvbGxWaWV3XCIpO1xyXG4gICAgICAgIHN1Z2dlc3Rpb25CdXR0b24gPSBwYWdlLmdldFZpZXdCeUlkKFwic3VnZ2VzdGlvbkJ1dHRvblwiKTtcclxuICAgICAgICB2bSA9IG5ldyBRdWVzdGlvblZpZXdNb2RlbChTZXR0aW5nc1NlcnZpY2UuUFJBQ1RJQ0UpO1xyXG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSB2bTtcclxuICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBwcmV2aW91cygpO1xyXG4gICAgICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgUmFkU2lkZURyYXdlciB2aWV3IGFuZFxyXG4qIHVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uRHJhd2VyQnV0dG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNpZGVEcmF3ZXJcIik7XHJcbiAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN3aXBlKGFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5kaXJlY3Rpb24gPT0gMikge1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVUb0xhc3QoKSB7XHJcbiAgICBzdWdnZXN0aW9uQnV0dG9uID0gX3BhZ2UuZ2V0Vmlld0J5SWQoXCJzdWdnZXN0aW9uQnV0dG9uXCIpO1xyXG4gICAgc2Nyb2xsVmlldy5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KHN1Z2dlc3Rpb25CdXR0b24uZ2V0TG9jYXRpb25SZWxhdGl2ZVRvKHNjcm9sbFZpZXcpLnksIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdvVG9FZGl0UGFnZSgpOiB2b2lkIHtcclxuICAgIHZtLmdvVG9FZGl0UGFnZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJldmlvdXMoKTogdm9pZCB7XHJcbiAgICB2bS5wcmV2aW91cygpO1xyXG4gICAgc2Nyb2xsVmlldy5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KDAsIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5leHQoKTogdm9pZCB7XHJcbiAgICB2bS5uZXh0KCk7XHJcbiAgICBzY3JvbGxWaWV3LnNjcm9sbFRvVmVydGljYWxPZmZzZXQoMCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Fuc3dlcigpOiB2b2lkIHtcclxuICAgIHZtLnNob3dBbnN3ZXIoKTtcclxuICAgIG9wdGlvbkxpc3QucmVmcmVzaCgpO1xyXG4gICAgbW92ZVRvTGFzdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0V4cGxhbmF0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc29sZS5sb2coXCJFeHBsYW5hdGlvbiB3b3VsZCBiZSBzaG93bi4uLlwiKTtcclxuICAgIGNvbnN0IHBvcHVwID0gbmV3IFBvcHVwKHtcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMTk4Njk2JyxcclxuICAgICAgICBoZWlnaHQ6IDUwMCxcclxuICAgICAgICB3aWR0aDogNTAwLFxyXG4gICAgICAgIHVuaXQ6ICdkcCcsXHJcbiAgICAgICAgZWxldmF0aW9uOiAxMDAsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAyNVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB2aWV3ID0gbmV3IExhYmVsTW9kdWxlLkxhYmVsKCk7XHJcbiAgICB2aWV3LnRleHQgPSBcIlRlc3RcIjtcclxuXHJcbiAgICAvKiBBbmRyb2lkICovXHJcbiAgICBjb25zdCBuYXRpdmVWaWV3OlRleHRWaWV3ID0gbmV3IFRleHRWaWV3KCk7XHJcbiAgICBuYXRpdmVWaWV3LnRleHQgPSBcIk5hdGl2ZVwiO1xyXG4gICAgbmF0aXZlVmlldy53aWR0aCA9IDUwO1xyXG4gICAgbmF0aXZlVmlldy5oZWlnaHQgPSA1MDtcclxuICAgIC8qIC0tIEFuZHJvaWQgKi9cclxuXHJcbiAgICAvL3BvcHVwLnNob3dQb3B1cChhbmNob3I6IFZpZXcgfCBuYXRpdmVWaWV3ICwgdmlldzogVmlldyB8IG5hdGl2ZVZpZXcpO1xyXG4gICAgY29uc29sZS5sb2coXCJBYm91dCB0byBzaG93IHBvcHVwLi4uXCIpO1xyXG4gICAgcG9wdXAuc2hvd1BvcHVwKHZpZXcsIG5hdGl2ZVZpZXcpO1xyXG4gICAgY29uc29sZS5sb2coXCJEb25lLi4uXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0T3B0aW9uKGFyZ3MpOiB2b2lkIHtcclxuICAgIHZtLnNob3dBbnN3ZXIoKTtcclxuICAgIHZtLnNlbGVjdE9wdGlvbihhcmdzKTtcclxuICAgIG9wdGlvbkxpc3QucmVmcmVzaCgpO1xyXG4gICAgbW92ZVRvTGFzdCgpO1xyXG59Il19