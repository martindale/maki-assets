var rack = require('asset-rack');

var self = {};
self.debug = process.env.DEBUG || false;

/* use AssetRack to minify and cache static objects */
/* NOTE: these are all specific (for now) to Maki */
var assets = new rack.Rack([
  // expose Jade templates to the browser as Javascript functions
  // this lets us wire up Angular to render them, if available
  new rack.JadeAsset({
      url: '/js/templates.js',
      dirname: 'app/views',
      clientVariable: 'Templates',
      watch: self.debug,
      // strip out layouts (we don't want them)
      // this is so inheritance works in the browser
      // maybe we can utilize React or some similar component-
      // based system to handle this?
      beforeCompile: function( input ) {
        return input.replace(/extends (.*)\n/, '');
      }
  }),
  new rack.StaticAssets({
    urlPrefix: '/',
    dirname: 'public'
  }),
  new rack.LessAsset({
    url: '/css/bootstrap.css',
    filename: 'private/less/bootstrap.less'
  }),
  new rack.LessAsset({
    url: '/css/font-awesome.css',
    filename: 'private/less/fontawesome/font-awesome.less'
  }),
  new rack.LessAsset({
    url: '/css/maki.css',
    filename: 'private/less/maki.less'
  }),
  /*/new rack.DynamicAssets({
    type: rack.LessAsset,
    urlPrefix: '/css',
    dirname: 'private/css'
  })/**/
]);

module.exports = assets.handle;
