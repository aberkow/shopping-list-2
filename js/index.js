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
list.Model.prototype.deleteItemFromList = function(item){
  var index = this.shoppingList.indexOf(item);
  this.shoppingList.splice(index, 1);
};

//display app data as a shopping list
list.View = function(elementSelector){
  this.element = document.querySelector(elementSelector);
  this.element.addEventListener("click", /*??????????*/);
};

//take itemName from list.Model and display it as a <li> inside .main__list.
list.View.prototype.renderItemInView = function(itemName){
  return "<li class='main__list-item'>" + itemName + "</li>";
};

//take item closest to selected trashcan and remove the entry from the view
list.View.prototype.removeItemFromView = function(evt){
  var item = evt.target;
  item.closest("main__list-item").remove();
};

//link list.Model and list.View
list.Controller = function(model, view){
  view.renderItemInView = model.addToList.bind(model);
  view.removeItemFromView = model.deleteItemFromList.bind(model);
  model.addToList = view.renderItemInView.bind(view);
  model.deleteItemFromList = view.removeItemFromView.bind(view);
};

$(document).ready(function(){
  var model = new list.Model();
  var view = new list.View();
  var controller = new list.Controller(model, view);
});
