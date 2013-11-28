window.dao =  {
    //syncURL: "http://www.italbox.alojamentogratuito.com/connect.php?test=1",
    syncURL:  "http://nrodrigues.net/italbox/connect.php?table=catalogos",
    syncURL2: "http://nrodrigues.net/italbox/connect.php?table=paginas",
    syncURL3: "http://nrodrigues.net/italbox/connect.php?table=produtos",
    syncURL4: "http://nrodrigues.net/italbox/connect.php?table=categorias",
    //syncURL: "http://nrodrigues.net/italbox/connect.php?test=1",
    //syncURL: "http://localhost:8080/GitHub/connect.php?test=1",
    //syncURL: "http://10.0.2.2:8080/GitHub/connect.php?test=1",
    //syncURL: "http://192.168.1.2:8080/GitHub/connect.php?test=1",
    //syncURL: "http://192.168.23.132:8080/GitHub/connect.php?test=1",
    initialize: function(callback) {
        var self = this;
        this.db = window.openDatabase("italboxdb", "1.0", "Italbox DB", 3000000);

        // Testing if the table exists is not needed and is here for logging purpose only. We can invoke createTable
        // no matter what. The 'IF NOT EXISTS' clause will make sure the CREATE statement is issued only if the table
        // does not already exist.
        this.db.transaction(
            function(tx) {
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='catalogos' OR name='paginas' OR name='produtos' OR name='categorias'", this.txErrorHandler,
                    function(tx, results) {
                        if (results.rows.length == 4) {
                            log('Using existing Catalogos table in local SQLite database');
                        }
                        else
                        {
                            log('Catalogos table does not exist in local SQLite database');
                            self.createTable(callback);
                            self.createTable2(callback);
                            self.createTable3(callback);
                            self.createTable4(callback);
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
    
    createTable2: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS paginas ( " +
                    "id_pagina INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "foto VARCHAR(50), " +
                    "id_categoria VARCHAR(50), " +
                    "id_catalogo VARCHAR(50), " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table Paginas successfully CREATED in local SQLite database');
                callback();
            }
        );
    },
    
    createTable3: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS produtos ( " +
                    "id_produto INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "nome VARCHAR(50), " +
                    "descricao VARCHAR(50), " +
                    "foto VARCHAR(50), " +
                    "ref VARCHAR(50), " +
                    "id_catalogo VARCHAR(50), " +
                    "id_pagina VARCHAR(50), " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table Produtos successfully CREATED in local SQLite database');
                callback();
            }
        );
    },
    
    createTable4: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS categorias ( " +
                    "id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "nome VARCHAR(50), " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table Categorias successfully CREATED in local SQLite database');
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
    
    findAll2: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM PAGINAS";
                log('Local SQLite database: "SELECT * FROM PAGINAS"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            paginas = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            paginas[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(paginas);
                    }
                );
            }
        );
    },
    
     findAll3: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM PRODUTOS";
                log('Local SQLite database: "SELECT * FROM PRODUTOS"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            produtos = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            produtos[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(produtos);
                    }
                );
            }
        );
    },
    
     findAll4: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM CATEGORIAS";
                log('Local SQLite database: "SELECT * FROM CATEGORIAS"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            categorias = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            categorias[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(categorias);
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
    
    getLastSync2: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM paginas";
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
    
    getLastSync3: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM produtos";
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
    
    getLastSync4: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM categorias";
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
    
     sync2: function(callback) {
        var self = this;
        log('Starting synchronization...');
        this.getLastSync2(function(lastSync){
            self.getChanges2(self.syncURL2, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges2(changes, callback);
                    } else {
                        log('Nothing to synchronize');
                        callback();
                    }
                }
            );
        });
    },
    
     sync3: function(callback) {
        var self = this;
        log('Starting synchronization...');
        this.getLastSync3(function(lastSync){
            self.getChanges3(self.syncURL3, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges3(changes, callback);
                    } else {
                        log('Nothing to synchronize');
                        callback();
                    }
                }
            );
        });
    },
    
      sync4: function(callback) {
        var self = this;
        log('Starting synchronization...');
        this.getLastSync4(function(lastSync){
            self.getChanges4(self.syncURL4, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges4(changes, callback);
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
    
    getChanges2: function(syncURL2, modifiedSince, callback) {

        $.ajax({
            url: syncURL2,
            data: {modifiedSince: modifiedSince},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
                //alert(modifiedSince);
                callback(data);
            },
            error: function(model, response) {
                //alert("A trabalhar em modo offline");
            }
        });

    },
    
    getChanges3: function(syncURL3, modifiedSince, callback) {

        $.ajax({
            url: syncURL3,
            data: {modifiedSince: modifiedSince},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
                //alert(modifiedSince);
                callback(data);
            },
            error: function(model, response) {
                //alert("A trabalhar em modo offline");
            }
        });

    },
    
     getChanges4: function(syncURL4, modifiedSince, callback) {

        $.ajax({
            url: syncURL4,
            data: {modifiedSince: modifiedSince},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
                //alert(modifiedSince);
                callback(data);
            },
            error: function(model, response) {
                //alert("A trabalhar em modo offline");
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
    
    applyChanges2: function(paginas, callback) {
        this.db.transaction(
            function(tx) {
                var l = paginas.length;
                var sql =
                    "INSERT OR REPLACE INTO paginas (id_pagina, foto, id_categoria, id_catalogo, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = paginas[i];
                    log(e.id_pagina + ' ' + e.foto + ' ' + e.id_categoria + ' ' + e.id_catalogo + ' ' + e.lastModified);
                    var params = [e.id_pagina, e.foto, e.id_categoria , e.id_catalogo, e.lastModified];
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
    
    applyChanges3: function(produtos, callback) {
        this.db.transaction(
            function(tx) {
                var l = produtos.length;
                var sql =
                    "INSERT OR REPLACE INTO produtos (id_produto, nome, descricao, foto, ref, id_catalogo, id_pagina, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = produtos[i];
                    log(e.id_produto + ' ' + e.nome + ' ' + e.descricao + ' ' + e.foto + ' ' + e.ref + ' ' + e.id_catalogo + ' ' + e.id_pagina + ' ' + e.lastModified);
                    var params = [e.id_produto, e.nome, e.descricao , e.foto, e.ref, e.id_catalogo, e.id_pagina, e.lastModified];
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
    
     applyChanges4: function(categorias, callback) {
        this.db.transaction(
            function(tx) {
                var l = categorias.length;
                var sql =
                    "INSERT OR REPLACE INTO categorias (id_categoria, nome, lastModified) " +
                    "VALUES (?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = categorias[i];
                    log(e.id_categoria + ' ' + e.nome + ' ' + e.lastModified);
                    var params = [e.id_categoria, e.nome, e.lastModified];
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


$(document).ready(function() {
    setTimeout('runApp()',2000);
    setTimeout('runApp2()',4000);
    //setTimeout('runApp3()',3000);
    setTimeout('runApp4()',6000);
});

function runApp() {
dao.initialize(function(){
    console.log('database initialized');
});
};

function runApp2() {
dao.sync(renderList);
dao.sync2(renderList2);
dao.sync3(renderList3);
dao.sync4(renderList4);
};

function runApp3() {
renderList();
};

function runApp4() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync(renderList2)).then(dao.sync(renderList3)).then(dao.sync(renderList4)).then(sencha());
};

//dao.sync(renderList);
//renderList();
//teste();
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

function renderList(catalogos) {
    log('Rendering list using local SQLite data...');
    dao.findAll(function(catalogos) {
        $('#list').empty();
        var l = catalogos.length;
        for (var i = 0; i < l; i++) {
            var catalogo = catalogos[i];
        }
    });
};

function renderList2(paginas) {
    log('Rendering list using local SQLite data...');
    dao.findAll2(function(paginas) {
        $('#list').empty();
        var l = paginas.length;
        for (var i = 0; i < l; i++) {
            var pagina = paginas[i];
        }
    });
};

function renderList3(produtos) {
    log('Rendering list using local SQLite data...');
    dao.findAll3(function(produtos) {
        $('#list').empty();
        var l = produtos.length;
        for (var i = 0; i < l; i++) {
            var produto = produtos[i];
        }
    });
};

function renderList4(categorias) {
    log('Rendering list using local SQLite data...');
    dao.findAll4(function(categorias) {
        $('#list').empty();
        var l = categorias.length;
        for (var i = 0; i < l; i++) {
            var categoria = categorias[i];
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

function renderTables(callback) {
    log('Rendering list using local SQLite data...');
    var tcatalogos = [];
    var tpaginas = [];
    var tprodutos = [];
    var tcategorias = [];
    //var arr = [];
    //var arr2 = {xtype: 'imageviewer', imageSrc: 'http://orcamentos.eu/wp-content/uploads/2011/05/Italbox.png' };
    //var arr3 = [{id: 0, capa: 'imgs/produto1.jpg',nome: 'Produto 1'}, {id: 1, capa: 'imgs/produto2.jpg', nome: 'Produto 2'},{id: 2, capa: 'imgs/produto2.jpg', nome: 'Produto 2'}];
    
    dao.findAll(function(catalogos) {
        //var l = catalogos.length;
       // for (var i = 0; i < l; i++) {
           // var catalogo = catalogos[i];
           // var listaCatalogos = {
                   //style: "background-color: #000000; color:black;",
                   //title: catalogo.nome,
                   //html: "<img style=' margin:auto; width: 100%;' src='"+catalogo.capa+"'/>"
                   //xtype: 'imageviewer',
                   //imageSrc: 'data:image/jpg;base64,'+catalogo.capa
                    //imageSrc: catalogo.capa
             // };
              //arr.push(listaCatalogos);
              
        // }
         tcatalogos = catalogos;
         //callback(arr,arr2,arr3);
    });
      
    dao.findAll2(function(paginas) {
        var l = paginas.length;
        for (var i = 0; i < l; i++) {
            var pagina = paginas[i];
            var listaPaginas = {
                   xtype: 'imageviewer',
                   //imageSrc: 'data:image/jpg;base64,'+catalogo.capa
                   imageSrc: pagina.foto,
                   id_pagina: pagina.id_pagina,
                   id_catalogo: pagina.id_catalogo
              };
              tpaginas.push(listaPaginas); 
         }
         //callback(arr,arr2,arr3);
    });
        
    dao.findAll3(function(produtos) {
        //var l = produtos.length;
        //for (var i = 0; i < l; i++) {
          //  var produto = produtos[i];
            //var listaProdutos = {
                  
              //};
              //tprodutos.push(listaProdutos); 
         //}
         tprodutos = produtos;
         //callback(arr,arr2,arr3);
         
    });
    dao.findAll4(function(categorias) {
        //var l = categorias.length;
        //for (var i = 0; i < l; i++) {
            //var categoria = categorias[i];
            //var listaCategorias = {
                   
              //};
              //tcategorias.push(listaCategorias); 
         //}
         tcategorias = categorias;
         callback(tcatalogos,tpaginas,tprodutos,tcategorias);
    });
};

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
};

function sencha(){
renderTables(function(tcatalogos,tpaginas,tprodutos,tcategorias){
var idcatalogo = 0;
var idpagina = 0;
var ind = 0;
var contador = 0;

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': 'sencha-touch-2.0.1.1/ux'
    }
});

Ext.define('Italbox.Viewport2', {
    extend: 'Ext.Carousel',
    xtype : 'my-viewport2',
    id:'myCarroucel',
    config: {
        indicator: false,
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
        //items: arr
        //[
        //   
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag2.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag3.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag4.jpeg'},
        //    
        //   
        //]
        //,
        listeners: {
            activeitemchange: function(container, value, oldValue, eOpts) {
                try{
                    if (oldValue) {
                    oldValue.resetZoom();
                    this.getActiveItem().resize();
                    }
                }
                catch(err){}
                
                //console.dir(value.initialConfig.id_pagina);
                idpagina = value.initialConfig.id_pagina;
                contador = 0;
                contador = ($.grep(tprodutos, function(e) { return e.id_pagina == idpagina })).length;
                Ext.getCmp('open-menu4').setText('Produtos '+contador);
                //ind = Ext.getCmp('myCarroucel').getActiveIndex();
                var barra = Ext.getCmp('barra');
                var barra2 = Ext.getCmp('barra2');
                var footer = Ext.getCmp('footer');
                try {
                    var myList2 =  Ext.getCmp('myList2');
                     myList2.hide();
                }
                catch(err) {}
                footer.show();
                barra.hide();
                barra2.show();
            },
            resize: function(component, eOpts) {
                try{
                this.getActiveItem().resize();
                }
                catch(err){}
            },
          
        }
    },
    onDragStart: function(e) {
        var scroller = this.getActiveItem().getScrollable().getScroller();
        if (e.targetTouches.length === 1 && (e.deltaX < 0 && scroller.getMaxPosition().x === scroller.position.x) || (e.deltaX > 0 && scroller.position.x === 0)) {
            this.callParent(arguments);
        }
       
    },
    onDrag: function(e) {
        if (e.targetTouches.length == 1){
            this.callParent(arguments);
        }
    },
    onDragEnd: function(e) {
        if (e.targetTouches.length < 2)
            this.callParent(arguments);
    },
    initialize: function() {
        this.element.on('tap',function() {
            var barra = Ext.getCmp('barra');
            var barra2 = Ext.getCmp('barra2');
            barra.show();
            barra2.hide();
        });
    },
});


Ext.define('Italbox.Viewport', {
    extend: 'Ext.Panel',
    xtype : 'my-viewport',
    id:'myList',
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
                    cls: 'lista',
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
                        fields: ['id_catalogo','nome','capa','cor','lastModified'],
                        data: tcatalogos/*[{
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
                       }]*/
                    },
                    
                    itemTpl: '<img src="{capa}" class="capa"><div class="texto-capa">{nome}</div>',
                    listeners: {
                        itemtap: function(list, index, target, record) {
                            
                            Ext.Msg.confirm(
                            "Open",
                            "Open "+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                                 Ext.getCmp('myList').hide();
                                 Ext.getCmp('myCarroucel').removeAll(false);
                                 idcatalogo = record.get('id_catalogo');
                                 Ext.getCmp('myCarroucel').setItems($.grep(tpaginas, function(e) { return e.id_catalogo == idcatalogo }));
                                
                                 /*if (index === 0) {
                                 Ext.getCmp('myCarroucel').setItems(tpaginas);
                                 }
                                 if (index === 1) {
                                    Ext.getCmp('myCarroucel').setItems(arr2);
                                 }
                                  if (index === 2) {
                                    Ext.getCmp('myCarroucel').setItems(tpaginas);
                                 }
                                  if (index === 3) {
                                    Ext.getCmp('myCarroucel').setItems(arr2);
                                 }*/
                                 
                                 Ext.getCmp('myCarroucel').setActiveItem(0);
                                 Ext.getCmp('myCarroucel').show();
                                 Ext.getCmp('barra').hide();
                                 Ext.getCmp('barra2').show();
                                 Ext.getCmp('footer').show();
                                 Ext.getCmp('back').show();
                                 
                       
                        //var panel = Ext.Viewport.add({
                                    
                        //    extend: 'Ext.Carousel',
                        //    xtype : 'my-viewport2',
                        //    id: 'myCarroucel',
                        //    
                        //});
                        //
                        //
                        ////show the panel
                        //panel.show();
                                }
                            }
                        );
                        }
                    }
                }
            ],
    }
});

Ext.define('Italbox.ViewportPanel', {
    extend: 'Ext.Panel',
    xtype : 'my-viewport-panel',
    config: {
        fullscreen: true,
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            title: '<div class="logotipo"></div>',
            id: 'barra',
            cls: 'header',
            docked: 'top',
            showAnimation:  
                {
                    type: 'slideIn',
                    duration: 1000,
                    direction: 'down',
                    easing: 'easeIn'
                },  
                hideAnimation: 
                {
                    type: 'slideOut',
                    duration: 1000,
                    direction: 'up',
                    easing: 'easeOut'
                }, 
            items: [
                {
                    align: 'left',
                    ui:    'plain',
                    xtype: 'button',
                    id: 'back',
                    cls: 'back',
                    hidden: true,
                    handler: function () {
                    Ext.getCmp('myCarroucel').hide();
                    Ext.getCmp('barra2').hide();
                    Ext.getCmp('footer').hide();
                    try {
                    var myList2 =  Ext.getCmp('myList2');
                        myList2.hide();
                    }
                    catch(err) {}
                    Ext.getCmp('back').hide();
                    Ext.getCmp('myList').show();
                    
                    
        }, 
        
                },
                {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu',
                   handler: function() {
                        //add a hidden panel with showAnimation and hideAnimation
                        if( typeof panel !== 'undefined' ) {
                                 panel.destroy();
                        }
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
                    
        }, 
        
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
                    window.location.href=window.location.href;
                }
            }
        );  
        }, // handler
        //renderTo: Ext.getBody()
                }
            ]
        },
        {
            xtype: 'toolbar',
            //title: '<div class="logotipo"></div>',
            id: 'barra2',
            cls: 'header2',
            docked: 'top',
            hidden: true,
            layout: {
                    type: 'hbox',
                    pack: 'center'
            },
            showAnimation:  
                {
                    type: 'slideIn',
                    duration: 1000,
                    direction: 'down',
                    easing: 'easeIn'
                },  
                hideAnimation: 
                {
                    type: 'slideOut',
                    duration: 1000,
                    direction: 'up',
                    easing: 'easeOut'
                }, 
            items: [
              {
                    align: 'center', 
                    ui:    'plain',
                    xtype: 'button',
                   /* text: 'teste',*/
                    cls: 'open-menu3',
                    //hidden: true,
                    handler: function () {
                    Ext.getCmp('barra2').hide();
                    Ext.getCmp('barra').show();
                    }
                },
        //        {
        //            align: 'center', 
        //            ui:    'plain',
        //            xtype: 'button',
        //            id: 'teste',
        //            cls: 'open-menu3',
        //            //hidden: true,
        //            handler: function () {
        //            Ext.getCmp('barra2').hide();
        //            Ext.getCmp('barra').show();
        //           
        //}, // handler
        //////renderTo: Ext.getBody()
                //}
           ]    
        },
        {
            xtype: 'toolbar',
            //title: '<div class="logotipo"></div>',
            id: 'footer',
            cls: 'foot',
            docked: 'bottom',
            hidden: true,
              layout: {
                    type: 'hbox',
                    pack: 'center'
                    },
                showAnimation:  
                {
                    type: 'slideIn',
                    duration: 1000,
                    direction: 'up',
                    easing: 'easeIn'
                },  
                hideAnimation: 
                {
                    type: 'slideOut',
                    duration: 1000,
                    direction: 'down',
                    easing: 'easeOut'
                }, 
            items: [
              {
                    align: 'center', 
                    ui:    'plain',
                    xtype: 'button',
                    text: 'Produtos 0',
                    textAlign: 'left',
                    cls: 'open-menu4',
                    id: 'open-menu4',
                    //hidden: true,
                    handler: function () {
                       if (contador > 0) { 
                            //code
                        
                        Ext.getCmp('footer').hide();
                         if( typeof panel1 !== 'undefined' ) {
                                 panel1.destroy();
                        }
                        panel1 = Ext.Viewport.add({
                        xtype : 'panel',
                        id: 'myList2',
                        cls: 'menu3',
                        height: '150px',
                         /*hidden: true,*/
                        docked: 'bottom',
                        showAnimation:  
                {
                    type: 'slideIn',
                    duration: 1000,
                    direction: 'up',
                    easing: 'easeIn'
                },  
                hideAnimation: 
                {
                    type: 'slideOut',
                    duration: 1000,
                    direction: 'down',
                    easing: 'easeOut'
                }, 
                layout: {
                    type: 'vbox',
                    pack: 'bottom',
                    height: '120px',
                    //text-align: 'center',
                },
                items     : [
                   {   
                //give it an xtype of list for the list component
                   xtype: 'dataview',
                   height: '120px',
                   cls: 'lista2',
                   //cls: 'menu3',
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
                       fields: ['id_produto','nome','descricao','foto','ref','id_catalogo','id_pagina','lastModified'],
                       data: $.grep(tprodutos, function(e) { return e.id_pagina == idpagina && e.id_catalogo == idcatalogo })
                     //  [{
                     //      capa: 'imgs/produto1.jpg',
                     //      cor: 'azul',
                     //      nome: 'Produto 1'
                     //  }, {
                     //      capa: 'imgs/produto2.jpg',
                     //      cor: 'azul',
                     //      nome: 'Produto 2'
                     //  },
                     //]
                   },
                    itemTpl: '<img style="margin-right:10px; width:100px;" src="{foto}">',
                    //itemTpl: new Ext.XTemplate('<img style="margin-right:10px; height:75px;" src="{capa}">'),
                   //itemTpl: '<img src="{capa}" class="capa"><div class="texto-capa">{nome}</div>',
                   listeners: {
                        itemtap: function(list, index, target, record)
                        {
                            if( typeof panel2 !== 'undefined' ) {
                                 panel2.destroy();
                            }
                            panel2 = Ext.Viewport.add({ 
                                xtype: 'container',
                                height: '70%',
                                id: 'pop-image',
                                cls: 'pop-image',
                                
                                showAnimation: 
                                {
                                    type: 'pop',
                                    duration: 300,
                                    //direction: 'up',
                                    //easing: 'easeOut'
                                },  
                                hideAnimation: 
                                {
                                    type: 'popOut',
                                    duration: 300,
                                    //direction: 'down',
                                    //easing: 'easeIn'
                                },
                                layout : {
                                    type : 'vbox',
                                     /*align: 'left'*/
                                    },
                                items: [
                                    {
                                    align: 'right', 
                                    ui:    'plain',
                                    xtype: 'button',
                                    cls: 'close',
                                    //hidden: true,
                                    handler: function () {
                                        Ext.getCmp('pop-image').hide();
                                        /*panel2.destroy();*/
                                    }
                                    },
                                    {
                                        html  : '<div style="margin:20px;"><img src="'+record.get('foto')+'" style="margin-top:20px;"><br\><font size="2px">'+record.get('nome')+'<br/>Ref '+record.get('ref')+'<br/>'+record.get('descricao')+'</font></div>'
                                  
                                    },
                                ],
                                //listeners: {
                                //    tap: {
                                //     element: 'element',
                                //      fn: function() {
                                //        panel2.destroy();
                                //        }
                                //    }
                                //},
                                initialize: function() {
                                    this.callParent(arguments);
                                // Destroy this component when it is hidden, but only after
                                // the hide animation has ended.
                                this.getHideAnimation().on({
                                    animationend: this.destroy,
                                    scope: this
                                });
                                }
                            });
                        //show the panel
                        panel2.show();
                        },
                        //hide : function() {
                        //        Ext.getCmp('pop-image').destroy();
                        //}
                   },
           }
                           ]
   
});
   panel1.show();
                    } 
                    else{
                         Ext.Msg.alert('', 'Existem 0 produtos nesta pagina', Ext.emptyFn);
                    }
                               }
                           },
        //        {
        //            align: 'center', 
        //            ui:    'plain',
        //            xtype: 'button',
        //            id: 'teste',
        //            cls: 'open-menu3',
        //            //hidden: true,
        //            handler: function () {
        //            Ext.getCmp('barra2').hide();
        //            Ext.getCmp('barra').show();
        //           
        //}, // handler
        //////renderTo: Ext.getBody()
                //}
           ]    
        },
        {
            xtype: 'my-viewport',
            id: 'myList',
            
        },
         {
            xtype: 'my-viewport2',
            hidden: true,
            id: 'myCarroucel'
        },
        //{
        //    xtype: 'panel',
        //    id: 'myList2',
        //    cls: 'menu3',
        //    height: '150px',
        //    hidden: true,
        //    docked: 'bottom',
        //    
        //},
       
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
            id: 'painel'
        });
    }
});
});
};
