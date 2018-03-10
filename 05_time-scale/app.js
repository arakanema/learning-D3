// var data = [
//   [400, 200],
//   [210, 140],
//   [722, 300],
//   [70, 160],
//   [250, 50],
//   [110, 280],
//   [699, 225],
//   [90, 220],
// ];

var chartWidth = 1000;
var chartHeight = 400;
var padding = 50;
var data = [
  {date: '2018-01-01', total: 30},
  {date: '2018-01-02', total: 20},
  {date: '2018-01-03', total: 6},
  {date: '2018-01-04', total: 38},
  {date: '2018-01-05', total: 30},
  {date: '2018-01-06', total: 18},
  {date: '2018-01-07', total: 33},
  {date: '2018-01-08', total: 30},
  {date: '2018-01-09', total: 33},
  {date: '2018-01-10', total: 31},
  {date: '2018-01-11', total: 40},
  {date: '2018-01-12', total: 39},
  {date: '2018-01-13', total: 53},
  {date: '2018-01-14', total: 37},
];

var timeParse = d3.timeParse('%Y-%m-%d');
var timeFormat = d3.timeFormat("%b %e");

// Loop through each date
data.forEach(function(value, index) {
  data[index].date = timeParse(value.date);
});

// Create SVG Element
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

// Create Scales
var scaleX = d3.scaleTime()
    .domain([
      d3.min(data, function(d) {
        return d.date;
      }),
      d3.max(data, function(d) {
        return d.date;
      })])
    .range([padding, chartWidth - padding * 2]);

var scaleY = d3.scaleLinear()
    .domain([
      0, d3.max(data, function(d) {
        return d.total;
      })])
    .range([chartHeight - padding, padding]);

var scaleA = d3.scaleSqrt()
    .domain([
      0, d3.max(data, function(d) {
        return d.total;
      })])
    .range([5, 25]);

// Create Circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return scaleX(d.date);
    })
    .attr('cy', function(d) {
      return scaleY(d.total);
    })
    .attr('r', function(d) {
      return scaleA(d.total);
    })
    .attr('fill', '#d1da51');

// Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
      return timeFormat(d.date);
    })
    .attr('x', function(d) {
      return scaleX(d.date);
    })
    .attr('y', function(d) {
      return scaleY(d.total);
    });

