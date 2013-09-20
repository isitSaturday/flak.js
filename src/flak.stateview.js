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
