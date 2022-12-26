define([
    "dojo/_base/declare",
    "icm/base/_BaseWidget", // this contains all the templated widget class definitions allows us to use templated api's
    "dojo/text!./templates/ViewerContentPane.html",
    "ecm/widget/viewer/ContentViewer",
    "dojo/dom-style"
], function (declare,_BaseWidget,template,ContentViewer,domStyle) {
    return declare("icm.custom.pgwidget.viewer.dijit.ViewerContentPane" , [_BaseWidget]  , {

        templateString : template,
        widgetsInTemplate : true,
        contentViewer : null,
        isOpened : false,
        constructor : function() {
            console.log('viewer content pane constructor is invoked');
        },
        addEmptyViewer : function() {
            // when empty change textNode to empty content & imageNode with css styles
             this.viewerTextNode.innerHTML = "No document is selected";
             domStyle.set(this.viewerTextNode,"height","300px");
             domStyle.set(this.viewerImageNode,"height","100px");
        },
        /**
         *  This method set up a content viewer node only
         */
        buildViewer : function(node) {
            // node where you want to build
            if(node) {
                this.parentNode = node;
                node.appendChild(this.domNode); // add the content pane to main node
            }

            // if no viewer is available add new viewer (ICN ContentViewer)
            if(this.contentViewer ===  null) {
                this.contentViewer =  new ContentViewer({
                    showNextPrev : false,
                    isEntireWindow : false,
                    dir : "ltr",
                    lang : "en",
                    resetAutoBlank : true , // this set the blank
                    showLayouts : true
                });
                // add this to contentPane
                this.contentNode.appendChild(this.contentViewer.domNode);
            }
        },
        destroy : function() {
            this.destroyViewer();
            this.inherited(arguments);
        },
        destroyViewer : function() {
            if(this.contentViewer)
                this.contentViewer.destroyRecursive();
            if(this.contentViewer != null)
                this.contentViewer = null;
            this.isOpened = false;
        },
        show : function(contentItem ,action) {
            // action to open mode / preview mode
            console.log('showing item');
            if(contentItem && (action && (action == "open" || action == "preview"))) {
                if(this.contentViewer) {
                    this.contentViewer[action](contentItem);
                    this.isOpened = true;
                    this.showContentNode(); // this is from _BaseWidget allow us to show node
                    this.resize(); // allows to resize the widget
                }
            }
        },
        resize : function() {
            if(this.contentViewer && this.isOpened) {
                var h = this.getWidgetAttributes().getItemValue("PreferredHeight");  // this will be in px
                var ih = parseInt(h);
                domStyle.set(this.contentNode,"height",ih+"px");
                domStyle.set(this.domNode,"height",ih +"px");
                domStyle.set(this.contentViewer.domNode,"height", ih +"px");
                this.contentViewer.startup();
                this.contentViewer.layout();
            }
        }

    })
});