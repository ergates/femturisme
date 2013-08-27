var HomeView = function(femturis) {
 
 	this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '#submitButton', this.findByName);
    };
    
    this.render = function() {   	
        this.el.html(HomeView.template(homeTranslations));  /** put the template on the body */       
    	return this;
    };
    
    
    this.findByName = function() {
    	             	
    	$('#results_ul').html(HomeView.loadingLiTemplate(searchRutesTranslation));
    	       
        femturis.findByName($('#ruta_nom_input').val(), function(rutes) {
        	
        	if (rutes.length>0) {
        		/** Add rutes to actual translations */
        		searchRutesTranslation["rutes"]=rutes;
        		
        		$('#results_ul').html(HomeView.liTemplate(searchRutesTranslation));
        		
        		/** Leave object translation as orignal */
        		delete searchRutesTranslation["rutes"];
        	        	
	        	if (self.iscroll) {
		            console.log('Refresh iScroll');
		            self.iscroll.refresh();
		        } else {
		            console.log('New iScroll');
		            self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
		        }
	        } else {        	
	        	$('#results_ul').html(HomeView.noLiTemplate(searchRutesTranslation));
	        }           
        });
    },
 
    this.initialize();
    
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#rutes-li-tpl").html());
HomeView.noLiTemplate = Handlebars.compile($("#rutes-no-li-tpl").html());
HomeView.loadingLiTemplate = Handlebars.compile($("#rutes-loading-li-tpl").html());