var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element
var chartWidth = 800;
var chartHeight = 400;
var axisPadding = 30;
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

// Create Scale
var scaleX = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([axisPadding, chartWidth - axisPadding])
    .paddingInner(0.05);

var scaleY = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([chartHeight - axisPadding, axisPadding]);

// Create Axis
var axisX = d3.axisBottom(scaleX);
svg.append('g')
    .attr('class', 'axisX')
    .attr('transform', 'translate(0,' + (chartHeight - axisPadding) + ')')
    .call(axisX);
var axisY = d3.axisLeft(scaleY);
svg.append('g')
    .attr('class', 'axisY')
    .attr('transform', 'translate(' + axisPadding + ', 0)')
    .call(axisY);

// Bind Data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return scaleX(i);
    })
    .attr('y', function(d) {
      return chartHeight - scaleY(d) - axisPadding;
    })
    .attr('width', scaleX.bandwidth())
    .attr('height', function(d) {
      return scaleY(d);
    })
    .attr('fill', '#7ed123');

// Create Labels
svg.append('g').selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function(d) {
      return d;
    })
    .attr('x', function(d, i) {
      return scaleX(i) + scaleX.bandwidth() / 2;
    })
    .attr('y', function(d) {
      return chartHeight - scaleY(d) - 15;
    })
    .attr('class', 'labels')
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');

// Events
d3.select('button').on('click', function() {
  data.reverse();

  svg.selectAll('.axisX')
      .call(axisX);

  // refresh svg
  svg.selectAll('rect')
      .data(data)
      .transition()
      .delay(function(d, i) {
        return i / data.length * 1000;
      })
      .duration(1000)
      .ease(d3.easeElasticOut)
      .attr('y', function(d) {
        return chartHeight - scaleY(d) - axisPadding;
      })
      .attr('height', function(d) {
        return scaleY(d);
      });

  svg.selectAll('.labels')
      .data(data)
      .transition()
      .delay(function(d, i) {
        return i / data.length * 1000;
      })
      .duration(1000)
      .ease(d3.easeElasticOut)
      .text(function(d) {
        return d;
      })
      .attr('x', function(d, i) {
        return scaleX(i) + scaleX.bandwidth() / 2;
      })
      .attr('y', function(d) {
        return chartHeight - scaleY(d) - 15;
      });

});
