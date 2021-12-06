
var myFridge = [];
 var today = new Date();

//Item constructor function
function FridgeItem (id, item, amount, unit, date){
    this.id = id;
    this.item = item;
    this.amount = amount;
    this.unit = unit;
    this.date = date;
}

function get(element){
    return document.getElementById(element);
}



//Application functions
function openModal(){
    var modal = get('modal-dialog');
    var backdrop = get('modal-backdrop');

    modal.classList.add('visible');
    backdrop.classList.add('visible');
}

function closeModal(){
    var item = get('edit-item-text');
    var amount = get('edit-amount-text');
    var unit = get('units');
    var date = get('edit-exp-date');
    var modal = get('modal-dialog');
    var backdrop = get('modal-backdrop');

    //Clear text
    item.value = '';
    amount.value = '';

    //Hide modal and backdrop
    modal.classList.remove('visible');
    backdrop.classList.remove('visible');
}

function clearModal(){
        var item = get('edit-item-text');
    var amount = get('edit-amount-text');
    var unit = get('units');
    var date = get('edit-exp-date-text');

    //Clear text
    item.value = '';
    amount.value = '';
    unit.value = '';
    date.value = '';
}

function dateDue(){
   
    for(var i = 0; i < myFridge.length; i++){
        if(myFridge[i].date <= today.getDate()+7){
            myFridge[i].style.backgroundColor = "red";
        }
    }
}

function createFridgeItemElement(newItem){
    var FridgeItemText = document.createTextNode(
        newItem.item + '\t' + newItem.amount + ' ' + newItem.unit + '\t' + newItem.date 
    );
    return FridgeItemText;
}

//Create new fridgeItem element and adds it to the DOM
function addFridgeElement(newFridgeItem){
  var containerEl = document.getElementById('display-content');
  var itemEl = document.createElement('p');
  var textEl = document.createTextNode(newFridgeItem.name);

  //Set attributes for FridgeItem
  itemEl.setAttribute(id, newFridgeItem.id);
  itemEl.setAttribute(item, newFridgeItem.item);
  itemEl.setAttribute(amount, newFridgeItem.amount);
  itemEl.setAttribute(unit, newFridgeItem.unit);
  itemEl.setAttribute(date, newFridgeItem.date);

  //Add text to FridgeItem element
  itemEl.appendChild(textEl);
  //Add fridgeItem element to list
  containerEl.appendChild(itemEl);
}

//Click handler to add new fridgeItem
function addFridgeItem(event){
    var inputItem = document.getElementById("edit-item-text");
    var inputAmount = document.getElementById("edit-amount-text");
    var inputUnit = document.getElementById("edit-unit-text");
    var inputDate = document.getElementById("edit-exp-date-text");

    var id = "fridgeItem-" + myFridge.length;

    var newFridgeItem = new FridgeItem(
      id,
      inputItem,
      inputAmount,
      inputUnit,
      inputDate
    );

    myFridge.push(newFridgeItem);

    addFridgeElement(newFridgeItem);

    dateDue();
    
    closeModal();
}

function displayFridgeContents(){
    for (var i = 0; i < myFridge.length; i++){
        var items = new FridgeItem(myFridge[i].item, myFridge[i].amount, myFridge[i].unit, myFridge[i].date);
        myFridge.push(items);
    }
    dateDue();
}

//Initialize app
function init () {
    document.getElementById('add-button').onclick = openModal;
    document.getElementById('clear-button').onclick = clearModal;
    document.getElementById('save-button').onclick = addFridgeItem;
    document.getElementById('cancel-button').onclick = closeModal;

    displayFridgeContents();
}

init();