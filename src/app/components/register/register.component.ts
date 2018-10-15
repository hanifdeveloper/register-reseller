import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CityService } from './../../services/city.service';
import { SubdistrictService } from './../../services/subdistrict.service';
import { ProvinceService } from './../../services/province.service';
import { RegisterService } from './../../services/register.service';
import { MatDialog } from '@angular/material';
import { RegisterDialogComponent } from './../../components/shared/register-dialog/register-dialog.component';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/debounceTime';
import { MatSnackBar } from '@angular/material';


import { UUID } from 'angular2-uuid';
import * as mime from 'mime-types';

export class UploadLogo {
  id: number;
  name: string;
  isError: boolean;
  isLoading: boolean;
  isSuccess = false;
  db_file_id: string;
  db_path: string;
  file: File;
}

const Dropbox = require('dropbox');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordMatch = true;
  searchTerm: FormControl = new FormControl();
  searchResult = [];
  provinces: any[];
  cities: any[];
  loading = false;
  subdistricts: any[];
  logoImage: any;
  resellerForm: FormGroup;
  dbx: any;
  logoStatus: any;
  csId: number;
  @ViewChild('fileInput') fileInput;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService,
    private subdistrictService: SubdistrictService,
    private provinceService: ProvinceService,
    private registerService: RegisterService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.provinces = this.route.snapshot.data['provinces'].data;
    this.dbx = new Dropbox({ accessToken: environment.dropboxKey });
    this.csId = this.route.snapshot.queryParams['ref'];
    console.log(this.csId)
    this.searchTerm.valueChanges
    .debounceTime(200)
    .subscribe(data => {
      if (data) {
        this.provinceService.searchProvince(data).subscribe(result => {
          this.searchResult = result.data;
        });
      }
    });
  }


  ngOnInit() {
    this.createForm();
  }

  onEnter(event: any) {
    this.resellerForm.controls.province_id.setValue(event.source.value.province_id);
    this.cities = [{
      id: event.source.value.city_id,
      name: event.source.value.city_name,
    }];
    this.subdistricts = [{
      id: event.source.value.subdistrict_id,
      name: event.source.value.subdistrict_name,
    }];
    this.resellerForm.controls.city_id.setValue(event.source.value.city_id);
    this.resellerForm.controls.subdistrict_id.setValue(event.source.value.subdistrict_id);
    // tslint:disable-next-line:max-line-length
    this.searchTerm.setValue(event.source.value.subdistrict_name + ', ' + event.source.value.city_name + ', ' + event.source.value.province_name);
  }

  confirmPassword(event) {
    if (event.target.value === this.resellerForm.value.password) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  createForm() {
    this.resellerForm = new FormGroup({
      'full_name': new FormControl(null, [Validators.required]),
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
      'facebook': new FormControl(null),
      'instagram': new FormControl(null),
      'line': new FormControl(null),
      'province_id': new FormControl(null, [Validators.required]),
      'city_id': new FormControl(null, [Validators.required]),
      'subdistrict_id': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'postal_code': new FormControl(null),
      'is_unverified': new FormControl('unverified'),
      'logo_path': new FormControl(null),
      'is_has_logo': new FormControl(null),
      'db_file_id': new FormControl(null),
      'maintenance_id': new FormControl(this.csId ? this.csId : 1),
    });
  }


  provinceSelected(event) {
    this.cityService.getCityByProvinceId(event.value).subscribe(
      response => {
        this.cities = response.data;
      }, error => {
        console.log(error);
      }
    );

  }

  citySelected(event) {
    this.subdistrictService.getByCityId(event.value).subscribe(
      response => {
        this.subdistricts = response.data;
      }, error => {
        console.log(error);
      }
    );
  }

  open() {
    this.openDialog({
      user: {
        full_name: 'zakuan',
        reseller_code: 'RPST234'
      },
      order_code: '2222-053545'
    });
  }


  openDialog(data) {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      data: {
        name: data.user.full_name,
        resellerCode: data.user.reseller_code,
        orderCode: data.order_code
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    this.resetForm();

    });
  }

  resetForm() {
    this.resellerForm.reset();
    this.searchTerm.setValue(null);
    this.logoImage = null;
  }

  async onSubmit() {
    this.loading = true;
    if (this.fileInput && this.fileInput.nativeElement.files && this.fileInput.nativeElement.files[0]) {
      const logo = new UploadLogo;
      logo.name = this.fileInput.nativeElement.files[0].name;
      logo.file = this.fileInput.nativeElement.files[0];
      this.logoStatus = await this.uploadSingle(logo);
      this.resellerForm.controls['logo_path'].setValue(this.logoStatus.path_display);
      this.resellerForm.controls['db_file_id'].setValue(this.logoStatus.id);
      this.resellerForm.controls['is_has_logo'].setValue('1');
    }
    const valueForm = this.resellerForm.value;
    if (this.resellerForm.valid) {
      this.registerService.createReseller(valueForm).subscribe(
        response => {
          console.log(response.data);
          this.loading = false;
          this.openDialog(response.data);
        },
        err => {
          const error = err.json();
          this.openSnackBar('Register gagal. ' + error.message, null);
          this.loading = false;
        },
      );
    } else {
      console.log('failed');
      this.loading = false;
    }
  }

  openSnackBar(message, action) {
    this.snackbar.open(message, action, {
      panelClass: ['mat-warn-bg'],
      duration: 2000,
    });
  }


  async uploadSingle(file: UploadLogo) {
    try {

      file.isError = false;
      file.isLoading = true;
      const filename = file.file.name.replace(/[^\w\s]/gi, '');

      const extension = mime.extension(file.file.type) || '.jpeg';
      const response = await this.dbx.filesUpload(
        {
          path: `${environment.dropboxPath}/${filename}-${UUID.UUID()}.${extension}`,
          contents: file.file, autorename: true
        }
      );
      return response;

    } catch (error) {
      throw error;
    }
  }

  handleFile() {
    this.logoImage = this.fileInput.nativeElement.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.logoImage = event.target.result;
    };
    reader.readAsDataURL(this.logoImage);
  }
}
