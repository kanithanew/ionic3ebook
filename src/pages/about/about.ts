import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { Storage } from '@ionic/storage'; //import Storage เข้ามาใช้งาน

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
    storage.ready().then(() => { //ถ้า platform พร้อมใช้งาน
      // set a key/value
      //กำหนด และ set ค่า key เป็น phone และค่า value เป็น 085 4952624
      //เราสามารถเรียกใช้ค่านี้ได้จากทุกๆเพจ โดยอ้างชื่อ key นั่นก็คือ phone
      storage.set('phone', '085 4952624');
    });
  }

  goToContact() {
    this.navCtrl.push(ContactPage, {
      companyName: 'CodingThailand',
      companyWebsite: 'https://codingthailand.com'
    });
    //this.navCtrl.setRoot(ContactPage);
  }
}
