sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.Home", {
		onInit: function () {
            this._oRouter = this.getOwnerComponent().getRouter();
        },
        goToShopSide: function () { 
            this._oRouter.navTo("master");
        },
        goToBackend: function () { 
            this._oRouter.navTo("orders");
        }
	});
});