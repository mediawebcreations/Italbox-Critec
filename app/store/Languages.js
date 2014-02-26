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
            { name: 'open_page', type: 'string' },
            { name: 'open_favorite', type: 'string' },
            { name: 'open_product', type: 'string' },
            { name: 'open', type: 'string' },
            { name: 'no_pages', type: 'string' },
            { name: 'no_products', type: 'string' },
            { name: 'add_product', type: 'string' },
            { name: 'add_page', type: 'string' },
            { name: 'offline', type: 'string' },
            { name: 'offline_error', type: 'string' },
            { name: 'exit', type: 'string' },
            { name: 'yes', type: 'string' },
            { name: 'no', type: 'string' },
            { name: 'cancel', type: 'string' },
            { name: 'share_page_text', type: 'string' },
            { name: 'share_page_text2', type: 'string' },
            { name: 'share_product_text', type: 'string' },
            { name: 'share_product_text2', type: 'string' },
        ],
        data : [
        {
        id : 1,
        lang : 'pt',
        menu_catalogs:  'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_favorites:  'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_language:  'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help:  'margin:5px 10px 10px 10px; background: url(imgs/icons/ajuda_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        company_html: '<div class="italbox"><img src="imgs/company.jpg"></img><br/><font color="#b69757">EMPRESA</font><br/><br/><p>A ITALBOX, LDA, empresa portuguesa fundada em 1999, é uma empresa especializada no fabrico de cabines de banho com design próprio e exclusivo, e uma excelente dicotomia qualidade/preço. Com uma equipa de 62 colaboradores, a Italbox é líder no mercado Português e tem apresentado taxas de crescimento no volume de negócios de 20% por ano, nos últimos 5 anos.<br/><br/>Em 2011 lançou o novo catalogo com uma nova linha de produtos que completa, no nosso entender, soluções que não estavam contempladas no nosso anterior catálogo.<br/>Lançamos também um catálogo de móveis de casa de banho, de fabrico próprio, no sentido de complementar a oferta.<br/><br/>Para que possam verificar os modelos que produzimos, queiram consultar o nosso Web site: <font color="#b69757">www.italbox.pt</font>.<br/>Informamos que estamos ao vosso dispor para qualquer informação e esclarecimento adicional através do e-mail: <font color="#b69757">comercial@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;">'+
        '<font color="#b69757">AJUDA</font><br/><br/><p><i>Aceda  em qualquer lugar aos nossos catálogos de forma rápida e intuitiva. </i><br />'+
        '<i>Com a  APP ITALBOX consulte todos os nossos produtos e seus detalhes. </i><br />'+
        '<i>Escolha  e partilhe os seus favoritos.</i></p><br/><p>Precisa  de ajuda? Siga as nossas dicas aqui.</p>'+
        '<p>Ao  abrir a aplicação o utilizador tem acesso aos menus que permitem explorar:<br /><br />'+
        '<i class="icon-italbox"></i> – menu Italbox – o perfil da empresa<br /><i class="icon-catalogos"></i> – menu Catálogos – acesso aos catálogos. <br />'+
        '<i class="icon-star"></i> – menu Favoritos – arquivo das suas páginas e/ou produtos favoritos.<br />'+
        '<i class="icon-mundo-catalogos"></i> – menu Language– alterar idioma </p><br /><p><font color="#b69757"><strong>Dicas de navegação</strong></font><br /><br />'+
        'O  acesso à informação é disponibilizado através dos menus na página principal, no  entanto,'+
        'a qualquer momento pode trocar de menu acedendo à barra superior.Esta  barra é composta por:<br /><br />'+
        '<i class="icon-back"></i> – Retroceder<br /><i class="icon-pesquisa"></i> – Pesquisar<br /><i class="icon-menu"></i> – Menus<br /><br />'+
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
        italbox : 'ITALBOX',
        catalogs : 'CATALOGOS',
        favorites : 'FAVORITOS',
        language : 'IDIOMA',
        help : 'AJUDA',
        pages: 'PÁGINAS',
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
        offline_search: 'Necessita de estar Online para aceder à Pesquisa',
        remove_favorite: 'Remover Favorito',
        open_page: 'Ir para Página',
        open_favorite: 'Abrir Favorito ',
        open_product: 'Abrir Pagina do Produto',
        open: 'Abrir',
        add_product: 'Produto adicionado aos favoritos',
        no_pages: 'Catalogo sem Paginas',
        no_products: 'Não existem produtos nesta pagina',
        add_page: 'Pagina adicionada aos favoritos',
        offline: 'A trabalhar em modo offline',
        offline_error: 'Offline, necessita de estar online para aceder a este conteúdo',
        exit: 'Sair da Aplicação?',
        yes: 'Sim',
        no: 'Não',
        cancel: 'Cancelar',
        share_page_text: 'Imagem do Catalogo ',
        share_page_text2: ' partilhada através da aplicação Italbox',
        share_product_text: 'Imagem do Produto do Catalogo ',
        share_product_text2: ' partilhada através da aplicação Italbox',
        },
        {
        id : 2,
        lang : 'en',
        menu_catalogs:  'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_favorites:  'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_language:  'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help:  'margin:5px 10px 10px 10px; background: url(imgs/icons/ajuda_menu_eng.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        company_html : '<div class="italbox"><img src="imgs/company.jpg"></img><br/><font color="#b69757">COMPANY</font><br/><br/><p>ITALBOX, LDA, is a company founded in 1999 specialized in the manufacture of shower cabins being a reference in Portugal.<br/><br/> The own and unique design, the excellent dichotomy quality/price and the focus on the clients satisfactions are our identifying characteristics. Our experience and know-how allow us to find solutions desired by the clients.</br><br/> So you can meet us and the models that we produce, please consult our web-site: <font color="#b69757">www.italbox.pt</font>.<br/><br/> Beside the various ranges of the catalog products, we also produce by mesure. The various hotels which our products and solutions are applied are the recognition of our profissionalism. <br/><br/>We inform you that we are at your disposal for any further information and additional clarification throught the e-mail: <font color="#b69757">export.italbox@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;">'+
        '<font color="#b69757">HELP</font><br/><br/><p><i>Join our catalogs anywhere and in any space, by a quick and intuitive way. </i><br />'+
        '<i>Consult all our products and all the details with the APP ITALBOX. </i><br />'+
        '<i>Select and share your Bookmarks.</i></p><br/><p>Do you need HELP?  Follow our tips in here.</p>'+
        '<p>When you open this application, you have access to the menus which allows you to explore all that you are looking for:<br /><br />'+
        '<i class="icon-italbox"></i> – ITALBOX MENU – company profile<br /><i class="icon-catalogos"></i> – CATALOG MENU – Catalogs Access. <br />'+
        '<i class="icon-star"></i> – FAVORITES MENU – storing your main pages or your favorites products .<br />'+
        '<i class="icon-mundo-catalogos"></i> – LANGUAGES MENU – switch language </p><br /><p><font color="#b69757"><strong>Browsing Tips</strong></font><br /><br />'+
        'All the informations is at your disposal on the MENU main page, however, '+
        'you can switch MENU’s by clicking on the Top bar. In this bar you will find:<br /><br />'+
        '<i class="icon-back"></i> – Fall back<br /><i class="icon-pesquisa"></i> – Research<br /><i class="icon-menu"></i> – Menu<br /><br />'+
        'If the bar is some way hidden, please click on this symbol <i class="icon-baixo"></i> this way you will see it again.'+
        'The content of all Menus will be below at your disposal.<br />'+
        'If you already know the name of the product you want to see, please research it on <i class="icon-pesquisa"></i>.<br /><br />'+
        '<font color="#b69757"><strong>How to consult the Catalogs</strong></font><br /><br />In the catalogs Menu, click on the the catalog that you want to consult.'+
        '<a name="_GoBack" id="_GoBack"></a><br />Confirm you want to acess it.'+
        'Move your finger either for the left side or right side to browsing the catalog pages.'+
        'For a better visualization, you can enlarge the page that you are consulting.<br />'+
        'In the bar below, you will find the number of products at your disposal.'+
        'By tapping the arrow symbol you will have access to all the details of the products. <br />In the right side of the screen,'+
        'you will find also the main functions:<br /><br /><i class="icon-lista"></i> – List of the Catalog Pages<br />'+
        '<i class="icon-star-catalogos"></i> – Bookmark your pages or products<br />'+
        '<i class="icon-partilha"></i> – Share your bookmarks pages or products with your friends</p><br /><p><font color="#b69757"><strong>Consulting Products</strong></font>'+
        '<br /><br />Touch the image product on the bar below to access all the details of the product you are seeing.'+
        'To visualize all EXTRAS of the product tap the button EXTRAS, '+
        'tap the button  <i class="icon-back"></i> to return to the product details. To leave the product details click on the <i class="icon-close"></i> and continue viewing the catalog.<br /><br />'+
        '<font color="#b69757"><strong>Favorites </strong></font><br /><br />To add a bookmark, please select <i class="icon-star-catalogos"></i> '+
        'in the right side of the screen. You will be notified for the operation.<br />'+
        'To see your favorites, please access the main page or the top bar.<br />'+
        'Your Favorites will be separated by pages and products, to consult them, please tap on the tab product.<br />'+
        'You erase your bookmarks by clicking on the <i class="icon-close3"></i>.</p></div>',
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
        open_page: 'Go to page',
        open_favorite: 'Open Favorite',
        open_product: 'Open Product Page',
        open: 'Open',
        add_product: 'Product added to Favorites',
        no_pages: 'Catalog without Pages',
        no_products: 'This page doesn\'t have any Products',
        add_page: 'Page added to Favorites',
        offline: 'Working in Offline Mode',
        offline_error: 'Offline, you need to be Online to view this content',
        exit: 'Exit Application?',
        yes: 'Yes',
        no: 'No',
        cancel: 'Cancel',
        share_page_text: 'Image from the Catalog ',
        share_page_text2: ' shared through the Italbox App',
        share_product_text: 'Image of a Product from the Catalog ',
        share_product_text2: ' shared through the Italbox App',
        },
        {
        id : 3,
        lang : 'fr',
        menu_catalogs:  'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu_fr.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_favorites:  'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu_fr.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_language:  'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu_fr.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help:  'margin:5px 10px 10px 10px; background: url(imgs/icons/ajuda_menu_fr.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        company_html : '<div class="italbox"><img src="imgs/company.jpg"></img><br/><font color="#b69757">ENTREPRISE</font><br/><br/><p>ITALBOX, LDA, entreprise fondée en 1999, fabrique des panneaux et des cabines en étant une réference au Portugal.</br><br/>Le design distinctif et exclusif, l\'excellente dichotomie qualité/prix et l\'importance que nous donnons à la satisfaction du client sont nos caractéristiques d\'identication. Notre expérience et savoir-foire nos permet de rencontrer les solutions prétendu par les clients.</br>Pour que vous puissiez nous connaitre et véri er les modèles que nous produisons, voulez-vous consulter notre web-site: <font color="#b69757">www.italbox.pt</font>.<br/><br/>Par delà des divers gammes de produits du catalogue, nous produisons aussi sur mesures. Les différents hôtels où nous avons appliqué nos produits et solutions sont la reconnaissance de notre professionalisme.<br/><br/>Nous vous informons que nous sommes à votre service pour toutes renseignement supplémentaires à travers de notre e-mail: <font color="#b69757">export.italbox@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;">'+
        '<font color="#b69757">AIDE</font><br/><br/><p><i>Accéder rapidement et intuitivement n’importe où à nos catalogues. </i><br />'+
        '<i>Avec APP ITALBOX vous pouvez voir tous nos produits et leurs détails. </i><br />'+
        '<i>Choisissez et partager vos favoris.</i></p><br/><p>Avez-vous besoin d’aide ? Suivez nos conseils ici.</p>'+
        '<p>Lors de l\'ouverture de l\'application l\'utilisateur a accès aux menus permettant d\'explorer:<br /><br />'+
        '<i class="icon-italbox"></i> – menu Italbox – profil de l’entreprise<br /><i class="icon-catalogos"></i> – menu Catalogues – accès aux catalogues. <br />'+
        '<i class="icon-star"></i> – menu Favoris – archives de vos pages et/ou produits favoris.<br />'+
        '<i class="icon-mundo-catalogos"></i> – menu Langue– changer la langue </p><br /><p><font color="#b69757"><strong>Conseils d’exploration</strong></font><br /><br />'+
        'L’accès à l’information est disponible dans les menus de la page d’accueil, cependant,'+
        'vous pouvez changer à tout moment de menu il suffit de parvenir à la barre du haut.Cette barre est composer par:<br /><br />'+
        '<i class="icon-back"></i> – Rétrocéder<br /><i class="icon-pesquisa"></i> – Rechercher<br /><i class="icon-menu"></i> – Menus<br /><br />'+
        'Si celle-ci est cachée il suffit de faire un clic <i class="icon-baixo"></i> sur pour la faire réapparaître.'+
        'Le contenu de chaque menu est disponible immédiatement en dessous.<br />'+
        'Si vous connaissez déjà le nom du produit que vous voulez <i class="icon-pesquisa"></i>consulter, recherché à travers.<br /><br />'+
        '<font color="#b69757"><strong>Consulter les catalogues</strong></font><br /><br />Sur le menu catalogues faite un clic sur la couverture du catalogue que vous voulez consulter.'+
        '<a name="_GoBack" id="_GoBack"></a><br />Confirmer l’accès au catalogue.'+
        'De suite, passer d’une page à l’autre en faisant glisser votre doigt vers la gauche ou vers la droite.'+
        'Pour une meilleure vue vous pouvez encore augmenter et déplacer l\'image de la page en consultation.<br />'+
        'Sur la barre inférieure vous trouverez les produits existants sur la page de ce visionnement.'+
        'En appuyant sur la flèche vous pourrez accéder aux détails du produit. <br />Sur le côté droit de l\'écran,'+
        'vous trouverez aussi les fonctions suivantes:<br /><br /><i class="icon-lista"></i> – Se reporter aux pages spécifiques du catalogue<br />'+
        '<i class="icon-star-catalogos"></i> – Mettre en pages et/ou des produits comme favori<br />'+
        '<i class="icon-partilha"></i> – Partager les pages et/ou les produits avec des amis</p><br /><p><font color="#b69757"><strong>Consulter les produits</strong></font>'+
        '<br /><br />Sur la barre inferieure vous pouvez avoir accès au détail du produit il suffit de faire un clic sur le même.'+
        'Pour voir les suppléments du produit faite un clic sur EXTRAS '+
        'et rétrocéder sur la flèche <i class="icon-back"></i> pour retourner au détail. Pour sortir faite un clic sur <i class="icon-close"></i> pourfermer et continuer à consulter le catalogue.<br /><br />'+
        '<font color="#b69757"><strong>Favoris </strong></font><br /><br />Pour ajouter une page et/ou un produit au favori utiliser <i class="icon-star-catalogos"></i> '+
        'présenté à votre droite. Vous serez notifié à la réussite de cette opération.<br />'+
        'Pour voir les favoris accéder au menu favori sur la page d\'accueil ou la barre supérieure.<br />'+
        'Les favoris sont divisés par pages et produits, pour une consultation faite un clic sur le séparateur correspondant.<br />'+
        'Vous pouvez encore publier vos favoris, en effaçant des pages et /ou des produits en tapant sur le <i class="icon-close3"></i>.</p></div>',
        italbox : 'ITALBOX',
        catalogs : 'CATALOGUES',
        favorites : 'FAVORIS',
        language : 'LANGUE',
        help : 'AIDE',
        pages: 'PAGES',
        products : 'PRODUITS',
        product : 'Produits',
        favorites_empty: 'Sans Favoris',
        products_empty: 'Sans Résultats',
        search : 'Recherche...',
        search_list : '<div class="lista-pesquisa">'+
            '<img src="http://www.critecns.com/italbox/assets/uploads/imgs/{foto}" style="float:left; height:40px; margin-right:10px;"></img>' +
            '<div><b>Name:</b> <span>{nome}</span></div>' +
            '<div><b>Ref:</b> <span>{ref}</span></div>' +
            '</div>',
        offline_catalogs: 'Vous avez besoin d\'une connexion à Internet pour ouvrir les Catalogues',
        offline_favorites: 'Vous avez besoin d\'une connexion à Internet pour ouvrir les Favoris',
        offline_search: 'Vous avez besoin d\'une connexion à Internet pour ouvrir la Recherche',
        remove_favorite: 'Retirer des Favoris',
        open_page: 'Ouvrir Page',
        open_favorite: 'Ouvrir Favori',
        open_product: 'Ouvrir la page du produit',
        open: 'Ouvrir',
        add_product: 'Produit ajouté aux Favoris',
        no_pages: 'Catalogue sans Pages',
        no_products: 'Cette page n\'est pas encore produits',
        add_page: 'Ajouté au Favoris',
        offline: 'En mode Offline',
        offline_error: 'Offline, vous devez être en Online pour voir ce Contenu',
        exit: 'Quitter l\'application?',
        yes: 'Oui',
        no: 'Non',
        cancel: 'Annuler',
        share_page_text: 'Image du catalogue ',
        share_page_text2: ' partagée sur l\'App Italbox',
        share_product_text: 'Image d\'un produit du catalogue ',
        share_product_text2: ' partagée sur l\'App Italbox',
        },
        {
        id : 4,
        lang : 'es',
        menu_catalogs:  'margin:5px 10px 5px 5px; background: url(imgs/icons/catalogos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_favorites:  'margin:5px 5px 5px 10px; background: url(imgs/icons/favoritos_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_language:  'margin:5px 10px 5px 5px; background: url(imgs/icons/language_menu.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        menu_help:  'margin:5px 10px 10px 10px; background: url(imgs/icons/ajuda_menu_es.png) no-repeat, rgba(255, 255, 255, .4);'+
            'background-size: contain; background-position: center;',
        company_html: '<div class="italbox"><img src="imgs/company.jpg"></img><br/><font color="#b69757">EMPRESA</font><br/><br/><p>Italbox, LDA, es una empresa fundada en 1999 especializada en la fabricación de cabinas de ducha y es una referencia en Portugal.<br/><br/>El diseño propio y único, la dicotomía excelente relación calidad/precio y el centrarse en las satisfacciones del cliente son nuestras señas de identidad. Nuestra experiencia y conocimiento nos permiten encontrar soluciones deseadas por los clientes.<br/><br/>Para conocernos a nosotros y los modelos que producimos, por favor consulte nuestro web-site:  <font color="#b69757">www.italbox.pt</font>.<br/><br/>Al lado de las diferentes gamas de los productos del catálogo, también adaptamos. Los diversos hoteles en cuál nuestros productos y soluciones son aplicados son el reconocimiento de nuestro profissionalismo.<br/>Informamos que estamos a su disposición para cualquier información adicional através del correo electrónico: <font color="#b69757">export.italbox@italbox.pt</font>.</p></div>',
        help_html: '<div style="margin:20px; margin-top:0px !important;">'+
        '<font color="#b69757">AYUDA</font><br/><br/><p><i>Aceda  em qualquer lugar aos nossos catálogos de forma rápida e intuitiva. </i><br />'+
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
        italbox : 'ITALBOX',
        catalogs : 'CATALOGOS',
        favorites : 'FAVORITOS',
        language : 'IDIOMA',
        help : 'AYUDA',
        pages: 'PÁGINAS',
        products : 'PRODUCTOS',
        product : 'Productos',
        favorites_empty: 'No hay Favoritos',
        products_empty: 'No hay Resultados',
        search : 'Búsqueda...',
        search_list : '<div class="lista-pesquisa">'+
            '<img src="http://www.critecns.com/italbox/assets/uploads/imgs/{foto}" style="float:left; height:40px; margin-right:10px;"></img>' +
            '<div><b>Nome:</b> <span>{nome}</span></div>' +
            '<div><b>Ref:</b> <span>{ref}</span></div>' +
            '</div>',
        offline_catalogs: 'Necesitas estar conectado a Internet para acceder a los Catálogos',
        offline_favorites: 'Necesitas estar conectado a Internet para acceder a los Favoritos',
        offline_search: 'Necesitas estar conectado a Internet para acceder a la Búsqueda',
        remove_favorite: 'Eliminar Favorito',
        open_page: 'Abrir Página',
        open_favorite: 'Abrir Favorita',
        open_product: 'Abrir la página del Producto',
        open: 'Abrir',
        add_product: 'Producto añadido a Favoritos',
        no_pages: 'Sin Páginas de catálogo',
        no_products: 'No hay Productos en esta Página',
        add_page: 'Página añadida a Favoritos',
        offline: 'Trabajar en el modo Offline',
        offline_error: 'Offline, usted necesita estar Online para acceder a este contenido',
        exit: 'Salir de la Aplicación?',
        yes: 'Sí',
        no: 'No',
        cancel: 'Cancelar',
        share_page_text: 'Imagen del Catalogo ',
        share_page_text2: ' compartida a través de la aplicación Italbox',
        share_product_text: 'Imagen de Produto del Catalogo ',
        share_product_text2: ' compartida a través de la aplicación Italbox',
        },
        ]
    }
});