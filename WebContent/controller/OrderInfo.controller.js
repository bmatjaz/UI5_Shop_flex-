sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/fileCreator"
], function (Controller, fileCreator) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.OrderInfo", {
		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("orderDetails").attachPatternMatched(this._onProductMatched, this);
		},
		//when view is opened get all products based on category
		_onProductMatched: function (oEvent) {
			var orderID = oEvent.getParameter("arguments").orderID;
			this.getView().bindElement("/Orders(" + orderID + ")");
		},
		exportCSV: function(oEvent) {
			var object = oEvent.getSource().getBindingContext().getObject();
			fileCreator.invoiceObjToCSV(object, "Invoice");
		}
	});
});