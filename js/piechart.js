
// Load CSV data
d3.csv("data/Cosi116aDataCleaning/ridership_by_line.csv", function (error, data) {
  // Assuming the CSV has columns like 'service_date', 'route_or_line', 'average_monthly_ridership'

  // Convert service_date to month format (assuming it's in the format 'YYYY/MM/DD')
  data.forEach(entry => {
    entry.month = entry.service_date.substring(0, 7);
  });
});

// Function to generate a pie chart
function generatePieChart(monthData) {
  // Check if monthData is an object and is defined
  console.log("the type of monthData is: ", typeof monthData);  // Output: object
  console.log("monthData is: ", monthData)
  
    // Define a color scale based on the lines
    const colorScale = d3.scaleOrdinal()
    .domain(monthData.map(d => d.route_or_line))
    .range(['blue', 'green', 'orange', 'red']);

    // Generate pie chart
    const pie = d3.pie();
    const arc = d3.arc().innerRadius(0).outerRadius(150);

    //Modify the sizings and spatial location of pie chart
    const svg = d3.select("#piechartContainer").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .append("g")
    .attr("transform", "translate(200,200)");

    // Each section of the pie chart is filled according to the MBTA line color they represent
    svg.selectAll("path")
    .data(pie(monthData.map(d => d.average_monthly_ridership)))
    .enter().append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colorScale(monthData[i].route_or_line));

    // Add labels for each slice
    svg.selectAll("text")
    .data(pie(monthData.map(d => d.average_monthly_ridership)))
    .enter().append("text")
    .attr("class", "pie-label") // Add a class for styling
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text((d, i) => monthData[i].route_or_line);

    //Add title
    svg.append("text")
    .attr("x", 0)
    .attr("y", -160) // Adjust the y-coordinate for the title position
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("MBTA Ridership Breakdown By Line"); // Specify your title text
}
