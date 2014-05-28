var moment = require('alloy/moment');

_.extend(this, {
	delay: 2000,

	construct: function(config) {
		$.setArgs(config);
	},

	setArgs: function(config) {
		if(config.delay)
			$.delay = config.delay;

		var properties = {
			left: config.left,
			right: config.right,

			enabled: config.enabled
		};

		if (config.buttonType) {
			if (OS_IOS) {
				switch (config.buttonType) {
					case 'add':
						$.button.systemButton = Ti.UI.iPhone.SystemButton.ADD;
						break;
					case 'cancel':
						$.button.systemButton = Ti.UI.iPhone.SystemButton.CANCEL;
						break;
					case 'refresh':
						$.button.systemButton = Ti.UI.iPhone.SystemButton.REFRESH;
						break;
					default:
						properties.image = WPATH('/images/' + config.buttonType + '.png');
						break;
				}
			} else {
				properties.backgroundImage = '/images/generic/buttons/' + config.buttonType + '.png';
				properties.backgroundDisabledImage = '/images/generic/buttons/' + config.buttonType + 'Disabled.png';
				properties.width = 30;
				properties.height = 30;
			}
		} else if (config.title) {
			properties.title = L(config.title, config.title);

			if (OS_ANDROID)
				properties.color = '#ff4f00';
		}

		$.button.applyProperties(properties);
	},

	enable: function() {
		$.setArgs({
			enabled: true
		});
	},

	disable: function() {
		$.setArgs({
			enabled: false
		});
	}
});

/**
 * @parameter {Number} _lastClickMoment The last time this button was clicked
 * @private
 */
var _lastClickMoment;

/**
 * Handle clicks on button and pass them through to Widget
 * @param {Object} evt Event data that is fired
 * @private
 */
function onClick(evt) {
	// If last click has been less than 2 seconds ago, ignore
	if(_lastClickMoment && _lastClickMoment.isAfter(moment().subtract($.delay, 'milliseconds'))) {
		Ti.API.error('Can\'t click within ' + $.delay + ' msec!');
		return;
	}

	// Pass the click through to the widget
	$.trigger('click', evt);

	// Save last click timestamp
	_lastClickMoment = moment();
}
