'use strict';

function getDogImage(number = 3) {
    fetch(`https://dog.ceo/api/breeds/image/random/${number}`)
        .then(response => response.json())
        .then(responseJson =>
            displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function getBreedImage(breed) {
    console.log(`fetching a pic of a ${breed}`);
    
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(responseJson =>
            displayResults(responseJson, breed))
        .catch(error => alert("I'm sorry, we don't have any images of that breed. Please try another entry."));
        
}

function displayResults(responseJson, breed) {
 
    let pictureArray = responseJson.message;
   
    if (breed) {
        $('.results-header').html(`Look at this ${breed}!`);

        $('.results').removeClass('hidden');

        return breedResults(pictureArray);
    } else if (pictureArray.length > 1) {
        $('.results-header').html('Look at these dogs!');
    } else {
        $('.results-header').html('Look at this dog!');
    };

    const resultsString = generateResultsString(pictureArray);

    $('.results-list').html(resultsString);
    //display the results section
    $('.results').removeClass('hidden');
}

function breedResults(pic) {
    
    const breedPic = generateResultElement(pic);
    $('.results-list').html(breedPic);
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

function watchNumberForm() {
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

function watchBreedForm() {
    $('#js-breed-form').submit(event => {
        event.preventDefault();

        const breed = $('#breed').val();
        
        getBreedImage(breed);

        $('#breed').val('');
    });
}


$(function () {
    console.log('App loaded! Waiting for submit!');
    watchNumberForm();
    watchBreedForm();
});
