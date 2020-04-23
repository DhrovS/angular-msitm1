import { Component, OnInit,SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { AlertService } from "../services/alert.service";
import { first } from 'rxjs/operators';


@Component({
  selector: "app-register-admin",
  templateUrl: "./register-admin.component.html",
  styleUrls: [ "./register-admin.component.css" ],
  providers: [ ConnectingToDatabaseService, AlertService ]
})
export class RegisterAdminComponent implements OnInit {
  searchText;
  loading = false;
  submitted = false;
  public Users: Array<any> = [];
  pager =0;
  color;

  constructor(
  private _dbService: ConnectingToDatabaseService,
  private route: ActivatedRoute,
  private router: Router,
  private alertService: AlertService) {}

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

  public getUserPage(page?: string) {
    this._dbService.getUserPage(page)
      .subscribe(
        (response: any) => {
          this.Users = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }

  ngOnInit() {
        this.getUserPage(this.pager.toString());
        

  };
  
  ngOnChanges(changes : SimpleChanges) {
    this.getUserPage(this.pager.toString());
  }

  changeColorOne() {
    this.color = !this.color;
    if (this.color) {
      return "#ffffff";
    } else {
      return "#f6f6f6";
    }
  }
}