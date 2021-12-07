
var myFridge = [];

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
    var modal = get('modal-dialog');
    var backdrop = get('modal-backdrop');

    clearModal();

    //Hide modal and backdrop
    modal.classList.remove('visible');
    backdrop.classList.remove('visible');
}

//Resets input values in modal
function clearModal(){
    var item = get('edit-item-text');
    var amount = get('edit-amount-text');
    var unit = get('edit-unit-text');
    var date = get('edit-exp-date-text');

    //Clear text
    item.value = '';
    amount.value = '';
    unit.value = 'oz';
    date.value = null;
}

//Checks to see if item date is within 7 days of expiration; highlights conditionally
function dateDue() {
    var msPerDay = 24 * 60 * 60 * 1000;

  for (var i = 0; i < myFridge.length; i++) {
         var itemDate = new Date(myFridge[i].date);
         var todayDate = new Date();
         var iPvalue = itemDate.valueOf();
         var tPvalue = todayDate.valueOf();
         

         console.log((iPvalue-tPvalue)/msPerDay);
         console.log("iPv: "+iPvalue+"\ttpV: "+tPvalue);

    if (((iPvalue - tPvalue)/msPerDay) <= 7) {
       
      document.getElementById("fridgeItem-"+i).style.backgroundColor = "cyan";
    }
  }
}

//Create new FridgeItem element and adds it to the DOM
function addFridgeElement(newFridgeItem){
  var containerEl = get('display-content');
  var itemEl = document.createElement('span');
  var amountEl = document.createElement('span');
  var unitEl = document.createElement('span');
  var dateEl = document.createElement('span');
//   var editBtn = document.createElement('button');
//   var deleteBtn = document.createElement('button');
  var pEl = document.createElement('p');

  itemEl.setAttribute("class", "item");
  amountEl.setAttribute("class", "amount");
  unitEl.setAttribute("class", "unit");
  dateEl.setAttribute("class", "date");
//   editBtn.setAttribute("class", newFridgeItem.id);
//   editBtn.setAttribute("id", "edit-"+myFridge.length);
//   deleteBtn.setAttribute("class", newFridgeItem.id);
//   deleteBtn.setAttribute("id", "delete");
  pEl.setAttribute("id", newFridgeItem.id);
  pEl.setAttribute("title", "Click to Delete Item");

//   editBtn.innerHTML = "edit";
//   deleteBtn.innerHTML= "delete";


  var itemText = document.createTextNode(newFridgeItem.item);
  var amountText = document.createTextNode(newFridgeItem.amount);
  var unitText = document.createTextNode(newFridgeItem.unit);
  var dateText = document.createTextNode(newFridgeItem.date);
  
  //Add text to FridgeItem element
  itemEl.appendChild(itemText);
  amountEl.appendChild(amountText);
  unitEl.appendChild(unitText);
  dateEl.appendChild(dateText);
  pEl.appendChild(itemEl);
  pEl.appendChild(amountEl);
  pEl.appendChild(unitEl);
  pEl.appendChild(dateEl);
//   pEl.appendChild(editBtn);
//   pEl.appendChild(deleteBtn);

  //Add fridgeItem paragraph element to list
  containerEl.appendChild(pEl);

  dateDue();
}

//Click handler to add new fridgeItem
function addFridgeItem(event){
    var inputItem = document.getElementById("edit-item-text").value;
    var inputAmount = document.getElementById("edit-amount-text").value;
    var inputUnit = document.getElementById("edit-unit-text").value;
    var inputDate = document.getElementById("edit-exp-date-text").value;

    var id = "fridgeItem-" + myFridge.length;
    id = id.toString();

    var newFridgeItem = new FridgeItem(
      id,
      inputItem,
      inputAmount,
      inputUnit,
      inputDate
    );

    myFridge.push(newFridgeItem);
    addFridgeElement(newFridgeItem);
    
    console.log("New Array: ");
    for (i = 0; i < myFridge.length; i++){
       console.log(myFridge[i]);
    }
    

    closeModal();
}

function deleteItem(event){
    var itemElement = event.target;
    var iEid = itemElement.id;
       for (var i = 0; i < myFridge.length; i++) {
         if (myFridge[i].id === iEid) {
           itemElement.remove();
           myFridge.splice(i, 1);
         }
       }
}

//Initialize app
function init () {
    get('add-button').onclick = openModal;
    get('clear-button').onclick = clearModal;
    get('save-button').onclick = addFridgeItem;
    get('cancel-button').onclick = closeModal;
    get('display-content').onclick = deleteItem;

}

init();