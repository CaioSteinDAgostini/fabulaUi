import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/token';
import { ImageThumbnail } from './imageThumbnail';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {


  private thumbnailsUrl = 'http://localhost:8080/api/thumbnails';

  constructor(private http: HttpClient, private authService : AuthService) { }

  getThumbnailData(imageId : String): Observable<any> {
    var options = {
      headers: new HttpHeaders({
         'Accept':'image/*',
         'Authorization': 'Bearer '+this.authService.getAccountToken()?.token
      }),
      'responseType': 'blob' as 'json'
   }
    let observable = this.http.get<any>(this.thumbnailsUrl+"/"+imageId+"/data",  options);
    return observable;
  }

  getThumbnail(imageId : String): Observable<any> {
    var options = {
      headers: new HttpHeaders({
         'Accept':'text/json',
         'Authorization': 'Bearer '+this.authService.getAccountToken()?.token
      })
   }
    let observable = this.http.get<any>(this.thumbnailsUrl+"/"+imageId,  options);
    return observable;
  }

  getAllThumbnails(): Observable<ImageThumbnail[]> {
    var options = {
      headers: new HttpHeaders({
        'Accept':'text/json',
         'Authorization': 'Bearer '+this.authService.getAccountToken()?.token
      }),
   }
   let observable = this.http.get<ImageThumbnail[]>(this.thumbnailsUrl,  options);
   return observable;
  }
}
