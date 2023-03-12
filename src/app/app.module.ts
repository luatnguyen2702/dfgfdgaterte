import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule} from'@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { authInterceptorProviders } from './service/auth.interceptor.ts.service';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDashboardComponent} from './user/user-dashboard/user-dashboard.component';
import { WorkScheduleComponent } from './work-schedule/work-schedule.component';
import { UpdateWorkUserDashboardComponent } from './user/update-work-user-dashboard/update-work-user-dashboard.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { ViewCategoryComponent } from './admin/view-category/view-category.component';
import {MatListModule} from '@angular/material/list';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import {MatSelectModule} from '@angular/material/select';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { IventoryComponent } from './user/iventory/iventory.component';
import { LoadProductComponent } from './user/load-product/load-product.component';
import { LoadCategoryComponent } from './user/load-category/load-category.component';
import { UserUpdateProductComponent } from './user/user-update-product/user-update-product.component';
import { UpdateCategoryComponent } from './admin/update-category/update-category.component';
import { InventoryAdminComponent } from './admin/inventory-admin/inventory-admin.component';
import { LoadCategoryAdminComponent } from './admin/load-category-admin/load-category-admin.component';
import { ClipboardModule } from "@angular/cdk/clipboard";

@NgModule({
  declarations: [
   AppComponent,
   LoginComponent,
   RegisterComponent,
   NavbarComponent,
   FooterComponent,
   HomeComponent,
   DashboardComponent,
   EmployeeListComponent,
   UserDashboardComponent,
   WorkScheduleComponent,
   UpdateWorkUserDashboardComponent,
   AddCategoryComponent,
   ViewCategoryComponent,
   ViewProductsComponent,
   AddProductComponent,
   UpdateProductComponent,
   IventoryComponent,
   LoadProductComponent,
   LoadCategoryComponent,
   UserUpdateProductComponent,
   UpdateCategoryComponent,
   InventoryAdminComponent,
   LoadCategoryAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatListModule,
    MatSelectModule,
    ClipboardModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
