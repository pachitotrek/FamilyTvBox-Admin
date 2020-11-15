import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PayuService } from 'src/app/services/payu.service';

@Component({
  selector: 'app-payu',
  templateUrl: './payu.component.html',
  styleUrls: ['./payu.component.scss'],
  providers:[PayuService]
})
export class PayuComponent implements OnInit {
  pago: FormGroup;

  // referencia={
  //   merchantId:508029,
  //   accountId:512321,
  //   description:"Test PAYU",
  //   referenceCode:"TestPayU",
  //   amount:20000,
  //   tax:3193,
  //   taxReturnBase:16806,
  //   currency:"COP",
  //   signature:"7ee7cf808ce6a39b17481c54f2c57acc",
  //   test:1,
  //   buyerEmail:"test@test.com",
  //   // responseUrl:"http://localhost:4200/home/payu",
  //   confirmationUrl:"http://localhost:3000/pagos"
  // }

  cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 3);
  }

  constructor(public payu:PayuService) {

    this.pago= new FormGroup({

      merchantId: new FormControl(null,Validators.required), 
      accountId: new FormControl(null,Validators.required), 
      description: new FormControl(null,Validators.required), 
      referenceCode: new FormControl(null,Validators.required), 
      amount: new FormControl(null,Validators.required), 
      tax: new FormControl(null,Validators.required), 
      taxReturnBase: new FormControl(null,Validators.required), 
      currency: new FormControl(null,Validators.required), 
      signature: new FormControl(null,Validators.required), 
      test: new FormControl(null,Validators.required), 
      buyerEmail: new FormControl(null,Validators.required), 
      responseUrl: new FormControl(null,Validators.required), 
      confirmationUrl: new FormControl(null,Validators.required)
    });



   }



}
