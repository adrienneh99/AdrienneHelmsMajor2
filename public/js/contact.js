/*
 * Client Side Validation for Contact Form
 *
 * Constraint Validation Ref 1: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * Constraint Validation Ref 2: https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/
 *
 */



var form = document.getElementById("contactForm");
var messageField = document.getElementById("formMessage");

form.setAttribute('novalidate', true);

// Validate each field property
var hasError = function(field) {

    // Don't validate submits & buttons
    if (field.type === 'submit' || field.type === 'button') {
        return;
    }

    // Get validity (ie, valid or invalid)
    var validity = field.validity;

    // If valid, return null
    if (validity.valid) {
        return;
    }

    // If required & empty
    if (validity.valueMissing) {
        return 'Oops! Looks like you forgot something.';
    }

    // If too short
    if (validity.tooShort) {
        // Message field
        if(messageField.value.length < 15) {
            return 'Your message is too short. Please send feedback, job offers, or simply say hello!'
        }
    }

    // If not the right type
    if (validity.typeMismatch) {
        // Email
        if (field.type === 'email') {
            return 'Please enter a valid email address.';
        }
    }

    // If pattern doesn't match
    if (validity.patternMismatch) {

        // If pattern info is included, return custom error
        if (field.hasAttribute('title')) return field.getAttribute('title');

        // Otherwise, generic error
        return 'Please match the requested format.';

    }

    // If all else fails, return a generic error
    return 'Houston, we have a problem.';
};


// Show an error message
var showError = function (field, error) {

    // Add an error class to the field with the error
    field.classList.add('error');

    // Get field id or name
    var id = field.id || field.name;

    if (!id) {
        return;
    }

    // Check if error message field already exists
    var message = field.form.querySelector('.errorMessage#errorFor-' + id);

    // If no error message field exists, create one
    if(!message) {
        message = document.createElement('span');
        message.className = 'errorMessage';
        message.id = 'errorFor-' + id;
        field.parentNode.insertBefore(message, field.nextSibling);
    }

    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'errorFor-' + id);

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';
};


// Remove error message once field is validated
var removeError = function(field) {

    // Remove error class to field
    field.classList.remove('error');

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Get field id or name
    var id = field.id || field.name;

    if (!id) {
        return;
    }

    // Check if an error message is in the DOM
    var message = field.form.querySelector('.errorMessage#errorFor-' + id + '');

    if (!message) {
        return;
    }

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
};


// Listen to & capture all blur events
document.addEventListener('blur', function(event) {

    // Validate the field
    var error = hasError(event.target);

    // If there's an error, show it
    if (error) {
        showError(event.target, error);
        return;
    }

    // Otherwise, remove any existing error message
    removeError(event.target);

}, true);

/*
 * On submit:
 * 1. Validate all fields
 * 2. Display error messages & focus on invalid fields
 * 3. If no errors exist, post the data to the server for validation & sanitization
 * 4. If the post was successful, display a status message to the user & clear all fields
*/
document.addEventListener('submit', function(event) {

    event.preventDefault();

    // Get all of the form elements
    var fields = event.target.elements;

    // Validate each field & store the first field with an error to a variable so
    // we can bring it into focus later
    var error, hasErrors;

    for (var i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errors, don't submit form & focus on first element with error
    if (hasErrors) {
        hasErrors.focus();
    }
    else {
        // Send the input data to the contactRouter via a JSON object
        $.post('contact', {
            name: $('#formName').val(),
            email: $('#formEmail').val(),
            message: $('#formMessage').val()
        }
        // Execute this function when the post request succeeds
        , function(textStatus){
            $('#submitStatusMessage').empty().append(textStatus);
            $('#formName').val('');
            $('#formEmail').val('');
            $('#formMessage').val('');
            $('#formButton').blur();
        });
    }
}, false);