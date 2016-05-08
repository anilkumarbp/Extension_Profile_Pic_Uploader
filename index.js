'use strict';

// Handle local development and testing
require('dotenv').config();

// CONSTANTS - obtained from environment variables
var PORT = process.env.PORT;

// Dependencies
var RC = require('ringcentral');
var helpers = require('ringcentral-helpers');
var http = require('http');
var RC = require('ringcentral');
var helpers = require('ringcentral-helpers');
var http = require('http');
var path = require('path');

// VARS
var _extensions=[];
var _extensionsPictureFilterArray =[];
var server = http.createServer();


// Initialize the sdk for RC
var sdk = new RC({
    server: process.env.RC_API_BASE_URL,
    appKey: process.env.RC_APP_KEY,
    appSecret: process.env.RC_APP_SECRET,
    cachePrefix: process.env.RC_CACHE_PREFIX
});

// Bootstrap Platform and Subscription
var platform = sdk.platform();


// Login into RC
login();

// Login to the RingCentral Platform
function login() {
    return platform.login({
            username: process.env.RC_USERNAME,
            password: process.env.RC_PASSWORD,
            extension: process.env.RC_EXTENSION
        })
        .then(function (response) {
            console.log("The RC Authorization object is :", JSON.stringify(response.json(), null, 2));
            console.log("Succesfully logged into the RC Corporation Account");
            init();
        })
        .catch(function (e) {
            console.log("Login Error into the Ringcentral Platform :", e);
            throw e;
        });
}


// Start the server
server.listen(PORT);

/*
 Retreive Extensions on Login success
 */
function init(loginData) {

    var extensions = [];
    var page = 1;

    function getExtensionsPage() {

        return platform
            .get('/account/~/extension', {
                page: page,
                perPage: process.env.DEVICES_PER_PAGE                                             //REDUCE NUMBER TO SPEED BOOTSTRAPPING
            })
            .then(function (response) {

                var data = response.json();
                console.log("************** THE NUMBER OF ACCOUNT LEVEL EXTENSIONS ON THIS CORPORATE ACCOUNT IS : ***************",data.records.length);

                // get the extensions list across all pages
                extensions = extensions.concat(data.records);
                if (data.navigation.nextPage) {
                    page++;
                    return getExtensionsPage();                                                     // this will be chained
                } else {
                    return extensions;                                                              // this is the finally resolved thing
                }
            });

    }

    /*
     Loop until you capture all devices
     */
    return getExtensionsPage()
        .then(function (extensions) {
            console.log("************** The TOTAL NUMBER OF EXTENSIONS ON THIS ACCOUNT IS : **********", extensions.length);
            return extensions;
        })
        .then(createExtenionsProfileFilter)
        .then(startUploading)
        .catch(function (e) {
            console.error(e);
            throw e;
        });

}


/*
 To generate the Extensions Endpoints for Uploading Pictures
 */
function createExtenionsProfileFilter(extensions) {
    _extensions = extensions;
    for(var i=0; i< extensions.length; i++) {

        var extension = extensions[i];
        _extensionsPictureFilterArray.push(getProfileImageURI(extension));



    }
    return extensions;
}

/*
 GET the profile image URI's for all extensions
 */
function getProfileImageURI(extension) {
    if (!extension) {
        ;
        throw new Error('Image-Uploader Error: The selected extension :'+ extension.id + 'does not have a "profileImage" parameter');
    } else {
        console.log("The Extension ID is  :" + extension.id + " and the corresponding ProfileImage URI is :" + extension.profileImage.uri);
        return extension.profileImage.uri.slice(53);
    }
}

/*
 To upload the profile pictures across all extension one after another
 */
function startUploading(extensions) {

    // TODO ---- Pass the Binary Data Image as a Multipart

    console.log("The upload process now begins");

    // Using conventional method to create multi part form data
    var img = require('fs').readFileSync('./foo/ringcentral_logo.png');

    var boundary = '--boundary1234567890--'
        , crlf = '\r\n'
        , part1 = crlf + 'Content-Type: multipart/form-data'
        + crlf + 'Content-Disposition: form-data; name="file"; filename="ringcentral_logo.png"'
        + crlf + 'Content-Transfer-Encoding: binary'
        + crlf + crlf
        , part2 = img
        , part3 = crlf + '--' + boundary + '--';

    return new Promise(function (fulfill, reject) {
        console.log("The length of the array is :" + _extensionsPictureFilterArray.length);

        for (var i = 0; i < _extensionsPictureFilterArray.length; i++) {

            console.log("The array item :" + i + "is :" + _extensionsPictureFilterArray[i]);

            //Do a image upload for each extension
            platform
                .send({
                    method: 'POST',
                    url: _extensionsPictureFilterArray[i],
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: boundary
                })
                .then(function (response) {
                    // TO DO then
                    console.log("The Image has been uploaded to the extension : ");
                    console.log("The response is :"+ JSON.stringify(response,null,2));
                })
                .catch(function (e) {
                    console.error("The error is in organize : " + e);
                    throw(e);
                });
        }
    });
}


function handleRemoveSubscriptionSuccess(data) {
    console.log('REMOVE SUBSCRIPTION SUCCESS DATA: ', data);
}

function handleRemoveSubscriptionError(data) {
    console.log('REMOVE SUBSCRIPTION ERROR DATA: ', data);
}

function handleSubscriptionRenewSuccess(data) {
    console.log('RENEW SUBSCRIPTION SUCCESS DATA: ', data);
}

function handleSubscriptionRenewError(data) {
    console.log('RENEW SUBSCRIPTION ERROR DATA: ', data);
}

function handleSubscribeSuccess(data) {
    console.log('SUBSCRIPTION CREATED SUCCESSFULLY');
}

function handleSubscribeError(data) {
    console.log('FAILED TO CREATE SUBSCRIPTION: ', data);
}

/**
 * Platform Event Handlers
 **/
function handleLoginSuccess(data) {
    // UNCOMMENT TO VIEW LOGIN DATA
    //console.log('LOGIN SUCCESS DATA: ', data);
}

function handleLoginError(data) {
    console.log('LOGIN FAILURE DATA: ', data);
}

function handleLogoutSuccess(data) {
    console.log('LOGOUT SUCCESS DATA: ', data);
}

function handleLogoutError(data) {
    console.log('LOGOUT FAILURE DATA: ', data);
}

function handleRefreshSuccess(data) {
    console.log('REFRESH SUCCESS DATA: ', data);
}

function handleRefreshError(data) {
    console.log('REFRESH FAILURE DATA: ', data);
    console.log('Initialing Login again :');
    login();
}
