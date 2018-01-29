import {EventData, Observable} from "data/observable";
import {State} from "../questions.model";
import {NavigatedData, Page} from 'ui/page';
import {DetailedResultViewModel} from "./detailed-result-view-model";
import * as application from "application";
import { isAndroid } from "platform";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import * as navigationModule from '../navigation';
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";

var page: Page;
let vm: DetailedResultViewModel;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        navigationModule.gotoLastPage();
    });
}

export function pageNavigatingTo(args: NavigatedData): void {
    page = <Page>args.object;
    let state: State = <State> page.navigationContext;
    vm = new DetailedResultViewModel(state);
    page.bindingContext = vm;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function all(): void {
    vm.all();
}

export function correct(): void {
    vm.correct();
}

export function incorrect(): void {
    vm.incorrect();
}

export function skipped(): void {
    vm.skipped();
}