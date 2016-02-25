var Todos = (function(){
    'use strict';

    var TodosCollection = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Backbone.LocalStorage('todos')
    });

    return new TodosCollection;
})();