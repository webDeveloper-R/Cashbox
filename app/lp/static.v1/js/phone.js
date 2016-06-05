(function () {

	/**
     * CONSTANTS
     */
    var PHONE_INPUT = '#phone';

    //Format: 123-345-3456 or (078)789-8908
    var REGULAR_EXP_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    var PHONE_REQUIRED = 'Phone is required';
    var INVALID_PHONE = 'The phone is invalid, please change it';

    var SEL_ERROR_PHONE = '.error.phone';
    var SEL_ARROW_PHONE = '.arrow-up.phone';

    var FORM_GROUP_PHONE = '.form-group.phone';

    /**
     * Private functions
     */
    var showError = function (pErrorMSG, pSelArrow, pSelErrorBox, pSelFormGroup)  {
        $(pSelErrorBox).html( pErrorMSG );

        removeHidden(pSelArrow);
        removeHidden(pSelErrorBox);
        $(pSelFormGroup).addClass('has-error');
    };

    var search = function () {
        cleanErrors();
    	if (validateFields()) {
            var url      = '/app/#/search?phone='+$(PHONE_INPUT).val();
            window.location = url;
        }
    };

    var removeHidden = function(pSelector) {
        $(pSelector).removeClass( 'hidden' );
    };

    var cleanErrors = function () {
        $(SEL_ARROW_PHONE).addClass( 'hidden' );
        $(SEL_ERROR_PHONE).addClass( 'hidden' );
        $(FORM_GROUP_PHONE).removeClass( 'has-error' );
    };

    var validateFields = function () {
        var isValid = true;
        var phoneVal = $(PHONE_INPUT).val();

        if (phoneVal==='') {
            isValid = false;
            showError(PHONE_REQUIRED, SEL_ARROW_PHONE, SEL_ERROR_PHONE, FORM_GROUP_PHONE);
        } else {
            if (!REGULAR_EXP_PHONE.test(phoneVal)) {
                isValid = false;
                showError(INVALID_PHONE, SEL_ARROW_PHONE, SEL_ERROR_PHONE, FORM_GROUP_PHONE);
            }
        }
        return isValid;
    };

    $(PHONE_INPUT).keyup(function(e){
        if(e.keyCode == 13) {
            search();
        }
    });

    $('#submit').click(function() {
  		search();
  	});

    $('#login-btn').click(function() {
        var url      = '/app/#/login';
        window.location = url;
    });

    $('#sign-up-btn').click(function() {
        var url = '/sign-up.html';
        window.location = url;
    });

    $("#phone").mask("(999) 999-9999");
})();
