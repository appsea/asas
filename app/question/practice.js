"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var question_view_model_1 = require("./question-view-model");
var application_1 = require("application");
var platform_1 = require("platform");
var settings_service_1 = require("../services/settings.service");
var vm;
var optionList;
var suggestionButton;
var defaultExplanation;
var explanationHeader;
var _page;
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
    suggestionButton = page.getViewById("suggestionButton");
    if (!settings_service_1.SettingsService.route()) {
        _page = page;
        optionList = page.getViewById("optionList");
        scrollView = page.getViewById("scrollView");
        vm = new question_view_model_1.QuestionViewModel(settings_service_1.SettingsService.PRACTICE);
        page.bindingContext = vm;
    }
    else {
        explanationHeader = page.getViewById("explanationHeader");
        defaultExplanation = page.getViewById("defaultExplanation");
        explanationHeader.visibility = "hidden";
        defaultExplanation.visibility = "hidden";
        suggestionButton.visibility = "hidden";
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
    var locationRelativeTo = suggestionButton.getLocationRelativeTo(scrollView);
    if (locationRelativeTo) {
        scrollView.scrollToVerticalOffset(locationRelativeTo.y, false);
    }
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
function selectOption(args) {
    vm.showAnswer();
    vm.selectOption(args);
    optionList.refresh();
    moveToLast();
}
exports.selectOption = selectOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJhY3RpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmFjdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQUFpQztBQUtqQyw2REFBd0Q7QUFDeEQsMkNBQW9GO0FBQ3BGLHFDQUFtQztBQUNuQyxpRUFBNkQ7QUFJN0QsSUFBSSxFQUFxQixDQUFDO0FBQzFCLElBQUksVUFBb0IsQ0FBQztBQUN6QixJQUFJLGdCQUFxQyxDQUFDO0FBQzFDLElBQUksa0JBQXlCLENBQUM7QUFDOUIsSUFBSSxpQkFBd0IsQ0FBQztBQUM3QixJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksVUFBc0IsQ0FBQztBQUUzQixzQkFBNkIsSUFBZTtJQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUNELElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQ0FBa0IsQ0FBQyx3QkFBd0IsRUFBRSwwQkFBMEIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBTkQsb0NBTUM7QUFFRCxvQ0FBMkMsSUFBeUM7SUFDaEYsUUFBUSxFQUFFLENBQUM7SUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUN2QixDQUFDO0FBSEQsZ0VBR0M7QUFFRDs7OERBRThEO0FBQzlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFFOUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQ0FBZSxD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QixVQUFVLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBTEQsb0NBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YSwgT2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge1JhZFNpZGVEcmF3ZXJ9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQge3RvcG1vc3R9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQge05hdmlnYXRlZERhdGEsIFBhZ2V9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7U2Nyb2xsVmlld30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIjtcclxuaW1wb3J0ICogYXMgQnV0dG9uTW9kdWxlIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQge1RleHRWaWV3fSBmcm9tIFwidWkvdGV4dC12aWV3XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25WaWV3TW9kZWx9IGZyb20gXCIuL3F1ZXN0aW9uLXZpZXctbW9kZWxcIjtcclxuaW1wb3J0IHtBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgQW5kcm9pZEFwcGxpY2F0aW9ufSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHtpc0FuZHJvaWR9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtSZXBlYXRlcn0gZnJvbSAndWkvcmVwZWF0ZXInO1xyXG5pbXBvcnQge0xhYmVsfSBmcm9tICd1aS9sYWJlbCc7XHJcblxyXG5sZXQgdm06IFF1ZXN0aW9uVmlld01vZGVsO1xyXG5sZXQgb3B0aW9uTGlzdDogUmVwZWF0ZXI7XHJcbmxldCBzdWdnZXN0aW9uQnV0dG9uOiBCdXR0b25Nb2R1bGUuQnV0dG9uO1xyXG5sZXQgZGVmYXVsdEV4cGxhbmF0aW9uOiBMYWJlbDtcclxubGV0IGV4cGxhbmF0aW9uSGVhZGVyOiBMYWJlbDtcclxubGV0IF9wYWdlOiBhbnk7XHJcbmxldCBzY3JvbGxWaWV3OiBTY3JvbGxWaWV3O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFnZUxvYWRlZChhcmdzOiBFdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGlmICghaXNBbmRyb2lkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgIHBhZ2Uub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgb25BY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIHRoaXMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25BY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQoYXJnczogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpIHtcclxuICAgIHByZXZpb3VzKCk7XHJcbiAgICBhcmdzLmNhbmNlbCA9IHRydWU7XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgaWYgKGFyZ3MuaXNCYWNrTmF2aWdhdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBzdWdnZXN0aW9uQnV0dG9uID0gcGFnZS5nZXRWaWV3QnlJZChcInN1Z2dlc3Rpb25CdXR0b25cIik7XHJcbiAgICBpZiAoIVNldHRpbmdzU2VydmljZS5yb3V0ZSgpKSB7XHJcbiAgICAgICAgX3BhZ2UgPSBwYWdlO1xyXG4gICAgICAgIG9wdGlvbkxpc3QgPSBwYWdlLmdldFZpZXdCeUlkKFwib3B0aW9uTGlzdFwiKTtcclxuICAgICAgICBzY3JvbGxWaWV3ID0gcGFnZS5nZXRWaWV3QnlJZChcInNjcm9sbFZpZXdcIik7XHJcbiAgICAgICAgdm0gPSBuZXcgUXVlc3Rpb25WaWV3TW9kZWwoU2V0dGluZ3NTZXJ2aWNlLlBSQUNUSUNFKTtcclxuICAgICAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdm07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBleHBsYW5hdGlvbkhlYWRlciA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJleHBsYW5hdGlvbkhlYWRlclwiKTtcclxuICAgICAgICBkZWZhdWx0RXhwbGFuYXRpb24gPSBwYWdlLmdldFZpZXdCeUlkKFwiZGVmYXVsdEV4cGxhbmF0aW9uXCIpO1xyXG4gICAgICAgIGV4cGxhbmF0aW9uSGVhZGVyLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIGRlZmF1bHRFeHBsYW5hdGlvbi52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBzdWdnZXN0aW9uQnV0dG9uLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4qIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBSYWRTaWRlRHJhd2VyIHZpZXcgYW5kXHJcbiogdXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25EcmF3ZXJCdXR0b25UYXAoYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+dG9wbW9zdCgpLmdldFZpZXdCeUlkKFwic2lkZURyYXdlclwiKTtcclxuICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3dpcGUoYXJncykge1xyXG4gICAgaWYgKGFyZ3MuZGlyZWN0aW9uID09IDEpIHtcclxuICAgICAgICBwcmV2aW91cygpO1xyXG4gICAgfSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyKSB7XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVRvTGFzdCgpIHtcclxuICAgIHN1Z2dlc3Rpb25CdXR0b24gPSBfcGFnZS5nZXRWaWV3QnlJZChcInN1Z2dlc3Rpb25CdXR0b25cIik7XHJcbiAgICBsZXQgbG9jYXRpb25SZWxhdGl2ZVRvID0gc3VnZ2VzdGlvbkJ1dHRvbi5nZXRMb2NhdGlvblJlbGF0aXZlVG8oc2Nyb2xsVmlldyk7XHJcbiAgICBpZihsb2NhdGlvblJlbGF0aXZlVG8pe1xyXG4gICAgICAgIHNjcm9sbFZpZXcuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldChsb2NhdGlvblJlbGF0aXZlVG8ueSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ29Ub0VkaXRQYWdlKCk6IHZvaWQge1xyXG4gICAgdm0uZ29Ub0VkaXRQYWdlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91cygpOiB2b2lkIHtcclxuICAgIHZtLnByZXZpb3VzKCk7XHJcbiAgICBzY3JvbGxWaWV3LnNjcm9sbFRvVmVydGljYWxPZmZzZXQoMCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmV4dCgpOiB2b2lkIHtcclxuICAgIHZtLm5leHQoKTtcclxuICAgIHNjcm9sbFZpZXcuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldCgwLCBmYWxzZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXQoKTogdm9pZCB7XHJcbiAgICB2bS5zdWJtaXQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHF1aXQoKTogdm9pZCB7XHJcbiAgICB2bS5xdWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93QW5zd2VyKCk6IHZvaWQge1xyXG4gICAgdm0uc2hvd0Fuc3dlcigpO1xyXG4gICAgb3B0aW9uTGlzdC5yZWZyZXNoKCk7XHJcbiAgICBtb3ZlVG9MYXN0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RPcHRpb24oYXJncyk6IHZvaWQge1xyXG4gICAgdm0uc2hvd0Fuc3dlcigpO1xyXG4gICAgdm0uc2VsZWN0T3B0aW9uKGFyZ3MpO1xyXG4gICAgb3B0aW9uTGlzdC5yZWZyZXNoKCk7XHJcbiAgICBtb3ZlVG9MYXN0KCk7XHJcbn0iXX0=