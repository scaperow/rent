var ParseServer = require('parse-server').ParseServer;
var ParseManager = require('parse-dashboard');
var Parse = require('parse/node')
var path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') })

const {
    SSL_FORCE: sslForce,
    SERVER_DOMAIN,
    MONGO_URI,
    APP_ID,
    APP_NAME,
    SERVER_PORT,
    MASTER_KEY,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_HOST,
    MANAGER_USER,
    MANAGER_PASSWORD,
    REPLICA_SET,
    SMTP_PORT } = process.env

var url = sslForce ? `https://${SERVER_DOMAIN}` : `http://${SERVER_DOMAIN}:${SERVER_PORT}`;
var parseUrl = url + '/api'



var server = new ParseServer({
    appName: APP_NAME,
    databaseURI: MONGO_URI, // Connection string for your MongoDB database
    appId: APP_ID,
    cloud: './api/index.js',
    javascriptKey: 'javascript',
    serverURL: parseUrl,
    publicServerURL: parseUrl,
    verbose: false,
    verifyUserEmails: false,
    masterKey: MASTER_KEY, // Keep this key secret!
    allowClientClassCreation: false,
    databaseOptions: {
        replicaSet: REPLICA_SET
    },
    customPages: {
        invalidLink: `${url}/result/invalid_link`,
        choosePassword: `${url}/result/choose_password`,
        invalidVerificationLink: `${url}/result/invalid_verification_link`,
        linkSendFail: `${url}/result/link_send_fail`,
        linkSendSuccess: `${url}/result/link_send_success`,
        //   parseFrameURL: `${url}/result/link_send_success`,
        passwordResetSuccess: `${url}/result/password_reset_success`,
        verifyEmailSuccess: `${url}/result/verify_email_success`,
    },
    passwordPolicy: {
        // Two optional settings to enforce strong passwords. Either one or both can be specified. 
        // If both are specified, both checks must pass to accept the password
        // 1. a RegExp object or a regex string representing the pattern to enforce 
        validatorPattern: /^[\w\-\_(\)\!@#\$\%\^\&\*]{6,24}$/g, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
        // 2. a callback function to be invoked to validate the password  

        validatorCallback: (password) => {
            return /^[\w\-\_(\)\!@#\$\%\^\&\*]{6,24}$/g.test(password)
        },

    },
    emailAdapter: {
        module: "parse-smtp-template",
        options: {
            fromAddress: SMTP_USER,
            user: SMTP_USER,
            password: SMTP_PASSWORD,
            host: SMTP_HOST,
            port: SMTP_PORT,
            name: APP_NAME,
            template: true,
            templatePath: "views/email/account.html",
            passwor1ptions: {
                subject: "重置密码",
                body: "点击下方链接,重置您的密码",
            },
            confirmOptions: {
                subject: "绑定邮箱",
                body: "点击下方链接，绑定用户到该邮箱",
            }
        }
    }
});


var manager = new ParseManager({
    "apps": [
        {
            "serverURL": parseUrl,
            "appId": APP_ID,
            "masterKey": MASTER_KEY,
            "appName": APP_NAME
        }
    ],
    "users": [
        {
            "user": MANAGER_USER,
            "pass": MANAGER_PASSWORD
        }
    ],
    "useEncryptedPasswords": false
}, true);


module.exports = {
    server, manager
}