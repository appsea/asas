"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("ui/frame");
function gotoResultPage(state) {
    frameModule.topmost().navigate({
        moduleName: 'shared/result/result-page',
        clearHistory: true,
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoResultPage = gotoResultPage;
function gotoQuestionMap(state) {
    frameModule.topmost().navigate({
        moduleName: 'question/map',
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoQuestionMap = gotoQuestionMap;
function toPage(path) {
    frameModule.topmost().navigate({
        moduleName: path,
        transition: {
            name: "fade"
        }
    });
}
exports.toPage = toPage;
function gotoDetailsPage(state) {
    frameModule.topmost().navigate({
        moduleName: 'shared/details/detailed-result',
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoDetailsPage = gotoDetailsPage;
function gotoLastPage() {
    frameModule.topmost().goBack();
}
exports.gotoLastPage = gotoLastPage;
