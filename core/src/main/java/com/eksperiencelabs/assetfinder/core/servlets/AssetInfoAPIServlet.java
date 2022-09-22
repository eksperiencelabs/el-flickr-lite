package com.eksperiencelabs.assetfinder.core.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Servlet;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.eksperiencelabs.assetfinder.core.config.AssetConfigService;
import com.google.gson.JsonObject;

//This is a component so it can provide or consume services

@Component(service = Servlet.class, configurationPid = "com.taqalytics.asset.finder.flickr.core.servlets.AssetInfoAPIServlet", property = {
		"sling.servlet.paths=/bin/assetapiinfo", "sling.servlet.methods=GET",
		"sling.servlet.extensions=json" }, immediate = true)
public class AssetInfoAPIServlet extends org.apache.sling.api.servlets.SlingAllMethodsServlet {
	private static final long serialVersionUID = 2598426539166789515L;

	private Logger LOGGER = LoggerFactory.getLogger(AssetInfoAPIServlet.class);

	@Reference
	transient  AssetConfigService assetConfigService;

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		doGet(request, response);

	}

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
		JsonObject jsonobject = new JsonObject();
		PrintWriter out = null;

		try {
			out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			jsonobject.addProperty(AssetConfigService.API_URL, assetConfigService.getApiUrl());
			jsonobject.addProperty(AssetConfigService.DISABLE_PLUGIN, assetConfigService.isDisablePlugin());

			// Save the uploaded file into the Adobe CQ DAM
			out.println(jsonobject.toString());

		}

		catch (Exception e) {
			LOGGER.error(" Unable to config file ", e);
			out.println("{}");
		}

	}

}