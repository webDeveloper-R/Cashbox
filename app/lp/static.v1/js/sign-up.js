(function () {

    /**
     * 
     * CONSTANTS
     */
    var FIRST_NAME_INPUT = '#first_name';
    var LAST_NAME_INPUT = '#last_name';
    var EMAIL_INPUT = '#email';
    var ZIP_INPUT = '#zip';
    var CREDIT_CARD_INPUT = '#credit_card';
    var MONTH_INPUT = '#exp_month';
    var YEAR_INPUT = '#exp_year';
    var CVV_INPUT = '#cvv';
    var FIRST_CHECK_INPUT = '#first_check';

    var STATUS_FAIL = 'FAIL';

    var SEL_ERROR_FN = '.error.first_name';
    var SEL_ERROR_LN = '.error.last_name';
    var SEL_ERROR_EMAIL = '.error.email';
    var SEL_ERROR_ZIP = '.error.zip';
    var SEL_ERROR_CC = '.error.credit_card';
    var SEL_ERROR_MON = '.error.exp_month';
    var SEL_ERROR_YEAR = '.error.exp_year';
    var SEL_ERROR_CVV = '.error.cvv';
    var SEL_ERROR_CHECK = '.error.first_check';

    var FORM_GROUP_FN = '.form-group.first_name';
    var FORM_GROUP_LN = '.form-group.last_name';
    var FORM_GROUP_EMAIL = '.form-group.email';
    var FORM_GROUP_ZIP = '.form-group.zip';
    var FORM_GROUP_CC = '.form-group.credit_card';
    var FORM_GROUP_MON = '.form-group.exp_month';
    var FORM_GROUP_YEAR = '.form-group.exp_year';
    var FORM_GROUP_CVV = '.form-group.cvv';
    var FORM_GROUP_CHECK = '.form-group.first_check';

    var ERROR_CONTAINER = '.errors-container';


    var INITIAL_EXP_MONTH = 'MONTH';
    var INITIAL_EXP_YEAR = 'YEAR';

    var ERROR_FIRST_NAME = '* Invalid name, please change it';
    var ERROR_LAST_NAME = '* Invalid last name, please change it';
    var ERROR_EMAIL = '* Invalid email, please change it';
    var ERROR_ZIP = '* Invalid Zip Code, must contain 5 digits';
    var ERROR_CREDIT_CARD = '* Invalid credit card, please change it';
    var ERROR_CVV = '* Invalid cvv, please change it';
    var ERROR_CHECK = '* You must agree with our terms and conditions';
    var ERROR_EXP_MONTH = '* You must select a month';
    var ERROR_EXP_YEAR = '* You must select a year';

    var SERVER_ERROR = 'Internal Server Error';
    var STATUS_FAIL = 'FAIL';

    var THANKYOU_PATH = '/thankyou';
    var SPINNER_ID = 'spinner-1';

    var SEL_PACKAGE = '.package';
    var SEL_PACKAGE_ICON = '.package .recommended .glyphicon';

    var CLASS_PACKAGE_SELECTED = 'glyphicon-record';
    var CLASS_PACKAGE_UNSELECTED = 'icon-circle';

    var URL_SIGN_UP = 'http://members.playclick.net/api/sign-up';

    var productId = 72;
    
    /**
     * SCOPE FUNCTIONS
     */
    var selectPackage = function(pPackage) {
        cleanSelectedPackage();
        $(pPackage).addClass('active');
        $('.recommended .glyphicon', pPackage).removeClass(CLASS_PACKAGE_UNSELECTED);
        $('.recommended .glyphicon', pPackage).addClass(CLASS_PACKAGE_SELECTED);

        productId = pPackage.dataset.productid;
    };

    var postSignUp = function(path, params, method) {
        method = method || 'post'; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement('form');
        form.setAttribute('method', method);
        form.setAttribute('action', path);

        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement('input');
                hiddenField.setAttribute('type', 'hidden');
                hiddenField.setAttribute('name', key);
                hiddenField.setAttribute('value', params[key]);

                form.appendChild(hiddenField);
             }
        }

        document.body.appendChild(form);
        form.submit();
    };

    var signUp = function() {
        $(ERROR_CONTAINER + ' ul').empty();
        
        if(validateForm()) {
            var data = {
              first_name : $(FIRST_NAME_INPUT).val(),
              last_name : $(LAST_NAME_INPUT).val(),
              email : $(EMAIL_INPUT).val(),
              address : '1 Main Str',
              city : geoip_city(),
              state : geoip_region(),
              country : geoip_country_code(),
              zip : $(ZIP_INPUT).val(),
              phone : '8885554444',
              credit_card_number : $(CREDIT_CARD_INPUT).val(),
              credit_card_exp_month : $(MONTH_INPUT).val(),
              credit_card_exp_year : $(YEAR_INPUT).val(),
              credit_card_cvv : $(CVV_INPUT).val(),
              productId : productId
            };

            $.ajax({
                url: URL_SIGN_UP,
                data: JSON.stringify(data),
                type: 'POST',
                crossDomain: true,
                dataType : 'json',
                contentType: 'application/json;charset=utf-8',
                success: function(pData) { 
                    if(pData.status===STATUS_FAIL) {
                        pData.errors.forEach(function(pError) {
                            $(ERROR_CONTAINER + ' ul').append('<li class="error respond-errors">'+pError+'</li>');
                        });
                    } else {
                        postSignUp(pData.link, {
                            login: pData.username,
                            password: pData.password
                        });
                    }
                },
                error: function(pError) { 
                    console.log('Failed!');
                    console.log(pError);
                }
            });
        }
    };

    var cleanSelectedPackage = function() {
      $(SEL_PACKAGE).removeClass('active');
      $(SEL_PACKAGE_ICON).removeClass(CLASS_PACKAGE_SELECTED);
      $(SEL_PACKAGE_ICON).addClass(CLASS_PACKAGE_UNSELECTED);
    };

    var cleanErrors = function() {
        $(SEL_ERROR_FN).addClass( 'hidden' );
        $(SEL_ERROR_LN).addClass( 'hidden' );
        $(SEL_ERROR_EMAIL).addClass( 'hidden' );
        $(SEL_ERROR_ZIP).addClass( 'hidden' );
        $(SEL_ERROR_CC).addClass( 'hidden' );
        $(SEL_ERROR_MON).addClass( 'hidden' );
        $(SEL_ERROR_YEAR).addClass( 'hidden' );
        $(SEL_ERROR_CVV).addClass( 'hidden' );
        $(SEL_ERROR_CHECK).addClass( 'hidden' );

        $(FORM_GROUP_FN).removeClass( 'has-error' );
        $(FORM_GROUP_LN).removeClass( 'has-error' );
        $(FORM_GROUP_EMAIL).removeClass( 'has-error' );
        $(FORM_GROUP_ZIP).removeClass( 'has-error' );
        $(FORM_GROUP_CC).removeClass( 'has-error' );
        $(FORM_GROUP_MON).removeClass( 'has-error' );
        $(FORM_GROUP_YEAR).removeClass( 'has-error' );
        $(FORM_GROUP_CVV).removeClass( 'has-error' );
        $(FORM_GROUP_CHECK).removeClass( 'has-error' );
    };

    var removeHidden = function(pSelector) {
        $(pSelector).removeClass( 'hidden' );
    };

    var showError = function (pErrorMSG, pSelErrorBox, pSelFormGroup)  {
        $(pSelErrorBox).html( pErrorMSG );

        removeHidden(pSelErrorBox);
        $(pSelFormGroup).addClass('has-error');
    };

    var validateForm = function() {
        cleanErrors();

        var isValid = true;

        var regExpText = /^[a-zA-Z ]{2,30}$/;
        var regExpEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var regExpZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        var regExpCreditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        var regExpCVV = /^[0-9]{3,4}$/;

        var firstNameVal = $(FIRST_NAME_INPUT).val();
        var lastNameVal = $(LAST_NAME_INPUT).val();
        var emailVal = $(EMAIL_INPUT).val();
        var zipVal = $(ZIP_INPUT).val();
        var creditCardVal = $(CREDIT_CARD_INPUT).val();
        var monthVal = $(MONTH_INPUT).val();
        var yearVal = $(YEAR_INPUT).val();
        var cvvVal = $(CVV_INPUT).val();
        
        if ((firstNameVal==='')||(!regExpText.test(firstNameVal))) {
            isValid = false;
            showError(ERROR_FIRST_NAME, SEL_ERROR_FN, FORM_GROUP_FN);
        }
        if ((lastNameVal==='')||(!regExpText.test(lastNameVal))) {
            isValid = false;
            showError(ERROR_LAST_NAME, SEL_ERROR_LN, FORM_GROUP_LN);
        }
        if ((emailVal==='')||(!regExpEmail.test(emailVal))) {
            isValid = false;
            showError(ERROR_EMAIL, SEL_ERROR_EMAIL, FORM_GROUP_EMAIL);
        }
        if ((zipVal==='')||(!regExpZip.test(zipVal))) {
            isValid = false;
            showError(ERROR_ZIP, SEL_ERROR_ZIP, FORM_GROUP_ZIP);
        }
        if ((creditCardVal==='')||(!regExpCreditCard.test(creditCardVal))) {
            isValid = false;
            showError(ERROR_CREDIT_CARD, SEL_ERROR_CC, FORM_GROUP_CC);
        }
        if ((monthVal==='')||(monthVal===INITIAL_EXP_MONTH)) {
            isValid = false;
            showError(ERROR_EXP_MONTH, SEL_ERROR_MON, FORM_GROUP_MON);
        }
        if ((yearVal==='')||(yearVal===INITIAL_EXP_YEAR)) {
            isValid = false;
            showError(ERROR_EXP_YEAR, SEL_ERROR_YEAR, FORM_GROUP_YEAR);
        }
        if ((cvvVal==='')||(!regExpCVV.test(cvvVal))) {
            isValid = false;
            showError(ERROR_CVV, SEL_ERROR_CVV, FORM_GROUP_CVV);
        }
        if (!$(FIRST_CHECK_INPUT).is(':checked')) {
            isValid = false;
            showError(ERROR_CHECK, SEL_ERROR_CHECK, FORM_GROUP_CHECK);
        }
        return isValid;
    };

    $(FIRST_NAME_INPUT).keyup(function(e){
        if ($(FIRST_NAME_INPUT).val()!=='') {
            $(FORM_GROUP_FN).removeClass( 'empty-field' );
        } else {
            $(FORM_GROUP_FN).addClass( 'empty-field' );
        }
    });

    $(LAST_NAME_INPUT).keyup(function(e){
        if ($(LAST_NAME_INPUT).val()!=='') {
            $(FORM_GROUP_LN).removeClass( 'empty-field' );
        } else {
            $(FORM_GROUP_LN).addClass( 'empty-field' );
        }
    });

    $(EMAIL_INPUT).keyup(function(e){
        if ($(EMAIL_INPUT).val()!=='') {
            $(FORM_GROUP_EMAIL).removeClass( 'empty-field' );
        } else {
            $(FORM_GROUP_EMAIL).addClass( 'empty-field' );
        }
    });

    $(ZIP_INPUT).keyup(function(e){
        if ($(ZIP_INPUT).val()!=='') {
            $(FORM_GROUP_ZIP).removeClass( 'empty-field' );
        } else {
            $(FORM_GROUP_ZIP).addClass( 'empty-field' );
        }
    });

    $(CREDIT_CARD_INPUT).keyup(function(e){
        if ($(CREDIT_CARD_INPUT).val()!=='') {
            $(FORM_GROUP_CC).removeClass( 'empty-field' );
        } else {
            $(FORM_GROUP_CC).addClass( 'empty-field' );
        }
    });

    $('#login-btn').click(function() {
        var url      = '/app/#/login';
        window.location = url;
    });

    $('#sign-up-btn').click(function() {
        var url = '/sign-up.html';
        window.location = url;
    });

    $('#submit').click(function() {
        signUp();
    });

    $(SEL_PACKAGE).click(function() {
        selectPackage(this);
    });

    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });
})();