d3app.factory('InputDataService', ['$filter', '$http',  function($filter, $http){

	
	var input = {
		nodes: null,
		links: null
	};
	
	$http.get('json/input_structure.json').success(function(data) {
		input.nodes = data.nodes;
		input.links = data.links;
	});
	

	return {
		input: input
	}
	
}]); // Ende von InputDataService
