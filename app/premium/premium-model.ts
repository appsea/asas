import {EventData, Observable} from "data/observable";
import * as purchase from "nativescript-purchase";

export class PremiumModel extends Observable {

    private _loading: boolean = true;
    private _item: any;

    constructor() {
        super();
        purchase.getProducts()
            .then((res) => {
                //this._items = res;
                this._item = res[0];
                this._loading = false;
                this.publish();
            })
            .catch((e) => console.error('Error Loading the in app products...' + e));
        this.publish();
    }

    get item(){
        return this._item;
    }

    get loading(){
        return this._loading;
    }

    private publish() {
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'item', value: this._item});
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'loading', value: this._loading});
    }

    restorePurchase() {
        purchase.restorePurchases();
    }

    pay() {
        purchase.buyProduct(this._item);
    }
}