
# Folder Structure

Take the directory structure of the sample Mini Program [Calories](/docs/1.0/samples/app/calories/) as an example:

```
.  
├── app-side // companion service directory  
│ └── index.js // companion service logic, which is also the entry file for setting the app (the path can be configured in app.json)  
├── setting // set the application directory  
│ ├── i18n // set the application multilingual directory  
│ │ └── en-US.po  
│ └── index.js // set the application logic, also set the application entry file (path can be configured in app.json)  
├── app.js // Mini Program logic  
├── app.json // Mini Program configuration  
├── assets // The directory where the resource files for different devices are stored is named after the key of the targets object in app.json  
│ ├── gtr-3  
│ │ ├── icon.png  
│ │ └── image  
│ │ └── logo.png  
│ ├── gtr-3-pro  
│ │ ├── icon.png  
│ │ └─ image  
│ │ └── logo.png  
│ └── gts-3  
│ ├── icon.png  
│ └── image  
│ └── logo.png  
├── page // Device application page  
│ ├── home // device application home directory (one directory for one page is recommended)  
│ │ ├── index.page.js // page logic  
│ │ └── index.style.js // page style  
│ └── i18n // Device application multilingual directory  
│ └── en-US.po  
└── utils // Tools and functions directory  
    ├── constants.js  
    ├── fs.js  
    └── index.js  

```
## Separate style files[​](/docs/1.0/guides/architecture/folder-structure/#separate-style-files "Direct link to Separate style files")

It is recommended to follow the principle of separating "style" and "behavior" in the organization of the page code, so that the style configuration can be separated into a separate `style.js` file to reduce the code of the page logic, and it is convenient to do the [screen adaptation](/docs/1.0/guides/best-practice/multi-screen-adaption/) work in `styles.js`.

## i18n Multilingual[​](/docs/1.0/guides/architecture/folder-structure/#i18n-multilingual "Direct link to i18n Multilingual")

Files in the `/i18n` directory must meet the file naming convention of `${key}.po`, where `key` is the country code abbreviation.

Please refer to [Multilingual Mapping](/docs/1.0/reference/related-resources/language-list/) for the multilingual-country reference relationship.

