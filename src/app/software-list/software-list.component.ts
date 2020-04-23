import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { SProd } from '../models/SProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css'],
  providers: [ ConnectingToDatabaseService ]
})
export class SoftwareListComponent implements OnInit {
  searchText;
  pager = 0;
  color;
  product;
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'Product_Name';
  public SProducts: Array<any> = [];

  constructor(
    private _dbService: ConnectingToDatabaseService,
    private _http: HttpClient,
    private route: ActivatedRoute) { }

  public SgetCount() {
    return JSON.parse(JSON.stringify(this.pager))
    console.log(JSON.parse(JSON.stringify(this.pager)))
  }
  public SincCount(){
    this.pager = this.pager+1;
    console.log(this.pager)
  }
  public SdecCount(){
    this.pager = this.pager-1;
    console.log(this.pager)
  }

  public getSoftData(page?: string) {
    this.SProducts = [];

    this._dbService.getSoftData(page)
      .subscribe(
        (response: any) => {
          this.SProducts = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }

  public toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt: string): string => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  ngOnInit() {
    this.getSoftData(this.pager.toString());
  }

  ngOnChanges(changes : SimpleChanges) {
    this.getSoftData(this.pager.toString());
  }

  editSProduct(editSProductInfo) {
    this.model2.name = this.SProducts[editSProductInfo].SoftwareID;
    this.model2.position = this.SProducts[editSProductInfo].Product_Name;
    this.myValue = editSProductInfo;
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

