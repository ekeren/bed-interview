$(document).ready(function(){
  var tempalte = function(json){
    return "" + 
      "<span class='delete'>X</span>|" +  
      "<span class='name'>" + json.name + "</span>|" +  
      "<span class='status'>" + json.status + "</span>|" +  
      "<span class='type'>" + json.type + "</span>|" +  
      "<span class='values'> normal="  + json.normal_value  + ", wierd=" + json.wierd_value +  "</span>|" +  
      "";
  };
  var Model = Backbone.Model.extend({ 
    idAttribute: "_id",
    urlRoot: "/api/models"
  });
  var Collection = Backbone.Collection.extend({
      model: Model,
      url: "/api/models"
  });
  var collection  = new Collection();
  var ModelView = Backbone.View.extend({
    initialize: function(){
      this.listenTo(this.model, "change", this.render);
    },
    events: {
      "click .delete": function(){
        this.model.collection.remove(this.model);
        this.model.destroy();
      },
      "click .name":function(){
        this.model.save({
          name: this.model.get("name") + "."
        });
      },
      "click .type":function(){
        this.model.save({
          type: this.model.get("type") === "normal" ? "wierd" : "normal"
        });
      },
      "click .status":function(){
        this.model.save({
          status: this.model.get("status") === "production" ? "disable" : "production"
        });
      }
    },
    render: function(){
      this.$el.html(tempalte(this.model.attributes));
      return this;
    }
  });
  var renderCollections = function(){
    $("#content > .models").html("");
    collection.models.forEach(function(m){
      var el = (new ModelView({ model: m })).render().el;
      $("#content > .models").append(el);
    });
  };
  var random = function(){
    return Math.floor((Math.random() * 10) + 1);
  };
  collection.fetch().done(renderCollections);
  collection.on("add remove", renderCollections);
  $(".new").click(function(){
    var m = collection.add({  status:"production", type:"normal", normal_value:random() , wierd_value: random()  }); 
    m.save();
  });
});
   
