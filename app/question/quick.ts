import {EventData} from "data/observable";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from "ui/page";
import {QuestionViewModel} from "./question-view-model";
import * as ListView from "ui/list-view";
import {isAndroid} from "platform";
import {android, AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {SettingsService} from "../services/settings.service";
import {SwipeGestureEventData} from "ui/gestures";
import {ScrollView} from "tns-core-modules/ui/scroll-view";

let vm: QuestionViewModel;
let optionList: ListView.ListView;
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

export function handleSwipe(args) {
    if (args.direction == 1) {
        previous();
    } else if(args.direction == 2){
        next();
    }
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

    const page = <Page>args.object;
    optionList = page.getViewById("optionList");
    scrollView = page.getViewById("scrollView");
    vm = new QuestionViewModel(SettingsService.QUICK);
    page.bindingContext = vm;
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

export function showMap(): void {
    vm.showMap();
}

export function showAnswer(): void {
    vm.showAnswer();
}

export function selectOption(args): void {
    vm.selectOption(args);
    optionList.refresh();
}

export function goToEditPage(): void {
    vm.goToEditPage();
}