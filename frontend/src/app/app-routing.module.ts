import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { SubnetComponent } from './subnet/subnet.component';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
  },
  {
      path: 'subnet/:region/:id',
      component: SubnetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
