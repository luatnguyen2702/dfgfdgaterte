import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-load-category',
  templateUrl: './load-category.component.html',
  styleUrls: ['./load-category.component.css']
})
export class LoadCategoryComponent implements OnInit {

  categories:any
  constructor(
    private _cat:CategoryService,
    private snack:MatSnackBar) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      this.categories = data;
    },(error)=>{
      this.snack.open('Error in loading categories from server','',{
        duration:2000,
      });
    });
  }

}
