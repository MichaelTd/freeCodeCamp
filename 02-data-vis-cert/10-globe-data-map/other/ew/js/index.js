'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

for (var r in ReactBootstrap) {
	if (!window.hasOwnProperty(r) && r !== '__esModule') window[r] = ReactBootstrap[r];
}
var Application = function (_React$PureComponent) {
	_inherits(Application, _React$PureComponent);

	function Application() {
		_classCallCheck(this, Application);

		for (var _len = arguments.length, _ = Array(_len), _key = 0; _key < _len; _key++) {
			_[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(_)));

		_this.state = {
			w: 500,
			h: 450,
			worldmap: undefined,
			meteorite: undefined,
			tooltipShow: false,
			tooltipHTML: '',
			tooltipX: 0,
			tooltipY: 0,
			d3Update: true
		};
		return _this;
	}

	Application.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		d3.select('#svg-wrap').append('svg').attr('width', this.state.w).attr('height', this.state.h);
		d3.json(this.props.url.worldmap, function (data) {
			return _this2.setState({ worldmap: data });
		});
		d3.json(this.props.url.meteorite, function (data) {
			return _this2.setState({ meteorite: data });
		});
	};

	Application.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
		var _this3 = this;

		if (typeof this.state.worldmap === 'undefined' || typeof this.state.meteorite === 'undefined' || this.state.d3Update === false) return;
		var w = this.state.w,
		    h = this.state.h;
		var svg = d3.select('#svg-wrap svg');
		var col = d3.schemeCategory20b; // colors
		var plane = svg.append('g').attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')').append('g'); // XY Plane
		var proj = d3.geoOrthographic().translate([0, 0]).scale(h / 2 - 10).rotate([0, 0, 0]); // Projection (Globe)
		var sky = d3.geoOrthographic().translate([0, 0]).scale(h / 2 + 10).rotate([0, 0, 0]); // Projection (Sky)
		var path = d3.geoPath().projection(proj); // path generator
		var countries = topojson.feature(this.state.worldmap, this.state.worldmap.objects.countries).features; // World Map
		var meteorites = this.state.meteorite.features;
		var $this = this;

		var min = d3.min(meteorites, function (d) {
			return parseInt(d.properties.mass);
		});
		var max = d3.max(meteorites, function (d) {
			return parseInt(d.properties.mass);
		});

		var circleScale = d3.scaleLinear().clamp([true]).domain([min, max / 200]).range([0.3, 6]);

		var globeBase = plane.append('circle').style('fill', '#1b3249').attr('cx', 0).attr('cy', 0).attr('r', h / 2 - 10);
		var globe = plane.append('g').selectAll('path').data(countries).enter().insert('path').style('fill', '#29abe0').attr('stroke', 'black').attr('stroke-width', '0.2').attr('d', path);
		var highlight = svg.append("defs").append("radialGradient") // http://angrytools.com/gradient/
		.attr("id", "highlight").attr("cx", "75%").attr("cy", "25%");
		highlight.append("stop").attr("offset", "5%").attr("stop-color", "white").attr("stop-opacity", "0.6");
		highlight.append("stop").attr("offset", "100%").attr("stop-color", "#dedede").attr("stop-opacity", "0.2");
		var circleHighlight = globe.append('circle').style('opacity', 0.5).attr('fill', 'url(#highlight)').attr('cx', w / 2).attr('cy', h / 2).attr('r', proj.scale());

		function circle(r, properties) {
			var points = [];
			for (var angle = 0.0; angle <= 2 * Math.PI; angle = angle + 0.3) {
				var x = r * Math.cos(angle);
				var y = r * Math.sin(angle);
				points.push(sky([properties.reclong - x, properties.reclat - y]));
			}
			return points.join(',');
		}

		var circles = plane.append('g').selectAll('polygon').data(meteorites).enter().insert('polygon').style('fill', function (_, indx) {
			var color = d3.color(col[indx % 20]);
			color.opacity = 0.5;
			return color;
		}).attr('points', function (d) {
			return circle(0.1, d.properties);
		}).style('display', function (d) {
			return path(d) === undefined ? 'none' : 'block';
		}).attr('stroke', function (_, indx) {
			return col[indx % 20];
		}).attr('stroke-width', 1);
		circles.on('mouseover', function (d) {
			if (svg.hasOwnProperty('mMove')) return;
			$this.setState({
				tooltipShow: true,
				tooltipX: d3.event.clientX - 200,
				tooltipY: d3.event.clientY - 40,
				tooltipHTML: React.createElement(
					'span',
					null,
					React.createElement(
						'strong',
						null,
						'Name:'
					),
					d.properties.name,
					React.createElement('br', null),
					React.createElement(
						'strong',
						null,
						'Year:'
					),
					new Date(d.properties.year).getFullYear(),
					React.createElement('br', null),
					React.createElement(
						'strong',
						null,
						'Class.:'
					),
					d.properties.recclass,
					React.createElement('br', null),
					React.createElement(
						'strong',
						null,
						'Mass:'
					),
					d.properties.mass,
					'g'
				)
			});
		}).on('mouseout', function (d) {
			return _this3.setState({ tooltipShow: false });
		});
		circles.transition().attr('points', function (d) {
			return circle(circleScale(parseInt(d.properties.mass || 0)), d.properties);
		}).duration(function (_, indx) {
			return 10 * indx;
		}).ease(d3.easeBounce);

		var angleOnX = d3.scaleLinear().domain([0, w]).range([-180, 180]);
		var angleOnY = d3.scaleLinear().domain([0, h]).range([90, -90]);
		svg.on('mousedown', function (_) {
			if (!svg.hasOwnProperty('degree')) svg.degree = {
				x: 0,
				y: 0
			};
			svg.mMove = true;
			svg.mClientX = d3.event.clientX;
			svg.mClientY = d3.event.clientY;
		});
		d3.select(window).on('mousemove', function (_) {
			// Code can be optimized :/ .. later, later
			if (!svg.hasOwnProperty('mMove')) return;
			var x = svg.mClientX - d3.event.clientX; // x<0 is right, x>0 is left
			var y = svg.mClientY - d3.event.clientY;
			svg.mClientX = d3.event.clientX;
			svg.mClientY = d3.event.clientY;
			if (x < 0) svg.degree.x = svg.degree.x + 4;
			if (x > 0) svg.degree.x = svg.degree.x - 4;
			if (y < 0) svg.degree.y = svg.degree.y - 4;
			if (y > 0) svg.degree.y = svg.degree.y + 4;
			if (svg.degree.x < 0) svg.degree.x * -1;
			if (svg.degree.y < 0) svg.degree.y * -1;
			svg.degree = {
				x: svg.degree.x % 360,
				y: svg.degree.y % 360
			};
			proj.rotate([svg.degree.x, svg.degree.y, 0]);
			sky.rotate([svg.degree.x, svg.degree.y, 0]);
			globe.attr('d', path); // update graphic
			circles.interrupt().style('display', function (d) {
				return path(d) === undefined ? 'none' : 'block';
			}).attr('points', function (d) {
				return circle(circleScale(parseInt(d.properties.mass || 0)), d.properties);
			});
		}).on('mouseup', function (_) {
			delete svg.mMove;
		});

		this.setState({ d3Update: false });
	};

	Application.prototype.render = function render() {
		return React.createElement(
			Grid,
			null,
			React.createElement(
				Row,
				null,
				React.createElement(
					Col,
					{ xs: 12 },
					React.createElement(
						Tooltip,
						{ id: 'tooltip', className: 'in', placement: 'left',
							style: {
								display: this.state.tooltipShow ? 'block' : 'none',
								position: 'fixed',
								left: this.state.tooltipX,
								top: this.state.tooltipY,
								width: 165
							}
						},
						this.state.tooltipHTML
					),
					React.createElement('div', { id: 'svg-wrap' })
				)
			)
		);
	};

	return Application;
}(React.PureComponent);

