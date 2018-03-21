/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = {left: 80, right: 20, top: 50, bottom: 100};

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var flag = true;

var t = d3.transition().duration(1200);

var g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var xAxisGroup = g.append('g')
    .attr('class', 'x x-axis')
    .attr('transform', 'translate(0,' + height + ')');

var yAxisGroup = g.append('g')
    .attr('class', 'y y-axis');

var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);

var y = d3.scaleLinear()
    .range([height, 0]);

// X Label
g.append('text')
    .attr('y', height + 50)
    .attr('x', width / 2)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('Month');

// Y Label
var yLabel = g.append('text')
    .attr('y', -60)
    .attr('x', -(height / 2))
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Revenue');

d3.json('data/revenues.json', function(err, data) {
  data.forEach(function(d) {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });

  d3.interval(function() {
    var newData = flag ? data : data.slice(1);
    update(newData);
    flag = !flag;
  }, 1500);

  update(data);
});

function update(data) {
  var value = flag ? 'revenue' : 'profit';
  x.domain(data.map(function(d) { return d.month; }));
  y.domain([0, d3.max(data, function(d) { return d[value]; })]);

  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.transition(t).call(xAxisCall);

  var yAxisCall = d3.axisLeft(y)
      .tickFormat(function(d) { return '$' + d; });
  yAxisGroup.transition(t).call(yAxisCall);

  // JOIN: 以前の要素と新しいデータ
  var rects = g.selectAll('rect')
      .data(data, function(d) {
        return d.month;
      });

  // EXIT: _exitへ
  rects.exit()
      .attr('fill', 'red')
      .transition(t)
      .attr('y', y(0))
      .attr('height', 0)
      .remove();

  // UPDATE: _exitの古い要素をアップデート
  rects.transition(t)
      .attr('y', function(d) { return y(d[value]); })
      .attr('x', function(d) { return x(d.month); })
      .attr('width', x.bandwidth)
      .attr('height', function(d) { return height - y(d[value]); })
      .attr('fill', 'grey');

  // ENTER: _exitから_enterへ
  rects.enter()
      .append('rect')
      .attr('x', function(d) { return x(d.month); })
      .attr('width', x.bandwidth)
      .attr('fill', 'grey')
      .attr('y', y(0))
      .attr('height', 0)
      // AND UPDATE old elements present in new data
      .merge(rects)
      .transition(t)
      .attr('y', function(d) { return y(d[value]); })
      .attr('height', function(d) { return height - y(d[value]); });

  var label = flag ? 'Revenue' : 'Profit';
  yLabel.text(label);
}
