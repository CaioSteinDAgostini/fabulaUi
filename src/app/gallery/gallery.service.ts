import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/token';
import { ImageThumbnail } from './imageThumbnail';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {


  private thumbnailsUrl = 'http://localhost:8080/api/thumbnails';

  constructor(private http: HttpClient) { }

  getThumbnailData(accountJwt: Token, imageId : String): Observable<any> {
    var options = {
      headers: new HttpHeaders({
         'Accept':'image/*',
         'Authorization': 'Bearer '+accountJwt.token
      }),
      'responseType': 'blob' as 'json'
   }
    let observable = this.http.get<any>(this.thumbnailsUrl+"/"+imageId+"/data",  options);
    return observable;
  }

  getThumbnail(accountJwt: Token, imageId : String): Observable<any> {
    var options = {
      headers: new HttpHeaders({
         'Accept':'text/json',
         'Authorization': 'Bearer '+accountJwt.token
      })
   }
    let observable = this.http.get<any>(this.thumbnailsUrl+"/"+imageId,  options);
    return observable;
  }

  getAllThumbnails(accountJwt: Token): Observable<ImageThumbnail[]> {
    var options = {
      headers: new HttpHeaders({
        'Accept':'text/json',
         'Authorization': 'Bearer '+accountJwt.token
      }),
   }
   let observable = this.http.get<ImageThumbnail[]>(this.thumbnailsUrl,  options);
   return observable;
  }
}
