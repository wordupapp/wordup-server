/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable no-mixed-operators */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/**
 * COMPONENT
 */

class DataVisUsageTrends extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      svg: {
        overflow: "visible",
      },
    };
  }

  componentDidMount() {
    if ((Object.keys(this.props.userWords)).length) {
      this.createBubbles(this.props.userWords);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.createBubbles(nextProps.userWords);
  // }

  createBubbleStructure(data) {
    const userSampleWords = [
      { id: 1, word: "test", level: 1, numUsed: 30, year: 2015 },
      { id: 2, word: "magnanimous", level: 2, numUsed: 40, year: 2016 },
      { id: 3, word: "daddy", level: 3, numUsed: 50, year: 2017 },
    ];

    const bubblesData = [];
    const userWords = data.userWords;
    // 2015 nyeCusp = 1420092000000
    // 2016 nyeballdrop = 1451628000000
    // 2017 nyeballdrop = 1483250400000
    // 2018 nyeballdrop = 1514786400000
    Object.entries(userWords).forEach(function (entry, index) {
      // if (entry[1].)
      bubblesData.push({
        id: index,
        word: entry[0],
        level: entry[1].level,
        numUsed: entry[1].numUsed,

      });
    });

    let level1Words = [];
    let level2Words = [];
    let level3Words = [];
    let level4Words = [];
    let level5Words = [];
    let level6Words = [];
    let level7Words = [];
    let level8Words = [];
    let level9Words = [];
    let level10Words = [];

    var rootWords = Object.entries(data.userWords);
    rootWords.forEach(function (word) {
      if (word[1].level === 1) {
        level1Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 2) {
        level2Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 3) {
        level3Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 4) {
        level4Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 5) {
        level5Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 6) {
        level6Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 7) {
        level7Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 8) {
        level8Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 9) {
        level9Words.push({ "name": word[0], "size": word[1].numUsed });
      } else if (word[1].level === 10) {
        level10Words.push({ "name": word[0], "size": word[1].numUsed });
      }
    });

    const childrenWords = [];
    if (!level1Words.length) level1Words = [{ "name": "You have not used any words from level 1 yet!", "size": 10 }];
    if (!level2Words.length) level2Words = [{ "name": "You have not used any words from level 2 yet!", "size": 10 }];
    if (!level3Words.length) level3Words = [{ "name": "You have not used any words from level 3 yet!", "size": 10 }];
    if (!level4Words.length) level4Words = [{ "name": "You have not used any words from level 4 yet!", "size": 10 }];
    if (!level5Words.length) level5Words = [{ "name": "You have not used any words from level 5 yet!", "size": 10 }];
    if (!level6Words.length) level6Words = [{ "name": "You have not used any words from level 6 yet!", "size": 10 }];
    if (!level7Words.length) level7Words = [{ "name": "You have not used any words from level 7 yet!", "size": 10 }];
    if (!level8Words.length) level8Words = [{ "name": "You have not used any words from level 8 yet!", "size": 10 }];
    if (!level9Words.length) level9Words = [{ "name": "You have not used any words from level 9 yet!", "size": 10 }];
    if (!level10Words.length) level10Words = [{ "name": "You have not used any words from level 10 yet!", "size": 10 }];
    childrenWords.push({ "name": "Level 1", "children": level1Words }, { "name": "Level 2", "children": level2Words }, { "name": "Level 3", "children": level3Words }, { "name": "Level 4", "children": level4Words }, { "name": "Level 5", "children": level5Words }, { "name": "Level 6", "children": level6Words }, { "name": "Level 7", "children": level7Words }, { "name": "Level 8", "children": level8Words }, { "name": "Level 9", "children": level9Words }, { "name": "Level 10", "children": level10Words });

    return bubblesData;
  }

  createBubbles(rootParam) {
    /* bubbleChart creation function. Returns a function that will
     * instantiate a new bubble chart given a DOM element to display
     * it in and a dataset to visualize.
     *
     * Organization and style inspired by:
     * https://bost.ocks.org/mike/chart/
     *
     */
    const componentThis = this;
    function bubbleChart() {
      // Constants for sizing
      var width = 940;
      var height = 600;

      // tooltip for mouseover functionality
      /*
       * Creates tooltip with provided id that
       * floats on top of visualization.
       * Most styling is expected to come from CSS
       * so check out bubble_chart.css for more details.
       */
      function floatingTooltip(tooltipId, width) {
        // Local variable to hold tooltip div for
        // manipulation in other functions.
        var tt = d3.select('body')
          .append('div')
          .attr('class', 'tooltip')
          .attr('id', tooltipId)
          .style('pointer-events', 'none');

        // Set a width if it is provided.
        if (width) {
          tt.style('width', width);
        }

        // Initially it is hidden.
        hideTooltip();

        /*
         * Display tooltip with provided content.
         *
         * content is expected to be HTML string.
         *
         * event is d3.event for positioning.
         */
        function showTooltip(content, event) {
          tt.style('opacity', 1.0)
            .html(content);

          updatePosition(event);
        }

        /*
         * Hide the tooltip div.
         */
        function hideTooltip() {
          tt.style('opacity', 0.0);
        }

        /*
         * Figure out where to place the tooltip
         * based on d3 mouse event.
         */
        function updatePosition(event) {
          var xOffset = 20;
          var yOffset = 10;

          var ttw = tt.style('width');
          var tth = tt.style('height');

          var wscrY = window.scrollY;
          var wscrX = window.scrollX;

          var curX = (document.all) ? event.clientX + wscrX : event.pageX;
          var curY = (document.all) ? event.clientY + wscrY : event.pageY;
          var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
            curX - ttw - xOffset * 2 : curX + xOffset;

          if (ttleft < wscrX + xOffset) {
            ttleft = wscrX + xOffset;
          }

          var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
            curY - tth - yOffset * 2 : curY + yOffset;

          if (tttop < wscrY + yOffset) {
            tttop = curY + yOffset;
          }

          tt
            .style('top', tttop + 'px')
            .style('left', ttleft + 'px');
        }

        return {
          showTooltip: showTooltip,
          hideTooltip: hideTooltip,
          updatePosition: updatePosition
        };
      }
      var tooltip = floatingTooltip('words_tooltip', 240);

      // Locations to move bubbles towards, depending
      // on which view mode is selected.
      var center = { x: width / 2, y: height / 2 };

      var yearCenters = {
        2015: { x: width / 3, y: height / 2 },
        2016: { x: width / 2, y: height / 2 },
        2017: { x: 2 * width / 3, y: height / 2 }
      };

      // X locations of the year titles.
      var yearsTitleX = {
        2015: 160,
        2016: width / 2,
        2017: width - 160
      };

      // @v4 strength to apply to the position forces
      var forceStrength = 0.03;

      // These will be set in create_nodes and create_vis
      var svg = null;
      var bubbles = null;
      var nodes = [];

      // Charge function that is called for each node.
      // As part of the ManyBody force.
      // This is what creates the repulsion between nodes.
      //
      // Charge is proportional to the diameter of the
      // circle (which is stored in the radius attribute
      // of the circle's associated data.
      //
      // This is done to allow for accurate collision
      // detection with nodes of different sizes.
      //
      // Charge is negative because we want nodes to repel.
      // @v4 Before the charge was a stand-alone attribute
      //  of the force layout. Now we can use it as a separate force!
      function charge(d) {
        return -Math.pow(d.radius, 2.0) * forceStrength;
      }

      // Here we create a force layout and
      // @v4 We create a force simulation now and
      //  add forces to it.
      var simulation = d3.forceSimulation()
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        .on('tick', ticked);

      // @v4 Force starts up automatically,
      //  which we don't want as there aren't any nodes yet.
      simulation.stop();

      // Nice looking colors - no reason to buck the trend
      // @v4 scales now have a flattened naming scheme
      var fillColor = d3.scaleOrdinal()
        .domain(['low', 'medium', 'high'])
        .range(['#d84b2a', '#beccae', '#7aa25c']);


      /*
       * This data manipulation function takes the raw data from
       * the CSV file and converts it into an array of node objects.
       * Each node will store data and visualization values to visualize
       * a bubble.
       *
       * rawData is expected to be an array of data objects, read in from
       * one of d3's loading functions like d3.csv.
       *
       * This function returns the new node array, with a node in that
       * array for each element in the rawData input.
       */
      function createNodes(rawData) {
        // Use the max total_amount in the data as the max in the scale's domain
        // note we have to ensure the total_amount is a number.
        var maxAmount = d3.max(rawData, function (d) { return +d.total_amount; });

        // Sizes bubbles based on area.
        // @v4: new flattened scale names.
        var radiusScale = d3.scalePow()
          .exponent(0.5)
          .range([2, 85])
          .domain([0, maxAmount]);

        // Use map() to convert raw data into node data.
        // Checkout http://learnjsdata.com/ for more on
        // working with data.
        var myNodes = rawData.map(function (d) {
          return {
            id: d.id,
            radius: radiusScale(+d.total_amount),
            value: +d.total_amount,
            name: d.grant_title,
            org: d.organization,
            group: d.group,
            year: d.start_year,
            x: Math.random() * 900,
            y: Math.random() * 800
          };
        });

        // sort them to prevent occlusion of smaller nodes.
        myNodes.sort(function (a, b) { return b.value - a.value; });

        return myNodes;
      }

      /*
       * Main entry point to the bubble chart. This function is returned
       * by the parent closure. It prepares the rawData for visualization
       * and adds an svg element to the provided selector and starts the
       * visualization creation process.
       *
       * selector is expected to be a DOM element or CSS selector that
       * points to the parent element of the bubble chart. Inside this
       * element, the code will add the SVG continer for the visualization.
       *
       * rawData is expected to be an array of data objects as provided by
       * a d3 loading function like d3.csv.
       */
      var chart = function chart(selector, rawData) {
        // convert raw data into nodes data
        nodes = createNodes(rawData);

        // Create a SVG element inside the provided selector
        // with desired size.
        svg = d3.select(selector);
        // .append('svg')
        // .attr('width', width)
        // .attr('height', height);

        // Bind nodes data to what will become DOM elements to represent them.
        bubbles = svg.selectAll('.bubble')
          .data(nodes, function (d) { return d.id; });

        // Create new circle elements each with class `bubble`.
        // There will be one circle.bubble for each object in the nodes array.
        // Initially, their radius (r attribute) will be 0.
        // @v4 Selections are immutable, so lets capture the
        //  enter selection to apply our transtition to below.
        var bubblesE = bubbles.enter().append('circle')
          .classed('bubble', true)
          .attr('r', 0)
          .attr('fill', function (d) { return fillColor(d.group); })
          .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
          .attr('stroke-width', 2)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail);

        // @v4 Merge the original empty selection and the enter selection
        bubbles = bubbles.merge(bubblesE);

        // Fancy transition to make bubbles appear, ending with the
        // correct radius
        bubbles.transition()
          .duration(2000)
          .attr('r', function (d) { return d.radius; });

        // Set the simulation's nodes to our newly created nodes array.
        // @v4 Once we set the nodes, the simulation will start running automatically!
        simulation.nodes(nodes);

        // Set initial layout to single group.
        groupBubbles();
      };

      /*
       * Callback function that is called after every tick of the
       * force simulation.
       * Here we do the acutal repositioning of the SVG circles
       * based on the current x and y values of their bound node data.
       * These x and y values are modified by the force simulation.
       */
      function ticked() {
        bubbles
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });
      }

      /*
       * Provides a x value for each node to be used with the split by year
       * x force.
       */
      function nodeYearPos(d) {
        console.log(d);
        return yearCenters[d.year].x;
      }


      /*
       * Sets visualization in "single group mode".
       * The year labels are hidden and the force layout
       * tick function is set to move all nodes to the
       * center of the visualization.
       */
      function groupBubbles() {
        hideYearTitles();

        // @v4 Reset the 'x' force to draw the bubbles to the center.
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
      }


      /*
       * Sets visualization in "split by year mode".
       * The year labels are shown and the force layout
       * tick function is set to move nodes to the
       * yearCenter of their data's year.
       */
      function splitBubbles() {
        showYearTitles();

        // @v4 Reset the 'x' force to draw the bubbles to their year centers
        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
      }

      /*
       * Hides Year title displays.
       */
      function hideYearTitles() {
        svg.selectAll('.year').remove();
      }

      /*
       * Shows Year title displays.
       */
      function showYearTitles() {
        // Another way to do this would be to create
        // the year texts once and then just hide them.
        var yearsData = d3.keys(yearsTitleX);
        var years = svg.selectAll('.year')
          .data(yearsData);

        years.enter().append('text')
          .attr('class', 'year')
          .attr('x', function (d) { return yearsTitleX[d]; })
          .attr('y', 40)
          .attr('text-anchor', 'middle')
          .text(function (d) { return d; });
      }


      /*
       * Function called on mouseover to display the
       * details of a bubble in the tooltip.
       */
      function showDetail(d) {
        // change outline to indicate hover state.
        d3.select(this).attr('stroke', 'black');

        var content = '<span class="name">Title: </span><span class="value">' +
          d.name +
          '</span><br/>' +
          '<span class="name">Amount: </span><span class="value">' + d.value +
          '</span><br/>' +
          '<span class="name">Year: </span><span class="value">' +
          d.year +
          '</span>';

        tooltip.showTooltip(content, d3.event);
      }

      /*
       * Hides tooltip
       */
      function hideDetail(d) {
        // reset outline
        d3.select(this)
          .attr('stroke', d3.rgb(fillColor(d.group)).darker());

        tooltip.hideTooltip();
      }

      /*
       * Externally accessible function (this is attached to the
       * returned chart function). Allows the visualization to toggle
       * between "single group" and "split by year" modes.
       *
       * displayName is expected to be a string and either 'year' or 'all'.
       */
      chart.toggleDisplay = function (displayName) {
        if (displayName === 'year') {
          splitBubbles();
        } else {
          groupBubbles();
        }
      };


      // return the chart function from closure.
      return chart;
    }

    /*
     * Below is the initialization code as well as some helper functions
     * to create a new bubble chart instance, load the data, and display it.
     */

    var myBubbleChart = bubbleChart();
    myBubbleChart(this.svgRoot, rootParam);

    /*
     * Function called once data is loaded from CSV.
     * Calls bubble chart function to display inside #vis div.
     */
    // function display(error, data) {
    //   if (error) {
    //     console.log(error);
    //   }

    //   myBubbleChart('#vis', data);
    // }

    /*
     * Sets up the layout buttons to allow for toggling between view modes.
     */
    function setupButtons() {
      d3.select('#toolbar')
        .selectAll('.button')
        .on('click', function () {
          // Remove active class from all buttons
          d3.selectAll('.button').classed('active', false);
          // Find the button just clicked
          var button = d3.select(this);

          // Set it as the active button
          button.classed('active', true);

          // Get the id of the button
          var buttonId = button.attr('id');

          // Toggle the bubble chart based on
          // the currently clicked button.
          myBubbleChart.toggleDisplay(buttonId);
        });
    }

    /*
     * Helper function to convert a number into a string
     * and add commas to it to improve presentation.
     */
    // function addCommas(nStr) {
    //   nStr += '';
    //   var x = nStr.split('.');
    //   var x1 = x[0];
    //   var x2 = x.length > 1 ? '.' + x[1] : '';
    //   var rgx = /(\d+)(\d{3})/;
    //   while (rgx.test(x1)) {
    //     x1 = x1.replace(rgx, '$1' + ',' + '$2');
    //   }

    //   return x1 + x2;
    // }

    // Load the data.
    // d3.csv('words_money.csv', display);

    // setup the buttons.
    setupButtons();
  }

  render() {
    console.log(this.props.userWords);
    const svgLength = Math.min(window.innerHeight * 0.9, window.innerWidth * 0.9);
    return (
      <div className="svgBody">
        <div className="container">
          <div id="toolbar">
            <a href="#" id="all" className="button active">All Grants</a>
            <a href="#" id="year" className="button">Grants By Year</a>
          </div>
          <div id="vis">
            <svg
              width={svgLength}
              height={svgLength}
              style={this.styles.svg}
              ref={svg => this.svgRoot = svg}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userWords: [{ id: 1, total_amount: 30, grant_title: "Grant Title 1", organization: "Sample Org 1", group: "Sample Group 1", start_year: 2015 }, { id: 2, total_amount: 40, grant_title: "Grant Title 2", organization: "Sample Org 2", group: "Sample Group 2", start_year: 2016 }, { id: 3, total_amount: 50, grant_title: "Grant Title 3", organization: "Sample Org 3", group: "Sample Group 3", start_year: 2017 }],
    // userWords: state.userWords,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default withRouter(connect(mapState, mapDispatch)(DataVisUsageTrends));

/**
 * PROP TYPES
 */
DataVisUsageTrends.propTypes = {
  userWords: PropTypes.array.isRequired,
};