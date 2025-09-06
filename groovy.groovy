// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 24
        compileSdkVersion = 34
        targetSdkVersion = 34
        kotlinVersion = "1.9.22" // Use the latest stable version
        ndkVersion = "25.1.8909192"
        abiFilters = ["armeabi-v7a", "arm64-v8a", "x86", "x86_64"]
        reactNativeVisionCamera = [
            // VisionCamera will use the default AGP, Kotlin, and Gradle versions
            // if these variables are not set. The minSdk/targetSdk/compileSdk
            // come from the React Native Android gradle.properties file.
        ]
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.4.1") // Update to a compatible version
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
        classpath("com.google.gms:google-services:4.4.2") // Added for Google Services
    }
}