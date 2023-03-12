import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/service/category.service';
import { Employee } from 'src/app/service/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { WorkSchedule } from 'src/app/service/work-schedule';
import { WorkserviceService } from 'src/app/service/workservice.service';
import { WorkScheduleComponent } from 'src/app/work-schedule/work-schedule.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  id!:number;
  id_work!:number;
  lastName: any;
  firstName: any;
  employees!: Employee[];
  user! :Employee;
  ngay_thang_nam!: string;
  ten_nhan_vien1!: string;
  ten_nhan_vien2!: string;
  ca_lam_viec!: string;
  work_schedules!: WorkSchedule[];
  work! :WorkSchedule;

  data!: any;
  userName = null;
  detailsForm! : FormGroup;
  editForm! : FormGroup;
  
  
  constructor(
    private employeeService:EmployeeService,
    private router: Router,
    private loginService:LoginService,
    private workService:WorkserviceService,
    private modalService:NgbModal,
    private fb : FormBuilder,
    private httpClient: HttpClient,
   
    ) { }

  ngOnInit(): void {

    this.user = this.loginService.getUser();
    this.getWorkSchedules();
    this.loginService.loginStatusSubject.asObservable().subscribe(
      data =>{
        this.user = this.loginService.getUser();
      })
      ///
    
      //
      this.editForm = this.fb.group({
        id: [''],
        userName:[''],
        password:[''],
        firstName: [''],
        fullName: [''],
        lastName: [''],
        birthday: [''],
        sex: [''],
        email: [''],
        phone: [''],
        indentity_Card:[''],
        address: [''],
      } );
  }

  //lấy danh sách lịch làm việc
  public getWorkSchedules(){
  
    this.workService.getWorkScheduleList().subscribe(data =>
    { 
      this.work_schedules = data;
    })
  }

  // update work
  updateWorkSchedule(id: number){
    this.router.navigate(['update-work-schedule',id])
  }


  // update infomation employee
  onSave() {
    const editURL = 'http://localhost:8088/dashboard/user/' + this.editForm.value.id ;
    console.log(this.editForm.value);
    
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe(data => {
        this.ngOnInit();
        
        this.modalService.dismissAll();
        
      });
      location.reload
  }

  // modal update
  clickOpenUpdate(targetModal: any, user: Employee) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.editForm.patchValue( {
    id: this.user.id, 
    userName: this.user.userName,
    password:this.user.password,
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    fullName:this.user.fullName,
    birthday: this.user.birthday,
    sex: this.user.sex,
    email: this.user.email,
    phone: this.user.phone,
    indentity_Card: this.user.indentity_Card,
    address: this.user.address,
    profile:this.user.profile
    
  });
 }
  
}
