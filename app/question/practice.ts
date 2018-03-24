import {EventData} from "data/observable";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from "ui/page";
import {ScrollView} from "tns-core-modules/ui/scroll-view";
import * as LabelModule from "tns-core-modules/ui/label";
import * as ButtonModule from "tns-core-modules/ui/button";
import {TextView} from "ui/text-view";
import {QuestionViewModel} from "./question-view-model";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";
import {SettingsService} from "../services/settings.service";
import {Repeater} from 'ui/repeater';
import {Label} from 'ui/label';

let vm: QuestionViewModel;
let optionList: Repeater;
let explanationLabel: LabelModule.Label;
let suggestionButton: ButtonModule.Button;
let _page: any;
let scrollView: ScrollView;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
    }
    let page = args.object;
    page.on(AndroidApplication.activityBackPressedEvent, onActivityBackPressedEvent, this);
}

export function onActivityBackPressedEvent(args: AndroidActivityBackPressedEventData) {
    previous();
    args.cancel = true;
}

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/

    if (args.isBackNavigation) {
        return;
    }

    if (!SettingsService.route()) {
        const page = <Page>args.object;
        _page = page;
        optionList = page.getViewById("optionList");
        explanationLabel = page.getViewById("explanation");
        scrollView = page.getViewById("scrollView");
        suggestionButton = page.getViewById("suggestionButton");
        vm = new QuestionViewModel(SettingsService.PRACTICE);
        page.bindingContext = vm;
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

export function selectOption(args): void {
    vm.showAnswer();
    vm.selectOption(args);
    optionList.refresh();
    moveToLast();
}