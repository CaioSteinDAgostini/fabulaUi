import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core'; ''
import { DocumentsService } from './documents.service';
import { Document } from './document';
import { MarkdownService } from 'ngx-markdown';
import { FilesService } from '../files/files.service';
import { Token } from 'src/token';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GalleryService } from '../gallery/gallery.service';

@Component({
  selector: 'app-document-entry',
  templateUrl: './document-entry.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentEntryComponent implements OnInit {


  constructor(private router: Router, private documentsService: DocumentsService, private markdownService: MarkdownService, private fileService: FilesService, private galleryService: GalleryService) { }


  markdown: string | undefined = undefined;

  @Input() inputEditorsDocument: Document | null = null;
  @Input() inputSelectAccountToken: Token | null = null;
  _titleImageUrl: string | ArrayBuffer | null = 'none';
  _thumbnailImageUrl: string | ArrayBuffer | null = null;

  @Output() outputDocumentEditorForDocument = new EventEmitter<Document>();

  load() {
    if (this.inputEditorsDocument?.contents) {
      this.markdown = this.markdownService.parse(this.inputEditorsDocument?.contents);
    }
  }

  clear() {
    this.markdown = undefined;
  }

  private getTitleImageData() {
    if (this.inputSelectAccountToken && this.inputEditorsDocument?.titleImage) {
      this.fileService.getFileData(this.inputSelectAccountToken, this.inputEditorsDocument?.titleImage).subscribe(response => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this._titleImageUrl = 'url('+reader.result+')';
          // this._titleImageUrl = reader.result;
        }, false);

        reader.readAsDataURL(response);
      }
      )
    }
  }

  switchEditor() {
    if (this.inputSelectAccountToken && this.inputEditorsDocument) {
      if(this.inputEditorsDocument?.titleImage){
      this.galleryService.getThumbnailData(this.inputSelectAccountToken, this.inputEditorsDocument?.titleImage).subscribe(response => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this._thumbnailImageUrl = reader.result;
          if (this.inputEditorsDocument) {
            this.inputEditorsDocument = { id: this.inputEditorsDocument.id, domain: this.inputEditorsDocument.domain, title: this.inputEditorsDocument.title, contents: this.inputEditorsDocument.contents, subtitle: this.inputEditorsDocument.subtitle, titleImage: this.inputEditorsDocument.titleImage, thumbnailImageUrl: this._thumbnailImageUrl };
            this.outputDocumentEditorForDocument.emit(this.inputEditorsDocument);
          }
        }, false);

        reader.readAsDataURL(response);
      })
    }
    else{
      this.inputEditorsDocument = { id: this.inputEditorsDocument.id, domain: this.inputEditorsDocument.domain,  title: this.inputEditorsDocument.title, contents: this.inputEditorsDocument.contents, subtitle: this.inputEditorsDocument.subtitle, titleImage: null, thumbnailImageUrl: null };
            this.outputDocumentEditorForDocument.emit(this.inputEditorsDocument);
    }

    }

  }

  ngOnInit(): void {
    this.getTitleImageData();
  }

}
