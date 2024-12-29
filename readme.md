### To run the app

```
npx expo run:android
npx expo run:ios
```

### To rebuild the app

**_if you have changed anything in the app.json file_**

```
npx expo prebuild --clean
```

### To get a development build apk

```
npx expo run:android --variant release
npx expo run:ios --configuration Release
```

### To get a production build apk [https://docs.expo.dev/guides/local-app-production/]

##### Generate keystore Log

```
keytool -genkey -v -keystore milapp.keystore -alias com.android.milapp -keyalg RSA -keysize 2048 -validity 10000
Enter keystore password: milapp

Re-enter new password: milapp

What is your first and last name?
  [Unknown]:  Saurabh Upadhyay
What is the name of your organizational unit?
  [Unknown]:  Milapp
What is the name of your organization?
  [Unknown]:  Milapp
What is the name of your City or Locality?
  [Unknown]:  Hong Kong
What is the name of your State or Province?
  [Unknown]:  Hong Kong
What is the two-letter country code for this unit?
  [Unknown]:  CN
Is CN=Saurabh Upadhyay, OU=Milapp, O=Milapp, L=Hong Kong, ST=Hong Kong, C=CN correct?
  [no]:  yes

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
        for: CN=Saurabh Upadhyay, OU=Milapp, O=Milapp, L=Hong Kong, ST=Hong Kong, C=CN
[Storing milapp.keystore]
```

**_Move it to the android/app directory._**

##### Save the details to gradle.properties

```
MYAPP_UPLOAD_STORE_FILE=milapp.keystore
MYAPP_UPLOAD_KEY_ALIAS=com.android.milapp
MYAPP_UPLOAD_STORE_PASSWORD=milapp
MYAPP_UPLOAD_KEY_PASSWORD=milapp
```

##### Add signing config to android/app/build.gradle

````gradle
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
        ```
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
        ```
    }
    buildTypes {
        debug {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            ```signingConfig signingConfigs.release```
            shrinkResources (findProperty('android.enableShrinkResourcesInReleaseBuilds')?.toBoolean() ?: false)
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
````

##### Build the app

```
cd android

./gradlew app:bundleRelease
```
