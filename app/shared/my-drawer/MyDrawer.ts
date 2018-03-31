import {EventData} from "data/observable";
import {topmost} from "ui/frame";
import {GridLayout} from "ui/layouts/grid-layout";
import {MyDrawerViewModel} from "./MyDrawer-view-model";
import * as SocialShare from 'nativescript-social-share';
import {exit} from 'nativescript-exit';
import {SettingsService} from "../../services/settings.service";

/* ***********************************************************
* Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
*************************************************************/
export function onLoaded(args: EventData): void {
    const component = <GridLayout>args.object;
    const componentTitle = component.get("selectedPage");

    component.bindingContext = new MyDrawerViewModel(componentTitle);
}

/* ***********************************************************
* Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
* The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
* based on the tapped navigationItem's route.
*************************************************************/
export function onNavigationItemTap(args: EventData): void {
    const component = <GridLayout>args.object;
    const componentRoute = component.get("route");
    SettingsService.getInstance().saveRoute(componentRoute);
    topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}

export function share(args: EventData): void {
    SocialShare.shareText("https://goo.gl/KgZQhA\n" +
        "Hi there, Take a look at the Base Sas Quiz which I am using for preparing For Base SAS Certification!!!");
}

export function logout(args: EventData): void {
    exit();
}