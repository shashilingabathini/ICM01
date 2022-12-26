define([
"dojo/_base/declare",
"icm/base/BasePageWidget",
"icm/custom/pgwidget/viewer/dijit/ViewerContentPane"
],function(declare,BasePageWidget,ViewerContentPane) {

    return declare("icm.custom.pgwidget.viewer.AZViewer" ,[BasePageWidget,ViewerContentPane] , {

        constructor: function() {
            console.log('AZViewer is invoked');
        },
        postCreate : function() {
            console.log('AZViewer Post Create');
            this.buildViewer();
        },
        handleICMAZ_OpenDocument : function(payload) {
            console.log('handling Open document event');
            alert('document is opened');
            console.dir(payload);
            this.buildViewer();
            this.show(payload.contentItem,"open")
        },
        handleICMAZ_ClearContent : function(payload) {
            console.log('handling clear document event');
            alert('clearing content');
            console.dir(payload);
            this.destroyViewer();
            this.hideContentNode();
        }
    });
});