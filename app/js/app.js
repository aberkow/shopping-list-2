!function e(t,i,n){function r(s,m){if(!i[s]){if(!t[s]){var d="function"==typeof require&&require;if(!m&&d)return d(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=i[s]={exports:{}};t[s][0].call(l.exports,function(e){var i=t[s][1][e];return r(i?i:e)},l,l.exports,e,t,i,n)}return i[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(e,t,i){var n={};n.Model=function(){this.itemName="",this.shoppingList=[],this.numberOfItems=this.shoppingList.length},n.Model.prototype.addToList=function(e){this.itemName=e,void 0!==e&&this.shoppingList.push(e)},n.Model.prototype.deleteItemFromList=function(e){var t=this.shoppingList.indexOf(e);this.shoppingList.splice(t,1)},n.View=function(e,t){this.listSelector=document.querySelector(e),this.buttonSelector.addEventListener("click",this._renderItemInView.bind(this)),this.renderItemInView=null},n.View.prototype._renderItemInView=function(e){return"<li class='main__list-item'>"+e+"</li>"},n.View.prototype.removeItemFromView=function(e){var t=e.target;t.closest("main__list-item").remove()},n.Controller=function(e,t){t.renderItemInView=e.addToList.bind(e),t.removeItemFromView=e.deleteItemFromList.bind(e),e.addToList=t.renderItemInView.bind(t),e.deleteItemFromList=t.removeItemFromView.bind(t)},$(document).ready(function(){var e=new n.Model,t=new n.View("main__list","main__form-button");new n.Controller(e,t)})},{}]},{},[1]);