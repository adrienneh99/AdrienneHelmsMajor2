/*
 * contact.js - Contact route module
 *
 * 1. Validates & sanitizes the URL encoded info (eg, form data) via express-validator
 * 2. Sends the valid form data as an email via Mailgun & Nodemailer
 * 3. Responds to the user to indicate success (eg, pop-up 'Thx for your message')
 * 4. Redirects the user to the home page
 *
 */


// Import Nodemailer
var nodemailer = require('nodemailer');


// Import the express-validator functions needed
const { check, body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Handle contact create on POST
exports.contact_post = [





    // Validate fields & return a Validation Chain
    // body('name')
    //     .isEmpty().trim().withMessage('Name cannot be empty.')
    //     .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
    // body('email')
    //     .isEmpty().trim().withMessage('Email cannot be empty.')
    //     .isEmail().withMessage('Must be an email').trim().normalizeEmail(),
    // body('message')
    //     .isEmpty().trim().withMessage('Message cannot be empty.')
    //     .isLength({min: 15}).trim().withMessage('Message must be at least 15 chars long.'),

    // Sanitize fields & return a Sanitization Chain
    sanitizeBody('name').trim().escape(),
    sanitizeBody('email').trim().escape(),
    sanitizeBody('message').trim().escape(),

    // Process request after validation & sanitization
    function(req, res, next) {

        req.checkBody('name', 'Name cannot be empty.')
            .isEmpty().trim().withMessage('Name cannot be empty.')
            .isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),
        req.checkBody('email')
            .isEmpty().trim().withMessage('Email cannot be empty.')
            .isEmail().withMessage('Must be an email').trim().normalizeEmail(),
        req.checkBody('message')
            .isEmpty().trim().withMessage('Message cannot be empty.')
            .isLength({min: 15}).trim().withMessage('Message must be at least 15 chars long.'),

        console.log('am i getting here');
        console.log('req.body: ' + JSON.stringify(req.body));
        console.log('req.checkBody: ' + JSON.stringify(req.checkBody('/name')));

        var sendMail = function() {

            // Create a transporter object
            var transporter = nodemailer.createTransport({
                service: 'Mailgun',
                auth: {
                    user: '[sandbox postmaster address]',
                    pass: '[sandbox domain password]'
                }
            });

            // Create a message object
            var message = {
                from: email,
                to: 'adriennehelmsmajor@gmail.com',
                subject: 'Web Form Email - From ' + name,
                text: message
            };

            // Create a sendmail transport
            transporter.sendMail(message, function(error, info){
                if(error) {
                    console.log(error);
                }
                else {
                    console.log(info)
                }
            })
        };

        // Extract the validation errors & return a validation result object (ie, errors)
        // const errors = validationResult(req);



        // req.getValidationResult().then(result => result.throw()).then(() => {
        //     res.send(sendMail());
        // }, e => {
        //     res.status(400).json(e.array());
        // });

        req.getValidationResult().then(function (result) {
            return result.throw();
        }).then(function () {
            res.send(sendMail());
        }, function (e) {
            res.status(400).json(e.array());
        });




        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;

        console.log('name: '+name);
        console.log('email: '+email);
        console.log('message: '+message);
        // console.log('error: '+JSON.stringify(errors));
        // console.log(e.isEmpty());

        // The validation result object contains errors
        // if (!errors.isEmpty()) {
        //     // return res.status(400).send('Invalid syntax');
        //     return res.status(400).json({errors: errors.mapped()});
        // }
        // else {
        //
        //     var transporter = nodemailer.createTransport({
        //         service: 'Mailgun',
        //         auth: {
        //             user: 'postmaster@sandboxa4425c90fc0b4a0ab5c3899fd12b9c45.mailgun.org',
        //             pass: '13c7d0aef4ec686328bd6236f1d90199'
        //         }
        //     });
        //
        //     var message = {
        //         from: email,
        //         to: 'adriennehelmsmajor@gmail.com',
        //         subject: 'Web Form Email - From ' + name,
        //         text: message
        //     };
        //
        //     transporter.sendMail(message, function(error, info){
        //         if(error) {
        //             console.log(error);
        //         }
        //         else {
        //
        //         }
        //     })
        // }
    }
];

