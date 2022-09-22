(function($, $document, ns) {
	var FILE_UPLOAD_SELECTOR = '.cq-dialog .cq-FileUpload';

	function imageProcessing(path, operation) {
		var $element = $document.find(FILE_UPLOAD_SELECTOR);
		if (operation === 'imageUpload') {
			$element.find('.show-grid.cq-dd-image').attr('src', path);

			$element.find('[name="./fileReference"]').val(path);
		} else {
			$element.find('.show-grid.cq-dd-image').attr('src', "");

			$element.find('[name="./fileReference"]').val("");
		}

	}
	function registerFlickrImageDrop(widget) {
		// when the image is drag n dropped from asset finder
		widget.on('assetselected', handleFlickrImageDrop);

		function handleFlickrImageDrop(event) {
			
			imageProcessing(event.path, 'imageUpload');
		

		}
	}
	function getThumbnailHtml(path) {
		return "<img class='cq-dd-image' src='" + path + "'>";
	}
	$document.on("dialog-loaded", function() {
		var $element = $document.find(FILE_UPLOAD_SELECTOR);

			$('.cq-FileUpload-thumbnail-img').html(getThumbnailHtml($('[name="./fileReference"]').val()));

	});

	$(document).on('click', '.cq-FileUpload-clear', function() {
		var $element = $document.find(FILE_UPLOAD_SELECTOR);

		imageProcessing($element, 'clear');
	});
})(jQuery, jQuery(document), Granite.author);