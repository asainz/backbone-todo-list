var NewTodoView = (function(){
    return Backbone.View.extend({
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

            // var todo = new Todo({ task: this.input.val() });
            // Todos.add(todo);
            Todos.create({ task: this.input.val() });
            this.input.val('');
        }
    });
}());