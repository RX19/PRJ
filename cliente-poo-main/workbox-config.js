module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{html,css,svg,png,js,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};