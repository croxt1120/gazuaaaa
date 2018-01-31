define([
    'jquery',
    'underscore',
    'backbone',
    'collection/asset',
    'collection/api',
    'text!views/body/coinList.html',
    'text!views/body/coinListRow.html'
], function(
    $,
    _,
    Backbone,
    Asset,
    Api,
    CoinListHTML,
    CoinListRowHTML
){
    var CoinListRowView = Backbone.View.extend({
        tagName : "tr",
        template : _.template(CoinListRowHTML),
        initialize : function(options){
            this.model = options.model;
            this.api = new Api.Model({
                _coinId: this.model.get("id")
            });
            this.render();
            this.listenTo(this.api, "change", this.setCurrent);
        },
        render : function(){
            var data = this.model.toJSON();
            data.buyPrice = this.model.get("price") * this.model.get("quantity");
            var keys = _.keys(data);
            for(var i=0; i<keys.length; i++){
                var key =keys[i];
                if(key != "id" && _.isNumber(data[key])){
                    data[key] = this.numberFormat(data[key]);
                }
            }
            this.$el.append(this.template(data));
        },
        getCurrent : function(){
            this.api.fetch();
        },
        setCurrent : function(model){
            var current = this.api.get(this.model.get("currentKey"));
            var quantity = this.model.get("quantity");
            
            var buyprice = this.model.get("price") * this.model.get("quantity");
            var currentPrice = current * quantity;
            var percent = Math.round((currentPrice - buyprice) / buyprice * 10000) / 100;
            
            this.$(".current").text(this.numberFormat(current));
            this.$(".currentPrice").text(this.numberFormat(currentPrice));
            this.$(".percent").text(percent + "%");
        },
        numberFormat : function(x){
            x = Math.ceil(x);
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }
    });
    
    var CoinListView = Backbone.View.extend({
        tagName : "div",
        className : "container",
        template : _.template(CoinListHTML),
        initialize : function(){
            this.collection = new Asset.Collection();
            this.elements = {
                rows : []
            };
            this.render();      
            this.listenTo(this.collection, "update", this.renderRow);
            this.collection.fetch();
        },
        render : function(){
            this.$el.append(this.template());
            this.$el.attr("id", "list");
        },
        renderRow : function(){
            var _this = this;
            _.each(this.elements.rows, function(row){
                row.remove(); 
            });
            clearInterval(this.interval);
            this.elements.rows = [];
            
            this.$("tbody").empty();
            this.collection.each(function(model){
                var row = new CoinListRowView({model : model});
                _this.elements.rows.push(row);
                _this.$("tbody").append(row.$el);
            });
            this.getCurrent();
            this.interval = setInterval(this.getCurrent.bind(this), 60000);
        },
        getCurrent : function(){
            _.each(this.elements.rows, function(row){
                row.getCurrent();
            });
        }
    });
    
    return CoinListView;
})