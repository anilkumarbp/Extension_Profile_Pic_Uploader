
Extension_Profile_Pic_Uploader
=======================

## Prerequisites

* Have a RingCentral Admin Account
* Be registered as a [RingCentral Developer](https://developers.ringcentral.com/)
* [Created your sandbox(aka: test or development) account](https://developer.ringcentral.com/library/tutorials/test-account.html) within the RingCentral Developer Portal

## Installation

Clone the repository to your local system:
[_Optionally, you can fork it first, but will need to modify the URI in the following command to match your fork's GIT repository._]

```
git clone https://github.com/anilkumarbp/Extension_Profile_Pic_Uploader.git
```

Change your working directory to the newly cloned repository:
```
cd Extension_Profile_Pic_Uploader
```

Install dependencies using NPM:
```
npm install
```

### Development Environment Setup

Before operating the application for local development and testing, you will need to configure some RingCentral-specific environment variables.

You will need to create a `.env` file in the root directory of this application. We have created a file you can use as a template named `TMP.env`. Below are the steps to setup your development environment:

1. Rename `.env.tmpl` to `.env`. From the terminal in Mac or Linux environments: `mv .env.tmpl .env`
2. Open the `.env` for editing
3. Enter the indicated values:

    ## RC_Corp_Account
    * **RC_USERNAME=** Admin user's phone number
    * **RC_PASSWORD=** Admin user's password
    * **RC_EXTENSION=** Admin user's extension
    * **RC_APP_KEY=** Your application's `app_key`
    * **RC_APP_SECRET=** Your application's `app_secret`
    * **RC_ENVIRONMENT=** Either `sandbox` -OR- `production`
    * **RC_API_BASE_URL=** Only change when your application receives production access
    * **DEVICES_PER_PAGE**= Number for page aggregation, uses 500 by default
    * **MAX_DEVICES_PER_MIN**= Number of maximum devices for the Rate Limit throttling


## Operation

To start this application locally:
```
npm start
```

To run the unit tests:
```
npm test
```

## Dependencies

Current used RCSDK version for this demo is :
[RCSDK-2.0.4](https://github.com/ringcentral/ringcentral-js/tree/2.0.4)
* Make sure to change the SDK version in the package.json before you chose to use a different SDK Version.


## Links

Project Repo

* https://github.com/anilkumarbp/Extension_Profile_Pic_Uploader.git

RingCentral SDK for JavaScript

* https://github.com/ringcentral/js-sdk

RingCentral API Docs

* https://developers.ringcentral.com/library.html

RingCentral API Explorer

* http://ringcentral.github.io/api-explorer

## Contributions

Any reports of problems, comments or suggestions are most welcome.

Please report these on [Extension_Profile_Pic_Uploader's Issue Tracker in Github](https://github.com/anilkumarbp/Extension_Profile_Pic_Uploader/issues).

## License

RingCentral SDK is available under an MIT-style license. See [LICENSE.txt](LICENSE.txt) for details.

RingCentral SDK &copy; 2016 by RingCentral

## FAQ

* What if I do not have a RingCentral account? Don't have an account, no worries: [Become a RingCentral Customer](https://www.ringcentral.com/office/plansandpricing.html)
* I/My company is an Independent Software Vendor (ISV) who would like to integrate with RingCentral, how do I do that? You can apply to [Join the RingCentral Partner Program](http://www.ringcentral.com/partner/isvreseller.html)
