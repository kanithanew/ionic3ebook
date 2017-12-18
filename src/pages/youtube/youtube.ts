import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@IonicPage()
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html'
})
export class YoutubePage {
  chTitle: string;
  chUrl: string;
  chUrlTrusted: SafeResourceUrl;
  constructor(private domSanitizer: DomSanitizer, public navCtrl: NavController, public navParams:
    NavParams) {
    this.chTitle = this.navParams.get('ch_title');
    this.chUrl = 'https://www.youtube.com/embed/' + this.navParams.get('ch_url');
  }
  ionViewWillEnter() {
    this.chUrlTrusted = this.domSanitizer.bypassSecurityTrustResourceUrl(this.chUrl);
  }
}