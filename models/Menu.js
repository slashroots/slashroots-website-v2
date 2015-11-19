(function(){
	var keystone = require('keystone'),
		Types = keystone.Field.Types;

	var Menu = new keystone.List('Menu', {
		map: { name: 'label' },
		autokey: { path: 'slug', from: 'label', unique: true }
	});

	Menu.add({
		label: {type: String, initial: true, required: true, unique: true},
		link: {type: String, initial: true, required: true, unique: true},
		order: {type: Types.Select, options: '0, 1, 2, 3, 4', required: true, default: '0'},
		state: {type: Types.Select, options: 'draft, published, archived', index: true}
	});

	Menu.defaultColumns = 'label, order, state';
	Menu.register();
})();