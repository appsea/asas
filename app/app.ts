/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import * as app from 'application';
import { isAndroid } from 'platform';
import * as frame from 'ui/frame';

require("./shared/firebase/firebase.common");

if (isAndroid) {
    app.android.on(app.AndroidApplication.activityBackPressedEvent, (args: app.AndroidActivityBackPressedEventData) => {
        const page = frame.topmost().currentPage;
        if (page.hasListeners(app.AndroidApplication.activityBackPressedEvent)) {
            (<any>args).page = page;
            page.notify(args);
        }
    });
}

app.start({ moduleName: 'question/practice' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
