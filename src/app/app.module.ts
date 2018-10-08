import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { ProvinceResolver } from './shared/resolver/province.resolver';
import { HttpModule } from '@angular/http';
import { RegisterDialogComponent } from './components/shared/register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterDialogComponent
  ],
  entryComponents: [
    RegisterDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpModule
  ],
  providers: [ProvinceResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
