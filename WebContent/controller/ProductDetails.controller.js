sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"../model/cart",
	"sap/ui/core/routing/History"
], function (Controller, formatter, cart, History) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.ProductDetail", {
		formatter: formatter,

		onInit: function () {
			this.getOwnerComponent().getRouter()
				.getRoute("productDetails").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
			var productId = oEvent.getParameter("arguments").productID;
			this.getView().bindElement("/Products(" + productId + ")");
		},
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("products", true);
			}
		}
	});
});
