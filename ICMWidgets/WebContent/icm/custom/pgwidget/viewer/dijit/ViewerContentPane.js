define([
    "dojo/_base/declare",
    "icm/base/_BaseWidget", // this contains all the templated widget class definitions allows us to use templated api's
    "dojo/text!./templates/ViewerContentPane.html"
], function (declare,_BaseWidget,template) {
    return declare("icm.custom.pgwidget.viewer.dijit.ViewerContentPane" , [_BaseWidget]  , {

        templateString : template,
        widgetsInTemplate : true,

        constructor : function() {
            console.log('viewer content pane constructor is invoked');
        }


    })
});