"use strict";

const dt = new Date();
const year = dt.getFullYear();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)){
    throw new TypeError("Cannot call a class as a function");}
}

function _possibleConstructorReturn(self, call) {
  if (!self){
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null){
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value:subClass,enumerable:false,writable:true,configurable:true}});

  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var UserList = function (_React$ComponentUL) {
  _inherits(UserList, _React$ComponentUL);

  function UserList() {
    _classCallCheck(this, UserList);
    return _possibleConstructorReturn(this, _React$ComponentUL.apply(this, arguments));
  }

  UserList.prototype.render = function render() {
    return React.createElement(
      "tbody",null,this.props.data.map(function (value, index) {
        return React.createElement(User, { data: value, index: index + 1 });
      })
    );
  };

  return UserList;
}(React.Component);

var User = function (_React$ComponentUser) {

  _inherits(User, _React$ComponentUser);

  function User() {
    _classCallCheck(this, User);
    return _possibleConstructorReturn(this, _React$ComponentUser.apply(this, arguments));
  }

  User.prototype.render = function render() {
    return React.createElement("tr",null,
      React.createElement("td",{ className: "index vert-align" },this.props.index),
      React.createElement("td",null,
      React.createElement(Avatar, { img: this.props.data.img, username: this.props.data.username })),
      React.createElement("td",{ className: "vert-align" },this.props.data.recent),
      React.createElement("td",{ className: "vert-align" },this.props.data.alltime));
  };

  return User;
}(React.Component);

var Avatar = function (_React$ComponentAvatar) {
  _inherits(Avatar, _React$ComponentAvatar);

  function Avatar() {
    _classCallCheck(this, Avatar);
    return _possibleConstructorReturn(this, _React$ComponentAvatar.apply(this, arguments));
  }

  Avatar.prototype.render = function render() {
    return React.createElement("div",{ className: "avatar" },
      React.createElement("img", { className: "img-responsive img-rounded", src: this.props.img }),
      React.createElement("a",{ className: "username", href: "https://freecodecamp.com/" + this.props.username},this.props.username));
  };
  return Avatar;
}(React.Component);

var Footer = function Footer() {
  return React.createElement("footer",null,
    React.createElement("div",{className: "container-footer"},
    React.createElement("p",{className: "coder"}),
    React.createElement("a",{href:"https://www.freecodecamp.org/MichaelTd/"},
    React.createElement("i",{className:"fa fa-free-code-camp fa-1x"}, " ", " tdm ", year))));
};

var lb = function (_React$ComponentLb) {
  _inherits(lb, _React$ComponentLb);

  function lb() {
    _classCallCheck(this, lb);
    var _this = _possibleConstructorReturn(this, _React$ComponentLb.call(this));
    _this.state = {userDataRecent:[],userDataAlltime:[],selected:"recent"};
    return _this;
  }

  lb.prototype.componentDidMount = function componentDidMount() {
    $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function (data) {this.setState({ userDataRecent: data });}.bind(this));
    $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function (data) {this.setState({ userDataAlltime: data });}.bind(this));
  };

  lb.prototype.changeSelectedRecent = function changeSelectedRecent(){
    this.setState({selected:"recent"});};

  lb.prototype.changeSelectedAlltime = function changeSelectedAlltime(){
    this.setState({selected:"alltime"});};

  lb.prototype.render = function render() {
    return React.createElement("div",{className:"container"},
      React.createElement("h1",{className:"text-center title"},
      React.createElement("i",{className:"fa fa-free-code-camp"}),"Camper Leaderboard"),
      React.createElement("table",{className:"table table-responsive table-striped leaderboard"},
      React.createElement("thead",null,
      React.createElement("tr",null,
      React.createElement("th",null,"#"),
      React.createElement("th",null,"Camper Name"),
      React.createElement("th",{onClick: this.changeSelectedRecent.bind(this)},"Points in past 30 days",
      React.createElement("i",{className: this.state.selected === "recent"?"fa fa-arrow-down":""})),
      React.createElement("th",{onClick: this.changeSelectedAlltime.bind(this)},"All time points",
      React.createElement("i",{className: this.state.selected === "alltime"?"fa fa-arrow-down":"" })))),
      React.createElement(UserList,{ data: this.state.selected === "recent"?this.state.userDataRecent : this.state.userDataAlltime})),
      React.createElement("hr",null),
      React.createElement(Footer,null));
  };

  return lb;
}(React.Component);

ReactDOM.render(React.createElement(lb, null), document.getElementById("app"));
