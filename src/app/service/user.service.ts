import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { WorkSchedule } from './work-schedule';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(
    private http:HttpClient
  ) { }

  getWorkScheduleList():Observable<WorkSchedule[]>{
    return this.http.get<WorkSchedule[]>(`${baseUrl}/dashboard/work_schedules`); 
  }

  //
  public addUser(user: any){
    return this.http.post(`${baseUrl}/api/v1/registerUser`,user)
  }

 
}
