# React Native Module for CodePush
## 🚀 [Sign up](https://accounts.turbopush.org/sign-up) to use Turbopush
## 📚 [Documentation](https://docs.turbopush.org) to get started

This plugin provides client-side integration for the [Turbopush service](https://turbopush.org/), allowing you to easily add a dynamic update experience to your React Native or Expo app(s).

## How does it work?

A React Native app is composed of JavaScript files and any accompanying [images](https://reactnative.dev/docs/image), which are bundled together by the [metro bundler](https://github.com/facebook/metro) and distributed as part of a platform-specific binary (i.e. an `.ipa` or `.apk` file). Once the app is released, updating either the JavaScript code (e.g. making bug fixes, adding new features) or image assets, requires you to recompile and redistribute the entire binary, which of course, includes any review time associated with the store(s) you are publishing to.

The Turbopush plugin helps get product improvements in front of your end users instantly, by keeping your JavaScript and images synchronized with updates you release to the Turbopush server. This way, your app gets the benefits of an offline mobile experience, as well as the "web-like" agility of side-loading updates as soon as they are available. It's a win-win!

In order to ensure that your end users always have a functioning version of your app, the Turbopush plugin maintains a copy of the previous update, so that in the event that you accidentally push an update which includes a crash, it can automatically roll back. This way, you can rest assured that your newfound release agility won't result in users becoming blocked before you have a chance to roll back on the server. It's a win-win-win!

*Note: Any product changes which touch native code (e.g. modifying your `AppDelegate.mm`/`MainActivity.java`/`MainActivity.kt`/`AppDelegate.swift` file, adding a new plugin) cannot be distributed via Turbopush, and therefore, must be updated via the appropriate store(s).*

## React Native Setup

Yarn:
```bash
yarn add @turbopush/react-native-code-push
```

NPM:
```bash
npm install --save @turbopush/react-native-code-push
```

Follow the [Getting Started](https://docs.turbopush.org/?platform=react-native) guide to configure your app.

## Expo Setup

Yarn:
```bash
yarn add @turbopush/react-native-code-push @turbopush/turbopush-expo-plugin expo-build-properties
```

NPM:
```bash
npm install --save @turbopush/react-native-code-push @turbopush/turbopush-expo-plugin expo-build-properties
```

Add the following to your `app.json` or `app.config.ts` file:

```json
{
  "plugins": [
    [
      "expo-build-properties",
      {
        "ios": {
          "deploymentTarget": "15.5",
        },
      },
    ],
    [
      "@turbopush/turbopush-expo-plugin",
      {
        "android": {
          "CodePushDeploymentKey": "YOUR_ANDROID_CODE_PUSH_KEY",
        },
        "ios": {
          "CodePushDeploymentKey": "YOUR_IOS_CODE_PUSH_KEY",
        },
      }
    ]
  ]
}
```

For more information, see the [Getting Started](https://docs.turbopush.org/?platform=expo) guide.

## Key Features

- **Rollback**: If an update causes a crash, the plugin can automatically roll back to the previous version.
- **Multiple Platforms**: Supports Android and iOS.
- **Multiple Channels**: You can create multiple channels to release updates to different groups of users.
- **Multiple Environments**: You can create multiple environments to test your updates before releasing them to all users.
- **Expo Support**: You can use our [Expo plugin](https://docs.turbopush.org/setup/expo-setup) for Expo apps.

## Store Guideline Compliance

Android Google Play and iOS App Store have corresponding guidelines that have rules you should be aware of before integrating the CodePush solution within your application.

### Google play

Third paragraph of [Device and Network Abuse](https://support.google.com/googleplay/android-developer/answer/9888379?hl=en) topic describe that updating source code by any method other than Google Play's update mechanism is restricted. But this restriction does not apply to updating javascript bundles.
> This restriction does not apply to code that runs in a virtual machine and has limited access to Android APIs (such as JavaScript in a webview or browser).

That fully allow CodePush as it updates just JS bundles and can't update native code part.

### App Store

Paragraph **3.3.2**, since back in 2015's [Apple Developer Program License Agreement](https://developer.apple.com/programs/ios/information/) fully allowed performing over-the-air updates of JavaScript and assets -  and in its latest version (20170605) [downloadable here](https://developer.apple.com/terms/) this ruling is even broader:

> Interpreted code may be downloaded to an Application but only so long as such code: (a) does not change the primary purpose of the Application by providing features or functionality that are inconsistent with the intended and advertised purpose of the Application as submitted to the App Store, (b) does not create a store or storefront for other code or applications, and (c) does not bypass signing, sandbox, or other security features of the OS.

CodePush allows you to follow these rules in full compliance so long as the update you push does not significantly deviate your product from its original App Store approved intent.

To further remain in compliance with Apple's guidelines we suggest that App Store-distributed apps don't enable the `updateDialog` option when calling `sync`, since in the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) it is written that:

> Apps must not force users to rate the app, review the app, download other apps, or other similar actions in order to access functionality, content, or use of the app.

This is not necessarily the case for `updateDialog`, since it won't force the user to download the new version, but at least you should be aware of that ruling if you decide to show it.

