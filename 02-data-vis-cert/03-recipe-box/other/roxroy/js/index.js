"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataStorage = function () {
  function DataStorage() {
    _classCallCheck(this, DataStorage);
  }

  DataStorage.prototype.resetData = function resetData() {
    var recipes = this.initialDate();
    this.saveData(recipes);
    return recipes;
  };

  DataStorage.prototype.readData = function readData() {
    var data = localStorage[DataStorage.DATA_KEY];
    return data && data.length ? JSON.parse(data) : this.initialDate();
  };

  DataStorage.prototype.saveData = function saveData(recipes) {
    localStorage[DataStorage.DATA_KEY] = JSON.stringify(recipes);
  };

  DataStorage.prototype.initialDate = function initialDate() {
    return [{
      id: 2,
      title: "Beef Soup",
      description: "The Beef Soup is a favorite in Jamaica for Saturday soup. It is a hearty soup dish that features beef, carrots, turnips, pumpkin, cho cho (chayote squash), and yam. Often served with with flour dumplings.",
      ingredients: ["2 qt. water", "1 lb. soup bones or stewing steak", "1/2 lb. carrots, cubed", "1/4 lb. turnips, cubed", "1 lb. pumpkin, cut up", "1/2 lb. cho cho, cut up", "1 lb. yellow yam, cut up", "1 spring thyme", "2 stalks escallion", "1 tablespoon salt"]
    }, {
      id: 3,
      title: "Conch Salad – Caribbean Style",
      description: "Conch salad is one of the most delicious signature dishes of the Bahamas. Freshly diced conch meat, vegetables, citrus juices, spices & hot pepper produces an explosion of flavours that is delightful to the palate and eyes. The conch is a large-sized sea snail that lives in a spiral pink-white shell. You will find different variations of this salad throughout the Caribbean islands. Learn how to make your own, try my Conch Salad Recipe.",
      ingredients: ["1 pound fresh conch diced", "2 tablespoons extra-virgin olive oil", "1 1/2 cups chopped tomato", "1 medium chopped onion", "1 cup chopped green bell pepper", "1 cup chopped celery", "1/2 cup fresh orange juice", "1/2 cup fresh lime juice", "1 1/2 teaspoons minced Scotch bonnet", "1 teaspoon salt", "1/2 teaspoon black pepper"]
    }, {
      id: 5,
      title: "Cheesy Baked Mash Potatoes",
      description: "This baked, mash potatoes with its creamy, cheesy middle and perfect crunchy top will have you singing and swooning ’cause comfort food has never tasted so good!",
      ingredients: ["2 lb. Yukon potatoes peeled and cut into 1-inch pieces", "2 Tbsp. butter", "1/2 cup whipping cream", "1/4 cup mozzarella cheese", "1/2 cup parmesan cheese", "2 Tbsp. Panko breadcrumbs/ dry breadcrumbs", "1 tsp. dried parsley", "Salt"]
    }, {
      id: 7,
      title: "Jamaican Chocolate Stout Cake",
      description: "Jamaicans have a proud history of using Guinness Stout in a variety of ways, the most famous being Guinness Punch. But one of the best uses of the rich, dark beverage is as an ingredient in chocolate cake. Try the following cake recipe for a seriously intense chocolate experience. And to complete your Jamaican Guinness pleasures, make up a batch of Jamaican.",
      ingredients: ["1 cup Guinness Stout", "1 stick plus 2 T unsalted butter", "1/4 cup unsweetened cocoa", "2 cups superfine sugar", "3/4 cups sour cream", "2 large eggs", "1 Table vanilla extract", "2 cups all-purpose flour", "2 1/2 tsp baking soda", "Butter to grease the pan"]
    }];
  };

  return DataStorage;
}();

DataStorage.DATA_KEY = "recipeBox_roxroy";

