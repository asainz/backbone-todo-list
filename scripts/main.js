(function($, Backbone, _){
    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: function(){
            return {
                title: '',
                done: false
            };
        },
        toggle: function(){
            this.save({done: !this.get('done')});
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

            this.NewTodoView.render();
            this.TodosListView.render();
            Todos.fetch();
        },
        render: function(){
        }
    });

    var NewTodoView = Backbone.View.extend({
        el: '#NewTodoView',
        template: _.template( $('#NewTodoTemplate').html() ),
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

            // var todo = new Todo({ title: this.input.val() });
            // Todos.add(todo);
            Todos.create({ title: this.input.val() });
            this.input.val('');
        }
    });

    var TodosListView = Backbone.View.extend({
        el: '#TodosListView',
        template: _.template( $('#TodosListTemplate').html() ),
        initialize: function(){
            this.listenTo(Todos, 'add', this.add);
            this.listenTo(Todos, 'change', this.updateCounter);
            this.listenToOnce(Todos, 'update', this.updateCounter);
        },
        render: function(){
            console.log('render TodosListView');
            this.$el.html( this.template() );

            this.TodoList = $('#TodoList');
            this.TodoListCounter = $('#TodoListCounter');

            return this;
        },
        add: function(model){
            var todo = new TodoView({model: model});
            this.TodoList.append( todo.render().el );
        },
        updateCounter: function(){
            var totalTodos = Todos.length;
            var notDoneYet = Todos.where({done: false}).length;
            this.TodoListCounter.text( notDoneYet + '/' + totalTodos );
        }
    });

    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template( $('#TodoViewTemplate').html() ),
        initialize: function(){

        },
        render: function(){
            console.log('render TodoView');

            this.$el.html( this.template( this.model.toJSON() ) );
            this.$el.find('input[type="checkbox"]').attr('checked', this.model.get('done'));

            return this;
        },
        events: {
            'change input[type="checkbox"]': 'toggle'
        },
        toggle: function(){
            this.model.toggle();
            this.render();
        }
    });

    var App = new AppView;
})($, Backbone, _);