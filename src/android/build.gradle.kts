buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.1'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.24"
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

// THE ULTIMATE FIX: Force all plugins to stop using the old 'jdk' modules
subprojects {
    project.configurations.all {
        resolutionStrategy.eachDependency { details ->
            if (details.requested.group == 'org.jetbrains.kotlin') {
                details.useVersion "1.9.24"
            }
        }
        // This removes the specific modules causing the "Duplicate class" error
        exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jdk7'
        exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jdk8'
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}