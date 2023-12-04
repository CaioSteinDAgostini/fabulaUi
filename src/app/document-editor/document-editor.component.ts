import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Token } from 'src/token';
import { DocumentsService } from '../documents/documents.service';
import { Document } from '../documents/document';
import { ImageThumbnail } from '../gallery/imageThumbnail';
import { FilesService } from '../files/files.service';
import { GalleryService } from '../gallery/gallery.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css']
})
export class DocumentEditorComponent implements OnInit {

  constructor(private documentsService: DocumentsService, private galleryService: GalleryService, private formBuilder: FormBuilder) { }


  @Input() inputSelectedAccountToken: Token | null = null;
  @Output() editedArticleContentEmitter = new EventEmitter<String>();
  @Input() article: Document | null = null;
  isGalleryOpen: boolean = false;
  isEditorOpen: boolean = false;


  @Output() outputCloseEditor = new EventEmitter<Boolean>();;

  //has to load the document again in case it has been updated
  editedContent: string | null | undefined = null;

  switchGallery() {
    this.isGalleryOpen = !this.isGalleryOpen;
  }

  setIsGalleryOpen(isOpen: boolean) {
    this.isGalleryOpen = isOpen;
  }


  save() {
    console.log("edited content = " + this.editedContent);
    if (this.inputSelectedAccountToken) {
      if (this.article && this.editedContent) {

        console.log("content value " + this.editedContent);
        console.log("title image " + this.article.titleImage);
        this.article = { id: this.article.id, domain: this.article.domain, title: this.article.title, contents: this.editedContent, subtitle: this.article.subtitle, titleImage: null, thumbnailImageUrl: null };

        this.documentsService.saveDocument(this.inputSelectedAccountToken, this.article).subscribe(Response => {
          console.log("after documentService save");

        });
      }
      else {
        console.log("did not save");
      }
    }
    this.article = null;
    this.isEditorOpen = false;
    this.outputCloseEditor.emit(true);
  }


  setEditedContent(event: Event) {
    console.log(event)
    this.editedContent = (<HTMLInputElement>event.target).value;
    console.log("edited content = " + this.editedContent);
  }

  cancel() {
    this.editedContent = this.article?.contents;
    this.isEditorOpen = false;
    this.outputCloseEditor.emit(true);
  }


  ngOnInit(): void {
    if (this.inputSelectedAccountToken) {
      if (this.article) {
        this.documentsService.loadDocument(this.inputSelectedAccountToken, this.article?.id).subscribe(document => {
          this.editedContent = document.contents;
          this.article = document;
        }
          );
      }

    }
  }

  ngOnDestroy(): void {
    console.log("destroy document editor");
  }

}