import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capitulos',
  templateUrl: './capitulos.component.html',
  styleUrls: ['./capitulos.component.scss'],
  providers:[ApiService]
})
export class CapitulosComponent implements OnInit {
  @Input()id_Serie:Number;
  items:any=[];


  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() { 
    this.getCapitulos(this.id_Serie);
  }

  getCapitulos(id){
    this.api.getCapitulos(id).subscribe((resp:any)=>{
      this.items=resp.results;
    });   
  }
  redirect(id){
    this.router.navigate(['/home/editar',id]);
  }

}
