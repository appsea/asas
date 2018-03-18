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
