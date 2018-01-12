define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/body/mainImage.html'
], function(
    $,
    _,
    Backbone,
    MainImageHTML
){
    var MainImageView = Backbone.View.extend({
        tagName : "div",
        className : "parallax",
        template : _.template(MainImageHTML),
        initialize : function(){
            this.render();      
        },
        render : function(){
            this.$el.append(this.template());
            this.$el.attr("id", "main");
        }
    });
    
    return MainImageView;
})