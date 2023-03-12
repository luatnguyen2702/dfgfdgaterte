import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-update-product',
  templateUrl: './user-update-product.component.html',
  styleUrls: ['./user-update-product.component.css']
})
export class UserUpdateProductComponent implements OnInit {

  pid = 0;

  product: any
  categories:any
  constructor(
    private ac_router:ActivatedRoute,
    private productService:ProductsService,
    private categoryService:CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.pid = this.ac_router.snapshot.params.pid;
   this.productService.getProductById(this.pid).subscribe((data:any)=>{
     this.product = data;
     console.log(this.product);
   },(error)=>{
     console.log(error);
   });
   
   this.categoryService.categories().subscribe((data:any)=>{
     this.categories = data;
   },(error)=>{
     alert('error in loading category')
   });
  }

   //update 

   public updateProduct(){
    //validate
    this.productService.updateProduct(this.product).subscribe((data:any)=>{
      Swal.fire('Success!!','product update success','success').then((e)=>{
        this.router.navigate(['/user/inventory/0']);
      });
    },(error)=>{
      Swal.fire('Error!!','product update fail','error');
      console.log(error);
    })
  }

}
