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
  provinces: any[];
  cities: any[];
  loading = false;
  subdistricts: any[];
  logoImage: any;
  resellerForm: FormGroup;
  dbx: any;
  logoStatus: any;
  @ViewChild('fileInput') fileInput;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService,
    private subdistrictService: SubdistrictService,
    private provinceService: ProvinceService,
    private registerService: RegisterService,
    public dialog: MatDialog
  ) {
    this.provinces = this.route.snapshot.data['provinces'].data;
    this.dbx = new Dropbox({ accessToken: environment.dropboxKey });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resellerForm = new FormGroup({
      'full_name': new FormControl('zakuan', [Validators.required]),
      'username': new FormControl('zakuan', [Validators.required]),
      'password': new FormControl('3462645', [Validators.required]),
      'passwordConfirm': new FormControl('3462645', [Validators.required]),
      'phone': new FormControl('0564661123', [Validators.required]),
      'facebook': new FormControl('Muhammad zakuan', [Validators.required]),
      'instagram': new FormControl('Muhammad zakuan', [Validators.required]),
      'line': new FormControl('Muhammad zakuan', [Validators.required]),
      'province_id': new FormControl('1', [Validators.required]),
      'city_id': new FormControl('1', [Validators.required]),
      'subdistrict_id': new FormControl('1', [Validators.required]),
      'postal_code': new FormControl('51171', [Validators.required]),
      'role_id': new FormControl(14),
      'logo_path': new FormControl(null),
      'is_has_logo': new FormControl(null),
      'db_file_id': new FormControl(null),
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

  openDialog(data) {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      data: {
        name: data.full_name,
        resellerCode: data.reseller_code
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async onSubmit() {
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
      delete valueForm.passwordConfirm;
      this.registerService.createReseller(valueForm).subscribe(
        response => {
          this.openDialog(response.data);
          this.loading = false;
        },
        error => {
          this.loading = false;
        },
      );
    } else {
      this.loading = false;
    }
  }


  async uploadSingle(file: UploadLogo) {
    try {

      file.isError = false;
      file.isLoading = true;
      const filename = file.file.name.replace(/[^\w\s]/gi, '');

      const extension = mime.extension(file.file.type) || '.jpeg';
      const response = await this.dbx.filesUpload(
        {
          path: `${environment.dropboxPath}${filename}-${UUID.UUID()}.${extension}`,
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
