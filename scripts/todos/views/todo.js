'use strict';

var TodoView = Backbone.View.extend({
    tagName: 'li',
    template: Handlebars.compile( $('#TodoViewTemplate').html() ),
    initialize: function(){
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function(){
        console.log('render TodoView');

        this.$el.html( this.template( this.model.toJSON() ) );
        this.$el.find('input[type="checkbox"]').attr('checked', this.model.get('done'));

        return this;
    },
    events: {
        'change input[type="checkbox"]': 'toggle',
        'click .SeeDetailsBtn': 'goToDetails'
    },
    toggle: function(){
        this.model.toggle();
        this.render();
    },
    remove: function(){
        this.$el.remove();
    },
    goToDetails: function(){
        console.log('go to details for ' + this.model.get('id'));
    }
});

module.exports = TodoView;