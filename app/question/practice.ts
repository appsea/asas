import {CreateViewEventData} from "ui/placeholder";
import {EventData, Observable} from "data/observable";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from "ui/page";
import {ScrollView} from "tns-core-modules/ui/scroll-view";
import * as ButtonModule from "tns-core-modules/ui/button";
import {TextView} from "ui/text-view";
import {QuestionViewModel} from "./question-view-model";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";
import {SettingsService} from "../services/settings.service";
import {Repeater} from 'ui/repeater';
import {Label} from 'ui/label';
import firebase = require("nativescript-plugin-firebase");
import * as dialogs from "ui/dialogs";
import {ConnectionService} from "../shared/connection.service";
import {AdServices} from "../services/ad.services";

let vm: QuestionViewModel;
let optionList: Repeater;
let suggestionButton: ButtonModule.Button;
let defaultExplanation: Label;
let explanationHeader: Label;
let _page: any;
let scrollView: ScrollView;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
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
    page.on(AndroidApplication.activityBackPressedEvent, onActivityBackPressedEvent, this);
    suggestionButton = page.getViewById("suggestionButton");
    if (!SettingsService.route()) {
        _page = page;
        optionList = page.getViewById("optionList");
        scrollView = page.getViewById("scrollView");
        vm = new QuestionViewModel(SettingsService.PRACTICE);
        page.bindingContext = vm;
    } else {
        explanationHeader = page.getViewById("explanationHeader");
        defaultExplanation = page.getViewById("defaultExplanation");
        explanationHeader.visibility = "hidden";
        defaultExplanation.visibility = "hidden";
        suggestionButton.visibility = "hidden";
    }
}

export function onActivityBackPressedEvent(args: AndroidActivityBackPressedEventData) {
    previous();
    args.cancel = true;
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
    if (suggestionButton) {
        let locationRelativeTo = suggestionButton.getLocationRelativeTo(scrollView);
        if (locationRelativeTo) {
            scrollView.scrollToVerticalOffset(locationRelativeTo.y, false);
        }
    }
}

export function goToEditPage(): void {
    vm.goToEditPage();
}

export function previous(): void {
    if (!vm) {
        vm = new QuestionViewModel(SettingsService.PRACTICE);
    }
    vm.previous();
    scrollView.scrollToVerticalOffset(0, false);
}

export function next(): void {
    if (!ConnectionService.getInstance().isConnected()) {
        dialogs.alert("Please connect to internet so that we can fetch next question for you!!");
    } else {
        AdServices.getInstance().showBanner(firebase.admob.AD_SIZE.BANNER);
        vm.next();
        scrollView.scrollToVerticalOffset(0, false);
    }
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

/*
export function creatingView(args: CreateViewEventData) {
    console.log("Inside creatingView: " + args);
    console.log("Inside creatingView: " + args.context);
    console.log("args.view : " + args.view);
    /!*let nativeView = new android.widget.TextView(args.context);
    nativeView.setSingleLine(true);
    nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
    nativeView.setText("Native");
    args.view = nativeView;*!/
    //textView.text = 'Hi';
    /!*var bannerView = new com.google.android.gms.ads.AdView(args.object._context);
    bannerView.setAdSize(com.google.android.gms.ads.AdSize.SMART_BANNER);
    args.view = bannerView;*!/

}
*/
