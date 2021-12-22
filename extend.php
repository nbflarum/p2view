<?php

use Flarum\Extend;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),
        
    new Extend\Locales(__DIR__ . '/resources/locale'),
        
    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $config->BBCodes->addCustom(
                '[p2view payto={TEXT1} amount={NUMBER1} id={TEXT2} contents={TEXT3}][/p2view]',
                '<div class="Button hasIcon Button--icon Button--primary dadadownload" id="payview-button" data-itemid={TEXT2} data-payto={TEXT1} data-amount={NUMBER1} data-contents={TEXT3} style="width:230px"><i class="fas fa-eye" style="margin-right:5px;"></i>  Please pay {NUMBER1}v to unlock</div>'
            );

        })
];
