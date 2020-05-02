import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';

import { ProductListAdminComponent } from './product-list-admin/product-list-admin.component';
import { HardwareListComponent } from './Hardware/hardware-list/hardware-list.component';
import { HardwareListAdminComponent } from './Hardware/hardware-list-admin/hardware-list-admin.component';
import { SoftwareListComponent } from './Software/software-list/software-list.component';
import { SoftwareListAdminComponent } from './Software/software-list-admin/software-list-admin.component';
import { AddHardProductComponent } from './Hardware/AddHardProduct/AddHardProduct.component';
import { HardDetailsComponent } from './Hardware/HardDetails/HardDetails.component';
import { HProdDetailAdminComponent } from './Hardware/h-details-admin/h-details-admin.component';
import { HProdUpdateAdminComponent } from './Hardware/h-update-admin/h-update-admin.component';
import { SCrudComponent } from './Software/s-crud/s-crud.component';
import { SProdDetailComponent } from './Software/s-details/s-details.component';
import { SProdDetailAdminComponent } from './Software/s-details-admin/s-details-admin.component';
import { SProdUpdateAdminComponent } from './Software/s-update-admin/s-update-admin.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ConnectingToDatabaseService } from './services/connecting-to-database.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewAllUserComponent } from './viewalluser/viewalluser.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {TooltipModule} from 'primeng/tooltip';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/primeng';


@NgModule({
  imports: [
    DropdownModule,
    ButtonModule,
    TabViewModule,
    TooltipModule,
    MenuModule,
    TableModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      // { path: '', component: ProductListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/admin', component: ProductListAdminComponent },
      { path: 'products/0', component: HardwareListComponent },
      { path: 'products/admin/0', component: HardwareListAdminComponent },
      { path: 'products/1', component: SoftwareListComponent },
      { path: 'products/admin/1', component: SoftwareListAdminComponent },
      { path: 'products/2', component: HCrudComponent },
      { path: 'Edit/0', component: HCrudComponent },
      { path: 'hProd/:id', component: HProdDetailComponent },
      { path: 'hProd/admin/:id', component: HProdDetailAdminComponent },
      { path: 'hUpdate/admin/:id', component: HProdUpdateAdminComponent },
      { path: 'Edit/1', component: SCrudComponent },
      { path: 'sProd/:id', component: SProdDetailComponent },
      { path: 'sProd/admin/:id', component: SProdDetailAdminComponent },
      { path: 'sUpdate/admin/:id', component: SProdUpdateAdminComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'alluser', component: ViewAllUserComponent }
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductListAdminComponent,
    HardwareListComponent,
    HardwareListAdminComponent,
    SoftwareListComponent,
    SoftwareListAdminComponent,
    HCrudComponent,
    HProdDetailComponent,
    HProdDetailAdminComponent,
    HProdUpdateAdminComponent,
    SCrudComponent,
    SProdDetailComponent,
    SProdDetailAdminComponent,
    SProdUpdateAdminComponent,
    LoginComponent,
    RegisterComponent,
    ViewAllUserComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/