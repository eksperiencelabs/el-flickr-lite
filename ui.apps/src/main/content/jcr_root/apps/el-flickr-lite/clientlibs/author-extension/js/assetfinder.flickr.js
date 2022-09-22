/*
 * #%L
 * Adobe AEM6 demo for authoring extension point: Flickr Assetfinder
 * %%
 * Copyright (C) 2014 Adobe
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
(function ($, author, channel, window, undefined) {

    var self = {},
        flickerAPI = getFlickrApi(),
        name = 'Flickr';
    function getFlickrApi() {
        return $.ajax({
            type: "GET",
            url: "/bin/assetapiinfo.json",
            async: false
        }).responseJSON;
    }
     if(flickerAPI.disablePlugin){
		delete author.ui.assetFinder.registry[name];
		return;
	}
    /**
     * simple "template" function to render an image in the assetfinder
     * @param  {String} src URL to the image
     * @return {String} markup for the image
     */
    function imageTemplate(metadata) {
    	delete metadata.description;
    	var metadataStr = JSON.stringify(metadata), title;
    	title = metadata.title.trim() ? metadata.title.trim()  : metadata.media.m.substring(metadata.media.m.lastIndexOf("/") + 1);;
    	//metadataStr = metadataStr.replace(/'/g,"&quot;") ;
    	
    	
        var html = 
       " <coral-card class='editor-Card-asset card-asset cq-draggable u-coral-openHand coral3-Card' draggable='true' data-path='" + metadata.media.m +
       "' data-asset-group='media' data-type='" + name + "' data-param='{&quot;./imageMap@Delete&quot;:&quot;&quot;,&quot;./imageCrop@Delete&quot;:&quot;&quot;,&quot;./imageRotate@Delete&quot;:&quot;&quot;}'" +
       " data-metadata='"+ metadataStr +
       "' data-asset-mimetype='image/jpeg'> "+
      " <div class='coral3-Card-wrapper'></div><coral-card-asset>"+
       "        <img class='cq-dd-image' src='"+ metadata.media.m +"' alt='"+ title +"'>"+
       "    </coral-card-asset><coral-card-info>"+
      "       </coral-card-info><div class='coral3-Card-wrapper'><coral-card-content>"+
       "        <coral-card-title class='foundation-collection-item-title coral3-Card-title' title='"+ title +"'>"+ title +"</coral-card-title>"+
    
        "      <coral-card-propertylist>"+
        "           <coral-card-property class='coral3-Card-property'><coral-card-property-content></coral-card-property-content></coral-card-property>"+
        "       </coral-card-propertylist>"+
        "   </coral-card-content></div></coral-card>"
       ;
       
        return html;
       
    }

    /**
     * function to parse search predicates query into flickr api request parameters
     * @param  {String} query search predicates query
     * @return {String} request parameters object
     */
    function parseQuery(query) {
        var geoStart,
            text = '',
            geocontext = "";
        if(query.length > 0) {
            geoStart = query.indexOf('"');
            //text = geoStart !== -1 ? query.substring(0, geoStart) : "";
            text = query.trim();
            geocontext = geoStart !== -1 ? query.substring(geoStart, query.length).split(':')[1] : "";
        }

        return {
            text: text,
            geocontext: geocontext
           
        };
    }

    /**
     * Load assets from the public flickr stream. Any search options are ignored.
     *
     * @param query {String} search query
     * @param lowerLimit {Number} lower bound for paging
     * @param upperLimit {Number} upper bound for paging
     * @returns {jQuery.Promise}
     */
   self.loadAssets = function (query, lowerLimit, upperLimit) {
        var def = $.Deferred();

        var params = parseQuery(query);
        page = lowerLimit/20;
        params.page = page;
       

        $.getJSON(flickerAPI.apiUrl, {
        	format: "json",
            text: params.text,
            geo_context: parseInt(params.geocontext.replace('"',"")),
            tagmode: "any",
            page: page,
            data: params
        }).done(function (data) {
            var output = '';

            for (var i=0; i < data.items.length; i++) {
                output += imageTemplate(data.items[i]);
            }

            def.resolve(output);
        });
        return def.promise();
    };

  
    // register as a asset tab
    author.ui.assetFinder.register(name, self);

}(jQuery, Granite.author, jQuery(document), this));
