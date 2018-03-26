import {EventData, Observable} from "data/observable";
import {State} from "../questions.model";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from 'ui/page';
import {ResultViewModel} from "./result-view-model";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";

var page: Page;
var state: State;
let vm: ResultViewModel;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
    }
    let page = args.object;
    page.on(AndroidApplication.activityBackPressedEvent, onActivityBackPressedEvent, this);
}

export function onActivityBackPressedEvent(args: AndroidActivityBackPressedEventData) {
    args.cancel = true;
}

export function onNavigatingTo(args: NavigatedData): void {
    if(args.isBackNavigation){
        return;
    }
    page = <Page>args.object;
    state = <State> page.navigationContext;
    vm = new ResultViewModel(state);
    page.bindingContext = vm;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function detailedResult(): void {
    vm.detailedResult();
}