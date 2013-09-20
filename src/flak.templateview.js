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
