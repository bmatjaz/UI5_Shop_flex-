sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"../model/formatter",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, formatter, JSONModel) {
	"use strict";

	var sCartModelName = "cartProducts";
	var sCartEntries = "cartEntries";
	
	return Controller.extend("sap.ui.flex.shop.controller.Cart", {
		formatter: formatter,

		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("cart").attachPatternMatched(this._onObjectMatched, this);
			
			var oModel = new JSONModel({
					totalPriceInShoppingCart: 0
				})
			this.getView().setModel(oModel);
			
		},
		_onObjectMatched: function() {
			this.totalPrice();
		},
		delete: function(oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext(sCartModelName);

			var sEntryId = oBindingContext.getObject().ProductID;

			// show confirmation dialog
			MessageBox.show("Item will be removed from cart", {
				title: "Removing item",
				actions: [
					MessageBox.Action.DELETE,
					MessageBox.Action.CANCEL
				],
				onClose: function (oAction) {
					if (oAction !== MessageBox.Action.DELETE) {
						return;
					}
					var oCartModel = oBindingContext.getModel();
					var oCollectionEntries = Object.assign({}, oCartModel.getData()[sCartEntries]);

					delete oCollectionEntries[sEntryId];

					// update model
					oCartModel.setProperty("/" + sCartEntries, Object.assign({}, oCollectionEntries));
					this.totalPrice();
				}.bind(this)
			});
		},
		totalPrice: function() {
			var oCartModel = this.getOwnerComponent().getModel("cartProducts").getData().cartEntries;
			var totalPrice = 0;
			
			for (var key in oCartModel) {
				totalPrice += oCartModel[key].Quantity * oCartModel[key].UnitPrice
			}
			var oModel = this.getView().getModel();
			var oModelData = oModel.getData();
			oModelData.totalPriceInShoppingCart = totalPrice;
			oModel.setData(oModelData);
		},
		onProceedButtonPress: function() {
			this._oRouter.navTo("checkout");
		}
	});
});