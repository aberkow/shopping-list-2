var list = {};
var model;
var formView;
var listView;
var controller;

$(document).ready(function(){
  model = new list.Model();
  formView = new list.FormView('.main__form');
  listView = new list.ListView();
  controller = new list.Controller(model, formView, listView);
  debugger;
});


//handles the data for the list (e.g. itemName, shoppingListArr)
list.Model = function(){
  this.itemName = '';
  this.shoppingListArr = [];
  //this.storeListItem = null;
  console.log('model');
};

list.Model.prototype.storeListItem = function(value){
  this.itemName = value;
  if (value !== undefined){
    this.shoppingListArr.push(value);
  }
  console.log(this);
};

// list.Model.prototype.addToShoppingList = function(value){
//   if (value !== undefined){
//     this.shoppingListArr.push(value);
//   }
//   console.log(value);
// }

//the view just for the input form (input box and add button)
//elementID = the id of the form?
list.FormView = function(element, initialValue){
  this.element = $(element);//the selector for the form element
  this.element.submit(this.element, this._onSubmit.bind(this));//add an event listener to it
  this.addItemToList(initialValue || '');//an initialValue for the form
  //this.addItemToList = null;
  console.log('formView');
};

//when the form is submitted, get the value of the input box and send it to the model via the controller.
list.FormView.prototype._onSubmit = function(evt){
  //var value = evt.target.value();
  evt.preventDefault();
  var item = this.element.find('input').val();
  if (this.addItemToList){
    this.addItemToList(item);
  }
};

list.FormView.prototype.addItemToList = function(item){
  this.element.value = item;
};

//view just for the contents of the ul
list.ListView = function(element){
  this.listItem = '';
  this.element = $(element);
  //this.renderItem = null;
  console.log('listView');
};

list.ListView.prototype.renderItem = function(item){
  this.listItem = item;
  this.element.append("<li class='main__list-item'>" + item + "</li>");
};

//cross link the model and view together
list.Controller = function(model, formView, listView){
  formView.addItemToList = model.storeListItem.bind(model);
  model.storeListItem = listView.renderItem.bind(listView);
  console.log('controller');
};
