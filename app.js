window.dao =  {
    syncURL:  "http://www.critecns.com/italbox/connect.php?table=catalogos",
    syncURL2: "http://www.critecns.com/italbox/connect.php?table=paginas",
    syncURL3: "http://www.critecns.com/italbox/connect.php?table=produtos",
    syncURL4: "http://www.critecns.com/italbox/connect.php?table=produtos_paginas",
    syncURL5: "http://www.critecns.com/italbox/connect.php?table=extras",
    syncURL6: "http://www.critecns.com/italbox/connect.php?table=extras_produtos",
    //syncURL:  "../../italbox/connect.php?table=catalogos",
    //syncURL2: "../../italbox/connect.php?table=paginas",
    //syncURL3: "../../italbox/connect.php?table=produtos",
    //syncURL4: "../../italbox/connect.php?table=produtos_paginas",
    //syncURL5: "../../italbox/connect.php?table=extras",
    //syncURL6: "../../italbox/connect.php?table=extras_produtos",
    
    initialize: function(callback) {
        var self = this;
        this.db = window.openDatabase("italboxdb", "1.0", "Italbox DB", 3000000);

        this.db.transaction(
            function(tx) {
                tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='catalogos' OR name='paginas' OR name='produtos' OR name='produtos_paginas' OR name='extras' OR name='extras_produtos'", this.txErrorHandler,
                    function(tx, results) {
                        if (results.rows.length == 6) {
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
                            self.createTable6(callback);
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
                    "descricao_1 VARCHAR(50), " +
                    "descricao_2 VARCHAR(50), " +
                    "descricao_3 VARCHAR(50), " +
                    "descricao_4 VARCHAR(50), " +
                    "foto VARCHAR(50), " +
                    "ref VARCHAR(50), " +
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
    
    createTable5: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS extras ( " +
                    "id_extra INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "nome VARCHAR(50), " +
                    "descricao_1 VARCHAR(50), " +
                    "descricao_2 VARCHAR(50), " +
                    "descricao_3 VARCHAR(50), " +
                    "descricao_4 VARCHAR(50), " +
                    "foto VARCHAR(50), " +
                    "ref VARCHAR(50), " +
                    "estado VARCHAR(50), " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table Extras successfully CREATED in local SQLite database');
                callback();
            }
        );
    },
    
    createTable6: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS extras_produtos ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "extra_id VARCHAR(50), " +
                    "produto_id VARCHAR(50), " +
                    "priority VARCHAR(50), " +
                    "lastModified VARCHAR(50))";
                tx.executeSql(sql);
            },
            this.txErrorHandler,
            function() {
                log('Table Extras_Produtos successfully CREATED in local SQLite database');
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
    
    findAll5: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM EXTRAS WHERE ESTADO=1";
                log('Local SQLite database: "SELECT * FROM EXTRAS"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            extras = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            extras[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(extras);
                    }
                );
            }
        );
    },
    
    findAll6: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM EXTRAS_PRODUTOS EP INNER JOIN EXTRAS E ON E.id_extra=EP.extra_id ORDER BY CAST(PRIORITY AS INT);";
                log('Local SQLite database: "SELECT * FROM EXTRAS_PRODUTOS"');
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                        var len = results.rows.length,
                            extras_produtos = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            extras_produtos[i] = results.rows.item(i);
                        }
                        log(len + ' rows found');
                        callback(extras_produtos);
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
    
    getLastSync5: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM extras";
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
    
    getLastSync6: function(callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT MAX(lastModified) as lastSync FROM extras_produtos";
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
    
     sync6: function(callback) {
        var self = this;
        log('Starting synchronization...');
        this.getLastSync6(function(lastSync){
            self.getChanges6(self.syncURL6, lastSync,
                function (changes) {
                    if (changes.length > 0) {
                        self.applyChanges6(changes, callback);
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
                callback(data);
            },
            error: function(model, response) {
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
                callback(data);
            },
            error: function(model, response) {
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
                callback(data);
            },
            error: function(model, response) {
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
                callback(data);
            },
            error: function(model, response) {
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
                callback(data);
            },
            error: function(model, response) {
            }
        });

    },
    
    getChanges6: function(syncURL6, modifiedSince, callback) {

        $.ajax({
            url: syncURL6,
            data: {modifiedSince: modifiedSince},
            dataType:"json",
            success:function (data) {
                log("The server returned " + data.length + " changes that occurred after " + modifiedSince);
                callback(data);
            },
            error: function(model, response) {
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
                    "INSERT OR REPLACE INTO produtos (id_produto, nome, descricao_1 ,descricao_2 , descricao_3 , descricao_4, foto, ref, estado, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = produtos[i];
                    log(e.id_produto + ' ' + e.nome + ' ' + e.descricao_1 + ' ' + e.descricao_2 + ' ' + e.descricao_3 + ' ' + e.descricao_4 + ' ' + e.foto + ' ' + e.ref + ' ' + e.estado + ' ' + e.lastModified);
                    var params = [e.id_produto, e.nome, e.descricao_1 ,e.descricao_2 ,e.descricao_3 ,e.descricao_4 , e.foto, e.ref, e.estado, e.lastModified];
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
    
    applyChanges4: function(produtos_paginas, callback) {
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
    
    applyChanges5: function(extras, callback) {
        this.db.transaction(
            function(tx) {
                var l = extras.length;
                var sql =
                    "INSERT OR REPLACE INTO extras (id_extra, nome, descricao_1, descricao_2, descricao_3, descricao_4, foto, ref, estado, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = extras[i];
                    log(e.id_extra + ' ' + e.nome + ' ' + e.descricao_1 + ' ' + e.descricao_2 + ' ' + e.descricao_3 + ' ' + e.descricao_4 + ' ' + e.foto + ' ' + e.ref + ' ' + e.estado + ' ' + e.lastModified);
                    var params = [e.id_extra, e.nome, e.descricao_1, e.descricao_2, e.descricao_3, e.descricao_4, e.foto, e.ref, e.estado, e.lastModified];
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
    
    applyChanges6: function(extras_produtos, callback) {
        this.db.transaction(
            function(tx) {
                var l = extras_produtos.length;
                var sql =
                    "INSERT OR REPLACE INTO extras_produtos (id, extra_id, produto_id, priority, lastModified) " +
                    "VALUES (?, ?, ?, ?, ?)";
                log('Inserting or Updating in local database:');
                var e;
                for (var i = 0; i < l; i++) {
                    e = extras_produtos[i];
                    log(e.id + ' ' + e.extra_id + ' ' + e.produto_id + ' ' + e.priority + ' '  + e.lastModified);
                    var params = [e.id, e.extra_id, e.produto_id, e.priority, e.lastModified];
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
    setTimeout('runApp3()',6000);
    setTimeout('runApp4()',8000);
    setTimeout('runApp5()',10000);
    setTimeout('runApp6()',12000);
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
dao.sync6(renderList6);
};

function runApp3() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync2(renderList2)).then(dao.sync3(renderList3)).then(dao.sync4(renderList4)).then(dao.sync5(renderList5)).then(dao.sync6(renderList6));
};

function runApp4() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync2(renderList2)).then(dao.sync3(renderList3)).then(dao.sync4(renderList4)).then(dao.sync5(renderList5)).then(dao.sync6(renderList6));
};

function runApp5() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync2(renderList2)).then(dao.sync3(renderList3)).then(dao.sync4(renderList4)).then(dao.sync5(renderList5)).then(dao.sync6(renderList6));
};

function runApp6() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(dao.sync2(renderList2)).then(dao.sync3(renderList3)).then(dao.sync4(renderList4)).then(dao.sync5(renderList5)).then(dao.sync6(renderList6)).then(sencha());
};

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

function renderList4(produtos_paginas) {
    log('Rendering list using local SQLite data...');
    dao.findAll4(function(produtos_paginas) {
        $('#list').empty();
        var l = produtos_paginas.length;
        for (var i = 0; i < l; i++) {
            var produtos_pagina = produtos_paginas[i];
        }
    });
};

function renderList5(extras) {
    log('Rendering list using local SQLite data...');
    dao.findAll5(function(extras) {
        $('#list').empty();
        var l = extras.length;
        for (var i = 0; i < l; i++) {
            var extra = extras[i];
        }
    });
};

function renderList6(extras_produtos) {
    log('Rendering list using local SQLite data...');
    dao.findAll6(function(extras_produtos) {
        $('#list').empty();
        var l = extras_produtos.length;
        for (var i = 0; i < l; i++) {
            var extras_produto = extras_produtos[i];
        }
    });
};

function log(msg) {
    //$('#log').val($('#log').val() + msg + '\n');
};

function renderTables(callback) {
    log('Rendering list using local SQLite data...');
    var tcatalogos = [];
    var tpaginas = [];
    var tpaginas2 = [];
    var tprodutos = [];
    var tprodutos_paginas = [];
    var textras_produtos = [];
    var caminho = 'http://www.critecns.com/italbox/assets/uploads/imgs/';
    var caminho2 = 'http://www.critecns.com/italbox/assets/uploads/imgs/thumb/';

    dao.findAll(function(catalogos) {
         tcatalogos = catalogos;
    });
      
    dao.findAll2(function(paginas) {
        var l = paginas.length;
        for (var i = 0; i < l; i++) {
            var pagina = paginas[i];
            var listaPaginas = {
                   xtype: 'imageviewer',
                   imageSrc: caminho+pagina.foto,
                   numero: pagina.numero,
                   id_pagina: pagina.id_pagina,
                   id_catalogo: pagina.id_catalogo,
                   thumb: caminho2+pagina.foto,
                   share: caminho+pagina.foto,
              };
              var listaPaginas2 = {
                   xtype: 'imageviewer',
                   imageSrc: caminho+pagina.foto2,
                   numero: pagina.numero,
                   id_pagina: pagina.id_pagina,
                   id_catalogo: pagina.id_catalogo,
                   thumb: caminho2+pagina.foto,
                   share: caminho+pagina.foto,
              };
               var listaPaginas3 = {
                   xtype: 'imageviewer',
                   imageSrc: caminho+pagina.foto3,
                   numero: pagina.numero,
                   id_pagina: pagina.id_pagina,
                   id_catalogo: pagina.id_catalogo,
                   thumb: caminho2+pagina.foto,
                   share: caminho+pagina.foto,
              };
              tpaginas.push(listaPaginas);
              tpaginas2.push(listaPaginas2);
              if (pagina.capa != 1) {
                tpaginas2.push(listaPaginas3); 
              }
         }
    });
    
    dao.findAll3(function(produtos) {
         tprodutos = produtos;
    });
    
    dao.findAll4(function(produtos_paginas) {
         tprodutos_paginas = produtos_paginas;
    });
    
    dao.findAll6(function(extras_produtos) {
         textras_produtos = extras_produtos;
         callback(tcatalogos,tpaginas,tpaginas2,tprodutos,tprodutos_paginas,textras_produtos);
    });
};

function sencha(){
renderTables(function(tcatalogos,tpaginas,tpaginas2,tprodutos,tprodutos_paginas,textras_produtos){
var connect = 1;
var idcatalogo = 0;
var idpagina = 0;
var numero = 0;
var thumb = '';
var share = '';
var nomec = '';
var ind = 0;
var contador = 0;
var idioma = 0;
var caminho = 'http://www.critecns.com/italbox/assets/uploads/imgs/';
var caminho2 = 'http://www.critecns.com/italbox/assets/uploads/imgs/thumb/';

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
    items: [
        {
        flex:1, 
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
        },
        {
            id: 'start-catalogos',
            flex: 1,
            style: 'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        },   
        ]
    },
    {
        flex:1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            id: 'start-favoritos',
            flex: 1,
            style: 'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        
        }, {
            id: 'start-language',
            flex: 1,
            style: 'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        },
        ]
    },
    {
        flex:1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
      items: [
        {
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
        var panel_language = Ext.Viewport.add({ 
            xtype: 'container',
            id: 'menuL',
            modal: true,
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
            items: [
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
                    }
                }
            ]
        });
        panel_language.show();
        panel_language.on('hide', function() {
            panel_language.destroy();
        });
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
        store: {id: 'produtos',
                fields: ['id_produto', 'nome', 'descricao_1','descricao_2','descricao_3','descricao_4', 'foto', 'ref', 'estado', 'lastModified'],
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
                             Ext.getStore('produtos').clearFilter();
                        },
                    }
                },
                ],
            }
        ],
        listeners: {
            itemtap: function(list, index, target, record) {
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
                                id: 'pop-produto',
                                cls: 'pop-produto',
                                float: true,
                                showAnimation: 
                                {
                                    type: 'pop',
                                    duration: 300,
                                },  
                                layout : {
                                    type : 'vbox',
                                },
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        cls: 'header3',
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
                                            handler: function () {
                                                 panel_produto.hide();
                                                }
                                            },
                                        ]    
                                    },
                                    {
                                        html  : '<div class="pop-up">'+
                                        '<img src="'+caminho+record.get('foto')+'">'+
                                        '<br/><div class="btn-extras" id="btn-extras">EXTRAS</div>'+record.get('nome')+'<br/>'+
                                        'Ref '+record.get('ref')+'<br/>'+record.get('descricao_'+idioma)+'</div>'
                                    },
                                ],
                                listeners: [
                                    {
                                        element: 'element',
                                        delegate: '#btn-extras',
                                        event: 'tap',
                                        fn: function() {
                                         panel_extras = Ext.Viewport.add({
                                            xtype : 'tabpanel',
                                            id:'extras',
                                            cls: 'lista-extras',
                                            float: true,
                                            tabBar:    {
                                                cls: 'barraTab2',
                                                hidden: true,
                                            },
                                            items: [
                                            {
                                                xtype: 'toolbar',
                                                docked: 'top',
                                                cls: 'barraPaginas',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        ui: 'plain',
                                                        cls: 'back icon-back',
                                                        handler: function () {
                                                            panel_extras.hide();
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                title: '',
                                                layout : 'fit',
                                                cls: 'tabPaginas',
                                                items: [
                                                {
                                                    xtype: 'dataview',
                                                    cls: 'favoritos',
                                                    flex: 1,
                                                    scrollable: {
                                                        direction: 'vertical',
                                                    },
                                                    inline: {
                                                        wrap: true
                                                    },
                                                     store: 
                                                     {
                                                        fields: ['descricao_1','descricao_2','descricao_3','descricao_4','estado','extra_id','foto','id','id_extra','lastModified','nome','priority','produto_id','ref'],
                                                        data: $.grep(textras_produtos, function(e) { return e.produto_id ==  record.get('id_produto')})
                                                     },
                                                    
                                                    itemTpl: '<img src="'+caminho2+'{foto}" style="width:130px; margin:10px 10px 0 10px;"></img><div style="text-align: center; font-size:10px;">{nome}</div>',
                                                    
                                                    listeners: {
                                                        itemtap: function(list, index, target, record,e) {
                                                            panel_extra = Ext.Viewport.add({ 
                                                                xtype: 'container',
                                                                id: 'extra',
                                                                cls: 'pop-produto',
                                                                float: true,
                                                                showAnimation: 
                                                                {
                                                                    type: 'pop',
                                                                    duration: 300,
                                                                },  
                                                                layout : {
                                                                    type : 'vbox',
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'toolbar',
                                                                        cls: 'header3',
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
                                                                            handler: function () {
                                                                                 panel_extra.hide();
                                                                                }
                                                                            },
                                                                        ]    
                                                                    },
                                                                    {
                                                                        html  : '<div class="pop-up">'+
                                                                        '<img src="'+caminho+record.get('foto')+'">'+
                                                                        '<br\>'+record.get('nome')+'<br/>'+
                                                                        'Ref '+record.get('ref')+'<br/>'+record.get('descricao_'+idioma)+'</div>'
                                                                    },
                                                                ],
                                                               
                                                            });
                                                        panel_extra.show();
                                                        panel_extra.on('hide', function() {
                                                           panel_extra.destroy();
                                                        });
                                                            
                                                        }
                                                    }
                                                }
                                                ], 
                                            }, 
                                            ],       
                                            });
                                            panel_extras.show();
                                            panel_extras.on('hide', function() {
                                               panel_extras.destroy();
                                            });
                                        }
                                    },
                                    ],
                               
                            });
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
            },
           items: [
                {
                    title: 'PÁGINAS',
                    layout : 'fit',
                    cls: 'tabPaginas',
                    items: [
                    {
                    xtype: 'dataview',
                    cls: 'favoritos',
                    id: 'data_paginas',
                    flex: 1,
                    scrollable: {
                        direction: 'vertical',
                    },
                    inline: {
                        wrap: true
                    },
                    
                    store: 'Favorites',
                    
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
                                     Ext.getCmp('favorites').hide();
                                     Ext.getCmp('myCarroucel').removeAll(true,true);
                                     idcatalogo = record.get('id_catalogo');
                                if (Ext.Viewport.getOrientation() === 'portrait') {
                                     Ext.getCmp('myCarroucel').setItems($.grep(tpaginas2, function(e) { return e.id_catalogo == idcatalogo }));
                                     Ext.getCmp('myCarroucel').setActiveItem((record.get('numero')*2)-3);
                                     Ext.getCmp('footer').show();
                                }
                                else{
                                     Ext.getCmp('myCarroucel').setItems($.grep(tpaginas, function(e) { return e.id_catalogo == idcatalogo }));
                                     Ext.getCmp('myCarroucel').setActiveItem(record.get('numero')-1);
                                     Ext.getCmp('footer').show();
                                }
                                Ext.getCmp('barra5').show();
                                Ext.getCmp('footer').show();
                                Ext.getCmp('myCarroucel').show();
                                }});
                            }
                        }  
                    }
                }
                ],
                },
                {
                    title: 'PRODUTOS',
                    layout : 'fit',
                    cls: 'tabPaginas',
                    items: [
                    {
                    xtype: 'dataview',
                    cls: 'favoritos',
                    id: 'data_produtos',
                    flex: 1,
                    scrollable: {
                        direction: 'vertical',
                    },
                    inline: {
                        wrap: true
                    },
                    
                    store: 'Favorites2',
                    
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
                                id: 'pop-produto',
                                cls: 'pop-produto',
                                float: true,
                                showAnimation: 
                                {
                                    type: 'pop',
                                    duration: 300,
                                },  
                                layout : {
                                    type : 'vbox',
                                },
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        cls: 'header3',
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
                                            handler: function () {
                                                 panel_produto.hide();
                                                }
                                            },
                                        ]    
                                    },
                                    {
                                        html  : '<div class="pop-up">'+
                                        '<img src="'+record.get('foto')+'">'+
                                        '<br/><div class="btn-extras" id="btn-extras">EXTRAS</div>'+record.get('nome')+
                                        '<br/>Ref '+record.get('ref')+'<br/>'+record.get('descricao_'+idioma)+'</div>'
                                    },
                                ],
                                listeners: [
                                {
                                    element: 'element',
                                    delegate: '#btn-extras',
                                    event: 'tap',
                                    fn: function() {
                                     panel_extras = Ext.Viewport.add({
                                        xtype : 'tabpanel',
                                        id:'extras',
                                        cls: 'lista-extras',
                                        float: true,
                                        tabBar:    {
                                            cls: 'barraTab2',
                                            hidden: true,
                                        },
                                        items: [
                                        {
                                            xtype: 'toolbar',
                                            docked: 'top',
                                            cls: 'barraPaginas',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    ui: 'plain',
                                                    cls: 'back icon-back',
                                                    handler: function () {
                                                        panel_extras.hide();
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            title: '',
                                            layout : 'fit',
                                            cls: 'tabPaginas',
                                            items: [
                                            {
                                                xtype: 'dataview',
                                                cls: 'favoritos',
                                                flex: 1,
                                                scrollable: {
                                                    direction: 'vertical',
                                                },
                                                inline: {
                                                    wrap: true
                                                },
                                                store: 
                                                {
                                                    fields: ['descricao_1','descricao_2','descricao_3','descricao_4','estado','extra_id','foto','id','id_extra','lastModified','nome','priority','produto_id','ref'],
                                                    data: $.grep(textras_produtos, function(e) { return e.produto_id ==  record.get('id_produto')})
                                                },
                                                
                                                itemTpl: '<img src="'+caminho2+'{foto}" style="width:130px; margin:10px 10px 0 10px;"></img><div style="text-align: center; font-size:10px;">{nome}</div>',
                                                
                                                listeners: {
                                                    itemtap: function(list, index, target, record,e) {
                                                        panel_extra = Ext.Viewport.add({ 
                                                            xtype: 'container',
                                                            id: 'extra',
                                                            cls: 'pop-produto',
                                                            float: true,
                                                            showAnimation: 
                                                            {
                                                                type: 'pop',
                                                                duration: 300,
                                                            },  
                                                            layout : {
                                                                type : 'vbox',
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'toolbar',
                                                                    cls: 'header3',
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
                                                                        handler: function () {
                                                                             panel_extra.hide();
                                                                            }
                                                                        },
                                                                    ]    
                                                                },
                                                                {
                                                                    html  : '<div class="pop-up">'+
                                                                    '<img src="'+caminho+record.get('foto')+'">'+
                                                                    '<br\>'+record.get('nome')+'<br/>'+
                                                                    'Ref '+record.get('ref')+'<br/>'+record.get('descricao_'+idioma)+'</div>'
                                                                },
                                                            ],
                                                           
                                                        });
                                                    panel_extra.show();
                                                    panel_extra.on('hide', function() {
                                                       panel_extra.destroy();
                                                    });
                                                        
                                                    }
                                                }
                                            }
                                            ], 
                                        }, 
                                        ],       
                                        });
                                        panel_extras.show();
                                        panel_extras.on('hide', function() {
                                           panel_extras.destroy();
                                        });
                                    }
                                },
                                ],
                            });
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
            layout: {
                type: 'vbox',
            },
               scrollable: {
                direction: 'vertical'
            },
            items: [
            {
                id:   'helpHtml',
                html: '<div style="margin:20px; margin-top:0px !important;">'+
                      '<font color="#b69757">AJUDA</font><br/><br/><p><i>Aceda  em qualquer lugar aos nossos catálogos de forma rápida e intuitiva. </i><br />'+
                      '<i>Com a  APP ITALBOX consulte todos os nossos produtos e seus detalhes. </i><br />'+
                      '<i>Escolha  e partilhe os seus favoritos.</i></p><br/><p>Precisa  de ajuda? Siga as nossas dicas aqui.</p>'+
                      '<p>Ao  abrir a aplicação o utilizador tem acesso aos menus que permitem explorar:<br /><br />'+
                      '<i class="icon-italbox"></i> – menuItalbox – o perfil da empresa<br /><i class="icon-catalogos"></i> – menu catálogos – acesso aos catálogos. <br />'+
                      '<i class="icon-star"></i> – menu favoritos – arquivo das suas páginas e/ou produtos favoritos.<br />'+
                      '<i class="icon-mundo-catalogos"></i> – menu language– alterar idioma </p><br /><p><font color="#b69757"><strong>Dicas de navegação</strong></font><br /><br />'+
                      'O  acesso à informação é disponibilizado através dos menus na página principal, no  entanto,'+
                      'a qualquer momento pode trocar de menu acedendo à barra superior.Esta  barra é composta por:<br /><br />'+
                      '<i class="icon-back"></i> – retroceder<br /><i class="icon-pesquisa"></i> – pesquisar<br /><i class="icon-menu"></i> – Menus<br /><br />'+
                      'Se  esta estiver ocultada toque na seta <i class="icon-baixo"></i> para a fazer reaparecer.'+
                      'O  conteúdo de cada menu é disponibilizado imediatamente abaixo desta.<br />'+
                      'Se  já sabe o nome do produto que quer consultar, pesquise através <i class="icon-pesquisa"></i>.<br /><br />'+
                      '<font color="#b69757"><strong>Consultar Catálogos</strong></font><br /><br />No  menu catálogos toque na capa do catálogo que pretende consultar.'+
                      '<a name="_GoBack" id="_GoBack"></a><br />Confirme  a acesso ao catálogo.'+
                      'De seguida navegue entre as páginas fazendo deslizar o  seu dedo para a esquerda ou para a direita.'+
                      'Para uma melhor visualização, pode  ainda aumentar e mover a imagem da página em consulta.<br />'+
                      'Na  barra inferior estão contabilizados os produtos existentes na página que está a  visualizar.'+
                      'Ao tocar na seta poderá aceder aos detalhes do produto. <br />No  lado direito do ecrã encontrará,'+
                      'ainda, as seguintes funções:<br /><br /><i class="icon-lista"></i> – Consultar páginas específicas do catálogo<br />'+
                      '<i class="icon-star-catalogos"></i> – Definir páginas e/ou produtos como favorito<br />'+
                      '<i class="icon-partilha"></i> – Partilhar páginas e/ou produtos com amigos</p><br /><p><font color="#b69757"><strong>Consultar produto</strong></font>'+
                      '<br /><br />Toque  na imagem do produto da barra inferior para ter acesso ao detalhe do mesmo.'+
                      'Para visualizar os extras do produto toque no botão EXTRAS<br />'+
                      'Retroceda  na seta <i class="icon-back"></i> para voltar ao detalhe. Para sair toque no <i class="icon-close"></i> para fechar e  continuar a consultar o catalogo.<br /><br />'+
                      '<font color="#b69757"><strong>Favoritos </strong></font><br /><br />Para  adicionar uma página e/ou produto como favorito utilize o <i class="icon-star-catalogos"></i> '+
                      'apresentado à  sua direita. É notificado o êxito desta operação.<br />'+
                      'Para  visualizar os favoritos aceda ao menu favoritos na página inicial ou na barra  superior.<br />'+
                      'Os  favoritos encontram-se divididos por páginas e produtos, para consultar toque  no separador correspondente.<br />'+
                      'Pode  ainda editar os seus favoritos, apagando páginas e/ou produtos tocando no  <i class="icon-close3"></i>.</p></div>',
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
        layout: {
            type: 'vbox',
        },
        scrollable: {
            direction: 'vertical'
        },
       items : [
        {
            id: 'italboxHtml',
            html  : '<div class="italbox"><img src="imgs/company.jpg"></img><br/>'+
            '<font color="#b69757">EMPRESA</font><br/><br/><p>A ITALBOX, LDA, empresa portuguesa fundada em 1999,'+
            'é uma empresa especializada no fabrico de cabines de banho com design próprio e exclusivo,'+
            'e uma excelente dicotomia qualidade/preço. Com uma equipa de 62 colaboradores,'+
            'a Italbox é líder no mercado Português e tem apresentado taxas de crescimentono volume'+
            'de negócios de 20% por ano, nos últimos 5 anos.<br/><br/>Em 2011 lançou o novo catalogo com uma nova'+
            'linha de produtos que completa, no nosso entender, soluções que não estavam contempladas no nosso'+
            'anterior catálogo.<br/>Lançamos também um catálogo de móveis de casa de banho, de fabrico próprio,'+
            'no sentido de complementar a oferta.<br/><br/>Para que possam verificar os modelos que produzimos,'+
            'queiram consultar o nosso Web site: <font color="#b69757">www.italbox.pt</font>.<br/>'+
            'Informamos que estamos ao vosso dispor para qualquer informação e esclarecimento adicional'+
            'através do e-mail: <font color="#b69757">comercial@italbox.pt</font>.</p></div>',
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
            type: 'slideOut',
            duration: 700,
            direction: 'down',
            easing: 'easeIn'
        },
        listeners: {
            activeitemchange: function(container, value, oldValue, eOpts) {
                try{
                    if (oldValue) {
                    oldValue.resetZoom();
                    this.getActiveItem().resize();
                    }
                }
                catch(err){}
                idpagina = value.initialConfig.id_pagina;
                idcatalogo = value.initialConfig.id_catalogo;
                numero = value.initialConfig.numero;
                thumb = value.initialConfig.thumb;
                share = value.initialConfig.share;
                contador = 0;
                contador = ($.grep(tprodutos_paginas, function(e) { return e.pagina_id == idpagina })).length;
                Ext.getCmp('open-menu4').setText('<span style="text-align:center; padding-left: 25px; line-height: 2;">'+Ext.getStore('Languages').getById(idioma).get('product')+' '+contador+'</span><span style="text-align:right; float:right;"><i class="icon-cima"></i></span>');
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
        try {
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
            Ext.getCmp('barra').show();
            Ext.getCmp('barra2').hide();
        });
    },
    handleOrientationChange: function(viewport, orientation, width, height){
         ind = Ext.getCmp('myCarroucel').getActiveIndex();
         if (Ext.Viewport.getOrientation() === 'portrait') {
            Ext.getCmp('myCarroucel').setItems($.grep(tpaginas2, function(e) { return e.id_catalogo == idcatalogo }));
            var round1 = Math.round(ind*2);
            Ext.getCmp('myCarroucel').setActiveItem(round1-1);
         }
         else {
            Ext.getCmp('myCarroucel').setItems($.grep(tpaginas, function(e) { return e.id_catalogo == idcatalogo }));
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
            layout: {
                type: 'vbox',
                pack: 'center',
            },
            items: [
                {
                    xtype: 'dataview',
                    cls: 'lista',
                    scrollable: {
                        direction: 'horizontal',
                        indicators: false
                    },
                    inline: {
                        wrap: false
                    },
                     store: {
                        fields: ['id_catalogo','nome','capa','cor','estado','lastModified'],
                        data: tcatalogos
                    },
                    
                    itemTpl: '<img src="'+caminho+'{capa}" class="capa"><div class="texto-capa">{nome}</div>',
                    listeners: {
                        itemtap: function(list, index, target, record) {
                            Ext.Msg.confirm(
                            "",
                            Ext.getStore('Languages').getById(idioma).get('open')+' '+record.get('nome')+"?",
                            function(buttonId) {
                                if (buttonId === 'yes') {
                                     nomec = record.get('nome');
                                     Ext.getCmp('myList').hide();
                                     Ext.getCmp('myCarroucel').removeAll(true,true);
                                     idcatalogo = record.get('id_catalogo');
                                 if (Ext.Viewport.getOrientation() === 'portrait') {
                                     Ext.getCmp('myCarroucel').setItems($.grep(tpaginas2, function(e) { return e.id_catalogo == idcatalogo }));
                                 }
                                 else{
                                     Ext.getCmp('myCarroucel').setItems($.grep(tpaginas, function(e) { return e.id_catalogo == idcatalogo }));
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
                    if(Ext.getCmp('myList')._hidden === false || Ext.getCmp('italbox')._hidden === false || Ext.getCmp('favorites')._hidden === false || Ext.getCmp('help')._hidden === false || Ext.getCmp('search')._hidden === false )
	            {
                        Ext.getCmp('menuI').show();
                        Ext.getCmp('myCarroucel').hide();
                        Ext.getCmp('myCarroucel').on('hide', function() {
                        Ext.getCmp('myCarroucel').removeAll(true,true);
                        });
                        Ext.getCmp('barra2').hide();
                        Ext.getCmp('footer').hide();
                         Ext.getCmp('barra5').hide();
                        try {
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
                    Ext.getCmp('barra2').hide();
                    Ext.getCmp('footer').hide();
                    Ext.getCmp('barra5').hide();
                    try {
                        Ext.getCmp('myList2').hide();
                        Ext.getCmp('myList').hide();
                    }
                    catch(err) {}
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
                        if( typeof panel_menu !== 'undefined' ) {
                                 panel_menu.destroy();
                        }
                         var panel_menu = Ext.Viewport.add({ 
                            xtype: 'container',
                            id: 'menuP',
                            modal: true,
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
                                        Ext.getCmp('menuI').hide();
                                        Ext.getCmp('myCarroucel').hide();
                                        Ext.getCmp('myList').hide();
                                        Ext.getCmp('footer').hide();
                                        Ext.getCmp('barra5').hide();
                                        Ext.getCmp('italbox').hide();
                                        Ext.getCmp('help').hide();
                                        Ext.getCmp('search').hide();
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
                                   }
                                }
                                ]
                                });
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
                                     Ext.getCmp('back').show();
                                     Ext.getCmp('help').show();
                                     panel_menu.hide();
                                    }
                                }
                            ]
                        });
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
                            Ext.getCmp('menuI').hide();
                            Ext.getCmp('myList').hide();
                            Ext.getCmp('myCarroucel').hide();
                            Ext.getCmp('italbox').hide();
                            Ext.getCmp('help').hide();
                            Ext.getCmp('favorites').hide();
                            Ext.getCmp('barra2').hide();
                            Ext.getCmp('footer').hide();
                            Ext.getCmp('open-menu4').hide();
                            Ext.getCmp('barra5').hide();
                            Ext.getCmp('back').show();
                            Ext.getCmp('search').show();
                        }
                        else{
                            Ext.Msg.alert('Offline', Ext.getStore('Languages').getById(idioma).get('offline_search'), Ext.emptyFn);
                        }
                    }, 
                }
            ]
        },
        {
            xtype: 'toolbar',
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
                    cls: 'open-menu3 icon-baixo',
                    handler: function () {
                    Ext.getCmp('barra2').hide();
                    Ext.getCmp('barra').show();
                    }
                },
           ]    
        },
        {
            xtype: 'toolbar',
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
                    cls: 'open-menu4',
                    id: 'open-menu4',
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
                        hideOnMaskTap: true,
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
                           xtype: 'toolbar',
                           cls: 'header4',
                           docked: 'top',
                           layout: {
                                   type: 'hbox',
                                   pack: 'center'
                           },
                           items: [
                               {
                               ui:    'plain',
                               xtype: 'button',
                               cls: 'close-menu4',
                               text:  '<span style="text-align:center; padding-left: 25px; line-height: 2;">'+Ext.getStore('Languages').getById(idioma).get('product')+' '+contador+'</span><span style="text-align:right; float:right;"><i class="icon-baixo2"></i></span>',
                               handler: function () {
                                   panel1.hide();
                                   }
                               },
                           ]    
                        },
                   {   
                   xtype: 'dataview',
                   height: '100px',
                   cls: 'lista2',
                   scrollable: {
                       direction: 'horizontal',
                       indicators: false
                   },
                   inline: {
                       wrap: false
                   },
                    store: {
                       fields: ['descricao_1','descricao_2','descricao_3','descricao_4','estado','foto','id','id_produto', 'lastModified','nome','pagina_id','priority','produto_id','ref'],
                       data: $.grep(tprodutos_paginas, function(e) { return e.pagina_id ==  idpagina })
                   },
                   itemTpl: '<img style="margin-right:10px;margin-top:10px; height:75px;" src="'+caminho2+'{foto}">',
                  
                   listeners: {
                        itemtap: function(list, index, target, record)
                        {
                            if( typeof panel2 !== 'undefined' ) {
                                 panel2.destroy();
                            }
                            panel2 = Ext.Viewport.add({ 
                                xtype: 'container',
                                id: 'pop-image',
                                cls: 'pop-image',
                                float: true,
                                showAnimation: 
                                {
                                    type: 'pop',
                                    duration: 300,
                                },  
                                layout : {
                                    type : 'vbox',
                                },
                                items: [
                                {
                                xtype: 'toolbar',
                                cls: 'right_bar2',
                                docked: 'right',
                                layout: {
                                        type: 'vbox',
                                        pack: 'center',
                                },
                                items: [
                                {
                                      ui:    'plain',
                                      xtype: 'button',
                                      cls: 'open-menu9 icon-star-catalogos-white',
                                      handler: function () {
                                         Ext.getStore('Favorites2').load();
                                         var newRecord2 = {nome: record.get('nome') ,descricao_1: record.get('descricao_1'),descricao_2: record.get('descricao_2'), descricao_3: record.get('descricao_3'), descricao_4: record.get('descricao_4') , foto: caminho+record.get('foto'), thumb: caminho2+record.get('foto'), ref: record.get('ref'), id_produto: record.get('id_produto'),id_pagina: record.get('pagina_id')};
                                         Ext.getStore('Favorites2').add(newRecord2);
                                         Ext.getStore('Favorites2').sync();
                                          Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('add_product'), Ext.emptyFn);
                                         
                                      }
                                  },
                                  /*{
                                      ui:    'plain',
                                      xtype: 'button',
                                      cls: 'open-menu8 icon-lista-white',
                                      handler: function () {
                                       /////////////////////////////////////////////////////////////////////////////////////////  
                                      }
                                  },*/
                                  {
                                      ui:    'plain',
                                      xtype: 'button',
                                      cls: 'open-menu10 icon-partilha-white',
                                      handler: function () {
                                         window.plugins.socialsharing.share(Ext.getStore('Languages').getById(idioma).get('share_product_text')+nomec+Ext.getStore('Languages').getById(idioma).get('share_product_text2'), null, caminho+record.get('foto'), null);
                                      }
                                  },
                                ]
                                },
                                {
                                    xtype: 'toolbar',
                                    cls: 'header3',
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
                                        handler: function () {
                                             panel2.hide();
                                            }
                                        },
                                    ]    
                                },
                                {
                                    html  : '<div class="pop-up"><img src="'+caminho+record.get('foto')+'">'+
                                            '<br/><div class="btn-extras" id="btn-extras">EXTRAS</div>'+record.get('nome')+
                                            '<br/>Ref '+record.get('ref')+
                                            '<br/>'+record.get('descricao_'+idioma)+'</div>'
                                },
                                ],
                                listeners: [
                                {
                                    element: 'element',
                                    delegate: '#btn-extras',
                                    event: 'tap',
                                    fn: function() {
                                     panel_extras = Ext.Viewport.add({
                                        xtype : 'tabpanel',
                                        id:'extras',
                                        cls: 'lista-extras',
                                        float: true,
                                        tabBar:    {
                                            cls: 'barraTab2',
                                            hidden: true,
                                        },
                                        items: [
                                        {
                                            xtype: 'toolbar',
                                            docked: 'top',
                                            cls: 'barraPaginas',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    ui: 'plain',
                                                    cls: 'back icon-back',
                                                    handler: function () {
                                                        panel_extras.hide();
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            title: '',
                                            layout : 'fit',
                                            cls: 'tabPaginas',
                                            items: [
                                            {
                                                xtype: 'dataview',
                                                cls: 'favoritos',
                                                flex: 1,
                                                scrollable: {
                                                    direction: 'vertical',
                                                },
                                                inline: {
                                                    wrap: true
                                                },
                                                 store: 
                                                 {
                                                    fields: ['descricao_1','descricao_2','descricao_3','descricao_4','estado','extra_id','foto','id','id_extra','lastModified','nome','priority','produto_id','ref'],
                                                    data: $.grep(textras_produtos, function(e) { return e.produto_id ==  record.get('id_produto')})
                                                 },
                                                
                                                itemTpl: '<img src="'+caminho2+'{foto}" style="width:130px; margin:10px 10px 0 10px;"></img><div style="text-align: center; font-size:10px;">{nome}</div>',
                                                
                                                listeners: {
                                                    itemtap: function(list, index, target, record,e) {
                                                        panel_extra = Ext.Viewport.add({ 
                                                            xtype: 'container',
                                                            id: 'extra',
                                                            cls: 'pop-produto',
                                                            float: true,
                                                            showAnimation: 
                                                            {
                                                                type: 'pop',
                                                                duration: 300,
                                                            },  
                                                            layout : {
                                                                type : 'vbox',
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'toolbar',
                                                                    cls: 'header3',
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
                                                                        handler: function () {
                                                                             panel_extra.hide();
                                                                            }
                                                                        },
                                                                    ]    
                                                                },
                                                                {
                                                                    html  : '<div class="pop-up">'+
                                                                    '<img src="'+caminho+record.get('foto')+'">'+
                                                                    '<br\>'+record.get('nome')+'<br/>'+
                                                                    'Ref '+record.get('ref')+'<br/>'+record.get('descricao_'+idioma)+'</div>'
                                                                },
                                                            ],
                                                           
                                                        });
                                                    panel_extra.show();
                                                    panel_extra.on('hide', function() {
                                                       panel_extra.destroy();
                                                    });
                                                        
                                                    }
                                                }
                                            }
                                            ], 
                                        }, 
                                        ],       
                                        });
                                        panel_extras.show();
                                        panel_extras.on('hide', function() {
                                           panel_extras.destroy();
                                        });
                                    }
                                },
                                ]
                            });
                        panel2.show();
                        panel2.on('hide', function() {
                           panel2.destroy();
                        });
                        },
                    },
                    }
                    ],
                    initialize: function() {
                        this.callParent(arguments);
                        this.getHideAnimation().on({
                            animationend: this.destroy,
                            scope: this
                        });
                    }
                    });
                    panel1.show();
                    panel1.on('hide', function() {
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
            ]    
        },
        {
            xtype: 'toolbar',
            id: 'barra5',
            cls: 'right_bar',
            docked: 'right',
            hidden: true,
            layout: {
                    type: 'vbox',
                    pack: 'center',
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
                    ui:    'plain',
                    xtype: 'button',
                    cls: 'open-menu5 icon-star-catalogos',
                    handler: function () {
                        if (Ext.getCmp('myCarroucel').getItems().length == 0) {
                             Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('no_pages'), Ext.emptyFn);
                        }
                        else{
                            Ext.getStore('Favorites').load();
                            var newRecord = {imag: thumb ,nome: 'Cat. '+idcatalogo+' Pag. '+numero , id_pagina: ''+idpagina+'', id_catalogo: idcatalogo,numero: numero};
                            Ext.getStore('Favorites').add(newRecord);
                            Ext.getStore('Favorites').sync();
                            Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('add_page'), Ext.emptyFn);
                       }
                    }
            },
            {
              ui:    'plain',
              xtype: 'button',
              cls: 'open-menu6 icon-lista',
              handler: function () {
                  if (Ext.getCmp('myCarroucel').getItems().length == 0) {
                       Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('no_pages'), Ext.emptyFn);
                  }
                  else{
                  panel_paginas = Ext.Viewport.add({
                  xtype : 'tabpanel',
                  id:'listaPag',
                  cls: 'pop-produto',
                  float: true,
                  tabBar:    {
                      cls: 'barraTab2',
                      hidden: true,
                  },
                  items: [
                  {
                      xtype: 'toolbar',
                      docked: 'top',
                      cls: 'barraPaginas',
                      items: [
                          {
                              xtype: 'button',
                              ui: 'plain',
                              cls: 'back icon-back',
                              handler: function () {
                                  panel_paginas.hide();
                              }
                          }
                      ]
                  },
                  {
                      title: Ext.getStore('Languages').getById(idioma).get('pages'),
                      layout : 'fit',
                      cls: 'tabPaginas',
                      items: [
                      {
                      xtype: 'dataview',
                      cls: 'favoritos',
                      flex: 1,
                      scrollable: {
                          direction: 'vertical',
                      },
                      inline: {
                          wrap: true
                      },
                       store: 
                       {
                          fields: ['id_catalogo','id_pagina','imageSrc','numero','share','thumb','xtype'],
                          data:  $.grep(tpaginas, function(e) { return e.id_catalogo == idcatalogo })
                       },
                      
                      itemTpl: '<img src="{thumb}" style="width:130px; margin:10px 10px 0 10px;"></img><div style="text-align: center; font-size:12px;">Pag. {numero}</div>',
                      
                      listeners: {
                          itemtap: function(list, index, target, record,e) {
                               Ext.Msg.confirm(
                              "",
                              Ext.getStore('Languages').getById(idioma).get('open_page')+' '+record.get('numero')+"?",
                              function(buttonId) {
                              if (buttonId === 'yes') {
                               if (Ext.Viewport.getOrientation() === 'portrait') {
                                   Ext.getCmp('myCarroucel').setActiveItem((record.get('numero')*2)-3);
                               }
                               else{
                                   Ext.getCmp('myCarroucel').setActiveItem(record.get('numero')-1);
                               }
                                  panel_paginas.hide();
                              }});
                          }
                      }
                      }
                      ],
                  },
                  ],       
                  });
                  panel_paginas.show();
                  panel_paginas.on('hide', function() {
                     panel_paginas.destroy();
                  });
                  }
              }
            },
            {
                ui: 'plain',
                xtype: 'button',
                cls: 'open-menu7 icon-partilha',
                handler: function () {
                    if (Ext.getCmp('myCarroucel').getItems().length == 0) {
                         Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('no_pages'), Ext.emptyFn);
                    }
                    else{
                        window.plugins.socialsharing.share(Ext.getStore('Languages').getById(idioma).get('share_page_text')+nomec+Ext.getStore('Languages').getById(idioma).get('share_page_text2'), null, share, null);                          
                    }
                }
            },
        ]
        },
        {
            xtype: 'my-viewport',
            hidden: true,
            id: 'myList',
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
            id: 'menuI',
            cls: 'menuI',
        },
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
        Ext.fly('loading').destroy();
    
        Ext.Viewport.add({
            xtype: 'my-viewport-panel',
            cls: 'body_bg',
            id: 'painel'
        });
        
        Ext.Msg.setZIndex(20);
        
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
        }
        else{
            idioma = Ext.getStore('Settings').getAt(0).get('lang');
            Ext.getCmp('start-catalogos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_catalogs'));
            Ext.getCmp('start-favoritos').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_favorites'));
            Ext.getCmp('start-language').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_language'));
            Ext.getCmp('start-help').setStyle(Ext.getStore('Languages').getById(idioma).get('menu_help'));
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
        }
       
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
	} else {
                connect = 1;
	}
        }
         catch(e){}
    }

    function onDeviceReady() {
        console.log("onDeviceReady");
    }

    function onOnline() {
        connect = 1;
    }
 
    function onOffline() {
        connect = 0;
        try {
               Ext.getCmp('menuP').hide();
               Ext.getCmp('menuL').hide();
               Ext.getCmp('listaPag').hide();
               Ext.getCmp('extras').hide();
               Ext.getCmp('extra').hide();
        }
        catch(err) {}
        
        if (Ext.getCmp('menuI')._hidden === false || Ext.getCmp('italbox')._hidden === false || Ext.getCmp('help')._hidden === false ) {
            Ext.Msg.alert('', Ext.getStore('Languages').getById(idioma).get('offline'), Ext.emptyFn);
        }
        else{
            Ext.Msg.alert(
                "",
                Ext.getStore('Languages').getById(idioma).get('offline_error'),
            function(buttonId) {
                  if (buttonId === 'ok') {
            
            Ext.getCmp('myCarroucel').hide();
            Ext.getCmp('myCarroucel').on('hide', function() {
            Ext.getCmp('myCarroucel').removeAll(true,true);
            });
            Ext.getCmp('barra2').hide();
            Ext.getCmp('footer').hide();
            Ext.getCmp('barra5').hide();
            try {
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
            try {
                Ext.getCmp('menuP').hide();
                Ext.getCmp('menuL').hide();
                Ext.getCmp('listaPag').hide();
                Ext.getCmp('extras').hide();
                Ext.getCmp('extra').hide();
            }
            catch(err) {}
            
            if(Ext.getCmp('myList')._hidden === false || Ext.getCmp('italbox')._hidden === false || Ext.getCmp('favorites')._hidden === false || Ext.getCmp('help')._hidden === false || Ext.getCmp('search')._hidden === false )
            {
                Ext.getCmp('myCarroucel').hide();
                Ext.getCmp('myCarroucel').on('hide', function() {
                Ext.getCmp('myCarroucel').removeAll(true,true);
                });
                Ext.getCmp('barra2').hide();
                Ext.getCmp('footer').hide();
                Ext.getCmp('barra5').hide();
                try {
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
            
            else if (Ext.getCmp('myCarroucel')._hidden === false) 
            {
                Ext.getCmp('myCarroucel').hide();
                Ext.getCmp('myCarroucel').on('hide', function() {
                     Ext.getCmp('myCarroucel').removeAll(true,true);
                });
                Ext.getCmp('barra2').hide();
                Ext.getCmp('footer').hide();
                Ext.getCmp('barra5').hide();
                try {
                    Ext.getCmp('myList2').hide();
                    Ext.getCmp('myList').hide(); 
                }
                catch(err) {}
               
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
                        Ext.getCmp('menuI').hide();
                        Ext.getCmp('myCarroucel').hide();
                        Ext.getCmp('myList').hide();
                        Ext.getCmp('footer').hide();
                        Ext.getCmp('barra5').hide();
                        Ext.getCmp('italbox').hide();
                        Ext.getCmp('help').hide();
                        Ext.getCmp('search').hide();
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
               }
           }
            ]
            });
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
                     Ext.getCmp('back').show();
                     Ext.getCmp('help').show();
                     panel_menu.hide();
                    }
                }
            ]
        });
        panel_menu.show();
        panel_menu.on('hide', function() {
            panel_menu.destroy();

        });
    }
    onLoad();
    }
});
});
};
