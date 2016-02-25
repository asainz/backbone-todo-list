(function($, Backbone, _){
    'use strict';

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

    var App = new AppView;
})($, Backbone, _);