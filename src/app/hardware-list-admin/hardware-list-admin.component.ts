import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { HProd } from '../models/HProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {TooltipModule} from 'primeng/tooltip';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/primeng';

import { BehaviorSubject, Subject, Subscription, EMPTY } from 'rxjs';


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

  datasource: HProd[];
  productList: HProd[];
  totalRecords: number;
  cols: any[];
  loading: boolean;

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
  
  
  public Hproducts = this._dbService.getAllHData();

  public initializeDT(){
    
    this.Hproducts.subscribe(data => { this.datasource = data, this.totalRecords = data.length});
    // this.totalRecords = this.Hproducts.length;
    this.cols = [
    { field: 'HardwareID', name: 'HardwareID', header: 'Hardware ID' },
    { field: 'Product_Name', name: 'Product_Name', header: 'Product Name' },
    {field: 'Long_Description', name: 'Long_Description',header: 'Description'},
    {field: 'Details',name: 'Details', header: 'Details'},

    
     ]
  
      this.loading = true;
     
     }
     
     
     nextPage(event: LazyLoadEvent){
    this.loading = true;
    // event.first = 0
    // event.rows = 3 
    // event.sortField ='' ;
    // event.sortOrder = -1;
    //filters:{}
    //API call here

   setTimeout(() => {
    if (this.datasource) {
        this.productList = this.datasource.slice(event.first, (event.first + event.rows));
        console.log(` sliced ${this.productList}`);
        this.loading = false;
     }
    }, 1000);
    
  }

  ngOnInit() {
    // this.getData(this.pager.toString());
    this.initializeDT();
    
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

