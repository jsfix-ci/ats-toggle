# ATS-Toggle

`ats-toggle` is a simple command-line tool for checking and toggling the App Transport Security configuration in your iOS project's `Info.plist` file.

## Installation

Install the package in your project.

```
yarn add ats-toggle
```

## Usage

Show the current status of a given `Info.plist` file

```
yarn ats-toggle show path/to/Info.plist
```

Toggle the status of a given `Info.plist` file

```
yarn ats-toggle toggle path/to/Info.plist
```

Get help with the tool commands

```
yarn ats-toggle help
```

### License
MIT License (c) 2021, Richard Marks
