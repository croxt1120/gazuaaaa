define([
    'jquery',
    'underscore',
    'backbone',
    'collection/asset',
    'text!views/body/addCoin.html'
], function(
    $,
    _,
    Backbone,
    Asset,
    AddCoinHTML
){
    
    var AddCoinView = Backbone.View.extend({
        tagName : "div",
        events : {
            "submit form" : "addCoin"
        },
        className : "container",
        template : _.template(AddCoinHTML),
        initialize : function(){
            this.collection = new Asset.Collection();
            this.render();      
        },
        render : function(){
            this.$el.append(this.template());
            this.$el.attr("id", "add");
        },
        addCoin : function(e){
            var unindexed_array = this.$("form").serializeArray();
            var indexed_array = {};
        
            $.map(unindexed_array, function(n, i){
                indexed_array[n['name']] = n['value'];
            });
            
            this.collection.create(indexed_array, {success : function(){
                alert("추가완료");
                window.location.reload();
            }});
            
        	e.preventDefault();
            e.stopPropagation();
        }
    });
    
    return AddCoinView;
})