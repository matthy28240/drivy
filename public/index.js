'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);

//Convert String to Date
//@param [string]
//@return [Date]
function convertDate(str){
  var re=/[0-9]+/g;
  var result=re[Symbol.match](str);
  var dateLoc=new Date(result[0],result[1],result[2]);
  return dateLoc;
}

//          Exercice 1
//Search the car's price per day and km using its id
//@param [string]
//@return [double,double]
function searchPrices(str){
  for (var i=0; i<cars.length;i++){
    if (cars[i].id==str)
      return [cars[i].pricePerDay, cars[i].pricePerKm];
  }
}

function Exo1(){
  for (var i=0; i<rentals.length;i++){
    var prices=searchPrices(rentals[i].carId)
    var numberOfDays=Math.ceil(Math.abs(convertDate(rentals[i].returnDate).getTime()-convertDate(rentals[i].pickupDate).getTime())/(1000*3600*24));
    rentals[i].price=numberOfDays*prices[0]+rentals[i].distance*prices[1];
    }
  //console.log(rentals);
}

//          Exercice 2
function Exo2(){
  for (var i=0; i<rentals.length;i++){
    var prices=searchPrices(rentals[i].carId)
    var numberOfDays=Math.ceil(Math.abs(convertDate(rentals[i].returnDate).getTime()-convertDate(rentals[i].pickupDate).getTime())/(1000*3600*24));
    if (numberOfDays>=1 && numberOfDays<4)
      prices[0]=prices[0]*0.9;
    else if (numberOfDays>=4 && numberOfDays<10)
      prices[0]=prices[0]*0.7;
    else if (numberOfDays>=10)
      prices[0]=prices[0]*0.5;
    rentals[i].price=numberOfDays*prices[0]+rentals[i].distance*prices[1];
  }
  //console.log(rentals);
}

//          Exercice 3
function Exo3(){
  Exo2();
  for (var i=0; i<rentals.length;i++){
    var comm=rentals[i].price*0.3;
    var numberOfDays=Math.ceil(Math.abs(convertDate(rentals[i].returnDate).getTime()-convertDate(rentals[i].pickupDate).getTime())/(1000*3600*24));
    rentals[i].commission.insurance = comm/2;
    rentals[i].commission.assistance = numberOfDays;
    rentals[i].commission.drivy = comm/2 - numberOfDays ;
  }
  //console.log(rentals);
}

//          Exercice 4
function Exo4(){
  Exo3();
  for (var i=0; i<rentals.length;i++){
    if (rentals[i].options.deductibleReduction){
      var numberOfDays=Math.ceil(Math.abs(convertDate(rentals[i].returnDate).getTime()-convertDate(rentals[i].pickupDate).getTime())/(1000*3600*24));
      rentals[i].price += 4*numberOfDays;
      rentals[i].commission.drivy += 4*numberOfDays;
    }
  }
  //console.log(rentals);
}

//          Exercice 5
//Search the actors associated with a specific rentalId
//@param [string]
//@return [int]
function searchActor(str){
  for (var i=0; i<actors.length;i++){
    if (actors[i].rentalId==str)
      return i;
  }
}

function Exo5(){
  Exo4();
  for (var i=0; i<rentals.length;i++){
    actors[searchActor(rentals[i].id)].payment[0].amount=rentals[i].price;
    actors[searchActor(rentals[i].id)].payment[1].amount=rentals[i].price-rentals[i].commission.insurance*2;
    actors[searchActor(rentals[i].id)].payment[2].amount=rentals[i].commission.insurance;
    actors[searchActor(rentals[i].id)].payment[3].amount=rentals[i].commission.assistance;
    actors[searchActor(rentals[i].id)].payment[4].amount=rentals[i].commission.drivy;
  }
  //console.log(actors);
}


//            Exercice 6
//Search a rental in rentals using its id
//@param [string]
//@return [int]
function searchRental(str){
  for (var i=0; i<rentals.length;i++){
    if (rentals[i].id==str)
      return i;
  }
}
//Using a "hard" method : we update rentals and do everything all over again
function Exo6(){
  for (var i=0; i<rentalModifications.length;i++){
    if (rentalModifications[i].pickupDate) rentals[searchRental(rentalModifications[i].rentalId)].pickupDate=rentalModifications[i].pickupDate;
    if (rentalModifications[i].distance) rentals[searchRental(rentalModifications[i].rentalId)].distance=rentalModifications[i].distance;
    if (rentalModifications[i].returnDate) rentals[searchRental(rentalModifications[i].rentalId)].returnDate=rentalModifications[i].returnDate;
  }
  Exo5();
  console.log(actors)
}
