import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSchedule } from '../service/work-schedule';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkserviceService } from '../service/workservice.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { Employee } from '../service/employee';
@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {
  id!:number;
  ngay_thang_nam!: string;
  thu!: string;
  ten_nhan_vien1!: string;
  ten_nhan_vien2!: string;
  ca_lam_viec!: string;
  work_schedules!: WorkSchedule[];
  work_scheduless: WorkSchedule = new WorkSchedule();
  work! :WorkSchedule;

  data!: any;
  params:any;
  closeResult!: string;
  editForm! : FormGroup;
  detailsForm! : FormGroup;
  deleteId: any;

  deleteForm!:FormGroup;
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 8, 12];
  message = '';

  date = new FormControl('',[Validators.required, 
    Validators.pattern(/^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/)]);


  constructor(private router: Router,
    private modalService:NgbModal,
    private workService:WorkserviceService,
    private route:ActivatedRoute,
    private fb : FormBuilder,
    private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.getWorkSchedules();

    this.editForm = this.fb.group({
      id: [''],
      ngay_thang_nam:[''],
      thu:[''],
      nhan_vien1: [''],
      nhan_vien2: [''],
      nhan_vien3: [''],
      nhan_vien4: [''],
      nhan_vien5: [''],
      nhan_vien6: [''],
    } );

    // this.deleteForm = this.fb.group({
    //   id:[''],
    //   ngay_thang_nam:['']
    // })
  }

  //Date
  getErrorMessageDate() {
    if (this.date.hasError('required')) {
      return 'Bạn phải nhập ngày làm';
    }
    return this.date.hasError('pattern') ? 'Ngày sinh phải là ngày hợp lệ ở định dạng DD-MM-YYYY' : '';
  }

  //lay danh sach
  public getWorkSchedules(){
    const params = this.getRequestParams( this.ngay_thang_nam, this.thu , this.ten_nhan_vien1,this.ten_nhan_vien2, this.ca_lam_viec, this.page, this.pageSize);
    this.workService.getWorkScheduleList().subscribe(data =>
    { 
      const totalItems:any= data;
      this.count = totalItems;
      this.work_schedules = data;
    })
  }

//Create
onSubmit(f:NgForm){
  const url = 'http://localhost:8088/dashboard/create_work_schedules';
this.httpClient.post(url, f.value)
  .subscribe((result) => {
    this.ngOnInit(); //reload the table
  });
this.modalService.dismissAll(); //dismiss the modal
}

// update
onSave() {
  const editURL = 'http://localhost:8088/dashboard/work_schedules/' + this.editForm.value.id ;
  console.log(this.editForm.value);
  
  
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe(data => {
      this.ngOnInit();
      
      this.modalService.dismissAll();
    });
}

 //xóa nhân viên
 deleteWorkSchedule(){
  const deleteURL = 'http://localhost:8088/dashboard/work_schedules/' + this.deleteId ;
  this.httpClient.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

  //modal Create Work Schedule
  openCreate(contentCreate:any) {
    this.modalService.open(contentCreate, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // modal update
  clickOpenUpdate(targetModal: any, work: WorkSchedule) {
    this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
    });
  this.editForm.patchValue( {
    id: work.id, 
    ngay_thang_nam: work.ngay_thang_nam,
    thu:work.thu,
    nhan_vien1:work.nhan_vien1,
    nhan_vien2: work.nhan_vien2,
    nhan_vien3:work.nhan_vien3,
    nhan_vien4: work.nhan_vien4,
    nhan_vien5:work.nhan_vien5,
    nhan_vien6: work.nhan_vien6,
    
    });
  }

  ///open delete
  clickOpenDelete(targetModal: any , work: WorkSchedule){
    this.deleteId = work.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    // this.deleteForm.patchValue({
    //   id:work.id,
    //   ngay_thang_nam: work.ngay_thang_nam,
    // });
   }


 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
   ///page
   getRequestParams(ngay_thang_nam: string,thu:string, ten_nhan_vien1: string , ten_nhan_vien2: string,ca_lam_viec:string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (ngay_thang_nam) {
      params[`ngay_thang_nam`] = ngay_thang_nam;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
   
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    
    
  }

  
}
