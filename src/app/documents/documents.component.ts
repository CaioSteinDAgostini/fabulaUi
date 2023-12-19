import { Token } from 'src/token';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { DocumentsService } from './documents.service';
import { Document } from './document';
import { Account } from '../accounts/account';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  

  constructor(private documentsService: DocumentsService, private authService: AuthService) {
  }


  domainArticles: Document[] = [];
  selectedArticle: Document | null = null;
  selectedArticleTitleImageUrl: string | ArrayBuffer | null = null;

  isEditorOpen: boolean = false;

  _selectedAccount: Account | null = null;

  @Output() editorOpenEmitter = new EventEmitter<Boolean>();


  get selectedAccount(): Account | null {
    return this._selectedAccount;
  }

  setArticleBeingEdited(article: Document) {
    this.selectedArticle = article;
    this.isEditorOpen = true;
  }

  openEditor() {
    this.isEditorOpen = true;
    this.editorOpenEmitter.emit(this.isEditorOpen)
  }

  closeEditor(condition: Boolean) {
    if (condition) {
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

  createNewArticle() {

    this.documentsService.listDocuments().subscribe(articles => {
      this.domainArticles = articles;
    });

  }

  ngOnInit(): void {
    if(this.authService.selectedAccount?.domain){
      this.listArticles();
    }
    this.authService.outputSelectedDomain.subscribe((selectedDomain) => {
      if (!selectedDomain) {
        this.isEditorOpen = false;
        this.domainArticles = [];
      }
      else{
        this.listArticles();
      }
    }) 

  }



}
