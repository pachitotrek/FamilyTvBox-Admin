import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login:FormGroup; 

  constructor(private Apilogin:LoginService,public router:Router) { 
    this.login= new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      pass: new FormControl(null,[Validators.required,Validators.minLength(6)])
    })

    


  }

  ngOnInit() {
  }

  Ingresar(){
    this.Apilogin.Login(this.login.value).subscribe(resp=>{
      if(resp==true){
        Swal.fire({
          type: 'success',
          title: 'Has ingresado Correctamente',
          text: 'Bienvenido nuevamente!'         
        })
        this.router.navigate(['/home']);
        this.login.reset();
      }
    },err=>{
      console.log(err);
      Swal.fire({
        type: 'error',
        title: 'Credenciales Incorrectas',
        text: 'Credenciales Incorrectas!'         
      })
      this.login.reset();


    });
    
  }

}
