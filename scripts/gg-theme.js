function colorFolderBackground(el) {
    let bgColor = el.find('.folder-header').css('background-color');
    el.css('background-color', bgColor);
    el.find('.subdirectory').css('border-color', bgColor);
    el.addClass('colored-background');
}

function zOrderFolders(directory ) {
	let int = 1000;
	const folders = directory.element[0].querySelectorAll('.directory-list .folder');

	for (const folder of folders) {
		int -= 1;
		folder.style.zIndex = int;
		folder.querySelector('.folder-header').style.zIndex = int;
	}
}

function gg_theme_init() {
	console.warn("GG | Initializing Garhi's Grotto - Theme")
	Hooks.on('changeSidebarTab', (directory, html, data) => {
        let int = 1000;
        const folders = directory.element[0].querySelectorAll('.directory-list .folder');

        for (const folder of folders) {
            int -= 1;
            folder.style.zIndex = int;
            folder.querySelector('.folder-header').style.zIndex = int;
        }
    });
	Hooks.on('renderSidebarTab', (directory, html, data) => {
        let int = 1000;
        const folders = directory.element[0].querySelectorAll('.directory-list .folder');

        for (const folder of folders) {
            int -= 1;
            folder.style.zIndex = int;
            folder.querySelector('.folder-header').style.zIndex = int;
        }
    });
	Hooks.on('renderSidebarDirectory', function() {
		$('.sidebar-tab').each(function() {
			let list = $(this).find('.directory-list');
			if (list.length) {
				list.children().each(function() {
					if(($(this).hasClass('folder')) && !$(this).hasClass('colored-background')) {
						colorFolderBackground($(this));
						if($(this).find('.folder')) {
							$(this).find('.folder').each(function() {
								colorFolderBackground($(this));
							})
						}
					}
				});
			}
		});
	});
}

Hooks.once("ready", () => {
	console.warn("GG | Apply Theme");
	$('body.vtt').addClass('garhis-grotto')
	// gg_theme_init();
});
