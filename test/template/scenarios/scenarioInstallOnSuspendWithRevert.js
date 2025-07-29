var CodePushWrapper = require("../codePushWrapper.js");
import CodePush from "@turbopush/react-native-code-push";

module.exports = {
    startTest: function (testApp) {
        CodePushWrapper.checkAndInstall(testApp, undefined, undefined, CodePush.InstallMode.ON_NEXT_SUSPEND);
    },

    getScenarioName: function () {
        return "Install on Suspend with Revert";
    }
};
