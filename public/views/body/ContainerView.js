define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/body/container.html'
], function(
    $,
    _,
    Backbone,
    ContainerHTML
){
    var ContainerView = Backbone.View.extend({
        tagName : "div",
        className : "container",
        template : _.template(ContainerHTML),
        initialize : function(){
            this.render();      
        },
        render : function(){
            this.$el.append(this.template());
        }
    });
    
    return ContainerView;
})