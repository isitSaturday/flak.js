/**
 * Creating an object to automatically render the models in a collection.
 */
Flak.CollectionView = Backbone.View.extend({
	modelView: Backbone.View,
	rows: {},
	attachDirection: 'append',

	initialize: function(options){
		if (this.collection){
			this.collection.on('add', this.add, this);
			this.collection.on('remove', this.remove, this);
		}

		if (options) {
			_.extend(this, _.pick(options, ['modelView', 'attachDirection']));
		}
	},

	render: function(){
		this.$el.html('');
		this.collection.each(this.add, this);

		return this;
	},

	add: function(model){
		var view = new this.modelView({ model: model });
		this.rows[model.id] = view;

		this.$el[this.attachDirection](view.render().el);
	},

	remove: function(model){
		var view = this.rows[model.id];
		view.$el.remove();

		delete this.rows[model.id];
	}

});
