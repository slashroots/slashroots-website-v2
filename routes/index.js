var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	//app.get('/', routes.views.index);
	//app.get('/blog/:category?', routes.views.blog);
	//app.get('/post/:post', routes.views.post);
	//app.get('/gallery', routes.views.gallery);
	//app.get('/contact', routes.views.contact);
	//app.get('/about', routes.views.about);
	//app.get('/devca', routes.views.devca);
	//app.get('/author/:name', routes.views.posts);
	//API Routes
	app.get('/api/posts', keystone.middleware.api, routes.api.post.index);
	app.get('/api/posts/:id', keystone.middleware.api, routes.api.post.show);
};
