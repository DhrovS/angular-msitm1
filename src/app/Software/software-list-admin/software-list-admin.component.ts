import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SProd } from '../../models/SProd';
import { ConnectingToDatabaseService } from "../../services/connecting-to-database.service";
import { AlertService} from "../../services/alert.service";
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
import { TableModule, Table } from 'primeng/table';
import { LazyLoadEvent,DataView } from 'primeng/primeng';
import { SelectItem, Message} from 'primeng/primeng';

@Component({
  selector: 'app-software-list-admin',
  templateUrl: './software-list-admin.component.html',
  styleUrls: ['./software-list-admin.component.css'],
  providers: [ ConnectingToDatabaseService ]
})
export class SoftwareListAdminComponent implements OnInit {
  @ViewChild('dt', {static: true}) dataTable: Table;

  // private categorySelectedSubject = new BehaviorSubject<number>(0);
  // categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  // private errorMessageSubject = new Subject<string>();
  // errorMessage$ = this.errorMessageSubject.asObservable();


  searchText;
  pager = 0;
  product;
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'Product_Name';
  color;
  public SProducts: Array<any> = [];

  datasource: SProd[];
  productList: SProd[];
  totalRecords: number;
  cols: any[];
  loading: boolean;

  constructor(
    
  private _dbService: ConnectingToDatabaseService,
  private _http: HttpClient,
  private route: ActivatedRoute) { }



  
  // /****Custome ColumnFilter Function */
  // public ColumnFilter(dt, value, field, matchMode) {
  //   //console.log("Datatable ="+dt+" value "+value+" field ="+JSON.stringify(field));
  //   dt.filter(value,field, matchMode);
  // }
  
  public Sproducts = this._dbService.getAllSData();


  public initializeDT(){
    
    this.Sproducts.subscribe(data => { this.datasource = data, this.totalRecords = data.length});
    // this.totalRecords = this.Hproducts.length;
    this.cols = [
    { field: 'SoftwareID', name: 'SoftwareID', header: 'Software ID' },
    { field: 'Product_Name', name: 'Product_Name', header: 'Product Name' },
    {field: 'Long_Description', name: 'Long_Description',header: 'Description'},
    // {field: 'Details',name: 'Details', header: 'Details'},

    
     ]
  
      this.loading = true;
     
     }
     
    columnFilter(event: any, field) {
      this.dataTable.filter(event.target.value, field, 'contains');
      // this.dataTable.reset();
    }
    
      
     nextPage(event: LazyLoadEvent){
    this.loading = true;
    // event.first = 0
    // event.rows = 3 
    // event.sortField ='' ;
    // event.sortOrder = -1;
    // filters:{this.columnFilter}

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
    this.initializeDT();
    
               
  }


  changeColorOne() {
     this.color = !this.color;
     if (this.color) {
       return '#ffffff';
     } else {
      return '#f6f6f6';
     }
  }



  model: any = {};
  model2: any = {}; 
  myValue;
}
