import { extend } from 'flarum/extend';
import app from 'flarum/app';
import CommentPost from 'flarum/components/CommentPost';
import Post from 'flarum/components/Post';
import Button from 'flarum/components/Button';
import FieldSet from 'flarum/components/FieldSet';
import username from 'flarum/helpers/username';
import icon from 'flarum/helpers/icon';
import payModal from './payModal';
import composeButton from './composeButton'
import UTIL from './util'
import TextEditor from 'flarum/common/components/TextEditor';


function pay_event(event){
	event.preventDefault();
	const data = event.srcElement.dataset
	//console.log('clicked:',data)
	const attrs = { };
	var vcurruser = app.session.user.data.id;
	attrs['itemid'] = data.itemid;
	attrs['contents'] = data.contents;
	attrs['sender_id'] = vcurruser;
	attrs['tips_amount'] = data.amount;
	attrs['address'] = data.payto;
	attrs['element'] = event.srcElement;
	app.modal.show(payModal, attrs);	  	
}
export default function() {
		
	extend(Post.prototype,'oncreate',function(f_,vnode){
			const paybutton = vnode.dom.querySelectorAll("#payview-button");
			if(paybutton){
				//console.log("found payview-button:",paybutton)
				const cookie = document.cookie;
				for(let item of paybutton){
					item.addEventListener("click",pay_event);
					const data = item.dataset
					if(cookie.indexOf(data.itemid+"=unlocked")!=-1){
						item.innerHTML = UTIL.decodeContent(data.contents)
						item.style = ""
						item.className = ""
					}
				}
			}
		
	})
	//----------------------------------TextEditor--------------------------
	extend(TextEditor.prototype, 'oninit', function () {
        this.editor = null;
    })
    extend(TextEditor.prototype, 'oncreate', function (f_, vnode) {
    	this.editor = this.attrs.composer.editor;
    	console.log("editor:",this.editor)
    })
	 extend(TextEditor.prototype, 'controlItems', function (items) {
        // Add pay button       
            items.add(
                'nbflarum-paybtn',
                composeButton.component({editor:this.editor}),
            );
    })



}


