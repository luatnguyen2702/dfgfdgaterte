import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    categoryName:''
  };

  constructor(
    private _category:CategoryService,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.categoryName.trim()=='' || this.category.categoryName==null){
      this.snack.open('Category Name is required','',{
        duration:2000,
      });
      return ;
    }
    //
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.categoryName='';
        
        Swal.fire("Success !!",'Category is added success','success');
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error','error');
      }
    )
  }
}
