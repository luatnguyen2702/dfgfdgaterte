import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }

  //get all categories
  public categories(){
    return this.http.get(`${baseUrl}/category/allCategories`);
  }

  //add new category
  public addCategory(category:any){
    return this.http.post(`${baseUrl}/category/addcategory`,category)
  }

  //get category by id
  public getCategoryById(id:any){
    return this.http.get(`${baseUrl}/category/${id}`);
  }

  //update category
  public updateCategory(category:any){
    return this.http.put(`${baseUrl}/category/updateCategory`,category);
  }
}
