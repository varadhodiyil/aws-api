import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingComponent } from './listing/listing.component';
import { RegionComponent } from './region/region.component';
import { SubnetComponent } from './subnet/subnet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    RegionComponent,
    SubnetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [ AppConfig],
  bootstrap: [AppComponent], entryComponents: [RegionComponent]
})
export class AppModule { }
