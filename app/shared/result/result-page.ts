import {EventData, Observable} from "data/observable";
import {IQuestionWrapper, State} from "../questions.model";
import {Page, NavigatedData} from 'ui/page';
import {ResultViewModel} from "./result-view-model";

var page: Page;
var state: State;
let vm: ResultViewModel;

export function onPageLoaded(args: EventData): void {
}

export function pageNavigatingTo(args: NavigatedData): void {
    page = <Page>args.object;
    state = <State> page.navigationContext;
    vm = new ResultViewModel(state);
    page.bindingContext = vm;
}


export function detailedResult(): void {
    vm.detailedResult();
}