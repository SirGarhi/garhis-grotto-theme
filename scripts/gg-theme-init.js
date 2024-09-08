import {registerSettings} from "./gg-theme-settings.js"

function gg_theme_init() {
	console.warn("GG | Initializing Garhi's Grotto - Theme")
	//TODO: Hook up individual classes to options, add custom theme option
	$('body.vtt').addClass('garhis-grotto-theme');
	// Hooks.on('changeSidebarTab', (directory, html, data) => {
   //     styleFolders(directory)
   // })
	// Hooks.on('renderSidebarTab', (directory, html, data) => {
	// 	console.log(directory)
	// 	styleFolders(directory)
   // })
	Hooks.on("renderPause", function (_,html, options) {
		stylePause(html, options)
	})
}

Hooks.once("ready", () => {
	gg_theme_init()
})

Hooks.on('setup', () => {
    registerSettings();
});

Hooks.on("renderPause", function (_,html, options) {
    if (!options.paused) return;
    const path = game.settings.get("garhis-grotto-theme", "pause-settings").path;
    const opacity = game.settings.get("garhis-grotto-theme", "pause-settings").opacity / 100;
    const text = game.settings.get("garhis-grotto-theme", "pause-settings").text;
    const dimensionX = game.settings.get("garhis-grotto-theme", "pause-settings").dimensionX;
    const dimensionY = game.settings.get("garhis-grotto-theme", "pause-settings").dimensionY;
    const top = `${-16 - (dimensionY - 128) / 2}px`;
    const left = `calc(50% - ${dimensionX / 2}px)`;
    const textColor = game.settings.get("garhis-grotto-theme", "pause-settings").textColor;
    const shadow = game.settings.get("garhis-grotto-theme", "pause-settings").shadow;
    const fontSize = game.settings.get("garhis-grotto-theme", "pause-settings").fontSize;
    const size = `${(text.length * fontSize * 90 / 12) + 70}px 100px`;
    if(path === "None" || dimensionX === 0 || dimensionY === 0) {
        html.find("#pause.paused img").hide();
    }
    else {
        html.find("#pause.paused img").attr("src", path);
		html.find("#pause.paused img").css({"top": top, "left": left, "width": dimensionX, "height": dimensionY, "opacity": opacity});
    }
	html.find("figcaption").text(text);
	if (text.length !== 0 && shadow) {
		html.css({"background-size": size});
		html.find("figcaption").css({"color": textColor, "font-size": `${fontSize}em`});
	}
	else if(text.length !== 0 && !shadow) {
		html.find("figcaption").css({"color": textColor, "font-size": `${fontSize}em`});
		html.css("background", "none");
	}
	else {
		html.css("background", "none");
	}
});
