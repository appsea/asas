import {AdService} from "../services/ad.service";
import * as appSettings from 'application-settings';
import {CreateViewEventData} from "ui/placeholder";
import {EventData, Observable} from "data/observable";
import {ItemEventData} from "ui/list-view";
import {NavigatedData, Page} from "ui/page";
import {RadSideDrawer} from "nativescript-ui-sidedrawer";
import {topmost} from "ui/frame";
import * as navigationModule from '../shared/navigation';
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";
import {PremiumModel} from "./premium-model";
import * as purchase from "nativescript-purchase";
import {Product} from "nativescript-purchase/product";
import {Transaction, TransactionState} from "nativescript-purchase/transaction";
import * as constantsModule from '../shared/constants';

let vm: PremiumModel;

export function onPageLoaded(args: EventData): void {
    if (!isAndroid) {
        return;
    }
    let page = args.object;
    page.on(AndroidApplication.activityBackPressedEvent, onActivityBackPressedEvent, this);
}

export function onActivityBackPressedEvent(args: AndroidActivityBackPressedEventData) {
    navigationModule.goBack();
    args.cancel = true;
}

export function onNavigatingTo(args: NavigatedData) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    const page = <Page>args.object;
    vm = new PremiumModel();
    page.bindingContext = vm;

    purchase.on(purchase.transactionUpdatedEvent, (transaction: Transaction) => {
        if (transaction.transactionState === TransactionState.Restored || transaction.transactionState === TransactionState.Purchased) {
            appSettings.setBoolean(constantsModule.PREMIUM, true);
            AdService.getInstance().showAd = false;
        }
    });
}

export function onDrawerButtonTap(args: EventData) {
    const sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
    sideDrawer.showDrawer();
}

export function pay(data: ItemEventData) {
    vm.pay();
}

export function onRestoreTap(data: ItemEventData) {
    vm.restorePurchase();
}