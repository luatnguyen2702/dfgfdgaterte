import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http:HttpClient
  ) { }

  //get allProduct
  public getProducts(){
    return this.http.get(`${baseUrl}/product/allProducts`);
  }

  //addProduct
  public addProduct(product:any){
    return this.http.post(`${baseUrl}/product/addProduct`,product)
  }

  //get product id
  public getProductById(id:any){
    return this.http.get(`${baseUrl}/product/${id}`);
  }

  //get product of category
  public getProductofCategory(id:any){
    return this.http.get(`${baseUrl}/product/category/${id}`);
  }

  //updateProduct
  public updateProduct(product:any){
    return this.http.put(`${baseUrl}/product/updateProduct`,product);
  }

  //deleteProduct

  public deleteProduct(id:any){
    return this.http.delete(`${baseUrl}/product/deleteProduct/${id}`);
  }
}
