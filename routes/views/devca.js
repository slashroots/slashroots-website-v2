(function(){
	var keystone = require('keystone'),
		common = require('../../routes/common/common');

	exports = module.exports = function(req, res) {
		var view = new keystone.View(req, res),
			query = common.getMenu(),
			locals = res.locals;
			locals.data = {
				menu: []
			};
		query.exec(function(err, menu){
			if(err || !menu){
				locals.data.menu = common.getStaticMenu();
			}else{
				locals.data.menu = menu;
			}
		view.render('devca');	
	});
};
})();

