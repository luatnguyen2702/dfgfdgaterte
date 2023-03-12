import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cid = 0
  category:any
  constructor(
    private ac_router:ActivatedRoute,
    private categoryService:CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cid = this.ac_router.snapshot.params.cid;
    this.categoryService.getCategoryById(this.cid).subscribe((data:any)=>{
      this.category = data;
      console.log(this.category);
    },(error)=>{
      console.log(error);
    });
  }

//update 

public updateCategory(){
  //validate
  this.categoryService.updateCategory(this.category).subscribe((data:any)=>{
    Swal.fire('Success!!','category update success','success').then((e)=>{
      this.router.navigate(['/admin/category']);
    });
  },(error)=>{
    Swal.fire('Error!!','category update fail','error');
    console.log(error);
  })
}
}
