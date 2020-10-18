import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { summaryFileName } from '@angular/compiler/src/aot/util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpaceX';
  active:boolean;
  launchYear:string[];
  firstTimeLaunchData:any;
  showLoader:boolean;

  constructor(private httpClient:HttpClient){

    this.active = true;
    this.firstTimeLaunchData = [];
    this.showLoader = true;
    this.launchYear = ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
    this.firstTime();

  }

  firstTime(){

    let i=0;
    let sum=0;
    while(i<100){
      sum = sum +i;
      sum = i +sum;
      i=i+1;
    }
console.log(sum);
		this.httpClient.get(`https://api.spacexdata.com/v3/launches?limit=100`).pipe(takeWhile(() => this.active)).subscribe((res => {
      console.log("res1>>>",res);
      this.showLoader = false;
      this.firstTimeLaunchData = res;
    }));
  }
}
