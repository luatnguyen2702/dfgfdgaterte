import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  registerForm: UntypedFormGroup = new UntypedFormGroup({
  });
  isLoggedIn() {
    throw new Error('Phương thức không thực hiện.');
  }

  userName = new UntypedFormControl('',[Validators.required,
    Validators.pattern('^[A-Za-z0-9_-]{5,16}$')]);

    passwordValidator = new UntypedFormControl('',[Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{4,12}$')]);
  loginData={
    userName:'',
    password:'',
  };
  constructor(private snack:MatSnackBar,
    private login:LoginService,
    private router:Router) { }

  ngOnInit(): void {
  }

//userName
getErrorMessageUserName() {
  if (this.userName.hasError('required')) {
    return 'Bạn phải nhập userName';
  }
  return this.userName.hasError('pattern') ? 'User Name phải từ 5-16 kí tự(A-Z,a-z,0-9,-,_) và không được có khoảng trắng và các kí tự đặc biệt khác' : '';
}
//pass
getErrorMessagePassword() {
  if (this.passwordValidator.hasError('required')) {
    return 'Bạn phải nhập password';
  }
  return this.passwordValidator.hasError('pattern') ? 'Mật khẩu phải từ 4-12 kí tự thường và có ít nhất 1 số và 1 kí tự in hoa' : '';
}
  formSubmit(){

    if(this.loginData.userName.length <5){
      //alert snack
      this.snack.open('Tên Người Dùng phải từ 5-16 kí tự !' ,'',{
        duration:2000,verticalPosition: 'top',horizontalPosition:'right'
      });
       return;
    }
    if(this.loginData.userName.trim()==''|| 
      this.loginData.userName==null){

      this.snack.open('Username là bắt buộc', '',{
        duration:2000,verticalPosition: 'top',horizontalPosition:'right'
      });
      return;
    }

    if(this.loginData.password.length<4){

      this.snack.open('Passworld phải từ 4 - 12 kí tự', '',{
        duration:2000,verticalPosition: 'top',horizontalPosition:'right'
      });
      return;
    }
    if(this.loginData.password.trim()==''|| 
      this.loginData.password==null ){

      this.snack.open('Password là bắt buộc', '',{
        duration:2000,verticalPosition: 'top',horizontalPosition:'right'
      });
      return;
    }
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('Sucess!');
        console.log(data);
        //Login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect ...Admin:admin-dashboard
             //redirect ...Normal:normal-dashboard

             if(this.login.getUserRole()=='ADMIN'){
              //admin dashboard
              // window.location.href='/admin';
              this.router.navigate(['/admin']);
              this.login.loginStatusSubject.next(true);
             }else if(this.login.getUserRole()=='NORMAL'){
              //normal dashboard
              // window.location.href='/user';
              this.router.navigate(['/user']);
              this.login.loginStatusSubject.next(true);
             }else{
               this.login.logout();
               location.reload
             }
          }
        )
      },
      (error)=>{
        console.log('Error!');
        console.log(error);
        this.snack.open('Thông tin tài khoản hoặc mật khẩu không chính xác!!! Vui lòng nhập lại.', '',{
          duration:2000,
        })
      }
    );
  }
}
