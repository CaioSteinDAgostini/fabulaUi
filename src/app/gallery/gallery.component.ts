import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Token } from 'src/token';
import { FilesService } from '../files/files.service';
import { GalleryService } from './gallery.service';
import { ImageThumbnail } from './imageThumbnail';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private fileService : FilesService, private galleryService : GalleryService) { }

  @Input() selectedAccountToken : Token | null = null;
  imageThumbnails : ImageThumbnail[] = []
  @Input() selectOnlyOne : boolean = false;
  @Output() selectedImagesEmmiter = new EventEmitter<ImageThumbnail[]>();
  _selectedImages : ImageThumbnail[] = [];
  
  isOpen : boolean = false;
  @Output() isOpenEmitter = new EventEmitter<boolean>();

  selectImage(image : ImageThumbnail) {
    this._selectedImages.push(image);
    if(this.selectOnlyOne){
      this.close();
    }
  }

  getAllThumbnails() {
    if(this.selectedAccountToken ){
      this.galleryService.getAllThumbnails().subscribe(thumbnails => {
        this.imageThumbnails = thumbnails;
      });
    }
  }

  uploadNewImage(){
    if(this.selectedAccountToken ){
    
    }
  }

  deleteSelected(){
    if(this.selectedAccountToken ){
    
    }
  }

  ngOnInit(): void {
    this.getAllThumbnails();
  }

  close(){
    this.isOpen = false;
    this.isOpenEmitter.emit(this.isOpen);
    this.selectedImagesEmmiter.emit(this._selectedImages);
  }
}
