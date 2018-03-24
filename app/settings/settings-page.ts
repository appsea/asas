import {EventData, Observable} from "data/observable";
import * as Toast from 'nativescript-toast';
import {NavigatedData, Page} from "ui/page";
import {SettingsViewModel} from "./settings-view-model";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";
import {topmost} from "ui/frame";

let vm: SettingsViewModel;

export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    /*if (args.isBackNavigation) {
        return;
    }*/

    const page = <Page>args.object;
    vm = new SettingsViewModel();
    page.bindingContext = vm;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function save(): void {
    vm.save();
    Toast.makeText("Saved!!!", "long").show();
}