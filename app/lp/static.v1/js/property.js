function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('address')),
        {types: ['address']}
    );

    // When the user selects an address from the dropdown, populate the address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
};

var fillInAddress = function() {
    componentForm = {};
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    // Get each component of the address from the place details and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        var val = place.address_components[i].short_name;
        componentForm[addressType] = val;
    }
};

(function () {

	/**
     * CONSTANTS
     */
    var ADDRESS_INPUT = '#address';
    
    var REGULAR_EXP_TEXT = /^[a-zA-Z\u00C0-\u017F'-]+$/;
    var MIN_LETTERS = 1;

    var ADDRESS_REQUIRED = 'Address is required';
    var INVALID_ADDRESS = 'The address is invalid, please change it';
    var INVALID_COUNTRY = 'We only accept addresses from United States';
    
    var SEL_ERROR_ADDRESS = '.error.address';
    var SEL_ARROW_ADDRESS = '.arrow-up.address';

    var FORM_GROUP_ADDRESS = '.form-group.address';

    var US_CODE = 'US';

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
            var url      = '/app/#/search-property?description='+$(ADDRESS_INPUT).val()+'&'+jQuery.param(componentForm);
            window.location = url;
        }
    };

    var removeHidden = function(pSelector) {
        $(pSelector).removeClass( 'hidden' );
    };

    var cleanErrors = function () {
        $(SEL_ARROW_ADDRESS).addClass( 'hidden' );
        $(SEL_ERROR_ADDRESS).addClass( 'hidden' );

        $(FORM_GROUP_ADDRESS).removeClass( 'has-error' );
    };

    var validateFields = function () {
        var isValid = true;
        var addressVal = $(ADDRESS_INPUT).val();
        
        if (typeof componentForm==='undefined') {
            isValid = false;
            showError(ADDRESS_REQUIRED, SEL_ARROW_ADDRESS, SEL_ERROR_ADDRESS, FORM_GROUP_ADDRESS);
        } else {
            if (componentForm.country!==US_CODE) {
                isValid = false;
                showError(INVALID_COUNTRY, SEL_ARROW_ADDRESS, SEL_ERROR_ADDRESS, FORM_GROUP_ADDRESS);
            }
        }
        return isValid;
    };

    $(ADDRESS_INPUT).keyup(function(e){
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
})();