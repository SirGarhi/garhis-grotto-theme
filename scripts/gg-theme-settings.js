class GG_ThemeMenu_Pause extends FormApplication {
    constructor() {
        super({});
    }
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            closeOnSubmit: false,
            classes: ['form'],
            popOut: true,
            width: "550",
            height: "auto",
            template: `/modules/garhis-grotto-theme/templates/gg-theme-settings-menu-pause.html`,
            id: 'garhis-grotto-theme-settings-menu-pause',
            title: 'Pause Icon Settings',
            resizable: false,

        });
    }
    activateListeners(html) {
        super.activateListeners(html);
        const picker = $(".pause-picker-button", html);
        picker[0].addEventListener("click", async function(){
            new FilePicker({
                type: "image",
                callback: async function (imagePath) {
                  $(".pause-path").val(imagePath);
                }}).render(true);
        })
    }
    getData() {
        let source = game.settings.get("garhis-grotto-theme", "pause-settings");
        if (foundry.utils.isEmpty(source)) {
            source = {
                path: "icons/svg/clockwork.svg",
                opacity: 50,
                dimensionX: 128,
                dimensionY: 128,
                text: game.i18n.format("GAME.Paused"),
                textColor: "#EEEEEE",
                shadow: true,
                fontSize: 2,
                speed: "5"
            };
        }
        return source;
    }
    async _updateObject(event) {
        const button = event.submitter;
        if(button.name === "submit") {
            await game.settings.set("garhis-grotto-theme", "pause-settings", {
                path: $(".garhis-grotto-theme.pause-path").val(),
                opacity: Number($(".garhis-grotto-theme.pause-opacity").val()),
                dimensionX: Number($(".garhis-grotto-theme.pause-dimensionX").val()),
                dimensionY: Number($(".garhis-grotto-theme.pause-dimensionY").val()),
                text: $(".garhis-grotto-theme.pause-text").val(),
                textColor: $(".garhis-grotto-theme.pause-text-color").val(),
                shadow: $(".garhis-grotto-theme.pause-shadow").prop("checked"),
                fontSize: $(".garhis-grotto-theme.pause-font-size").val(),
                speed: $(".garhis-grotto-theme.pause-speed").val()
            });
            window.location.reload();
        }
    }
}
export const registerSettings = function () {
	game.settings.register("garhis-grotto-theme", "master", {
		name: "Enable Theme",
		hint: "Toggle the entire theme being enabled.",
		scope: "user",
		config: true,
		requiresReload: true,
		default: true,
		type: Boolean,
		restricted: true
	});
    game.settings.register("garhis-grotto-theme", "pause-settings", {
        scope: 'world',
        config: false,
        type: Object,
        default: {
            path: "./assets/branding/garhis-grotto-pause.webp",
            opacity: 90,
            dimensionX: 540,
            dimensionY: 540,
            text: game.i18n.format("GAME.Paused"),
            textColor: "#ccaa00",
            shadow: true,
            fontSize: 2
        },
    });
    game.settings.registerMenu("garhis-grotto-theme", "pause-settings", {
        name: game.i18n.format("PAUSEICON.settings"),
        label: game.i18n.format("PAUSEICON.settingsButton"),
        icon: 'fas fa-atlas',
        type: GG_ThemeMenu_Pause,
        restricted: true
    })
};
