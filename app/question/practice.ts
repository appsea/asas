import { EventData } from "data/observable";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { topmost } from "ui/frame";
import { NavigatedData, Page } from "ui/page";

import { QuestionViewModel } from "./question-view-model";
import * as ListView from "ui/list-view";
import * as application from "application";
import { isAndroid } from "platform";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import {SettingsService} from "../services/settings.service";

let vm: QuestionViewModel;
let optionList: ListView.ListView;
let lab: any;
let _page: any;

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    if(!SettingsService.route()){
        const page = <Page>args.object;
        _page = page;
        optionList = page.getViewById("optionList");
        lab = page.getViewById("lab");
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
    console.log(args.direction);
    if (args.direction == 1) {
        previous();
    } else if(args.direction == 2){
        next();
    }
}

export function previous(): void {
    vm.previous();
}

export function next(): void {
    vm.next();
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
}

export function showExplanation(): void {
    console.log("Explanation would be shown...");
}

export function selectOption(args): void {
    vm.showAnswer();
    vm.selectOption(args);
    optionList.refresh();
}