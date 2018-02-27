var data = [10, 20, 30, 40, 50];

var el = d3.select('#chart')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    // .classed('bar', true)
    .attr('class', 'bar')
    .style('height', function (d) {
        var height = d * 3;
        return height + 'px';
    });

console.log(el);

