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
    .domain([
      0, d3.max(data, function(d) {
        return d[0];
      })])
    .range([padding, chartWidth - padding * 2]);

var scaleY = d3.scaleLinear()
    .domain([
      0, d3.max(data, function(d) {
        return d[1];
      })])
    .range([chartHeight - padding, padding]);

// Clip Paths
svg.append('clipPath')
    .attr('id', 'plot-area-clip-path')
    .append('rect')
    .attr('x', padding)
    .attr('y', padding)
    .attr('width', chartWidth - padding * 3)
    .attr('height', chartHeight - padding * 2);

// var scaleR = d3.scaleLinear()
//     .domain([
//       0, d3.max(data, function(d) {
//         return d[1];
//       })])
//     .range([5, 30]);
//
// var scaleA = d3.scaleSqrt()
//     .domain([
//       0, d3.max(data, function(d) {
//         return d[1];
//       })])
//     .range([0, 25]);

// Create Axis
var axisX = d3.axisBottom(scaleX);

svg.append('g')
    .attr('class', 'x-axis')
    .attr(
        'transform',
        'translate(0,' + (chartHeight - padding) + ')'
    )
    .call(axisX);

var axisY = d3.axisLeft(scaleY)
    .ticks(5);

svg.append('g')
    .attr('class', 'y-axis')
    .attr(
        'transform',
        'translate( ' + padding + ', 0 )'
    )
    .call(axisY);

// Create Circles
svg.append('g')
    .attr('id', 'plot-area')
    .attr('clip-path', 'url(#plot-area-clip-path)')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return scaleX(d[0]);
    })
    .attr('cy', function(d) {
      return scaleY(d[1]);
    })
    // .attr('r', function(d) {
    //   return scaleA(d[1]);
    // })
    .attr('r', 13)
    .attr('fill', '#d1678b');

// Create Labels
// svg.append('g').selectAll('text')
//     .data(data)
//     .enter()
//     .append('text')
//     .text(function(d) {
//       return d.join(',');
//     })
//     .attr('x', function(d) {
//       return scaleX(d[0]);
//     })
//     .attr('y', function(d) {
//       return scaleY(d[1]);
//     });

// Events
d3.select('button').on('click', function() {
  // Create random data
  data = [];
  var maxNum = Math.random() * 1000;
  for (var i = 0; i < 8; i++) {
    var newX = Math.floor(Math.random() * maxNum);
    var newY = Math.floor(Math.random() * maxNum);
    data.push([newX, newY]);
  }

  // Update scales
  scaleX.domain([
    0, d3.max(data, function(d) {
      return d[0];
    })]);
  scaleY.domain([
    0, d3.max(data, function(d) {
      return d[1];
    })]);

  svg.selectAll('circle')
      .data(data)
      .transition()
      .duration(1000)
      .attr('opacity', 0.5)
      .attr('cx', function(d) {
        return scaleX(d[0]);
      })
      .attr('cy', function(d) {
        return scaleY(d[1]);
      })
      .on('end', function() {
        d3.select(this)
            .attr('fill', '#d1678b')
            .attr('opacity', 1.0);
      });

  // Update Axis
  svg.select('.x-axis')
      .transition()
      .duration(1000)
      .call(axisX);
  svg.select('.y-axis')
      .transition()
      .duration(1000)
      .call(axisY);
});
