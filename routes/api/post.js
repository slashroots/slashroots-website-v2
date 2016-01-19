(function(){
	var keystone = require('keystone'),
		Post = keystone.list('Post'),
		User = keystone.list('User');
	/**
	 * Get all posts.
	 * @param req
	 * @param res
	 */
	exports.index = function(req, res){
		res.json({message: "All Posts"});
	};
	/**
	 * Get a single post.
	 * @param req
	 * @param res
	 */
	exports.show = function(req, res){
		res.json({message: "One Post"});
	};
	/**
	 * Searches database for posts by matching a criteria.
	 * @param req
	 * @param res
	 */
	exports.search = function(req, res){
		res.json({message: "Search posts"});
	};

})();
