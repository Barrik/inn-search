console.log("script.js has run.");

var d = document;
var room = document.getElementsByClassName('room');
var buttons = document.getElementsByClassName('dropbtn');
var lists = document.getElementsByClassName('dropdown-content');
var occupantOptions = d.getElementsByClassName('occupantsOption');
var priceOptions = d.getElementById('priceContent').children;

// This is the user's search settings.  This will be changed clientside.  Below are the default values.
search = {
  occupants: 1,
  price: 319,
};

// ===List Room Name===
for (var i = 0; i < room.length; i++) {
  var roomNum = i + 1;
  d.querySelector('#roomname' + roomNum).innerHTML = roomValues[i].name;
}

// ===List Room Price===
for (var i = 0; i < room.length; i++) {
  var roomNum = i + 1;
  d.querySelector('#room' + roomNum + 'Price').innerHTML = roomValues[i].price;
}

// ===Toggle Dropdown Menus===
function toggleLists(num) {
  buttons[num].addEventListener('click', function() {
    lists[num].classList.toggle('show');
  });
}
for (var i = 0; i < buttons.length; i++) {
  toggleLists(i);
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

// ===Dropdown Meny for Occupants===
function doOccupantsOptions(arg) {
  var xx = arg + 1;
  occupantOptions[arg].addEventListener('click', function() {
    search.occupants = xx;
    occupantsCount.innerHTML = xx;
  });
}
for (var i = 0; i < occupantOptions.length; i++) {
  doOccupantsOptions(i);
}

// ===Automatically Fill Price List===
var roomPrices = [];
for (var i = 0; i < roomValues.length; i++) {
  if (roomPrices.indexOf(roomValues[i].price) == -1) {
    roomPrices.push(roomValues[i].price);
  }
}
roomPrices.sort();

for (var i = 0; i < roomPrices.length; i++) {
  var newPriceItem = document.createElement('p');
  var newPriceValue = document.createTextNode(roomPrices[i]);
  newPriceItem.appendChild(newPriceValue);
  var PriceElement = document.getElementById("priceContent");
  PriceElement.appendChild(newPriceItem);
}

console.log(priceOptions);

// ===Dropdown Meny for Price===
function doPriceOptions(arg) {
  priceOptions[arg].addEventListener('click', function() {
    search.price = roomPrices[arg];
    priceCount.innerHTML = roomPrices[arg];
  });
}
for (var i = 0; i < priceOptions.length; i++) {
  doPriceOptions(i);
}


// ==========SEARCH==========
function show(x) {
  d.querySelector('#room' + x).classList.add('show');
  d.querySelector('#room' + x).classList.remove('hide');
}
function hide(x) {
  d.querySelector('#room' + x).classList.add('hide');
  d.querySelector('#room' + x).classList.remove('show');
}

function doSearch(room) {
  if (search.occupants <= roomValues[room].occupants && search.price >= roomValues[room].price) {
    show(roomValues[room].number);
  } else {
    hide(roomValues[room].number);
  }
}

d.querySelector('#searchButton').addEventListener('click', function() {
  for (var i = 0; i < roomValues.length; i++) {
    doSearch(i);
  }
});

// ===Dev: Show Current Search Options in Console===
d.querySelector('#testButton').addEventListener('click', function() {
  console.log(search);
});
