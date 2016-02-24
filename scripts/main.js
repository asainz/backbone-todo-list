(function($, Backbone, _){
    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: function(){
            return {
                title: '',
                done: false
            };
        }
    });

    var TodosCollection = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Backbone.LocalStorage('todos')
    });
    var Todos = new TodosCollection;

    var AppView = Backbone.View.extend({
        el: '#AppView',
        events: {},
        initialize: function(){
            this.NewTodoView = new NewTodoView;
            this.TodosListView = new TodosListView;

            Todos.fetch();
        },
        render: function(){
        }
    });

    var NewTodoView = Backbone.View.extend({
        el: '#NewTodoView',
        initialize: function(){
            this.input = $('#newTodoInput');
            this.form = $('#newTodoForm');
        },
        render: function(){
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

            // var todo = new Todo({ title: this.input.val() });
            // Todos.add(todo);
            Todos.create({ title: this.input.val() });
            this.input.val('');
        }
    });

    var TodosListView = Backbone.View.extend({
        el: 'TodosListView',
        initialize: function(){
            this.TodoList = $('#TodosList');
            this.listenTo(Todos, 'add', this.add);
        },
        render: function(){

        },
        add: function(model){
            var todo = new TodoView({model: model});
            this.TodoList.append( todo.render().el );
        }
    });

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template('<%- title %>'),
        initialize: function(){

        },
        render: function(){
            this.$el.html( this.template( this.model.toJSON() ) );
            console.log('render TodoView');
            return this;
        }
    });

    var App = new AppView;
})($, Backbone, _);