import { Component, Input, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { SpaceXLaunchService } from 'src/app/services/space-x-launch.service';

@Component({
  selector: 'app-space-x-launch-program',
  templateUrl: './space-x-launch-program.component.html',
  styleUrls: ['./space-x-launch-program.component.scss']
})
export class SpaceXLaunchProgramComponent implements OnInit {

  @Input() launchYear:string[];
  @Input() firstTimeLaunchData:any[];
  nextlaunchYear:string[];
  spaceXlaunchData:any[];
  active:boolean;
  selectedIndex:number;
  launchFlag:boolean;
  landingFlag:boolean;
  @Input() showLoader:boolean;
  constructor(private spaceXLaunchService:SpaceXLaunchService) {
    this.nextlaunchYear = [];
    this.spaceXlaunchData = [];
    this.active=true;
    // this.showLoader = false;
   }

   ngOnChanges(): void {
     //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
     //Add '${implements OnChanges}' to the class.

     /**
      * Copied the launchdata to another array so that original array do not gets modified.
      */
     
       this.spaceXlaunchData = JSON.parse(JSON.stringify(this.firstTimeLaunchData));

 
    
   }

  ngOnInit() {
    
    /**
     * Dividing the array in two
     */
    this.nextlaunchYear =this.launchYear.splice(0,Math.ceil(this.launchYear.length/2));

  }

  /**
   * @description filter fucntion called on first column click
   * @param index 
   */

  filterLaunchPrograms1(index:number){
    this.landingFlag = null;
    this.launchFlag = null;

    console.log("index>>>",this.nextlaunchYear[index]);
    this.selectedIndex = index;
    this.spaceXlaunchData = this.firstTimeLaunchData.filter((item =>{
      return item['launch_year'] == this.nextlaunchYear[index];

    }))
  }
/**
   * @description filter fucntion called on second column click
   * @param index 
   */
  filterLaunchPrograms2(index:number){
    this.landingFlag = null;
    this.launchFlag = null;
    console.log("index>>>",this.launchYear[index]);
    this.selectedIndex = index;
    this.spaceXlaunchData = this.firstTimeLaunchData.filter((item =>{
      console.log("item in second col>>>>",item)
      return item['launch_year'] == this.launchYear[index];

    }))    
  }

  successLandingORLaunchPrograms(flag:boolean,context:string){
    if(context=='land')
        this.landingFlag = flag;
    if(context=='launch')
        this.launchFlag = flag;

        if(this.selectedIndex >=0){
          this.spaceXlaunchData = this.firstTimeLaunchData.filter((item =>{

            if(this.selectedIndex >=0 && (this.launchFlag == true || this.launchFlag == false) && ( this.landingFlag == true ||  this.landingFlag == false))
                return (item['launch_year'] === this.nextlaunchYear[this.selectedIndex] && item['launch_success'] === this.launchFlag && item['rocket']['first_stage'].cores[0]['land_success'] === (null||this.landingFlag));
            else if(this.selectedIndex >=0 && (this.launchFlag == true || this.launchFlag == false))
                return (item['launch_year'] === this.nextlaunchYear[this.selectedIndex] && item['launch_success'] === this.launchFlag);
            else if(this.selectedIndex >=0 && ( this.landingFlag == true ||  this.landingFlag == false))
                return (item['launch_year'] === this.nextlaunchYear[this.selectedIndex] &&  item['rocket']['first_stage'].cores[0]['land_success'] === (null||this.landingFlag));
      
          })) 
        }
        else{
          
          /**
           * To filter data based on landing and launching flag
           */
          this.spaceXlaunchData = this.firstTimeLaunchData.filter((item =>{

            if(context=='land'){
              return ((item['rocket']['first_stage'].cores[0]['land_success']) === (null||this.landingFlag));
            }
            else if(context=='launch'){
              return (item['launch_success'] === this.launchFlag);
            }

          }))
        }
  }

  onlySuccessLaunch(flag:boolean){

    this.showLoader = true;
    this.spaceXLaunchService.launchSuccess().pipe(takeWhile(()=>this.active)).subscribe((res => {
      this.showLoader = false;
      let data = res;
     console.log("res>>>",res);
      let arr = [];
      arr = JSON.parse(JSON.stringify(data));
     this.spaceXlaunchData = arr.filter((item =>{
      return (item['launch_success'] === flag);
     }))

    }))

  }

  onlySuccessLanding(flag:boolean){
    this.showLoader = true;
    this.spaceXLaunchService.landing().pipe(takeWhile(()=>this.active)).subscribe((res => {
      this.showLoader = false;
      let data = res;
     console.log("res>>>",res);
      let arr = [];
      arr = JSON.parse(JSON.stringify(data));
     this.spaceXlaunchData = arr.filter((item =>{
      return (item['rocket']['first_stage'].cores[0]['land_success']) === (null||flag);
     }))

    }))
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.active = false;
  }
}
