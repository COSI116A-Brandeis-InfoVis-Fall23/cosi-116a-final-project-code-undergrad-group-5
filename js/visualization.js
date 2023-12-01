(() => {
  d3.json("data/Cosi116aDataCleaning/avgMonthlyRidership.json", (data) => {
    d3.csv("data/Cosi116aDataCleaning/ridership_by_line.csv", (csvdata) => {
      console.log(data[3])
      const result = data.filter((row) => row.Month == "March")
      console.log(result)
      const dispatchString = "selectionUpdated";

      let tableData = table()
      .selectionDispatcher(d3.dispatch(dispatchString))
      ("#table", data);

      let barGraphData = bargraph()
        .x(d => d.Month)
        .xLabel("Month")
        .y(d => d.Ridership)
        .yLabel("Ridership")
        .selectionDispatcher(d3.dispatch(dispatchString))
        ("#bargraph", data);

      
      let lineChartData = linechart()
        .x(d => d.Month)
        .xLabel("Month")
        .y(d => d["Total Precipitation (Inches)"])
        .yLabel("Total Precipitation (Inches)")
        .selectionDispatcher(d3.dispatch(dispatchString))
        ("#linechart", data);

      // Function to convert word format month to numeric format
      function convertToNumericMonth(wordMonth) {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        // Find the index of the selected month in the array
        const index = monthNames.indexOf(wordMonth);

        // Convert the index to numeric format (adding 1 because array indices are zero-based)
        const numericMonth = (index !== -1) ? (index + 1).toString().padStart(2, '0') : null;

        return numericMonth;
      }

      // Function to handle row click
      function handleRowClick(wordMonth) {
        // Convert word format month to numeric format
        const numericMonth = convertToNumericMonth(wordMonth);
      
        // Check if data is available for the selected month
        if (numericMonth) {
          // Filter data for the selected month. Should return 4 arrays of ridership by line for the certain month
          const ridership_arrays = csvdata.filter(entry => {

            // Extract month from the service_date column
            const entryMonth = entry.service_date.split('/')[1];
            return entryMonth === numericMonth;
          });
      
          // Check if data is available for the selected month
          if (ridership_arrays.length > 0) {
            // Clear previous pie chart
            d3.select("#piechartContainer").html("");
            // Generate and display pie chart for each entry
            console.log("ridership array is:", ridership_arrays); //make sure for each month selected there are 4 arrays for each line and ridership
            generatePieChart(ridership_arrays)

          } else {
            console.log(`No data available for ${wordMonth}`);
          }
        } else {
          console.log(`Invalid month format: ${wordMonth}`);
        }
        const wordMonthData = data.filter((row) => row.Month == wordMonth)
        const monthPrecip= wordMonthData[0]['Total Precipitation (Inches)']
        if (monthPrecip != "None"){
          d3.select("#waterLevelContainer").html("");
            // Generate and display water level vis for each entry
            console.log("Monthly Precipitation is:", monthPrecip); 
            generateWaterLevelVis(monthPrecip)

          } else {
            console.log(`No data available for ${wordMonth}`);
          }
        }
      
      // Attach click event listener to the table rows
      document.getElementById("table").addEventListener("click", function (event) {
        if (event.target.tagName === "TD") {
          const selectedMonth = event.target.parentNode.cells[0].textContent; // Assuming the first cell contains the month
          console.log("Selected Month:", selectedMonth);
          handleRowClick(selectedMonth);
        }
      });

      tableData.selectionDispatcher().on(dispatchString, function(selectedData) {
        barGraphData.updateSelection(selectedData);
        lineChartData.updateSelection(selectedData);
      });

      barGraphData.selectionDispatcher().on(dispatchString, function(selectedData) {
        tableData.updateSelection(selectedData);
        lineChartData.updateSelection(selectedData);
      });
      lineChartData.selectionDispatcher().on(dispatchString, function(selectedData) {
        tableData.updateSelection(selectedData);
        barGraphData.updateSelection(selectedData);
      });
  });
})})();
