// Assign the data from `data.js` to a descriptive variable
var ufo_sights = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

//Populate the table
ufo_sights.forEach(function(ufo_s) {
    var row = tbody.append("tr");
 
    Object.entries(ufo_s).forEach(function([key, value]) {
      // Append a cell to the row for each value
      var cell = tbody.append("td");
      cell.text(value);
    });
  });


//Search through the table---------------------------------------------------------------------------------------------------------
// Getting a reference to the button on the page with the id property set to `click-me`
var button = d3.select("#filter-btn");

// Getting a reference to the input element on the page with the id property set to 'input-field'
var inputField = d3.select("#datetime");

button.on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  //console.log(inputValue);
 
  //Filtering the data
  var filteredData = ufo_sights.filter(ufo => ufo.datetime === inputValue);

  //Clean the table  
  var clean = document.getElementById('ufo-table');
    while (clean.firstChild) {
        clean.removeChild(clean.firstChild);
    }

  //Re-create the table with the results
  var table_new = document.querySelector("table");
  var data_head = Object.keys(filteredData[0]);

  function table_head(table, data) {
      var thead = table.createTHead();
      var row = thead.insertRow();

      for (var key of data) {
          var th = document.createElement("th");
          var text = document.createTextNode(key);
          th.appendChild(text);
          row.appendChild(th);
      }
  }

  function table_body(table, data) {
      for (var val of data) {
          var row = table.insertRow();
          
          for (key in val) {
              var cell = row.insertCell();
              var text = document.createTextNode(val[key]);
              cell.appendChild(text);
          }
      }
  }

  //Create table body with filtered data
  table_body(table_new, filteredData); 

  //Create head table with keys from data
  table_head(table_new, data_head); 

});














