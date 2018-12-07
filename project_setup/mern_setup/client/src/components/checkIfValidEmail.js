import React from 'react';

function checkIfValidEmail(email, error){
    const regex = /^(\w)*[@]{1}(\w)+[.]{1}(\w)+$/g;
    const testEmail = regex.test(email);

    if(testEmail === true){
        console.log("valid email satisfied");
    }
    else {
        error.email = "Please input an email that ends with @[your-email-provider]";
    }
}