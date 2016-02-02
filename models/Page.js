/**
 * Created by tremaine on 1/28/16.
 */
(function(){

    var keystone = require('keystone');
    var Types = keystone.Field.Types;

    /**
     * Page Model
     * ==========
     */

    var Page = new keystone.List('Page', {
        map: { name: 'title' },
        autokey: { path: 'slug', from: 'title', unique: true }
    });

    Page.add({
        title: { type: String, required: true },
        subTitle: { type: String, required: true, initial: true},
        state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
        publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
        image: { type: Types.CloudinaryImage },
        content: {
            brief: { type: Types.Html, wysiwyg: true, height: 150 },
            extended: { type: Types.Html, wysiwyg: true, height: 400 }
        },
        homePage : { type: Types.Select, options: 'yes, no'},
        carousel: {type: Types.Select, options: 'yes, no'},
        positionOnPage: {type: Types.Select, options: '1,2,3,4,5,6', dependsOn: {homePage: 'yes'}},
        link: {type: String}
    });

    Page.schema.virtual('content.full').get(function() {
        return this.content.extended || this.content.brief;
    });
    /**
     * Static method used to search all pages
     * matching a criteria.
     * @param query
     * @param callback
     * @returns {*}
     */
    Page.schema.statics.search = function(query, callback){
        return this.find(query, callback);
    };

    Page.schema.pre('save', function(next){
        this.link = this.slug;
        next();
    });

    Page.defaultColumns = 'title, state|20%, publishedDate|20%';
    Page.register();
})();