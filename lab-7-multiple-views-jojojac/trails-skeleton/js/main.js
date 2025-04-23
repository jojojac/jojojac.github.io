
// Global objects go here (outside of any functions)
let difficultyFilter = [];

/**
 * Load data from CSV file asynchronously and render charts
 */
let data, scatterplot, barchart; 

const dispatcher = d3.dispatch('filterCategories');

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

    // ... data preprocessing etc. ... TODO: you add code here for numeric
    // Be sure to examine your data to fully understand the code
    // TODO: add an ordinal scale for the difficulty
    const colorScale = d3.scaleOrdinal()
                        .domain(["Easy", "Intermediate", "Difficult"])
                        .range(["#c7e9c0", "#74c476", "#00441b"]);

    // TODO: add an ordinal scale for the difficulty
    data.forEach(row => {
        row.time = +row.time;                      
        row.distance = +row.distance;                  
        // row.difficulty = colorScale(row.difficulty);
    });


    console.log(data);              
     // See Lab 4 for help

      const  scatterConfig = {
          parentElement: '#scatterplot',
          colorScale: colorScale
      };

      scatterplot = new Scatterplot(scatterConfig, data); //we will update config soon
      scatterplot.updateVis();

      const  barConfig = {
        parentElement: '#barchart',
        colorScale: colorScale
    };

    barchart = new Barchart(barConfig, dispatcher, data);
    barchart.updateVis();

    dispatcher.on('filterCategories', selectedCategories => {
        if (selectedCategories.length === 0) {
          scatterplot.data = data;
        } else {
          scatterplot.data = data.filter(d =>
            selectedCategories.includes(d.difficulty)
          );
        }

        scatterplot.updateVis();
      });

    //   barchart = new Barchart({
    //     parentElement: '#barchart'
    // },  dispatcher, data);

    //  barchart = new Barchart(barConfig, data);
    //  barchart.updateVis();

    // //  barchart = new Barchart({
    // //     parentElement: '#barchart'
    // // }, dispatcher, data);
   })
  .catch(error => console.error(error));



/**
 * Use bar chart as filter and update scatter plot accordingly
 */
function filterData() {
    if (difficultyFilter.length === 0) {
        scatterplot.data = data;
    } else {
        scatterplot.data = data.filter( d =>
            difficultyFilter.includes(d.difficulty)
        );
    }

    scatterplot.updateVis();
}

 
