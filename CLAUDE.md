# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@turbopush/react-native-code-push`, a React Native plugin for the Turbopush/CodePush service that enables over-the-air (OTA) updates for React Native and Expo applications. The plugin maintains a copy of the previous update for automatic rollback in case of crashes.

## Development Commands

### Setup
```bash
npm install
```

### Build

```bash
npm run build        # Compile TypeScript (src/ -> dist/)
```

### Dead code / dependency check

```bash
npm run knip         # Detect dead code and unused dependencies
```

## Architecture

### JavaScript Layer

- **[CodePush.js](CodePush.js)**: Main JavaScript API that wraps the native module
  - Exports the HOC `codePush()` for wrapping React components
  - Provides sync(), checkForUpdate(), getCurrentPackage(), etc.
  - Uses the Acquisition SDK for server communication

- **[package-mixins.js](package-mixins.js)**: Utilities for package management (install, download, rollback)

- **[request-fetch-adapter.js](request-fetch-adapter.js)**: HTTP adapter for the Acquisition SDK

- **[src/acquisition-sdk/](src/acquisition-sdk/)**: Vendored Acquisition SDK (TypeScript source, compiled to `dist/`)

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

### Build Configuration

- **[react-native.config.js](react-native.config.js)**: React Native CLI autolinking config
- **[CodePush.podspec](CodePush.podspec)**: CocoaPods spec for iOS
- **[android/build.gradle](android/build.gradle)**: Android library configuration
- **[tsconfig.json](tsconfig.json)**: Compiles the vendored acquisition SDK (`src/`) into `dist/`

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
- The main branch should be used for PRs (main branch: main)
