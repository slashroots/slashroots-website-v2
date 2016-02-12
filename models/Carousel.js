/**
 * Created by matjames007 on 2/10/16.
 */
var keystone = require('keystone');

/**
 * Carousel Model
 * ==================
 */

var Carousel = new keystone.List('Carousel', {
    autokey: { from: 'name', path: 'key', unique: true }
});

Carousel.add({
    name: { type: String, required: true }
});

Carousel.relationship({ ref: 'Slide', path: 'carousel' });

Carousel.register();
