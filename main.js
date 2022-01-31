"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<h1>' + coffee.name + '</h1>';
    html += '<p>' + coffee.roast + '</p>';
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
    var selectedRoast = roastSelection.value;
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
    var newCoffee = addedCoffee.value;
    var newRoast = addedRoast.value;
    var awesome = coffees.push({id: coffees.length, name: "knock you out of your", roast: "socks"});


    section.innerHTML = renderCoffees(awesome);
}


// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var section = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSelection = document.querySelector('#coffee-selection');
var addedCoffee = document.querySelector("#add-coffee");
var addedRoast = document.querySelector("#add-roast");
var addCoffeeButton = document.querySelector("#beans")

section.innerHTML = renderCoffees(coffees);
submitButton.addEventListener('click', updateCoffees);
coffeeSelection.addEventListener('keyup', activeSearch);
roastSelection.addEventListener('change', activeSelect);
addCoffeeButton.addEventListener("click", addCoffee);
