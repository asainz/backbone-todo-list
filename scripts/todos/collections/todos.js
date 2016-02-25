'use strict';

var Todo = require('../models/todo');

var TodosCollection = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage('todos')
});

module.exports = new TodosCollection;