var AppNavbar = React.createElement(
	Navbar,
	{ inverse: true, staticTop: true },
	React.createElement(
		Navbar.Header,
		null,
		React.createElement(
			Navbar.Brand,
			null,
			React.createElement(
				'a',
				{ href: 'https://codepen.io/eddyw/', target: '_blank' },
				'Meteorite Landings Across the Globe'
			)
		),
		React.createElement(Navbar.Toggle, null)
	),
	React.createElement(
		Navbar.Collapse,
		null,
		React.createElement(
			Navbar.Form,
			{ pullRight: true },
			React.createElement(
				Button,
				{ target: '_blank', href: 'https://www.freecodecamp.com/eddyw' },
				'FreeCodeCamp'
			),
			' | ',
			React.createElement(
				Button,
				{ target: '_blank', href: 'https://www.linkedin.com/in/ieddyw' },
				'LinkedIn'
			),
			' | ',
			React.createElement(
				Button,
				{ target: '_blank', href: 'https://codepen.io/eddyw' },
				'Codepen.io'
			)
		)
	)
);
ReactDOM.render(AppNavbar, document.getElementById('navbar'));
ReactDOM.render(React.createElement(Application, {
	url: {
		worldmap: 'https://gist.githubusercontent.com/eddyw/bd31bfb563c2356d32d69efe363fc07b/raw/cf9245ca33b54f32f64ad600986acd40f5f6799d/eddyw-world-110m.json',
		meteorite: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json'
	}
}), document.getElementById('webapp'));