'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Members = function (_React$Component) {
  _inherits(Members, _React$Component);

  function Members() {
    _classCallCheck(this, Members);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Members.prototype.openLink = function openLink(link) {
    var win = window.open(link, '_blank');
    win.focus();
  };

  Members.prototype.render = function render() {
    var memberLink = 'http://www.freecodecamp.com/' + this.props.data.username;
    var updated = moment(this.props.data.lastUpdate).format('DD-MM-YY');
    return React.createElement(
      'tr',
      { onClick: this.openLink.bind(this, memberLink) },
      React.createElement(
        'td',
        null,
        React.createElement('img', { src: this.props.data.img }),
        this.props.data.username
      ),
      React.createElement(
        'td',
        null,
        this.props.data.recent
      ),
      React.createElement(
        'td',
        null,
        this.props.data.alltime
      ),
      React.createElement(
        'td',
        null,
        updated
      )
    );
  };

  return Members;
}(React.Component);

var OrderedLink = function (_React$Component2) {
  _inherits(OrderedLink, _React$Component2);

  function OrderedLink() {
    _classCallCheck(this, OrderedLink);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  OrderedLink.prototype.render = function render() {
    var link = '#/' + this.props.data.state + '?order=' + this.props.field + ':';
    var icon = '';
    var name = this.props.field.charAt(0).toUpperCase() + this.props.field.split('').splice(1, this.props.field.length).join('');

    if (this.props.data.order.name === this.props.field) {
      if (this.props.data.order.dir === 'asc') {
        icon = 'fa fa-caret-up';
        link += 'desc';
      } else {
        icon = 'fa fa-caret-down';
        link += 'asc';
      }
    } else {
      link += 'desc';
    }

    return React.createElement(
      'a',
      { className: '', href: link },
      name,
      '  ',
      React.createElement('i', { className: icon })
    );
  };

  return OrderedLink;
}(React.Component);

var Dashboard = function (_React$Component3) {
  _inherits(Dashboard, _React$Component3);

  function Dashboard() {
    _classCallCheck(this, Dashboard);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this));

    _this3.dataURI = {
      alltime: 'http://fcctop100.herokuapp.com/api/fccusers/top/alltime',
      recent: 'http://fcctop100.herokuapp.com/api/fccusers/top/recent'
    };

    _this3.state = {
      DATA: { state: null, data: null, order: null }
    };
    return _this3;
  }

  Dashboard.prototype.fetchData = function fetchData(hash) {
    var _this4 = this;

    var name = hash.replace(/^\#\/(\w+)\??.*?$/, '$1');
    var o = hash.match(/order/) ? hash.replace(/^.*order\=(.+)$/g, '$1') : 'username:desc';

    name = name.length < 1 ? 'recent' : name;

    var data = this.state.DATA.data;
    var order = {
      name: o.split(':')[0],
      dir: o.split(':')[1]
    };

    var orderify = function orderify(a, b) {
      var x = a[order.name];
      var y = b[order.name];

      if (order.name === 'username') {
        x = x.toLowerCase().charCodeAt(0);
        y = y.toLowerCase().charCodeAt(0);
      }

      if (order.name === 'lastUpdate') {
        x = new Date(x).getTime();
        y = new Date(y).getTime();
      }

      return order.dir === 'desc' ? x - y : y - x;
    };

    if (name !== this.state.DATA.state) {
      // Displaying progress at the boot time
      this.setState({ DATA: { data: null } });

      fetch(this.dataURI[name]).then(function (response) {
        return response.json();
      }).then(function (json) {
        _this4.setState({ DATA: {
            data: json.sort(orderify),
            state: name,
            order: order
          } });
      });
    } else {
      this.setState({ DATA: {
          data: this.state.DATA.data.sort(orderify),
          state: name,
          order: order
        } });
    }
  };

  Dashboard.prototype.componentDidMount = function componentDidMount() {
    var _this5 = this;

    window.addEventListener('hashchange', function () {
      _this5.fetchData(window.location.hash);
    });
    this.fetchData(window.location.hash);
  };

  Dashboard.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { clasName: 'header' },
        React.createElement(
          'h2',
          null,
          'Leaderboard',
          this.state.DATA.state === 'alltime' ? React.createElement(
            'span',
            null,
            React.createElement(
              'small',
              { className: 'label label-info' },
              'All Time'
            ),
            React.createElement(
              'a',
              { className: 'btn pull-right', href: '#/recent?order=username:desc' },
              'Show Recent ',
              React.createElement('i', { className: 'fa fa-clock-o' })
            )
          ) : React.createElement(
            'span',
            null,
            React.createElement(
              'small',
              { className: 'label label-info' },
              'Recent'
            ),
            React.createElement(
              'a',
              { className: 'btn pull-right', href: '#/alltime?order=username:desc' },
              'Show All Time ',
              React.createElement('i', { className: 'fa fa-clock-o' })
            )
          )
        )
      ),
      this.state.DATA.data ? React.createElement(
        'table',
        { className: 'table table-hover' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              React.createElement(OrderedLink, { data: this.state.DATA, field: 'username' })
            ),
            React.createElement(
              'th',
              null,
              React.createElement(OrderedLink, { data: this.state.DATA, field: 'recent' })
            ),
            React.createElement(
              'th',
              null,
              React.createElement(OrderedLink, { data: this.state.DATA, field: 'alltime' })
            ),
            React.createElement(
              'th',
              null,
              React.createElement(OrderedLink, { data: this.state.DATA, field: 'lastUpdate' })
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          this.state.DATA.data.map(function (d, i) {
            return React.createElement(Members, { data: d, key: i });
          })
        )
      ) : React.createElement(
        'h4',
        { className: 'text-center' },
        'Loading...'
      ),
      React.createElement('br', null),
      React.createElement(
        'h6',
        { className: 'text-center' },
        React.createElement(
          'a',
          { href: 'http://www.linuxenko.pro' },
          '© Svetlana Linuxenko'
        )
      )
    );
  };

  return Dashboard;
}(React.Component);

React.render(React.createElement(Dashboard, null), document.body);