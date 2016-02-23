/**
 * Created by matjames007 on 2/10/16.
 */
/**
 * Created by tremaine on 1/28/16.
 */
(function(){

    var keystone = require('keystone');
    var Types = keystone.Field.Types;

    /**
     * Slide Model
     * ==========
     */

    var Slide = new keystone.List('Slide');

    Slide.add({
        title: { type: String, required: true, default: 'title' },
        subText: { type: String},
        image: { type: Types.CloudinaryImage },
        link: { type: String},
		position: {type: Number},
        carousel: { type: Types.Relationship, ref: 'Carousel', many: true }
    });


    Slide.defaultColumns = 'carousel, title, link, position';
    Slide.register();
})();
