sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"../model/cart"
], function (Controller, formatter, cart) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.ProductDetails", {
		formatter: formatter,

		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("productDetails").attachPatternMatched(this._onRouteMatched, this);
			console.log("here")
		},
		_onRouteMatched: function(oEvent) {
			var productId = oEvent.getParameter("arguments").productID;
			console.log(productId)
			this.getView().bindElement("/Products(" + productId + ")");
		},
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		},
		backToProducts: function (oEvent) {
			var sCategoryId = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			this._oRouter.navTo("products", {categoryID:sCategoryId});
		},
		goTocart: function(oEvent) {
			var sCategoryId = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			this._oRouter.navTo("cart", {categoryID: sCategoryId});
		}
	});
});
