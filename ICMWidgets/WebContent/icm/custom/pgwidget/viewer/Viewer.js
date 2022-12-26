define([
"dojo/_base/declare",
"icm/base/BasePageWidget",
"icm/custom/pgwidget/viewer/dijit/ViewerContentPane"
],function(declare,BasePageWidget,ViewerContentPane) {

    return declare("icm.custom.pgwidget.viewer.Viewer" ,[BasePageWidget,ViewerContentPane] , {

        constructor: function() {

        },
         handleICMAZ_OpenDocument : function() {
            console.log('handling Open document event');
        },
        handleICMAZ_ClearContent : function() {
            console.log('handling clear document event');
        }
    });
});