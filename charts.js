function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample); 
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    var samples = data.samples;
    var metadata = data.metadata;
    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var resultArray = [];
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    resultArray =samples.filter(sampleObj => sampleObj.id == sample);

    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metaArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(result);

    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    var meta = metaArray[0];
    console.log("Meta"); console.log(meta);

    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var bacId = result.otu_ids;
    var bacCount = result.sample_values;
    var bacName = result.otu_labels;

    // console.log(bacId);
    // console.log(bacCount);
    // console.log(bacName);
   
    // Deliverable 3: 3. Create a variable that holds the washing frequency.
    var washing = meta.wfreq;
    console.log(washing);

    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    
      // trying to build a link between the items in the otu_ids and the counts.


      function convertToObj(a, b, c) {
        let obj = {};
        for (i=0; i< a.length; i++){
          let key = a[i];
          obj[key] = [b[i],c[i]];
        }
        return obj;
      };

      var linked = convertToObj(bacId,bacCount,bacName);
    
      // console.log(linked);

      sorted = Object.entries(linked).sort((a,b) => b[1][0] - a[1][0]);

      console.log(sorted);

      var topTen = sorted.slice(0,10); 
   
      console.log(topTen);
      var yticks = [];
      var ylable = [];
      var xvalues= [];

    topTen=topTen.reverse()
    
    for ( i=0; i<topTen.length; i++ )
        {
          console.log( topTen[i] + " was measured at " +  topTen[i][0] );
          yticks[i]  = "otu-" + topTen[i][0];
          xvalues[i] = topTen[i][1][0];
          ylable[i]  = topTen[i][1][1];

        };

        console.log(yticks);
        console.log(ylable);
        console.log(xvalues);

     // Deliverable 1: 8. Create the trace for the bar chart. 

    var barData = [
       {x: xvalues,
       y: yticks,
       type: "bar",
       orientation: 'h',
      text: ylable }
    ];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top Ten Bactieral Cultures Found"

    };
    
    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
    // Deliverable 2: 1. Create the trace for the bubble chart.

    // Deliverable 2: 2. Create the layout for the bubble chart.

    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    
    // Deliverable 3: 4. Create the trace for the gauge chart.
    
    // Deliverable 3: 5. Create the layout for the gauge chart.

    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.

  });
}
