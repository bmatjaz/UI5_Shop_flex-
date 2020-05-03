sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.OrderDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this._oRouter = oOwnerComponent.getRouter();
			this._oRouter.getRoute("orderDetails").attachPatternMatched(this._onProductMatched, this);
		},
		//when view is opened get all products based on category
		_onProductMatched: function (oEvent) {
            this.orderID = oEvent.getParameter("arguments").orderID;
            var _oTable = this.getView().byId("orderedItems");
			var oTemplate = _oTable.getBindingInfo("items").template;
			var oBindingInfo = {
				path: "/Orders(" + this.orderID + ")/Order_Details",
				template: oTemplate,
			};
			_oTable.bindAggregation("items", oBindingInfo);
		},
		goToDetails: function() {
			
		}
	});
});