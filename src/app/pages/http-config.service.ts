import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = "https://jsonplaceholder.typicode.com/";
@Injectable({
  providedIn: 'root'
})
export class HttpConfigService  {

  constructor(public httpClient: HttpClient) { }

  getList() {
    return this.httpClient.get(API_URL + 'posts?userId=1'  )
  }

  postItem(reqestData : any){
    return this.httpClient.post(API_URL+'posts' , reqestData)
  }

  getItem(id : number){
    return this.httpClient.get(API_URL + 'posts?userId=1&id=' + id  )
  }

  editItem(reqestData : any , id : number){
    return this.httpClient.put(API_URL + 'posts/' + id , reqestData )
  }

  deleteItem(id : number){
    return this.httpClient.get(API_URL + 'posts?id=' + id  )
  }
}
