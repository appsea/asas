require("./bundle-config");
const application = require("application");

require("./shared/firebase/firebase.common");


application.start({ moduleName: "question/practice" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
