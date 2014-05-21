rebel.MenuBarButton
===================

Appcelerator Alloy Widget for menu bar buttons. Prevents firing the `click` event twice, if user clicks within 2 seconds.

Usage:

Add the Widget to your config.json:

`"dependencies": {
		"rebel.MenuBarButton": "1.0"
	}`

And add the Widget to your Alloy XML:

`<Widget src="rebel.MenuBarButton buttonType="add" onClick="onClickFn" />`
`<Widget src="rebel.MenuBarButton title="Click Me!" onClick="onClickFn" />`
