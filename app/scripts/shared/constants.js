'use strict';

angular.module('petStoreApp')
	.constant("PET_STATUS", {
        "list" : [
            {
                "name" : "Available",
                "value" : "available"
            },
            {
                "name" : "Pending",
                "value" : "pending"
            },
            {
                "name" : "Sold",
                "value" : "sold"
            }
        ]
	})
    .constant("MSG", {
        NOT_FOUND_MSG : "Opps....We can not find this pet in our system.",
        SERVER_DOWN_MSG : "Opps...Server is not available. Please try later.",
        SUCCESS_DELETE_MSG : "Successfully delete Pet. It will auto navigate to All Pets page.",
        DELETE_COMFIRMATION_MSG : "Do you want to delete this pet ?",
        SUCCESS_ADD_MSG : "Successfully add a pet. It will auto navigate to All Pets page."
    });