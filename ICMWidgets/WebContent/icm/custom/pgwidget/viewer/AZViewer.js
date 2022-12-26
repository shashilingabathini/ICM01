define([
"dojo/_base/declare",
"icm/base/BasePageWidget",
"icm/custom/pgwidget/viewer/dijit/ViewerContentPane"
],function(declare,BasePageWidget,ViewerContentPane) {

    return declare("icm.custom.pgwidget.viewer.AZViewer" ,[BasePageWidget,ViewerContentPane] , {
        isViewer: true, // this is mandatory to avoid document to be opened by using default ICNNavigator Action
        constructor: function() {
            console.log('AZViewer is invoked');
        },
        postCreate : function() {
            console.log('AZViewer Post Create');
            this.addEmptyViewer();
            this.buildViewer();
        },
        handleICMAZ_OpenDocument : function(payload) {
            console.log('handling Open document event');
            console.dir(payload);
            this.buildViewer();
            this.show(payload.contentItem,"open")
        },
        handleICMAZ_ClearContent : function(payload) {
            console.log('handling clear document event');
            this.destroyViewer();
            this.hideContentNode();
        }
    });
});