'use strict';

var Todos = require('../collections/todos');
var TodoView = require('../views/todo');

var TodosListView = Backbone.View.extend({
    el: '#TodosListView',
    template: Templates.list,
    initialize: function(){
        this.listenTo(Todos, 'add', this.add);
        this.listenTo(Todos, 'change', this.updateCounter);
        this.listenToOnce(Todos, 'update', this.updateCounter);

        this.listenTo(Todos, 'add', this.updateClearButtonLabel);
        this.listenTo(Todos, 'change', this.updateClearButtonLabel);
        this.listenToOnce(Todos, 'update', this.updateClearButtonLabel);
    },
    render: function(){
        console.log('render TodosListView');
        this.$el.html( this.template() );

        this.TodoList = $('#TodoList');
        this.TodoListCounter = $('#TodoListCounter');
        this.clearButton = $('#clearDoneTasksBtn');

        this.updateClearButtonLabel();

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
    },
    events: {
        'click #clearDoneTasksBtn': 'clearDoneTasks'
    },
    clearDoneTasks: function(){
        var done = Todos.where({done: true});
        Todos.remove(done);

        _.each(done, function(model){
            model.destroy();
        });

        this.updateCounter();
        this.updateClearButtonLabel();
    },
    updateClearButtonLabel: function(){
        this.clearButton.text('Clear ' + Todos.where({done: true}).length + ' done tasks');
    }
});

module.exports = TodosListView;