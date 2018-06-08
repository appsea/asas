import firebase = require("nativescript-plugin-firebase");
import * as dialogs from "ui/dialogs";

export class AdServices {

    static getInstance(): AdServices{
        return AdServices._instance;
    }

    private static _instance: AdServices = new AdServices();

    showInterstitial() {
        console.log("Showing adv.... ca-app-pub-9082814869788754/5195869671");
        firebase.admob.showInterstitial({
            /*iosInterstitialId: "ca-app-pub-9517346003011652/6938836122",
            androidInterstitialId: "ca-app-pub-9517346003011652/6938836122",*/
            iosInterstitialId: "ca-app-pub-9082814869788754/5195869671",
            androidInterstitialId: "ca-app-pub-9082814869788754/5195869671",
            testing: true, // when not running in production set this to true, Google doesn't like it any other way
            iosTestDeviceIds: [ // Android automatically adds the connected device as test device with testing:true, iOS does not
                "45d77bf513dfabc2949ba053da83c0c7b7e87715", // Eddy's iPhone 6s
                "fee4cf319a242eab4701543e4c16db89c722731f"  // Eddy's iPad Pro
            ]
        }).then(
            function () {
                console.log("AdMob interstitial showing..");
            },
            function (errorMessage) {
                console.log(errorMessage);
                dialogs.alert({
                    title: "AdMob error",
                    message: errorMessage,
                    okButtonText: "Okay"
                });
            }
        );
        console.log("Dne Showing adv....");
    }

    showBanner(size:any) {
        console.log("size: " + size);
        firebase.admob.showBanner({
            size: size, // see firebase.admob.AD_SIZE for all options
            margins: { // optional nr of device independent pixels from the top or bottom (don't set both)
                bottom: 0,
                top: 0
            },
            androidBannerId: "ca-app-pub-9517346003011652/7749101329",
            iosBannerId: "ca-app-pub-9517346003011652/3985369721",
            testing: true, // when not running in production set this to true, Google doesn't like it any other way
            iosTestDeviceIds: [ //Android automatically adds the connected device as test device with testing:true, iOS does not
                "45d77bf513dfabc2949ba053da83c0c7b7e87715", // Eddy's iPhone 6s
                "fee4cf319a242eab4701543e4c16db89c722731f"  // Eddy's iPad Pro
            ],
            keywords: ["education", "games", "software", "programming"] // add keywords for ad targeting
        }).then(
            function () {
                console.log("AdMob banner showing");
            },
            function (errorMessage) {
                console.log("errorMessage: " + errorMessage);
                /*dialogs.alert({
                    title: "AdMob error",
                    message: errorMessage,
                    okButtonText: "Okay"
                });*/
            }
        );
    }

}