import { Component, OnInit,SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { AlertService } from "../services/alert.service";
import { first } from 'rxjs/operators';


@Component({
  selector: "app-viewalluser",
  templateUrl: "./viewalluser.component.html",
  styleUrls: [ "./viewalluser.component.css" ],
  providers: [ ConnectingToDatabaseService, AlertService ]
})
export class ViewAllUserComponent implements OnInit {
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
    this.getUserPage();
  };
  

  changeColorOne() {
    this.color = !this.color;
    if (this.color) {
      return "#ffffff";
    } else {
      return "#f6f6f6";
    }
  }
}