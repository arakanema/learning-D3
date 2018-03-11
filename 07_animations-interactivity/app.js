var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element

var chartWidth = 800;
var chartHeight = 400;
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

// Create Scale
var scaleX = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, chartWidth])
    .paddingInner(0.05);

var scaleY = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chartHeight]);

// Bind Data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      // return i * 30;
      // return i * (chartWidth / data.length);
      return scaleX(i);
    })
    .attr('y', function(d) {
      // return chartHeight - d * 5;
      return chartHeight - scaleY(d);
    })
    // .attr('width', chartWidth / data.length - barPadding)
    .attr('width', scaleX.bandwidth())
    .attr('height', function(d) {
      // return d * 5;
      return scaleY(d);
    })
    .attr('fill', '#7ed123');

// Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
      return d;
    })
    .attr('x', function(d, i) {
      // return i * 30;
      // return i * (chartWidth / data.length) +
      //     (chartWidth / data.length - barPadding) / 2;
      return scaleX(i) + scaleX.bandwidth() / 2;
    })
    .attr('y', function(d) {
      // return chartHeight - (d * 5) + 15;
      return chartHeight - scaleY(d) + 16;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
