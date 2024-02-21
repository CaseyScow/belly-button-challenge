const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function buildPanel(dog) {
  d3.json(url).then(function (data) {
    let meta = data.metadata;
    let results = meta.filter((pizza) => pizza.id == dog);
    let result = Object.entries(results[0]);

    const tableBody = d3.select("#sample-metadata");

    tableBody.html("");

    for (let index = 0; index < result.length; index++) {
      const element = result[index];

      const text = `${element[0]}: ${element[1]}`;

      tableBody.append("div").text(text);
    }
  });
}

function buildCharts(cat) {
  d3.json(url).then(function (data) {
    let sample = data.samples;
    let results = sample.filter((pizza) => pizza.id == cat);
    let result = results[0];

    let trace1 = {
      x: result.sample_values.slice(0, 10).reverse(),
      y: result.otu_ids
        .slice(0, 10)
        .map((id) => `OTU ${id}`)
        .reverse(),
      text: result.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    let barGraph = [trace1];

    Plotly.newPlot("bar", barGraph);

    var trace2 = {
      x: result.otu_ids,
      y: result.sample_values,
      mode: "markers",
      marker: {
        color: result.otu_ids,
        size: result.sample_values,
      },
    };

    let layout2 = {
      title: result.otu_labels,
    };

    let bubbleChart = [trace2];

    Plotly.newPlot("bubble", bubbleChart, layout2);

  });
}

function optionChanged(x) {
  buildPanel(x);
  buildCharts(x);
}

function init() {
  d3.json(url).then(function (data) {
    let names = data.names;
    let dropDown = d3.select("#selDataset");

    for (let i = 0; i < names.length; i++) {
      dropDown.append("option").text(names[i]).property("value", names[i]);
    }
    optionChanged(names[0]);
  });
}
init();