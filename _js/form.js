var form_start = function() {
    // Contact Form
    $(function() {
    
        // Get the form.
        var form = $('#ajax-contact');
    
        // Get the messages div.
        var formMessages = $('#form-messages');
    
        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();
    
            // Serialize the form data.
            var formData = $(form).serialize();
    
            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
    
                // Set the message text.
                $(formMessages).text(response);
    
                // Clear the form.
                $('.field__textarea, .field__input').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
    
                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    
        });
    
    });
    
    
    // Form inputs
    $('.field input, .field textarea').focus(function(){
        // When input is focused, add focused class
        $(this).parent().addClass('focused');
        $(this).siblings().addClass('focused');
    });
    
    $('.field input, .field textarea').blur(function(){
        // When input is unfocused, check to see if it has any content
        // if true, remove focused class from only the inputWrapper
        if ($( this ).filter(function() { return $(this).val(); }).length > 0) {
            //swag
        } else { // if the input does not have content, remove class from label as well
            $( this ).parent().removeClass('focused');
            $( this ).siblings().toggleClass('focused');
        }
    });
};