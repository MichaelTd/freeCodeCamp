"use strict";

var recipeNames = ["First", "Second", "Third", "Fourth", "Fifth"];

var recipeIngredients = [["ingr1", "ingr2", "ingr3"], ["ingr1", "ingr2"], ["ingr1"], ["ingr 4"], ["ingr 5"]];

$(document).on('ready', function () {

  (function refresh() {

    if (typeof Storage !== "undefined") {
      console.log('local storage available, getting params');
      if (typeof localStorage.recipeBook === 'undefined' || JSON.parse(localStorage.recipeBook).length == 0) {
        var contents = [];
        for (var l = 0; l < recipeNames.length; l++) {
          contents.push({ "name": recipeNames[l], "ingredients": recipeIngredients[l] });
        }
        console.log(JSON.stringify(contents));
        localStorage.setItem('recipeBook', JSON.stringify(contents));
      }
      console.log('recipeBook length: ' + JSON.parse(localStorage.recipeBook).length + ' | contents: ' + JSON.stringify(localStorage.recipeBook));
    } else console.log('local storage not available');

    var PanelsContainer = React.createClass({
      displayName: "PanelsContainer",

      render: function render() {
        return React.createElement(
          "span",
          null,
          React.createElement(
            "div",
            { className: "panel panel-primary" },
            React.createElement(
              "div",
              { className: "panel-heading primary", type: "button" },
              React.createElement(
                "h4",
                { className: "panel-title" },
                React.createElement(
                  "a",
                  { "aria-expanded": "false", className: "cllps-toggler collapsed", "data-toggle": "collapse", "data-parent": "#accordion", href: "#collapse-add" },
                  "Add New Recipe"
                )
              )
            ),
            React.createElement(
              "div",
              { "aria-expanded": "false", id: "collapse-add", className: "panel-collapse collapse" },
              React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(
                  "form",
                  { role: "form", action: "#", className: "form-vertical" },
                  React.createElement(
                    "fieldset",
                    null,
                    React.createElement(
                      "div",
                      { "class": "form-group" },
                      React.createElement("input", { type: "text", className: "form-control", name: "editname", id: "edit-name", placeholder: "Recipe display name" })
                    ),
                    React.createElement(
                      "div",
                      { "class": "form-group" },
                      React.createElement("input", { type: "text", className: "form-control", name: "editingr", id: "edit-ingr", placeholder: "Ingredients separated by commas: ingr 1, ingr 2 " })
                    ),
                    React.createElement(
                      "div",
                      { className: "btn-group btn-group-justified" },
                      React.createElement(
                        "a",
                        { href: "#", className: "btn btn-success", id: "add-recipe" },
                        "Add Recipe"
                      )
                    )
                  )
                )
              )
            )
          ),
          React.createElement("div", { id: "panels" })
        );
      }
    });
    var markup = [];
    var Panel = React.createClass({
      displayName: "Panel",

      render: function render() {
        for (var i = 0; i < JSON.parse(localStorage.recipeBook).length; i++) {
          var Name = JSON.parse(localStorage.recipeBook)[i].name;
          var IngrContainerId = "ingredients-" + i;
          var collapseId = "collapse-" + i;
          var collapseHREF = "#collapse-" + i;
          var editRecipeId = "edit-recipe-" + i;
          var deleteRecipeId = "delete-recipe-" + i;
          var collapseEditId = "collapse-edit-" + i;
          var collapseEditHREF = "#collapse-edit-" + i;
          var updateRecipe = "update-recipe-" + i;
          markup.push(React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
              "div",
              { className: "panel-heading", type: "button" },
              React.createElement(
                "h4",
                { className: "panel-title" },
                React.createElement(
                  "a",
                  { "aria-expanded": "false", className: "cllps-toggler collapsed", "data-toggle": "collapse", "data-parent": "#accordion", href: collapseHREF },
                  Name
                )
              )
            ),
            React.createElement(
              "div",
              { "aria-expanded": "false", id: collapseId, className: "panel-collapse collapse" },
              React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement("span", { id: IngrContainerId }),
                React.createElement(
                  "div",
                  { className: "btn-group btn-group-justified" },
                  React.createElement(
                    "a",
                    { href: collapseEditHREF, "data-toggle": "collapse", className: "btn btn-warning edit-rec", id: editRecipeId },
                    "Edit Recipe"
                  ),
                  React.createElement(
                    "a",
                    { href: "#", className: "btn btn-danger del-rec", id: deleteRecipeId },
                    "Delete Recipe"
                  )
                ),
                React.createElement(
                  "div",
                  { "aria-expanded": "false", id: collapseEditId, className: "panel-collapse collapse" },
                  React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                      "form",
                      { role: "form", action: "#", className: "form-vertical" },
                      React.createElement(
                        "fieldset",
                        null,
                        React.createElement(
                          "div",
                          { "class": "form-group" },
                          React.createElement("input", { type: "text", className: "form-control", name: "editname", id: "edit-name", placeholder: "Recipe display name" })
                        ),
                        React.createElement(
                          "div",
                          { "class": "form-group" },
                          React.createElement("input", { type: "text", className: "form-control", name: "editingr", id: "edit-ingr", placeholder: "Ingredients separated by commas: ingr 1, ingr 2 " })
                        ),
                        React.createElement(
                          "div",
                          { className: "btn-group btn-group-justified" },
                          React.createElement(
                            "a",
                            { href: "#", className: "btn btn-success upd-rec", id: updateRecipe },
                            "Update Values"
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          ));
        }
        return React.createElement(
          "div",
          { className: "panel-group", id: "accordion" },
          markup
        );
      }
    });
    ReactDOM.render(React.createElement(PanelsContainer, null), document.getElementById('output'));
    ReactDOM.render(React.createElement(Panel, null), document.getElementById('panels'));

    for (var i = 0; i < JSON.parse(localStorage.recipeBook).length; i++) {
      var Ingredients = React.createClass({
        displayName: "Ingredients",

        render: function render() {
          var ingrMarkup = [];
          for (var k = 0; k < JSON.parse(localStorage.recipeBook)[i].ingredients.length; k++) {
            var CurIngr = JSON.parse(localStorage.recipeBook)[i].ingredients[k];
            ingrMarkup.push(React.createElement(
              "li",
              { className: "list-group-item" },
              CurIngr
            ));
          }
          return React.createElement(
            "ul",
            { className: "list-group" },
            ingrMarkup
          );
        }
      });
      ReactDOM.render(React.createElement(Ingredients, null), document.getElementById('ingredients-' + i));
    }

    document.getElementById('add-recipe').addEventListener('click', function () {
      console.log($(this).attr('id'));
      console.log($(this).parent().parent().find("#edit-name").val());
      console.log($(this).parent().parent().find("#edit-ingr").val());
      var name = $(this).parent().parent().find("#edit-name").val();
      var ingredients = $(this).parent().parent().find("#edit-ingr").val().split(',');
      var updatedLocalStorage = JSON.parse(localStorage.recipeBook);
      updatedLocalStorage.push({ "name": name, "ingredients": ingredients });
      localStorage.setItem('recipeBook', JSON.stringify(updatedLocalStorage));
      refresh();
    });

    var delButtons = document.getElementsByClassName('del-rec');
    for (var k = 0; k < delButtons.length; k++) {
      delButtons[k].addEventListener('click', function () {
        var id = $(this).attr('id');
        id = id.substring(id.lastIndexOf('-') + 1, id.length);
        var updatedLocalStorage = JSON.parse(localStorage.recipeBook);
        updatedLocalStorage.splice(id, 1);
        localStorage.setItem('recipeBook', JSON.stringify(updatedLocalStorage));
        refresh();
      });
    }

    var editButtons = document.getElementsByClassName('edit-rec');
    for (var k = 0; k < editButtons.length; k++) {
      editButtons[k].addEventListener('click', function () {
        var id = $(this).attr('id');
        id = id.substring(id.lastIndexOf('-') + 1, id.length);
        var recipe = JSON.parse(localStorage.recipeBook)[id];
        $(this).parent().parent().find("#edit-name").val(recipe.name);
        $(this).parent().parent().find("#edit-ingr").val(recipe.ingredients);
      });
    }

    var updateButtons = document.getElementsByClassName('upd-rec');
    for (var k = 0; k < updateButtons.length; k++) {
      updateButtons[k].addEventListener('click', function () {
        var id = $(this).attr('id');
        id = id.substring(id.lastIndexOf('-') + 1, id.length);
        var name = $(this).parent().parent().find("#edit-name").val();
        var ingredients = $(this).parent().parent().find("#edit-ingr").val().split(',');
        var updatedLocalStorage = JSON.parse(localStorage.recipeBook);
        updatedLocalStorage.splice(id, 1, { "name": name, "ingredients": ingredients });
        localStorage.setItem('recipeBook', JSON.stringify(updatedLocalStorage));
        refresh();
      });
    }
  })();
});
