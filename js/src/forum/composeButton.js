import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import composeModal from './composeModal';
import Tooltip from 'flarum/common/components/Tooltip';


export default class ComposeButton extends Component {
    oninit(vnode) {
        super.oninit(vnode);

       
    }

    view() {
        return (
            <Tooltip text={app.translator.trans('nbflarum-p2view.forum.button_tip')}>
                {Button.component({
                    className: 'Button p2view-button Button--icon',
                    onclick: this.composeButtonClicked.bind(this),
                    icon: 'fas fa-eye-slash',
                })}
            </Tooltip>
        );
    }

    /**
     * Event handler for upload button being clicked
     *
     * @param {PointerEvent} e
     */
    composeButtonClicked(e) {
        e.preventDefault();
        const sel = this.attrs.editor.getSelectionRange()
        let selection = this.attrs.editor.el.value.substring(sel[0],sel[1]);
        // Open dialog
        app.modal.show(composeModal, {editor:this.attrs.editor,bbcode:selection
        });
    }
}