const packageJson = require("./package.json");
const { Platform } = require("react-native");

const { major, minor, patch } = Platform.constants.reactNativeVersion;
const rnVersion = `${major}.${minor}.${patch}`;

let expoVersion;
try {
  expoVersion = require("expo/package.json").version;
} catch (_) { }

let turbopushExpoPluginVersion;
try {
  turbopushExpoPluginVersion = require("@turbopush/turbopush-expo-plugin/package.json").version;
} catch (_) { }

module.exports = {
  request(verb, url, requestBody, callback) {
    if (typeof requestBody === "function") {
      callback = requestBody;
      requestBody = null;
    }

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-CodePush-Plugin-Name": packageJson.name,
      "X-CodePush-Plugin-Version": packageJson.version,
      "X-CodePush-SDK-Version": packageJson.dependencies["code-push"],
      "X-React-Native-Version": rnVersion,
      ...(expoVersion && { "X-Expo-Version": expoVersion }),
      ...(turbopushExpoPluginVersion && { "X-Turbopush-Expo-Plugin-Version": turbopushExpoPluginVersion }),
    };

    if (requestBody && typeof requestBody === "object") {
      requestBody = JSON.stringify(requestBody);
    }

    const xhr = new XMLHttpRequest();
    xhr.open(getHttpMethodName(verb), url, true);

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = () => {
      callback(null, { statusCode: xhr.status, body: xhr.responseText });
    };

    xhr.onerror = () => {
      callback(new Error(`Network request failed for url ${url}`));
    };

    xhr.send(requestBody || null);
  }
};

function getHttpMethodName(verb) {
  // Note: This should stay in sync with the enum definition in
  // https://github.com/microsoft/code-push/blob/master/sdk/script/acquisition-sdk.ts#L6
  return [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "TRACE",
    "OPTIONS",
    "CONNECT",
    "PATCH"
  ][verb];
}