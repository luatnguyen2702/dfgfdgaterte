import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Employee } from '../service/employee';
import { EmployeeService } from '../service/employee.service';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {


  createForm!: UntypedFormGroup;
  id!:number;
  users!: Employee[];
  
  userName:any
  lastName: any;
  firstName: any;
  authorities:any;
  data!: any;
  employees!: Employee[];
  employeee: Employee = new Employee();

  genders=[ 
    {id:'Nam'},
    {id:'Nữ'}
  ];
   
  closeResult!: string;
  editForm! : UntypedFormGroup;
  detailsForm! : UntypedFormGroup;
  params:any
  email:any
  deleteId: any;

  user : any;

  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 8, 12];
  message = '';
  userNameValidator = new UntypedFormControl('',[Validators.required,
    Validators.pattern('^[a-zA-Z0-9_-]{5,16}$')]);

  passwordValidator = new UntypedFormControl('',[Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{4,12}$')]);

  name = new UntypedFormControl ('',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{0,20}$/)]);
    
  lastname = new UntypedFormControl ('',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{0,20}$/)]);
    
  fullname = new UntypedFormControl ('',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{0,50}$/)]);
    
  dob = new UntypedFormControl('',[Validators.required, 
    Validators.pattern(/^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/)]);
   
    // CCCD = new FormControl('',[Validators.required,
    //   Validators.pattern('^[0-9]{12}$')]);

    address = new UntypedFormControl('',[Validators.required,
      Validators.pattern(/^[a-z0-9A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_-]{0,60}$/)]); 

  // dob = new FormControl('',[Validators.required, 
  //       Validators.pattern(/^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/)]);
    
  phone = new UntypedFormControl('', [Validators.required,
        Validators.pattern('(\\+84|0)+(3[2-9]|5[6|8|9]|9\\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})\\b')]);
        
  emailValidator = new UntypedFormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  
  constructor(
    private router: Router,
    private modalService:NgbModal,
    private employeeService:EmployeeService,
    private route:ActivatedRoute,
    private fb : UntypedFormBuilder,
    private httpClient: HttpClient,
    private login:LoginService,
    private userService: UserService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    

    this.getEmployees();
    //
    this.user = this.login.getUser();

    //get by userName
    // let respo = this.employeeService.getEmployeesList();
    // respo.subscribe((data:any)=>this.users = data);

    //get by firstName
    let resp = this.employeeService.getEmployeesList();
    resp.subscribe((data:any)=>this.users = data);
    
    ///
    this.editForm = this.fb.group({
      id: [''],
      userName:[''],
      password:[''],
      firstName: [''],
      lastName: [''],
      fullName: [''],
      birthday: [''],
      sex: [''],
      email: [''],
      phone: [''],
      indentity_Card:[''],
      address: [''],
      //
    }
     );
    ///
    this.detailsForm = this.fb.group({
      id: [''],
      userName:[''],
      password:[''],
      firstName: [''],
      lastName: [''],
      fullName: [''],
      birthday: [''],
      sex: [''],
      email: [''],
      phone: [''],
      indentity_Card:[''],
      address: [''],
    } );   
  }

  //userName
  getErrorMessageUserName() {
    if (this.userNameValidator.hasError('required')) {
      return 'Bạn phải nhập userName';
    }
    return this.userNameValidator.hasError('pattern') ? 'User Name phải từ 5-16 kí tự và không được có khoảng trắng' : '';
  }

  //pass
  getErrorMessagePassword() {
    if (this.passwordValidator.hasError('required')) {
      return 'Bạn phải nhập password';
    }
    return this.passwordValidator.hasError('pattern') ? 'Mật khẩu phải từ 4-12 kí tự thường và có ít nhất 1 số và 1 kí tự in hoa' : '';
  }

  //FirstName
  getErrorMessageFirstName() {
    if (this.name.hasError('required')) {
      return 'Bạn phải nhập Tên';
    }
    return this.name.hasError('pattern') ? ' Tên không hợp lệ' : '';
  }
