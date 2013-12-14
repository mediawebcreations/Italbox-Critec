Ext.define('ItalboxCatalog.store.Favorites', {
    extend: 'Ext.data.Store',
     
    config: {
     model: 'ItalboxCatalog.model.Favorite',
     autoLoad: true,
      
     proxy: {
      //use sessionstorage if need to save data for that
      //specific session only
      type: 'localstorage',
         id  : 'FavoriteKey'
     }
    }
});