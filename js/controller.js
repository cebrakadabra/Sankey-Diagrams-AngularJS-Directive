d3app.controller('MainController', ['$scope', '$http', 'InputDataService', function($scope, $http, InputDataService){

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
		height: 800
	}

}]);