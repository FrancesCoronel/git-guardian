![](assets/img/logo.png)

# cmtech-assignment-1

[![Github Issues](https://img.shields.io/github/issues/fvcproductions/cmtech-assignment-1.svg?style=flat-square)](https://github.com/fvcproductions/cmtech-assignment-1/issues) [![GitHub  Pull-Requests](https://img.shields.io/github/issues-pr/fvcproductions/cmtech-assignment-1.svg?style=flat-square)](https://github.com/fvcproductions/cmtech-assignment-1/pulls) [![MIT License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) [![Donate via PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](http://paypal.me/fvcproductions)

GitHub API + Guardian API = GitGuardian

Login to GitHub and see what news you missed from the Guardian!

![](assets/img/screenshot.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)

## Installation

Use the following command to serve up locally.

```shell
#
$ npm i -g firebase-tools # Install firebase-tools if you haven't already
$ firebase serve   # Start development server
```

CodeKit 3 was also used to serve up locally.

## Usage

1. Login using GitHub with oAuth possible from Firebase
2. Recent push commits from logged in user parsed using GitHub API and time stamps are fed into Guardian API
3. Guardian API parses time stamps and shows headline most closely matching time stamp of push commit

### Endpoints

- GitHub
    + GitHub commits
- Guardian
    + Guardian articles

### Struggles

- Even though user is able to login using GitHub, I wasn't able to figure out how to get commits from logged in user so app is just showing [@cornelltech](http://github.com/cornelltech) push commits/headlines.

## Contributing

> To get started...

- 🍴 Fork this repo [here](https://github.com/fvcproductions/cmtech-assignment-1#fork-destination-box)
- 🔨 Hack away
- 👥 Add yourself as a contributor under credits
- 🔧 Make a pull request [here](https://github.com/fvcproductions/cmtech-assignment-1/compare)
- 🎉 Get your pull request approved - success!

Or just [create an issue](https://github.com/fvcproductions/cmtech-assignment-1/issues) - any little bit of help counts! 😊

## Credits

- [FVCproductions](http://fvcproductions.com) 🍓🍫
- Mengjiao (Molly) Zhu
