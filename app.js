Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': 'sencha-touch-2.0.1.1/ux'
    }
});

Ext.define('Italbox.Viewport', {
    extend: 'Ext.Carousel',
    xtype : 'my-viewport',
    config: {
        items: [
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag1.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag2.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag3.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag4.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag5.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag6.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag7.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag8.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'catalogo/pag9.jpeg'
            }
           
        ],
        listeners: {
            activeitemchange: function(container, value, oldValue, eOpts) {
                if (oldValue) {
                    oldValue.resetZoom();
                    this.getActiveItem().resize();
                }
            },
            resize: function(component, eOpts) {
                this.getActiveItem().resize();
            }
        }
    },
    onDragStart: function(e) {
        var scroller = this.getActiveItem().getScrollable().getScroller();
        if (e.targetTouches.length === 1 && (e.deltaX < 0 && scroller.getMaxPosition().x === scroller.position.x) || (e.deltaX > 0 && scroller.position.x === 0)) {
            this.callParent(arguments);
        }
    },
    onDrag: function(e) {
        if (e.targetTouches.length == 1)
            this.callParent(arguments);
    },
    onDragEnd: function(e) {
        if (e.targetTouches.length < 2)
            this.callParent(arguments);
    }
});

Ext.define('Italbox.ViewportPanel', {
    extend: 'Ext.Panel',
    xtype : 'my-viewport-panel',
    config: {
        fullscreen: true,
        layout: 'fit',
        items: [{
            xtype: 'titlebar',
            title: '<div class="logotipo"></div>',
            cls: 'header',
            docked: 'top',
            items: [
                {   
                    iconMask:true,
                    iconCls: 'delete',
                    ui:      'plain',
                    listeners: {
                        tap: function() {
                            Ext.getCmp('myCarousel').getActiveItem().onZoomIn();
                        }
                    }
                },
                {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu',
                    listeners: {
                        tap: function() {
                            Ext.getCmp('myCarousel').getActiveItem().onZoomOut();
                        }
                    }

                }
            ]
        }, {
            xtype: 'my-viewport',
            id: 'myCarousel'
        }]
    }
});

Ext.application({

    name  : 'ItalboxCatalog',
    views : [
        'Ext.ux.ImageViewer'
    ],
    launch: function() {

        Ext.Viewport.add({
            xtype: 'my-viewport-panel',
            cls: 'body_bg'
        });
    }
});