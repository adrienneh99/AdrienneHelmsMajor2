/*
 * contact.js - Contact route module
 *
 * 1. Validates & sanitizes the URL encoded info (eg, form data) via express-validator
 * 2. Sends the valid form data as an email via Mailgun & Nodemailer
 * 3. Send a response to the user to indicate whether the message was sent successfully or not
 *
 */


// Import Nodemailer
var nodemailer = require('nodemailer');


// Import the express-validator functions needed
const { check,body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Environment variables to hold Mailgun credentials
var recipientUsername = process.env.MAILUSER || 'need username';
var recipientPassword = process.env.MAILPASSWORD || 'need password';
var recipientEmail = process.env.EMAIL || 'need email';


// Contact form POST request handler method
exports.contact_post = [

    // Sanitize fields & return a Sanitization Chain
    sanitizeBody('name').trim().escape(),
    sanitizeBody('email').trim().escape(),
    sanitizeBody('message').trim().escape(),

    // Process POST request after sanitization
    function(req, res, next) {

        // Validate fields & return a Validation Chain
        req.checkBody('name', 'Name cannot be empty.').notEmpty();
        req.checkBody('email', 'Email cannot be empty.').notEmpty();
        req.checkBody('email', 'Must be an email').isEmail();
        req.checkBody('message', 'Message cannot be empty.').notEmpty();
        req.checkBody('message', 'Message must be at least 15 chars long.').isLength({min: 15});

        // Function to send email via Nodemailer & Mailgun
        var sendMail = function() {

            var senderName = req.body.name;
            var senderEmail = req.body.email;
            var senderMessage = req.body.message;

            // Create a transporter object
            var transporter = nodemailer.createTransport({
                service: 'Mailgun',
                auth: {
                    user: recipientUsername,
                    pass: recipientPassword
                }
            });

            // Create a message object
            var message = {
                from: senderEmail,
                to: recipientEmail,
                subject: 'Web Form Email - From ' + senderName,
                text: senderMessage
            };

            // Send mail via the transporter object
            transporter.sendMail(message, function(error){
                // If Nodemailer failed to send the message, return HTTP 400 & an error message
                if(error) {
                    return res.status(400).send("Message could not be sent. Please try again later.");
                }
                // If Nodemailer sent the message successfully, return HTTP 200 & a success message
                else {
                    return res.status(200).send("Message sent! Can't wait to connect!");
                }
            })
        };

        // Extract validation errors from the request
        var errors = req.validationErrors();

        // If validation errors exist, return HTTP 400
        if (errors) {
            return res.status(400).json({errors: errors});
        }
        // If no validation errors exist, send the contact form message
        else {
            sendMail()
        }
    }
];

