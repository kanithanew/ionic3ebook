import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Course } from '../../models/course'; //import model เข้ามาใช้งาน
import { Item } from '../../models/item'; //import item model เข้ามาใช้งาน
/*
  Generated class for the CourseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseServiceProvider {
  constructor(public http: Http) { }
  //ดึงข้อมูลจาก Backend ด้วย method get() ตาม URL ที่ระบุไว้
  //คำสั่ง .map() ให้พิมพ์ติดกันกับ .get() ก่อนค่อย enter ลงมาได้
  //<Course[]> res.json() แปลง json จากฝั่ง backend ใหกับโมเดล คลาส Course
  getCourse(): Observable<Course[]> {
    return this.http.get('https://codingthailand.com/api/get_courses.php').map((res: Response) => <Course[]>res.json()).catch(this.handleError);
  }
  //ดึงข้อมูลรายละเอียดคอร์สตามรหัสคอร์สที่ส่งเข้ามา
getCourseDetail(id:number):Observable<Item[]> {
  return this.http.get('https://codingthailand.com/api/get_course_detail.php?course_id='+id)
  .map((res:Response) => <Item[]> res.json())
  .catch(this.handleError);
  }
  //method handleError เป็น method สำหรับดักจับข้อผิดพลาดที่ส่งมาจาก Backend
  // error.json().errorMessage คำสั่ง .errorMessage เป็น name ของ json ในส่วนของBackend ขึ้นกับว่าตั้งอะไรไว้
  //หากไม่มี error ส่งมาจาก Backend จะใช้ข้อความ 'เกิดข้อผิดพลาดจาก Server' แทน
  private handleError(error: any) {
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจากServer');
  }
}