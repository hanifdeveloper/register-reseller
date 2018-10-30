import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { ProvinceResolver } from './shared/resolver/province.resolver';
import { RegisterDialogComponent } from './components/shared/register-dialog/register-dialog.component';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    ClipboardModule
  ],
  providers: [ProvinceResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
