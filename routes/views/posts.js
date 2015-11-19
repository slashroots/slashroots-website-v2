(function(){
	var keystone = require('keystone'),
		common = require('../../routes/common/common');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		Post = keystone.list('Post'),
		User = keystone.list('User'),
		author = getAuthorNameFromUrl(req),
		query = common.getMenu(),
		locals = res.locals;
		locals.data = {
			posts: [],
			menu: []
		};
	
		query.exec(function(err, menu){
				if(err || !menu){
					locals.data.menu = common.getStaticMenu();
				}else{
					locals.data.menu = menu;
				}
		});
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
					.exec(function(err, posts) {
							locals.data.posts = posts;
							next(err);
					});					
			});
		});	
	view.render('posts');			  
	}
})();

	
