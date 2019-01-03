$(document).ready(function () {

  var objectHolder = {
    gameObject: {
      url: "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json",
      title: "Video Game Sales",
      description: "Top 100 Most Sold Video Games Grouped by Platform" },

    movieObject: {
      url: "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json",
      title: "Movie Sales",
      description: "Top 100 Highest Grossing Movies Grouped By Genre" },

    kickstarterObject: {
      url: "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json",
      title: "Kickstarter Pledges",
      description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category" } };



  var currentData = "game";

  var width = 960;
  var height = 593;
  var legendWidth = 700;
  var legendHSpacing = 150;
  var legendVSpacing = 10;
  var legendRectSize = 20;

  var legendElemsPerRow = Math.floor(legendWidth / legendHSpacing);

  var fader = function fader(color) {return d3.interpolateRgb(color, "#fff")(0.2);};
  var color = d3.scaleOrdinal(d3.schemeCategory20.map(fader));

  var svg = d3.select("#plot").
  append("svg").
  attr("id", "treemap").
  attr("width", width).
  attr("height", height);

  var legend = d3.select("#plot").
  append("svg").
  attr("id", "legend").
  attr("width", legendWidth);

  var tooltip = d3.select("body").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);

  var treemap = d3.treemap().
  size([width, height]).
  paddingInner(1);

  var drawTreemap = function drawTreemap(obj) {
    $("#title").html(obj.title);
    $("#description").html(obj.description);

    d3.json(obj.url, function (error, data) {
      if (error) throw error;

      var root = d3.hierarchy(data).
      sum(function (d) {return d.value;}).
      sort(function (a, b) {return b.height - a.height || b.value - a.value;});

      var leaves = root.leaves();

      treemap(root);

      var cell = svg.selectAll("g").
      data(leaves).
      enter().
      append("g").
      attr("class", "cell").
      attr("transform", function (d) {return "translate(" + d.x0 + "," + d.y0 + ")";});

      var tile = cell.append("rect").
      attr("class", "tile").
      attr("data-name", function (d) {return d.data.name;}).
      attr("data-category", function (d) {return d.data.category;}).
      attr("data-value", function (d) {return d.data.value;}).
      attr("width", function (d) {return d.x1 - d.x0;}).
      attr("height", function (d) {return d.y1 - d.y0;}).
      attr("fill", function (d) {return color(d.data.category);});

      var text = cell.append("text").
      attr("class", "tile-text").
      selectAll("tspan").
      data(function (d) {return d.data.name.split(/(?=[A-Z][^A-Z])/g);}).
      enter().
      append("tspan").
      attr("x", 4).
      attr("y", function (d, i) {return 13 + i * 10;}).
      text(function (d) {return d;});

      cell.on("mouseover", function (d) {
        tooltip.style("opacity", 0.9).
        attr("data-value", d.data.value).
        html("Name: " + d.data.name + "<br>Category: " +
        d.data.category + "<br>Value: " + d.data.value);
      }).on("mouseout", function (d) {
        tooltip.style("opacity", 0);
      });

      var legendCategories = leaves.map(function (n) {return n.data.category;}).
      filter(function (c, i, s) {return s.indexOf(c) === i;});

      var legendGroups = legend.append("g").
      attr("transform", "translate(100, 10)").
      selectAll("g").
      data(legendCategories).
      enter().
      append("g").
      attr("class", "group").
      attr("transform", function (d, i) {return "translate(" +
        i % legendElemsPerRow * legendHSpacing +
        "," + (Math.floor(i / legendElemsPerRow) * legendRectSize +
        legendVSpacing * Math.floor(i / legendElemsPerRow)) +
        ")";});

      var legendRects = legendGroups.append("rect").
      attr("class", "legend-item").
      attr("fill", function (d) {return color(d);}).
      attr("stroke", "black").
      attr("width", legendRectSize).
      attr("height", legendRectSize);

      var legendText = legendGroups.append("text").
      text(function (d) {return d;}).
      attr("fill", "white").
      attr("x", legendRectSize + 3).
      attr("y", legendRectSize - 4);

    });
  };

  $(document).on('mousemove', function (e) {
    $("#tooltip").css({
      left: e.pageX,
      top: e.pageY });

  });

  $(".selection").on("click", function (e) {
    var $this = $(e.currentTarget);
    var obj = $this.attr("id") + "Object";
    $("#treemap").empty();
    $("#legend").empty();
    drawTreemap(objectHolder[obj]);
  });

  drawTreemap(objectHolder.gameObject);

});