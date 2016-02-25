'use strict';

var NewTodoView = require('./todos/views/new');
var TodosListView = require('./todos/views/list');
var Todos = require('./todos/collections/todos');
var Todo = require('./todos/models/todo');

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

new AppView;