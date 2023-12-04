import { Injectable } from '@angular/core';
import { Token } from 'src/token';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private url = 'http://localhost:8080/api/files/';

  constructor(private http: HttpClient) {

  }

  getFileData(accountJwt: Token, fileId : String): Observable<any> {
    console.log('documents service listDocuments')
    var options = {
      headers: new HttpHeaders({
         'Accept':'image/image/png', //or 'Accept':'application/pdf' .. etc
         'Authorization': 'Bearer '+accountJwt.token
      }),
      'responseType': 'blob' as 'json'
   }
    let observable = this.http.get<any>(this.url+fileId+"/data",  options);
    return observable;
  }
}
