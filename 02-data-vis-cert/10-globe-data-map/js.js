"use strict";

var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";
d3.json(url, function (json) {
  var data = json;
  var height = 500;
  var width = 1000;
  var radius = 8;
  var svg = d3.select("svg");
  var g = svg.append("g");

  var projection = d3.geo.equirectangular() //tells d3 that we are using a rectangular full map for geolocation
    .scale(133).translate([width / 2 - 19, height / 2 + 43]) //tell the systemt that the point 0,0 is in the middle
    .precision(.2);

  var path = d3.geo.path().projection(projection);

  var worldMap = g.append("image").attr("xlink:href", "https://openclipart.org/image/2400px/svg_to_png/1733/molumen-world-map-1.png").attr("x", 5).attr("width", 1000).attr("height", 500 * .95);

  var toolT = d3.select("#tooltip").style("opacity", 0);
  g.selectAll("circle").data(data.features).enter().append("circle").style("opacity", .7).attr("transform", function (d) {
    if (d.geometry == null) {
      return null;
    } else {
      return "translate(" + projection([d.geometry.coordinates[0], d.geometry.coordinates[1] * 1.23]) + ")";
    }
  }).attr("r", function (d, i) {
    return Math.pow(d.properties.mass, .3) / 7.5 + 1;
  }).attr("fill", function (d, i) {
    if (d.properties.recclass[0] == "C") {
      return "#9933ff";
    }
    if (d.properties.recclass[0] == "I") {
      return "#660033";
    }
    if (d.properties.recclass[0] == "H") {
      return "#996600";
    }
    if (d.properties.recclass[0] == "L") {
      return "#0000cc";
    }
    if (d.properties.recclass[0] == "E") {
      return "#ffff00";
    }
    if (d.properties.recclass[0] == "S") {
      return "#00ffcc";
    }
    return "green";
  }).attr("stroke", "white").attr("stroke-width", "0.3")
  //tooltip function here
  .on("mouseover", function (d, i) {
    toolT.transition().duration(300).style("opacity", .9);
    toolT.html("Name: <small>" + d.properties.name + "</small></br>" + "Mass: <small>" + d.properties.mass + "</small></br>" + "Recclass: <small>" + d.properties.recclass + "</small></br>" + "Year: <small>" + d.properties.year + "</small></br>" + "Fall: <small>" + d.properties.fall + "</small></br>").style("left", d3.event.pageX + 20 + "px").style("top", d3.event.pageY - 88 + "px");
  }).on("mouseout", function (d) {
    toolT.transition().duration(500).style("opacity", 0);
  });

  //add zoom
  var zoom = d3.behavior.zoom().scaleExtent([1, 20]).on("zoom", zoomed);

  // This invisible rect for zoom
  zoom(svg);

  function zoomed() {
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
});
