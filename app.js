window.dao =  {
    syncURL: "http://nrodrigues.net/italbox/connect.php?test=1",
    //syncURL: "http://localhost:8080/server-app/connect.php?test=1",
    //syncURL: "http://10.0.2.2:8080/server-app/connect.php?test=1",
    //syncURL: "http://192.168.23.132:8080/server-app/connect.php?test=1",
    initialize: function(callback) {
        var self = this;
        this.db = window.openDatabase("italboxdb", "1.0", "Italbox DB", 200000);

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
            }
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

dao.sync(renderList);
renderList();
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
                   //html: "<img style=' margin:auto; width: 100%;' src='data:image/jpg;base64,"+catalogo.capa+"'/>"
                   xtype: 'imageviewer',
                   //imageSrc: 'data:image/jpg;base64,'+catalogo.capa
                    imageSrc: catalogo.capa
              };
              arr.push(listaImagens); 
            }
         callback(arr);
    });
}

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
};
//
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
        items: arr
        //[
        //    {
        //        xtype: 'imageviewer',
        //        imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag1.jpeg'
        //    },
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/catalogo/pag80.jpeg'}
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
                    cls: 'open-menu',
                     handler: function () {
            //Ext.Msg.alert('You clicked the button');
            //window.location.href=window.location.href;
        }, // handler
        //renderTo: Ext.getBody()
                },
                    {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu2',
                     handler: function () {
            //Ext.Msg.alert('You clicked the button');
            window.location.href=window.location.href;
        }, // handler
        //renderTo: Ext.getBody()
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
});