//LastName
  getErrorMessageLastName() {
    if (this.lastname.hasError('required')) {
      return 'Bạn phải nhập Họ ';
    }
  return this.lastname.hasError('pattern') ? ' Họ không hợp lệ' : '';
}
  //FullName
  getErrorMessageFullName() {
    if (this.fullname.hasError('required')) {
      return 'Bạn phải nhập Họ Tên';
    }
    return this.fullname.hasError('pattern') ? ' Họ Tên không hợp lệ' : '';
  }

  //dateofbirth
  getErrorMessageDate() {
    if (this.dob.hasError('required')) {
      return 'Bạn phải nhập ngày sinh';
    }
    return this.dob.hasError('pattern') ? 'Ngày sinh phải là ngày hợp lệ ở định dạng DD-MM-YYYY' : '';
  }
   //dateofbirth
  //  getErrorMessageCCCD() {
  //   if (this.CCCD.hasError('required')) {
  //     return 'Bạn phải nhập CCCD/CMND';
  //   }
  //   return this.CCCD.hasError('pattern') ? 'CCCD/CMND không hợp lệ' : '';
  // }
   //Addreess
   getErrorMessageAddress() {
    if (this.address.hasError('required')) {
      return 'Bạn phải nhập địa chỉ';
    }
    return this.address.hasError('pattern') ? 'Địa chỉ không vượt quá 50 kí tự' : '';
  }
  
 //mail
 getErrorMessage() {
  if (this.emailValidator.hasError('required')) {
    return 'Bạn phải nhập email';
  }
  return this.emailValidator.hasError('pattern') ? 'Email không hợp lệ' : '';
}

 //phone
 getErrorMessageNumberPhone() {
  if (this.phone.hasError('required')) {
    return 'Bạn phải nhập số điện thoại';
  }
  return this.phone.hasError('pattern') ? 'Số điện thoại không hợp lệ' : '';
}
  //lay danh sach
  public getEmployees(){
    const params = this.getRequestParams( this.userName,this.firstName, this.lastName , this.email, this.page, this.pageSize);
    this.employeeService.getEmployeesList().subscribe((data:any) =>
    { 
      const totalItems:any= data;
      this.count = totalItems;
      this.employees = data;
    })
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams( this.userName,this.firstName, this.lastName , this.email, this.page, this.pageSize);
  }

  // // create
  // saveEmployee(){
  //   this.employeeService.createEmployee(this.employeee).subscribe(data =>{
  //     console.log(data);
  //     this.gotoEmployeeList();
  //     this.modalService.dismissAll();
  //   },
  //   error => console.log(error));
  // }

  // gotoEmployeeList(){
  //   this.router.navigate(['/employees']);
  // }

  // Getter function in order to get form controls value
  get f() {
    return this.editForm.controls;
  }

//Create
  onSubmit(){
    const url = 'http://localhost:8088/api/v1/registerUser';
  this.httpClient.post(url,this.employeee)
    .subscribe((data:any) => {
      this.ngOnInit(); //reload the table
      this.modalService.dismissAll(); //dismiss the modal
      Swal.fire('Sucess','Đăng ký thành công với User Name ' + data.userName + '!','success')
    },
    (error)=>{
      console.log(error);
       //alert snack
       this.snack.open('Người dùng với UserName này đã có! Hãy thử tên khác' ,'',{
        duration:2000,verticalPosition: 'top',horizontalPosition:'right'
      });
       return;
    });
  }

  // update
  onSave() {
    const editURL = 'http://localhost:8088/dashboard/user/' + this.editForm.value.id ;
    console.log(this.editForm.value);
    
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe(data => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  //Search

  findUserByFirstName(){
    this.employeeService.getUserByFirstName(this.firstName).subscribe((data:any) =>
      {
        this.users = data;
        console.log(data);
        this.employees = this.users;
      })
  }

  findUserByUserName(){
    this.employeeService.getUserName(this.userName).subscribe((data:any) =>
      {
        this.users = data;
        console.log(data);
        this.employees = this.users;
        
      })
  }

  //xóa nhân viên
  deleteEmployee(){
    const deleteURL = 'http://localhost:8088/dashboard/user/' + this.deleteId ;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }




  //modal Create Employeee
  openCreate(contentCreate:any) {
    this.modalService.open(contentCreate, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // modal update
  clickOpenUpdate(targetModal: any, employee: Employee) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.editForm.patchValue( {
    id: employee.id, 
    userName: employee.userName,
    password:employee.password,
    firstName: employee.firstName,
    lastName: employee.lastName,
    fullName:employee.fullName,
    birthday: employee.birthday,
    sex: employee.sex,
    email: employee.email,
    phone: employee.phone,
    indentity_Card: employee.indentity_Card,
    address: employee.address,
    profile:employee.profile
    
  });
 }


  // modal details
  clickOpenDetails(targetModal: any, employee: Employee) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.detailsForm.patchValue( {
    id: employee.id, 
    userName: employee.userName,
    password:employee.password,
    firstName: employee.firstName,
    lastName: employee.lastName,
    fullName:employee.fullName,
    birthday: employee.birthday,
    sex: employee.sex,
    email: employee.email,
    phone: employee.phone,
    indentity_Card: employee.indentity_Card,
    address: employee.address,
    profile:employee.profile
  });
 }
  
 clickOpenDelete(targetModal: any , employee:Employee){
  this.deleteId = employee.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
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

  getRequestParams(userName:string,firstName: string, lastName: string , emailID: string,page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (firstName) {
      params[`firstName`] = firstName;
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
    this.getEmployees();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getEmployees();
    
  }

}
