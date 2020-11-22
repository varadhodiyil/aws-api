import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { RegionComponent } from '../region/region.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  data: any;
  isLoaded = false;

  displayedColumns: string[] = ['Endpoint', 'RegionName', 'OptInStatus'];

  constructor(private service: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.service.getAllRegions().subscribe((response: any) => {
      this.data = new MatTableDataSource(response.result);
      // this.dataSource.sort = this.sort;
      this.isLoaded = true;
    });
  }
  getVPC(row) {
    console.log(row);
    this.dialog.open(RegionComponent, {
        data: { region: row.RegionName },
        // height: '40%',
  width: '60%',
      });
    // this.service.getVPC(row.RegionName).subscribe((d: any) => {
    //   console.log(d);
    // });
  }
}
