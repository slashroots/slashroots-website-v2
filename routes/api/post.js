(function(){
	var keystone = require('keystone'),
		Post = keystone.list('Post'),
		User = keystone.list('User');
	/**
	 * Lists all posts. 
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	exports.index = function(req, res){
		
	};

	function getPostsByAuthor(author){
		
	}

	/**
	 * List posts by author
	 */
	exports.author = function(req, res){
		console.log(req.query);
		res.send({message: 'Author'});
		// User.model.find()
		// 	.where('name.first',author.first_name)
		// 	.where('name.last', author.last_name)
		// 	.exec(function(err, user){
		// 		Post.model
		// 			.find()
		// 			.where('author', user[0]._id)
		// 			.populate('author', 'name')
		// 			.limit(req.query.limit)
		// 			.skip(req.query.skip)
		// 			.exec(function(err, posts) {
		// 					res.send(posts);
		// 			}); 
		// 	});
	}
})();
