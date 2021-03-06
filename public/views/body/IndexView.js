define([
    'jquery',
    'underscore',
    'backbone',
    'views/body/MainImageView',
    'views/body/ClockView',
    'views/body/AddCoinView',
    'views/body/CoinListView',
    'views/body/ContainerView',
], function(
    $,
    _,
    Backbone,
    MainImageView,
    ClockView,
    AddCoinView,
    CoinListView,
    ContainerView
    
){
    var IndexView = Backbone.View.extend({
        initialize : function(){
            this.setElement($("section"));
            this.elements = {
                mainImage : null,
                clock : null,
                list : null,
                add : null,
                container : null,
            };
            
            this.render();      
        },
        render : function(){
            this.elements.mainImage = new MainImageView();
            this.$el.append(this.elements.mainImage.$el);
            
            this.elements.clock = new ClockView();
            this.$el.append(this.elements.clock.$el);
            
            this.elements.list = new CoinListView();
            this.elements.list.$el.css({
                "background-color" : "#aaa",
                "color" : "#fff"
            });
            this.$el.append(this.elements.list.$el);
            
            this.elements.add = new AddCoinView();
            this.$el.append(this.elements.add.$el);
            
            this.elements.container = new ContainerView();
            this.elements.container.$el.css({
                "background-color" : "#aaa",
                "color" : "#fff"
            });
            
            this.$el.append(this.elements.container.$el);
        }
    });
    
    return IndexView;
})