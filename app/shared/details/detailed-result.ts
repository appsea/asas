import {EventData, Observable} from "data/observable";
import {State} from "../questions.model";
import {NavigatedData, Page} from 'ui/page';
import {DetailedResultViewModel} from "./detailed-result-view-model";

var page: Page;
let vm: DetailedResultViewModel;

export function onPageLoaded(args: EventData): void {
}

export function pageNavigatingTo(args: NavigatedData): void {
    page = <Page>args.object;
    let state: State = <State> page.navigationContext;
    vm = new DetailedResultViewModel(state);
    page.bindingContext = vm;
}

export function all(): void {
    vm.all();
}

export function correct(): void {
    vm.correct();
}

export function incorrect(): void {
    vm.incorrect();
}

export function skipped(): void {
    vm.skipped();
}