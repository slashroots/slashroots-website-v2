var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * News Model
 * ==========
 */

var News = new keystone.List('News', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

News.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 200 }
	},
	type: {type: Types.Select, options: 'press, speaking, announcements', default: 'press', index: true, required: true}
});

News.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
News.register();
