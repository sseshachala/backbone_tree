var MIcounter = 0;
var MI = Backbone.Model.extend({
    initialize: function() {
        //temp way of setting MI name really quickly
        this.set({"title": "Module Item " + MIcounter});
        MIcounter++;

        this.set({"view": new MIView({ model: this }) });
    }
});

var MIView = Backbone.View.extend({
    className: "module_item",
    tagName: "li",

    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template("<b>MI: <%= title %></b>");
        $(this.el).html( template( this.model.toJSON() ) );
    }
})

var Folder = Backbone.Model.extend({
    defaults: {
        title: "",
        children: []
    },
    initialize: function() {
        this.set({"view": new FolderView({ model: this }) });
    }
});

var FolderView = Backbone.View.extend({
    tagName: "li",
    className: "folder",

    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template("<b>TREE: <%= title %></b><ul></ul>");
        var html = template( this.model.toJSON() );
        $(this.el).html(html);
        var ul_el = $(this.el).find("ul");

        console.log( this.model.get("title"), this.model.get("children") );
        _.each( this.model.get("children"), function(child) {
            var li = $("<li></li>");
            li.html( child.get("view").el );
            ul_el.append(li);
            console.log("LI", li.html(), ul_el);
        });
    }
});

