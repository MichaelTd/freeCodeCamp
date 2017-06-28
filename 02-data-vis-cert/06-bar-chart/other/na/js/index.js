'use strict';

var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

var margin = {
  top: 5,
  right: 30,
  bottom: 30,
  left: 50
};

var width = d3.select(".card").node().getBoundingClientRect().width - margin.right - margin.left;
var _height = document.documentElement.clientWidth <= 768 ? 250 : 500 - margin.top - margin.bottom;

var colors = {
  bar: '#5AA364',
  highlight: '#84F092'
};

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function buildGraph(ds) {
  var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function (d, dateString) {
    return '<strong>$' + d[1] + ' Billion</strong><br><span>' + dateString + '</span>';
  });

  var minDate = new Date(ds[0][0]);
  var maxDate = new Date(ds[ds.length - 1][0]);

  var xScale = d3.time.scale().domain([minDate, maxDate]).range([0, width]);

  var yScale = d3.scale.linear().domain([0, d3.max(ds, function (d) {
    return d[1];
  })]).range([_height, 0]);

  var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').ticks(d3.time.years, 5);
  var yAxisGen = d3.svg.axis().scale(yScale).orient('left');

  var svg = d3.select('.chart').attr({
    width: width + margin.right + margin.left,
    height: _height + margin.top + margin.bottom
  }).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').call(tip);

  var xAxis = svg.append('g').call(xAxisGen).attr({
    class: 'x axis',
    transform: 'translate(0, ' + _height + ')'
  });

  var yAxis = svg.append('g').call(yAxisGen).attr({
    class: 'y axis'
  });

  var viz = svg.selectAll('.bar').data(ds).enter().append('rect').attr({
    class: 'bar',
    x: function x(d) {
      return xScale(new Date(d[0]));
    },
    y: function y(d) {
      return yScale(d[1]);
    },
    width: Math.ceil(width / ds.length),
    height: function height(d) {
      return _height - yScale(d[1]);
    },
    fill: colors.bar
  }).on('mouseover', function (d) {
    var parsed = new Date(d[0]);
    var dateString = parsed.getFullYear() + ' - ' + monthNames[parsed.getMonth()];

    d3.select(this).attr('fill', colors.highlight);
    tip.show(d, dateString);
  }).on('mouseout', function (d) {
    d3.select(this).attr('fill', colors.bar);
    tip.hide(d);
  });
}

d3.json(dataUrl, function (err, data) {
  if (err) throw err;

  buildGraph(data.data);
});