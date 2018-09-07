#  CoinTrend
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* This app built using React Native for showing Bitcoin price in the latest 30 days. User can also save their purchase price to know whether they get profit or loss.

## Library Used

* For React Native boilerplate, I use [Ignite](https://github.com/infinitered/ignite)
* For Bitcoin data API, I use [Coindesk](https://www.coindesk.com/api/)
* For Chart component, I use [Victory Native](https://github.com/FormidableLabs/victory-native)

## How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

