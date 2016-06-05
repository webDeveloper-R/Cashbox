(function () {

	/**
     * CONSTANTS
     */
    var FIRST_NAME_INPUT = '#firstname';
    var LAST_NAME_INPUT = '#lastname';
    var SELECT_EMAIL_INPUT = '#email';
    var SELECT_QUESTION_INPUT = '#question';

    var REQUIRED_FIELD = '* This field is required';

    var SEL_ERROR_FN = '.error.firstname';
    var SEL_ERROR_LN = '.error.lastname';
    var SEL_ERROR_EMAIL = '.error.email';
    var SEL_ERROR_QUESTION = '.error.question';

    var FORM_GROUP_FN = '.form-group.firstname';
    var FORM_GROUP_LN = '.form-group.lastname';
    var FORM_GROUP_STATE = '.form-group.email';
    var FORM_GROUP_STATE = '.form-group.question';

    /**
     * VARIABLES
     */
    var contact = {
        firstname: {
            required: true
        },
        lastname: {
            required: true
        },
        email: {
            required: true
        },
        question: {
            required: true
        }
    };

    /**
     * Functions
     */
    var submit = function () {
        cleanErrors();
        if (validateFields()) {
            var data = {};
            for (var key in contact) {
                data[key] = $('#'+key).val();
            }

            console.log('Next step');
            console.log(data);
        }
    };

    /**
     * Private functions
     */
    var removeHidden = function(pSelector) {
        $(pSelector).removeClass( 'hidden' );
    };

    var showError = function (pErrorMSG, pSelErrorBox, pSelFormGroup)  {
        $(pSelErrorBox).html( pErrorMSG );

        removeHidden(pSelErrorBox);
        $(pSelFormGroup).addClass('has-error');
    };

    var cleanErrors = function () {
        for (var key in contact) {
            $('.error.'+key).addClass( 'hidden' );
            $('.form-group.'+key).removeClass( 'has-error' );
        }
    };

    var validateFields = function () {
        var isValid = true;

        for (var key in contact) {
            if((contact[key].required) && (!$('#'+key).val())) {
                isValid = false;
                showError(REQUIRED_FIELD, '.error.'+key, '.form-group.'+key);
            }
        }

        return isValid;
    };

    $(FIRST_NAME_INPUT).keyup(function(e){
        if(e.keyCode == 13) {
            submit();
        }
    });

    $(LAST_NAME_INPUT).keyup(function(e){
        if(e.keyCode == 13) {
            submit();
        }
    });

    $(SELECT_EMAIL_INPUT).keyup(function(e){
        if(e.keyCode == 13) {
            submit();
        }
    });

    $(SELECT_QUESTION_INPUT).keyup(function(e){
        if(e.keyCode == 13) {
            submit();
        }
    });

    $('#submit').click(function() {
		submit();
	});

    $('#sign-up-btn').click(function() {
        var url = '/sign-up.html';
        window.location = url;
    });

    $('#login-btn').click(function() {
        var url      = '/app/#/login';
        window.location = url;
    });
})();

function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.7146631, lng: -117.1599865},
        scrollwheel: false,
        zoom: 14
    });
}