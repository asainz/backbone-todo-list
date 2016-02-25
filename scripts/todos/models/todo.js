'use strict';

var Todo = Backbone.Model.extend({
    defaults: function(){
        return {
            task: '',
            done: false
        };
    },
    toggle: function(){
        this.save({done: !this.get('done')});
    },
    localStorage: new Backbone.LocalStorage('todos')
});

module.exports = Todo;