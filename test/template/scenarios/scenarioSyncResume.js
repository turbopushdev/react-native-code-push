var CodePushWrapper = require("../codePushWrapper.js");
import CodePush from "@turbopush/react-native-code-push";

module.exports = {
    startTest: function (testApp) {
        CodePushWrapper.sync(testApp, undefined, undefined,
            { installMode: CodePush.InstallMode.ON_NEXT_RESUME });
    },

    getScenarioName: function () {
        return "Sync Resume";
    }
};