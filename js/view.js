d3app.directive('d3sankeyDirective', function($parse) {
    return {
      restrict: 'E',
      scope: {
	      config: '='
	    },
      	link: function postLink(scope, element, attrs, $watch) {

      		var nodes = [];
      		var links = []; 
      		nodes = scope.config.nodes;
      		links = scope.config.links;

      		var sankeyidentifier = null;
	      	if(scope.config.id != "" && scope.config.id != undefined && scope.config.id != null){
	      		sankeyidentifier = scope.id;
	      		
	      	} else{
	      		sankeyidentifier = "sankeyid";
	      	}
	      	
	      	element.append("<div id="+sankeyidentifier+"></div>");


	      	var groupColors = null;

      		if(scope.config.groupColors != "" && scope.config.groupColors != undefined && scope.config.groupColors != null){
      			var colorgroup = scope.config.groupColors;
      			
      			for(var y = 0; y < colorgroup.length; y++){
      				var isOk  = /^#[0-9A-F]{6}$/i.test(colorgroup[y]);
      				if(isOk){
      					groupColors = colorgroup;
      				} else{
      					alert("ATTENTION\n\nA given color seems not to be in hexcode. \n\nConvention: 6digits and hexcode only. \nDefault color is used now.")
      					groupColors = ["#db003a", "#002d61", "#f08c00", "#0080c4", "#64E572", "#FF9655", "#FFF263", "#6AF9C4"];
      				}
      			}
      			
      		} else{
      			groupColors = ["#db003a", "#002d61", "#f08c00", "#0080c4", "#64E572", "#FF9655", "#FFF263", "#6AF9C4"];
      		}

      		var structure = {
      			nodes: [],
      			links: []
      		};

      		for(var i = 0; i < nodes.length; i++){
	  			structure.nodes.push({"name": nodes[i].name});
	  		}

	  		for(var y = 0; y < links.length; y++){
	  			structure.links.push({"source": links[y].source, "target": links[y].target, "value": links[y].value});
	  		}



// ********************************* SCOPE.DRAWCHART FUNC **********************************************

	      	scope.drawChart = function(w, h){

	      		var margin = {top: 1, right: 1, bottom: 6, left: 1},
			    width = w - margin.left - margin.right,
			    height = h - margin.top - margin.bottom;


				var formatNumber = d3.format(",.0f"),
				    format = function(d) { return formatNumber(d) + " TWh"; },
				    //color = d3.scale.category20();
				    color = d3.scale.ordinal()
          					.range(groupColors)
          					.domain(d3.range(0,8));



				var svg = d3.select("#"+sankeyidentifier+"").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				var sankey = d3.sankey(width)
				    .nodeWidth(15)
				    .nodePadding(10)
				    .size([width, height]);

				var path = sankey.link();


				var energy = structure;
				//d3.json("json/energy.json", function(energy) {

				  sankey
				      .nodes(energy.nodes)
				      .links(energy.links)
				      .layout(32);

				  var link = svg.append("g").selectAll(".link")
				      .data(energy.links)
				    .enter().append("path")
				      .attr("class", "link")
				      .attr("d", path)
				      .on("click", scope.config.events.onClick)
					  .on("mouseenter", scope.config.events.onMouseEnter)
			  		  .on("mouseover", scope.config.events.onMouseOver)
			          .on("mouseout", scope.config.events.onMouseOut)
			          .on("mouseleave", scope.config.events.onMouseLeave)
				      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
				      .sort(function(a, b) { return b.dy - a.dy; });

				  link.append("title")
				      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

				  var node = svg.append("g").selectAll(".node")
				      .data(energy.nodes)
				    .enter().append("g")
				      .attr("class", "node")
				      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
				    .call(d3.behavior.drag()
				      .origin(function(d) { return d; })
				      .on("dragstart", function() { this.parentNode.appendChild(this); })
				      .on("drag", scope.config.events.dragMove));
				     

				  node.append("rect")
				      .attr("height", function(d) { return d.dy; })
				      .attr("width", sankey.nodeWidth())
				      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); 
				      })
				      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
				    .append("title")
				      .text(function(d) { return d.name + "\n" + format(d.value); });

				  node.append("text")
				      .attr("x", -6)
				      .attr("y", function(d) { return d.dy / 2; })
				      .attr("dy", ".35em")
				      .attr("text-anchor", "end")
				      .attr("transform", null)
				      .text(function(d) { return d.name; })
				    .filter(function(d) { return d.x < width / 2; })
				      .attr("x", 6 + sankey.nodeWidth())
				      .attr("text-anchor", "start");

				//});

	      	};


// ********************************* SCOPE.DRAWCHART END **********************************************


// ********************************* DEFINED SIZE OR AUTOSIZING CONFIG **********************************
	


	//scope.init = function(wval, hval){
			var w = null,
			    h = null;

			if(scope.config.width == null && scope.config.height == null && scope.config.autosize == true){
				// w and h = null, autosize true
				if($("#"+clusteridentifier+"").parent().height() == 0 || $("#"+clusteridentifier+"").parent().width() == 0){
					if($("#"+clusteridentifier+"").parent().parent().height() == 0 || $("#"+clusteridentifier+"").parent().parent().width() == 0){
						w = $("body").width();
						h = $("body").height();
						scope.drawChart(w, h);

					} else{
						w = $("#"+clusteridentifier+"").parent().parent().width();
						h = $("#"+clusteridentifier+"").parent().parent().height();
						scope.drawChart(w, h);
						
					}

				} else{
					w = $("#"+clusteridentifier+"").parent().width();
					h = $("#"+clusteridentifier+"").parent().height();

					scope.drawChart(w, h);
				}


			} else if(scope.config.width != null && scope.config.height != null && scope.config.autosize == true){
				// w and h != null, but autosize true
				if($("#"+clusteridentifier+"").parent().height() == 0 || $("#"+clusteridentifier+"").parent().width() == 0){
					if($("#"+clusteridentifier+"").parent().parent().height() == 0 || $("#"+clusteridentifier+"").parent().parent().width() == 0){
						w = $("body").width();
						h = $("body").height();
						scope.drawChart(w, h);

					} else{
						w = $("#"+clusteridentifier+"").parent().parent().width();
						h = $("#"+clusteridentifier+"").parent().parent().height();
						scope.drawChart(w, h);
						
					}

				} else{
					w = $("#"+clusteridentifier+"").parent().width();
					h = $("#"+clusteridentifier+"").parent().height();
					scope.drawChart(w, h);
				}

			} else{
				// w and h in config set
				w = scope.config.width;
				h = scope.config.height;

				scope.drawChart(w, h);
				
				
			}

//		};
			


// ********************************* DEFINED SIZE OR AUTOSIZING CONFIG END **********************************
			
// ********************************* WATCHES **********************************
	
	scope.$watch('config', function(newconf, oldconf) {

	  	var margin = {top: 1, right: 1, bottom: 6, left: 1},
			    width = newconf.width - margin.left - margin.right,
			    height = newconf.height - margin.top - margin.bottom;

	  	var formatNumber = d3.format(",.0f"),
				    format = function(d) { return formatNumber(d) + " TWh"; },
				    //color = d3.scale.category20();
				    color = d3.scale.ordinal()
          					.range(groupColors)
          					.domain(d3.range(0,8));

	  	var svg = d3.select("#"+sankeyidentifier+" svg");

		var sankey = d3.sankey(width)
				    .nodeWidth(15)
				    .nodePadding(10)
				    .size([width, height]);

		var path = sankey.link();


		var energy = newconf;
		//d3.json("json/energy.json", function(energy) {

		  sankey
		      .nodes(energy.nodes)
		      .links(energy.links)
		      .layout(32);

			var link = svg.selectAll("path.link")
		      .data(energy.links)
		      .attr("d", path)
		      .on("click", newconf.events.onClick)
			  .on("mouseenter", newconf.events.onMouseEnter)
			  .on("mouseover", newconf.events.onMouseOver)
			  .on("mouseout", newconf.events.onMouseOut)
			  .on("mouseleave", newconf.events.onMouseLeave)
		      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
		      .sort(function(a, b) { return b.dy - a.dy; });

		  link.select("title")
		      .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

		  

		  var node = svg.selectAll("g.node")
		  			  .data(energy.nodes)
		  			  .call(d3.behavior.drag()
				      .origin(function(d) { return d; })
				      .on("dragstart", function() { this.parentNode.appendChild(this); })
				      .on("drag", newconf.events.dragMove))
		  			  .transition()
				      .ease("ease")
				      .duration(250)
				      .attr("class", "node")
					  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		  node.select("rect")
		      .attr("height", function(d) { return d.dy; })
		      .attr("width", sankey.nodeWidth())
		      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); 
		      })
		      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
		    .select("title")
		      .text(function(d) { return d.name + "\n" + format(d.value); });

		  node.select("text")
		      .attr("x", -6)
		      .attr("y", function(d) { return d.dy / 2; })
		      .attr("dy", ".35em")
		      .attr("text-anchor", "end")
		      .attr("transform", null)
		      .text(function(d) { return d.name; })
		    .filter(function(d) { return d.x < width / 2; })
		      .attr("x", 6 + sankey.nodeWidth())
		      .attr("text-anchor", "start");

		  


	  
	});


// ********************************* WATCHES END **********************************


			


      } // postLink end
    }; // return end
}); // directive end