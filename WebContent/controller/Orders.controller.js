sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.Orders", {
		onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
		},
		onListItemPress: function(oEvent) {
			var orderID = oEvent.getSource().getBindingContext().getProperty("OrderID");
			this.oRouter.navTo("orderDetails", {orderID: orderID});
		},
		onBackToEntry: function() {
			this.oRouter.navTo("home");
		}
	});
});