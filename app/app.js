"use strict";
/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("application");
var platform_1 = require("platform");
var frame = require("ui/frame");
require("./shared/firebase/firebase.common");
if (platform_1.isAndroid) {
    app.android.on(app.AndroidApplication.activityBackPressedEvent, function (args) {
        var page = frame.topmost().currentPage;
        if (page.hasListeners(app.AndroidApplication.activityBackPressedEvent)) {
            args.page = page;
            page.notify(args);
        }
    });
}
app.start({ moduleName: 'question/practice' });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
