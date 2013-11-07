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
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag1.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag2.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag3.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag4.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag5.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag6.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag7.jpeg'
            },
            {
                xtype: 'imageviewer',
                imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag8.jpeg'
            },
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag10.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag11.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag12.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag13.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag14.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag15.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag16.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag17.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag18.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag19.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag20.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag21.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag22.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag23.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag24.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag25.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag26.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag27.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag28.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag29.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag30.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag31.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag32.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag33.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag34.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag35.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag36.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag37.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag38.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag39.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag40.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag41.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag42.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag43.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag44.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag45.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag46.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag47.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag48.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag49.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag50.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag51.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag52.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag53.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag54.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag55.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag56.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag57.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag58.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag59.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag60.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag61.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag62.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag63.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag64.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag65.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag66.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag67.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag68.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag69.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag70.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag71.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag72.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag73.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag74.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag75.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag76.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag77.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag78.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag79.jpeg'},
            {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag80.jpeg'}
           
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
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu'
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
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    startupImage: {
        '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
        '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
        '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
        '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
    },

    isIconPrecomposed: false,

    glossOnIcon: false,
    phoneStartupScreen: 'resources/startup/italboxStartUp.jpg',
    tabletStartupScreen: 'resources/startup/italboxStartUp.jpg',
    
    launch: function() {

        Ext.Viewport.add({
            xtype: 'my-viewport-panel',
            cls: 'body_bg'
        });
    }
});