var list = {};
var model;
var view;
var controller;

$(document).ready(function(){
  model = new list.Model();
  view = new list.View();
  controller = new list.Controller();
  $('.main__form-button').on('click', model.addToListModel.bind(model));
  $('.main__form-button').on('click', view.addToListView.bind(view));



  // $('.main__form-button').on('click', function(){
  //   //alert('yay');
  //
  // });
});

list.Model = function(){
  this.itemName = '';
  this.shoppingList = [];
};

list.View = function(){
  this.formSelector = $('.main__form');
  this.listSelector = $('.main__list');
  this.item = this.formSelector.find('input').val();
};

list.Controller = function(){

};

list.Model.prototype.addToListModel = function(evt){
  evt.preventDefault();
  this.itemName = $('.main__form-input').val();
  console.log(this.itemName);
  if (this.itemName !== undefined){
    this.shoppingList.push(this.itemName);
  }
  console.log(this.shoppingList);
};

list.View.prototype.addToListView = function(evt){
  evt.preventDefault();
  var item = this.item;
  this.listSelector.append("<li class='main__list-item'>" + item + "</li>");
  return item;
}
