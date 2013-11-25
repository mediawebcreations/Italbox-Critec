window.dao =  {
    syncURL: "http://nrodrigues.net/italbox/connect.php?test=1",
    //syncURL: "http://localhost:8080/GitHub/connect.php?test=1",
    //syncURL: "http://10.0.2.2:8080/GitHub/connect.php?test=1",
    //syncURL: "http://192.168.1.2:8080/GitHub/connect.php?test=1",
    //syncURL: "http://192.168.23.132:8080/GitHub/connect.php?test=1",
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


$(document).ready(function() {
    setTimeout('runApp()',1000);
    setTimeout('runApp2()',2000);
    setTimeout('runApp3()',3000);
    setTimeout('runApp4()',4000);
});

function runApp() {
dao.initialize(function(){
    console.log('database initialized');
});
};

function runApp2() {
dao.sync(renderList);
};

function runApp3() {
renderList();
};

function runApp4() {
$.when(dao.initialize()).then(dao.sync(renderList)).then(renderList()).then(sencha());
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
    var arr2 = {xtype: 'imageviewer', imageSrc: 'http://orcamentos.eu/wp-content/uploads/2011/05/Italbox.png' };
    var arr3 = {fields: ['capa','cor', 'nome'],
                       data: [{
                           capa: 'imgs/produto1.jpg',
                           cor: 'azul',
                           nome: 'Produto 1'
                       }, {
                           capa: 'imgs/produto2.jpg',
                           cor: 'azul',
                           nome: 'Produto 2'
                       },
                ]};
    dao.findAll(function(catalogos) {
        var l = catalogos.length;
        for (var i = 0; i < l; i++) {
            var catalogo = catalogos[i];
            var listaImagens = {
                   //style: "background-color: #000000; color:black;",
                   //title: catalogo.nome,
                   //html: "<img style=' margin:auto; width: 100%;' src='"+catalogo.capa+"'/>"
                   xtype: 'imageviewer',
                   //imageSrc: 'data:image/jpg;base64,'+catalogo.capa
                    imageSrc: catalogo.capa
              };
              arr.push(listaImagens); 
         }
         callback(arr,arr2,arr3,catalogos);
    });
};

function log(msg) {
    $('#log').val($('#log').val() + msg + '\n');
};

function sencha(){
renderImages(function(arr,arr2, arr3,catalogos){
    alert(arr3);
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': 'sencha-touch-2.0.1.1/ux'
    }
});

Ext.define('Italbox.Viewport3', {
    extend: 'Ext.Panel',
    xtype : 'panel',
    id:'myList2',
    config: {
                showAnimation:  
                {
                    type: 'slideIn',
                    duration: 1000,
                    direction: 'up',
                    easing: 'easeIn'
                },  
                hideAnimation: 
                {
                    //TweenMax.to(this, 1, {autoAlpha:0});
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
                    store: arr3,/*{
                       fields: ['capa','cor', 'nome'],
                       data: [{
                           capa: 'imgs/produto1.jpg',
                           cor: 'azul',
                           nome: 'Produto 1'
                       }, {
                           capa: 'imgs/produto2.jpg',
                           cor: 'azul',
                           nome: 'Produto 2'
                       },
                     ]
                   },*/
                    itemTpl: '<img style="margin-right:10px; height:75px;" src="{capa}">',
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
                                    //TweenMax.to(this, 1, {autoAlpha:0});
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
                                        html  : '<div style="margin:20px;"><img src="'+record.get('capa')+'" style="margin-top:20px; height:203px;"><br\><font size="2px">Ana<br/>Ref<br/>Quatro portas de abrir // Fecho Magnetico // Puxador aço inox</font></div>'
                                  
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
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag5.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag6.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag7.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag8.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag9.jpeg'},
        //    {xtype: 'imageviewer', imageSrc: 'http://nrodrigues.net/italbox/img/pag10.jpeg'}
        //    
        //   
        //]
        //,
        listeners: {
            activeitemchange: function(container, value, oldValue, eOpts) {
                 Ext.getCmp('open-menu4').setText('Produtos '+Ext.getCmp('myCarroucel').getActiveIndex().toString());
                try{
                    if (oldValue) {
                    oldValue.resetZoom();
                    this.getActiveItem().resize();
                }
                }
                catch(err){}
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
         var barra = Ext.getCmp('barra');
          var barra2 = Ext.getCmp('barra2');
          var myList2 =  Ext.getCmp('myList2');
          var footer = Ext.getCmp('footer');
            myList2.hide();
            footer.show();
            barra.hide();
            barra2.show();
           
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
                                 if (index === 0) {
                                 Ext.getCmp('myCarroucel').setItems(arr);
                                 }
                                 if (index === 1) {
                                    Ext.getCmp('myCarroucel').setItems(arr2);
                                 }
                                  if (index === 2) {
                                    Ext.getCmp('myCarroucel').setItems(arr);
                                 }
                                  if (index === 3) {
                                    Ext.getCmp('myCarroucel').setItems(arr2);
                                 }
                                 Ext.getCmp('myCarroucel').setActiveItem(0);
                                 Ext.getCmp('myCarroucel').show();
                                 Ext.getCmp('barra').hide();
                                 Ext.getCmp('barra2').show();
                                 //Ext.getCmp('footer').show();
                                 Ext.getCmp('back').show();
                                 //alert(index);
                       
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
                    //TweenMax.to(this, 1, {autoAlpha:0});
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
                    //Ext.getCmp('footer').hide();
                    Ext.getCmp('back').hide();
                    Ext.getCmp('myList').show();
                    
                    
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
                    //TweenMax.to(this, 1, {autoAlpha:0});
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
            //hidden: true,
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
                    //TweenMax.to(this, 1, {autoAlpha:0});
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
                      Ext.getCmp('footer').hide();
                      Ext.getCmp('myList2').show();
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
            xtype: 'panel',
            id: 'myList2',
            cls: 'menu3',
            height: '150px',
            hidden: true,
            docked: 'bottom',
            
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
            id: 'painel'
        });
    }
});
});
};
