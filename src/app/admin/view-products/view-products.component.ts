import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products =[
    {
      id:28,
      categoryName:'Nuoc Ngot',
      productName:'Nuoc Sting',
      quantity:20,
      price:20000,
      category:{
        categoryName:'Nuoc Ngot'
        } 
    },
    {
      id:29,
      categoryName:'Nuoc Ngot',
      productName:'Nuoc CoCaCola',
      quantity:20,
      price:20000,
      category:{
        categoryName:'Nuoc Ngot'
        } 
    },
  ]

  id:any;
  
  constructor(
    private router:ActivatedRoute,
    private productService:ProductsService
  ) { }

  ngOnInit(): void {

    this.router.params.subscribe((params)=>{
      this.id = params.id;
      if(this.id == 0){
        console.log('load all the product')
        this.productService.getProducts().subscribe((data:any)=>{
          this.products = data;
          console.log(this.products);
        },(error)=>{
          console.log(error); 
            
          Swal.fire('Error !','Error in loading data from server', 'error');
        });
      }else{
          console.log('load specific product');
        this.productService.getProductofCategory(this.id).subscribe((data:any)=>{
          this.products = data;
          console.log(this.products)
        },(error)=>{
          Swal.fire('Error !','Error in loading data from server', 'error');
        })
      }
    });
    
    // this.productService.getProducts().subscribe((data:any)=>{
    //   this.products=data;
    //   console.log(this.products);
    // },(error)=>{
    //   console.log(error);
    //   Swal.fire('Error !',"Error in loading data!",'error');
    // }
    // );
  }

  //deleteProduct

  deleteProduct(id:any){
      Swal.fire({
        icon: 'info',
        title:"Are you sure?",
        confirmButtonText:'Delete',
        showCancelButton:true,
      }).then((result)=>{

        if(result.isConfirmed){
          //delete
          this.productService.deleteProduct(id).subscribe((data:any)=>{
          this.products= this.products.filter((product)=> product.id != id);
            Swal.fire('Success !',"Product deleted",'success');
          },(error)=>{
            Swal.fire('Error !',"Error in deleting product!",'error');
            });
        }
      });
  }

}
