/**
 * Created by tremaine on 2/1/16.
 */
describe('HomeController', function(){
    var HomeCtrl,
        scope;
    /**
     * Load the main module before running
     * initiating the test. This ensures
     * that all module dependencies are included.
     */
    beforeEach(module('slashroots'));
    /**
     * Instantiate a scope from the rootscope,
     * then get a reference for the controller being
     * tested.
     */
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
       HomeCtrl = $controller('Home', {
            $scope: scope
        });
    }));
    /**
     * Determines if all carousel options haven initialized correctly
     */
    describe("Initialization of Carousel Options", function(){

       describe("Carousel Values", function(){

           it('Should instantiate carousel interval value to 5000', function(){
               expect(scope.interval).toEqual(5000);
           });

           it('Should instantiate carousel noWrapSlides value to false', function(){
               expect(scope.noWrapSlides).toBeFalsy();
           });
       })
    });


});