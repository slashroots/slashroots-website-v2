(function(){
	var keystone = require('keystone'),
		Post = keystone.list('Post'),
		User = keystone.list('User');
	/**
	 * [index description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	exports.index = function(req, res){
		User.model.find()
			.where('name.first','Matthew')
			.where('name.last', 'McNaughton')
			.exec(function(err, user){
				Post.model
					.find()
					.where('author', user[0]._id)
					.populate('author', 'name')
					.limit(req.query.limit)
					.skip(req.query.skip)
					.exec(function(err, posts) {
							res.send(posts);
					}); 
			});
	};
})();
