sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.ui.flex.shop.controller.Master", {
		onInit: function () {
			this.oView = this.getView();
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		//pressing item opens new view products and send categoryid to it
		onListItemPress: function (oEvent) {
			var categoryId = oEvent.getSource().getBindingContext().getProperty("CategoryID");
			this.oRouter.navTo("products", {categoryID: categoryId});
		},
		changeLanguage: function(oEvent) {
            var oValidatedComboBox = oEvent.getSource(),
            sSelectedKey = oValidatedComboBox.getSelectedKey(),
            language = window.navigator.userLanguage || window.navigator.language;

            if(sSelectedKey=="default") {
                sap.ui.getCore().getConfiguration().setLanguage(language);
            }
            else {
                sap.ui.getCore().getConfiguration().setLanguage(sSelectedKey);
            }
		},
		onBackToEntry: function() {
			this.oRouter.navTo("home");
		}
	});
});
