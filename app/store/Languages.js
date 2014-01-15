Ext.define('ItalboxCatalog.store.Languages', {
    extend: 'Ext.data.Store',
    config:{
        autoLoad: true,
        fields: [
            { name: 'id', type: 'int' },
            { name: 'lang', type: 'string' },
            { name: 'menu_catalogs', type: 'string' },
            { name: 'menu_favorites', type: 'string' },
            { name: 'menu_language', type: 'string' },
            { name: 'menu_help', type: 'string' },
            { name: 'company_html', type: 'string' },
            { name: 'help_html', type: 'string' },
            { name: 'italbox', type: 'string' },
            { name: 'catalogs', type: 'string' },
            { name: 'favorites', type: 'string' },
            { name: 'language', type: 'string' },
            { name: 'help', type: 'string' },
            { name: 'help2', type: 'string' },
            { name: 'pages', type: 'string' },
            { name: 'products', type: 'string' },
            { name: 'product', type: 'string' },
            { name: 'favorites_empty', type: 'string' },
            { name: 'products_empty', type: 'string' },
            { name: 'search', type: 'string' },
            { name: 'search_list', type: 'string' },
            { name: 'offline_catalogs', type: 'string' },
            { name: 'offline_favorites', type: 'string' },
            { name: 'offline_search', type: 'string' },
            { name: 'remove_favorite', type: 'string' },
            { name: 'open_favorite', type: 'string' },
            { name: 'open_product', type: 'string' },
            { name: 'open', type: 'string' },
            { name: 'no_products', type: 'string' },
            { name: 'add_product', type: 'string' },
            { name: 'add_page', type: 'string' },
            { name: 'offline', type: 'string' },
            { name: 'offline_error', type: 'string' },
            { name: 'exit', type: 'string' },
            { name: 'yes', type: 'string' },
            { name: 'no', type: 'string' },
            { name: 'cancel', type: 'string' },
        ],
        data : [
        {
        id : 1,
        lang : 'pt',
        menu_catalogs:  'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu3.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_favorites:  'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu3.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_language:  'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu3.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help:  'margin:5px 10px 10px 10px; background: url(imgs/icons/ajuda_menu3.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help2:  'margin:5px; margin-right:10px !important; margin-bottom:10px !important; background: url(imgs/icons/ajuda_menu3.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        company_html: '<div class="italbox"><img src="imgs/company.jpg"></img><br/>EMPRESA<br/><br/><p>A ITALBOX, LDA, empresa portuguesa fundada em 1999, � uma empresa especializada no fabrico de cabines de banho com design pr�prio e exclusivo, e uma excelente dicotomia qualidade/pre�o. Com uma equipa de 62 colaboradores, a Italbox � l�der no mercado Portugu�s e tem apresentado taxas de crescimentono volume de neg�cios de 20% por ano, nos �ltimos 5 anos.<br/>Em 2011 lan�ou o novo catalogo com uma nova linha de produtos que completa, no nosso entender, solu��es que n�o estavam contempladas no nosso anterior cat�logo.<br/>Lan�amos tamb�m um cat�logo de m�veis de casa de banho, de fabrico pr�prio, no sentido de complementar a oferta.<br/>Para que possam verificar os modelos que produzimos, queiram consultar o nosso Web site: <font color="#b69757">www.italbox.pt</font>.<br/>Informamos que estamos ao vosso dispor para qualquer informa��o e esclarecimento adicional atrav�s do e-mail: <font color="#b69757">comercial@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;"><img src="imgs/company2.jpg" style="max-width:100%;"></img><br/>AJUDA<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>',
        italbox : 'ITALBOX',
        catalogs : 'CATALOGOS',
        favorites : 'FAVORITOS',
        language : 'IDIOMA',
        help : 'AJUDA',
        pages: 'P�GINAS',
        products : 'PRODUTOS',
        product : 'Produtos',
        favorites_empty: 'Sem Favoritos',
        products_empty: 'Sem Resultados',
        search : 'Pesquisa...',
        search_list : '<div class="lista-pesquisa">'+
            '<img src="http://www.critecns.com/italbox/assets/uploads/imgs/{foto}" style="float:left; height:40px; margin-right:10px;"></img>' +
            '<div><b>Nome:</b> <span>{nome}</span></div>' +
            '<div><b>Ref:</b> <span>{ref}</span></div>' +
            '</div>',
        offline_catalogs: 'Necessita de estar Online para aceder aos Catalogos',
        offline_favorites: 'Necessita de estar Online para aceder aos Favoritos',
        offline_search: 'Necessita de estar Online para aceder � Pesquisa',
        remove_favorite: 'Remover Favorito',
        open_favorite: 'Abrir Favorito ',
        open_product: 'Abrir Pagina do Produto',
        open: 'Abrir',
        add_product: 'Produto adicionado aos favoritos',
        no_products: 'N�o existem produtos nesta pagina',
        add_page: 'Pagina adicionada aos favoritos',
        offline: 'A trabalhar em modo offline',
        offline_error: 'Offline, necessita de estar online para aceder a este conte�do',
        exit: 'Sair da Aplica��o?',
        yes: 'Sim',
        no: 'N�o',
        cancel: 'Cancelar',
        },
        {
        id : 2,
        lang : 'en',
        menu_catalogs:  'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu3_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_favorites:  'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu3_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_language:  'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu3_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help:  'margin:5px 10px 10px 10px; background: url(imgs/icons/ajuda_menu3_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help2:  'margin:5px; margin-right:10px !important; margin-bottom:10px !important; background: url(imgs/icons/ajuda_menu3_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        company_html : '<div class="italbox"><img src="imgs/company.jpg"></img><br/>COMPANY<br/><br/><p>ITALBOX, LDA, is a company founded in 1999 specialized in the manufacture of shower cabins being a reference in Portugal.<br/> The own and unique design, the excellent dichotomy quality/price and the focus on the clients satisfactions are our identifying characteristics.<br/> Our experience and know-how allow us to find solutions desired by the clients. So you can meet us and the models that we produce, please consult our web-site: <font color="#b69757">www.italbox.pt</font>.<br/> Beside the various ranges of the catalog products, we also produce by mesure. The various hotels which our products and solutions are applied are the recognition of our profissionalism. <br/>We inform you that we are at your disposal for any further information and additional clarification throught the e-mail: <font color="#b69757">export.italbox@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;"><img src="imgs/company2.jpg" style="max-width:100%;"></img><br/>HELP<br/><br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>',
        italbox : 'ITALBOX',
        catalogs : 'CATALOGS',
        favorites : 'FAVORITES',
        language : 'LANGUAGE',
        help : 'HELP',
        pages: 'PAGES',
        products : 'PRODUCTS',
        product : 'Products',
        favorites_empty: 'Without Favorites',
        products_empty: 'Without Results',
        search : 'Search...',
        search_list : '<div class="lista-pesquisa">'+
            '<img src="http://www.critecns.com/italbox/assets/uploads/imgs/{foto}" style="float:left; height:40px; margin-right:10px;"></img>' +
            '<div><b>Name:</b> <span>{nome}</span></div>' +
            '<div><b>Ref:</b> <span>{ref}</span></div>' +
            '</div>',
        offline_catalogs: 'You need a Internet Connection to open the Catalogs',
        offline_favorites: 'You need a Internet Connection to open the Favorites',
        offline_search: 'You need a Internet Connection to open the Search',
        remove_favorite: 'Remove Favorite',
        open_favorite: 'Open Favorite',
        open_product: 'Open Product Page',
        open: 'Open',
        add_product: 'Product added to Favorites',
        no_products: 'This page doesn\'t have any Products',
        add_page: 'Page added to Favorites',
        offline: 'Working in Offline Mode',
        offline_error: 'Offline, you need to be Online to view this content',
        exit: 'Exit Application?',
        yes: 'Yes',
        no: 'No',
        cancel: 'Cancel',
        },
        ]
    }
});