sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/cart",
	"../model/formatter"
], function (Controller, cart, formatter) {
	"use strict";
	
	return Controller.extend("sap.ui.flex.shop.controller.Products", {
		formatter: formatter,
		
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();
			this.oRouter = oOwnerComponent.getRouter();
			this.oRouter.getRoute("products").attachPatternMatched(this._onProductMatched, this);
			
			//check if cart is open on load (in case of page refresh)
			if((window.location.href).slice(-5)=="/cart") {
				var button = this.getView().byId("cartButton");
				button.setPressed(true);
			}
		},
		//when view is opened get all products based on category
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
		//getting details and setting cart button to false if it is pressed before going to details
		getProductDetails: function(oEvent) {
			var sProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
			this.categoryId = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			
			this.oRouter.navTo("productDetails",
				{categoryID:this.categoryId, productID: sProductId });

			var button = this.getView().byId("cartButton");
			button.setPressed()
		},
		//opens and closes cart view based on the true/false from togglebutton
		openCart: function(oEvent) {
			var isPressed = oEvent.getParameter("pressed");
			var button = this.getView().byId("cartButton");

			//check if cart is open on load (in case of page refresh)
			if((window.location.href).slice(-5)=="/cart") {
				button.setPressed(true);
			}

			if(this.categoryId == undefined)
				this.categoryId="1";

			if(isPressed) {
				this.oRouter.navTo("cart", {categoryID: this.categoryId});
			} else {
				this.oRouter.navTo("products", {categoryID: this.categoryId});
				button.setPressed(false);
			}
		},
		//selected product is sent to cart
		addToCart: function(oEvent) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");			
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		}
	});
});
