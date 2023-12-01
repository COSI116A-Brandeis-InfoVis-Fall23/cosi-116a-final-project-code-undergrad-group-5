function generateWaterLevelVis(waterLevel) {
  // Check if water level is an object and is defined
  console.log("water level data is: ", waterLevel);

  // Select the container and append an SVG
  const svg = d3.select("#waterLevelContainer")
      .append("svg")
      .attr("width", 500)
      .attr("height", 1000)
      .append("g")
      .attr("transform", "translate(0,0)");

  // Append a rectangle representing the water level
  svg.append("rect")
      .attr("width", 300)
      .attr("height", waterLevel)
      .attr("fill", "blue");

  // Add a label with the water level
  svg.append("text")
      .attr("class", "water-label")
      .attr("text-anchor", "middle")
      .text(waterLevel)
      .attr("x", 150) // Adjust the x-coordinate for label position
      .attr("y", waterLevel + 20); // Adjust the y-coordinate for label position

  // Add title
  svg.append("text")
      .attr("x", 250)
      .attr("y", -160)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Monthly Water Level");
}

// Example usage
generateW
