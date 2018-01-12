define([
    'jquery',
    'backbone',
    'views/nav/NavView'
], function(
    $,
    Backbone,
    NavView
){
    var currentView = null;
    var Router = Backbone.Router.extend({
        routes : {
            '' : 'main',
            ':id' : 'main'
        },
        
        main : function(){
            if(currentView == null){
                require(["views/body/IndexView"], function(View){
                    currentView = new View();
                    $("section").append(currentView.$el);
                });    
            }
            
        }
    });

    return new Router();
})