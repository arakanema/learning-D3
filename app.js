// var el = d3.selectAll('p');
// var el = d3.select('body');
// var p = el.append('p');

// var el = d3.select('body')
//     .append('p')
//     .classed('foo', true)
//     .classed('bar', true)
//     // .attr('class', 'foo')
//     // .attr('class', 'bar')
//     .text('Hello World')
//     .style('color', 'blue');

var dataset = [10, 20, 30, 40, 50];
var el = d3.select('body')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    .text(function (d) {
        return 'This paragraph is binded to the number ' + d;
    })
    .style('color', function (d) {
        if (d > 25) {
            return 'red';
        } else {
            return 'blue';
        }
    });

console.log(el);
