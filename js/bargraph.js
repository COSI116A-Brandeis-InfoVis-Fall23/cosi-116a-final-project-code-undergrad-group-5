function bargraph(){
    let margin = {
        top: 60,
        left: 50,
        right: 30,
        bottom: 35
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      xValue = d => d[0],
      yValue = d => d[0],
      xLabelText = "",
      yLabelText = "",
      yLabelOffsetPx = 0,
      xScale = d3.scaleBand(),
      yScale = d3.scaleLinear(),
      ourBrush = null,
      selectableElements = d3.select(null),
      dispatcher;
    function chart(selector, data){
        let svg = d3.select(selector)
        .append("svg")
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
          .classed("svg-content", true);

        svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        xScale.domain(data.map(d => xValue(d))) // Use map directly to extract month values
        .rangeRound([0, width])
        .paddingInner(0.1);

        yScale
        .domain([
        d3.min(data, d => yValue(d)),
        d3.max(data, d => yValue(d))
        ])
        .rangeRound([height, 0]);


        let xAxis = svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")

        xAxis.append("text")        
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + (width - 50) + ",-10)")
        .text(xLabelText);

        let yAxis = svg.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text") 

        yAxis.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + yLabelOffsetPx + ", -12)")
        .text(yLabelText);

        svg.selectAll(".tick text")
        .style("font-size", "7px");

        let bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(xValue(d)))
        .attr("y", d => yScale(yValue(d)))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(yValue(d)))
        .attr("fill", "steelblue")
        .on("click", function (event, d) {
          // Deselect all bars
          svg.selectAll(".bar").classed("selected", false);

          // Toggle the "selected" class for the clicked bar
          d3.select(this).classed("selected", true);

          // Dispatch the selected data to linked visualizations
          let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
          
          // Let other charts know
          dispatcher.call(dispatchString, this, svg.selectAll(".selected").data());
      });
        
        
        selectableElements = bars;
    return chart;
  }
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor from the datum
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

  // Gets or sets the dispatcher we use for selection events
  chart.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return chart;
  };

  // Given selected data from another visualization 
  // select the relevant elements here (linking)
  chart.updateSelection = function (selectedData) {
    if (!arguments.length) return;

    // Select an element if its datum was selected
    selectableElements.classed("selected", d => {
      return selectedData.includes(d)
    });
  };

  return chart;
}

