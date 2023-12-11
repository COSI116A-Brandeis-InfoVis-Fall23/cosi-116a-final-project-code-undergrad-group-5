function generateWaterLevelVis(waterLevel) {
  // Check if water level is an object and is defined
  console.log("water level data is: ", waterLevel);

  // Select the container and append an SVG
  const svg = d3.select("#waterLevelContainer")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400)
      .append("g")
      .attr("transform", "translate(100,0)")
      .attr("fill", 'black')

      // Append a rectangle representing the water level
    svg.append("rect")
    .attr("width", 100)
    .attr("height", 300)
    .attr("fill", "black")
    .attr("transform", "translate(0,50)")
    .attr("fill-opacity", '.2');

    // Append a rectangle representing the water level
   translate_water_level = 300 - (waterLevel * 50) + 50
    svg.append("rect")
    .attr("width", 100)
    .attr("height", waterLevel * 50)
    .attr("transform", 'translate(0, ' + translate_water_level + ')')
    .attr("fill", "blue");
    //.attr("fill-opacity", '.5');


  // Add a label with the water level
  svg.append("text")
      .attr("class", "water-label")
      .attr("text-anchor", "middle")
      .text(waterLevel)
      .attr("x", 50) // Adjust the x-coordinate for label position
      .attr("y", waterLevel + 30 + 50); // Adjust the y-coordinate for label position

  // Add title
  svg.append("text")
      .attr("x", 50)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("font-color", "black")
      .text("Monthly Water Level");
}