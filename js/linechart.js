// linechart.js

function linechart() {

    let margin = {
        top: 60,
        left: 50,
        right: 30,
        bottom: 35
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      xValue = d => d.Month,
      yValue = d => d['Total Precipitation (Inches)'],
      xLabelText = "Month",
      yLabelText = "Total Precipitation (Inches)",
      yLabelOffsetPx = 0,
      xScale = d3.scalePoint(),
      yScale = d3.scaleLinear(),
      ourBrush = null,
      selectableElements = d3.select(null),
      dispatcher;
  
    function chart(selector, data) {
      let svg = d3.select(selector)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed("svg-content", true);
  
      svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      xScale
        .domain(data.map(d => xValue(d)))
        .rangeRound([0, width]);
  
      yScale
        .domain([
          d3.min(data, d => yValue(d)),
          d3.max(data, d => yValue(d))
        ])
        .rangeRound([height, 0]);
  
      let xAxis = svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale));
  
      xAxis.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + (width - 50) + ",-10)")
        .text(xLabelText);
  
      let yAxis = svg.append("g")
        .call(d3.axisLeft(yScale));
  
      yAxis.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + yLabelOffsetPx + ", -12)")
        .text(yLabelText);
  
      let line = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)));
  
      svg.append("path")
        .datum(data)
        .attr("class", "linePath")
        .attr("d", line);
  
      let points = svg.append("g")
        .selectAll(".linePoint")
        .data(data);
  
      points.exit().remove();
  
      points = points.enter()
        .append("circle")
        .attr("class", "point linePoint")
        .merge(points)
        .attr("cx", d => xScale(xValue(d)))
        .attr("cy", d => yScale(yValue(d)))
        .attr("r", 5);
  
      selectableElements = points;
  
      svg.call(brush);
  
      function brush(g) {
        const brush = d3.brush()
          .on("start brush", highlight)
          .on("end", brushEnd)
          .extent([
            [-margin.left, -margin.bottom],
            [width + margin.right, height + margin.top]
          ]);
  
        ourBrush = brush;
  
        g.call(brush);
  
        function highlight() {
          if (d3.event.selection === null) return;
          const [
            [x0, y0],
            [x1, y1]
          ] = d3.event.selection;
          points.classed("selected", d =>
            x0 <= xScale(xValue(d)) && xScale(xValue(d)) <= x1 && y0 <= yScale(yValue(d)) && yScale(yValue(d)) <= y1
          );
  
          let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
  
          dispatcher.call(dispatchString, this, svg.selectAll(".selected").data());
        }
  
        function brushEnd() {
          if (d3.event.sourceEvent.type != "end") {
            d3.select(this).call(brush.move, null);
          }
        }
      }
  
      return chart;
    }
  
    function X(d) {
      return xScale(xValue(d));
    }
  
    function Y(d) {
      return yScale(yValue(d));
    }
  
    chart.margin = function (_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };
  
    chart.width = function (_) {
      if (!arguments.length) return width;
      width = _;
      return chart;
    };
  
    chart.height = function (_) {
      if (!arguments.length) return height;
      height = _;
      return chart;
    };
  
    chart.x = function (_) {
      if (!arguments.length) return xValue;
      xValue = _;
      return chart;
    };
  
    chart.y = function (_) {
      if (!arguments.length) return yValue;
      yValue = _;
      return chart;
    };
  
    chart.xLabel = function (_) {
      if (!arguments.length) return xLabelText;
      xLabelText = _;
      return chart;
    };
  
    chart.yLabel = function (_) {
      if (!arguments.length) return yLabelText;
      yLabelText = _;
      return chart;
    };
  
    chart.yLabelOffset = function (_) {
      if (!arguments.length) return yLabelOffsetPx;
      yLabelOffsetPx = _;
      return chart;
    };
  
    chart.selectionDispatcher = function (_) {
      if (!arguments.length) return dispatcher;
      dispatcher = _;
      return chart;
    };
  
    chart.updateSelection = function (selectedData) {
      selectableElements.classed("selected", d => selectedData.includes(d));
    };
  
    return chart;
  }
  