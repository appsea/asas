import {EventData} from "data/observable";
import {RadSideDrawer} from "nativescript-pro-ui/sidedrawer";
import {topmost} from "ui/frame";
import {NavigatedData, Page} from "ui/page";
import {AndroidActivityBackPressedEventData, AndroidApplication} from "application";
import {isAndroid} from "platform";
import {SettingsService} from "../services/settings.service";

export function onPageLoaded(args: EventData): void {
}

export function onNavigatingTo(args: NavigatedData) {
    SettingsService.route();
}