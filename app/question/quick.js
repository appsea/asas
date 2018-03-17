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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWljay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQUFtQztBQUVuQyw2REFBMEQ7QUFFMUQseUNBQTJDO0FBQzNDLHFDQUFxQztBQUNyQywyQ0FBc0Y7QUFDdEYsaUVBQTZEO0FBRTdELElBQUksRUFBcUIsQ0FBQztBQUMxQixJQUFJLFVBQTZCLENBQUM7QUFFbEMsc0JBQTZCLElBQWU7SUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxvQkFBUyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDRCxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQ0FBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQXlDO1FBQzFHLFFBQVEsRUFBRSxDQUFDO1FBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsb0NBUUM7QUFFRCxxQkFBNEIsSUFBSTtJQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsUUFBUSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQztRQUMzQixJQUFJLEVBQUUsQ0FBQztJQUNYLENBQUM7QUFDTCxDQUFDO0FBTkQsa0NBTUM7QUFFRDs7OERBRThEO0FBQzlELHdCQUErQixJQUFtQjtJQUM5Qzs7OztrRUFJOEQ7SUFDOUQ7O09BRUc7SUFFSCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLEVBQUUsR0FBRyxJQUFJLHVDQUFpQixDQUFDLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQWRELHdDQWNDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVEO0lBQ0ksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xCLENBQUM7QUFGRCw0QkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQUZELG9CQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsQ0FBQztBQUZELHdCQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRkQsb0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRkQsMEJBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBRkQsZ0NBRUM7QUFFRCxzQkFBNkIsSUFBSTtJQUM3QixFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBSEQsb0NBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgTmF2aWdhdGVkRGF0YSwgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IFF1ZXN0aW9uVmlld01vZGVsIH0gZnJvbSBcIi4vcXVlc3Rpb24tdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBMaXN0VmlldyBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcbmxldCB2bTogUXVlc3Rpb25WaWV3TW9kZWw7XHJcbmxldCBvcHRpb25MaXN0OiBMaXN0Vmlldy5MaXN0VmlldztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblBhZ2VMb2FkZWQoYXJnczogRXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGRhdGE6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgICAgICBkYXRhLmNhbmNlbCA9IHRydWU7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN3aXBlKGFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgIH0gZWxzZSBpZihhcmdzLmRpcmVjdGlvbiA9PSAyKXtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVXNlIHRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgaGFuZGxlciB0byBpbml0aWFsaXplIHRoZSBwYWdlIGJpbmRpbmcgY29udGV4dC5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGluZ1RvKGFyZ3M6IE5hdmlnYXRlZERhdGEpIHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFRoZSBcIm9uTmF2aWdhdGluZ1RvXCIgZXZlbnQgaGFuZGxlciBsZXRzIHlvdSBkZXRlY3QgaWYgdGhlIHVzZXIgbmF2aWdhdGVkIHdpdGggYSBiYWNrIGJ1dHRvbi5cclxuICAgICogU2tpcHBpbmcgdGhlIHJlLWluaXRpYWxpemF0aW9uIG9uIGJhY2sgbmF2aWdhdGlvbiBtZWFucyB0aGUgdXNlciB3aWxsIHNlZSB0aGVcclxuICAgICogcGFnZSBpbiB0aGUgc2FtZSBkYXRhIHN0YXRlIHRoYXQgaGUgbGVmdCBpdCBpbiBiZWZvcmUgbmF2aWdhdGluZy5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAvKmlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9Ki9cclxuXHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBvcHRpb25MaXN0ID0gcGFnZS5nZXRWaWV3QnlJZChcIm9wdGlvbkxpc3RcIik7XHJcbiAgICB2bSA9IG5ldyBRdWVzdGlvblZpZXdNb2RlbChTZXR0aW5nc1NlcnZpY2UuUVVJQ0spO1xyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IHZtO1xyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIFJhZFNpZGVEcmF3ZXIgdmlldyBhbmRcclxuKiB1c2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkRyYXdlckJ1dHRvblRhcChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj50b3Btb3N0KCkuZ2V0Vmlld0J5SWQoXCJzaWRlRHJhd2VyXCIpO1xyXG4gICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91cygpOiB2b2lkIHtcclxuICAgIHZtLnByZXZpb3VzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0KCk6IHZvaWQge1xyXG4gICAgdm0ubmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd01hcCgpOiB2b2lkIHtcclxuICAgIHZtLnNob3dNYXAoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dBbnN3ZXIoKTogdm9pZCB7XHJcbiAgICB2bS5zaG93QW5zd2VyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RPcHRpb24oYXJncyk6IHZvaWQge1xyXG4gICAgdm0uc2VsZWN0T3B0aW9uKGFyZ3MpO1xyXG4gICAgb3B0aW9uTGlzdC5yZWZyZXNoKCk7XHJcbn0iXX0=