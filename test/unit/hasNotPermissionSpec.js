describe('Directive: hasNotPermission', function() {

    beforeEach(function() {
        module('angular-authz');
    });

    it('should have permission', inject(function($rootScope, $compile, authz) {
        authz.setPermissions(['foo', 'bar']);
        var newScope = $rootScope.$new();
        var element = '<p has-not-permission="foo"><span>what up</span></p>';

        element = $compile(element)(newScope);
        newScope.$digest();

        expect(element.next()).toEqual({});
    }));

    it('should have permission from scope', inject(function($rootScope, $compile, authz) {
        authz.setPermissions(['foo', 'bar']);       
        var newScope = $rootScope.$new();
        newScope.someVar = 'bar';
        var element = '<p has-not-permission="{{someVar}}"><span>what up</span></p>';
        
        element = $compile(element)(newScope);
        newScope.$digest();     

        expect(element.next()).toEqual({});
    }));

    it('should not have permission', inject(function($rootScope, $compile, authz) {
        authz.setPermissions(['foo', 'bar']);       
        var newScope = $rootScope.$new();        
        var element = '<p has-not-permission="zookeeper"><span>what up</span></p>';
        
        element = $compile(element)(newScope);      
        newScope.$digest();
        
        expect(element.next().attr('has-not-permission')).toBe('zookeeper');
        expect(element.next().html()).toBe('<span>what up</span>');
    }));

    it('should not have permission from scope', inject(function($rootScope, $compile, authz) {
        authz.setPermissions(['foo', 'bar']);       
        var newScope = $rootScope.$new();
        newScope.someVar = 'zookeeper';
        var element = '<p has-not-permission="{{someVar}}"><span>what up</span></p>';
        
        element = $compile(element)(newScope);      
        newScope.$digest();
        
        expect(element.next().attr('has-not-permission')).toBe('zookeeper');
        expect(element.next().html()).toBe('<span>what up</span>');
    }));

});