window.dao =  {
    syncURL:  "http://www.critecns.com/italbox/connect.php?table=catalogos",
    syncURL2: "http://www.critecns.com/italbox/connect.php?table=paginas",
    syncURL3: "http://www.critecns.com/italbox/connect.php?table=produtos",
    syncURL4: "http://www.critecns.com/italbox/connect.php?table=categorias",
    syncURL5: "http://www.critecns.com/italbox/connect.php?table=produtos_paginas",
    //syncURL:  "../../italbox/connect.php?table=catalogos",
    //syncURL2: "../../italbox/connect.php?table=paginas",
    //syncURL3: "../../italbox/connect.php?table=produtos",
    //syncURL4: "../../italbox/connect.php?table=categorias",
    //syncURL5: "../../italbox/connect.php?table=produtos_paginas",
    //syncURL: "http://www.italbox.alojamentogratuito.com/connect.php?test=1",
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
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='catalogos' OR name='paginas' OR name='produtos' OR name='categorias' OR name='produtos_paginas'", this.txErrorHandler,
                    function(tx, results) {
                        if (results.rows.length == 5) {
                            log('Using existing Catalogos table in local SQLite database');
                        }
                        else
                        {
                            log('Catalogos table does not exist in local SQLite database');
                            self.createTable(callback);
                            self.createTable2(callback);
                            self.createTable3(callback);
                            self.createTable4(callback);
                            self.createTable5(callback);
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
                    "estado VARCHAR(50), " +
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
                    "numero VARCHAR(50), " +
                    "foto VARCHAR(50), " +
                    "foto2 VARCHAR(50), " +
                    "foto3 VARCHAR(50), " +
                    "id_categoria VARCHAR(50), " +
                    "id_catalogo VARCHAR(50), " +
                    "capa VARCHAR(50), " +
                    "estado VARCHAR(50), " +
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
                    "estado VARCHAR(50), " +
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
                    "estado VARCHAR(50), " +
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

    createTable5: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS produtos_paginas ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "produto_id VARCHAR(50), " +
                    "pagina_id VARCHAR(50), " +
                    "priority VARCHAR(50), " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table produtos_paginas successfully CREATED in local SQLite database');
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
                var sql = "SELECT * FROM CATALOGOS WHERE ESTADO=1";
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
                var sql = "SELECT * FROM PAGINAS WHERE ESTADO=1 ORDER BY CAST(NUMERO AS INT)";
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
                var sql = "SELECT * FROM PRODUTOS WHERE ESTADO=1";
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
                var sql = "SELECT * FROM CATEGORIAS WHERE ESTADO=1";
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
    
    findAll5: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM PRODUTOS_PAGINAS PP INNER JOIN PRODUTOS P ON P.id_produto=PP.produto_id;";
                log('Local SQLite database: "SELECT * FROM PRODUTOS_PAGINAS"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            produtos_paginas = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            produtos_paginas[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(produtos_paginas);
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
    
     getLastSync5: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM produtos_paginas";
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
    
    sync5: function(callback) {
        var self = this;
        log('Starting synchronization...');
        this.getLastSync5(function(lastSync){
            self.getChanges5(self.syncURL5, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges5(changes, callback);
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
                //alert("A trabalhar em modo offline");
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
    
    getChanges5: function(syncURL5, modifiedSince, callback) {

        $.ajax({
            url: syncURL5,
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
                    "INSERT OR REPLACE INTO catalogos (id_catalogo, nome, capa, cor, estado, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = catalogos[i];
                    log(e.id_catalogo + ' ' + e.nome + ' ' + e.capa + ' ' + e.cor + ' ' + e.estado + ' ' + e.lastModified);
                    var params = [e.id_catalogo, e.nome, e.capa , e.cor , e.estado, e.lastModified];
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
                    "INSERT OR REPLACE INTO paginas (id_pagina, numero, foto, foto2, foto3, id_categoria, id_catalogo, estado, capa, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = paginas[i];
                    log(e.id_pagina + ' ' + e.numero + ' ' + e.foto + ' ' + e.foto2 + ' ' + e.foto3 + ' ' + e.id_categoria + ' ' + e.id_catalogo + ' ' + e.estado + ' ' + e.capa + ' ' + e.lastModified);
                    var params = [e.id_pagina, e.numero, e.foto, e.foto2, e.foto3, e.id_categoria , e.id_catalogo, e.estado, e.capa, e.lastModified];
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
                    "INSERT OR REPLACE INTO produtos (id_produto, nome, descricao, foto, ref, id_catalogo, id_pagina, estado, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = produtos[i];
                    log(e.id_produto + ' ' + e.nome + ' ' + e.descricao + ' ' + e.foto + ' ' + e.ref + ' ' + e.id_catalogo + ' ' + e.id_pagina + ' ' + e.estado + ' ' + e.lastModified);
                    var params = [e.id_produto, e.nome, e.descricao , e.foto, e.ref, e.id_catalogo, e.id_pagina, e.estado, e.lastModified];
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
                    "INSERT OR REPLACE INTO categorias (id_categoria, nome, estado, lastModified) " +
                    "VALUES (?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = categorias[i];
                    log(e.id_categoria + ' ' + e.nome + ' ' + e.estado + ' '  + e.lastModified);
                    var params = [e.id_categoria, e.nome, e.estado, e.lastModified];
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
    
    applyChanges5: function(produtos_paginas, callback) {
        this.db.transaction(
            function(tx) {
                var l = produtos_paginas.length;
                var sql =
                    "INSERT OR REPLACE INTO produtos_paginas (id , produto_id , pagina_id , priority , lastModified) " +
                    "VALUES (?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = produtos_paginas[i];
                    log(e.id + ' ' + e.produto_id + ' ' + e.pagina_id + ' ' + e.priority + ' ' + e.lastModified);
                    var params = [e.id, e.produto_id, e.pagina_id,e.priority, e.lastModified];
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
        //alert(tx.message);
    }
};


$(document).ready(function() {
    setTimeout('runApp()',2000);
    setTimeout('runApp2()',4000);
    //setTimeout('runApp3()',3000);
    setTimeout('runApp4()',6000);
    setTimeout('runApp5()',8000);
    setTimeout('runApp6()',10000);
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
dao.sync5(renderList5);
};

function runApp3() {
renderList();
};

function runApp4() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync2(renderList2)).then(dao.sync3(renderList3)).then(dao.sync4(renderList4)).then(dao.sync5(renderList5));
};

function runApp5() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync2(renderList2)).then(dao.sync3(renderList3)).then(dao.sync4(renderList4)).then(dao.sync5(renderList5));
};

function runApp6() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync2(renderList2)).then(dao.sync3(renderList3)).then(dao.sync4(renderList4)).then(dao.sync5(renderList5)).then(sencha());
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

function renderList5(produtos_paginas) {
    log('Rendering list using local SQLite data...');
    dao.findAll5(function(produtos_paginas) {
        $('#list').empty();
        var l = produtos_paginas.length;
        for (var i = 0; i < l; i++) {
            var produtos_pagina = produtos_paginas[i];
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
    var tpaginas2 = [];
    var tprodutos = [];
    var tcategorias = [];
    var tprodutos_paginas = [];
    var caminho = 'http://www.critecns.com/italbox/assets/uploads/imgs/';
    var caminho2 = 'http://www.critecns.com/italbox/assets/uploads/imgs/thumb/';
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
                   imageSrc: caminho+pagina.foto,
                   numero: pagina.numero,
                   id_pagina: pagina.id_pagina,
                   id_catalogo: pagina.id_catalogo,
                   thumb: caminho2+pagina.foto,
              };
              var listaPaginas2 = {
                   xtype: 'imageviewer',
                   //imageSrc: 'data:image/jpg;base64,'+catalogo.capa
                   imageSrc: caminho+pagina.foto2,
                   numero: pagina.numero,
                   id_pagina: pagina.id_pagina,
                   id_catalogo: pagina.id_catalogo,
                   thumb: caminho2+pagina.foto,
              };
               var listaPaginas3 = {
                   xtype: 'imageviewer',
                   //imageSrc: 'data:image/jpg;base64,'+catalogo.capa
                   imageSrc: caminho+pagina.foto3,
                   numero: pagina.numero,
                   id_pagina: pagina.id_pagina,
                   id_catalogo: pagina.id_catalogo,
                   thumb: caminho2+pagina.foto,
              };
              tpaginas.push(listaPaginas);
              tpaginas2.push(listaPaginas2);
              if (pagina.capa != 1) {
                tpaginas2.push(listaPaginas3); 
              }

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
        //var l = produtos.length;
        //for (var i = 0; i < l; i++) {
          //  var produto = produtos[i];
            //var listaProdutos = {
                  
              //};
              //tprodutos.push(listaProdutos); 
         //}
         tcategorias = categorias;
         //callback(arr,arr2,arr3);
         
    });
    dao.findAll5(function(produtos_paginas) {
        //var l = categorias.length;
        //for (var i = 0; i < l; i++) {
            //var categoria = categorias[i];
            //var listaCategorias = {
                   
              //};
              //tcategorias.push(listaCategorias); 
         //}
         tprodutos_paginas = produtos_paginas;
         //console.dir(tprodutos_paginas);
         callback(tcatalogos,tpaginas,tpaginas2,tprodutos,tcategorias,tprodutos_paginas);
    });
};

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
};

function sencha(){
renderTables(function(tcatalogos,tpaginas,tpaginas2,tprodutos,tcategorias,tprodutos_paginas){
var connect = 1;
var tpaginas_temp = [];
var tpaginas2_temp = [];
var idcatalogo = 0;
var idpagina = 0;
var numero = 0;
var source = '';
var ind = 0;
var contador = 0;
var caminho = 'http://www.critecns.com/italbox/assets/uploads/imgs/';
var caminho2 = 'http://www.critecns.com/italbox/assets/uploads/imgs/thumb/';
//var tamanho = 0;
var idioma = 0;


Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': 'sencha-touch-2.0.1.1/ux'
    }
});

Ext.define('Italbox.Viewport7', {
    extend: 'Ext.Panel',
    xtype : 'my-viewport7',
    id:'menuI',
    cls: 'menuI',
    config: {
            showAnimation: 
            {
                type: 'slideIn',
                duration: 1000,
                delay: 700,
                direction: 'up',
                easing: 'easeIn'
            },  
            hideAnimation: 
            {
                type: 'slideOut',
                duration: 700,
                direction: 'down',
                easing: 'easeOut'
            }, 
            
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    //marginTop: '50px !important',
    items: [
        {
        //width: 50,
        
        flex:1, // this needs to be flexy as well
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
        {
            id: 'start-italbox',
            flex: 1,
            style: 'margin:5px 5px 5px 10px; background: url(imgs/icons/italbox_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
            //html: '<i class=icon-twitter style="font-size: 30vmin;"></i>'
            //html: '<div><img src="imgs/icons/italbox_menu2.png" style=""></img></div>'
        },
        {
            id: 'start-catalogos',
            flex: 1,
            style: 'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        },   
        /*{
            //height: 50,
            id: 'start-help',
            flex: 1,
            style: 'margin:5px; margin-left:10px !important; margin-bottom:10px !important; background: url(imgs/icons/ajuda_menu3.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        }*/
        ]
    },
    {
        flex:1, // this needs to be flexy as well
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
           //height: 50,
            id: 'start-favoritos',
            flex: 1,
            style: 'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        
        }, {
            id: 'start-language',
            //height: 50,
            flex: 1,
            style: 'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        },
        /*{
            id: 'start-help2',
            //height: 50,
            flex: 1,
            style: 'margin:5px; margin-right:10px !important; margin-bottom:10px !important; background: url(imgs/icons/ajuda_menu3.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        }*/]
    },
    
    {
        flex:1, // this needs to be flexy as well
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
      items: [
        {
             //height: 50,
            id: 'start-help',
            flex: 1,
            style: 'margin:5px 10px 10px 10px; background: url(imgs/icons/ajuda_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
           },
        ],    
    },
    ],
            listeners: [
            {
                element: 'element',
                delegate: '#start-catalogos',
                event: 'tap',
                fn: function() {
                    if (connect === 1) {
                        Ext.getCmp('menuI').hide();
                        Ext.getCmp('back').show();
                        Ext.getCmp('myList').show();
                    }
                    else{
                        Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_catalogs'), Ext.emptyFn);
                    }
                }
            },
            {
                element: 'element',
                delegate: '#start-italbox',
                event: 'tap',
                fn: function() {
                    Ext.getCmp('menuI').hide();
                    Ext.getCmp('back').show();
                    Ext.getCmp('italbox').show();
                }
            },
             {
                element: 'element',
                delegate: '#start-favoritos',
                event: 'tap',
                fn: function() {
                    if (connect === 1) {
                        Ext.getCmp('menuI').hide();
                        Ext.getCmp('back').show();
                        Ext.getCmp('favorites').show();
                    }
                    else{
                        Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_favorites'), Ext.emptyFn);
                    }
                }
            },
            {
                element: 'element',
                delegate: '#start-language',
                event: 'tap',
                fn: function() {
                 /*Ext.getCmp('menuI').hide();
                 Ext.getCmp('back').show();
                 Ext.getCmp('help').show();*/
                                   
                var panel_language = Ext.Viewport.add({ 
                    xtype: 'container',
                    id: 'menuL',
                    modal: true,
                    /*{
                        style: 'opacity: 0.8; background-color: #ffffff;'
                    */
                    height    : '220px',
                    width     : '100%',
                    floating  : true,                               
                    top       : '0px',
                    bottom : 'auto',
                    cls: 'menuL',
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
                            html  : '<li class="menu-portugues" id="menu-portugues"></span><span style="padding-left: 20px; font-size: 14px;">PORTUGUÊS</span><span class="icon-front" style="vertical-align: middle; float: right;padding:3px 20px 0px 0px;"></li>',
                        },
                        {
                            html  : '<li class="menu-english" id="menu-english"><span style="padding-left: 20px; font-size: 14px;">ENGLISH</span><span class="icon-front" style="vertical-align: middle;float: right;padding:3px 20px 0px 0px;"></span></li>',
                        },
                        {
                            html  : '<li class="menu-francais" id="menu-francais"></span><span style="padding-left: 20px; font-size: 14px;">FRANÇAIS</span><span class="icon-front" style="vertical-align: middle;float: right; padding:3px 20px 0px 0px;"></li>'
                        },
                        {
                            html  : '<li class="menu-castellano" id="menu-castellano"></span><span style="padding-left: 20px; font-size: 14px;">CASTELLANO</span><span class="icon-front" style="vertical-align: middle;float: right;padding:3px 20px 0px 0px;"></li>'
                        }
                    ],
                    listeners: [
                        {
                            element: 'element',
                            delegate: '#menu-portugues',
                            event: 'tap',
                            fn: function() {
                                var valor = { id_setting: '1', lang: '1'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                            }
                        },
                        {
                            element: 'element',
                            delegate: '#menu-english',
                            event: 'tap',
                            fn: function() {
                                var valor = { id_setting: '1', lang: '2'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                            }
                        },
                         {
                            element: 'element',
                            delegate: '#menu-francais',
                            event: 'tap',
                            fn: function() {
                               var valor = { id_setting: '1', lang: '3'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                            }
                        },
                        {
                            element: 'element',
                            delegate: '#menu-castellano',
                            event: 'tap',
                            fn: function() {
                             var valor = { id_setting: '1', lang: '4'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                            }
                        }
                    ]
                });
                //show the panel
                panel_language.show();
                panel_language.on('hide', function() {
                    panel_language.destroy();

                });
                       
                       /* if (idioma === '1') {    
                       var valor = { id_setting: '1', lang: '2'};
                        Ext.getStore('Settings').getAt(0).set(valor);
                        Ext.getStore('Settings').sync();
                        idioma = Ext.getStore('Settings').getAt(0).get('lang');
                        Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                        Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                        Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                        Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                        //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                        Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                        Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                        Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                        Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                        Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                        Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                        Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                        Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                        Ext.MessageBox.override({
                                confirm: function(title, message, fn, scope) {
                                return this.show({
                                    title       : title || null,
                                    message     : message || null,
                                    buttons     : [
                                    {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                    {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                ],
                                    promptConfig: false,
                                    scope       : scope,
                                    fn: function() {
                                        if (fn) {
                                            fn.apply(scope, arguments);
                                        }
                                    }
                                });
                            }
                        });
                        //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                        //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                   }
                   else{
                        var valor = { id_setting: '1', lang: '1'};
                        Ext.getStore('Settings').getAt(0).set(valor);
                        Ext.getStore('Settings').sync();
                        idioma = Ext.getStore('Settings').getAt(0).get('lang');
                        Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                        Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                        Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                        Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                        //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                        Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                        Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                        Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                        Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                        Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                        Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                        Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                        Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                        Ext.MessageBox.override({
                                confirm: function(title, message, fn, scope) {
                                return this.show({
                                    title       : title || null,
                                    message     : message || null,
                                    buttons     : [
                                    {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                    {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                ],
                                    promptConfig: false,
                                    scope       : scope,
                                    fn: function() {
                                        if (fn) {
                                            fn.apply(scope, arguments);
                                        }
                                    }
                                });
                            }
                        });
                        //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                        //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                   }*/
                }
            },
            
            {
                element: 'element',
                delegate: '#start-help',
                event: 'tap',
                fn: function() {
                 Ext.getCmp('menuI').hide();
                 Ext.getCmp('back').show();
                 Ext.getCmp('help').show();
                }
            },
            {
                element: 'element',
                delegate: '#start-help2',
                event: 'tap',
                fn: function() {
                 Ext.getCmp('menuI').hide();
                 Ext.getCmp('back').show();
                 Ext.getCmp('help').show();
                }
            },
            ]
    }
});

Ext.define('Italbox.Viewport6', {
    extend: 'Ext.dataview.List',
    xtype : 'my-viewport6',
    cls: 'pesquisa',
    id:'search',
    config: {       
        showAnimation: 
        {
            type: 'slideIn',
            duration: 1000,
            delay: 700,
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
        store: {id: 'produtos',
                fields: ['id_produto', 'nome', 'descricao', 'foto', 'ref', 'id_catalogo', 'id_pagina', 'estado', 'lastModified'],
                data:tprodutos
        },
        itemTpl:  '<div class="lista-pesquisa">'+
            '<img src="'+caminho2+'{foto}" style="float:left; height:40px; margin-right:10px;"></img>' +
            '<div><b>Nome:</b> <span>{nome}</span></div>' +
            '<div><b>Ref:</b> <span>{ref}</span></div>' +
            '</div>',
         
        emptyText: '<div class="lista-pesquisa">Sem resultados</div>',
              
        items: [
               {
               xtype: 'toolbar',
               docked: 'top',
               cls: 'barraPesquisa',
               items: [
               {
                    xtype: 'searchfield',
                    placeHolder: 'Pesquisa...',
                    itemId: 'searchBox',
                    id: 'searchBox',
                    cls: 'search',
                    listeners: {
                        keyup: function(searchBox) {
                            queryString = searchBox.getValue();
                            //console.log(this,'Please search by: ' + queryString);
                            //var store = Ext.getStore('produtos');
                            Ext.getStore('produtos').clearFilter();
                            if(queryString){
                                var thisRegEx = new RegExp(queryString, "i");
                                Ext.getStore('produtos').filterBy(function(record) {
                                if (thisRegEx.test(record.get('nome')) ||
                                    thisRegEx.test(record.get('ref'))) {
                                    return true;
                                };
                                return false;
                             });
                            }
                        },
                        clearicontap: function() {
                            //console.log('Clear icon is tapped');
                            //var store = Ext.getStore('produtos');
                             Ext.getStore('produtos').clearFilter();
                            //store.data.clear();
                        },
                    }
                },
                ],
            }
        ],
        listeners: {
            itemtap: function(list, index, target, record) {
                //Ext.Msg.alert('', ''+record.get('nome'), Ext.emptyFn);
                Ext.Msg.confirm(
                            "",
                            Ext.getStore('Languages').getById(idioma).get('open_product')+' '+record.get('nome')+"?",
                            function(buttonId) {
                           
                            if (buttonId === 'yes') {
                                if( typeof panel_produto !== 'undefined' ) {
                                 panel_produto.destroy();
                            }
                            panel_produto = Ext.Viewport.add({ 
                                xtype: 'container',
                                /*height: '70%',*/
                                id: 'pop-produto',
                                cls: 'pop-produto',
                                /*modal: {
                                    style: 'opacity: 0; background-color: #ffffff;'
                                },*/
                                float: true,
                                // modal: true,
                                showAnimation: 
                                {
                                    type: 'pop',
                                    duration: 300,
                                },  
                                //hideAnimation: 
                                //{
                                //    type: 'popOut',
                                //    duration: 300,
                                //    //direction: 'down',
                                //    //easing: 'easeIn'
                                //},
                                layout : {
                                    type : 'vbox',
                                     /*align: 'left'*/
                                },
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        //title: '<div class="logotipo"></div>',
                                        /*id: 'barra2',*/
                                        cls: 'header3',
                                        /*docked: 'top',*/
                                        /*hidden: true,*/
                                        layout: {
                                                type: 'hbox',
                                                pack: 'right'
                                        },
                                       
                                        items: [
                                            {
                                            align: 'right', 
                                            ui:    'plain',
                                            xtype: 'button',
                                            cls: 'close icon-close',
                                            //hidden: true,
                                            handler: function () {
                                                Ext.getCmp('pop-produto').hide();
                                                /*panel2.destroy();*/
                                                }
                                            },
                                        ]    
                                    },
                                    {
                                        html  : '<div class="pop-up">'+
                                        '<img src="'+caminho+record.get('foto')+'">'+
                                        '<br\>'+record.get('nome')+'<br/>'+
                                        'Ref '+record.get('ref')+'<br/>'+record.get('descricao')+'</div>'
                                  
                                    },
                                ],
                               
                            });
                        //show the panel
                        panel_produto.show();
                        panel_produto.on('hide', function() {
                           panel_produto.destroy();
                        });
                              
                        }});
            }
        }
    }
});

Ext.define('Italbox.Viewport5', {
    extend: 'Ext.tab.Panel',
    xtype : 'my-viewport5',
    id:'favorites',
    cls: 'favorites',
    config: {
        showAnimation: 
            {
                type: 'slideIn',
                duration: 1000,
                delay: 1000,
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
            tabBar:    {
                cls: 'barraTab',
                id: 'barraTab',
                layout: {
                    //type : 'hbox',
                    //align: 'right',
                    //pack : 'right'
                },
            },
            //cls: 'teste',
            //layout: {
            //    type: 'vbox',
            //    //pack: 'center',
            //    //height: '400px',
            //    
            //},
            //   scrollable: {
            //    direction: 'vertical'
            //},
           items: [
                {
                    
                      //each item in a tabpanel requires the title configuration. this is displayed
                    //on the tab for this item
                    title: 'PÁGINAS',
                    layout : 'fit',
                    cls: 'tabPaginas',
                    //next we give it some simple html
                    items: [
                    {
                    
                    //give it an xtype of list for the list component
                    xtype: 'dataview',
                    //max-height: '400px',
                    cls: 'favoritos',
                    id: 'data_paginas',
                    //top: '50px !important',
                    //margin: '50px 0 0 0',
                    flex: 1,
                    scrollable: {
                        direction: 'vertical',
                        //indicators: false
                    },
                    inline: {
                        wrap: true
                    },

                    //set the itemtpl to show the fields for the store
                     store: 'Favorites',
                     /*{
                        id: 'loja',
                        autoLoad: true,
                        proxy: {
                            //use sessionstorage if need to save data for that
                            //specific session only
                                type: 'localstorage',
                                id  : 'lojaKey'
                        },
                        fields: ['imag','nome','id_pagina','id_catalogo','numero'],*/
                       // data: [{
                       //     imag: 'imgs/fav1.jpg',
                       //     nome: 'Catalogo 1 Pagina 16',
                       //     id_pagina: '15',
                       //     id_catalogo: '1',
                       //     numero: '16'
                       // }, {
                       //     imag: 'imgs/fav2.jpg',
                       //     nome: 'Catalogo 1 Pagina 5',
                       //     id_pagina: '4',
                       //     id_catalogo: '1',
                       //     numero: '5'
                       // }, {
                       //     imag: 'imgs/fav3.jpg',
                       //     nome: 'Catalogo 1 Pagina 4',
                       //     id_pagina: '3',
                       //     id_catalogo: '1',
                       //     numero: '4'
                       //}]
                    /*},*/
                    
                    itemTpl: '<img src="{imag}" style="width:130px; margin:10px 10px 0 10px;"></img><i class="remove icon-close2"  style=""></i><div style="text-align: center; font-size:12px;">{nome}</div>',
                    
                    emptyText: '<div style="margin-left: 10px; margin-top: 10px; font-size: 19px;">Sem Favoritos</div>',
                    
                    listeners: {
                        itemtap: function(list, index, target, record,e) {
                            if (e.getTarget('i.remove')) {
                                Ext.Msg.confirm(
                            "",
                            Ext.getStore('Languages').getById(idioma).get('remove_favorite')+' '+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                                //var loja = Ext.getStore('Favorites');
                                //var newRecord = {imag: source ,nome: 'Catalogo '+idcatalogo+' Pagina '+numero , id_pagina: ''+idpagina+'', id_catalogo: idcatalogo,numero: numero};
                                //console.dir(newRecord);
                                Ext.getStore('Favorites').remove(record);
                                Ext.getStore('Favorites').sync();
                                }});
                                
                            }
                            else{
                             Ext.Msg.confirm(
                            "",
                            Ext.getStore('Languages').getById(idioma).get('open_favorite')+' '+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                                 //var carr = Ext.getCmp('myCarroucel');
                                 //var ori = Ext.Viewport.getOrientation();
                                 Ext.getCmp('favorites').hide();
                                 Ext.getCmp('myCarroucel').removeAll(true,true);
                                 idcatalogo = record.get('id_catalogo');
                                 tpaginas_temp  = $.grep(tpaginas, function(e) { return e.id_catalogo == idcatalogo });
                                 tpaginas2_temp = $.grep(tpaginas2, function(e) { return e.id_catalogo == idcatalogo });
                                 //tamanho = tpaginas2_temp.length;
                                 //alert(tamanho);
                             if (Ext.Viewport.getOrientation() === 'portrait') {
                                 Ext.getCmp('myCarroucel').setItems(tpaginas2_temp);
                                 Ext.getCmp('myCarroucel').setActiveItem((record.get('numero')*2)-3);
                             }
                             else{
                                 Ext.getCmp('myCarroucel').setItems(tpaginas_temp);
                                 Ext.getCmp('myCarroucel').setActiveItem(record.get('numero')-1);
                             }
                             Ext.getCmp('barra5').show();
                             Ext.getCmp('footer').show();
                             Ext.getCmp('myCarroucel').show();
                            //var newRecord = {imag: source ,nome: 'Catalogo '+idcatalogo+' Pagina '+numero , idpagina: idpagina, idcatalogo: idcatalogo,numero: numero};
                      
                            }});
                             
                             
                            /////Remover
                            /* Ext.Msg.confirm(
                            "",
                            "Remover "+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                            //Ext.Msg.alert('', ''+record.get('imag'), Ext.emptyFn);
                            var fav =  Ext.StoreManager.get('loja');
                            fav.remove(record);
                            //console.dir(fav);
                            }});*/
                        }
                        }  
                    }
                    
                    }
                    ],

                    
                },
                {
                    
                      //each item in a tabpanel requires the title configuration. this is displayed
                    //on the tab for this item
                    title: 'PRODUTOS',
                    layout : 'fit',
                    cls: 'tabPaginas',
                    //next we give it some simple html
                    items: [
                    {
                    
                    //give it an xtype of list for the list component
                    xtype: 'dataview',
                    //max-height: '400px',
                    cls: 'favoritos',
                    id: 'data_produtos',
                    //top: '50px !important',
                    //margin: '50px 0 0 0',
                    flex: 1,
                    scrollable: {
                        direction: 'vertical',
                        //indicators: false
                    },
                    inline: {
                        wrap: true
                    },

                    //set the itemtpl to show the fields for the store
                     store: 'Favorites2',
                     /*{
                        id: 'loja',
                        autoLoad: true,
                        proxy: {
                            //use sessionstorage if need to save data for that
                            //specific session only
                                type: 'localstorage',
                                id  : 'lojaKey'
                        },
                        fields: ['imag','nome','id_pagina','id_catalogo','numero'],*/
                       // data: [{
                       //     imag: 'imgs/fav1.jpg',
                       //     nome: 'Catalogo 1 Pagina 16',
                       //     id_pagina: '15',
                       //     id_catalogo: '1',
                       //     numero: '16'
                       // }, {
                       //     imag: 'imgs/fav2.jpg',
                       //     nome: 'Catalogo 1 Pagina 5',
                       //     id_pagina: '4',
                       //     id_catalogo: '1',
                       //     numero: '5'
                       // }, {
                       //     imag: 'imgs/fav3.jpg',
                       //     nome: 'Catalogo 1 Pagina 4',
                       //     id_pagina: '3',
                       //     id_catalogo: '1',
                       //     numero: '4'
                       //}]
                    /*},*/
                    
                    itemTpl: '<img src="{thumb}" style="width:130px; margin:10px 10px 0 10px;"></img><i class="remove icon-close2"  style=""></i><div style="text-align: center; font-size:12px;">{nome}</div>',
                    
                    emptyText: '<div style="margin-left: 10px; margin-top: 10px; font-size: 19px;">Sem Favoritos</div>',
                    
                    listeners: {
                        itemtap: function(list, index, target, record,e) {
                            if (e.getTarget('i.remove')) {
                                Ext.Msg.confirm(
                            "",
                            Ext.getStore('Languages').getById(idioma).get('remove_favorite')+' '+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                                //var loja2 = Ext.getStore('Favorites2');
                                //var newRecord = {imag: source ,nome: 'Catalogo '+idcatalogo+' Pagina '+numero , id_pagina: ''+idpagina+'', id_catalogo: idcatalogo,numero: numero};
                                //console.dir(newRecord);
                                Ext.getStore('Favorites2').remove(record);
                                Ext.getStore('Favorites2').sync();
                                }});
                                
                            }
                            else{
                            Ext.Msg.confirm(
                            "",
                            Ext.getStore('Languages').getById(idioma).get('open_favorite')+' '+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                                
                            if( typeof panel_produto !== 'undefined' ) {
                                 panel_produto.destroy();
                            }
                            panel_produto = Ext.Viewport.add({ 
                                xtype: 'container',
                                /*height: '70%',*/
                                id: 'pop-produto',
                                cls: 'pop-produto',
                                /*modal: {
                                    style: 'opacity: 0; background-color: #ffffff;'
                                },*/
                                float: true,
                                // modal: true,
                                showAnimation: 
                                {
                                    type: 'pop',
                                    duration: 300,
                                },  
                                //hideAnimation: 
                                //{
                                //    type: 'popOut',
                                //    duration: 300,
                                //    //direction: 'down',
                                //    //easing: 'easeIn'
                                //},
                                layout : {
                                    type : 'vbox',
                                     /*align: 'left'*/
                                },
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        //title: '<div class="logotipo"></div>',
                                        /*id: 'barra2',*/
                                        cls: 'header3',
                                        /*docked: 'top',*/
                                        /*hidden: true,*/
                                        layout: {
                                                type: 'hbox',
                                                pack: 'right'
                                        },
                                       
                                        items: [
                                            {
                                            align: 'right', 
                                            ui:    'plain',
                                            xtype: 'button',
                                            cls: 'close icon-close',
                                            //hidden: true,
                                            handler: function () {
                                                Ext.getCmp('pop-produto').hide();
                                                /*panel2.destroy();*/
                                                }
                                            },
                                        ]    
                                    },
                                    {
                                        html  : '<div class="pop-up">'+
                                        '<img src="'+record.get('foto')+'">'+
                                        '<br\>'+record.get('nome')+'<br/>'+
                                        'Ref '+record.get('ref')+'<br/>'+record.get('descricao')+'</div>'
                                  
                                    },
                                ],
                               
                            });
                            //show the panel
                            panel_produto.show();
                            panel_produto.on('hide', function() {
                               panel_produto.destroy();
                            });
                        }});
                        }
                        }  
                    }
                    
                    }
                    ],

                    
                },
            ],
           
    }
});

