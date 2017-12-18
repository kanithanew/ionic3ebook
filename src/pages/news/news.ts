import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsServiceProvider } from '../../providers/news-service/news-service';
//import NewsService เข้ามาใช้งาน
import { News } from '../../models/news'; //import model News เข้ามาใช้งาน
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  news: Array<News>; // เป็นประกาศตัวแปรแบบ generic (TypeScript) มีค่าเท่ากับ News[]
  sub: Subscription;
  errorMessage: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private newsService: NewsServiceProvider
  ) { }
  ionViewWillEnter() {
    this.getNews();
  }
  ionViewWillLeave() {
    this.sub.unsubscribe();
  }
  private getNews() {
    this.sub = this.newsService.getNews().subscribe(
      (res) => this.news = res,
      (error) => this.errorMessage = <any>error
    );
  }
}