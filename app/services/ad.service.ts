import * as ads from "../services/ads.js";
import {HttpService} from "./http.service";

export class AdService {

    private static _instance: AdService = new AdService();

    private _showAd: boolean;

    static getInstance(): AdService {
        return AdService._instance;
    }

    constructor() {
        this._showAd = false;
        HttpService.getInstance().showAds().then((show) => {
            if (show == 'true') {
                this._showAd = true;
            }
        })
    }

    showInterstitial() {
        if (this._showAd) {
            ads.showInterstitial();
        }
    }

    showSmartBanner() {
        if (this._showAd) {
            ads.showSmartBanner();
        }
    }

    get showAd(): boolean {
        return this._showAd;
    }
}