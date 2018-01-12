define([
    'backbone',
], function(
    Backbone
){
    var AssetModel = Backbone.Model.extend(
    {
        urlRoot: "/asset",
        defaults:
        {
            id: null,
            coin: "",
            price: 0,
            quantity: 0,
            buyDate: "",
            company: "",
            goal: 0,
            member: 0,
            desc: "",
            api: "",
            currentKey: "",
            password: "",
        }
    });

    var AssetCollection = Backbone.Collection.extend(
    {
        url: "/asset",
    });
    return {
        Model : AssetModel,
        Collection : AssetCollection
    };
});
