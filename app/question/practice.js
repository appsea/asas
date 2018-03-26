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
