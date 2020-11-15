import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate  {
  
  constructor(public login:LoginService,public router:Router) {
  }

  canActivate(){
    if(this.login.Logeado()){
      console.log("paso por el guard");
      return true;
    }else{
      console.log("bloqueado");
      this.router.navigate(['/login']);
      return false;
    }
    
    
  }
  
}
