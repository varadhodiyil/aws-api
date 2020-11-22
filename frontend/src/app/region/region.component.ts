import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
})
export class RegionComponent implements OnInit {
  dataSource: any;
  isLoaded = false;

  displayedColumns: string[] = [
    'VpcId',
    'CidrBlock',
    'DhcpOptionsId',
    'OwnerId',
    'State',
    'ViewSubnets'
  ];

  constructor(
    private service: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { region: string },
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getVPC(this.data.region).subscribe((d: any) => {
      this.dataSource = d.result;
      this.isLoaded = true;
    });
  }
  viewSubnet(VpcId) {
    this.dialog.closeAll();
    this.router.navigate(['subnet', this.data.region,  VpcId]);
  }
}
