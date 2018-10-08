import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinceResolver } from './shared/resolver/province.resolver';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: 'app/components/register/register.module#RegisterModule',
    resolve: {
      provinces: ProvinceResolver
    }
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
