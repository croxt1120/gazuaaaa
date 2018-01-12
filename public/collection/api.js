define([
    'backbone'
], function(
    Backbone
){
    var ApiModel = Backbone.Model.extend({
       urlRoot : "/api" ,
       idAttribute : "_coinId"
    });
    
    return {
        Model : ApiModel
    };
})