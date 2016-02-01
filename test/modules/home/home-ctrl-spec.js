/**
 * Created by tremaine on 2/1/16.
 */
describe('HomeController', function(){
    var HomeCtrl,
        scope;
    beforeEach(module('slashroots'));
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
       HomeCtrl = $controller('Home', {
            $scope: scope
        });
    }));

    describe("Initialization", function(){
       describe("Carousel Values", function(){
           it('Should instantiate carousel interval to 5000', function(){
               expect(scope.interval).toEqual(5000);
           });
       })
    });


});