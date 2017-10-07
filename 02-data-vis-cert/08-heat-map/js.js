'use strict';

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', function (d) {
  plot(d);
});

var plot = function plot(data) {

  var margin = { top: 120, right: 35, bottom: 100, left: 105 };

  var width = 1200 - margin.right - margin.left,
      height = 600 - margin.top - margin.bottom;

  var middleX = (margin.left + width + margin.right) / 2;

  var legendWidth = 400,
      legendHeight = 20,
      legendOffset = 40;

  var tooltipWidth = 130,
      tooltipHeight = 80;

  var baseTemp = data.baseTemperature;
  data = data.monthlyVariance;

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Colors from http://colorbrewer2.org
  var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];
  var colorScale = d3.scaleQuantile().domain(d3.extent(data, function (d) {
    return d.variance;
  })).range(colors);

  var legendScale = d3.scaleQuantile().domain(d3.extent(data, function (d) {
    return d.variance;
  })).range(d3.range(0, legendWidth, legendWidth / 11));

  var legendTickScale = d3.scaleBand().domain(legendScale.range().map(function (d) {
    var quantiles = legendScale.invertExtent(d);
    return ((quantiles[0] + quantiles[1]) / 2 + baseTemp).toFixed(1);
  })).range([0, legendWidth]);

  var xScale = d3.scaleBand().domain(d3.range(d3.min(data, function (d) {
    return d.year;
  }), d3.max(data, function (d) {
    return d.year;
  }) + 1)).range([0, width]);

  var yScale = d3.scaleBand().domain(d3.range(1, 13)).range([0, height]);

  var svg = d3.select('#chart').append('svg').classed('center-block', true).attr('width', margin.left + width + margin.right).attr('height', margin.top + height + margin.bottom);

  var grid = svg.append('g').classed('grid', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').selectAll('rect').data(data).enter().append('rect').classed('cell', true).attr('transform', function (d) {
    return 'translate(' + xScale(d.year) + ', ' + yScale(d.month) + ')';
  }).attr('width', xScale.bandwidth()).attr('height', yScale.bandwidth()).style('fill', function (d) {
    return colorScale(d.variance);
  }).on('mouseover', function (d) {
    tooltipDate.text(function () {
      return months[d.month - 1] + " " + d.year;
    });
    tooltipTemperature.text(function () {
      return 'Temp: ' + (baseTemp + d.variance).toFixed(3) + '℃';
    });
    tooltipVariance.text(function () {
      return 'Variance: ' + d.variance.toFixed(3) + '℃';
    });
    var mousePosition = d3.mouse(svg.node());
    tooltip.attr('transform', 'translate(' + (mousePosition[0] - tooltipWidth + margin.right - 5) + ', ' + (mousePosition[1] - tooltipHeight - 5) + ')').transition().style('opacity', 1);
  }).on('mouseout', function (d) {
    tooltip.transition().style('opacity', 0);
  });

  var hScale = d3.scaleLinear().domain(d3.extent(data, function (d) {
    return d.year;
  })).range([0, width]);

  var tickValues = data.map(function (d) {
    return d.year;
  }).filter(function (d, i, arr) {
    return d % 10 === 0 && arr.indexOf(d) === i;
  });

  var hAxis = d3.axisBottom(hScale).tickValues(tickValues);
  svg.append('g').classed('h-axis', true).attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')').call(hAxis);

  var vAxis = d3.axisLeft(yScale).tickFormat(function (d) {
    return months[d - 1];
  });
  svg.append('g').classed('v-axis', true).attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')').call(vAxis);

  var legend = svg.append('g').classed('legend', true).attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height + legendOffset) + ')').selectAll('rect').data(data).enter().append('rect').classed('legend-cell', true).attr('width', legendWidth / 11).attr('height', legendHeight).style('fill', function (d) {
    return colorScale(d.variance);
  }).attr('transform', function (d) {
    return 'translate(' + (width - legendWidth + legendScale(d.variance)) + ', 0)';
  });

  var heading = svg.append('g').classed('heading', true).attr('transform', 'translate(' + (margin.left + width + margin.right) / 2 + ', 0)').attr('text-anchor', 'middle');
  heading.append('text').classed('h1 center-block', true).attr('transform', 'translate(0, 45)').text('Monthly Global Land-Surface Temperature');
  heading.append('text').classed('h2 center-block', true).attr('transform', 'translate(0, 75)').text('1753 - 2015');
  heading.append('text').classed('center-block', true).attr('transform', 'translate(0, 95)').text('Temperatures are in Celsius and reported as anomalies relative to the Jan 1951 - Dec 1980 average.');
  heading.append('text').classed('center-block', true).attr('transform', 'translate(0, 110)').text('Estimated Jan 1951-Dec 1980 absolute temperature: 8.66℃ +/- 0.07℃');

  var legendAxis = d3.axisBottom(legendTickScale);
  svg.append('g').classed('legend-axis', true).attr('transform', 'translate(' + (margin.left + width - legendWidth) + ', ' + (margin.top + height + legendOffset + legendHeight) + ')').call(legendAxis);

  var tooltip = svg.append('g').classed('tooltip', true).style('opacity', 0);

  tooltip.append('rect').classed('tooltip-rect', true).attr('width', tooltipWidth).attr('height', tooltipHeight).attr('rx', 10).attr('ry', 10);

  var tooltipDate = tooltip.append('text').classed('tooltip-text', true).attr('x', tooltipWidth / 2).attr('y', '1.5em').attr('text-anchor', 'middle');

  var tooltipTemperature = tooltip.append('text').classed('tooltip-text', true).attr('x', tooltipWidth / 2).attr('y', '3em').attr('text-anchor', 'middle');

  var tooltipVariance = tooltip.append('text').classed('tooltip-text', true).attr('x', tooltipWidth / 2).attr('y', '4.5em').attr('text-anchor', 'middle');
};
