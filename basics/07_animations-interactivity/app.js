var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

// Create SVG Element
var chartWidth = 800;
var chartHeight = 400;
var axisPadding = 30;
var svg = d3.select('#chart')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .style('background-color', '#eee');

// Scale
var scaleX = d3.scaleBand()
    .domain(d3.range(data.length))
    // .rangeRound([0, chartWidth])
    .rangeRound([axisPadding, chartWidth - axisPadding / 2])
    .paddingInner(0.1);
var scaleY = d3.scaleLinear()
    .domain([0, d3.max(data)])
    // .range([chartHeight, 0]);
    .range([chartHeight, axisPadding * 2]);

// Axis
var axisX = d3.axisBottom(scaleX);
svg.append('g')
    .attr('class', 'axisX')
    .attr('transform', 'translate(0,' + (chartHeight - axisPadding) + ')')
    .call(axisX);
var axisY = d3.axisLeft(scaleY);
svg.append('g')
    .attr('class', 'axisY')
    .attr('transform', 'translate(' + axisPadding + ', -' + axisPadding + ')')
    .call(axisY);

// Create Bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return scaleX(i);
    })
    .attr('y', function(d) {
      return scaleY(d) - axisPadding;
    })
    .attr('width', scaleX.bandwidth())
    .attr('height', function(d) {
      return chartHeight - scaleY(d);
    })
    .attr('fill', 'green');

// Crate Labels
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
      return scaleY(d) - axisPadding / 2;
    })
    .attr('class', 'labels')
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');

// update values
d3.select('button').on('click', function() {
  // reverse and added new highest value
  data.reverse();
  data[0] = Math.round(Math.random() * 40) + 3;

  // reset domain and render axis
  scaleY.domain([0, d3.max(data)])
      .range([chartHeight, axisPadding * 2]);
  svg.selectAll('.axisY')
      .transition()
      .duration(1000)
      .call(axisY);

  // Render rect
  svg.selectAll('rect')
      .data(data)
      .transition()
      .duration(1000)
      .attr('y', function(d) {
        return scaleY(d) - axisPadding;
      })
      .attr('height', function(d) {
        return chartHeight - scaleY(d);
      });

  // Render text
  svg.selectAll('.labels') // ラベルクラスのみ!
      .data(data)
      .transition()
      .duration(1000)
      .text(function(d) {
        return d;
      })
      .attr('x', function(d, i) {
        return scaleX(i) + scaleX.bandwidth() / 2;
      })
      .attr('y', function(d) {
        return scaleY(d) - axisPadding / 2;
      });

});
