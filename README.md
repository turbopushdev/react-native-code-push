# Turbopush — React Native Plugin for CodePush

[![npm version](https://img.shields.io/npm/v/@turbopush/react-native-code-push.svg)](https://www.npmjs.com/package/@turbopush/react-native-code-push)
[![license](https://img.shields.io/npm/l/@turbopush/react-native-code-push.svg)](LICENSE.md)

## [Sign up](https://accounts.turbopush.org/sign-up?utm_source=readme) to use Turbopush | [Documentation](https://turbopush.org/docs?utm_source=readme) to get started

This plugin provides client-side integration for the [Turbopush service](https://turbopush.org/?utm_source=readme), allowing you to easily add a dynamic update experience to your React Native or Expo app(s).

---

## Table of Contents

- [How does it work?](#how-does-it-work)
- [Key Features](#key-features)
- [Requirements](#requirements)
- [React Native Setup](#react-native-setup)
- [Expo Setup](#expo-setup)
- [Basic Usage](#basic-usage)
- [Store Guideline Compliance](#store-guideline-compliance)
- [Contributing](#contributing)
- [License](#license)

---

## How does it work?

A React Native app is composed of JavaScript files and any accompanying [images](https://reactnative.dev/docs/image), which are bundled together by the [metro bundler](https://github.com/facebook/metro) and distributed as part of a platform-specific binary (i.e. an `.ipa` or `.apk` file). Once the app is released, updating either the JavaScript code (e.g. making bug fixes, adding new features) or image assets, requires you to recompile and redistribute the entire binary, which of course, includes any review time associated with the store(s) you are publishing to.

The Turbopush plugin helps get product improvements in front of your end users instantly, by keeping your JavaScript and images synchronized with updates you release to the Turbopush server. This way, your app gets the benefits of an offline mobile experience, as well as the "web-like" agility of side-loading updates as soon as they are available.

In order to ensure that your end users always have a functioning version of your app, the Turbopush plugin maintains a copy of the previous update, so that in the event that you accidentally push an update which includes a crash, it can automatically roll back. This way, you can rest assured that your newfound release agility won't result in users becoming blocked before you have a chance to roll back on the server.

> **Note:** Any product changes which touch native code (e.g. modifying your `AppDelegate.mm`/`MainActivity.java`/`MainActivity.kt`/`AppDelegate.swift` file, adding a new plugin) cannot be distributed via Turbopush, and therefore, must be updated via the appropriate store(s).

---

## Key Features

- **Automatic Rollback**: If an update causes a crash, the plugin automatically rolls back to the previous working version.
- **Multiple Platforms**: Supports Android and iOS.
- **Multiple Channels**: Release updates to different groups of users via separate channels.
- **Multiple Environments**: Test updates in staging before releasing to all users.
- **Expo Support**: First-class support via our [Expo plugin](https://turbopush.org/docs/setup/expo-setup?utm_source=readme).
- **New Architecture**: Supports both React Native old and new architecture (Fabric/TurboModules).

---

## Requirements

- **React Native**: 0.70 or higher
- **iOS**: 15.5 or higher
- **Android**: API level 21 (Android 5.0) or higher
- **Node**: 16 or higher

---

## React Native Setup

NPM:
```bash
npm install --save @turbopush/react-native-code-push
```

Yarn:
```bash
yarn add @turbopush/react-native-code-push
```

Follow the [Getting Started](https://turbopush.org/docs/?platform=react-native&utm_source=readme) guide to configure your app.

---

## Expo Setup

NPM:
```bash
npm install --save @turbopush/react-native-code-push @turbopush/turbopush-expo-plugin expo-build-properties
```

Yarn:
```bash
yarn add @turbopush/react-native-code-push @turbopush/turbopush-expo-plugin expo-build-properties
```

Add the following to your `app.json` or `app.config.ts` file:

```json
{
  "plugins": [
    [
      "expo-build-properties",
      {
        "ios": {
          "deploymentTarget": "15.5"
        }
      }
    ],
    [
      "@turbopush/turbopush-expo-plugin",
      {
        "android": {
          "CodePushDeploymentKey": "YOUR_ANDROID_CODE_PUSH_KEY"
        },
        "ios": {
          "CodePushDeploymentKey": "YOUR_IOS_CODE_PUSH_KEY"
        }
      }
    ]
  ]
}
```

For more information, see the [Getting Started](https://turbopush.org/docs/?platform=expo&utm_source=readme) guide.

---

## Basic Usage

The simplest way to integrate Turbopush is to wrap your root component with the `codePush` HOC. This will automatically check for and apply updates on each app launch.

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import codePush from '@turbopush/react-native-code-push';

function App() {
  return (
    <View>
      <Text>My App</Text>
    </View>
  );
}

export default codePush(App);
```

You can also trigger a manual update check at any point:

```tsx
import codePush from '@turbopush/react-native-code-push';

async function checkForUpdate() {
  const update = await codePush.checkForUpdate();
  if (update) {
    await codePush.sync();
  }
}
```

For advanced configuration options (update dialogs, install modes, rollback handling), see the [full documentation](https://turbopush.org/docs?utm_source=readme).

---

## Store Guideline Compliance

### Google Play

The third paragraph of [Device and Network Abuse](https://support.google.com/googleplay/android-developer/answer/9888379?hl=en) states that updating source code by any method other than Google Play's update mechanism is restricted. However, this restriction does not apply to updating JavaScript bundles:

> This restriction does not apply to code that runs in a virtual machine and has limited access to Android APIs (such as JavaScript in a webview or browser).

Turbopush only updates JS bundles and cannot update native code, so it is fully compliant.

### App Store

Paragraph **3.3.2** of the [Apple Developer Program License Agreement](https://developer.apple.com/terms/) allows over-the-air updates of JavaScript and assets:

> Interpreted code may be downloaded to an Application but only so long as such code: (a) does not change the primary purpose of the Application by providing features or functionality that are inconsistent with the intended and advertised purpose of the Application as submitted to the App Store, (b) does not create a store or storefront for other code or applications, and (c) does not bypass signing, sandbox, or other security features of the OS.

Turbopush allows you to follow these rules in full compliance as long as the update you push does not significantly deviate your product from its original App Store approved intent.

> **Tip:** For App Store-distributed apps, we suggest not enabling the `updateDialog` option when calling `sync`, as Apple's [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) discourage prompts that require user action to access app functionality.

---

## Contributing

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/turbopushdev/react-native-code-push/issues).

---

## License

MIT — see [LICENSE.md](LICENSE.md) for details.
