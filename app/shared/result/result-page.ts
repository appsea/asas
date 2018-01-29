import {EventData, Observable} from "data/observable";
import {State} from "../questions.model";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import {NavigatedData, Page} from 'ui/page';
import {ResultViewModel} from "./result-view-model";
import * as application from "application";
import { isAndroid } from "platform";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";

var page: Page;
var state: State;
let vm: ResultViewModel;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        data.cancel = true;
    });
}

export function pageNavigatingTo(args: NavigatedData): void {
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