var SiteFemturis = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
    	
    	// Do the ajax call		    	    	    	
        $.ajax({
        		url: "http://www.femturisme.cat/XHR_mobile_llistat_rutes.php?pIdioma=ca&desc=" + searchKey,
        		// Callback (onsuccess) 
        		success: function(data){
        			/** Transform jsonString into array*/ 			        			        			
        			var arrRutes = $.parseJSON(data);
        			
        			var rutes = [];
					/** Transform array into an array of JSONs */
				  	if (arrRutes.length > 0){				  
				    	for (var i=0; i<arrRutes.length; i++){    		
				     	 rutes.push({"name" : arrRutes[i].name, "param_url" : arrRutes[i].param_url});
				    	}
				 	}				  	
				  	
				  	callLater(callback, rutes);			      	 			      	
        		},
        		error:function(){
        			// Alert the user that something went wrong
        			var rutes = [];
        			callLater(callback, rutes);			      
        		}
        	});        			
		                           
    }

    this.findById = function(id, callback) {        
        var ruta = null;
        
        callLater(callback, ruta);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

	/** {"name": "nom ruta", "param_url": "param"}, */
    this.rutes = [            
        ];

    callLater(successCallback);

}