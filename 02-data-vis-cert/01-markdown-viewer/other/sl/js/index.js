'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mdURI = 'https://cdn.rawgit.com/chjj/marked/master/README.md';

var Dashboard = function (_React$Component) {
  _inherits(Dashboard, _React$Component);

  function Dashboard() {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      defaultText: null,
      markup: ''
    };

    fetch(mdURI).then(function (response) {
      return response.text();
    }).then(function (text) {
      _this.setState({ defaultText: text });
      _this.changeText({ target: { value: text } });
    });
    return _this;
  }

  Dashboard.prototype.changeText = function changeText(e) {
    this.setState({ markup: marked(e.target.value) });
  };

  Dashboard.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-xs-6' },
          this.state.defaultText !== null ? React.createElement('textarea', { className: 'editor', onChange: this.changeText.bind(this), defaultValue: this.state.defaultText }) : React.createElement(
            'p',
            null,
            'loading...'
          )
        ),
        React.createElement('div', { className: 'col-xs-6 preview', dangerouslySetInnerHTML: { __html: this.state.markup } })
      )
    );
  };

  return Dashboard;
}(React.Component);

React.render(React.createElement(Dashboard, null), document.body);