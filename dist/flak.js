var Flak = Flak || {};

/**
 * Render a view based of a template in the html. Noooiiice!
 */
Flak.TemplateView = Backbone.View.extend({
	templateName: null,

	initialize: function(options){
		if (options) {
			_.extend(this, _.pick(options, ['templateName']));
		}

		if (this.templateName) {
			var selector = 'script[data-template-name="'+this.templateName+'"]';
			this.setTemplate(selector);
		}
	},

	setTemplate: function(selector){
		this.template = _.template(jQuery(selector).html());
	},

	getMixins: function(){
		return {};
	},

	render: function(){
		this.trigger('pre.render');
		var data = _.extend(this.model.toJSON(), this.getMixins());

		this.$el.html(this.template(data));
		this.trigger('post.render');
		return this;
	}

});

/**
 * Allow a view to have different states (i.e. view, edit...)
 */
Flak.StateView = Backbone.View.extend({
	states: {},
	initialState: '',
	currentState: null,
	currentStateName: '',

	initialize: function(options){
		if (options) {
			_.extend(this, _.pick(options, ['states', 'initialState']));
		}

		this.transition(this.initialState);
	},

	transition: function(name) {
		if (name !== this.currentStateName) {
			if (this.currentState !== null) {
				this.undelegateEvents();

				if (_.isFunction(this.currentState.off)) {
					this.currentState.off.apply(this);
				}
			}

			this.currentStateName = name;
			this.currentState = this.states[name];

			this.render();
			if (_.isFunction(this.currentState.on)) {
				this.currentState.on.apply(this);
			}
		}
	},

	render: function(){
		this.$el.html(this.currentState.template(data));
		return this;
	},

	remove: function() {
		this.undelegateEvents();
		Backbone.View.prototype.remove.call(this);
	}

});

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
