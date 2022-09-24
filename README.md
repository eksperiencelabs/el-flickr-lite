# EL Flickr Asset Finder Extension - AEM 6.5

## Features

This project is an extension of [aem-authoring-extension-assetfinder-flickr](https://github.com/Adobe-Marketing-Cloud/aem-authoring-extension-assetfinder-flickr). There has been no updates from 6.3, it has been modified to provide support for 6.5 with more features

Following are the  features added in this project
- `Latest archetype and api support`: Built with archetype 37 and latest api changes.
- `Lazy Loading with Pagination`: Pagination support for lazy loading to load more assets from flickr api, AEM sends page parameter to jsonCallback, however there is no support on flickr api to load more assets based on page.
- `Drag/Drop support` : Drag and drop support to custom flickr component. 
- `OSGI Configuration support` : Flickr api is configured in osgi. 
- `Enable/Disable Plugin`: Plugin can be enabled/disabled from the checkbox option in OSGI configuration


Our Pro version has additional features

- `Asset Download`: Asset is downloaded to AEM from Flickr as soon as author drops  on the component
- `OOTB support` : Out of the Box core components with image field can be used for drag and drop options. 
- `Metadata`: All the metadata values from Flickr REST API are stored on the DAM Asset path in AEM
- `Tags`:  Taxomonies from Flickr REST API are created and stored in AEM Tagging Structure
- `Structured DAM`: External DAM assets are stored in organized and structured folders in AEM Assets, structure is based on the external URL path
- `Customizable`: API url, DAM path are fully configurable in OSGI settings making it to extend for other REST based DAM Asset API Providers

Please [contact us](https://eksperiencelabs.com/contact/ ) if you are interested in learning about our pro version. 


## Modules

The main parts of the template are:

* core: Java bundle containing all core functionality like OSGi services, listeners or schedulers, as well as component-related Java code such as servlets or request filters.
* it.tests: Java based integration tests
* ui.apps: contains the /apps (and /etc) parts of the project, ie JS&CSS clientlibs, components, and templates
* ui.content: contains sample content using the components from the ui.apps
* ui.config: contains runmode specific OSGi configs for the project
* ui.frontend: an optional dedicated front-end build mechanism (Angular, React or general Webpack project)
* ui.tests: Selenium based UI tests
* all: a single content package that embeds all of the compiled modules (bundles and content packages) including any vendor dependencies
* analyse: this module runs analysis on the project which provides additional validation for deploying into AEMaaCS

## How to build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

To build all the modules and deploy the `all` package to a local instance of AEM, run in the project root directory the following command:

    mvn clean install -PautoInstallSinglePackage

Or to deploy it to a publish instance, run

    mvn clean install -PautoInstallSinglePackagePublish

Or alternatively

    mvn clean install -PautoInstallSinglePackage -Daem.port=4503

Or to deploy only the bundle to the author, run

    mvn clean install -PautoInstallBundle

Or to deploy only a single content package, run in the sub-module directory (i.e `ui.apps`)

    mvn clean install -PautoInstallPackage


## Uninstall

There is some issue with custom asset finders, directly uninstalling the package or removing from crx/de may not uninstall completlely. You may still see the custom extension in dropdown. To remove custom assetFinder options 
1. Disable the plugin from osgi configuration Experience Labs - Flickr  Asset Config Service 
2. Invoke sample content page in author, verify there is no Flickr  option in Asset finder drop down  
2. Uninstall the el-flickr-lite.all package from package manager 

 Sometimes uninstall doesn't do proper cleanup, perform cleanup by following the following steps
1. Check for any folders starting wiht el-flickr under apps in crxde and delete them all.
2. Check system console bundles and delete any bundle starting with Experience Labs - Asset Finder Extension for Flickr
3. Delete any OSGI configurations starting or ending with el-flickr-lite
4. Delete OSGI configuration named with Experience Labs - Flickr  Asset Config Service

## Testing

There are three levels of testing contained in the project:

### Unit tests

This show-cases classic unit testing of the code contained in the bundle. To
test, execute:

    mvn clean test

### Integration tests

This allows running integration tests that exercise the capabilities of AEM via
HTTP calls to its API. To run the integration tests, run:

    mvn clean verify -Plocal

Test classes must be saved in the `src/main/java` directory (or any of its
subdirectories), and must be contained in files matching the pattern `*IT.java`.

The configuration provides sensible defaults for a typical local installation of
AEM. If you want to point the integration tests to different AEM author and
publish instances, you can use the following system properties via Maven's `-D`
flag.

| Property | Description | Default value |
| --- | --- | --- |
| `it.author.url` | URL of the author instance | `http://localhost:4502` |
| `it.author.user` | Admin user for the author instance | `admin` |
| `it.author.password` | Password of the admin user for the author instance | `admin` |
| `it.publish.url` | URL of the publish instance | `http://localhost:4503` |
| `it.publish.user` | Admin user for the publish instance | `admin` |
| `it.publish.password` | Password of the admin user for the publish instance | `admin` |

The integration tests in this archetype use the [AEM Testing
Clients](https://github.com/adobe/aem-testing-clients) and showcase some
recommended [best
practices](https://github.com/adobe/aem-testing-clients/wiki/Best-practices) to
be put in use when writing integration tests for AEM.

## Static Analysis

The `analyse` module performs static analysis on the project for deploying into AEMaaCS. It is automatically
run when executing

    mvn clean install

from the project root directory. Additional information about this analysis and how to further configure it
can be found here https://github.com/adobe/aemanalyser-maven-plugin

### UI tests

They will test the UI layer of your AEM application using Selenium technology. 

To run them locally:

    mvn clean verify -Pui-tests-local-execution

This default command requires:
* an AEM author instance available at http://localhost:4502 (with the whole project built and deployed on it, see `How to build` section above)
* Chrome browser installed at default location

Check README file in `ui.tests` module for more details.

## ClientLibs

The frontend module is made available using an [AEM ClientLib](https://helpx.adobe.com/experience-manager/6-5/sites/developing/using/clientlibs.html). When executing the NPM build script, the app is built and the [`aem-clientlib-generator`](https://github.com/wcm-io-frontend/aem-clientlib-generator) package takes the resulting build output and transforms it into such a ClientLib.

A ClientLib will consist of the following files and directories:

- `css/`: CSS files which can be requested in the HTML
- `css.txt` (tells AEM the order and names of files in `css/` so they can be merged)
- `js/`: JavaScript files which can be requested in the HTML
- `js.txt` (tells AEM the order and names of files in `js/` so they can be merged
- `resources/`: Source maps, non-entrypoint code chunks (resulting from code splitting), static assets (e.g. icons), etc.

## Maven settings

The project comes with the auto-public repository configured. To setup the repository in your Maven settings, refer to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html
