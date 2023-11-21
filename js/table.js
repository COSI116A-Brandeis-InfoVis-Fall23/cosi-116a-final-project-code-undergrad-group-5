/* global D3 */

function table() {
    let pressed = false;
  
    // Based on Mike Bostock's margin convention
    // https://bl.ocks.org/mbostock/3019563
    let ourBrush = null,
      selectableElements = d3.select(null),
      dispatcher;
   
    function chart(selector, data) {
      let table = d3.select(selector)
        .append("table")
          .classed("my-table", true);
  
      // Grab the labels of the first item in the dataset
      //  and store them as the headers of the table.
      let tableHeaders = Object.keys(data[0]);
  
      // Append the headers
      let tr = table.append('thead').append('tr');
      tr.selectAll('th').data(tableHeaders).enter().append('th').text((d) => d)
       // Append the table rows and cells
      let tbody = table.append('tbody');
      let rows = tbody.selectAll('tr').data(data).enter().append('tr')
      .on("mouseover", (d, i, elements) => {
        if(!pressed){
          // Add the mouseover class to the current row 
          d3.select(elements[i]).classed("mouseover", true);
          dispatcher.call("selectionUpdated", this, [d]);
  
        }
        // once the mouse pressed on the rows
        else{
          // it will select the dark pink row
          // Select the clicked row
          d3.select(elements[i]).classed("selected", true);
          // Call the custom event dispatcher named "selectionUpdated" with data [d]
          dispatcher.call("selectionUpdated", this, [d]);
        }
      })
      // when the mouse is pressed down, selected it 
      .on("mousedown", (d, i, elements) => {
        pressed = true;
        // First deselect all the rows
        d3.selectAll("tr").classed("selected", false);
        // Then let the mouse only select the click row 
        d3.select(elements[i]).classed("selected", true);
        dispatcher.call("selectionUpdated", this, [d]);
      })
  
       // when the mouse is released, unselected 
      .on("mouseup", (d, i, elements) => {
        d3.select(elements[i]).classed("selected", true)
        pressed = false
        // Let the dark pink still stay the same when we clicked on it
        d3.selectAll(elements[i]).classed("mouseover", false)
        dispatcher.call("selectionUpdated", this, [d]);
       })
      //  when the mouse pointer moves out of an element 
      .on("mouseout", (d, i, elements) => {
        d3.select(elements[i]).classed("mouseover", false)
        dispatcher.call("selectionUpdated", this, [d]);
      });
  
      rows.selectAll('td')
        .data((d)=>Object.values(d))
        .enter()
        .append('td')
      // adding the css style
        .classed('data-cell',true) 
        .text((d) => d);
      
      // initialize the dispatcher
      dispatcher = d3.dispatch("selectionUpdated");
      // similiar idea as scatterplot and linchart
      let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
      dispatcher.call(dispatchString, this, selectableElements.selectAll(".selected").data());
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
  
      // Select an element if its datum was selected
      d3.selectAll('tr').classed("selected", d => {
        return selectedData.includes(d)
      });
    };
    
    return chart;
  }