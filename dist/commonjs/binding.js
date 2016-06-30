'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _cloudinaryUrlResolver = require('cloudinary-url-resolver');

var _cloudinaryUrlResolver2 = _interopRequireDefault(_cloudinaryUrlResolver);

var _utilities = require('./utilities');

var resolveFallback = function resolveFallback(key) {
  var saved = _knockout2['default'].bindingHandlers.cloudinaryUrl.settings.fallbacks[key];
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
    preset = _knockout2['default'].bindingHandlers.cloudinaryUrl.settings.presets[presets[i]];
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

  var public_id = _knockout2['default'].unwrap(valueAccessor());
  var isFile = allBindings.get('isFile') || false;
  var fallback = resolveFallback(allBindings.get('fallback') || settings.defaultFallback);

  addPresetsToTransformations(transformations, presets);

  var url;
  if (public_id === null || public_id === '' || typeof public_id === 'undefined') {
    url = settings.resolveFallbacks ? _cloudinaryUrlResolver2['default'](fallback, transformations, isFile) : fallback;
  } else {
    url = _cloudinaryUrlResolver2['default'](public_id, transformations, isFile);
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

_knockout2['default'].bindingHandlers.cloudinaryUrl = {
  settings: _knockout2['default'].utils.extend({
    defaultFallback: null,
    fallbacks: {},
    presets: {},
    resolveFallbacks: false
  }, _cloudinaryUrlResolver2['default'].settings),
  extend: function extend(settings) {
    _knockout2['default'].utils.extend(_cloudinaryUrlResolver2['default'].settings, settings);
    _knockout2['default'].utils.extend(this.settings, settings);
  },
  update: update
};