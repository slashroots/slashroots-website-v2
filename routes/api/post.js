(function(){
	var keystone = require('keystone'),
		Post = keystone.list('Post'),
		User = keystone.list('User');

	exports.index = function(req, res){
		res.json({message: "All Posts"});
	};

	exports.show = function(req, res){
		res.json({message: "One Post"});
	};

})();
