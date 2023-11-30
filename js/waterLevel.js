// Function to generate a water level visualization
function generateWaterLevelVis(waterLevel) {
    // Check if water level is an object and is defined
    console.log("water level data is: ", waterLevel)
  
      // Generate waterLevel chart
      const rect = d3.rect
  
      //Modify the sizings and spatial location of water level graphic
      const svg = d3.select("#waterLevelContainer").append("svg")
      .attr("width", 500)
      .attr("height", 1000)
      //.append("g")
      .attr("transform", "translate(200,200)");
  
      // the rectangle is filled based on the water level for the selected month
      svg.selectAll("path")
      .data(rect(waterLevel.map(d => d.Month)))
      .enter().append("path")
      .attr("d", rect)
      .attr("fill", (d, i) => waterfill);
  
      // Add a label with the water level
      svg.selectAll("text")
      .data(rect(waterLevel.map(d => d.Month)))
      .enter().append("text")
      .attr("text-anchor", "middle")
      .text((d, i) => data[2]);
  
      //Add title
      svg.append("text")
      .attr("x", 0)
      .attr("y", -160) // Adjust the y-coordinate for the title position
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .text("Monthly Water Level"); // Specify your title text

    // function waterdata(d) {
    //     return waterdata(d));
    // }
  }

// var precipitation = 
// var cap = 100
//     percent=(percent/cap)
// var width = percent*500

// document.getElementById("myTank").style["border-bottom"]=width +"px solid green";
// document.getElementById("myTank").style["height"]=500-width +"px";
// document.getElementById("myTank").innerText = percent*100 +"%";