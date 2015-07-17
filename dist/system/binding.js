System.register(['knockout', 'cloudinary-url-resolver/resolver', './utilities'], function (_export) {
  'use strict';

  var ko, resolver, isString, isUndefined, resolveFallback, addPresetsToTransformations, update;
  return {
    setters: [function (_knockout) {
      ko = _knockout['default'];
    }, function (_cloudinaryUrlResolverResolver) {
      resolver = _cloudinaryUrlResolverResolver['default'];
    }, function (_utilities) {
      isString = _utilities.isString;
      isUndefined = _utilities.isUndefined;
    }],
    execute: function () {
      resolveFallback = function resolveFallback(key) {
        var saved = ko.bindingHandlers.cloudinaryUrl.settings.fallbacks[key];
        if (isUndefined(saved)) {
          return key;
        } else {
          return saved;
        }
      };

      addPresetsToTransformations = function addPresetsToTransformations(transformations, presets) {
        if (isString(presets)) {
          presets = [presets];
        }

        var preset;
        for (var i in presets) {
          preset = presets[i];
          if (isUndefined(preset)) {
            throw new Error(preset + ' is not a defined preset');
          }

          for (var type in preset) {
            transformations[type] = preset[type];
          }
        }
      };

      update = function update(element, valueAccessor, allBindings) {
        var transformations = allBindings.get('transformations') || {};
        var settings = allBindings.get('settings') || {};
        var presets = allBindings.get('presets') || [];

        var public_id = ko.unwrap(valueAccessor());
        var isFile = allBindings.get('isFile') || false;
        var fallback = resolveFallback(allBindings.get('fallback') || settings.defaultFallback);

        addPresetsToTransformations(transformations, presets);

        var url;
        if (public_id === null || public_id === '' || typeof public_id === 'undefined') {
          url = settings.resolveFallbacks ? resolver(fallback, transformations, isFile) : fallback;
        } else {
          url = resolver(public_id, transformations, isFile);
        }

        var tag = element.tagName.toLowerCase();
        switch (tag) {
          case 'a':
            element.href = url;
            break;
          case 'img':
            element.src = url;
            break;
          default:
            break;
        }
      };

      ko.bindingHandlers.cloudinaryUrl = {
        settings: ko.utils.extend({
          defaultFallback: null,
          fallbacks: {},
          presets: {},
          resolveFallbacks: false
        }, resolver.settings),
        extend: function extend(settings) {
          ko.utils.extend(resolver.settings, settings);
          ko.utils.extend(this.settings, settings);
        },
        update: update
      };
    }
  };
});