//--
var ModalWrapper = function ModalWrapper(props) {
  var handleBackgroundClick = function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) props.hideModal();
  };

  var onOk = function onOk() {
    props.onOk();
    props.hideModal();
  };

  var okButton = props.showOk ? React.createElement(
    "button",
    {
      onClick: onOk,
      disabled: props.okDisabled
    },
    props.okText
  ) : null;

  return React.createElement(
    "div",
    { className: "overlay" },
    React.createElement(
      "div",
      { onClick: handleBackgroundClick, className: "content" },
      React.createElement(
        "header",
        null,
        React.createElement(
          "h1",
          null,
          props.title
        )
      ),
      props.children,
      okButton
    )
  );
};

ModalWrapper.propTypes = {
  // props
  title: React.PropTypes.string,
  showOk: React.PropTypes.bool,
  okText: React.PropTypes.string,
  okDisabled: React.PropTypes.bool,
  width: React.PropTypes.number,
  style: React.PropTypes.object,
  children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.element, React.PropTypes.string]).isRequired,

  // methods
  hideModal: React.PropTypes.func,
  onOk: React.PropTypes.func
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400,
  onOk: function onOk() {}
};
//--

var ModalSelector = function ModalSelector(props) {
  //console.log(props);
  switch (props.currentModal) {
    case "edit":
    case "add":
      return React.createElement(ChangeDataModal, props);
    case "view":
      return React.createElement(ViewDataModal, props);
    default:
      return null;
  }
};

var ChangeDataModal = function (_React$Component) {
  _inherits(ChangeDataModal, _React$Component);

  function ChangeDataModal(props) {
    _classCallCheck(this, ChangeDataModal);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.recipe = _this.props.recipe;
    if (_this.recipe) {
      //console.log(this.recipe.ingredients);
      _this.recipe.ingredientsText = _this.recipe.ingredients.join('\n');
    }

    _this.onClose = _this.onClose.bind(_this);
    _this.onSave = _this.onSave.bind(_this);
    return _this;
  }

  ChangeDataModal.prototype.onSave = function onSave(provider) {
    //console.log(provider);
    var recipe = this.recipe;
    recipe.title = this.myTextInput.value;
    recipe.description = this.myDescriptionInput.value;
    recipe.ingredients = this.myIngredientsInput.value.split('\n');

    // Only save item with data
    if (recipe.title.trim().length) {
      this.props.saveModal(recipe);
    }
    this.props.hideModal();
  };

  ChangeDataModal.prototype.createNewRecipe = function createNewRecipe() {
    this.recipe = {
      id: +Date.now(),
      title: "",
      description: "",
      ingredients: ""
    };
  };

  ChangeDataModal.prototype.onClose = function onClose(provider) {
    this.props.hideModal();
  };

  ChangeDataModal.prototype.render = function render() {
    var _this2 = this;

    if (!this.recipe) {
      this.createNewRecipe();
    }

    return React.createElement(
      "div",
      { className: "" },
      React.createElement(
        ModalWrapper,
        _extends({}, this.props, {
          width: 400,
          showOk: false
        }),
        React.createElement(
          "form",
          null,
          React.createElement(
            "label",
            null,
            "Title"
          ),
          React.createElement("input", { className: "form-control", type: "text", placeholder: "Enter your title...",
            required: true,
            ref: function ref(_ref) {
              return _this2.myTextInput = _ref;
            },
            defaultValue: this.recipe.title
          }),
          React.createElement(
            "label",
            null,
            "Description"
          ),
          React.createElement("textarea", { className: "form-control", type: "text", rows: "4",
            placeholder: "Enter the recipe description",
            required: true,
            ref: function ref(_ref2) {
              return _this2.myDescriptionInput = _ref2;
            },
            defaultValue: this.recipe.description }),
          React.createElement(
            "label",
            null,
            "Ingredients"
          ),
          React.createElement("textarea", { className: "form-control", type: "text", rows: "8",
            placeholder: "Enter your ingredientsm, one per line...",
            required: true,
            ref: function ref(_ref3) {
              return _this2.myIngredientsInput = _ref3;
            },
            defaultValue: this.recipe.ingredientsText })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("hr", null),
          React.createElement(
            "div",
            { className: "pull-right" },
            React.createElement(
              "button",
              { onClick: this.onSave, className: "btn btn-spacer btn-primary" },
              "Save"
            ),
            React.createElement(
              "button",
              { onClick: this.onClose, className: "btn btn-spacer" },
              "Close"
            )
          )
        )
      )
    );
  };

  return ChangeDataModal;
}(React.Component);

