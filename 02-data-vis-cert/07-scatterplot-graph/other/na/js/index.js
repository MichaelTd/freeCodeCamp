'use strict';

var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

var margin = {
  top: 25,
  right: 120,
  bottom: 50,
  left: 50
};

var width = d3.select(".card").node().getBoundingClientRect().width - margin.right - margin.left;
var height = 650 - margin.top - margin.bottom;
var colors = {
  circle: '#3498db',
  highlight: '#84F092'
};

function buildGraph(ds) {
  var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function (d) {
    return '<span><strong>' + d.Name + '</strong>: ' + d.Nationality + '</span><br/>Year: ' + d.Year + ', Time: ' + d.Time + '<br/><br/><em>' + d.Doping + '</em>';
  });

  var formatMinutes = function formatMinutes(d) {
    var minutes = Math.floor(d / 60);
    var seconds = d - minutes * 60;
    var output = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);

    return output;
  };

  var minSeconds = d3.min(ds, function (d) {
    return d.Seconds;
  });

  var xScale = d3.scale.linear().domain([d3.max(ds, function (d) {
    return d.Seconds;
  }) - minSeconds + 20, d3.min(ds, function (d) {
    return d.Seconds;
  }) - minSeconds]).range([0, width]);

  var yScale = d3.scale.linear().domain([d3.max(ds, function (d) {
    return d.Place + 1;
  }), d3.min(ds, function (d) {
    return d.Place;
  })]).range([height, 0]);

  var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(formatMinutes).ticks(6);
  var yAxisGen = d3.svg.axis().scale(yScale).orient('left');

  var svg = d3.select('.chart').attr({
    width: width + margin.right + margin.left,
    height: height + margin.top + margin.bottom
  }).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').call(tip);

  var xAxis = svg.append('g').call(xAxisGen).attr({
    class: 'x axis',
    transform: 'translate(0, ' + height + ')'
  });

  var yAxis = svg.append('g').call(yAxisGen).attr({
    class: 'y axis'
  });

  // transform: `translate(${margin.left}, 0)`
  svg.append("text").attr({
    'text-anchor': 'middle',
    'transform': 'translate(-30, 20)rotate(-90)'
  }).text('Ranking');

  svg.append("text").attr({
    'text-anchor': 'middle',
    'transform': 'translate(' + width / 2 + ', ' + (height + 43) + ')'
  }).text('Minutes Behind Fastest Time');

  var viz = svg.selectAll('.circle').data(ds).enter().append('circle').attr({
    class: 'circle',
    cx: function cx(d) {
      return xScale(d.Seconds - minSeconds);
    },
    cy: function cy(d) {
      return yScale(d.Place);
    },
    r: 5,
    fill: function fill(d) {
      return d.Doping ? 'red' : 'black';
    }
  }).on('mouseover', function (d) {
    d3.select(this).attr({
      'stroke': '#000',
      'stroke-width': '2px'
    });
    tip.show(d);
  }).on('mouseout', function (d) {
    d3.select(this).attr('stroke', null);
    tip.hide(d);
  });

  var labels = svg.selectAll('.label').data(ds).enter().append('text').attr({
    x: function x(d) {
      return xScale(d.Seconds - minSeconds) + 10;
    },
    y: function y(d) {
      return yScale(d.Place) + 4;
    },
    'font-size': '10px'
  }).text(function (d) {
    return d.Name;
  });

  // Legend
  svg.append('circle').attr({
    transform: 'translate(30,20)',
    cx: 0,
    cy: 0,
    r: 5,
    fill: 'red'
  });

  svg.append("text").attr({
    'text-anchor': 'middle',
    'transform': 'translate(120, 25)',
    'font-size': '12px'
  }).text('Riders with doping allegations');

  svg.append('circle').attr({
    transform: 'translate(30,23)',
    cx: 0,
    cy: 15,
    r: 5,
    fill: 'black'
  });

  svg.append("text").attr({
    'text-anchor': 'middle',
    'transform': 'translate(98, 43)',
    'font-size': '12px'
  }).text('No doping allegations');
}

d3.json(dataUrl, function (err, data) {
  if (err) throw err;

  buildGraph(data);
});