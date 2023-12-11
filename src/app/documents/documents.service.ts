import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from 'src/token';
import { Document } from './document';
import { FilesService } from '../files/files.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  
  private url = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient, private authService : AuthService) {

  }

  
  listDocuments(): Observable<Array<Document>> {
    console.log('documents service listDocuments')
    const headers = { 'Authorization': 'Bearer '+this.authService.getAccountToken()?.token };
    return this.http.get<Array<Document>>(this.url,  { headers});
  }

  createNewDocument(): Observable<Document> {
    const headers = { 'Authorization': 'Bearer '+this.authService.getAccountToken()?.token };
    let document = {};
    return this.http.post<Document>(this.url, document, { headers});
  }

  saveDocument(document :Document): Observable<Document>{
    const headers = { 'Authorization': 'Bearer '+this.authService.getAccountToken()?.token };
    console.log("document content is "+document.contents);
    return this.http.put<Document>(this.url, document, {headers});
    // return this.http.put<Document>(this.url, document, {headers});
  }

  loadDocument(documentId : string): Observable<Document>{
    console.log("document service this.loadDocument "+documentId);
    const headers = { 'Authorization': 'Bearer '+this.authService.getAccountToken()?.token };
    return this.http.get<Document>(this.url+"/"+documentId,  { headers});
  }


//  decodeTitleImage(document : Document): Observable<String>
//{
//    if(document.titleImage){
//      Buffer.from(document.titleImage.data).toString('base64')
//    }  
//    return ""
 // }
}
