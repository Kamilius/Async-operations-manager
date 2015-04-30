//Mock for AJAX call, which executes
//callback after random amount of time
function apiLibraryExecute(command, callback) {
  window.setTimeout(callback, Math.round(1000 * Math.random()));
}

//Generate array of even or odd numbers with custom
//amount of numbers
function generateEvenOrOddNumbers(isEven, numAmount) {
  var list = [],
      //starging num set to 1 or 2 depending on
      //odd or even numbers should be returned
      number = isEven? 2 : 1;

  for(var i = 0; i < numAmount; i++) {
    list.push(number);
    number += 2;
  }

  return list;
}

//Set of operations to be executed by
//asyncOperationsManager
var operations = [{
    "command": "odd",
    //return array with "odd" numbers from range 1-10
    "callback": function() {
      return generateEvenOrOddNumbers(false, 10);
    }
  }, {
    "command": "even",
    //return array with "even" numbers from range 1-10
    "callback": function() {
      return generateEvenOrOddNumbers(true, 10);
    }
  }
];

//Create list item elements for each outputArray value
//then append them to '.output' unordered list element on page
function print(outputArray) {
  //DocumentFragment created to render resulting elements
  //all at once, instead of rendering each of them separately.
  var outputFragment = document.createDocumentFragment(),
      listItemElement;

  outputArray.forEach(function(item) {
    listItemElement = document.createElement('li');
    listItemElement.textContent = item;

    outputFragment.appendChild(listItemElement);
  });

  //append resulting list items into '#output' unordered list.
  //getElementById method chosen because of it's fast performance
  document.getElementById('output').appendChild(outputFragment);
}

//Join two of result arrays into one, sort this array
//in ascending order and then square each array element's value
function joinSortSquareAndPrint(resultsList) {
  print(resultsList[0].concat(resultsList[1])
                      .sort(function(a, b) { return a - b; })
                      .map(function(item) { return item * item; })
  );
}

//Call each operation of "operations" array asynchronously, and
//execute "callback" function with array of operations results as argument, after
//all operations were executed
function asyncOperationsManager(operations, callback) {
  var totalOperations = operations.length,
      operationsResults = [];

  operations.forEach(function(op) {
    //make asynchronous call for each operation
    apiLibraryExecute(op.command, function() {
      //push operation's callback result into
      //results array
      operationsResults.push(op.callback());

      //if all operations were executed - call "callback" function
      //and pass operationsResults as argument
      if(callback && operationsResults.length === totalOperations) {
        callback(operationsResults);
      }
    })
  });
}

asyncOperationsManager(operations, joinSortSquareAndPrint);
