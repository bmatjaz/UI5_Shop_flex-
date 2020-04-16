sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.Master", {
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");

			this.oRouter = this.getOwnerComponent().getRouter();
		},
		onListItemPress: function (oEvent) {
			var categoryId = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			this.oRouter.navTo("products", {categoryID: categoryId});
		}
	});
});
