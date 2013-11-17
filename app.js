window.dao =  {
    syncURL: "http://nrodrigues.net/italbox/connect.php?test=1",
    //syncURL: "http://localhost:8080/GitHub/connect_base64.php?test=1",
    //syncURL: "http://10.0.2.2:8080/server-app/connect.php?test=1",
    //syncURL: "http://192.168.1.2:8080/GitHub/connect.php?test=1",
    initialize: function(callback) {
        var self = this;
        this.db = window.openDatabase("italboxdb", "1.0", "Italbox DB", 3000000);
        //this.db = window.sqlitePlugin.openDatabase("italboxdb", "1.0", "Italbox DB", -1);

        // Testing if the table exists is not needed and is here for logging purpose only. We can invoke createTable
        // no matter what. The 'IF NOT EXISTS' clause will make sure the CREATE statement is issued only if the table
        // does not already exist.
        this.db.transaction(
            function(tx) {
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='catalogos'", this.txErrorHandler,
                    function(tx, results) {
                        if (results.rows.length == 1) {
                            log('Using existing Catalogos table in local SQLite database');
                        }
                        else
                        {
                            log('Catalogos table does not exist in local SQLite database');
                            self.createTable(callback);
                        }
                    });
            }
        )
    },
        
    createTable: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS catalogos ( " +
                    "id_catalogo INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "nome VARCHAR(50), " +
                    "capa VARCHAR(50), " +
                    "cor VARCHAR(50), " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table Catalogos successfully CREATED in local SQLite database');
                callback();
            }
        );
    },

    dropTable: function(callback) {
        this.db.transaction(
            function(tx) {
                tx.executeSql('DROP TABLE IF EXISTS catalogos');
            },
            this.txErrorHandler,
            function() {
                log('Table Catalogos successfully DROPPED in local SQLite database');
                callback();
            }
        );
    },

    findAll: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM CATALOGOS";
                log('Local SQLite database: "SELECT * FROM CATALOGOS"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            catalogos = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            catalogos[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(catalogos);
                    }
                );
            }
        );
    },

    getLastSync: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM catalogos";
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var lastSync = results.rows.item(0).lastSync;
                        log('Last local timestamp is ' + lastSync);
                        callback(lastSync);
                    }
                );
            }
        );
    },

    sync: function(callback) {
        var self = this;
        log('Starting synchronization...');
        this.getLastSync(function(lastSync){
            self.getChanges(self.syncURL, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges(changes, callback);
                    } else {
                        log('Nothing to synchronize');
                        callback();
                    }
                }
            );
        });
    },

    getChanges: function(syncURL, modifiedSince, callback) {

        $.ajax({
            url: syncURL,
            data: {modifiedSince: modifiedSince},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
                //alert(modifiedSince);
                callback(data);
            },
            error: function(model, response) {
                alert("A trabalhar em modo offline");
            },
            //async:   false
        });

    },

    applyChanges: function(catalogos, callback) {
        this.db.transaction(
            function(tx) {
                var l = catalogos.length;
                var sql =
                    "INSERT OR REPLACE INTO catalogos (id_catalogo, nome, capa, cor, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = catalogos[i];
                    log(e.id_catalogo + ' ' + e.nome + ' ' + e.capa + ' ' + e.cor + ' ' + e.lastModified);
                    var params = [e.id_catalogo, e.nome, e.capa , e.cor , e.lastModified];
                    tx.executeSql(sql, params);
                }
                log('Synchronization complete (' + l + ' items synchronized)');
            },
            this.txErrorHandler,
            function(tx) {
                callback();
            }
        );
    },

    txErrorHandler: function(tx) {
        alert(tx.message);
    }
};


dao.initialize(function() {
    console.log('database initialized');
});

//dao.sync(renderList);
//renderList();
//renderImagens();

$('#reset').on('click', function() {
    dao.dropTable(function() {
       dao.createTable();
    });
});


$('#sync').on('click', function() {
    dao.sync(renderList);
});


$('#render').on('click', function() {
    renderList();
});

$('#clearLog').on('click', function() {
    $('#log').val('');
});

//function reload() {
//    location.reload();
//};

