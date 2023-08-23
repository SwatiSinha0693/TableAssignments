import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TableSortingExample } from 'src/example/table-sorting-example';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './detail/detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { ReactiveFormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    DialogOverviewExampleDialogComponent,
    TableSortingExample
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule, MatSortModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterModule,
    MatPaginatorModule,
    NgbModule
  ],
  bootstrap: [AppComponent],
  providers: [ HttpClientModule]
})
export class AppModule { }