Ext.define('Italbox.Viewport4', {
    extend: 'Ext.Panel',
    xtype : 'my-viewport4',
    id:'help',
    config: {
        showAnimation: 
            {
                type: 'slideIn',
                duration: 1000,
                delay: 700,
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
                //pack: 'center',
                //height: '400px',
                
            },
               scrollable: {
                direction: 'vertical'
            },
           items : [
                    {
                        id: 'helpHtml',
                        html  : '<div style="margin:20px; margin-top:0px !important;"><img src="imgs/company2.jpg" style="max-width:100%;"></img><br/>AJUDA<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>',
                    },
                               
            ],
    }
});


Ext.define('Italbox.Viewport3', {
    extend: 'Ext.Panel',
    xtype : 'my-viewport3',
    id:'italbox',
    config: {
        showAnimation: 
            {
                type: 'slideIn',
                duration: 1000,
                delay: 700,
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
                //pack: 'center',
                //height: '400px',
                
            },
             scrollable: {
                direction: 'vertical'
            },
           items : [
                    {
                        id: 'italboxHtml',
                        html  : '<div class="italbox"><img src="imgs/company.jpg"></img><br/>EMPRESA<br/><br/><p>A ITALBOX, LDA, empresa portuguesa fundada em 1999, é uma empresa especializada no fabrico de cabines de banho com design próprio e exclusivo, e uma excelente dicotomia qualidade/preço. Com uma equipa de 62 colaboradores, a Italbox é líder no mercado Português e tem apresentado taxas de crescimentono volume de negócios de 20% por ano, nos últimos 5 anos.<br/>Em 2011 lançou o novo catalogo com uma nova linha de produtos que completa, no nosso entender, soluções que não estavam contempladas no nosso anterior catálogo.<br/>Lançamos também um catálogo de móveis de casa de banho, de fabrico próprio, no sentido de complementar a oferta.<br/>Para que possam verificar os modelos que produzimos, queiram consultar o nosso Web site: <font color="#b69757">www.italbox.pt</font>.<br/>Informamos que estamos ao vosso dispor para qualquer informação e esclarecimento adicional através do e-mail: <font color="#b69757">comercial@italbox.pt</font>.</p></div>',
                    },
                               
            ],
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
                delay: 500,
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
                idcatalogo = value.initialConfig.id_catalogo;
                numero = value.initialConfig.numero;
                source = value.initialConfig.thumb;
                contador = 0;
                contador = ($.grep(tprodutos_paginas, function(e) { return e.pagina_id == idpagina })).length;
                Ext.getCmp('open-menu4').setText('<span style="text-align:center; padding-left: 25px; line-height: 2;">'+Ext.getStore('Languages').getById(idioma).get('product')+' '+contador+'</span><span style="text-align:right; float:right;"><i class="icon-cima"></i></span>');
                //ind = Ext.getCmp('myCarroucel').getActiveIndex();
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
        // var barra = Ext.getCmp('barra');
        // var barra2 = Ext.getCmp('barra2');
        // var footer = Ext.getCmp('footer');
        try {
            //var myList2 =  Ext.getCmp('myList2');
            Ext.getCmp('myList2').hide();
        }
        catch(err) {}
        Ext.getCmp('footer').show();
        Ext.getCmp('barra').hide();
        Ext.getCmp('barra2').show();
        }
    },
    onDragEnd: function(e) {
        if (e.targetTouches.length < 2)
            this.callParent(arguments);
    },
    initialize: function() {
        Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
        this.callParent(arguments);
        
        this.element.on('tap',function() {
            //var barra = Ext.getCmp('barra');
            //var barra2 = Ext.getCmp('barra2');
            Ext.getCmp('barra').show();
            Ext.getCmp('barra2').hide();
    });
    },
    
    handleOrientationChange: function(viewport, orientation, width, height){
         //var carr = Ext.getCmp('myCarroucel');
         ind = Ext.getCmp('myCarroucel').getActiveIndex();
         //console.dir(carr.getActiveItem());
         //carr.removeAll(true);
         if (Ext.Viewport.getOrientation() === 'portrait') {
            Ext.getCmp('myCarroucel').setItems(tpaginas2_temp);
            var round1 = Math.round(ind*2);
            Ext.getCmp('myCarroucel').setActiveItem(round1-1);
         }
         else {
            /*if ((ind > 0) && (ind%2 != 0)) {
                ind = ind-1;
            }*/
            Ext.getCmp('myCarroucel').setItems(tpaginas_temp);
            var round2 = Math.round(ind/2);
            Ext.getCmp('myCarroucel').setActiveItem(round2);
         }
    }
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
                delay: 700,
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
                //height: '400px',
                
            },
            items: [
                {
                    //give it an xtype of list for the list component
                    xtype: 'dataview',
                    //max-height: '400px',
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
                        fields: ['id_catalogo','nome','capa','cor','estado','lastModified'],
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
                    
                    itemTpl: '<img src="'+caminho+'{capa}" class="capa"><div class="texto-capa">{nome}</div>',
                    listeners: {
                        itemtap: function(list, index, target, record) {
                            Ext.Msg.confirm(
                            "",
                            Ext.getStore('Languages').getById(idioma).get('open')+' '+record.get('nome')+"?",
                            function(buttonId) {
                            if (buttonId === 'yes') {
                                 //var ori = Ext.Viewport.getOrientation();
                                 Ext.getCmp('myList').hide();
                                 Ext.getCmp('myCarroucel').removeAll(true,true);
                                 idcatalogo = record.get('id_catalogo');
                                 tpaginas_temp  = $.grep(tpaginas, function(e) { return e.id_catalogo == idcatalogo });
                                 tpaginas2_temp = $.grep(tpaginas2, function(e) { return e.id_catalogo == idcatalogo });
                                 tamanho = tpaginas2_temp.length;
                                 //alert(tamanho);
                             if (Ext.Viewport.getOrientation() === 'portrait') {
                                 Ext.getCmp('myCarroucel').setItems(tpaginas2_temp);
                             }
                             else{
                                 Ext.getCmp('myCarroucel').setItems(tpaginas_temp);
                             }
                                 Ext.getCmp('myCarroucel').setActiveItem(0);
                                 Ext.getCmp('myCarroucel').show();
                                 Ext.getCmp('barra').hide();
                                 Ext.getCmp('barra2').show();
                                 Ext.getCmp('barra5').show();
                                 Ext.getCmp('footer').show();
                                 Ext.getCmp('open-menu4').show();
                                 Ext.getCmp('back').show();
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
        //stores : ['Favorites2'],
        //models : ['Favorite2'],
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
                    cls: 'back icon-back',
                    hidden: true,
                    handler: function () {
                    //var lista = Ext.getCmp('myList');
                    //var carr = Ext.getCmp('myCarroucel');
                    //var italbox = Ext.getCmp('italbox');
                    //var favorites = Ext.getCmp('favorites');
                    //var help = Ext.getCmp('help');
                    //var search = Ext.getCmp('search');
                    if(Ext.getCmp('myList')._hidden === false || Ext.getCmp('italbox')._hidden === false || Ext.getCmp('favorites')._hidden === false || Ext.getCmp('help')._hidden === false || Ext.getCmp('search')._hidden === false )
	            {
                        Ext.getCmp('menuI').show();
                        Ext.getCmp('myCarroucel').hide();
                        Ext.getCmp('myCarroucel').on('hide', function() {
                         Ext.getCmp('myCarroucel').removeAll(true,true);
                        });
                        //carr.removeAll(true,true);
                        Ext.getCmp('barra2').hide();
                        Ext.getCmp('footer').hide();
                         Ext.getCmp('barra5').hide();
                        try {
                        //var myList2 =  Ext.getCmp('myList2');
                        Ext.getCmp('myList2').hide();
                        Ext.getCmp('myList').hide();
                        
                         }
                         catch(err) {}
                    
                    Ext.getCmp('back').hide();
                    Ext.getCmp('italbox').hide();
                    Ext.getCmp('favorites').hide();
                    Ext.getCmp('help').hide();
                    Ext.getCmp('search').hide();
                    Ext.getCmp('myList').hide();
                    }
                    else
                    {
                    
                    
                    Ext.getCmp('myCarroucel').hide();
                    Ext.getCmp('myCarroucel').on('hide', function() {
                         Ext.getCmp('myCarroucel').removeAll(true,true);
                    });
                    //carr.removeAll(true,true);
                    Ext.getCmp('barra2').hide();
                    Ext.getCmp('footer').hide();
                    Ext.getCmp('barra5').hide();
                    try {
                    //var myList2 =  Ext.getCmp('myList2');
                        Ext.getCmp('myList2').hide();
                        Ext.getCmp('myList').hide();
                        
                    }
                    catch(err) {}
                    //Ext.getCmp('back').hide();
                    Ext.getCmp('italbox').hide();
                    Ext.getCmp('favorites').hide();
                    Ext.getCmp('help').hide();
                    Ext.getCmp('search').hide();
                    Ext.getCmp('myList').show();
                    }
                    
                }, 
        
                },
                {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu icon-menu',
                   handler: function() {
                        //add a hidden panel with showAnimation and hideAnimation
                        if( typeof panel_menu !== 'undefined' ) {
                                 panel_menu.destroy();
                        }
                         var panel_menu = Ext.Viewport.add({ 
                            xtype: 'container',
                            id: 'menuP',
                            modal: true,
                            /*{
                                style: 'opacity: 0.8; background-color: #ffffff;'
                            */
                            height    : 100,
                            width     : 240,
                            floating  : true,                               
                            top       : -160,
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
                                    html  : '<li class="menu-italbox" id="menu-italbox"><span class="icon-italbox" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('italbox')+'</span></li>',
                                },
                                {
                                    html  : '<li class="menu-catalogos" id="menu-catalogos"><span class="icon-catalogos" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('catalogs')+'</span></li>',
                                },
                                {
                                    html  : '<li class="menu-favoritos" id="menu-favoritos"><span class="icon-star" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('favorites')+'</span></li>'
                                },
                                {
                                    html  : '<li class="menu-language" id="menu-language"><span class="icon-mundo-catalogos" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('language')+'</span></li>'
                                },
                                {
                                    html  : '<li class="menu-ajuda" id="menu-help"><span class="icon-ajuda" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('help')+'</span></li>'
                                }
                            ],
                            listeners: [
                            {
                                element: 'element',
                                delegate: '#menu-italbox',
                                event: 'tap',
                                fn: function() {
                                 Ext.getCmp('menuI').hide();
                                 Ext.getCmp('myCarroucel').hide();
                                 Ext.getCmp('myList').hide();
                                 Ext.getCmp('footer').hide();
                                 Ext.getCmp('barra5').hide();
                                 Ext.getCmp('favorites').hide();
                                 Ext.getCmp('help').hide();
                                 Ext.getCmp('search').hide();
                                 /*Ext.getCmp('myList').hide();
                                 Ext.getCmp('myList').hide();*/
                                 Ext.getCmp('back').show();
                                 Ext.getCmp('italbox').show();
                                 panel_menu.hide();
                                }
                            },
                            {
                                element: 'element',
                                delegate: '#menu-catalogos',
                                event: 'tap',
                                fn: function() {
                                    if (connect === 1) {
                                        Ext.getCmp('menuI').hide();
                                        Ext.getCmp('myCarroucel').hide();
                                        Ext.getCmp('italbox').hide();
                                        Ext.getCmp('footer').hide();
                                        Ext.getCmp('barra5').hide();
                                        Ext.getCmp('favorites').hide();
                                        Ext.getCmp('help').hide();
                                        Ext.getCmp('search').hide();
                                        /*Ext.getCmp('myList').hide();
                                        Ext.getCmp('myList').hide();*/
                                        Ext.getCmp('back').show();
                                        Ext.getCmp('myList').show();
                                        panel_menu.hide();
                                  }
                                    else{
                                        Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_catalogs'), Ext.emptyFn);
                                    }  
                                }
                            },
                             {
                                element: 'element',
                                delegate: '#menu-favoritos',
                                event: 'tap',
                                fn: function() {
                                   if (connect === 1) {
                                        //Ext.getStore('loja').sync();
                                        Ext.getCmp('menuI').hide();
                                        Ext.getCmp('myCarroucel').hide();
                                        Ext.getCmp('myList').hide();
                                        Ext.getCmp('footer').hide();
                                        Ext.getCmp('barra5').hide();
                                        Ext.getCmp('italbox').hide();
                                        Ext.getCmp('help').hide();
                                        Ext.getCmp('search').hide();
                                        /*Ext.getCmp('myList').hide();
                                        Ext.getCmp('myList').hide();*/
                                        Ext.getCmp('back').show();
                                        Ext.getCmp('favorites').show();
                                        panel_menu.hide();
                                    }
                                    else{
                                        Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_favorites'), Ext.emptyFn);
                                    }  
                                }
                            },
                            {
                            element: 'element',
                            delegate: '#menu-language',
                            event: 'tap',
                            fn: function() {
                            var panel_language = Ext.Viewport.add({ 
                            xtype: 'container',
                            id: 'menuL',
                            modal: true,
                            /*{
                                style: 'opacity: 0.8; background-color: #ffffff;'
                            */
                            height    : '230px',
                            width     : '100%',
                            floating  : true,                               
                            top       : '0px',
                            bottom : 'auto',
                            cls: 'menuL',
                            hideOnMaskTap: true,
                            showAnimation: 
                            {
                                type: 'slideIn',
                                duration: 1000,
                                delay: 1000,
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
                                    html  : '<li class="menu-portugues" id="menu-portugues"></span><span style="padding-left: 20px; font-size: 14px;">PORTUGUÊS</span><span class="icon-front" style="vertical-align: middle; float: right;padding:3px 20px 0px 0px;"></li>',
                                },
                                {
                                    html  : '<li class="menu-english" id="menu-english"><span style="padding-left: 20px; font-size: 14px;">ENGLISH</span><span class="icon-front" style="vertical-align: middle;float: right;padding:3px 20px 0px 0px;"></span></li>',
                                },
                                {
                                    html  : '<li class="menu-francais" id="menu-francais"></span><span style="padding-left: 20px; font-size: 14px;">FRANÇAIS</span><span class="icon-front" style="vertical-align: middle;float: right; padding:3px 20px 0px 0px;"></li>'
                                },
                                {
                                    html  : '<li class="menu-castellano" id="menu-castellano"></span><span style="padding-left: 20px; font-size: 14px;">CASTELLANO</span><span class="icon-front" style="vertical-align: middle;float: right;padding:3px 20px 0px 0px;"></li>'
                                }
                            ],
                            listeners: [
                                {
                            element: 'element',
                            delegate: '#menu-portugues',
                            event: 'tap',
                            fn: function() {
                                var valor = { id_setting: '1', lang: '1'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                            }
                        },
                        {
                            element: 'element',
                            delegate: '#menu-english',
                            event: 'tap',
                            fn: function() {
                                var valor = { id_setting: '1', lang: '2'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                            }
                            },
                            {
                               element: 'element',
                               delegate: '#menu-francais',
                               event: 'tap',
                               fn: function() {
                                  var valor = { id_setting: '1', lang: '3'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                               }
                           },
                           {
                               element: 'element',
                               delegate: '#menu-castellano',
                               event: 'tap',
                               fn: function() {
                                var valor = { id_setting: '1', lang: '4'};
                                Ext.getStore('Settings').getAt(0).set(valor);
                                Ext.getStore('Settings').sync();
                                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                                Ext.MessageBox.override({
                                        confirm: function(title, message, fn, scope) {
                                        return this.show({
                                            title       : title || null,
                                            message     : message || null,
                                            buttons     : [
                                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                                        ],
                                            promptConfig: false,
                                            scope       : scope,
                                            fn: function() {
                                                if (fn) {
                                                    fn.apply(scope, arguments);
                                                }
                                            }
                                        });
                                    }
                                });
                                panel_language.hide();
                                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
                               }
                           }
                            ]
                            });
                            //show the panel
                            panel_language.show();
                            panel_language.on('hide', function() {
                                panel_language.destroy();
            
                            });   
                            panel_menu.hide();        
                                   
                                    }
                                },
                                {
                                    element: 'element',
                                    delegate: '#menu-help',
                                    event: 'tap',
                                    fn: function() {
                                     Ext.getCmp('menuI').hide();
                                     Ext.getCmp('myCarroucel').hide();
                                     Ext.getCmp('myList').hide();
                                     Ext.getCmp('footer').hide();
                                     Ext.getCmp('barra5').hide();
                                     Ext.getCmp('italbox').hide();
                                     Ext.getCmp('favorites').hide();
                                     Ext.getCmp('search').hide();
                                     /*Ext.getCmp('myList').hide();
                                     Ext.getCmp('myList').hide();*/
                                     Ext.getCmp('back').show();
                                     Ext.getCmp('help').show();
                                     panel_menu.hide();
                                    }
                                }
                            ]
                        });
                        //show the panel
                        panel_menu.show();
                        panel_menu.on('hide', function() {
                            panel_menu.destroy();

                        });
                    
        }, 
        
                },
                {
                    align: 'right',
                    ui:      'plain',
                    xtype: 'button',
                    cls: 'open-menu2 icon-pesquisa',
                    handler: function () {
                       if (connect === 1) {
                            //Ext.getCmp('back').hide();
                            Ext.getCmp('menuI').hide();
                            Ext.getCmp('myList').hide();
                            Ext.getCmp('myCarroucel').hide();
                            Ext.getCmp('italbox').hide();
                            //Ext.getCmp('search').hide();
                            Ext.getCmp('help').hide();
                            Ext.getCmp('favorites').hide();
                            Ext.getCmp('barra2').hide();
                            Ext.getCmp('footer').hide();
                            Ext.getCmp('open-menu4').hide();
                            Ext.getCmp('barra5').hide();
                            //Ext.getCmp('barra').show();
                            Ext.getCmp('back').show();
                            Ext.getCmp('search').show();
                        }
                        else{
                            Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_search'), Ext.emptyFn);
                        }
                        
              /* Ext.Msg.confirm(
            "Update",
            "Update Catalog List?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    //window.location.reload();
                    window.location.href=window.location.href;
                }
            }
        );  */
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
                    cls: 'open-menu3 icon-baixo',
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
                    //textAlign: 'right !important',
                    cls: 'open-menu4',
                    id: 'open-menu4',
                    //align: 'bottom',
                    //hidden: true,
                    handler: function () {
                       
                       if (contador > 0) { 
                           
                        Ext.getCmp('footer').hide();
                        Ext.getCmp('barra5').hide();
                         if( typeof panel1 !== 'undefined' ) {
                                 panel1.destroy();
                        }
                        panel1 = Ext.Viewport.add({
                        xtype : 'container',
                        id: 'myList2',
                        cls: 'menu3',
                        top: 'auto !important',
                        modal: true,
                        /*{
                                style: 'opacity: 0.6; background-color: #ffffff;'
                        },*/
                         /*floating: true,*/
                         //modal: true,
                          hideOnMaskTap: true,
                        /*height: '150px',*/
                         /*hidden: true,*/
                        //docked: 'bottom',
                        
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
                //layout: {
                //   type:'vbox',
                //    align:'bottom',
                //    docked:'bottom'
                ////    height: '100px',
                ////    text: 'teste',
                ////    //text-align: 'center',
                //},
                items     : [
                     {
                        xtype: 'toolbar',
                        //title: '<div class="logotipo"></div>',
                        /*id: 'barra2',*/
                        cls: 'header4',
                        docked: 'top',
                        /*hidden: true,*/
                        layout: {
                                type: 'hbox',
                                pack: 'center'
                        },
                       
                        items: [
                            {
                           // align: 'right', 
                            ui:    'plain',
                            xtype: 'button',
                            cls: 'close-menu4',
                            text:  '<span style="text-align:center; padding-left: 25px; line-height: 2;">'+Ext.getStore('Languages').getById(idioma).get('product')+' '+contador+'</span><span style="text-align:right; float:right;"><i class="icon-baixo2"></i></span>',
                            //hidden: true,
                            handler: function () {
                             //   Ext.getCmp('pop-image').hide();
                                panel1.hide();
                                }
                            },
                        ]    
                    },
                   {   
                //give it an xtype of list for the list component
                   xtype: 'dataview',
                   height: '100px',
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
                       fields: ['descricao','estado','foto','id','id_catalogo','id_pagina','id_produto', 'lastModified','nome','pagina_id','priority','produto_id','ref'],
                       data: $.grep(tprodutos_paginas, function(e) { return e.pagina_id ==  idpagina })
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
                   itemTpl: '<img style="margin-right:10px;margin-top:10px; height:75px;" src="'+caminho2+'{foto}">',
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
                                /*height: '70%',*/
                                id: 'pop-image',
                                cls: 'pop-image',
                                /*modal: {
                                    style: 'opacity: 0; background-color: #ffffff;'
                                },*/
                                float: true,
                                // modal: true,
                                showAnimation: 
                                {
                                    type: 'pop',
                                    duration: 300,
                                    //direction: 'up',
                                    //easing: 'easeOut'
                                },  
                                //hideAnimation: 
                                //{
                                //    type: 'popOut',
                                //    duration: 300,
                                //    //direction: 'down',
                                //    //easing: 'easeIn'
                                //},
                                layout : {
                                    type : 'vbox',
                                     /*align: 'left'*/
                                    },
                                items: [
                                     {
            xtype: 'toolbar',
            //title: '<div class="logotipo"></div>',
            //id: 'barra5',
            cls: 'right_bar2',
            docked: 'right',
            //hidden: true,
            layout: {
                    type: 'vbox',
                    pack: 'center',
                    //align: 'middle'
            },
            //showAnimation:  
            //    {
            //        type: 'slideIn',
            //        duration: 1000,
            //        direction: 'left',
            //        easing: 'easeIn'
            //    },  
            //    hideAnimation: 
            //    {
            //        type: 'slideOut',
            //        duration: 1000,
            //        direction: 'right',
            //        easing: 'easeOut'
            //    }, 
            items: [
              {
                    /*align: 'middle',*/ 
                    ui:    'plain',
                    xtype: 'button',
                   /* text: 'teste',*/
                    cls: 'open-menu9 icon-star-catalogos-white',
                    handler: function () {
                       // alert('teste');
                       //var carr = Ext.getCmp('myCarroucel');
                       //var loja2 = Ext.getStore('Favorites2');
                       Ext.getStore('Favorites2').load();
                        //fields: ['id_produto','nome','descricao','foto','ref','id_catalogo','id_pagina', 'estado','lastModified'],
                       var newRecord2 = {nome: record.get('nome') ,descricao: record.get('descricao') , foto: caminho+record.get('foto'), thumb: caminho2+record.get('foto'), ref: record.get('ref'), id_catalogo: record.get('id_catalogo'),id_pagina: record.get('pagina_id')};
                       ////console.dir(newRecord);
                       Ext.getStore('Favorites2').add(newRecord2);
                       Ext.getStore('Favorites2').sync();
                       
                       
                        Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('add_product'), Ext.emptyFn);
                       /* Ext.Msg.show({
                            title: '',
                            message: 'Produto adicionado aos favoritos',
                            cls: 'myBox',
                            zIndex: '20 !important',
                            modal: true,
                            buttons: [
                            { text : 'Ok', ui : 'confirm' }
                            ],
                        });*/
                        
                        
                       //console.dir(msgb);
                       //Ext.Msg.alert('', 'Produto adicionado aos favoritos', Ext.emptyFn);
                       
                    }
                },
                  {
                    /*align: 'middle',*/ 
                    ui:    'plain',
                    xtype: 'button',
                   /* text: 'teste',*/
                    cls: 'open-menu8 icon-lista-white',
                    handler: function () {
                       
                    }
                },
                 {
                    /*align: 'middle',*/ 
                    ui:    'plain',
                    xtype: 'button',
                   /* text: 'teste',*/
                    cls: 'open-menu10 icon-partilha-white',
                    handler: function () {
                       
                    }
                },
        ]
        },
        
        
        {
            xtype: 'toolbar',
            //title: '<div class="logotipo"></div>',
            /*id: 'barra2',*/
            cls: 'header3',
            /*docked: 'top',*/
            /*hidden: true,*/
            layout: {
                    type: 'hbox',
                    pack: 'right'
            },
           
            items: [
                {
                align: 'right', 
                ui:    'plain',
                xtype: 'button',
                cls: 'close icon-close',
                //hidden: true,
                handler: function () {
                    Ext.getCmp('pop-image').hide();
                    /*panel2.destroy();*/
                    }
                },
            ]    
        },
        {
            html  : '<div class="pop-up"><img src="'+caminho+record.get('foto')+'"><br\>'+record.get('nome')+'<br/>Ref '+record.get('ref')+'<br/>'+record.get('descricao')+'</div>'
      
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
                            });
                        //show the panel
                        panel2.show();
                        panel2.on('hide', function() {
                           panel2.destroy();
                        });
                        },
                        //hide : function() {
                        //        Ext.getCmp('pop-image').destroy();
                        //}
                   },
                }
                           ],
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
                       panel1.show();
                       panel1.on('hide', function() {
                        //var lista = Ext.getCmp('myList');
                        if(Ext.getCmp('myList')._hidden === true)
                        {
                         Ext.getCmp('footer').show();
                         Ext.getCmp('barra5').show();
                        }
                         try
                         {
                            Ext.getCmp('pop-image').destroy();
                         }
                         catch(e){}
                         panel1.destroy();
                    });
                    } 
                    else{
                         Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('no_products'), Ext.emptyFn);
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
            xtype: 'toolbar',
            //title: '<div class="logotipo"></div>',
            id: 'barra5',
            cls: 'right_bar',
            docked: 'right',
            hidden: true,
            layout: {
                    type: 'vbox',
                    pack: 'center',
                    //align: 'middle'
            },
            showAnimation:  
                {
                    type: 'slideIn',
                    duration: 1000,
                    direction: 'left',
                    easing: 'easeIn'
                },  
                hideAnimation: 
                {
                    type: 'slideOut',
                    duration: 1000,
                    direction: 'right',
                    easing: 'easeOut'
                }, 
            items: [
              {
                    /*align: 'middle',*/ 
                    ui:    'plain',
                    xtype: 'button',
                   /* text: 'teste',*/
                    cls: 'open-menu5 icon-star-catalogos',
                    handler: function () {
                        if (Ext.getCmp('myCarroucel').getItems().length == 0) {
                             Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('no_pages'), Ext.emptyFn);
                        }
                        else{
                            //var carr = Ext.getCmp('myCarroucel');
                            //var loja = Ext.getStore('Favorites');
                            Ext.getStore('Favorites').load();
                            //alert(idpagina+' '+idcatalogo+' '+numero+' '+ source);
                            var newRecord = {imag: source ,nome: 'Catalogo '+idcatalogo+' Pagina '+numero , id_pagina: ''+idpagina+'', id_catalogo: idcatalogo,numero: numero};
                            //console.dir(newRecord);
                            Ext.getStore('Favorites').add(newRecord);
                            Ext.getStore('Favorites').sync();
                            Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('add_page'), Ext.emptyFn);
                       }
                    }
                },
                  {
                    /*align: 'middle',*/ 
                    ui:    'plain',
                    xtype: 'button',
                   /* text: 'teste',*/
                    cls: 'open-menu6 icon-lista',
                    handler: function () {
                       
                    }
                },
                 {
                    /*align: 'middle',*/ 
                    ui:    'plain',
                    xtype: 'button',
                   /* text: 'teste',*/
                    cls: 'open-menu7 icon-partilha',
                    handler: function () {
                        if (Ext.getCmp('myCarroucel').getItems().length == 0) {
                             Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('no_pages'), Ext.emptyFn);
                        }
                        else{
                            //window.plugins.socialsharing.share('Message only');
                            window.plugins.socialsharing.share('Catalogo '+idcatalogo+' Pagina '+numero+'', null, source, null);
                            //alert('Catalogo '+idcatalogo+' Pagina '+numero+' '+source);
                        }
                    }
                },
        ]
        },
        {
            xtype: 'my-viewport',
            hidden: true,
            id: 'myList',
            //hidden: true,
        },
         {
            xtype: 'my-viewport2',
            hidden: true,
            id: 'myCarroucel'
        },
         {
            xtype: 'my-viewport3',
            hidden: true,
            id: 'italbox',
            cls: 'about',
        },
         {
            xtype: 'my-viewport4',
            hidden: true,
            id: 'help',
            cls: 'help'
        },
        {
            xtype: 'my-viewport5',
            hidden: true,
            id: 'favorites'
        },
        {
            xtype: 'my-viewport6',
            hidden: true,
            id: 'search',
            cls: 'pesquisa',
        },
         {
            xtype: 'my-viewport7',
            //hidden: true,
            id: 'menuI',
            cls: 'menuI',
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
    appFolder: 'app',
    
    views : [
        'Ext.ux.ImageViewer'
    ],
  
    models : [
        'Setting',
        'Favorite',
        'Favorite2'
              
    ],
    stores : [
        'Settings',
        'Languages',
        'Favorites',
        'Favorites2',
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
        
        // Destroy the #appLoadingIndicator element
        Ext.fly('loading').destroy();
    
        Ext.Viewport.add({
            xtype: 'my-viewport-panel',
            cls: 'body_bg',
            id: 'painel'
        });
        
        Ext.Msg.setZIndex(20);
        
        /*var oneMoreHotel = { id: 1, lang: '1'};
        Ext.getStore('Settings').insert(1, oneMoreHotel);    // Use insert to add records or model instances at a given index.*/
        //Ext.getStore('Settings').removeAt(1);
        //var languageStore = Ext.getStore('Settings').getById(1).get('company');
        //var idioma = languageStore.getById(1);
        try{
            var existe = Ext.getStore('Settings').getAt(0).get('lang');
        }
        catch(e){}
        if (existe === undefined) {
              var valor = { id_setting: '1', lang: '1'};
              Ext.getStore('Settings').add(valor);
              Ext.getStore('Settings').sync();
              idioma = Ext.getStore('Settings').getAt(0).get('lang');
              Ext.MessageBox.override({
                    confirm: function(title, message, fn, scope) {
                    return this.show({
                        title       : title || null,
                        message     : message || null,
                        buttons     : [
                        {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                        {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                    ],
                        promptConfig: false,
                        scope       : scope,
                        fn: function() {
                            if (fn) {
                                fn.apply(scope, arguments);
                            }
                        }
                    });
                }
            });
             // console.dir(Ext.getCmp('barraTab'));
             // Ext.getCmp('barraTab').getAt(0).setTitle("emoh");
        }
        else{
            //var valor = { id_setting: '1', lang: '2'};
            //Ext.getStore('Settings').getAt(0).set(valor);
            //Ext.getStore('Settings').sync();
            //alert('Existe!');
            //console.dir(Ext.getCmp('menuI'));
            idioma = Ext.getStore('Settings').getAt(0).get('lang');
            Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
            Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
            Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
            Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
            //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
            Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
            Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
            Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
            Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
            Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
            Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
            Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
            Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
            Ext.MessageBox.override({
                    confirm: function(title, message, fn, scope) {
                    return this.show({
                        title       : title || null,
                        message     : message || null,
                        buttons     : [
                        {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                        {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                    ],
                        promptConfig: false,
                        scope       : scope,
                        fn: function() {
                            if (fn) {
                                fn.apply(scope, arguments);
                            }
                        }
                    });
                }
            });
            //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
            //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
        }
        //console.dir(Ext.getStore('Settings').getAt(0).get('lang'));
        
     _IS_RIPPLE_EMULATOR = $('#tinyhippos-injected').length > 0;    
        
    function onLoad() {
        try{
        if(_IS_RIPPLE_EMULATOR) {cordova.addDocumentEventHandler('backbutton'); cordova.addDocumentEventHandler('menubutton');}
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("deviceready", onDeviceReady, false);
         if(device.platform == "Android"){
                document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);
                document.addEventListener("menubutton", Ext.bind(onMenuKeyDown, this), false);
         }
         if(navigator.network.connection.type == Connection.NONE) {
		 Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('offline'), Ext.emptyFn);
                 connect = 0;
               //Ext.Msg.alert("", "A trabalhar em modo offline!",  function ( answer ) { 
               //     if ( answer == 'ok') { 
               //         navigator.app.exitApp();
               //     } else { 
               //    
               //     } 
               // }); 
	} else {
		//setupButtonHandler();
                //Ext.Msg.alert('', 'A trabalhar em modo online ', Ext.emptyFn);
                connect = 1;
	}
        }
         catch(e){}
    }
 
    // Cordova is loaded and it is now safe to make calls Cordova methods
    //
    function onDeviceReady() {
        console.log("onDeviceReady");
    }
 
    // Handle the online event
    //
    function onOnline() {
        //Ext.Msg.alert('', 'A trabalhar em modo online ', Ext.emptyFn);
        connect = 1;
    }
 
    function onOffline() {
        connect = 0;
        try {
                Ext.getCmp('menuP').hide();
            }
        catch(err) {}
        //var carr = Ext.getCmp('myCarroucel');
        //var italbox = Ext.getCmp('italbox');
        //var favorites = Ext.getCmp('favorites');
        //var help = Ext.getCmp('help');
        //var search = Ext.getCmp('search');
        //var menuI = Ext.getCmp('menuI');
        
        if (Ext.getCmp('menuI')._hidden === false || Ext.getCmp('italbox')._hidden === false || Ext.getCmp('help')._hidden === false ) {
            Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('offline'), Ext.emptyFn);
        }
        else{
            Ext.Msg.alert(
                "",
                Ext.getStore('Languages').getById(idioma).get('offline_error'),
            function(buttonId) {
                  if (buttonId === 'ok') {
                  //var lista = Ext.getCmp('myList');
                //console.dir(lista);
            
            Ext.getCmp('myCarroucel').hide();
            Ext.getCmp('myCarroucel').on('hide', function() {
            Ext.getCmp('myCarroucel').removeAll(true,true);
            });
            //carr.removeAll(true,true);
            Ext.getCmp('barra2').hide();
            Ext.getCmp('footer').hide();
            Ext.getCmp('barra5').hide();
            try {
               //var myList2 =  Ext.getCmp('myList2');
               Ext.getCmp('myList2').hide();
               Ext.getCmp('myList').hide();
               Ext.getCmp('pop-produto').hide();
            }
            catch(err) {}
            Ext.getCmp('italbox').hide();
            Ext.getCmp('favorites').hide();
            Ext.getCmp('help').hide();
            Ext.getCmp('search').hide();
            Ext.getCmp('myList').hide();
            Ext.getCmp('back').hide();
            Ext.getCmp('barra').show();
            Ext.getCmp('menuI').show();                 
                                                
            }});
        } 
    }
    
    function onBackKeyDown(eve) {
            eve.preventDefault();
            //var lista = Ext.getCmp('myList');
            //console.dir(lista);
            try {
                Ext.getCmp('menuP').hide();
            }
            catch(err) {}
            //var carr = Ext.getCmp('myCarroucel');
            //var italbox = Ext.getCmp('italbox');
            //var favorites = Ext.getCmp('favorites');
            //var help = Ext.getCmp('help');
            //var search = Ext.getCmp('search');
            //var menuI = Ext.getCmp('menuI');
            
            if(Ext.getCmp('myList')._hidden === false || Ext.getCmp('italbox')._hidden === false || Ext.getCmp('favorites')._hidden === false || Ext.getCmp('help')._hidden === false || Ext.getCmp('search')._hidden === false )
            {
                Ext.getCmp('myCarroucel').hide();
                Ext.getCmp('myCarroucel').on('hide', function() {
                Ext.getCmp('myCarroucel').removeAll(true,true);
                });
                //carr.removeAll(true,true);
                Ext.getCmp('barra2').hide();
                Ext.getCmp('footer').hide();
                Ext.getCmp('barra5').hide();
                try {
                    //var myList2 =  Ext.getCmp('myList2');
                    Ext.getCmp('myList2').hide();
                    Ext.getCmp('myList').hide();
                    Ext.getCmp('pop-produto').hide();
                }
                catch(err) {}
                Ext.getCmp('italbox').hide();
                Ext.getCmp('favorites').hide();
                Ext.getCmp('help').hide();
                Ext.getCmp('search').hide();
                Ext.getCmp('myList').hide();
                Ext.getCmp('back').hide();
                Ext.getCmp('barra').show();
                Ext.getCmp('menuI').show();
            }
            /*else if (menuI._hidden === false) {
               Ext.Msg.confirm("", "Deseja Sair da Aplicação?",  function ( answer ) { 
                    if ( answer == 'yes') { 
                        navigator.app.exitApp();
                    } else { 
                   
                    } 
                });
            }*/
            else if (Ext.getCmp('myCarroucel')._hidden === false) 
            {
                Ext.getCmp('myCarroucel').hide();
                Ext.getCmp('myCarroucel').on('hide', function() {
                     Ext.getCmp('myCarroucel').removeAll(true,true);
                });
                //carr.removeAll(true,true);
                Ext.getCmp('barra2').hide();
                Ext.getCmp('footer').hide();
                Ext.getCmp('barra5').hide();
                try {
                    //var myList2 =  Ext.getCmp('myList2');
                    Ext.getCmp('myList2').hide();
                    Ext.getCmp('myList').hide(); 
                }
                catch(err) {}
                //Ext.getCmp('back').hide();
                Ext.getCmp('italbox').hide();
                Ext.getCmp('favorites').hide();
                Ext.getCmp('help').hide();
                Ext.getCmp('search').hide();
                Ext.getCmp('barra').show();
                Ext.getCmp('myList').show();
            }
            else
	    {
            Ext.Msg.confirm("", Ext.getStore('Languages').getById(idioma).get('exit'),  function ( answer ) { 
                    if ( answer == 'yes') { 
                        navigator.app.exitApp();
                    } else { 
                   
                    } 
                });
	    }
            
        }
    function onMenuKeyDown(eve) {
            eve.preventDefault();
            var panel_menu = Ext.Viewport.add({ 
            xtype: 'container',
            id: 'menuP',
            modal: true,
            /*{
                style: 'opacity: 0.8; background-color: #ffffff;'
            */
            height    : 100,
            width     : 240,
            floating  : true,                               
            top       : -160,
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
                    html  : '<li class="menu-italbox" id="menu-italbox"><span class="icon-italbox" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('italbox')+'</span></li>',
                },
                {
                    html  : '<li class="menu-catalogos" id="menu-catalogos"><span class="icon-catalogos" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('catalogs')+'</span></li>',
                },
                {
                    html  : '<li class="menu-favoritos" id="menu-favoritos"><span class="icon-star" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('favorites')+'</span></li>'
                },
                {
                    html  : '<li class="menu-language" id="menu-language"><span class="icon-mundo-catalogos" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('language')+'</span></li>'
                },
                {
                    html  : '<li class="menu-ajuda" id="menu-help"><span class="icon-ajuda" style="vertical-align: middle;"></span><span style="padding-left: 20px; font-size: 13px;">'+Ext.getStore('Languages').getById(idioma).get('help')+'</span></li>'
                }
            ],
            listeners: [
            {
                element: 'element',
                delegate: '#menu-italbox',
                event: 'tap',
                fn: function() {
                 Ext.getCmp('menuI').hide();
                 Ext.getCmp('myCarroucel').hide();
                 Ext.getCmp('myList').hide();
                 Ext.getCmp('footer').hide();
                 Ext.getCmp('barra5').hide();
                 Ext.getCmp('favorites').hide();
                 Ext.getCmp('help').hide();
                 Ext.getCmp('search').hide();
                 /*Ext.getCmp('myList').hide();
                 Ext.getCmp('myList').hide();*/
                 Ext.getCmp('back').show();
                 Ext.getCmp('italbox').show();
                 panel_menu.hide();
                }
            },
            {
                element: 'element',
                delegate: '#menu-catalogos',
                event: 'tap',
                fn: function() {
                    if (connect === 1) {
                        Ext.getCmp('menuI').hide();
                        Ext.getCmp('myCarroucel').hide();
                        Ext.getCmp('italbox').hide();
                        Ext.getCmp('footer').hide();
                        Ext.getCmp('barra5').hide();
                        Ext.getCmp('favorites').hide();
                        Ext.getCmp('help').hide();
                        Ext.getCmp('search').hide();
                        /*Ext.getCmp('myList').hide();
                        Ext.getCmp('myList').hide();*/
                        Ext.getCmp('back').show();
                        Ext.getCmp('myList').show();
                        panel_menu.hide();
                  }
                    else{
                        Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_catalogs'), Ext.emptyFn);
                    }  
                }
            },
             {
                element: 'element',
                delegate: '#menu-favoritos',
                event: 'tap',
                fn: function() {
                   if (connect === 1) {
                        //Ext.getStore('loja').sync();
                        Ext.getCmp('menuI').hide();
                        Ext.getCmp('myCarroucel').hide();
                        Ext.getCmp('myList').hide();
                        Ext.getCmp('footer').hide();
                        Ext.getCmp('barra5').hide();
                        Ext.getCmp('italbox').hide();
                        Ext.getCmp('help').hide();
                        Ext.getCmp('search').hide();
                        /*Ext.getCmp('myList').hide();
                        Ext.getCmp('myList').hide();*/
                        Ext.getCmp('back').show();
                        Ext.getCmp('favorites').show();
                        panel_menu.hide();
                    }
                    else{
                        Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_favorites'), Ext.emptyFn);
                    }  
                }
            },
            {
            element: 'element',
            delegate: '#menu-language',
            event: 'tap',
            fn: function() {
            var panel_language = Ext.Viewport.add({ 
            xtype: 'container',
            id: 'menuL',
            modal: true,
            /*{
                style: 'opacity: 0.8; background-color: #ffffff;'
            */
            height    : '230px',
            width     : '100%',
            floating  : true,                               
            top       : '0px',
            bottom : 'auto',
            cls: 'menuL',
            hideOnMaskTap: true,
            showAnimation: 
            {
                type: 'slideIn',
                duration: 1000,
                delay: 1000,
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
                    html  : '<li class="menu-portugues" id="menu-portugues"></span><span style="padding-left: 20px; font-size: 14px;">PORTUGUÊS</span><span class="icon-front" style="vertical-align: middle; float: right;padding:3px 20px 0px 0px;"></li>',
                },
                {
                    html  : '<li class="menu-english" id="menu-english"><span style="padding-left: 20px; font-size: 14px;">ENGLISH</span><span class="icon-front" style="vertical-align: middle;float: right;padding:3px 20px 0px 0px;"></span></li>',
                },
                {
                    html  : '<li class="menu-francais" id="menu-francais"></span><span style="padding-left: 20px; font-size: 14px;">FRANÇAIS</span><span class="icon-front" style="vertical-align: middle;float: right; padding:3px 20px 0px 0px;"></li>'
                },
                {
                    html  : '<li class="menu-castellano" id="menu-castellano"></span><span style="padding-left: 20px; font-size: 14px;">CASTELLANO</span><span class="icon-front" style="vertical-align: middle;float: right;padding:3px 20px 0px 0px;"></li>'
                }
            ],
            listeners: [
                {
            element: 'element',
            delegate: '#menu-portugues',
            event: 'tap',
            fn: function() {
                var valor = { id_setting: '1', lang: '1'};
                Ext.getStore('Settings').getAt(0).set(valor);
                Ext.getStore('Settings').sync();
                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                Ext.MessageBox.override({
                        confirm: function(title, message, fn, scope) {
                        return this.show({
                            title       : title || null,
                            message     : message || null,
                            buttons     : [
                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                        ],
                            promptConfig: false,
                            scope       : scope,
                            fn: function() {
                                if (fn) {
                                    fn.apply(scope, arguments);
                                }
                            }
                        });
                    }
                });
                panel_language.hide();
                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
            }
        },
        {
            element: 'element',
            delegate: '#menu-english',
            event: 'tap',
            fn: function() {
                var valor = { id_setting: '1', lang: '2'};
                Ext.getStore('Settings').getAt(0).set(valor);
                Ext.getStore('Settings').sync();
                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                Ext.MessageBox.override({
                        confirm: function(title, message, fn, scope) {
                        return this.show({
                            title       : title || null,
                            message     : message || null,
                            buttons     : [
                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                        ],
                            promptConfig: false,
                            scope       : scope,
                            fn: function() {
                                if (fn) {
                                    fn.apply(scope, arguments);
                                }
                            }
                        });
                    }
                });
                panel_language.hide();
                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
            }
            },
            {
               element: 'element',
               delegate: '#menu-francais',
               event: 'tap',
               fn: function() {
                  var valor = { id_setting: '1', lang: '3'};
                Ext.getStore('Settings').getAt(0).set(valor);
                Ext.getStore('Settings').sync();
                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                Ext.MessageBox.override({
                        confirm: function(title, message, fn, scope) {
                        return this.show({
                            title       : title || null,
                            message     : message || null,
                            buttons     : [
                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                        ],
                            promptConfig: false,
                            scope       : scope,
                            fn: function() {
                                if (fn) {
                                    fn.apply(scope, arguments);
                                }
                            }
                        });
                    }
                });
                panel_language.hide();
                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
               }
           },
           {
               element: 'element',
               delegate: '#menu-castellano',
               event: 'tap',
               fn: function() {
                var valor = { id_setting: '1', lang: '4'};
                Ext.getStore('Settings').getAt(0).set(valor);
                Ext.getStore('Settings').sync();
                idioma = Ext.getStore('Settings').getAt(0).get('lang');
                Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
                Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
                Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
                Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
                //Ext.getCmp('start-help2').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help2'));
                Ext.getCmp('italboxHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('company_html'));
                Ext.getCmp('helpHtml').setHtml(Ext.getStore('Languages').getById(idioma).get('help_html'));
                Ext.getCmp('barraTab').getAt(0).setTitle(Ext.getStore('Languages').getById(idioma).get('pages'));
                Ext.getCmp('barraTab').getAt(1).setTitle(Ext.getStore('Languages').getById(idioma).get('products'));
                Ext.getCmp('data_paginas').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('data_produtos').setEmptyText(Ext.getStore('Languages').getById(idioma).get('favorites_empty'));
                Ext.getCmp('search').setEmptyText(Ext.getStore('Languages').getById(idioma).get('products_empty'));
                Ext.getCmp('searchBox').setPlaceHolder(Ext.getStore('Languages').getById(idioma).get('search'));
                Ext.MessageBox.override({
                        confirm: function(title, message, fn, scope) {
                        return this.show({
                            title       : title || null,
                            message     : message || null,
                            buttons     : [
                            {text: Ext.getStore('Languages').getById(idioma).get('no'),  itemId: 'no'},
                            {text: Ext.getStore('Languages').getById(idioma).get('yes'), itemId: 'yes', ui: 'action'}
                        ],
                            promptConfig: false,
                            scope       : scope,
                            fn: function() {
                                if (fn) {
                                    fn.apply(scope, arguments);
                                }
                            }
                        });
                    }
                });
                panel_language.hide();
                //Ext.getCmp('search').setItemTpl(Ext.getStore('Languages').getById(idioma).get('search_list'));
                //Ext.getCmp('open-menu4').setText(Ext.getStore('Languages').getById(idioma).get('product'));
               }
           }
            ]
            });
            //show the panel
            panel_language.show();
            panel_language.on('hide', function() {
                panel_language.destroy();

            });   
            panel_menu.hide();        
                   
                    }
                },
                {
                    element: 'element',
                    delegate: '#menu-help',
                    event: 'tap',
                    fn: function() {
                     Ext.getCmp('menuI').hide();
                     Ext.getCmp('myCarroucel').hide();
                     Ext.getCmp('myList').hide();
                     Ext.getCmp('footer').hide();
                     Ext.getCmp('barra5').hide();
                     Ext.getCmp('italbox').hide();
                     Ext.getCmp('favorites').hide();
                     Ext.getCmp('search').hide();
                     /*Ext.getCmp('myList').hide();
                     Ext.getCmp('myList').hide();*/
                     Ext.getCmp('back').show();
                     Ext.getCmp('help').show();
                     panel_menu.hide();
                    }
                }
            ]
        });
        //show the panel
        panel_menu.show();
        panel_menu.on('hide', function() {
            panel_menu.destroy();

        });
    }
    
    onLoad();
    
        //if (Ext.os.is('Android')) {
     /*   document.addEventListener("deviceready", onDeviceReady, false);
          // Call onDeviceReady when PhoneGap is loaded.
  
    
        
        function onDeviceReady() {
            if(device.platform == "Android"){
                document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);
            }
         document.addEventListener("online", onOnline, false);
         document.addEventListener("offline", onOffline, false);
        }
        
        function onOnline() {
            Ext.Msg.alert('', 'A trabalhar em modo online ', Ext.emptyFn);
        }
        
        function onOffline() {
             Ext.Msg.alert('', 'A trabalhar em modo offline ', Ext.emptyFn);
            
        }
        
        //document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);  // add back button listener

        function onBackKeyDown(eve) {
            eve.preventDefault();
                Ext.Msg.confirm("", "Deseja Sair da Aplicação?",  function ( answer ) { 
                    if ( answer == 'yes') { 
                        navigator.app.exitApp();
                    } else { 
                   
                    } 
                });
        }*/
        //}
        
        //if (connect = 1) {
        //    Ext.Msg.alert('', 'A trabalhar em modo online ', Ext.emptyFn);
        //}
        //else{
        //     Ext.Msg.alert('', 'A trabalhar em modo offline ', Ext.emptyFn);
        //}
    }
});
});
};