var ViewDataModal = function ViewDataModal(props) {
  var viewData = function viewData(provider) {
    props.hideModal();
    props.viewData(provider);
  };

  var id = 1;

  var onClose = function onClose(provider) {
    props.hideModal();
  };

  //console.log(props.recipe);
  return React.createElement(
    ModalWrapper,
    _extends({}, props, {
      title: props.recipe.title,
      width: 400,
      showOk: false
    }),
    React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        props.recipe.description
      ),
      React.createElement(
        "h2",
        { className: "lead" },
        "Ingredients"
      ),
      props.recipe.ingredients.map(function (ingredient) {
        return React.createElement(
          "div",
          { key: id++ },
          ingredient
        );
      }),
      React.createElement("hr", null),
      React.createElement(
        "div",
        { className: "pull-right" },
        React.createElement(
          "button",
          { onClick: onClose, className: "btn" },
          "Close"
        )
      )
    )
  );
};

function SearchBox(props) {
  var filterList = function filterList(event) {
    props.handleFilter(event.target.value.toLowerCase());
  };

  return React.createElement(
    "div",
    { className: "search" },
    React.createElement("input", { className: "form-control", type: "text", placeholder: "Search for a recipe...",
      onChange: filterList })
  );
}

function RecipeItem(props) {
  var onMainIconClick = function onMainIconClick(event, provider) {
    var op = event.target.dataset.op;
    var id = $(event.target).closest('.list-group-item').data('id');
    props.handleMainIconClick(op, id);
  };

  return React.createElement(
    "li",
    { className: "list-group-item", onClick: onMainIconClick, "data-id": props.recipe.id },
    React.createElement(
      "span",
      null,
      props.recipe.title
    ),
    React.createElement(
      "span",
      { className: "pull-right btn-spacer" },
      React.createElement("i", { className: "fa fa-remove fa-2x", "aria-hidden": "true", "data-op": "delete" })
    ),
    React.createElement(
      "span",
      { className: "pull-right btn-spacer" },
      React.createElement("i", { className: "fa fa-edit fa-2x", "aria-hidden": "true", "data-op": "edit" })
    ),
    React.createElement(
      "span",
      { className: "pull-right btn-spacer" },
      React.createElement("i", { className: "fa fa-address-card fa-2x", "aria-hidden": "true", "data-op": "view" })
    )
  );
}

