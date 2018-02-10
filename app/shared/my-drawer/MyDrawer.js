"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = require("ui/frame");
var MyDrawer_view_model_1 = require("./MyDrawer-view-model");
var SocialShare = require("nativescript-social-share");
var nativescript_exit_1 = require("nativescript-exit");
/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
function onLoaded(args) {
    var component = args.object;
    var componentTitle = component.get("selectedPage");
    component.bindingContext = new MyDrawer_view_model_1.MyDrawerViewModel(componentTitle);
}
exports.onLoaded = onLoaded;
/* ***********************************************************
* Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
* The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
function onNavigationItemTap(args) {
    var component = args.object;
    var componentRoute = component.get("route");
    frame_1.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}
exports.onNavigationItemTap = onNavigationItemTap;
function share(args) {
    SocialShare.shareText("https://play.google.com/store/apps/details?id=com.exuberant.quiz.sas\n" +
        "Hi there, Take a look at the Base Sas Quiz which I am using for preparing For Base SAS Certification!!!");
}
exports.share = share;
function logout(args) {
    nativescript_exit_1.exit();
}
exports.logout = logout;
