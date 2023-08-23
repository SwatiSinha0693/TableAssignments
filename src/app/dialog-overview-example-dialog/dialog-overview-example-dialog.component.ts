import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent {

  selectedElementSymbol: any;

  myForm: FormGroup;
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  company = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  state = new FormControl('', Validators.required);
  zip = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    if (data.element) {
      this.name = data.element.name;
      this.email = data.element.email;
      this.address = data.element.address;
      this.city = data.element.city;
      this.company = data.element.company;
      this.zip = data.element.zip;
      this.state = data.element.state;
    }
    this.myForm = this.formBuilder.group({
      'name': [this.name, Validators.required],
      'email': [this.email, Validators.required],
      'address': [this.address, Validators.required],
      'city': [this.city, Validators.required],
      'company': this.formBuilder.group({ // make a nested group
        name: ['', [Validators.required]],
      }),
      'zip': [this.zip, Validators.required],
      'state': [this.state, Validators.required],
    });

  }

  // get companyName(): any {
  //   return this.company.get('name');
  // }
  

  onNoClick(): void {

    this.dialogRef.close();
  }
  onSubmit() {
    const data = this.data.originalform.dataSource.data;
    this.myForm.value["id"] = data.length + 1
    data.push(this.myForm.value);
    this.data.originalform.dataSource = new MatTableDataSource<Element>(data);
    this.dialogRef.close();
  }

}
