var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals,
		Post = keystone.list('Post'),
		PostCategory = keystone.list('PostCategory');
	
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {};
	// Load the current post
	view.on('init', function(next) {
		if(locals.filters.post === "a-community-for-doers-makers-and-innovators-sharing-knowledge-and-making-a-difference-in-the-caribbean"){
			res.redirect('https://groups.google.com/forum/#!forum/slashroots');
		}else if(locals.filters.post === "we-are-the-slashroots-foundation"){
			res.url('/about');
		}else{
			Post.model.findOne({
				state: 'published',
				slug: locals.filters.post
			})
			.populate('author', 'name')
			.populate('categories')
			.populate('project')
			.exec(function(err, post) {
				locals.data.post = post;	
				next(err);		
			});	
		}
	});//end of view

	view.on('init', function(next){
		PostCategory.model
					.find()
					.where('key',locals.data.post.categories[0].key)
					.exec(function(err, id){
						locals.data.categoryID = id[0]._id;
						next(err)
					});		
	});

	view.on('init', function(next){
		Post.model.find()
				.where('state', 'published')
				.where('slug').ne(locals.filters.post)
				.sort('-publishedDate')
				.where('categories', locals.data.categoryID)
				.populate('categories')
				.limit(2)					
				.exec(function(err, posts){
						locals.data.posts = posts;
						next(err);
				});	
	});
view.render('post');
}//end of export
	

