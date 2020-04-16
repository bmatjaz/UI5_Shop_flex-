sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/cart"
], function (Controller, cart, formatter, JSONModel) {
	"use strict";
	formatter: formatter
	return Controller.extend("sap.ui.flex.shop.controller.Products", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("products").attachPatternMatched(this._onProductMatched, this);
			
		},
		_onProductMatched: function (oEvent) {
			this.categoryId = oEvent.getParameter("arguments").categoryID;
			var _oTable = this.getView().byId("productsTable");
			var oTemplate = _oTable.getBindingInfo("items").template;

			var oBindingInfo = {
				path: "/Categories(" + this.categoryId + ")/Products",
				template: oTemplate,
			};
			_oTable.bindAggregation("items", oBindingInfo);
		},
		openCart: function(oEvent) {
			var isPressed = oEvent.getParameter("pressed");
			if(isPressed) {
				this.oRouter.navTo("cart", {categoryID: this.categoryId});
			} else {
				this.oRouter.navTo("products", {categoryID: this.categoryId});
			}
		},
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		}
	});
});
