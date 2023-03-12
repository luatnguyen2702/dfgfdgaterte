import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { InventoryAdminComponent } from './admin/inventory-admin/inventory-admin.component';
import { UpdateCategoryComponent } from './admin/update-category/update-category.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { ViewCategoryComponent } from './admin/view-category/view-category.component';
import { ViewProductsComponent } from './admin/view-products/view-products.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './service/admin.guard';
import { NormalGuard } from './service/normal.guard';
import { IventoryComponent } from './user/iventory/iventory.component';
import { LoadProductComponent } from './user/load-product/load-product.component';
import { UpdateWorkUserDashboardComponent } from './user/update-work-user-dashboard/update-work-user-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserUpdateProductComponent } from './user/user-update-product/user-update-product.component';
import { WorkScheduleComponent } from './work-schedule/work-schedule.component';

const routes: Routes = [
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'register', component:RegisterComponent,pathMatch:'full'},
  {path:'',component:HomeComponent},
  {path:'admin',component:DashboardComponent,pathMatch:'full',canActivate:[AdminGuard]},
  {path:'user',component:UserDashboardComponent,pathMatch:'full',canActivate:[NormalGuard]},
  {path:'admin/employee',component:EmployeeListComponent,pathMatch:'full',canActivate:[AdminGuard]},
  {path:'work-schedule',component:WorkScheduleComponent,pathMatch:'full',canActivate:[AdminGuard]},
  {path:'update-work-schedule/:id',component:UpdateWorkUserDashboardComponent,pathMatch:'full',canActivate:[NormalGuard]},
  {path:'admin/category', component:ViewCategoryComponent,canActivate:[AdminGuard]},
  {path:'admin/add-category',component:AddCategoryComponent,canActivate:[AdminGuard]},
  {path:'admin/update-category/:cid',component:UpdateCategoryComponent,canActivate:[AdminGuard]},
  {path:'admin/products',component:ViewProductsComponent,canActivate:[AdminGuard]},
  {path:'admin/add-product',component:AddProductComponent,canActivate:[AdminGuard]},
  {path:'admin/update-product/:pid',component:UpdateProductComponent,canActivate:[AdminGuard]},
  {path:'admin/inventory', component:InventoryAdminComponent,canActivate:[AdminGuard],
    children:[
      {path:':id',component:ViewProductsComponent}
    ]
  },
  {path:'user/inventory',component:IventoryComponent,canActivate:[NormalGuard],
    children:[
      {path:':id',
      component:LoadProductComponent
    },]
  },
  {path:'user/update-product/:pid',component:UserUpdateProductComponent,canActivate:[NormalGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
