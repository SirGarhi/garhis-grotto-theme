import {registerSettings} from "./gg-theme-settings.js"

// Hooks.on('changeSidebarTab', (directory, html, data) => {
//     styleFolders(directory)
// })
// Hooks.on('renderSidebarTab', (directory, html, data) => {
// 	console.log(directory)
// 	styleFolders(directory)
// })

Hooks.on("init", function () {
	console.warn("GG | Initializing Garhi's Grotto - Theme")
	$('body.vtt').addClass('garhis-grotto-theme');
	$('#logo').src = "modules/garhis-grotto-resources/assets/art/branding/garhis-grotto-logo.webp";
});

Hooks.on("renderPause", function (_, html, options) {
	if (!options.paused) return;
	const path = "modules/garhis-grotto-resources/assets/art/branding/garhis-grotto-logo.webp";

	html.find("#pause.paused img").attr("src", path);
	html.find("#pause.paused img").css({ "top": '-30%', "left": 'calc((50% - 540px )/ 2)px', "width": "540px", "height": "540px", "opacity": 0.8 });

	html.find("figcaption").text("Game Paused");
	html.find("figcaption").css({ "color": "hsl(50, 100%, 50%)", "font-size": "3rem" });
	html.css("background", "none");
});
