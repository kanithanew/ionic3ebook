import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseServiceProvider } from '../../providers/course-service/course-service';
//import service เข้ามาใช้งาน
import { Course } from '../../models/course'; //import model เข้ามาใช้งาน
import { Subscription } from 'rxjs/Subscription'; //import Subscription เพื่อunsubscribe() ข้อมูลจาก Server
import { CourseDetailPage } from '../course-detail/course-detail';

@IonicPage()
@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {
  courses: Course[];
  sub: Subscription;
  errorMessage: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private courseServiceProvider: CourseServiceProvider
  ) { }
//subscribe ข้อมูลที่ได้รับจาก service (CourseService)
//และส่งค่าให้กับตัวแปร courses (courses (res) => this.courses = res)
//เก็บข้อความ error แล้วส่งค่าให้ตัวแปร errorMessage ของคลาสนี้ (error) =>this.errorMessage = <any>error
private getCourses() {
  this.sub = this.courseServiceProvider.getCourse().subscribe(
    (res) => this.courses = res,
    (error) => this.errorMessage = <any>error
  );
}
ionViewWillEnter() {
  this.getCourses(); //เรียกใช้ method getCourses()
}
ionViewWillLeave() {
  this.sub.unsubscribe(); // unsubscribe ข้อมูลที่มาจาก server
}
itemSelected(c):void {
  this.navCtrl.push(CourseDetailPage,{
  id : c.id, //ส่งรหัสคอร์สที่เลือกพร้อมกำหนดให้กับ id แล้วส่งไปให้หน้า course-detail
  c_detail : c.c_detail //ส่งรายการรายละเอียดคอร์สไปพร้อมกำหนดให้กับ titleให้หน้า course-detail
  });
  }
}