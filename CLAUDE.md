# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@turbopush/react-native-code-push`, a React Native plugin for the Turbopush/CodePush service that enables over-the-air (OTA) updates for React Native and Expo applications. The plugin maintains a copy of the previous update for automatic rollback in case of crashes.

## Development Commands

### Setup
```bash
npm install
```

### Testing

Build and run all tests (Android + iOS):
```bash
npm run test
```

Platform-specific tests:
```bash
npm run test:android    # Android only
npm run test:ios        # iOS only
```

Skip build and run tests directly:
```bash
npm run test:fast              # Both platforms
npm run test:fast:android      # Android only
npm run test:fast:ios          # iOS only
```

Old Architecture tests:
```bash
npm run test:oldArch           # Both platforms
npm run test:oldArch:android   # Android only
npm run test:oldArch:ios       # iOS only
```

Expo tests:
```bash
npm run test:expo:android      # Expo Android
npm run test:expo:ios          # Expo iOS
```

Test with debugger (for debugging test failures):
```bash
npm run test:debugger:android  # Debug Android tests
npm run test:debugger:ios      # Debug iOS tests
```

### Environment Variables for Tests

- `ANDROID_EMU=yourEmulatorName` - Specify which Android emulator to use
- `IOS_EMU="iPhone 15 (UUID)"` - Specify which iOS simulator to use
- `CLEAN=true` - Always restart emulators (kills existing ones)
- `CORE=true` - Run only core unit tests
- `NPM=true` - Pull plugin from NPM instead of local version
- `TEST_OLD_ARCH=true` - Test with React Native old architecture

Example:
```bash
CLEAN=true npm run test:android
CORE=true npm run test:ios
```

### Linting & Building

```bash
npm run tslint        # Lint TypeScript test files
npm run build:tests   # Compile TypeScript tests (test/ -> bin/)
npm run clean         # Remove bin/ directory
```

## Architecture

### JavaScript Layer

- **[CodePush.js](CodePush.js)**: Main JavaScript API that wraps the native module
  - Exports the HOC `codePush()` for wrapping React components
  - Provides sync(), checkForUpdate(), getCurrentPackage(), etc.
  - Uses the Acquisition SDK for server communication

- **[expo.js](expo.js)**: Expo config plugin that modifies native files during prebuild
  - Adds CodePush imports to AppDelegate (iOS)
  - Modifies bundleURL() to return CodePush bundle in production
  - Configures Android MainApplication with CodePush

- **[package-mixins.js](package-mixins.js)**: Utilities for package management (install, download, rollback)

- **[request-fetch-adapter.js](request-fetch-adapter.js)**: HTTP adapter for the Acquisition SDK

### Native Modules

**Android** ([android/app/src/main/java/com/microsoft/codepush/react/](android/app/src/main/java/com/microsoft/codepush/react/)):
- `CodePushNativeModule.java` - React Native bridge module
- `CodePushUpdateManager.java` - Manages update installation and rollback
- `CodePushUtils.java` - Utilities for package hash, bundle URL
- `SettingsManager.java` - SharedPreferences for update state
- `CodePushDialog.java` - Native update dialogs

**iOS** ([ios/CodePush/](ios/CodePush/)):
- `CodePush.h/m` - Main Objective-C module and React Native bridge
- `CodePushPackage.m` - Package metadata and verification
- `CodePushUpdateUtils.m` - Update installation logic
- `CodePushDownloadHandler.m` - Download progress and management
- Third-party dependencies: JWT (token verification), SSZipArchive (unzipping), Base64

### Testing Framework

**Custom Testing Framework** ([code-push-plugin-testing-framework/](code-push-plugin-testing-framework/)):
- Abstraction for running end-to-end tests on Android/iOS emulators
- Handles emulator/simulator management (boot, restart, install apps)
- Sets up test servers for mock CodePush updates
- Defined in [test/test.ts](test/test.ts) with scenarios for various update flows

**Example Apps** ([Examples/](Examples/)):
- `CodePushDemoApp` - Standard React Native app
- `CodePushDemoAppNewArch` - New Architecture (Fabric/TurboModules)
- `CodePushDemoSwiftNewArch` - New Architecture with Swift
- `CodePushDemoAppCpp` - C++ TurboModule example
- `CodePushExpoDemoApp` - Expo application
- Used by the test suite to validate plugin functionality

### Build Configuration

- **[react-native.config.js](react-native.config.js)**: React Native CLI autolinking config
- **[CodePush.podspec](CodePush.podspec)**: CocoaPods spec for iOS
- **[android/build.gradle](android/build.gradle)**: Android library configuration
- **[tsconfig.json](tsconfig.json)**: TypeScript compiler for test suite

### Scripts

- **[scripts/generateBundledResourcesHash.js](scripts/generateBundledResourcesHash.js)**: Generates hash for bundled resources
- **[scripts/getFilesInFolder.js](scripts/getFilesInFolder.js)**: Recursively lists files in a directory
- **[scripts/recordFilesBeforeBundleCommand.js](scripts/recordFilesBeforeBundleCommand.js)**: Records file state before bundling

## Key Concepts

### Update Flow
1. App checks for updates via `checkForUpdate()` or `sync()`
2. JavaScript calls native module which queries Turbopush server
3. If update available, download to temporary location
4. Verify package hash and signature
5. Install update (either immediate or on next restart)
6. On next app launch, apply update and track success
7. If crash detected, automatically roll back to previous version

### Package Management
- Packages stored in app's documents/cache directory
- Current package hash tracked in native storage (SharedPreferences/UserDefaults)
- Previous package kept for rollback capability
- Binary version mismatch detection prevents incompatible updates

### Platform Differences
- **iOS**: Uses Objective-C, stores packages in Library/LocalDatabase
- **Android**: Uses Java, stores packages in internal storage
- **Expo**: Requires config plugin to modify native files during prebuild

## Important Notes

- Native code changes (AppDelegate, MainActivity, etc.) cannot be distributed via CodePush
- The plugin supports both React Native old and new architecture (Fabric/TurboModules)
- Tests require Android SDK tools and iOS CocoaPods to be installed
- Tests automatically boot emulators if they're not running
- The main branch should be used for PRs (main branch: main)
