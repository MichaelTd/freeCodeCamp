
var eduColors = ["#fbebad",
                "#d2d98e",
                "#b0cb76",
                "#96bf62",
                "#76b24b",
                "#60a83a",
                "#51a22f",
                "#469d27"];

function getColorForEduLevel(eduLevel, legendTicks) {
  var threshold = (legendTicks[1] - legendTicks[0]) * 100;
  var eduMin = legendTicks[0] * 100;
  return eduColors[Math.floor((eduLevel - eduMin) / threshold)];
}

function getEduDataForCounty(countyID, eduData) {
  return eduData.find(function (elem) {return elem.fips == countyID;});
}

// Returns the min amount for each color on the legend
function calcLegendCounts(eduData) {
  // get min and max of educational levels
  var eduMin = d3.min(eduData, function (d) {return d.bachelorsOrHigher;});
  var eduMax = d3.max(eduData, function (d) {return d.bachelorsOrHigher;});
  var threshold = (eduMax - eduMin) / eduColors.length;
  var counts = [];
  for (var i = 0; i < eduColors.length; i++) {
    counts.push((eduMin + threshold * i) / 100);
  }
  return counts;
}

function createChart(eduData, countyData) {
  var chartWidth = 950,chartHeight = 620;

  var chart = d3.select("#container").
  append("svg").
  attr("width", chartWidth).
  attr("height", chartHeight);

  // legend
  var legendWidth = 300,legendHeight = 10;
  // legend counts are needed to pick colors for counties
  var legendCounts = calcLegendCounts(eduData);

  var legend = chart.append("g").
  attr("id", "legend").
  attr("transform", "translate(560, 40)");
  legend.selectAll("rect").
  data(legendCounts).
  enter().
  append("rect").
  attr("class", "legend-box").
  attr("x", function (d, i) {return legendWidth / eduColors.length * i;}).
  attr("width", legendWidth / eduColors.length).
  attr("height", legendHeight).
  attr("fill", function (d, i) {return eduColors[i];});

  // legend axis
  var legendScale = d3.scaleLinear().
  domain([legendCounts[0], legendCounts[eduColors.length - 1] + (legendCounts[1] - legendCounts[0])]).
  range([0, legendWidth]);
  var legendAxis = d3.axisTop(legendScale).
  tickValues(legendCounts).
  tickFormat(d3.format(".0%"));
  legend.append("g").
  call(legendAxis).
  attr("class", "legend-axis");

  var nation = chart.append("g");
  var stateBorders = chart.append("g");
  var pathGenerator = d3.geoPath();

  // counties
  nation.selectAll("path").
  data(topojson.feature(countyData, countyData.objects.counties).features).
  enter().
  append("path").
  attr("class", "county").
  attr("data-fips", function (d) {return d.id;}).
  attr("data-education", function (d) {return getEduDataForCounty(d.id, eduData).bachelorsOrHigher;}).
  attr("fill", function (d) {return getColorForEduLevel(getEduDataForCounty(d.id, eduData).bachelorsOrHigher, legendCounts);}).
  attr("d", pathGenerator).
  on("mouseover", function (d) {
    // show and update tooltip
    var mousePos = d3.mouse(this);
    var ed = getEduDataForCounty(d.id, eduData);
    var tt = chart.select("#tooltip");
    var ttText = tt.select("text");
    ttText.
    html(ed.area_name + " " + ed.state + ": " + ed.bachelorsOrHigher + "%");
    var textBBox = tt.select("text").node().getBBox();
    var ttWidth = textBBox.width + 20;
    tt.
    style("opacity", 0.8).
    attr("transform", "translate(" + (
    mousePos[0] - (mousePos[0] > chartWidth - ttWidth ? ttWidth : 0)) + ", " +
    mousePos[1] + ")").
    attr("data-education", ed.bachelorsOrHigher);
    tt.select("rect").
    attr("width", ttWidth);
  }).
  on("mouseout", function () {
    // hide tooltip
    chart.select("#tooltip").
    style("opacity", 0);
  }).
  on("mousemove", function () {
    // update tooltip position
    var maxX = chartWidth - chart.select("#tooltip").select("rect").attr("width");
    chart.select("#tooltip").
    attr("transform", "translate(" +
    Math.min(d3.mouse(this)[0], maxX) + "," +
    d3.mouse(this)[1] +
    ")");
  });

  // state borders
  stateBorders.selectAll("path").
  data(topojson.feature(countyData, countyData.objects.states).features).
  enter().
  append("path").
  attr("class", "state").
  attr("d", pathGenerator);

  // tooltip
  var tooltip = chart.append("g").
  attr("id", "tooltip").
  style("opacity", 0);
  tooltip.append("rect").
  attr("class", "tooltip-box");
  tooltip.append("text").
  attr("class", "tooltip-text").
  attr("transform", "translate(10, 20)");
}

// Send requests for both data files, and init the chart when both are completed
window.onload = function () {
  var eduData = null,countyData = null;

  var eduRequest = new XMLHttpRequest();
  eduRequest.open("GET", "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json");
  eduRequest.responseType = "json";
  eduRequest.send();
  eduRequest.onload = function () {
    eduData = eduRequest.response;
    if (eduData != null && countyData != null) {
      createChart(eduData, countyData);
    }
  };

  var countyRequest = new XMLHttpRequest();
  countyRequest.open("GET", "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json");
  countyRequest.responseType = "json";
  countyRequest.send();
  countyRequest.onload = function () {
    countyData = countyRequest.response;
    if (eduData != null && countyData != null) {
      createChart(eduData, countyData);
    }
  };
};  
