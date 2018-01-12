define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/nav/nav.html'
], function(
    $,
    _,
    Backbone,
    NavHTML
){
    var NavView = Backbone.View.extend({
        template : _.template(NavHTML),
        initialize : function(){
            this.render();      
        },
        render : function(){
            $("nav").append(this.template());
        }
    });
    
    return new NavView();
})