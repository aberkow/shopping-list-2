var list = {};

$(document).ready(function(){
  var model = new list.Model();
  var view = new list.View("main__list", "main__form");
  var controller = new list.Controller(model, view);
  debugger;
});


//store and manipulate app data
list.Model = function(){
  this.itemName = "";
  this.shoppingList = [];
  //this.addToList = null;
  //this.itemStatus = null;
  console.log("model");
};

//add items to the model.
list.Model.prototype.addToList = function(item){
  this.itemName = item;
  if (item !== undefined){
    this.shoppingList.push(item);
  }
  debugger;
  console.log("model.addToList");
  console.log(item);
};

list.Model.prototype.itemStatus = function(){
  //something here about whether the item has been checked or not.
};

list.Model.prototype.itemEdit = function(){
  //edit an item after it's been added to the list
}

list.Model.prototype.undoDelete = function(){
  //undo an accidental deletion from the list.
}

//remove items from the model. Finds the index in the shoppingList array
//of the item and removes it.
list.Model.prototype.deleteItemFromList = function(item){
  var index = this.shoppingList.indexOf(item);
  this.shoppingList.splice(index, 1);
};

//display app data as a shopping list
list.View = function(listSelector, formSelector){
  this.listSelector = $(listSelector);
  this.formSelector = $(formSelector);
  // this.formSelector.on("submit", function(evt){
  //   evt.preventDefault();
  //   this._renderItemInView.bind(this)
  //   debugger;
  //   console.log("click");
  // });
  //debugger;
  this.renderItemInView = null;
  this.removeItemFromView = null;
  console.log("view");
};

//take itemName from list.Model and display it as a <li> inside .main__list.
list.View.prototype._renderItemInView = function(evt, itemName){
  this.formSelector.on("submit", function(evt){
    evt.preventDefault();
    this.renderItemInView.bind(this);
    alert("click");
  });
  this.listSelector.append("<li class='main__list-item'>" + itemName + "</li>");
};

//take item closest to selected trashcan and remove the entry from the view
list.View.prototype._removeItemFromView = function(evt){
  var item = evt.target;
  item.closest("main__list-item").remove();
};

//link list.Model and list.View
list.Controller = function(model, view){
  view.renderItemInView = model.addToList.bind(model);
  view.removeItemFromView = model.deleteItemFromList.bind(model);
  model.addToList = view.renderItemInView.bind(view);
  model.deleteItemFromList = view.removeItemFromView.bind(view);

  console.log("controller");

};
