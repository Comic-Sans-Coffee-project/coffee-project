"use strict";
function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>' + coffee.roast + '</p>';
    html += '<p id="concentration">' + coffee.caffeine + '</p>'
    html += '<button>Select</button>'
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i <= coffees.length-1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    var selectedCoffee = coffeeSelection.value;
    if (selectedRoast === "all") {
        return section.innerHTML = renderCoffees(coffees);
    }
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast && selectedCoffee === "") {
            filteredCoffees.push(coffee);
        }
        if (coffee.name.toUpperCase() === selectedCoffee.toUpperCase()) {
            filteredCoffees = []
            filteredCoffees.push(coffee);
        }
    });
    section.innerHTML = renderCoffees(filteredCoffees);
}

function activeSearch (e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var filteredCoffees = [];
    var selectedCoffee = coffeeSelection.value;
    coffees.forEach(function(coffee) {
        if (coffee.name.toUpperCase().includes(selectedCoffee.toUpperCase())) {
            filteredCoffees.push(coffee);
        }
        section.innerHTML = renderCoffees(filteredCoffees);
    });
}
function activeSelect (e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    var selectedCoffee = coffeeSelection.value;
    coffees.forEach(function(coffee) {
        if (selectedRoast === "all") {
            return section.innerHTML = renderCoffees(coffees);
        }
        if (coffee.roast === selectedRoast && selectedCoffee !== coffee.name) {
            filteredCoffees.push(coffee);
        }
        section.innerHTML = renderCoffees(filteredCoffees);
    });
}

function addCoffee (e) {
    e.preventDefault();
    let newName = addedCoffee.value;
    let newRoast = addedRoast.value;
    let newCaffeine = addedCaffeine.value
    if (newCaffeine === "Weak Sauce"){
        newCaffeine = "100mg"
    }
    else if (newCaffeine === "Just Enough"){
        newCaffeine = "200mg"
    }
    else if (newCaffeine === "Leonidas"){
        newCaffeine = "300mg"
    }
    else if (newCaffeine === "OP!!!"){
        newCaffeine = "500mg"
    }
    coffees.push({id: coffees.length, name: newName, roast: newRoast, caffeine: newCaffeine},);

    section.innerHTML = renderCoffees(coffees);
    localStorage.setItem("coffeeList", JSON.stringify(coffees))
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light', caffeine: '300mg'},
    {id: 2, name: 'Half City', roast: 'light', caffeine: '300mg'},
    {id: 3, name: 'Cinnamon', roast: 'light', caffeine: '300mg'},
    {id: 4, name: 'City', roast: 'medium', caffeine: '200mg'},
    {id: 5, name: 'American', roast: 'medium', caffeine: '200mg'},
    {id: 6, name: 'Breakfast', roast: 'medium', caffeine: '200mg'},
    {id: 7, name: 'High', roast: 'dark', caffeine: '100mg'},
    {id: 8, name: 'Continental', roast: 'dark', caffeine: '100mg'},
    {id: 9, name: 'New Orleans', roast: 'dark', caffeine: '100mg'},
    {id: 10, name: 'European', roast: 'dark', caffeine: '100mg'},
    {id: 11, name: 'Espresso', roast: 'dark', caffeine: '100mg'},
    {id: 12, name: 'Viennese', roast: 'dark', caffeine: '100mg'},
    {id: 13, name: 'Italian', roast: 'dark', caffeine: '100mg'},
    {id: 14, name: 'French', roast: 'dark', caffeine: '100mg'},
];

var section = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSelection = document.querySelector('#coffee-selection');
var addedCoffee = document.querySelector("#add-coffee");
var addedRoast = document.querySelector("#add-roast");
var addCoffeeButton = document.querySelector("#beans")
var addedCaffeine = document.querySelector("#add-caffeine")

section.innerHTML = renderCoffees(coffees);
submitButton.addEventListener('click', updateCoffees);
coffeeSelection.addEventListener('keyup', activeSearch);
roastSelection.addEventListener('change', activeSelect);
addCoffeeButton.addEventListener("click", addCoffee);
