package com.eksperiencelabs.assetfinder.core.models;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/**
 * Sling Model for Flickr Integration. This model is responsible for fetching
 * all image related information that author has configured via dialog.
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FlickrModel {

	@SlingObject
	private Resource currentResource;

	@SlingObject
	private SlingHttpServletRequest request;

	private String flickrImg;

	@ValueMapValue
	private String caption;
	@ValueMapValue
	private String altText;

	@PostConstruct
	public void init()  {

		final String fileReference = String.valueOf(currentResource.getValueMap().get("fileReference"));
		final String uri = fileReference.split("\\?")[0];

		flickrImg = uri;

	}

	public String getCaption() {
		return caption;
	}

	public String getAltText() {
		return altText;
	}

	public String getFlickrImg() {
		return flickrImg;
	}

}