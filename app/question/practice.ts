import {EventData} from "data/observable";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from "ui/page";
import {ScrollView} from "tns-core-modules/ui/scroll-view";
import * as LabelModule from "tns-core-modules/ui/label";
import * as ButtonModule from "tns-core-modules/ui/button";
import {TextView} from "ui/text-view";
import {QuestionViewModel} from "./question-view-model";
import * as application from "application";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";
import {SettingsService} from "../services/settings.service";
import {Popup} from 'nativescript-popup';
import {Repeater} from 'ui/repeater';
import {Label} from 'ui/label';

let vm: QuestionViewModel;
let optionList: Repeater;
let explanationLabel: LabelModule.Label;
let suggestionButton: ButtonModule.Button;
let _page: any;
let scrollView: ScrollView;

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if (!SettingsService.route()) {
        const page = <Page>args.object;
        _page = page;
        optionList = page.getViewById("optionList");
        explanationLabel = page.getViewById("explanation");
        scrollView = page.getViewById("scrollView");
        suggestionButton = page.getViewById("suggestionButton");
        vm = new QuestionViewModel(SettingsService.PRACTICE);
        page.bindingContext = vm;
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            previous();
            data.cancel = true;
        });
    }
}

/* ***********************************************************
* According to guidelines, if you have a drawer on your page, you should always
* have a button that opens it. Get a reference to the RadSideDrawer view and
* use the showDrawer() function to open the app drawer section.
*************************************************************/
export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function handleSwipe(args) {
    if (args.direction == 1) {
        previous();
    } else if (args.direction == 2) {
        next();
    }
}

export function moveToLast() {
    suggestionButton = _page.getViewById("suggestionButton");
    scrollView.scrollToVerticalOffset(suggestionButton.getLocationRelativeTo(scrollView).y, false);
}

export function goToEditPage(): void {
    vm.goToEditPage();
}

export function previous(): void {
    vm.previous();
    scrollView.scrollToVerticalOffset(0, false);
}

export function next(): void {
    vm.next();
    scrollView.scrollToVerticalOffset(0, false);
}

export function submit(): void {
    vm.submit();
}

export function quit(): void {
    vm.quit();
}

export function showAnswer(): void {
    vm.showAnswer();
    optionList.refresh();
    moveToLast();
}

export function showExplanation(): void {
    console.log("Explanation would be shown...");
    const popup = new Popup({
        backgroundColor: '#198696',
        height: 500,
        width: 500,
        unit: 'dp',
        elevation: 100,
        borderRadius: 25
    });
    const view = new LabelModule.Label();
    view.text = "Test";

    /* Android */
    const nativeView:TextView = new TextView();
    nativeView.text = "Native";
    nativeView.width = 50;
    nativeView.height = 50;
    /* -- Android */

    //popup.showPopup(anchor: View | nativeView , view: View | nativeView);
    console.log("About to show popup...");
    popup.showPopup(view, nativeView);
    console.log("Done...");
}

export function selectOption(args): void {
    vm.showAnswer();
    vm.selectOption(args);
    optionList.refresh();
    moveToLast();
}