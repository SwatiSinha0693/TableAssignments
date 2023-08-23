import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  HttpClient,
} from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from 'src/app/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'table-sorting-example',
  styleUrls: ['table-sorting-example.css'],
  templateUrl: 'table-sorting-example.html'
})
export class TableSortingExample implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'company', 'actions'];
  closeResult: string;

  private data: any;
  dataSource = new MatTableDataSource<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient, private modalService: NgbModal, public dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe((sort: Sort) => {
      console.log('sortChange', this.sort.active);
    });
  }

  getData() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    this.http.get(url).subscribe((res) => {
      this.data = res;
      this.dataSource = new MatTableDataSource<any>(this.data); //pass the array you want in the table
      return this.data;
    })
  }

  announceSortChange(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'email':
          return this.compare(a.email, b.email, isAsc);
        case 'company':
          return this.compare(a.company, b.company, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onRowClick(element: any) {
    const url = 'https://jsonplaceholder.typicode.com/users/' + element.id;
    window.location.href = url;
  }

  applySearch(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  open(content: any, elem: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.delete(elem);
      }
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete(item: any) {
    const index = this.dataSource.data.findIndex(elem => {
      return elem.id === item.id;
    });
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '650px',
      data: { element: this.dataSource, originalform: this }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      this.dataSource._updateChangeSubscription();
    });
  }
}
