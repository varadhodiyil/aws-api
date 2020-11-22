import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private config: AppConfig ) { 

  }

  getAllRegions() {
      return this.http.get(this.config.Regions);
  }
  getVPC(region) {
      return this.http.get(`${this.config.VPC}/${region}`);
  }
  getSubnet(region , vpcId) {
    return this.http.get(`${this.config.SUBNET}/${region}/${vpcId}`);
}
}
