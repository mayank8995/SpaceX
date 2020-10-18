import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpaceXLaunchService {

  constructor(private httpClient:HttpClient) { }


  launchSuccess(){
		return this.httpClient.get(`https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true`);
  }
  
  launchAndLandSuccess(){
		return this.httpClient.get(`https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true`);
 
	}

  all(){
		return this.httpClient.get(`https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true&amp;launch_year=2014`);

  }
  
  landing(){
		return this.httpClient.get(`https://api.spacexdata.com/v3/launches?limit=100`)
    
  }

}
