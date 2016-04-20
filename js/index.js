var list = {};
var model;
var formView;
var listView;
var controller;

$(document).ready(function(){
  model = new list.Model();
  formView = new list.FormView('.main__form');
  listView = new list.ListView('.main__list');
  controller = new list.Controller(model, formView, listView);
});


//handles the data for the list (e.g. itemName, shoppingListArr)
list.Model = function(){
  this.itemName = '';
  this.shoppingListArr = [];
  //this.storeListItem = null;
  console.log('model');
};

list.Model.prototype.newListItem = function(item){
  this.itemName = item;
};

list.Model.prototype.storeListItem = function(value){
  this.itemName = value;
  if (value!== undefined){
    this.shoppingListArr.push(value);
  }
};

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
    //this.renderItem(item);
  }
};

list.FormView.prototype.addItemToList = function(item){
  this.element.value = item;
};

//view just for the contents of the ul
list.ListView = function(element){
  this.listItem = '';
  this.element = $(element);
  /*attach an event listener to the form from here by DOM traversal. .siblings() goes up the tree to the element w the same name as the filter.*/
  this.sibling = this.element.siblings('form');
  //in this case 'this' is listView at the beginning, and 'formView' at the end.
  this.sibling.submit(this.element, (this._onSubmit.bind(this)));
  console.log('listView');
};

//listView event listener right now - console.log('click') = good, but item doesn't render.
list.ListView.prototype._onSubmit = function(evt){
  evt.preventDefault();
  var item = this.sibling.find('input').val();
  this.listItem = item;
  if (this.renderItem){
    this.renderItem(item);
  }
  debugger;
  console.log('click');
};

list.ListView.prototype.renderItem = function(item){
  this.listItem = item;
  this.element.append("<li class='main__list-item'>" + item + "<span class='main__list-item--edit'>" + "<button class='main__list-item--button'>" + "Edit" + "</button>" + "</span>" + "<span class='main__list-item--delete'>" + "<button class='main__list-item--button'>" + "Delete" + "</button>" + "</span>" + "</li>");
};

//cross link the model and view together
list.Controller = function(model, formView, listView){
  formView.addItemToList = model.storeListItem.bind(model);
  model.newListItem = listView.renderItem.bind(listView);
  console.log('controller');
};
