(function () {

	/**
     * CONSTANTS
     */
    var FIRST_NAME_INPUT = '#first-name';
    var LAST_NAME_INPUT = '#last-name';
    var SELECT_STATE_INPUT = '#select-state';
    var SELECT_STATE_TEXT = 'Select State';
    var REGULAR_EXP_TEXT = /^[a-zA-Z\u00C0-\u017F'-]+$/;
    var MIN_LETTERS = 1;

    var FIRST_NAME_REQUIRED = 'First name is required';
    var LAST_NAME_REQUIRED = 'Last name is required';
    var FIRST_NAME_ONLY_LETTERS = 'First name must contain only letters';
    var LAST_NAME_ONLY_LETTERS = 'Last name must contain only letters';
    var STATE_INVALID = 'Select one state';

    var ENTER_FIRST_NAME = 'Enter a First Name to begin';
    var MIN_LETTERS_INVALID = 'The field must contain more than one letter';


    var SEL_ERROR_FN = '.error.firstname';
    var SEL_ARROW_FN = '.arrow-up.firstname';

    var SEL_ERROR_LN = '.error.lastname';
    var SEL_ARROW_LN = '.arrow-up.lastname';

    var SEL_ERROR_STATE = '.error.state';
    var SEL_ARROW_STATE = '.arrow-up.state';

    var FORM_GROUP_FN = '.form-group.firstname';
    var FORM_GROUP_LN = '.form-group.lastname';
    var FORM_GROUP_STATE = '.form-group.state';

    /**
     * Private functions
     */
    var showError = function (pErrorMSG, pSelArrow, pSelErrorBox, pSelFormGroup)  {
        $(pSelErrorBox).html( pErrorMSG );

        removeHidden(pSelArrow);
        removeHidden(pSelErrorBox);
        $(pSelFormGroup).addClass('has-error');
    };

    var isEmptyFN = function () {
        var firstNameVal = $(FIRST_NAME_INPUT).val();

        if (firstNameVal==='') {
            showError(ENTER_FIRST_NAME, SEL_ARROW_FN, SEL_ERROR_FN, FORM_GROUP_FN);
        } else {
            cleanErrors();
        }
    };

    var validateLN = function () {
        var lastNameVal = $(LAST_NAME_INPUT).val();

        if(lastNameVal!=='') {
            checkMinLetters(lastNameVal,SEL_ERROR_LN, SEL_ARROW_LN, FORM_GROUP_LN);
        }
    };

    var getUrlParameter = function (sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    var search = function () {
        cleanErrors();
    	if (validateFields()) {
            var trackId = getUrlParameter('s');
            var trackIdParam = trackId ? '&s='+trackId : '';

            var url      = '/app/#/search?firstname='+$(FIRST_NAME_INPUT).val()+
                            '&lastname='+$(LAST_NAME_INPUT).val()+
                            '&state='+$(SELECT_STATE_INPUT).val()+trackIdParam;
            window.location = url;
        }
    };

    var removeHidden = function(pSelector) {
        $(pSelector).removeClass( 'hidden' );
    };

    var cleanErrors = function () {
        $(SEL_ARROW_FN).addClass( 'hidden' );
        $(SEL_ERROR_FN).addClass( 'hidden' );

        $(SEL_ARROW_LN).addClass( 'hidden' );
        $(SEL_ERROR_LN).addClass( 'hidden' );

        $(SEL_ARROW_STATE).addClass( 'hidden' );
        $(SEL_ERROR_STATE).addClass( 'hidden' );

        $(FORM_GROUP_FN).removeClass( 'has-error' );
        $(FORM_GROUP_LN).removeClass( 'has-error' );
        $(FORM_GROUP_STATE).removeClass( 'has-error' );
    };

    var checkMinLetters = function (pField, pSelectorError, pSelectorArrow, pSelectorFormGroup) {
        if (pField.length <= 1) {
            showError(MIN_LETTERS_INVALID, pSelectorArrow, pSelectorError, pSelectorFormGroup);

            return false;
        }
        return true;
    };

    var upperCaseFirstLetter = function (pThis, pEvent) {
        if (pEvent.keyCode >= 65 && pEvent.keyCode <= 90 && !(pEvent.shiftKey) && !(pEvent.ctrlKey) && !(pEvent.metaKey) && !(pEvent.altKey)) {
           var $t = $(pThis);
           pEvent.preventDefault();
           $t.val($t.val().charAt(0).toUpperCase() + $t.val().slice(1));
        }
    };

    var validateFields = function () {
        var isValid = true;
        var firstNameVal = $(FIRST_NAME_INPUT).val();
        var lastNameVal = $(LAST_NAME_INPUT).val();
        var stateVal = $(SELECT_STATE_INPUT).val();

        if (firstNameVal==='') {
            isValid = false;
            showError(FIRST_NAME_REQUIRED, SEL_ARROW_FN, SEL_ERROR_FN, FORM_GROUP_FN);
        } else {
            if (checkMinLetters(firstNameVal,SEL_ERROR_FN, SEL_ARROW_FN, FORM_GROUP_FN)) {
                if (!REGULAR_EXP_TEXT.test(firstNameVal)) {
                    isValid = false;
                    showError(FIRST_NAME_ONLY_LETTERS, SEL_ARROW_FN, SEL_ERROR_FN, FORM_GROUP_FN);
                }
            } else {
                isValid = false;
            }
        }
        if(lastNameVal==='') {
            isValid = false;
            showError(LAST_NAME_REQUIRED, SEL_ARROW_LN, SEL_ERROR_LN, FORM_GROUP_LN);
        } else {
            if (checkMinLetters(lastNameVal,SEL_ERROR_LN, SEL_ARROW_LN, FORM_GROUP_LN)) {
                if(!REGULAR_EXP_TEXT.test(lastNameVal)) {
                    isValid = false;
                    showError(LAST_NAME_ONLY_LETTERS, SEL_ARROW_LN, SEL_ERROR_LN, FORM_GROUP_LN);
                }
            } else {
                isValid = false;
            }
        }
        if(stateVal===SELECT_STATE_TEXT) {
            isValid = false;
            showError(STATE_INVALID, SEL_ARROW_STATE, SEL_ERROR_STATE, FORM_GROUP_STATE);
        }
        return isValid;
    };

    $(FIRST_NAME_INPUT).keyup(function(e){
        upperCaseFirstLetter(this, e);
        if (e.keyCode == 13) {
            search();
        }
    });

    $(LAST_NAME_INPUT).keyup(function(e){
        upperCaseFirstLetter(this, e);
        if (e.keyCode == 13) {
            search();
        }
    });

    $(SELECT_STATE_INPUT).keyup(function(e){
        if(e.keyCode == 13) {
            search();
        }
    });

    $(FIRST_NAME_INPUT).blur(function(){
	    isEmptyFN();
	});

    $(LAST_NAME_INPUT).blur(function(){
        validateLN();
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

	$('.carousel').carousel({
		interval: 5000
	});
})();