// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
//require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Slashroots Foundation',
	'brand': 'Slashroots Foundation',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	//Application Configuration
	'mongo': process.env.MONGOLAB_URI,
	'cookie secret' : process.env.COOKIE_SECRET,
	'cloudinary config' : process.env.CLOUDINARY_URL,
	//Wysiwyg Configuration
	'wysiwyg cloudinary images' : true,
	'wysiwyg menubar' : true,
	'wysiwyg importcss' : '/keystone/styles/editor-css.css',
	'wysiwyg additional plugins': 'wordcount'
	//'wysiwyg additional buttons': 'preview',
	//'wysiwyg additional plugins': 'example, table, advlist, anchor,'
	//+ ' autolink, autosave, bbcode, charmap, contextmenu, '
	//+ ' directionality, emoticons, fullpage, hr, media, pagebreak,'
	//+ ' paste, preview, print, searchreplace, textcolor,'
	//+ ' visualblocks, visualchars, wordcount'
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'events': 'events',
	'news' : 'news',
	'galleries': 'galleries',	
	'users': 'users',
	'menus' : 'menus',
	 'pages' : 'pages'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
