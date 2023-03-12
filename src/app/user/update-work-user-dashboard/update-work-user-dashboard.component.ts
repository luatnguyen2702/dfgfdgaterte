import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { WorkSchedule } from 'src/app/service/work-schedule';
import { WorkserviceService } from 'src/app/service/workservice.service';

@Component({
  selector: 'update-work-user-dashboard',
  templateUrl: './update-work-user-dashboard.component.html',
  styleUrls: ['./update-work-user-dashboard.component.css']
})
export class UpdateWorkUserDashboardComponent implements OnInit {
  id=0;
  ngay_thang_nam!: string;
  nhan_vien1!: string;
  nhan_vien2!: string;
  nhan_vien3!: string;
  nhan_vien4!: string;
  nhan_vien5!: string;
  nhan_vien6!: string;
  ca_lam_viec!: string;
  work_scheduless: WorkSchedule = new WorkSchedule();
  data!: any;

  employees:any

  


  constructor(private workService: WorkserviceService,
    private router: Router,private route:ActivatedRoute,
    private employeeService:EmployeeService) { }

  ngOnInit(): void {

    // this.isEdited();
    // tu dong dien gia tri vao
    this.id = this.route.snapshot.params['id'];
    this.workService.getWorkScheduleId(this.id).subscribe(data =>{
      this.work_scheduless = data;
    },
      error =>console.log(error)
    );

       this.employeeService.getEmployeesList().subscribe((data:any) =>
        { 
          this.employees = data;
          console.log(this.employees);
        },(error)=>{
            alert('error in loading employee')
           });

        // this.categoryService.categories().subscribe((data:any)=>{
        //   this.categories = data;
        // },(error)=>{
        //   alert('error in loading category')
        // });
      
  } 
  
  

    //trỏ tới trang danh sach user
    gotoWorkScheduleList(){
      this.router.navigate(['/user']);
    }
    
    clickUpdateWork(){
      
      this.workService.updateWorkSchedule(this.id,this.work_scheduless).subscribe(data =>{
        this.gotoWorkScheduleList();
      },error =>console.log(error));

    }
    
    
}
