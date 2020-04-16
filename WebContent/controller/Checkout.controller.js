sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"../model/formatter",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, formatter, JSONModel) {
	"use strict";

	var sCartModelName = "cartProducts";
	var sCartEntries = "cartEntries";
	
	return Controller.extend("sap.ui.flex.shop.controller.Checkout", {
		formatter: formatter,

		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
        },
        
        backToShop: function() {
            this._oRouter.navTo("master");
        }
	});
});