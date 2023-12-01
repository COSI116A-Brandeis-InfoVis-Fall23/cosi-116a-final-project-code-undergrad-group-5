// Function to generate a water level visualization
function generateWaterLevelVis(waterLevel) {
    // Check if water level is an object and is defined
    console.log("water level data is: ", waterLevel)
  
      // Generate waterLevel chart
      //const outerRect = d3.path.rect();
      //const innerRect = d3.path.rect();

      var innerRect= d3.path(); 
           
         // Creating rectangle at x:50 and y:100 
         // and height:200, width:300 
         innerRect.rect(0,0,300,waterLevel);  
         d3.select("#waterLevelContainer").attr("d",innerRect)
         .attr("fill", (d, i) => 'blue');


         
  
      //Modify the sizings and spatial location of water level container
      const svg = d3.select("#waterLevelContainer").append("svg")
      .attr("width", 500)
      .attr("height", 1000)
      .append("g")
      .attr("transform", "translate(0,0)");
  
      // the rectangle is filled based on the water level for the selected month
      svg.selectAll("path")
      .data(innerRect)
      .enter().append("path")
      .attr("d", innerRect)
      .attr("fill", (d, i) => 'blue');
  
      // Add a label with the water level
      svg.selectAll("text")
      .data(innerRect)
      .enter().append("text")
      .attr("class", "water-label") // Add a class for styling
      .attr("text-anchor", "middle")
      .text((d, i) => waterLevel);
  
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