Ext.define('ItalboxCatalog.store.Languages', {
    extend: 'Ext.data.Store',
    config:{
        autoLoad: true,
        fields: [
            { name: 'id', type: 'int' },
            { name: 'lang', type: 'string' },
            { name: 'company_title', type: 'string' },
            { name: 'company_text', type: 'string' },
            { name: 'help_title', type: 'string' },
            { name: 'help_text', type: 'string' },
            { name: 'italbox', type: 'string' },
            { name: 'catalogs', type: 'string' },
            { name: 'favorites', type: 'string' },
            { name: 'language', type: 'string' },
            { name: 'help', type: 'string' },
        ],
        data : [
        {
        id : 1,
        lang : 'pt',
        company_title : 'EMPRESA',
        company_text : 'A ITALBOX, LDA, empresa portuguesa fundada em 1999, é uma empresa especializada no fabrico de cabines de banho com design próprio e exclusivo, e uma excelente dicotomia qualidade/preço. Com uma equipa de 62 colaboradores, a Italbox é líder no mercado Português e tem apresentado taxas de crescimentono volume de negócios de 20% por ano, nos últimos 5 anos.<br/>Em 2011 lançou o novo catalogo com uma nova linha de produtos que completa, no nosso entender, soluções que não estavam contempladas no nosso anterior catálogo.<br/>Lançamos também um catálogo de móveis de casa de banho, de fabrico próprio, no sentido de complementar a oferta.<br/>Para que possam verificar os modelos que produzimos, queiram consultar o nosso Web site: <font color="#b69757">www.italbox.pt</font>.<br/>Informamos que estamos ao vosso dispor para qualquer informação e esclarecimento adicional através do e-mail: <font color="#b69757">comercial@italbox.pt</font>.',
        help_title: 'AJUDA',
        help_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        italbox : 'ITALBOX',
        catalogs : 'CATALOGOS',
        favorites : 'FAVORITOS',
        language : 'IDIOMA',
        help : 'AJUDA',
        },
        {
        id : 2,
        lang : 'en',
        company_title : 'COMPANY',
        company_text : 'ITALBOX, LDA, is a company founded in 1999 specialized in the manufacture of shower cabins being a reference in Portugal.<br/> The own and unique design, the excellent dichotomy quality/price and the focus on the clients satisfactions are our identifying characteristics.<br/> Our experience and know-how allow us to find solutions desired by the clients. So you can meet us and the models that we produce, please consult our web-site: <font color="#b69757">www.italbox.pt</font>.<br/> Beside the various ranges of the catalog products, we also produce by mesure. The various hotels which our products and solutions are applied are the recognition of our profissionalism. <br/>We inform you that we are at your disposal for any further information and additional clarification throught the e-mail: <font color="#b69757">export.italbox@italbox.pt</font>.',
        help_title: 'HELP',
        help_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        italbox : 'ITALBOX',
        catalogs : 'CATALOGS',
        favorites : 'FAVORITES',
        language : 'LANGUAGE',
        help : 'HELP',
        },
        ]
    }
});