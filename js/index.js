var list = {};

//store and manipulate app data
list.Model = function(){
  this.itemName = "";
  this.shoppingList = [];
  this.numberOfItems = this.shoppingList.length;
};

//add items to the model.
list.Model.prototype.addToList = function(item){
  this.itemName = item;
  if (item !== undefined){
    this.shoppingList.push(item);
  }
};

//remove items from the model. Finds the index in the shoppingList array
//of the item and removes it.
list.Model.prototype.removeFromList = function(item){
  var index = this.shoppingList.indexOf(item);
  this.shoppingList.splice(index, 1);
};

//display app data as a shopping list
list.View = function(elementSelector){
  this.element = document.querySelector(elementSelector);
};

//take itemName from list.Model and display it as a <li> inside .main__list.
list.View.prototype.renderItem = function(itemName){
  return "<li class='main__list-item'>" + itemName + "</li>";
};

//link list.Model and list.View
list.Controller = function(model, view){

};

$(document).ready(function(){
  var model = new list.Model();
  var view = new list.View();
  var controller = new list.Controller();
});
