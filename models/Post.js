var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	homePage : { type: Types.Select, options: 'yes, no'},
	carousel: {type: Types.Select, options: 'yes, no', dependsOn: {homePage: 'yes'}},
	positionOnPage: {type: Types.Select, options: '1,2,3,4,5,6', dependsOn: {homePage: 'yes'}},
	link: {type: String, noedit: true}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});
/**
 * Static method used to search all posts
 * matching a criteria.
 * @param query
 * @param callback
 * @returns {*}
 */
Post.schema.statics.search = function(query, callback){
	return this.find(query, callback);
};

Post.schema.pre('save', function(next){
	this.link = 'posts/' + this.slug;
	next();
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
