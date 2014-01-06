Ext.define('ItalboxCatalog.store.Languages', {
    extend: 'Ext.data.Store',
    config:{
        autoLoad: true,
        fields: [
            { name: 'id', type: 'int' },
            { name: 'lang', type: 'string' },
            { name: 'menu', type: 'string' },
            { name: 'company_html', type: 'string' },
            { name: 'help_html', type: 'string' },
            { name: 'italbox', type: 'string' },
            { name: 'catalogs', type: 'string' },
            { name: 'favorites', type: 'string' },
            { name: 'language', type: 'string' },
            { name: 'help', type: 'string' },
            { name: 'pages', type: 'string' },
            { name: 'products', type: 'string' },
            { name: 'product', type: 'string' },
        ],
        data : [
        {
        id : 1,
        lang : 'pt',
        menu:  '<div style="display: -webkit-box;"><div id="start-italbox" class="start-menu"; style="margin-left: 0px !important">'+
               '<img src="imgs/icons/italbox_menu2.png" style=""></div>'+
               '<div id="start-catalogos"  class="start-menu"; style="margin-right: 0px !important">'+
               '<img id="start-catalogos" src="imgs/icons/catalogos_menu.png" style=""></div></div>'+
               '<div style="display: -webkit-box;"><div id="start-favoritos" class="start-menu" style="margin-left: 0px !important">'+
               '<img src="imgs/icons/favoritos_menu.png" style=""></div>'+
               '<div id="start-language" class="start-menu";  style="margin-right: 0px !important">'+
               '<img src="imgs/icons/language_menu.png" style=""></div></div>'+
               '<div style="display: -webkit-box;"><div class="start-menu"; id="start-help" style="width:100% !important; margin-left: 0px !important; margin-right: 0px !important;">'+
               '<img src="imgs/icons/ajuda_menu.png" style=""></div>',
        company_html: '<div class="italbox"><img src="imgs/company.jpg"></img><br/>EMPRESA<br/><br/><p>A ITALBOX, LDA, empresa portuguesa fundada em 1999, é uma empresa especializada no fabrico de cabines de banho com design próprio e exclusivo, e uma excelente dicotomia qualidade/preço. Com uma equipa de 62 colaboradores, a Italbox é líder no mercado Português e tem apresentado taxas de crescimentono volume de negócios de 20% por ano, nos últimos 5 anos.<br/>Em 2011 lançou o novo catalogo com uma nova linha de produtos que completa, no nosso entender, soluções que não estavam contempladas no nosso anterior catálogo.<br/>Lançamos também um catálogo de móveis de casa de banho, de fabrico próprio, no sentido de complementar a oferta.<br/>Para que possam verificar os modelos que produzimos, queiram consultar o nosso Web site: <font color="#b69757">www.italbox.pt</font>.<br/>Informamos que estamos ao vosso dispor para qualquer informação e esclarecimento adicional através do e-mail: <font color="#b69757">comercial@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;"><img src="imgs/company2.jpg" style="margin-top:45px;max-width:100%;"></img><br/>AJUDA<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>',
        italbox : 'ITALBOX',
        catalogs : 'CATALOGOS',
        favorites : 'FAVORITOS',
        language : 'IDIOMA',
        help : 'AJUDA',
        pages: 'PÁGINAS',
        products : 'PRODUTOS',
        product : 'Produtos',
        },
        {
        id : 2,
        lang : 'en',
        menu:  '<div style="display: -webkit-box;"><div id="start-italbox" class="start-menu"; style="margin-left: 0px !important">'+
               '<img src="imgs/icons/italbox_menu2.png" style=""></div>'+
               '<div id="start-catalogos"  class="start-menu"; style="margin-right: 0px !important">'+
               '<img id="start-catalogos" src="imgs/icons/catalogos_menu_en.png" style=""></div></div>'+
               '<div style="display: -webkit-box;"><div id="start-favoritos" class="start-menu" style="margin-left: 0px !important">'+
               '<img src="imgs/icons/favoritos_menu_en.png" style=""></div>'+
               '<div id="start-language" class="start-menu";  style="margin-right: 0px !important">'+
               '<img src="imgs/icons/language_menu_en.png" style=""></div></div>'+
               '<div style="display: -webkit-box;"><div class="start-menu"; id="start-help" style="width:100% !important; margin-left: 0px !important; margin-right: 0px !important;">'+
               '<img src="imgs/icons/ajuda_menu_en.png" style=""></div>',
        company_html : '<div class="italbox"><img src="imgs/company.jpg"></img><br/>COMPANY<br/><br/><p>ITALBOX, LDA, is a company founded in 1999 specialized in the manufacture of shower cabins being a reference in Portugal.<br/> The own and unique design, the excellent dichotomy quality/price and the focus on the clients satisfactions are our identifying characteristics.<br/> Our experience and know-how allow us to find solutions desired by the clients. So you can meet us and the models that we produce, please consult our web-site: <font color="#b69757">www.italbox.pt</font>.<br/> Beside the various ranges of the catalog products, we also produce by mesure. The various hotels which our products and solutions are applied are the recognition of our profissionalism. <br/>We inform you that we are at your disposal for any further information and additional clarification throught the e-mail: <font color="#b69757">export.italbox@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;"><img src="imgs/company2.jpg" style="margin-top:45px;max-width:100%;"></img><br/>HELP<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>',
        italbox : 'ITALBOX',
        catalogs : 'CATALOGS',
        favorites : 'FAVORITES',
        language : 'LANGUAGE',
        help : 'HELP',
        pages: 'PAGES',
        products : 'PRODUCTS',
        product : 'Products',
        },
        ]
    }
});