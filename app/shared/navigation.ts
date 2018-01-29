import * as frameModule from 'ui/frame';
import {State} from "./questions.model";

export function	gotoResultPage(state: State) {
    frameModule.topmost().navigate({
        moduleName: 'shared/result/result-page',
        clearHistory: true,
        context: state,
    });
}

export function	gotoDetailsPage(state: State) {
    frameModule.topmost().navigate({
        moduleName: 'shared/details/detailed-result',
        context: state
    });
}

export function	gotoLastPage() {
    frameModule.topmost().goBack();
}