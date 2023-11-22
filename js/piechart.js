// Function to load and parse CSV file
function loadCSVAndCreateChart() {
    $.get('piechartinfo2csv.csv', function (csvData) {
      // Parse CSV data
      var rows = csvData.split('\n');
      var data = [];
      for (var i = 1; i < rows.length; i++) {
        var cols = rows[i].split(',');
        data.push({ x: cols[1], value: parseFloat(cols[2]) });
      }
  
      // Create AnyChart pie chart
      var customColors = ['#5733FF', '#33FF57', '#FFA500', '#FF5733'];
      anychart.onDocumentReady(function () {
        var chart = anychart.pie(data);
        chart.palette(customColors);
        chart.title('Ridership by MBTA Line Jan 2022');
        chart.container('container');
        chart.draw();
      });
    });
  }
  
  // Call the function to load and create the chart
  loadCSVAndCreateChart();
  