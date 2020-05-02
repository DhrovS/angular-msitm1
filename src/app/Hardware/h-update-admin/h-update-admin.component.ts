import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HProd } from '../../models/HProd';
import { ConnectingToDatabaseService } from "../../services/connecting-to-database.service";
import { AlertService} from "../../services/alert.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from "rxjs";


@Component({
  selector: "app-h-update-admin",
  templateUrl: "./h-update-admin.component.html",
  styleUrls: ["./h-update-admin.component.css"],
  providers: [ ConnectingToDatabaseService, AlertService ]
})
export class HProdUpdateAdminComponent implements OnInit {
  public HProduct: Observable<HProd>;
  one; 
  two;
  three;
  four;
  five; 
  six;
  HProdForm: FormGroup;
  loading = false;
  submitted = false;
  color;


  constructor(
  private _dbService: ConnectingToDatabaseService,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private alertService: AlertService) {}

  getHProd(id?: string){
    this._dbService.getHProd(id)
    .subscribe(
        (response: any) => {
          this.HProduct = response.json();
          this.one =(this.HProduct[0].Product_Name)
          this.two =(this.HProduct[0].Short_Description)
          this.three =(this.HProduct[0].Long_Description)
          this.four =(this.HProduct[0].SKU)
          this.five =(this.HProduct[0].Gift_Wrappable)
          this.six =(this.HProduct[0].Image_URL)  
  },
    (error: Error) => {
          throw error;
        }
    )
    return this.one, this.two, this.three, this.four,this.five,this.six;
  }

  ngOnInit(){
    this.color = this.getHProd(this.route.snapshot.params.id)

    console.log(this.color)
    this.HProdForm = this.formBuilder.group({
            Product_Name: ["Test", Validators.required],
            Short_Description: [this.two, Validators.required],
            Long_Description: ['', Validators.required],
            SKU: ['', [Validators.required, Validators.minLength(6)]],Tax_Category: ['', Validators.required],
            Gift_Wrappable: [0, Validators.required],
            Image_URL: ['', Validators.required]
        });
  }
  get f() { return this.HProdForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    // if (this.HProdForm.invalid) {
    //         window.alert('This Form is invalid!');
    //     }
    this.loading = true;

    this._dbService.patchHProd(this.route.snapshot.params.id,this.HProdForm.value)
    .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/products/admin/0'])
              
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
              this.router.navigate([''])
          });
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
