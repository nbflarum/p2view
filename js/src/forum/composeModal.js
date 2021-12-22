import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import UTIL from './util'

async function getUsername(userId){
  return new Promise(res=>{
    if(userId===0) res("invalid")
    else{
      app.store.find('users', userId).then(user=>res(user.data.attributes.opayaddress))
      }
  })
}
function getBBPara(str,paraName,endchar=" "){
  let i = str.indexOf(paraName)
  if(i==-1)return ""
  i+=paraName.length
  let j = str.indexOf(endchar,i)
  if(j==-1)j=str.length-1
  return str.slice(i,j)
}  
export default class composeModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.uid = 0
    //console.log(this.attrs.bbcode)
    if(this.attrs.bbcode){ //parse bbcode
      const bbcode = this.attrs.bbcode.trim()
      this.address = getBBPara(bbcode,"payto=")
      if(this.address!=""){
        this.amount = getBBPara(bbcode,"amount=")
        this.contents = getBBPara(bbcode,'contents="','"')
        this.uid = getBBPara(bbcode,"id=")  
      }else{
        this.contents = bbcode
      }
      

    }else{
      this.address = this.attrs.address
      this.amount = this.attrs.amount
      this.contents = this.attrs.contents;
    }
    if(!this.address||this.address==""){
        const userid = app.session.user.data.id
        getUsername(userid).then(name=>this.address = name)
      }
    console.log(this.address,this.amount,this.uid,this.contents)
    if(this.contents){
        //this.contents = UTIL.decodeContent(this.contents)
    }
  }

  className() {
    return 'composeModal Modal--small';
  }

  title() {
    //return "Create Pay to view button"
    return app.translator.trans(`nbflarum-p2view.forum.compose_modal_title`);
  }
  
  content() {
    
    return (
      <div className="Modal-body">
          <div className="Form">
            <div className="Form-group">
               <label>{app.translator.trans(`nbflarum-p2view.forum.compose_modal_receiver`)}</label>
               <input className="FormControl" id="p2v_address" placeholder="NBdomain" defaultValue={this.address} />
            </div>
            <div className="Form-group">
              <label>{app.translator.trans(`nbflarum-p2view.forum.compose_modal_amount`)} (v) </label>
              <input className="FormControl" type='number' id="p2v_amount" style="width:100%;" defaultValue={this.amount}/>
            </div>
            <div className="Form-group">
              <label>{app.translator.trans(`nbflarum-p2view.forum.compose_modal_content`)}</label>
              <textarea id="w3review" name="w3review" style="width:100%;" id="p2v_contents" defaultValue={this.contents}/>
              <div>{app.translator.trans(`nbflarum-p2view.forum.compose_modal_tip`)}</div>
            </div>
            <div className="Form-group">
              <button class="Button Button--primary" type="submit" title="Create"><span class="Button-label">{app.translator.trans(`nbflarum-p2view.forum.compose_modal_create`)}</span></button>
            </div>
          </div>
          
        </div>
    );
  }
	  

  onsubmit(e) {
    e.preventDefault();
	  this.address = document.querySelector("#p2v_address").value
    this.amount = document.querySelector("#p2v_amount").value
    this.contents = UTIL.encodeContent(document.querySelector("#p2v_contents").value)
    if(this.uid==0){
      this.uid = Math.floor((Date.now()/1000))
    }
    console.log(this.address,this.amount,this.contents)
    const bbcode = `[p2view payto=${this.address} amount=${this.amount} contents="${this.contents}" id=${this.uid}]`
    this.attrs.editor.insertAtCursor( bbcode + '\n', false);
    this.hide();
  }  
}
