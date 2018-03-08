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

d3.csv('data.csv', function (err, data) {
   if (err) {
       return console.log(err);
   }
   console.log(data);
   // generate(data.columns);
});

d3.json('data.json', function (err, data) {
    if (err) {
        console.log(err);
    }
    generate(data);
});


function generate(dataset) {
    // var dataset = [10, 20, 30, 40, 50];

    var el = d3.select('body')
        .selectAll('p')
        .data(dataset)
        .enter()
        .append('p')
        .text(function (d) {
            return 'This paragraph is binded to the number ' + d;
        })
        .attr('class', function (d) {
            if (d > 25) {
                return 'foo';
            } else {
                return null;
            }
        })
        .classed('bar', function (d) {
            return d < 25;
        })
        .style('color', function (d) {
            if (d > 25) {
                return 'red';
            } else {
                return 'blue';
            }
        });

    console.log(el);
}

