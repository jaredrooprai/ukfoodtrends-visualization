var selectedYear =  document.getElementById("slider").value ;
var init = 0;
var rootNode;
var treemapLayout;
var containerID = 0;
var tooltip;

sliderFunction();

function sliderFunction(){
    selectedYear = document.getElementById("slider").value;
    //set text
    document.getElementById("year").textContent=selectedYear;


      if (init == 1){
        d3.json("ukfoodtrends.json", function(error, data)
        {
          rootNode.sum(function(d) {
              return getLetter(d, selectedYear);
          })

          treemapLayout(rootNode);

          d3.selectAll('g')
          .transition()
          .duration(2000)
          .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})

          d3.selectAll('rect')
          .transition()
          .duration(500)
          .attr('width', function(d) { return d.x1 - d.x0; })
          .attr('height', function(d) { return d.y1 - d.y0; });

        })



      } else {
        d3.json("ukfoodtrends.json", function(error, data)
        {

          treemapLayout = d3.treemap()
          .size([1200, 650])
          .paddingOuter(15);

          treemapLayout.tile(d3.treemapSquarify)

          rootNode = d3.hierarchy(data)

          rootNode.sum(function(d) {
              return getLetter(d, selectedYear);
          });

          treemapLayout(rootNode);


          var nodes = d3.select("#chart")
            .append('svg')
            .attr("width", "2000")
            .attr("height", "650")
            .selectAll('g')
            .data(rootNode.descendants())
            .enter()
              .append('g')
              .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})

          nodes
            .append('rect')
            .style('fill', function(d){ return getColor(d); })
            .style('stroke',function(d){ return getStroke(d); })
            .style('opacity', "0.5")
            .attr('width', function(d) { return d.x1 - d.x0; })
            .attr('height', function(d) { return d.y1 - d.y0; })
            .attr('class', function(d){ return d.data.name; })
            .on("mouseover", function(d){
              handleMouseOver(d, selectedYear);
            })
            .on("mouseout", function(d){
              handleMouseOut(d);
            })
            .on("mousemove", function(d){
              handleMouseMove(d);
            })

          nodes
            .append('text')
            .attr('class', 'unselectable')
            .style("font-size", "10px")
            .style("font-size", "10px")
            .on("mouseover", function(d){
              handleMouseOver(d, selectedYear);
            })
            .on("mouseout", function(d){
              handleMouseOut(d);
            })
            .on("mousemove", function(d){
              handleMouseMove(d);
            })
            .attr('dx', 1)
            .attr('dy', 14)
            .text(function(d) {
              x = d.data.name
              color = d.data.color
              if (color == "background"){
                return null
              } else if (d.data.e == null){
                return d.data.name;
              } else if (color == "flour"){
                return d.data.name;
              }
              else {
                return "\xa0";
              }
            })

            tooltip = d3.select("#chart")
              .append("div")
              .attr("id", "tooltip")
              .attr("class", "tooltip")

            tooltip.append("div")
                .attr("class", "label");



        })
        init =1;


      }

}

    function handleMouseMove(d){
      tooltip
      .style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX + 10) + 'px');
    }

    function handleMouseOver(d, y){
      x = getLetter(d.data,y)
      if (x === undefined){
        tooltip.select(".label").html(d.data.name);
      }else {
        tooltip.select(".label").html(d.data.name + ": " + x + " g");
      }
      tooltip.style("display","block");
    }

    function handleMouseOut(d){
      tooltip
        .style("display","none")
    }

    function getStroke(d){
      color = d.data.color
      if (color === "background"){
        return "white";
      } else {
        return "black";
      }
    }

    function getColor(d){
      x = d.data.name
      color = d.data.color

      if ( color === "background" ){
        tree_color = "white";
      }
      else if (color === "milk"){
        tree_color = "#fabebe";
      }
      else if (color === "cheese"){
        tree_color = "#f58231";
      }
      else if (color === "Carcase meat"){
        tree_color = "#d2f53c";
      }
      else if (color === "non-carcase"){
        tree_color = "#0082c8";
      }
      else if (color === "fats"){
        tree_color = "#ffe119";
      }
      else if (color === "fish"){
        tree_color = "#911eb4";
      }
      else if (color === "sugar"){
        tree_color = "#46f0f0";
      }
      else if (color === "potatoes"){
        tree_color = "#f032e6";
      }
      else if (color === "vegetables"){
        tree_color = "#3cb44b";
      }
      else if (color === "fruit"){
        tree_color = "#64FFDA";
      }
      else if (color === "bread"){
        tree_color = "#e6beff";
      }
      else if (color === "flour"){
        tree_color = "#008080";
      }
      else if (color == "cakes"){
        tree_color = "#e6194b";
      }
      else if (color == "biscuit"){
        tree_color = "#aa6e28";
      }
      else if (color == "cereal"){
        tree_color = "#fffac8";
      }
      else if (color == "beverages"){
        tree_color = "#E0E0E0";
      }
      else if (color == "foodanddrink"){
        tree_color = "#800000";
      }
      else if (color == "softdrinks"){
        tree_color = "#aaffc3";
      }
      else if (color == "confectionery"){
        tree_color = "#ffd8b1";
      }
      else if (color == "alcoholicdrinks"){
        tree_color = "#808000";
      }
      return tree_color;
    }

    function getLetter(d, year){
      if (year == "1992"){
        return d.e
      }
      else if (year == "1993"){
        return d.f
      }
      else if (year == "1994"){
        return d.g
      }
      else if (year == "1995"){
        return d.h
      }
      else if (year == "1996"){
        return d.i
      }
      else if (year == "1997"){
        return d.j
      }
      else if (year == "1998"){
        return d.k
      }
      else if (year == "1999"){
        return d.l
      }
      else if (year == "2000"){
        return d.m
      }
      else if (year == "2001"){
        return d.n
      }
      else if (year == "2002"){
        return d.o
      }
      else if (year == "2003"){
        return d.p
      }
      else if (year == "2004"){
        return d.q
      }
      else if (year == "2005"){
        return d.r
      }
      else if (year == "2006"){
        return d.s
      }
      else if (year == "2007"){
        return d.t
      }
      else if (year == "2008"){
        return d.u
      }
      else if (year == "2009"){
        return d.v
      }
      else if (year == "2010"){
        return d.w
      }
      else if (year == "2011"){
        return d.x
      }
      else if (year == "2012"){
        return d.y
      }
      else if (year == "2013"){
        return d.z
      }
      else if (year == "2014"){
        return d.aa
      }


    }
