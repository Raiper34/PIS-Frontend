import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import {PublicModule} from "./public/public.module";
import {PrivateModule} from "./private/private.module";
import {PrivateComponent} from "./private/private.component";
import {PublicComponent} from "./public/public.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'public', pathMatch: 'full'},
  {path: 'private', loadChildren: 'app/private/private.module#PrivateModule'},
  {path: 'public', loadChildren: 'app/public/public.module#PublicModule'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    MaterializeModule,
    PrivateModule,
    PublicModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
