import { Token } from 'src/token';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentsService } from './documents.service';
import { Document } from './document';
import { Account } from '../accounts/account';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private documentsService: DocumentsService) { }


  @Input() selectedAccountToken : Token | null = null;
  domainArticles : Document[] = [];
  selectedArticle : Document | null = null;
  selectedArticleTitleImageUrl : string | ArrayBuffer | null = null;

  queryPlaceholder : string = "keyword";
  query: string | null = null;

  isEditorOpen : boolean = false;
  
  _selectedAccount : Account | null  = null;

  @Output() editorOpenEmitter = new EventEmitter<Boolean>();


  get selectedAccount() : Account | null{
    return this._selectedAccount;
  }

  @Input() 
  set selectedAccount(account : Account | null){
    console.log("selected account changed >> "+account + "   "+account?.domain.name);
    this.listArticles();
  }

  setArticleBeingEdited(article : Document){
    console.log("Cocuments Component >> selected article for editor "+ article.contents);
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
    if(this.selectedAccountToken ){
      this.documentsService.listDocuments(this.selectedAccountToken).subscribe(articles => {
        console.log("documents "+JSON.stringify(articles));
        this.domainArticles = articles;
      });
    }
  }

  createNewArticle(){
    if(this.selectedAccountToken ){
      this.documentsService.listDocuments(this.selectedAccountToken).subscribe(articles => {
        this.domainArticles = articles;
      });
    }
  }

  ngOnInit(): void {

    this.listArticles();
  }

}
