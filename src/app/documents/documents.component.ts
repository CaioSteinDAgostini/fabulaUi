import { Token } from 'src/token';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentsService } from './documents.service';
import { Document } from './document';
import { Account } from '../accounts/account';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private documentsService: DocumentsService, private authService: AuthService) { 
    authService.outputSelectedDomain.subscribe((selectedDomain) => {
      this.listArticles();
    })
  }


  domainArticles : Document[] = [];
  selectedArticle : Document | null = null;
  selectedArticleTitleImageUrl : string | ArrayBuffer | null = null;

  isEditorOpen : boolean = false;
  
  _selectedAccount : Account | null  = null;

  @Output() editorOpenEmitter = new EventEmitter<Boolean>();


  get selectedAccount() : Account | null{
    return this._selectedAccount;
  }

  @Input() 
  set selectedAccount(account : Account | null){
    this.listArticles();
  }

  setArticleBeingEdited(article : Document){
    this.selectedArticle = article;
    this.isEditorOpen = true;
  }
  
  openEditor(){
    this.isEditorOpen = true;
    this.editorOpenEmitter.emit(this.isEditorOpen)
  }

  closeEditor(condition : Boolean){
    if(condition){
      console.log()
    this.isEditorOpen = false;
    this.editorOpenEmitter.emit(this.isEditorOpen);
    }
  }

  listArticles() {
      this.documentsService.listDocuments().subscribe(articles => {
        this.domainArticles = articles;
      });
    
  }

  createNewArticle(){

      this.documentsService.listDocuments().subscribe(articles => {
        this.domainArticles = articles;
      });
    
  }

  ngOnInit(): void {

    /* this.listArticles(); */
  }

}
