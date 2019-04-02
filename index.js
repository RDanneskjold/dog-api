'use strict';

function getDogImage(number = 3) {
    fetch(`https://dog.ceo/api/breeds/image/random/${number}`)
        .then(response => response.json())
        .then(responseJson =>
            displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    
    let pictureArray = responseJson.message;

    const resultsString = generateResultsString(pictureArray);

    if(pictureArray.length > 1) {
        $('.results-header').html('Look at these dogs!');
    } else {
        $('.results-header').html('Look at this dog!');
    };
    
    $('.results-list').html(resultsString);
    //display the results section
    $('.results').removeClass('hidden');
}

function generateResultsString(pictureArray) {
    const items = pictureArray.map(picURL => generateResultElement(picURL));
    return items.join('');
}

function generateResultElement(picURL) {
    return `
        <li class="js-dog-element">    
            <img src="${picURL}" class="results-img">
        </li>`;
}

function watchForm() {
    $('#js-dogs-form').on('submit', event => {
        event.preventDefault();
       
        let number = $('#number').val();
        if (!number) {number = 3};

        if (number < 0 && number > 50) {
            alert('Please enter a number between 0 and 50');
        }
        getDogImage(number);

        $('#number').val('');
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});
