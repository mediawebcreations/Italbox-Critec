Ext.define('ItalboxCatalog.store.Favorites2', {
    extend: 'Ext.data.Store',
     
    config: {
     model: 'ItalboxCatalog.model.Favorite2',
     autoLoad: true,
      
     proxy: {
      //use sessionstorage if need to save data for that
      //specific session only
      type: 'localstorage',
         id  : 'Favorite2Key'
     }
    }
});