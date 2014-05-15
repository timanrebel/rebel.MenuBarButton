_.extend(this, {
	construct: function(config) {
		$.setArgs(config);
	},

	setArgs: function(config) {

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
 * Handle click on button and pass them through to Widget
 *
 * @param {Object} evt Event details
 */
function onClick(evt) {
	$.trigger('click', evt);
}