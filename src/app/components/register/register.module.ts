import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { MaterialModule } from './../../shared/material.module';
import { ProvinceResolver } from './../../shared/resolver/province.resolver';
import { HttpModule } from '@angular/http';
import { CityService } from './../../services/city.service';
import { SubdistrictService } from './../../services/subdistrict.service';
import { ProvinceService } from './../../services/province.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './../../services/register.service';
export const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: '/?ref=ref', component: RegisterComponent }


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [ProvinceResolver, CityService, SubdistrictService, ProvinceService, RegisterService],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
