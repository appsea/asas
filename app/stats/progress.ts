import {EventData, Observable} from "data/observable";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from 'ui/page';
import * as application from "application";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";
import {ProgressViewModel} from "./progress-view-model";

var page: Page;
let vm: ProgressViewModel;

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
    vm = new ProgressViewModel();
    page.bindingContext = vm;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}