function RecipeList(props) {
  return React.createElement(
    "ul",
    { className: "recipe-list list-group" },
    props.recipes.map(function (recipe) {
      return React.createElement(RecipeItem, { key: recipe.id,
        recipe: recipe,
        handleMainIconClick: props.handleMainIconClick
      });
    })
  );
}

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.dataStorage = new DataStorage();
    _this3.state = {
      allrecipes: [],
      recipes: [],
      currentModal: null,
      selectedRecipe: null
    };
    _this3.handleMainIconClick = _this3.handleMainIconClick.bind(_this3);
    _this3.handleAddIconClick = _this3.handleAddIconClick.bind(_this3);
    _this3.handleResetClick = _this3.handleResetClick.bind(_this3);
    _this3.handleFilter = _this3.handleFilter.bind(_this3);
    _this3.handleCloseClick = _this3.handleCloseClick.bind(_this3);
    _this3.handleSaveClick = _this3.handleSaveClick.bind(_this3);
    return _this3;
  }

  App.prototype.componentDidMount = function componentDidMount() {
    var getData = this.dataStorage.readData();

    this.setState({
      allrecipes: getData,
      recipes: getData
    });
  };

  App.prototype.deleteData = function deleteData(id) {
    //console.log("deleteData:" + this.state.selectedId);
    //  event.preventDefault();
    var allrecipes = this.state.allrecipes;
    var index = allrecipes.findIndex(function (recipe) {
      return recipe.id == id;
    });
    //console.log('index:' + index);
    allrecipes.splice(index, 1);

    this.setState({
      allrecipes: allrecipes
    });
    //console.log(recipes);
    this.dataStorage.saveData(allrecipes);
  };

  App.prototype.setSelectedRecipe = function setSelectedRecipe(operation, id) {
    var index = this.state.recipes.findIndex(function (recipe) {
      return recipe.id == id;
    });
    //console.log("setSelectedRecipe: " + operation + ' = ' + id);
    //console.log(this.state.recipes[index]);

    this.setState({
      selectedRecipe: this.state.recipes[index],
      currentModal: operation
    });

    switch (operation) {

      case "delete":
        this.deleteData(id);
        break;
    }
  };

  App.prototype.handleCloseClick = function handleCloseClick(event) {
    //console.log("handleCloseClick");
    this.setState({
      currentModal: null
    });
  };

  App.prototype.handleResetClick = function handleResetClick() {
    var getData = this.dataStorage.resetData();

    this.setState({
      allrecipes: getData,
      recipes: getData
    });
  };

  App.prototype.handleAddIconClick = function handleAddIconClick() {
    this.setSelectedRecipe('add', 0);
  };

  App.prototype.handleMainIconClick = function handleMainIconClick(operation, id) {
    this.setSelectedRecipe(operation, id);
  };

  App.prototype.handleSaveClick = function handleSaveClick(_recipe) {
    //console.log('handleSaveClick');
    //console.log(_recipe);
    var allrecipes = this.state.allrecipes;
    var index = allrecipes.findIndex(function (recipe) {
      return recipe.id == _recipe.id;
    });
    if (index === -1) {
      allrecipes.push(_recipe);
    } else {
      allrecipes[index] = _recipe;
    }
    this.setState({
      allrecipes: allrecipes
    });
    this.dataStorage.saveData(allrecipes);
  };

  App.prototype.handleFilter = function handleFilter(term) {
    var updatedList = this.state.allrecipes;
    updatedList = updatedList.filter(function (item) {
      return item.title.toLowerCase().search(term) !== -1;
    });
    this.setState({
      recipes: updatedList
    });
  };

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "app board-frame" },
        React.createElement(ModalSelector, { currentModal: this.state.currentModal,
          recipe: this.state.selectedRecipe,
          hideModal: this.handleCloseClick,
          saveModal: this.handleSaveClick
        }),
        React.createElement(
          "h1",
          null,
          "Recipe Box"
        ),
        React.createElement(SearchBox, { recipes: this.state.recipes,
          handleFilter: this.handleFilter
        }),
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            { className: "pull-right btn btn-spacer", onClick: this.handleResetClick },
            React.createElement("i", { className: "fa fa-refresh", "aria-hidden": "true" }),
            " Reset"
          ),
          React.createElement(
            "button",
            { className: "pull-right btn btn-primary", onClick: this.handleAddIconClick },
            React.createElement("i", { className: "fa fa-file-o", "aria-hidden": "true" }),
            " New Recipe"
          )
        ),
        React.createElement(RecipeList, { recipes: this.state.recipes,
          handleMainIconClick: this.handleMainIconClick
        }),
        React.createElement(
          "div",
          { className: "text-center" },
          "Powered by ",
          React.createElement(
            "a",
            { href: "http://www.coderstool.com", target: "_blank" },
            "CodersTool"
          )
        )
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app-root"));