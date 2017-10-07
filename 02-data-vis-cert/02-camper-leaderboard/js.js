'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
	_inherits(Table, _React$Component);

	function Table() {
		_classCallCheck(this, Table);

		var _this = _possibleConstructorReturn(this, _React$Component.call(this));

		_this.createCamper = _this.createCamper.bind(_this);
		return _this;
	}

	Table.prototype.getDefaultProps = function getDefaultProps() {
		return { data: [] };
	};

	Table.prototype.createCamper = function createCamper(item, index) {
		if (this.props.option == 'recent') {
			return React.createElement(
				'div',
				{ className: 'user-single' },
				React.createElement(
					'span',
					null,
					index + 1
				),
				React.createElement(
					'a',
					{ href: 'https://www.freecodecamp.com/' + item.username, target: '_blank' },
					React.createElement('img', { src: item.img }),
					React.createElement(
						'span',
						null,
						item.username
					)
				),
				React.createElement(
					'span',
					null,
					item.recent
				)
			);
		} else {
			return React.createElement(
				'div',
				{ className: 'user-single' },
				React.createElement(
					'span',
					null,
					index + 1
				),
				React.createElement(
					'a',
					{ href: 'https://www.freecodecamp.com/' + item.username, target: '_blank' },
					React.createElement('img', { src: item.img }),
					React.createElement(
						'span',
						null,
						item.username
					)
				),
				React.createElement(
					'span',
					null,
					item.alltime
				)
			);
		}
	};

	Table.prototype.render = function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'thead' },
				React.createElement(
					'span',
					null,
					'#'
				),
				React.createElement(
					'span',
					null,
					'Camper'
				),
				React.createElement(
					'span',
					null,
					'Points'
				)
			),
			this.props.data.map(this.createCamper)
		);
	};

	return Table;
}(React.Component);

;

var Application = function (_React$Component2) {
	_inherits(Application, _React$Component2);

	function Application() {
		_classCallCheck(this, Application);

		var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this));

		_this2.state = {
			users: []
		};
		return _this2;
	}

	Application.prototype.componentDidMount = function componentDidMount() {
		this.serverRequest = $.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function (result) {
			this.setState({
				users: result,
				order: ''
			});
		}.bind(this));
	};

	Application.prototype.sortCampers = function sortCampers(e) {
		if (e.target.value == 'recent') {
			this.setState({
				users: this.state.users.sort(function (a, b) {
					return a.recent - b.recent;
				}).reverse(),
				order: 'recent'
			});
			return;
		}
		this.setState({
			users: this.state.users.sort(function (a, b) {
				return a.alltime - b.alltime;
			}).reverse(),
			order: 'all-time'
		});
	};

	Application.prototype.render = function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'header',
				null,
				React.createElement('img', { src: 'https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg' }),
				React.createElement(
					'div',
					null,
					'Camper Leaderboard'
				)
			),
			React.createElement(
				'div',
				{ className: 'content-wrapper' },
				React.createElement(
					'label',
					null,
					'Sort By:'
				),
				React.createElement(
					'select',
					{ onChange: this.sortCampers.bind(this) },
					React.createElement(
						'option',
						{ value: 'allTime' },
						'All time points'
					),
					React.createElement(
						'option',
						{ value: 'recent' },
						'Points in the last 30 days'
					)
				),
				React.createElement(Table, { option: this.state.order, data: this.state.users })
			)
		);
	};

	return Application;
}(React.Component);

React.render(React.createElement(Application, null), document.getElementById('app'));
