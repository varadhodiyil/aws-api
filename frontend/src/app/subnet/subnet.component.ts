import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.scss']
})
export class SubnetComponent implements OnInit {
    dataSource: any;
    isLoaded = false;
    VpcId = '';
    region = '';
    displayedColumns: string[] = [
      'SubnetId',
      'CidrBlock',
      'SubnetArn',
      'AvailableIpAddressCount',
      'State',
    ];
  constructor(private service: ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
        this.VpcId = params['id'];
        this.region = params['region'];
        // if (this.productID !== undefined) {
        //     this.isEdit = true;
        // }
    });
  }

  ngOnInit() {
    this.service.getSubnet( this.region,  this.VpcId).subscribe((d: any) => {
        this.dataSource = d.result;
        this.isLoaded = true;
      });
  }

}
