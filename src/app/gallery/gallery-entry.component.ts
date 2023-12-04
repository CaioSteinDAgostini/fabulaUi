import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GalleryService } from './gallery.service';
import { ImageThumbnail } from './imageThumbnail';
import { Token } from 'src/token';
import { GalleryComponent } from './gallery.component';

@Component({
  selector: 'app-gallery-entry',
  templateUrl: './gallery-entry.component.html',
  styleUrls: ['./gallery-entry.component.css']
})
export class GalleryEntryComponent implements OnInit {


  constructor(private galleryService: GalleryService) { }


  markdown: string | undefined = undefined;

  @Input() inputThumbnail: ImageThumbnail | null = null;
  @Input() inputSelectedAccountToken: Token | null = null;
  thumbnailImageUrl: string | ArrayBuffer | null = null;
  @Output() isSelectedEmmiter = new EventEmitter<ImageThumbnail>();
  isSelected: boolean = false;


  private getThumbnailData() {
    if (this.inputSelectedAccountToken && this.inputThumbnail) {
      this.galleryService.getThumbnailData(this.inputSelectedAccountToken, this.inputThumbnail.id).subscribe(response => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.thumbnailImageUrl = reader.result;
        }, false);

        reader.readAsDataURL(response);
      }
      )
    }
  }

  ngOnInit(): void {
    this.getThumbnailData();
  }

  switchSelection() {
    this.isSelected = !this.isSelected;
    if (this.inputThumbnail) {
      this.isSelectedEmmiter.emit(this.inputThumbnail);
    }
  }
}


