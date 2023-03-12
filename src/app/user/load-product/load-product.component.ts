import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.css']
})
export class LoadProductComponent implements OnInit {

  id:any;
  products:any;
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
            
          alert('error');
        });
      }else{
          console.log('load specific product');
        this.productService.getProductofCategory(this.id).subscribe((data:any)=>{
          this.products = data;
          console.log(this.products)
        },(error)=>{
          alert("error in loading product");
        })
      }
    });
  }
}
