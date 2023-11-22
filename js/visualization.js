// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {
  d3.json("data/Cosi116aDataCleaning/avgMonthlyRidership.json", (data) => {
    // General event type for selections, used by d3-dispatch
    // https://github.com/d3/d3-dispatch
    const dispatchString = "selectionUpdated";


    // Create a table given the following: 
    // a dispatcher (d3-dispatch) for selection events; 
    // a div id selector to put our table in; and the data to use.
    let bargraphData = bargraph()
    .x(d => d.Month)
    .xLabel("Month")
    .y(d => d.Ridership)
    .yLabel("Ridership")
    .selectionDispatcher(d3.dispatch(dispatchString))
    ("#bargraph", data);


    let tableData = table()
      .selectionDispatcher(d3.dispatch(dispatchString))
      ("#table", data);


  })



})());