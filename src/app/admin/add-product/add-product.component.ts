import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  num = 0
  categories =[
    {
      id:28,
      categoryName:'Ca phe'
    }
  ];

  productData={
    productName:'',
    quantity:0,
    price: 0,
    category:{
      id:''
     
    }
  };

  products = new FormControl ('',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{0,50}$/)]);
    
  constructor(
    private _categoryService:CategoryService,
    private _snack: MatSnackBar,
    private productService:ProductsService
  ) { }

  ngOnInit(): void {

    this._categoryService.categories().subscribe((data:any)=>{
      //categories load
      this.categories=data;
      console.log(this.categories);
    },(error)=>{
      console.log(error);
      Swal.fire('Error!!','error in loading data from server','error');
    })
  }

  //product Name
  getErrorMessageProduct() {
    if (this.products.hasError('required')) {
      return 'Bạn phải nhập Tên Sản Phẩm';
    }
    return this.products.hasError('pattern') ? ' Tên Sản Phẩm không hợp lệ' : '';
  }

  addProduct(){

    if(this.productData.productName.length >50){
      //alert snack
      this._snack.open('Tên Sản Phẩm phải <= 50 kí tự !' ,'',{
        duration:2000,verticalPosition: 'top',horizontalPosition:'right'
      });
       return;
    }
    if(this.productData.productName.trim()=='' || this.productData.productName== null){
      this._snack.open('Tên Sản Phẩm là bắt buộc !! ' ,'',{
        duration:2000
      });
      return;
    }

    
    if(this.productData.price >0 && this.productData.price < 5000){
      this._snack.open('Giá không hợp lệ !! ' ,'',{
        duration:2000
      });
      return;
    }

    if(this.productData.price <= -1){
      this._snack.open('Giá không thể âm !! ' ,'',{
        duration:2000
      });
      return;
    }

    if(this.productData.price > 30000){
      this._snack.open('Giá không hợp lệ !! ' ,'',{
        duration:2000
      });
      return;
    }

    if(this.productData.quantity < 0){
      this._snack.open('Số lượng không thể âm !! ' ,'',{
        duration:2000
      });
      return;
    }
    if(this.productData.quantity > 99){
      this._snack.open('Số lượng không thể âm !! ' ,'',{
        duration:2000
      });
      return;
    }

    if(this.productData.quantity== 0 || this.productData.quantity == null){
      this._snack.open('Số lượng là bắt buộc !! ' ,'',{
        duration:2000
      });
      return;
    }

    if(this.productData.price== 0 || this.productData.price == null){
      this._snack.open('Giá là bắt buộc !! ' ,'',{
        duration:2000
      });
      return;
    }
    //validate

    //
    this.productService.addProduct(this.productData).subscribe((data:any)=>{
      Swal.fire('Success','Thêm Sản Phẩm Thành Công ','success');
      this.productData={
        productName:'',
        quantity:0,
        price:0,
        category:{
          id:''
         
        }
      };
    },(error)=>{
      Swal.fire('Error','Vui lòng chọn danh mục cho sản phẩm  ','error');
    }
    )

  }

}
