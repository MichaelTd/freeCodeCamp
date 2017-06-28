// JavaScript Document

var d3 = d3;

var bardata = []
var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"

d3.json(url, function(error, json){
	
	if (error) return console.warn(error);
	var data = json;
	var format = d3.time.format("%Y-%m-%d");
	
	
	
	data.data.map(function(value) {
			
			var val = {
				DATE: format.parse(value[0]),
				VALUE: value[1]
			};
			bardata.push(val);
		}	
	);
    
    var margin = { top: 30, right: 30, bottom: 40, left:70 };

    var height = 600 - margin.top - margin.bottom,
        width = 900 - margin.left - margin.right;
    

    var tempColor;

    var colors = d3.scale.linear()
    .domain([0, bardata.length *0.33, bardata.length *0.66, bardata.length])
    .range(['#B58929','#C61C6F', '#268BD2', '#85992C']);

    var yScale = d3.scale.linear()
            .domain([0, d3.max(bardata, function (d){
												return d.VALUE;	
											}
			)])
            .range([0, height]);

	var minDate = d3.min(bardata, function (d){
									return d.DATE;	
									});
	var maxDate = d3.max(bardata, function (d){
									return d.DATE;	
											
									});

	var xScale = d3.time.scale()
			.domain(d3.time.months(minDate, maxDate));
			//.range([0,width]);
         
//console.log(bardata[0].DATE,xScale(bardata[0].DATE),d3.time.years(minYear, maxYear));
    var tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('opacity', 0);
	
	var toolText = function(d)  {
			var text = '<div id= toolTip>' +   
			   	'<p><strong>' + d3.format("$,.2f")(d.VALUE) + ' billion </strong> ' + 
				'<br>' +   d3.time.format("%b-%Y")(d.DATE) + '</p>' +   
			   '</div>';
			
		return text;		
		
	};
	
	var title = d3.select('#chart').append('div')
				.classed('Title', true)
				.style('background', '#E7E0CB')
				.style('text-align', 'center')
        		.attr('width', width + margin.left + margin.right)
				.append('h1')
					.style('margin-bottom', '0px')
					.append('text')
						.text('Gross Domestic Product');
				
	
    var myChart = d3.select('#chart')
		.attr('width', width + margin.left + margin.right)
		.append('svg')
			.style('background', '#E7E0CB')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
				.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
				.selectAll('rect').data(bardata, function(d){
					return d.VALUE;
				})
				.enter().append('rect')
					.style('fill', function(d,i) {
						return colors(i);
					})
					.attr('width',(width/bardata.length))
					.attr('x', function(d) {
						return xScale(d.DATE);
					})
					.attr('height', 0)
					.attr('y', height)

				.on('mouseover', function(d) {

					tooltip.transition()
						.style('opacity', 0.8);

					  tooltip.html(toolText(d))
						.style('left', (d3.event.pageX - 35) + 'px')
						.style('top',  (d3.event.pageY - 30) + 'px');


					tempColor = this.style.fill;
					d3.select(this)
						.style('opacity', 0.5)
						.style('fill', 'yellow');
				})
				.on('mouseout', function(d) {
					d3.select(this)
						.style('opacity', 1)
						.style('fill', tempColor);

				});
	
		var footer = d3.select('#chart').append('div')
				.classed('Footer', true)
				.style('width', width + margin.left + margin.right)
				.style('background', '#E7E0CB')
				.style('text-align', 'center')
				.append('p')
					.style('margin-top', '0px')
					.append('text')
						.text('Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)');
	
    myChart.transition()
        .attr('height', function(d) {
		
            return yScale(d.VALUE);
        })
        .attr('y', function(d) {
            return height - yScale(d.VALUE);
        })
        .delay(function(d, i) {
            return i * 10;
        })
        .duration(1000)
        .ease('elastic');

    var vGuideScale = d3.scale.linear()
        .domain([0, d3.max(bardata, function(d) {
			return d.VALUE;
		})])
        .range([height, 0]);

    var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(14);

    var vGuide = d3.select('svg').append('g');
        vAxis(vGuide);
        vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        vGuide.selectAll('path')
            .style({ fill: 'none', stroke: "#000"});
        vGuide.selectAll('line')
            .style({ stroke: "#000"});

    var hAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
	    .ticks(d3.time.year, 4);
		
        

    var hGuide = d3.select('svg').append('g');
        hAxis(hGuide);
        hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
        hGuide.selectAll('path')
            .style({ fill: 'none', stroke: "#000"});
        hGuide.selectAll('line')
            .style({ stroke: "#000"});

});