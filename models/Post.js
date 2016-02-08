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
	subTitle: { type: String},
	author: { type: Types.Relationship, ref: 'User', index: true },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	homePage : { type: Types.Select, options: 'yes, no', default: 'no'},
	positionOnPage: {type: Types.Select, options: '1,2,3,4,5,6', dependsOn: {homePage: 'yes'}},
	carousel: {type: Types.Select, options: 'yes, no', default: 'no'},
	positionInCarousel: {type: Types.Select, options: '1,2,3,4', dependsOn: {carousel: 'yes'}},
	externalLink: {type: Types.Select, options: 'yes, no', default: 'no'},
	link: {type: String, dependsOn: {externalLink: 'yes'}},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } }
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
	if(this.externalLink === 'no'){
		this.link = 'posts/' + this.slug;
	}
	next();
});

Post.defaultColumns = 'title, state, author,  carousel, positioniInCarousel, homePage, positionOnPage';
Post.register();
