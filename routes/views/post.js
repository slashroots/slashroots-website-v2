var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
	
	// Load the current post
	view.on('init', function(next) {
		if(locals.filters.post === "a-community-for-doers-makers-and-innovators-sharing-knowledge-and-making-a-difference-in-the-caribbean"){
			res.redirect('https://groups.google.com/forum/#!forum/slashroots');
		}else if(locals.filters.post === "we-are-the-slashroots-foundation"){
			res.url('/about');
		}else{
			var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
			}).populate('author', 'name').populate('categories');
			
			q.exec(function(err, post) {
				locals.data.post = post;
				next(err);
			});
		}		
	});
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('post');
	
};
