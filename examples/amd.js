requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        'dist': "../dist",
        'examples': '../examples',

        'knockout': 'knockout/dist/knockout',

        'cloudinary-url-resolver': 'cloudinary-url-resolver/dist/amd'
    }
});

requirejs(['knockout', 'dist/amd/binding'], function(ko, binding){
  ko.bindingHandlers.cloudinaryUrl.extend({
    cloud_name: 'traede',
    presets: {
      'user': {
        'height': 50,
        'width': 100,
        'crop': 'fill'
      }
    },
    fallbacks: {
      'user': '/img/user.png'
    }
  });

  var viewmodel = {
    transformations: {
      width: 100,
      height: 500
    },
    settings: {
      resolveFallbacks: false,
      fallbacks: {
        'test': '/img/lort.png'
      }
    }
  };

  ko.applyBindings(viewmodel, document.getElementById('root'));
});
