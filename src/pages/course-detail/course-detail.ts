import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseServiceProvider } from '../../providers/course-service/course-service';
import { Item } from '../../models/item';
import { Subscription } from 'rxjs/Subscription';
import { YoutubePage } from '../youtube/youtube'; //import page Youtube

@IonicPage()
@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html'
})
export class CourseDetailPage {
  id: number;
  cDetail: string;
  items: Item[];
  sub: Subscription;
  errorMessage: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private courseService: CourseServiceProvider
  ) {
    this.id = this.navParams.get('id'); //รับค่า id จากเพจ course
    this.cDetail = this.navParams.get('c_detail'); //รับค่า c_detail จากเพจ course
  }
  ionViewWillEnter() {
    this.getCourseDetail();
  }
  ionViewWillLeave() {
    this.sub.unsubscribe();
  }
  private getCourseDetail() {
    this.sub = this.courseService.getCourseDetail(this.id).subscribe(
      (res) => this.items = res,
      (error) => this.errorMessage = <any>error
    );
  }
  itemSelected(c): void {
    this.navCtrl.push(YoutubePage, {
      ch_title: c.ch_title, //ส่งรายละเอียดหัวข้อคอร์สไปให้เพจ Youtube
      ch_url: c.ch_url //ส่ง Youtube id ไปให้เพจ Youtube เพื่อนำไปแสดงวิดีโอ
    });
  }
}