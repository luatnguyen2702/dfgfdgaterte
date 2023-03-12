import { Component,  OnInit,} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2'
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {
  ContentError : string | undefined;
  public edited = false;
  hide = true;
  public errorEmail = false;
  registerForm: UntypedFormGroup = new UntypedFormGroup({
  });
  // ,UsernameValidator.cannotContainSpace
  userName = new UntypedFormControl('',[Validators.required,
      Validators.pattern('^[a-z0-9_-]{5,16}$')]);

    numberphone = new UntypedFormControl('', [Validators.required,
        Validators.pattern('(\\+84|0)+(3[2-9]|5[6|8|9]|9\\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})\\b')]);
          
   fullName = new UntypedFormControl ('',[Validators.required,Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{0,50}$/)]);

  
  emailValidator = new UntypedFormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$")]);

  passwordValidator = new UntypedFormControl('',[Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{4,12}$')]);

  constructor(private userService: UserService,
    private snack:MatSnackBar,
    private fb: UntypedFormBuilder,
    ) {     }

  public user ={
    userName:'',
    password:'',
    firstName:'',
    fullName:'',
    lastName:'',
    phone:'',
    email:'',
   
  };

  ngOnInit(): void {
    
  }

  //userName
  getErrorMessageUserName() {
    if (this.userName.hasError('required')) {
      return 'Bạn phải nhập userName';
    }
    return this.userName.hasError('pattern') ? 'User Name phải từ 5-16 kí tự(A-Z,a-z,0-9,-,_) và không được có khoảng trắng và các kí tự đặc biệt khác' : '';
  }

   //FulltName
   getErrorMessageFullName() {
    if (this.fullName.hasError('required')) {
      return 'Bạn phải nhập Tên';
    }
    return this.fullName.hasError('pattern') ? ' Tên không hợp lệ' : '';
  }

  //mail
  getErrorMessage() {
    if (this.emailValidator.hasError('required')) {
      return 'Bạn phải nhập email';
    }
    return this.emailValidator.hasError('pattern') ? 'Email không hợp lệ' : '';
  }

  //pass
  getErrorMessagePassword() {
    if (this.passwordValidator.hasError('required')) {
      return 'Bạn phải nhập password';
    }
    return this.passwordValidator.hasError('pattern') ? 'Mật khẩu phải từ 4-12 kí tự thường và có ít nhất 1 số và 1 kí tự in hoa' : '';
  }
  //phone
  getErrorMessageNumberPhone() {
    if (this.numberphone.hasError('required')) {
      return 'Bạn phải nhập phone';
    }
    return this.numberphone.hasError('pattern') ? 'Số điện thoại không hợp lệ' : '';
  }

  formSubmit(){
    if(this.user.userName==''|| this.user.userName == null){
      //alert snack
      this.saveTodos();
      this.ContentError = 'Tên Người Dùng là bắt buộc!'; 
       return;
    }
    if(this.userName.hasError('pattern') == true){
      //alert snack
      this.saveTodos();
      this.ContentError = 'Tên Người Dùng phải từ 5-16 kí tự !'; 
       return;
    }
    //
    if(this.passwordValidator.hasError('pattern') == true){
      this.saveTodos();
      this.ContentError = 'Mật khẩu phải từ 4-12 kí tự thường và có ít nhất 1 số và 1 kí tự in hoa'; 
      return;
    }
    if(this.user.password==''|| this.user.password == null ){
      //alert snack
      this.saveTodos();
      this.ContentError = 'Mật Khẩu là bắt buộc!'; 
       return;
    }

    if(this.user.fullName.length >50){
      //alert snack
      this.saveTodos();
      this.ContentError = 'Họ và Tên phải <= 50 kí tự !'; 
       return;
    }
    //
    if(this.fullName.hasError('pattern') == true){
      this.saveTodos();
      this.ContentError = "Tên không hợp lệ";
      return;
    }
    //
    if(this.user.phone==''|| this.user.phone == null){
      //alert snack
      this.saveTodos();
      this.ContentError = 'Số điện thoại là bắt buộc!'; 
       return;
    }
    
    
    if(this.user.email==''|| this.user.email == null){
      //alert snack
      this.saveTodos();
      this.ContentError = 'Email là bắt buộc!'; 
       return;
    }
    if(this.emailValidator.hasError('pattern') == true){
      this.saveTodos();
      this.ContentError = 'Email sai cú pháp!'; 
      return
    }
    if(this.numberphone.hasError('pattern')== true){
      this.saveTodos();
      this.ContentError = 'Phone sai cú pháp!'; 
      return
    }
    //validate

    //add
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //sucess
        this.saveTodos();
        this.ContentError = "Đăng ký thành công";
      },
      (error)=>{
        console.log(error);
        this.saveTodos();
        this.ContentError = 'Người dùng với UserName này đã có! Hãy thử tên khác !'; 
      }
    );
  }
  saveTodos(): void {
    //show box msg
    this.edited = true;
    //wait 3 Seconds and hide
    setTimeout (() => {
      this.edited = false;
   }, 4000);
   }
}
// export class UsernameValidator {
//   static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
//       if((control.value as string).indexOf(' ') >= 0){
//           return {cannotContainSpace: true}
//       }

//       return null;
//   }
// } 

