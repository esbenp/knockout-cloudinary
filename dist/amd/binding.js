define(['exports', 'knockout', 'cloudinary-url-resolver/resolver', './utilities'], function (exports, _knockout, _cloudinaryUrlResolverResolver, _utilities) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _ko = _interopRequireDefault(_knockout);

  var _resolver = _interopRequireDefault(_cloudinaryUrlResolverResolver);

  var resolveFallback = function resolveFallback(key) {
    var saved = _ko['default'].bindingHandlers.cloudinaryUrl.settings.fallbacks[key];
    if (_utilities.isUndefined(saved)) {
      return key;
    } else {
      return saved;
    }
  };

  var addPresetsToTransformations = function addPresetsToTransformations(transformations, presets) {
    if (_utilities.isString(presets)) {
      presets = [presets];
    }

    var preset;
    for (var i in presets) {
      preset = _ko['default'].bindingHandlers.cloudinaryUrl.settings.presets[presets[i]];
      if (_utilities.isUndefined(preset)) {
        throw new Error(presets[i] + ' is not a defined preset');
      }

      for (var type in preset) {
        transformations[type] = preset[type];
      }
    }
  };

  var update = function update(element, valueAccessor, allBindings) {
    var transformations = allBindings.get('transformations') || {};
    var settings = allBindings.get('settings') || {};
    var presets = allBindings.get('presets') || [];

    var public_id = _ko['default'].unwrap(valueAccessor());
    var isFile = allBindings.get('isFile') || false;
    var fallback = resolveFallback(allBindings.get('fallback') || settings.defaultFallback);

    addPresetsToTransformations(transformations, presets);

    var url;
    if (public_id === null || public_id === '' || typeof public_id === 'undefined') {
      url = settings.resolveFallbacks ? _resolver['default'](fallback, transformations, isFile) : fallback;
    } else {
      url = _resolver['default'](public_id, transformations, isFile);
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

  _ko['default'].bindingHandlers.cloudinaryUrl = {
    settings: _ko['default'].utils.extend({
      defaultFallback: null,
      fallbacks: {},
      presets: {},
      resolveFallbacks: false
    }, _resolver['default'].settings),
    extend: function extend(settings) {
      _ko['default'].utils.extend(_resolver['default'].settings, settings);
      _ko['default'].utils.extend(this.settings, settings);
    },
    update: update
  };
});