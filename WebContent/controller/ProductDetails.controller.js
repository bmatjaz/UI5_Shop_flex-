sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"../model/cart"
], function (Controller, formatter, cart) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.ProductDetails", {
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
		backToProducts: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			var sCategoryId = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			oRouter.navTo("products", {categoryID:sCategoryId});
		}
	});
});
