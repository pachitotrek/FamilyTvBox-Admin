import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.scss']
})
export class CuponesComponent implements OnInit {
  form:FormGroup;
  cupones:any=[];
  update:boolean=false;

  constructor(private api:ApiService) {
    this.form= new FormGroup({
      id:new FormControl(null),
      cupon:new FormControl(null,Validators.required),
      descuento: new FormControl(null,Validators.required),
      estado:new FormControl(null,Validators.required)
    });
   }

  ngOnInit() {
    this.getCupones();
  }

  getCupones(){
    this.api.getCupon().subscribe((resp:any)=>{
      this.cupones=resp;
      console.log(this.cupones);
    });
  }
  set(item){
    this.form.setValue(item);
    this.update=true;
  }
  reset(){
    this.form.reset();
    this.update=false;
  }
  AgregarCupon(){
    this.api.addCupon(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){

        Swal.fire({
          type: 'success',
          title: 'Ha sido creado',
          text: 'Haz creado un nuevo cupón!'
        });

        this.form.reset();
        this.getCupones();
      }
    });
  }
  editarCupon(){
    this.api.editCupon(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        Swal.fire({
          type: 'success',
          title: 'Ha sido creado',
          text: 'Haz creado un nuevo cupón!'
        });
        this.update=false;

        this.form.reset();
        this.getCupones();
      }
    });
  }

}
