'use strict';

var Todos = require('../collections/todos');

var NewTodoView = Backbone.View.extend({
    el: '#NewTodoView',
    template: Handlebars.compile( $('#NewTodoTemplate').html() ),
    initialize: function(){
        
    },
    render: function(){
        this.$el.html( this.template() );
        console.log('render NewTodoView');

        this.input = $('#newTodoInput');
        this.form = $('#newTodoForm');

        return this;
    },
    events: {
        'submit #newTodoForm': 'handleFormSubmit'
    },
    handleFormSubmit: function(e){
        e.preventDefault();

        if( !this.input.val() ){
            this.form.addClass('invalid-input');
            return;
        }else{
            this.form.removeClass('invalid-input');
        }

        // var todo = new Todo({ task: this.input.val() });
        // Todos.add(todo);
        Todos.create({ task: this.input.val() });
        this.input.val('');
    }
});

module.exports = NewTodoView;