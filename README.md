# capacitor-firebase-appcheck
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Allows usage of native AppCheck tokens in a Capacitor Hybrid application. 
From the [Firebase Docs](https://firebase.google.com/docs/app-check):
>App Check works alongside other Firebase services to help protect your backend resources from abuse, such as billing fraud or phishing.

## Install

```bash
npm install capacitor-firebase-appcheck
npx cap sync
```

### Prereqs

You must enable AppCheck within your Firebase Project before installing this plugin. The location for both iOS and Android is the same, but the requirements for both are slightly different. See below for getting AppCheck set
up in your console (note, you only need to follow step one as this plugin takes the place of everything after):

[Set up AppCheck on iOS with AppAttest (>iOS 14)](https://firebase.google.com/docs/app-check/ios/app-attest-provider#project-setup)

[Set up AppCheck on iOS with DeviceCheck (<iOS 14)](https://firebase.google.com/docs/app-check/ios/devicecheck-provider#project-setup)

[Set up AppCheck on Android with SafetyNet](https://firebase.google.com/docs/app-check/android/safetynet-provider#project-setup)
### iOS

For iOS, you need to ensure firebase is set up in your project before continuing. You
can [use this link to the iOS Firebase Docs](https://firebase.google.com/docs/ios/setup#add-config-file) to see how to set up your project.

### Android

For Android, you also need to ensure firebase is set up in your project before continuing. You
can [use this link to the Android Firebase Docs (Step 3)](https://firebase.google.com/docs/android/setup#add-config-file) to see how to set up your project.

You may also need to instantiate the class with your `MainActivity.java` as follows:

```java
// Android/app/src/main/java/MainActivity.java
...
import studio.devleaf.capacitorfirebaseappcheck.AppCheckPlugin
...
@Override
public void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  ...
  registerPlugin(AppcheckPlugin.class);
}
```

## Usage

```typescript
// import firebase and appcheck
import { firebase } from 'firebase';
import { AppCheck } from 'capacitor-firebase-appcheck';

try {
  // initialise AppCheck
  AppCheck.initialize({
    // enable debugging if in staging or dev environments. Default is false.
    debug: true
  });

  // create custom appcheck provider
  const appCheckCustomProvider = {
    getToken: async () => {
      // get the token from native
      const { token, exp: expTimeMillis } = await AppCheck.getAppCheckToken();

      return {
        token,
        expireTimeMillis
      }
    }
  }

  // activate appcheck [set true to refresh the token automatically on expiry]
  firebase.appCheck().activate(appCheckCustomProvider, true);


} catch (err) {
  // log any errors
  console.error(err);
}
```

## API

<docgen-index>

- [capacitor-firebase-appcheck](#capacitor-firebase-appcheck)
  - [Install](#install)
    - [Prereqs](#prereqs)
    - [iOS](#ios)
    - [Android](#android)
  - [Usage](#usage)
  - [API](#api)
    - [initialize(...)](#initialize)
    - [getAppCheckToken()](#getappchecktoken)
    - [Interfaces](#interfaces)
      - [InitializationOptions](#initializationoptions)
      - [AppCheckToken](#appchecktoken)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options?: InitializationOptions | undefined) => Promise<boolean>
```

A method to initialise the AppCheck plugin. This must be called once and once only before
calling any other method. Returns true on success or false on failure. Check native logs to
see the actual problem.

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#initializationoptions">InitializationOptions</a></code> |

**Returns:** <code>boolean</code>

**Since:** 1.0.0

--------------------


### getAppCheckToken()

```typescript
getAppCheckToken() => Promise<AppCheckToken>
```

Get's the native AppCheck token from AppAttest/DeviceCheck on iOS[&gt;=14/&lt;14] or SafetyNet on Android.

**Returns:** <code>Promise\<<a href="#AppCheckToken">AppCheckToken</a>\></code>

**Since:** 1.0.0

--------------------


### Interfaces


#### InitializationOptions

| Prop        | Type                 | Description                                                                                                                                                                                    | Since |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`debug`** | <code>boolean</code> | If debug is enabled, the native environment will log debug creds and use debug mode. Intended to be used with staging or development environmnets only. Do not set this to TRUE in production. | 1.0.0 |

#### AppCheckToken

| Prop | Type | Description | Since |
| ---- | ---- | ----------- | ----- |
| **`token`** | <code>string</code> | The token provided by the native environment to be sent to firebase. | 1.0.0 |
| **`exp`** | <code>number</code> | The expiration date of the token in milliseconds since epoch [Unix time] | 1.0.0 |

</docgen-api>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://mattmilan.dev/"><img src="https://avatars.githubusercontent.com/u/49694881?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt Milan</b></sub></a><br /><a href="https://github.com/mattmilan-dev/capacitor-firebase-appcheck/commits?author=mattmilan-dev" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!