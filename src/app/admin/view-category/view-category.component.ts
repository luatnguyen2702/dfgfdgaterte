import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {


  categories = [
    {
      id:31,
      categoryName:'loading....'
    },
    
  ]
  constructor(private category:CategoryService) { }

  ngOnInit(): void {
    this.category.categories().subscribe((data:any) =>{
      this.categories =data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error !','Error in loading data', 'error');
    });
  }

}
