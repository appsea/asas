if (global.TNS_WEBPACK) {
    // registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    // register application modules
    global.registerModule("nativescript-ui-sidedrawer",
        () => require("../node_modules/nativescript-ui-sidedrawer"));

    const context = require.context("~/", true, /(page|fragment)\.(xml|css|js|ts|scss|less|sass)$/);
    global.registerWebpackModules(context);

    global.registerModule("shared/my-drawer/MyDrawer", () => require("./shared/my-drawer/MyDrawer"));
    global.registerModule("question/practice", () => require("./question/practice"));
    global.registerModule("settings/settings-page", () => require("./settings/settings-page"));
}
