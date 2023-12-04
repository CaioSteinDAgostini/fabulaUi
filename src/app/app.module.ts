import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DomainComponent } from './domain/domain.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentEntryComponent } from './documents/document-entry.component';

import { MarkdownModule } from 'ngx-markdown';

import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryEntryComponent } from './gallery/gallery-entry.component';
import { DocumentEditorComponent } from './document-editor/document-editor.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'documentsEditor', component: DocumentEditorComponent },

// { path: 'documents', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    DomainComponent,
    LoginComponent,
    DocumentsComponent,
    DocumentEntryComponent,
    FilesComponent,
    GalleryComponent,
    GalleryEntryComponent,
    DocumentEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
