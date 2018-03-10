var data = [
  [400, 200],
  [210, 140],
  [722, 300],
  [70, 160],
  [250, 50],
  [110, 280],
  [699, 225],
  [90, 220],
];

var chartWidth = 800;
var chartHeight = 400;
var padding = 50;

// Create SVG Element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

// Create Scales
var scaleX = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
      return d[0];
    })])
    .range([padding, d3.max([0, chartWidth - padding * 2])]);

var scaleY = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
      return d[1];
    })])
    .range([chartHeight - padding, padding]);

var scaleR = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
      return d[1];
    })])
    .range([5, 30]);

var scaleA = d3.scaleSqrt()
    .domain([0, d3.max(data, function(d) {
      return d[1];
    })])
    .range([5, 25]);

// Create Circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return scaleX(d[0]);
    })
    .attr('cy', function(d) {
      return scaleY(d[1]);
    })
    .attr('r', function(d) {
      return scaleA(d[1]);
    })
    .attr('fill', '#d1da51');

// Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
      return d.join(',');
    })
    .attr('x', function(d) {
      return scaleX(d[0]);
    })
    .attr('y', function(d) {
      return scaleY(d[1]);
    });

