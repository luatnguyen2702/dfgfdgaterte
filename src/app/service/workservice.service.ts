import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkSchedule } from './work-schedule';

@Injectable({
  providedIn: 'root'
})
export class WorkserviceService {

  public baseURL="http://localhost:8088/dashboard/work_schedules"//web service
  
  constructor(
    private httpClient: HttpClient
  ) { }

  //gọi web service bằng phương thức
  getWorkScheduleList():Observable<WorkSchedule[]>{
    return this.httpClient.get<WorkSchedule[]>(`${this.baseURL}`); 
  }

  //
  getUserName(userName :any):Observable<WorkSchedule[]>{
    return this.httpClient.get<WorkSchedule[]>(`${this.baseURL}/${userName}`); 
  }

  updateWorkSchedule(id:number , work:WorkSchedule):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, work);
  }

  getWorkScheduleId(id:number):Observable<WorkSchedule>{
    return this.httpClient.get<WorkSchedule>(`${this.baseURL}/${id}`);
  }
  // createEmployee(employeee:Employee):Observable<Object>{
  //   return this.httpClient.post(`${this.baseURL}`,employeee);
  // }

  
   
 

  // deleteEmployee(id:number ):Observable<Object>{
  //   return this.httpClient.delete(`${this.baseURL}/${id}` );
  // }

  getUserByLastName(lastName: String):Observable<WorkSchedule>{
    return this.httpClient.get<WorkSchedule>(`${this.baseURL}/${lastName}`);
  }
}
