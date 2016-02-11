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
	// Renders default page layout for the application.
	app.get('/', routes.views.index);
	//Custom api endpoints created for consumption by the front end.
	app.get('/api/posts', keystone.middleware.api, routes.api.post.index);
	app.get('/api/slides', keystone.middleware.api, routes.api.carousel.index);
	app.get('/api/:c_id/slides', keystone.middleware.api, routes.api.carousel.byCarouselId);
	app.get('/api/carousel/:name', keystone.middleware.api, routes.api.carousel.getCarouselByName);
	app.get('/api/search', keystone.middleware.api, routes.api.search.index);
	app.get('/api/news', keystone.middleware.api, routes.api.news.index);
	app.get('/api/posts/:slug', keystone.middleware.api, routes.api.post.show);
	app.get('/api/pages/:slug', keystone.middleware.api, routes.api.page.show);
};
