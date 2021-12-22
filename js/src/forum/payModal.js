import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import UTIL from './util'

export default class payModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    //console.log(vnode)
	this.contents = this.attrs.contents;
	this.sender_id = this.attrs.sender_id;
	this.itemid = this.attrs.itemid;
	this.address = this.attrs.address;
	this.tips_amount = this.attrs.tips_amount;
  this.lockElement = this.attrs.element;
	//console.log(this.lockElement)
  this.opay = new Opay2
  fetch(app.forum.attribute('baseUrl')+"/nb/fundinfo").then(data=>data.json()).then(res=>this.fundAddress=res.address);

  }

  className() {
    return 'payModal Modal--small';
  }

  title() {
    return app.translator.trans(`nbflarum-p2view.forum.pay_modal_title`);
  }
  hide(){
    super.hide()
    this.opay.close()
  }
  content() {
    return (
      <div className="Modal-body">
          <div className="Form Form--centered">
		    <div id="pay" style="width:100% !important; height:100%; align: center;"></div>
          </div>
      </div>
    );
  }//

  async onready() {
	  //console.log(this.div_tip_id['dom']['innerHTML']);
	  await this.opay.init({debug: true,containerID:'pay',app:{name:"NBforum"} });
	  
	  this.opay.setUI({close:false});	  
        let reqBody = {
          to: [{ address: this.address, value: this.tips_amount*100 }],
          expire: Date.now() + 120 * 1000,
          broadcast: true
        };
        let req = {
          pay_request: {
            data: reqBody
          }
        };
        if(this.fundAddress){
          let contribution = app.forum.attribute("nbflarum-contribution");
          if(contribution){
            let value = this.tips_amount*100*contribution/100
            if(value<250)value=250
            reqBody.to.push({address:this.fundAddress,value:value})
          }
        }
        const self = this;
        this.opay.request(req, e => {
          let result = e;
          console.log(result);
          if (result.code == 0) {
            const res = "Success, url=tx://" + result.txhash;
            console.log(res);
						self.lockElement.parentElement.innerHTML = UTIL.decodeContent(self.contents);
						app.modal.close();
						document.cookie = `${self.itemid}=unlocked`
			    } else {
						app.modal.close();
						alert(app.translator.trans('chen-nbdomain-login.forum.tip_cancel'));
		  		}
        });
	  
  }

  onsubmit(e) {
    e.preventDefault();
	console.log('disubmit loh');
  }  
}
