var list = {};
var model;
var inputView;
var listView;
var controller;

//handles the data for the list (e.g. itemName, shoppingListArr)
list.Model = function(){
  this.itemName = '';
  this.shoppingListArr = [];
};

list.Model.prototype.storeListItem = function(value){
  this.itemName = value;
};

//the view just for the input form (input box and add button)
//elementID = the id of the form?
list.InputView = function(element, initialValue){
  this.element = $(element);//the selector for the form element
  this.element.addEventListener('main__form', this._onSubmit.bind(this));//add an event listener to it
  this.setValue(initialValue || '');//an initialValue for the form
  this.addItemToList = null;
};

//when the form is submitted, get the value of the input box and send it to the model via the controller.
list.InputView.prototype._onSubmit = function(evt){
  var value = evt.target.value();
  if (this.addItemToList){
    this.addItemToList(value);
  }
};

//view just for the contents of the ul
list.ListView = function(){

};

//cross link the model and view together
list.Controller = function(){
  inputView.addItemToList = model.
};