function renderList(catalogos) {
    log('Rendering list using local SQLite data...');
    dao.findAll(function(catalogos) {
        $('#list').empty();
        var l = catalogos.length;
        for (var i = 0; i < l; i++) {
            var catalogo = catalogos[i];
            $('#list').append('<tr>' +
                '<td>' + catalogo.id_catalogo + '</td>' +
                '<td>' + catalogo.nome + '</td>' +
                //'<td>' + catalogo.capa + '</td>' +
                '<td>' + catalogo.cor + '</td>' +
                '<td>' + catalogo.lastModified + '</td></tr>');
        }
    });
};

//function renderImagens(catalogos) {
//    log('Rendering list using local SQLite data...');
//    dao.findAll(function(catalogos) {
//        //$('#imagens').empty();
//        var div = document.getElementById('catalogo_front');
//        var l = catalogos.length;
//        for (var i = 0; i < l; i++) {
//            var catalogo = catalogos[i];
//            var img = document.createElement('img');
//            img.src = catalogo.nome;
//            div.appendChild(img);
//        }
//    });
//}

function renderImages(callback) {
    log('Rendering list using local SQLite data...');
    var arr = [];
    dao.findAll(function(catalogos) {
        var l = catalogos.length;
        for (var i = 0; i < l; i++) {
            var catalogo = catalogos[i];
            var listaImagens = {
                   //style: "background-color: #000000; color:black;",
                   //title: catalogo.nome,
                   //html: "<img style=' margin:auto; width: 100%;' src='"+catalogo.capa+"'/>"
                   xtype: 'imageviewer',
                   imageSrc: 'data:image/jpg;base64,'+catalogo.capa
                    //imageSrc: catalogo.capa
              };
              arr.push(listaImagens); 
            }
         callback(arr);
    });
};

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
};

//Ext.application({
//    name: 'Italbox',
//    launch: function() {
//        renderImages(function(arr){
//            //var x = arr.length;
//            //for (var i = 0; i < x; i++) {
//              //var catalogo = catalogos[i];
//              //window.alert(arr[i].html);
//            //}
//            Italbox.container = Ext.create('Ext.Carousel', {
//                fullscreen: true,
//                items: arr
//        });
//     });
//       
//    }
//});

renderImages(function(arr){
    //alert(arr);

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': 'sencha-touch-2.0.1.1/ux'
    }
});

Ext.define('Italbox.Viewport2', {
    extend: 'Ext.Carousel',
    xtype : 'my-viewport2',
    
    config: {
        showAnimation: 
            {
                type: 'slideIn',
                duration: 1000,
                direction: 'up',
                easing: 'easeOut'
            },  
            hideAnimation: 
            {
                //TweenMax.to(this, 1, {autoAlpha:0});
                type: 'slideOut',
                duration: 700,
                direction: 'down',
                easing: 'easeIn'
            }, 
        //height: '80%',
        //margin: '60px 0 0 0',
        items: arr
        //[
        //   
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag2.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag3.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag4.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag5.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag6.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag7.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag8.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag9.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag10.jpeg'}
        //    
        //   
        //]
        ,
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
    },
    
});


