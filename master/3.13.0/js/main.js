/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = {left: 50, right: 20, top: 20, bottom: 50};
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('translate', 'transform(' + margin.left + ','
        + margin.top + ')');

// X Label
g.append('text')
    .attr('class', 'label xLabel')
    .attr('x', width / 2)
    .attr('y', height + 40)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('Month');

// Y Label
g.append('text')
    .attr('class', 'label yLabel')
    .attr('x', -(height / 2))
    .attr('y', -(margin.right))
    .attr('font-size', '20px')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Revenue');

d3.json('data/revenues.json', function(err, data) {
  if (err) {
    console.log(err);
  }

  data.forEach(function(d) {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });
  console.log(data);

  var x = d3.scaleBand()
      .domain(data.map(function(d) {
        return d.month;
      }))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

  var y = d3.scaleLinear()
      .domain([
        0, d3.max(data, function(d) {
          return d.revenue;
        })])
      .range([0, height]);
  console.log(y);

  var xAxisCall = d3.axisBottom(x);
  g.append('g')
      .attr('class', 'x x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisCall);

  var yAxisCall = d3.axisLeft(y);
  g.append('g')
      .attr('class', 'y y-axis')
      .call(yAxisCall);

  var rects = g.selectAll('rect')
      .data(data);
  rects.enter()
      .append('rect')
      .attr('y', function(d) {
        return y(d.revenue);
      })
      .attr('x', function(d) {
        return x(d.month);
      })
      .attr('width', x.bandwidth)
      .attr('height', function(d) {
        return height - y(d.revenue);
      })
      .attr('fill', 'grey');

});

