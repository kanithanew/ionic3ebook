import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'; //import Storage เข้ามาใช้งาน
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  companyName: string;
  companyWebsite: string;
  phone: string;
  constructor(public storage: Storage, public navCtrl: NavController, public navParams:
    NavParams) {
    this.companyName = this.navParams.get('companyName');
    this.companyWebsite = this.navParams.get('companyWebsite');
    this.storage.ready().then(() => {
      //get a key/value pair from about page
      //get ค่าข้อมูล key ชื่อว่า phone
      this.storage.get('phone').then((val) => {
        this.phone = val; //ได้ค่าอะไรให้เก็บค่าไว้ให้ตัวแปร phone เพื่อนำไปแสดงผลที่ views
      })
    });
  }
  ionViewWillLeave() {
    this.storage.remove('phone'); //หากออกจากเพจนี้ก็ให้ลบ key ด้วย
  }
}