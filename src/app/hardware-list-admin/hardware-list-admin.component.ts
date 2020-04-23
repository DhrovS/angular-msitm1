import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { HProd } from '../models/HProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-hardware-list-admin',
  templateUrl: './hardware-list-admin.component.html',
  styleUrls: ['./hardware-list-admin.component.css'],
  providers: [ ConnectingToDatabaseService ]
})

export class HardwareListAdminComponent implements OnInit {
  searchText;
  pager = 0;
  product;
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'Product_Name';
  color;
  public HProducts: Array<any> = [];

  constructor(
    
  private _dbService: ConnectingToDatabaseService,
  private _http: HttpClient,
  private route: ActivatedRoute) { }

  public getCount() {
    return JSON.parse(JSON.stringify(this.pager))
    console.log(JSON.parse(JSON.stringify(this.pager)))
  }
  public incCount(){
    this.pager = this.pager+1;
    console.log(this.pager)
  }
  public decCount(){
    this.pager = this.pager-1;
    console.log(this.pager)
  }

  public getData(page?: string) {
    this._dbService.getData(page)
      .subscribe(
        (response: any) => {
          this.HProducts = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }

  ngOnInit() {
    this.getData(this.pager.toString());
    // this.route.queryParams.subscribe(response => this.loadPage('1'));

    //  leave it here for rn, let's try in detail first since you already set up by each specific products in detail page.                
  }
  
  ngOnChanges(changes : SimpleChanges) {
    this.getData(this.pager.toString());
  }

  changeColorOne() {
     this.color = !this.color;
     if (this.color) {
       return '#ffffff';
     } else {
      return '#f6f6f6';
     }
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.records.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  model: any = {};
  model2: any = {}; 
  myValue;
}

