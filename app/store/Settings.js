Ext.define('ItalboxCatalog.store.Settings', {
    extend: 'Ext.data.Store',
     
    config: {
     model: 'ItalboxCatalog.model.Setting',
     autoLoad: true,
      
     proxy: {
      //use sessionstorage if need to save data for that
      //specific session only
      type: 'localstorage',
         id  : 'SettingKey'
     }
    }
});