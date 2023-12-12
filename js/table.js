/* global D3 */

function table() {

  // Based on Mike Bostock's margin convention
  // https://bl.ocks.org/mbostock/3019563
  let ourBrush = null,
    selectableElements = d3.select(null),
    dispatcher;

  // Create the chart by adding an svg to the div with the id 
  // specified by the selector using the given data
  function chart(selector, data) {
    let table = d3.select(selector)
      .append("table")
        .classed("my-table", true)
        

    // Here, we grab the labels of the first item in the dataset
    //  and store them as the headers of the table.
    let tableHeaders = Object.keys(data[0]);

    // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table


    let tr = table.append('thead').append('tr')
    tr.selectAll('th').data(tableHeaders).enter().append('th').text((d) => d)

    let tbody = table.append('tbody')
    
    // Iterate through the JSON data and populate the table
  
    let rows = tbody
      .selectAll("tr")
      .data(data)
      .enter()
      .append("tr");
    rows
      .selectAll("td")
      .data((row) => tableHeaders.map((header) => ({ header, value: row[header] })))
      .enter()
      .append("td")
      .text((d) => d.value);

// Iterate through the JSON data and populate the table
    var isBrushing = false;
    d3.selectAll("tr")
    .on("mousedown", (d, i, elements) => {
      isBrushing = true;
      const selected = d3.selectAll(".selected")
      selected.classed("selected", false)
      d3.select(elements[i]).classed("selected", true)
      d3.select(elements[i]).classed("mouseover", true)
      let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];

        // Let other charts know
        dispatcher.call(dispatchString, this, d3.selectAll(".selected").data());
    })
    .on("mouseover", (d, i, elements) => {
      d3.select(elements[i]).classed("mouseover", true)
      if (isBrushing){
        d3.select(elements[i]).classed("selected", true)
        let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];

        // Let other charts know
        dispatcher.call(dispatchString, this, d3.selectAll(".selected").data());
      }
    })
    .on("mouseout",(d, i, elements) => {
      d3.select(elements[i]).classed("mouseover", false)
    })
    .on("mouseup", () => {
      isBrushing = false;
    })
    return chart;
  }
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
    console.log("received in table")
    console.log(selectedData)

    // Select an element if its datum was selected
    d3.selectAll('tr').classed("selected", d => {
      return selectedData.includes(d)
    });
  };

  return chart;
}