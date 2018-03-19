import {EventData} from "data/observable";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from "ui/page";
import * as ListView from "ui/list-view";
import * as application from "application";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";
import {SettingsService} from "../services/settings.service";
import {TimerViewModel} from "./timer-view-model";
import {ScrollView} from "tns-core-modules/ui/scroll-view";

let vm: TimerViewModel;
let optionList: ListView.ListView;
let scrollView: ScrollView;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        previous();
        data.cancel = true;
    });
}

export function onNavigatingFrom(args: NavigatedData) {
    vm.stopTimer();
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
    const page = <Page>args.object;
    optionList = page.getViewById("optionList");
    vm = new TimerViewModel(SettingsService.TICK);
    page.bindingContext = vm;
}

export function handleSwipe(args) {
    if (args.direction == 1) {
        previous();
    } else if(args.direction == 2){
        next();
    }
}

export function showMap(): void {
    vm.showMap();
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