(function(){
	var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		Post = keystone.list('Post'),
		User = keystone.list('User'),
		locals = res.locals;
	locals.data = {
		posts: []
	};
	var author = getAuthorNameFromUrl(req);
	/**
	 * getAuthorNameFromUrl Parse the url of the request to get the author's name.
	 * @param  {[type]} req 
	 * @return {Array}     Name of the author.
	 */
	function getAuthorNameFromUrl(req){
		var temp = req.url.replace('/author/', "");
		return temp.split("-");
	}
	//Get the author's related posts from the database.
	view.on('init', function(next){
		User.model.find()
			.where('name.first',author[0])
			.where('name.last', author[1])
			.exec(function(err, user){
				Post.model
					.find()
					.where('author', user[0]._id)
					.populate('author', 'name')
					.limit(3)
					.skip(1)
					.exec(function(err, posts) {
							locals.data.posts = posts;
							next(err);
					});					
			});
		});	
	view.render('posts');			  
	}
})();

	
