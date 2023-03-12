import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  products = new FormControl ('',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{0,50}$/)]);
    
  constructor(
    private ac_router:ActivatedRoute,
    private productService:ProductsService,
    private categoryService:CategoryService,
    private router:Router,
    private _snack: MatSnackBar
  ) { }

  pid = 0;

  product: any
  categories:any



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

  //FirstName
  getErrorMessageProduct() {
    if (this.products.hasError('required')) {
      return 'Bạn phải nhập Tên Sản Phẩm';
    }
    return this.products.hasError('pattern') ? ' Tên Sản Phẩm không hợp lệ' : '';
  }
  //update 

  public updateProduct(){
    //validate
    this.productService.updateProduct(this.product).subscribe((data:any)=>{
      if(this.product.productName.length >50){
        //alert snack
        this._snack.open('Tên Sản Phẩm phải <= 50 kí tự !' ,'',{
          duration:2000,verticalPosition: 'top',horizontalPosition:'right'
        });
         return;
      }
      if(this.product.productName.trim()=='' || this.product.productName== null){
        this._snack.open('Tên Sản Phẩm là bắt buộc !! ' ,'',{
          duration:2000
        });
        return;
      }
  
      
      if(this.product.price >0 && this.product.price < 5000){
        this._snack.open('Giá không hợp lệ !! ' ,'',{
          duration:2000
        });
        return;
      }
  
      if(this.product.price <= -1){
        this._snack.open('Giá không thể âm !! ' ,'',{
          duration:2000
        });
        return;
      }
  
      if(this.product.price > 30000){
        this._snack.open('Giá không hợp lệ !! ' ,'',{
          duration:2000
        });
        return;
      }
  
      if(this.product.quantity < 0){
        this._snack.open('Số lượng không thể âm !! ' ,'',{
          duration:2000
        });
        return;
      }
      if(this.product.quantity > 99){
        this._snack.open('Số lượng không thể âm !! ' ,'',{
          duration:2000
        });
        return;
      }
  
      if(this.product.quantity== 0 || this.product.quantity == null){
        this._snack.open('Số lượng là bắt buộc !! ' ,'',{
          duration:2000
        });
        return;
      }
  
      if(this.product.price== 0 || this.product.price == null){
        this._snack.open('Giá là bắt buộc !! ' ,'',{
          duration:2000
        });
        return;
      }
      Swal.fire('Success!!','product update success','success').then((e)=>{
        this.router.navigate(['/admin/inventory/0']);
      });
    },(error)=>{
      Swal.fire('Error!!','product update fail','error');
      console.log(error);
    })
  }
}
