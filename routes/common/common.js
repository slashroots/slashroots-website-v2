(function(){
	var keystone = require('keystone'),
		Menu = keystone.list('Menu');
	/**
	 * Get menu from database.
	 * @param  {[type]}   req      [description]
	 * @param  {[type]}   res      [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	exports.getMenu = function(req, res, callback){
		var query = Menu.model.find()
				  .where('state', 'published')
				  .sort('-order');
		return query;
	};
	/**
	 * Fallback function to render menu. 
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	exports.getStaticMenu = function(req, res){
		return menu = [{order: 0, label: 'About', link: 'about'}];
	};	
})();