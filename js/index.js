var list = {};
var model;
var view;
var controller;

$(document).ready(function(){
  model = new list.Model();
  view = new list.View();
  controller = new list.Controller(model, view);
  debugger;
});


//store and manipulate app data
list.Model = function(){
  this.itemName = "";
  this.shoppingList = [];
  this.itemStatus = null;
  console.log("model");
};

//add items to the model.
list.Model.prototype.addToList = function(item){
  this.itemName = item;
  if (item !== undefined){
    this.shoppingList.push(item);
  }
  //debugger;
  console.log("model.addToList");
  debugger;
  console.log(item);
};

list.Model.prototype.itemStatus = function(){
  //something here about whether the item has been checked or not and change its status.
};

list.Model.prototype.itemEdited = function(){
  //edit an item after it's been added to the list

}

list.Model.prototype.undoDeleteFromList = function(){
  //undo an accidental deletion from the list.
}

//remove items from the model. Finds the index in the shoppingList array
//of the item and removes it.
list.Model.prototype.deleteItemFromList = function(item){
  var index = this.shoppingList.indexOf(item);
  this.shoppingList.splice(index, 1);
};

//display app data as a shopping list

// list.FormView = function(formSelector){
//   this.formSelector = $(formSelector);
//   this.ItemName = $(formSelector).find('input').val();
// }

list.View = function(){
  this.listSelector = $('#main__list');
  this.formSelector = $('.main__form');
  this.itemName = this.formSelector.find('input').val();
  this.renderItemInView = null; //do I even need these two lines???
  this.removeItemFromView = null;
  this.listeners = {}; //see rlynch's comments in evernote
  console.log("view");
};

// list.View.prototype.addListener(type, callback){
//   var listeners = this.listeners[type] = this.listeners[type] || [];
//   listeners.push(callback);
// }

//take itemName from list.Model and display it as a <li> inside .main__list.
list.View.prototype.renderItemInView = function(itemName){//needs an evt here?
  var itemName = this.listSelector.find('input').val();
  var listener = this.listeners.add;
  if (listeners){
    listeners.forEach(function(listener){
      listener(itemName);
    });
  };
  this.formSelector.on("submit", function(evt){
    evt.preventDefault();
    //this.renderItemInView.bind(this);
    this.listSelector.append("<li class='main__list-item'>" + itemName + "<span class='main__list-item--edit'>" + "<button class='main__list-item--button'>" + "Edit" + "</button>" + "</span>" + "<button class='main__list-item--button'>" + "Delete" + "</button>" + "</span>" + "</li>"
    );
    alert("click");
  });
  // this.listSelector.append("<li class='main__list-item'>" + itemName + "</li>"
  // );
};

//take item closest to selected trashcan and remove the entry from the view
list.View.prototype.removeItemFromView = function(evt){
  var item = evt.target;
  item.closest("main__list-item").remove();
};

list.View.prototype.editItem = function(evt, value){
  //click on the button and edit the text of the item.
};

//link list.Model and list.View
list.Controller = function(model, view){
  view.renderItemInView = model.addToList.bind(model);
  view.removeItemFromView = model.deleteItemFromList.bind(model);
  // model.addToList = view.renderItemInView.bind(view);
  // model.deleteItemFromList = view.removeItemFromView.bind(view);

  console.log("controller");

};
