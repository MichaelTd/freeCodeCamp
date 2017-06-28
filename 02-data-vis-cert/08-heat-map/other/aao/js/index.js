var margin = {top: 20, right: 100, bottom: 45, left: 100},
    width = 1250 - margin.left - margin.right,
    height = 545 - margin.top - margin.bottom;

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(error, data) {
  if (error) { throw error; }

  data = data.monthlyVariance;

  var parseMonth = d3.time.format("%B").parse;
  var parseYear = d3.time.format("%Y").parse;
  var formatYear = d3.time.format("%Y");
  var formatMonth = d3.time.format("%b");
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  var colors = ["#5afffa","#f5fffa","#ADD8E6","#2a52be","#96cdcd","#FAFAD2","#FFDAB9","#008080","#778899","#f08080","#ff4444"];

  var colorScale = d3.scale.quantile()
  .domain([d3.min(data, function (d) { return d.variance; }), d3.max(data, function (d) { return d.variance; })])
  .range(colors);

  var x = d3.time.scale()
  .domain([new Date(String(data[0].year)), new Date(String(data[data.length - 1].year))])
  .range([0, width]);


  var svg = d3.select(".chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return d.year + " - " + String(new Date(String(d.month))).slice(4, 7) + "<div class='abs-temp'>" + eval(8.66 + d.variance).toFixed(3) + "℃</div><div class='real-temp'>" + d.variance + "℃</div>";
  });
  
  svg.call(tip);
  
  var monthLabels = svg.selectAll(".monthLabel")
  .data(months)
  .enter().append("text")
  .attr('class','mini-label')
  .text(function (d) { return d; })
  .attr("x", 0)
  .attr("y", function (d, i) { return i * 40; })
  .style("text-anchor", "end")
  .attr("transform", "translate(-6," + 40 / 1.5 + ")");

  var rectangles = svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect"); 

  rectangles
    .attr("x", function(d){
    return (d.year - data[0].year) * 4; 

  })
    .attr("y", function(d){
    return (d.month - 1) * 40; 
  })

    .attr("class", "tile")
    .attr("width", 4)
    .attr("height", 40). 
  style("fill", function(d){
    return colorScale(d.variance); 
  }).on('mouseover', tip.show)
    .on('mouseout', tip.hide);;

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height) + ")")
    .call(d3.svg.axis().scale(x).ticks(d3.time.years, 10).tickFormat(formatYear).orient("bottom"))
    .append("text")
    .attr("class", "label")
    .attr("x", width / 2)
    .attr("y", 45)
    .attr("text-anchor", "end")
    .text("Years");

  svg.append("g")
    .attr("class", "y axis")
    .append("text").text("Months")
    .attr("class", "label")
    .attr("y", -55)
    .attr("x", -height / 2)
    .attr("dy", ".31em")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)");

  var legend = svg.selectAll(".legend")
  .data([0].concat(colorScale.quantiles()), function(d) { return d; })
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(" + (width + 20) + "," + (20 + i * 20) + ")"; });

  legend.append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .style("fill", function(d, i) { return colors[i]; });

  legend.append("text")
    .attr("x", 26)
    .attr("y", 10)
    .attr("dy", ".35em")
    .text(function(d) { return "≥ " + Math.round(d); });
  
});