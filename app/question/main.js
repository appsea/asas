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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQ0FBaUM7QUFJakMsNkRBQXdEO0FBRXhELHFDQUFtQztBQUNuQywyQ0FBNkY7QUFDN0YsaUVBQTZEO0FBRzdELElBQUksRUFBcUIsQ0FBQztBQUMxQixJQUFJLFVBQTZCLENBQUM7QUFDbEMsSUFBSSxVQUFzQixDQUFDO0FBRTNCLHNCQUE2QixJQUFlO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7UUFDYixNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLGdDQUFrQixDQUFDLHdCQUF3QixFQUFFLDBCQUEwQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFORCxvQ0FNQztBQUVELG9DQUEyQyxJQUF5QztJQUNoRixRQUFRLEVBQUUsQ0FBQztJQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLENBQUM7QUFIRCxnRUFHQztBQUVEOzs4REFFOEQ7QUFDOUQsd0JBQStCLElBQW1CO0lBQzlDOzs7O2tFQUk4RDtJQUM5RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFDRCxJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLEVBQUUsR0FBRyxJQUFJLHVDQUFpQixDQUFDLGtDQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQWRELHdDQWNDO0FBRUQ7Ozs7OERBSThEO0FBQzlELDJCQUFrQyxJQUFlO0lBQzdDLElBQU0sVUFBVSxHQUFrQixlQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdEUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFIRCw4Q0FHQztBQUVELHFCQUE0QixJQUFJO0lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixRQUFRLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO1FBQzNCLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztBQUNMLENBQUM7QUFORCxrQ0FNQztBQUVEO0lBQ0ksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFGRCwwQkFFQztBQUVEO0lBQ0ksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2QsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBSEQsNEJBR0M7QUFFRDtJQUNJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNWLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUhELG9CQUdDO0FBRUQ7SUFDSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsQ0FBQztBQUZELHdCQUVDO0FBRUQ7SUFDSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRkQsb0JBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUNJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN0QixDQUFDO0FBRkQsb0NBRUM7QUFFRCxzQkFBNkIsSUFBSTtJQUM3QixFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBSEQsb0NBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RGF0YX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge1JhZFNpZGVEcmF3ZXJ9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQge3RvcG1vc3R9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcclxuaW1wb3J0IHtOYXZpZ2F0ZWREYXRhLCBQYWdlfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuaW1wb3J0IHtRdWVzdGlvblZpZXdNb2RlbH0gZnJvbSBcIi4vcXVlc3Rpb24tdmlldy1tb2RlbFwiO1xyXG5pbXBvcnQgKiBhcyBMaXN0VmlldyBmcm9tIFwidWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7aXNBbmRyb2lkfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHthbmRyb2lkLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgQW5kcm9pZEFwcGxpY2F0aW9ufSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U2Nyb2xsVmlld30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIjtcclxuXHJcbmxldCB2bTogUXVlc3Rpb25WaWV3TW9kZWw7XHJcbmxldCBvcHRpb25MaXN0OiBMaXN0Vmlldy5MaXN0VmlldztcclxubGV0IHNjcm9sbFZpZXc6IFNjcm9sbFZpZXc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSk6IHZvaWQge1xyXG4gICAgaWYgKCFpc0FuZHJvaWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcGFnZSA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgcGFnZS5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCBvbkFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgdGhpcyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkFjdGl2aXR5QmFja1ByZXNzZWRFdmVudChhcmdzOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkge1xyXG4gICAgcHJldmlvdXMoKTtcclxuICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxufVxyXG5cclxuLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiBVc2UgdGhlIFwib25OYXZpZ2F0aW5nVG9cIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHBhZ2UgYmluZGluZyBjb250ZXh0LlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0aW5nVG8oYXJnczogTmF2aWdhdGVkRGF0YSkge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVGhlIFwib25OYXZpZ2F0aW5nVG9cIiBldmVudCBoYW5kbGVyIGxldHMgeW91IGRldGVjdCBpZiB0aGUgdXNlciBuYXZpZ2F0ZWQgd2l0aCBhIGJhY2sgYnV0dG9uLlxyXG4gICAgKiBTa2lwcGluZyB0aGUgcmUtaW5pdGlhbGl6YXRpb24gb24gYmFjayBuYXZpZ2F0aW9uIG1lYW5zIHRoZSB1c2VyIHdpbGwgc2VlIHRoZVxyXG4gICAgKiBwYWdlIGluIHRoZSBzYW1lIGRhdGEgc3RhdGUgdGhhdCBoZSBsZWZ0IGl0IGluIGJlZm9yZSBuYXZpZ2F0aW5nLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlmIChhcmdzLmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcbiAgICBvcHRpb25MaXN0ID0gcGFnZS5nZXRWaWV3QnlJZChcIm9wdGlvbkxpc3RcIik7XHJcbiAgICBzY3JvbGxWaWV3ID0gcGFnZS5nZXRWaWV3QnlJZChcInNjcm9sbFZpZXdcIik7XHJcbiAgICB2bSA9IG5ldyBRdWVzdGlvblZpZXdNb2RlbChTZXR0aW5nc1NlcnZpY2UuTUFJTik7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdm07XHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgUmFkU2lkZURyYXdlciB2aWV3IGFuZFxyXG4qIHVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG9uRHJhd2VyQnV0dG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInNpZGVEcmF3ZXJcIik7XHJcbiAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVN3aXBlKGFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgcHJldmlvdXMoKTtcclxuICAgIH0gZWxzZSBpZihhcmdzLmRpcmVjdGlvbiA9PSAyKXtcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93TWFwKCk6IHZvaWQge1xyXG4gICAgdm0uc2hvd01hcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJldmlvdXMoKTogdm9pZCB7XHJcbiAgICB2bS5wcmV2aW91cygpO1xyXG4gICAgc2Nyb2xsVmlldy5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KDAsIGZhbHNlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5leHQoKTogdm9pZCB7XHJcbiAgICB2bS5uZXh0KCk7XHJcbiAgICBzY3JvbGxWaWV3LnNjcm9sbFRvVmVydGljYWxPZmZzZXQoMCwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0KCk6IHZvaWQge1xyXG4gICAgdm0uc3VibWl0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBxdWl0KCk6IHZvaWQge1xyXG4gICAgdm0ucXVpdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Fuc3dlcigpOiB2b2lkIHtcclxuICAgIHZtLnNob3dBbnN3ZXIoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdvVG9FZGl0UGFnZSgpOiB2b2lkIHtcclxuICAgIHZtLmdvVG9FZGl0UGFnZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0T3B0aW9uKGFyZ3MpOiB2b2lkIHtcclxuICAgIHZtLnNlbGVjdE9wdGlvbihhcmdzKTtcclxuICAgIG9wdGlvbkxpc3QucmVmcmVzaCgpO1xyXG59Il19