d3app.controller('MainController', ['$scope', '$http', '$timeout', 'InputDataService', function($scope, $http, $timeout, InputDataService){

	$scope.nodes = InputDataService.input.nodes;
	$scope.links = InputDataService.input.links;

	$scope.groupColors = ["#ab003a", "#002d61", "#f08c00", "#0080c4", "#64E572", "#FF9655", "#FFF263", "#6AF9C4"];

	
	
	$scope.config = {
		id: null,
		nodes: $scope.nodes,
		links: $scope.links,
		groupColors: $scope.groupColors,
		autosize: false,
		width: 1280,
		height: 800,
        events: {
            dragMove: function dragMove(d) {
                var margin = {top: 1, right: 1, bottom: 6, left: 1},
                    width = $scope.config.width - margin.left - margin.right,
                    height = $scope.config.height - margin.top - margin.bottom;

                var sankey = d3.sankey(width)
                        .nodeWidth(15)
                        .nodePadding(10)
                        .size([width, height]);   

                var path = sankey.link(); 
                var sankeyidentifier = null;
                if($scope.id != null || $scope.id == ""){
                    sankeyidentifier = $scope.id;
                } else{
                    sankeyidentifier = "sankeyid";
                }
                var svg = d3.select("#"+sankeyidentifier+" svg");
                var link = svg.selectAll("path.link");        

                d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
                sankey.relayout();
                link.attr("d", path);
            },
            onClick: function onClick(d){
                // binded to node
                alert("Link from "+d.source.name +" to " + d.target.name +" was clicked");
            },
            onMouseEnter: function onMouseEnter(d){
                // binded to path.link
                console.log("mouseenter");
            },
            onMouseOut: function onMouseOut(d){
                // binded to path.link
                console.log("mouseout");
            },
            onMouseOver: function onMouseOver(d){
                // binded to path.link
                console.log("mouseover");
            },
            onMouseLeave: function onMouseLeave(d){
                // binded to path.link
                console.log("mouseleave");
            }



        }
        
	}

	
	

// **********************************************************
// Testing watches
// **********************************************************
$timeout(function(){
	
    $scope.config = {
        id: null,
        nodes: $scope.nodes,
        links: $scope.updatelinks,
        groupColors: $scope.groupColors,
        autosize: false,
        width: 1280,
        height: 800,
         events: {
            dragMove: function dragMove(d) {
                var margin = {top: 1, right: 1, bottom: 6, left: 1},
                    width = $scope.config.width - margin.left - margin.right,
                    height = $scope.config.height - margin.top - margin.bottom;

                var sankey = d3.sankey(width)
                        .nodeWidth(15)
                        .nodePadding(10)
                        .size([width, height]);   

                var path = sankey.link(); 
                var sankeyidentifier = null;
                if($scope.id != null || $scope.id == ""){
                    sankeyidentifier = $scope.id;
                } else{
                    sankeyidentifier = "sankeyid";
                }
                var svg = d3.select("#"+sankeyidentifier+" svg");
                var link = svg.selectAll("path.link");        

                d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
                sankey.relayout();
                link.attr("d", path);
            },
            onClick: function onClick(d){
                // binded to node
                alert("Link from "+d.source.name +" to " + d.target.name +" was clicked");
            },
            onMouseEnter: function onMouseEnter(d){
                // binded to path.link
                console.log("mouseenter");
            },
            onMouseOut: function onMouseOut(d){
                // binded to path.link
                console.log("mouseout");
            },
            onMouseOver: function onMouseOver(d){
                // binded to path.link
                console.log("mouseover");
            },
            onMouseLeave: function onMouseLeave(d){
                // binded to path.link
                console.log("mouseleave");
            }
        }
    }

	$scope.updatelinks = [
        {
            "source": 0,
            "target": 2,
            "value": 1204.729
        },
        {
            "source": 1,
            "target": 2,
            "value": 0.597
        },
        {
            "source": 1,
            "target": 3,
            "value": 26.862
        },
        {
            "source": 1,
            "target": 4,
            "value": 280.322
        },
        {
            "source": 1,
            "target": 5,
            "value": 81.144
        },
        {
            "source": 6,
            "target": 2,
            "value": 35
        },
        {
            "source": 7,
            "target": 4,
            "value": 35
        },
        {
            "source": 8,
            "target": 9,
            "value": 11.606
        },
        {
            "source": 10,
            "target": 9,
            "value": 63.965
        },
        {
            "source": 9,
            "target": 4,
            "value": 75.571
        },
        {
            "source": 11,
            "target": 12,
            "value": 10.639
        },
        {
            "source": 11,
            "target": 13,
            "value": 22.505
        },
        {
            "source": 11,
            "target": 14,
            "value": 46.184
        },
        {
            "source": 15,
            "target": 16,
            "value": 104.453
        },
        {
            "source": 15,
            "target": 14,
            "value": 113.726
        },
        {
            "source": 15,
            "target": 17,
            "value": 27.14
        },
        {
            "source": 15,
            "target": 12,
            "value": 342.165
        },
        {
            "source": 15,
            "target": 18,
            "value": 37.797
        },
        {
            "source": 15,
            "target": 19,
            "value": 4.412
        },
        {
            "source": 15,
            "target": 13,
            "value": 40.858
        },
        {
            "source": 15,
            "target": 3,
            "value": 56.691
        },
        {
            "source": 15,
            "target": 20,
            "value": 7.863
        },
        {
            "source": 15,
            "target": 21,
            "value": 90.008
        },
        {
            "source": 15,
            "target": 22,
            "value": 93.494
        },
        {
            "source": 23,
            "target": 24,
            "value": 40.719
        },
        {
            "source": 25,
            "target": 24,
            "value": 82.233
        },
        {
            "source": 5,
            "target": 13,
            "value": 0.129
        },
        {
            "source": 5,
            "target": 3,
            "value": 1.401
        },
        {
            "source": 5,
            "target": 26,
            "value": 151.891
        },
        {
            "source": 5,
            "target": 19,
            "value": 2.096
        },
        {
            "source": 5,
            "target": 12,
            "value": 48.58
        },
        {
            "source": 27,
            "target": 15,
            "value": 7.013
        },
        {
            "source": 17,
            "target": 28,
            "value": 20.897
        },
        {
            "source": 17,
            "target": 3,
            "value": 6.242
        },
        {
            "source": 28,
            "target": 18,
            "value": 20.897
        },
        {
            "source": 29,
            "target": 15,
            "value": 6.995
        },
        {
            "source": 2,
            "target": 12,
            "value": 121.066
        },
        {
            "source": 2,
            "target": 30,
            "value": 128.69
        },
        {
            "source": 2,
            "target": 18,
            "value": 135.835
        },
        {
            "source": 2,
            "target": 31,
            "value": 14.458
        },
        {
            "source": 2,
            "target": 32,
            "value": 206.267
        },
        {
            "source": 2,
            "target": 19,
            "value": 3.64
        },
        {
            "source": 2,
            "target": 33,
            "value": 33.218
        },
        {
            "source": 2,
            "target": 20,
            "value": 4.413
        },
        {
            "source": 34,
            "target": 1,
            "value": 4.375
        },
        {
            "source": 24,
            "target": 5,
            "value": 122.952
        },
        {
            "source": 35,
            "target": 26,
            "value": 839.978
        },
        {
            "source": 36,
            "target": 37,
            "value": 504.287
        },
        {
            "source": 38,
            "target": 37,
            "value": 107.703
        },
        {
            "source": 37,
            "target": 2,
            "value": 611.99
        },
        {
            "source": 39,
            "target": 4,
            "value": 56.587
        },
        {
            "source": 39,
            "target": 1,
            "value": 77.81
        },
        {
            "source": 40,
            "target": 14,
            "value": 193.026
        },
        {
            "source": 40,
            "target": 13,
            "value": 70.672
        },
        {
            "source": 41,
            "target": 15,
            "value": 59.901
        },
        {
            "source": 42,
            "target": 14,
            "value": 19.263
        },
        {
            "source": 43,
            "target": 42,
            "value": 19.263
        },
        {
            "source": 43,
            "target": 41,
            "value": 59.901
        },
        {
            "source": 4,
            "target": 19,
            "value": 0.882
        },
        {
            "source": 4,
            "target": 26,
            "value": 400.12
        },
        {
            "source": 4,
            "target": 12,
            "value": 46.477
        },
        {
            "source": 26,
            "target": 15,
            "value": 525.531
        },
        {
            "source": 26,
            "target": 3,
            "value": 787.129
        },
        {
            "source": 26,
            "target": 11,
            "value": 79.329
        },
        {
            "source": 44,
            "target": 15,
            "value": 9.452
        },
        {
            "source": 45,
            "target": 1,
            "value": 182.01
        },
        {
            "source": 46,
            "target": 15,
            "value": 19.013
        },
        {
            "source": 47,
            "target": 15,
            "value": 289.366
        },
        {
            "source": 47,
            "target": 1,
            "value": 289.366
        }
    ];
}, 3500);

}]);