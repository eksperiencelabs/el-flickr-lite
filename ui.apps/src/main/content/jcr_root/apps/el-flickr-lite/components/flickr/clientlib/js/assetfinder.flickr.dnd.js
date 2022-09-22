/*
 * #%L
 * Adobe AEM6 demo for authoring extension point: Flickr Assetfinder
 * %%
 * Copyright (C) 2015 Adobe
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
(function ($, ns, channel, window, undefined) {

    var name = 'Flickr';

    function FlickrImageDragAndDrop() {}
    ns.util.inherits(FlickrImageDragAndDrop, ns.ui.assetFinder.AssetDragAndDrop);
   
    FlickrImageDragAndDrop.prototype.handleDrop = function (event) {
        var editable = event.currentDropTarget.targetEditable,
            dropTargetId = $(event.target).attr('data-asset-id'),
            dropTarget, properties;

            dropTarget = editable.getDropTarget(dropTargetId);
            properties = this.prepareProperties(event, dropTarget);

            // remark: component might be synthetic then create the node
            // that's why we ignore the fact when the server will fire a read error
            ns.persistence.readParagraphContent(editable).always(function(data) {
                var originalData;

                try {
                    originalData = JSON.parse(data);
                } catch (ex) {
                    originalData = {};
                }

                ns.edit.actions.doUpdate(editable, properties).done(function () {
                    ns.history.util.Utils.addUpdateParagraphStep(editable.path, editable.type, originalData, properties);
                    ns.selection.select(editable);
                });
            });

    };
    FlickrImageDragAndDrop.prototype.prepareProperties = function (event, dropTarget) {
        var properties = {};
		if(!dropTarget) return properties;
		if(dropTarget.dom  && dropTarget.dom.length >0 && dropTarget.dom[0].className.indexOf('flickr') < 0){
			return properties;
		}
        properties[dropTarget.name] = event.path;

        for (j in dropTarget.params) {
            if (dropTarget.params.hasOwnProperty(j)) {
                properties[j] = dropTarget.params[j];
            }
        }

        for (j in event.param) {
            if (event.param.hasOwnProperty(j)) {
                properties[j] = event.param[j];
            }
        }
       
        properties["./fileReference"]= event.path;
          return properties;
    };
  
    // register the controller at the dispatcher
    ns.ui.dropController.register(name, new FlickrImageDragAndDrop());

}(jQuery, Granite.author, jQuery(document), this));
