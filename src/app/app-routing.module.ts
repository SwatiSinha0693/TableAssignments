import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableSortingExample } from 'src/example/table-sorting-example';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: "",
    component: TableSortingExample
  },
  {
    path: 'table', component: DetailComponent, data: {
    externalUrl: 'https://jsonplaceholder.typicode.com/users/:id'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
