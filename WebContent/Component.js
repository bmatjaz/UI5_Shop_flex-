sap.ui.define([
	'sap/ui/core/UIComponent',
	"./model/LocalStorageModel"
], function(UIComponent, LocalStorageModel) {
	'use strict';

	return UIComponent.extend('sap.ui.flex.shop.Component', {

		metadata: {
			manifest: 'json'
		},

		init: function () {
			var oCartModel = new LocalStorageModel("SHOPPING_CART", {
				cartEntries: {},
				savedForLaterEntries: {}
			});
			this.setModel(oCartModel, "cartProducts");

			UIComponent.prototype.init.apply(this, arguments);

			this.getRouter().initialize();
		}
	});
});