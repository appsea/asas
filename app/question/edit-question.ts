import {EventData, Observable} from "data/observable";
import * as Toast from 'nativescript-toast';
import { isAndroid } from "platform";
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import * as navigationModule from '../shared/navigation';
import {NavigatedData, Page} from "ui/page";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";
import {topmost} from "ui/frame";
import {EditQuestionViewModel} from "./edit-question-model";
import {State} from "../shared/questions.model";
import { Repeater } from 'ui/repeater';

let vm: EditQuestionViewModel;
let state: State;
let optionList: Repeater;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
    }
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        navigationModule.gotoLastPage();
    });
}

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
    optionList = page.getViewById("optionList")
    state = <State> page.navigationContext;
    vm = new EditQuestionViewModel(state);
    page.bindingContext = vm;
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function save(): void {
    vm.save();
    Toast.makeText("Thank You so much. Your changes are being reviewed and will be included asap.", "long").show();
    navigationModule.gotoLastPage()
}

export function selectOption(args): void {
    vm.selectOption(args);
    optionList.refresh();
}