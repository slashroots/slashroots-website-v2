(function(){
'use strict';
var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals,
		Post = keystone.list('Post'),
		News = keystone.list('News'),
		Event = keystone.list('Event'),
		Menu = keystone.list('Menu');
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.posts = {};
	locals.data = {
		news : [],
		events: [],
		menu: []
	};

	view.on('init', function(next){
		Post.model.find()
				 .where('state', 'published')
				 .where('group', 'group-one')
				 .sort('position')
				 .populate('categories')
				 .populate('author', 'name')
				 .exec(function(err, group_one_posts){
				 	locals.posts.group_one_posts = group_one_posts;
				 	next();
				 });
	});
	
	view.on('init', function(next){
		Post.model.find()
				 .where('state', 'published')
				 .where('group', 'group-two')
				 .sort('position')
				 .populate('categories')
				 .populate('author', 'name')
				 .exec(function(err, group_two_posts){
				 	locals.posts.group_two_posts = group_two_posts;
				 	next();
				 });
	});

	view.on('init', function(next){
			Post.model.find()
				 .where('state', 'published')
				 .where('group', 'blog-articles')
				 .sort('position')
				 .populate('categories')
				 .exec(function(err, blog_articles){
				 	locals.posts.blog_articles = blog_articles;
				 	next();
				 });
	});

	view.on('init', function(next){
		Post.model.find()
				 .where('state', 'published')
				 .where('group', 'carousel')
				 .populate('categories')
				 .exec(function(err, carousel){
				 	locals.posts.carousel = carousel;
				 	next();
				 });
	});
	/**
	 * Get the two most recent news items
	 */
	 view.on('init', function(next){
	 	News.model.find()
	 			  .where('state', 'published')
	 			  .sort('-publishedDate')
	 			  .limit(2)
	 			  .exec(function(err, news_items){
	 			  	locals.data.news = news_items;
	 			  	next();
	 			  });
	 });
	/**
	 * Get the currently published event
	 */
	view.on('init', function(next){
		Event.model.find()
				  .where('state', 'published')
				  .sort('-publishedDate')
				  .limit(1)
				  .exec(function(err, events){
				  	locals.data.events = events
				  	next();
				  });
	});
	/**
	 * Get all menu items
	 */
	view.on('init', function(next){
		Menu.model.find()
				 .where('state', 'published')
				 .sort('-order')
				 .exec(function(err, menu){
				 	locals.data.menu = menu;
				 	next();
				 });
	});
	// Render the view
	view.render('index');
	
};
})();

