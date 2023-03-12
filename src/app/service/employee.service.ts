import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseURL="http://localhost:8088/dashboard/users"//web service
  
  constructor(
    private httpClient: HttpClient
  ) { }

  //get all danh sách
  getEmployeesList():Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`); 
  }

  //
  getUserName(userName :String):Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}/${userName}`); 
  }

  

  getUserByFirstName(firstName: String):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/firstName/${firstName}`);
  }

  // createEmployee(employeee:Employee):Observable<Object>{
  //   return this.httpClient.post(`${this.baseURL}`,employeee);
  // }

  // getEmployeeById(id:number):Observable<Employee>{
  //   return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  // }
   
  // updateEmployee(id:number , employee:Employee):Observable<Object>{
  //   return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  // }

  // deleteEmployee(id:number ):Observable<Object>{
  //   return this.httpClient.delete(`${this.baseURL}/${id}` );
  // }
}
