import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html'
  //providers: [SQLite]
})
export class CustomerPage {
  customers: Array<Object>;
  isToogle: boolean = false;
  constructor(public sqlite: SQLite,
    public toastCtrl: ToastController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.platform.ready().then(() => { //ถ้า platform พร้อมใช้งาน
      this.sqlite.create({ //สร้างฐานข้อมูลชื่อว่า data.db
        name: "data.db",
        location: "default"
      }).then((db: SQLiteObject) => {
        //หากยังไม่มีตาราง customer ก็ให้สร้างตารางใหม่ หากมีแล้วก็ไม่ต้องสร้าง
        db.executeSql("CREATE TABLE IF NOT EXISTS customer (id INTEGERPRIMARY KEY AUTOINCREMENT, fullname TEXT, phone TEXT)", {}).then((data) => {
        console.log("TABLE CREATED: ", data);
      }, (error) => {
        //console.error("ไม่สามารถรันคำสั่ง sql ได้", error);
      });
      //this.add();
    }, (error) => {
      //console.error("ไม่สามารถเปิดฐานข้อมูลได้", error);
    });
  });
}
//เป็น method ที่รับค่าข้อมูลจากฟอร์ม พร้อมทั้งเพิ่มข้อมูลลงในตาราง customer หากเรียบร้อยก็ให้แสดง Toast Controller ว่าเพิ่มข้อมูลเรียบร้อย
public add(form) {
  this.sqlite.create({
    name: "data.db",
    location: "default"
  }).then((db: SQLiteObject) => {
    db.executeSql("INSERT INTO customer (fullname, phone) VALUES(?,?)", [form.fullname,form.phone]).then((data) => {
  let toast = this.toastCtrl.create({
        message: 'เพิ่มข้อมูลเรียบร้อย',
        duration: 3000
      });
    toast.present();
    this.showData();
    this.isToogle = false;
  }, (error) => {
    //console.log("error: " + JSON.stringify(error));
  });
});
  }
  //เป็น method ที่เขียนไว้สำหรับแสดงข้อมูลทั้งหมดจากตาราง customer โดยเรียงลำดับคอลัมน์ idจากมากไปหาน้อย พร้อมทั้งวนลูปเก็บข้อมูลให้กับตัวแปร customers
  public showData() {
  this.sqlite.create({
    name: "data.db", location: "default"
  }).then((db: SQLiteObject) => {
    db.executeSql("SELECT * FROM customer ORDER BY id DESC",
      []).then((data) => {
        this.customers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.customers.push({
              id: data.rows.item(i).id, fullname:
                data.rows.item(i).fullname, phone: data.rows.item(i).phone
            });
          }
        }
      }, (error) => {
        // console.log("error: " + JSON.stringify(error));
      });
  });
}
    //เป็น method ที่รับค่า item และรับรหัสลูกค้าเพื่อทำการลบข้อมูลในรายการนั้นๆ
public delete (item) {
  let confirm = this.alertCtrl.create({
    title: 'ยืนยันการลบข้อมูล',
    message: `
  แน่ใจว่าต้องการลบ [${item.fullname}] ?
  `,
    buttons: [{
      text: 'ยกเลิก',
      handler: () => {
        // console.log('cancel');
      }
    },
    {
      text: 'ตกลง',
      handler: () => {
        this.sqlite.create({
          name: "data.db",
          location: "default"
        }).then((db: SQLiteObject) => {
          db.executeSql('DELETE FROM customer WHERE id=?',
            [item.id]).then((data) => {
              let toast = this.toastCtrl.create({
                message: 'ลบข้อมูลเรียบร้อย',
                duration: 3000
              });
              toast.present();
              this.showData();
            }, (error) => {
              //console.log("error: " + JSON.stringify(error));
            });
        });
      }
    }]
  });
  confirm.present();
}
ionViewWillEnter() {
  this.showData();
}
//เป็น method ที่มีไว้ซ่อนหรือแสดงฟอร์ม
openForm() {
  this.isToogle = !this.isToogle;
}
  }