Ext.define('Italbox.Viewport', {
    extend: 'Ext.Panel',
    xtype : 'my-viewport',
    //id:'teste2',
    config: {
        showAnimation: 
                    {
                        type: 'slideIn',
                        duration: 1000,
                        direction: 'up',
                        easing: 'easeOut'
                    },  
                    hideAnimation: 
                    {
                        type: 'slideOut',
                        duration: 700,
                        direction: 'down',
                        easing: 'easeIn'
                    }, 
            //cls: 'teste',
            layout: {
                type: 'vbox',
                pack: 'center',
                height: '400px',
                
            },
            items: [
                {
                    //give it an xtype of list for the list component
                    xtype: 'dataview',

                    height: '400px',
                    //margin: '50px 0 0 0', 
                    //flex: 1,
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },
                    inline: {
                        wrap: false
                    },

                    //set the itemtpl to show the fields for the store
                     store: {
                        fields: ['capa','cor', 'nome'],
                        data: [{
                            capa: 'imgs/catalogo1.png',
                            cor: 'azul',
                            nome: 'Catalogo 1'
                        }, {
                            capa: 'imgs/catalogo2.png',
                            cor: 'azul',
                            nome: 'Catalogo 2'
                        }, {
                            capa: 'imgs/catalogo3.png',
                            cor: 'azul',
                            nome: 'Catalogo 3'
                        }, {
                            capa: 'imgs/catalogo1.png',
                            cor: 'azul',
                            nome: 'Catalogo 4'
                       }]
                    },

                    itemTpl: '<img src="{capa}" style="margin-right:30px;">',
                    //itemTpl: '<img src="{capa}" style="margin-right:30px; height:100%;"><div>{cor} {nome}</div>',
                    listeners: {
                        itemtap: function(list, index, target, record) {
                            Ext.Msg.confirm(
                            "Open",
                            "Open "+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                                //window.location.reload();
                                 Ext.getCmp('myList').hide();
                                 Ext.getCmp('myCarroucel').show();
                                 Ext.getCmp('back').show()
                                }
                            }
                        );
                        }
                    }
                }
            ],
          
    },
    //    initialize : function(){
    //    var me = this;
    //         this.element.on('tap', function(e, el){
    //             // Here you will get the target element
    //             //console.log(e.target, el);
    //             //alert(e.target, el);
    //         //    Ext.Msg.alert('teste',e);
    //             Ext.Msg.confirm(
    //        "Download",
    //        "Donwnload Catalog?",
    //        function(buttonId) {
    //            if (buttonId === 'yes') {
    //                //window.location.reload();
    //                Ext.getCmp('myList').hide();
    //                Ext.getCmp('myCarroucel').show();
    //                Ext.getCmp('back').show()
    //            }
    //        }
    //    );
    //         }, this);
    //}
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
                   // align: 'left',
                    //ui:    'plain',
                    xtype: 'button',
                    text: 'back',
                    id: 'back',
                    //cls: 'back',
                    hidden: true,
                    handler: function () {
                    Ext.getCmp('myCarroucel').hide();
                    Ext.getCmp('back').hide();
                    Ext.getCmp('myList').show();
                    //Ext.Msg.alert('You clicked the button');
        }, // handler
        ////renderTo: Ext.getBody()
                },
                {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu',
                   handler: function() {
                
                        //add a hidden panel with showAnimation and hideAnimation
                         var panel = Ext.Viewport.add({ 
                            xtype: 'container',  
                            modal: {
                                style: 'opacity: 0.8; background-color: #ffffff;'
                            },
                            height    : 200,
                            width     : 240,
                            floating  : true,                               
                            top       : 50,
                            cls: 'menu',
                            hideOnMaskTap: true,
                            showAnimation: 
                            {
                                type: 'slideIn',
                                duration: 1000,
                                direction: 'up',
                                easing: 'easeOut'
                            },  
                            hideAnimation: 
                            {
                                //TweenMax.to(this, 1, {autoAlpha:0});
                                type: 'slideOut',
                                duration: 700,
                                direction: 'down',
                                easing: 'easeIn'
                            }, 
                            items     : [
                                {
                                    html  : '<li class="menu-italbox">ITALBOX</li>'
                                },
                                {
                                    html  : '<li class="menu-favoritos">FAVARITOS</li>'
                                },
                                {
                                    html  : '<li class="menu-language">LANGUAGE</li>'
                                },
                                {
                                    html  : '<li class="menu-ajuda">AJUDA</li>'
                                }
                            ]
                        });

                        
                        //show the panel
                        panel.show();
                    
        }, // handler
        //renderTo: Ext.getBody()
                },
                    {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu2',
                     handler: function () {
               Ext.Msg.confirm(
            "Update",
            "Update Catalog List?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    //window.location.reload();
                    dao.sync(renderList);
                    renderList();
                    //window.location.href=window.location.href;
                }
            }
        );
            
        }, // handler
        //renderTo: Ext.getBody()
                },
                {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu3',
                     handler: function () {
               Ext.Msg.confirm(
            "Restart",
            "Restart Application?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    //window.location.reload();
                    window.location.href=window.location.href;
                }
            }
        );
            
        }, // handler
        //renderTo: Ext.getBody()
                }
            ]
        }, {
            xtype: 'my-viewport',
            id: 'myList'
        },
        {
            xtype: 'my-viewport2',
            hidden: true,
            id: 'myCarroucel'
        },
        ]
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
            cls: 'body_bg',
        });
    }
});
});
