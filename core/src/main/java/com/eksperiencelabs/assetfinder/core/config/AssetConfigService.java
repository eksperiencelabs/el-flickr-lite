package com.eksperiencelabs.assetfinder.core.config;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@Component(immediate = true, service = AssetConfigService.class)
@Designate(ocd = AssetConfigService.Configuration.class)
public class AssetConfigService {

	public static final String API_URL = "apiUrl";

	public static final String DISABLE_PLUGIN = "disablePlugin";

	@ObjectClassDefinition(name = "Experience Labs - Flickr  Asset Config Service", description = "AssetConfigService")
	public @interface Configuration {

		@AttributeDefinition(name = "API Url", description = "API Url endpoint")
		String apiUrl() default "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

		@AttributeDefinition(name = "Disable plugin", description = "Check this box to disable dropbox dam plugin ")
		public boolean disablePlugin() default false;

	}

	private Configuration config;

	public String getApiUrl() {
		return config.apiUrl();
	}

	public boolean isDisablePlugin() {
		return config.disablePlugin();

	}

	@Activate
	@Modified
	protected void activate(Configuration config) {
		this.config = config;
	}
}
