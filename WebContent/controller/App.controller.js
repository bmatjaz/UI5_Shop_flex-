sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.shop.controller.App", {
		onInit : function () {
			var oViewModel = new JSONModel({
				busy : true,
				delay : 0,
				layout : "TwoColumnsMidExpanded",
				smallScreenMode : true
			});
			this.setModel(oViewModel, "appView");

			
		},
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
	});

});