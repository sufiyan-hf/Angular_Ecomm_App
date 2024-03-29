import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchedProducts:undefined | product[]
  constructor(private activeRoute:ActivatedRoute,private product:ProductService){}

  ngOnInit():void{

  let query=this.activeRoute.snapshot.paramMap.get('query');
  console.warn("on init"+ query);

  query && this.product.searchProducts(query).subscribe((result)=>{
    this.searchedProducts=result;
    console.warn(this.searchedProducts)


  })
  
}
}