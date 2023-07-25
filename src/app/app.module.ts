import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { FilterComponent } from './filter/filter.component';
import { NavigationComponent } from './navigation/navigation.component';
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {NotesService} from "./service/notes.service";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { LongTextPipe } from './long-text.pipe';
import { ModalComponent } from './modal/modal.component';
import {FormsModule} from "@angular/forms";
import { SaveNoteComponent } from './save-note/save-note.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import {noteDetailsResolver} from "./resolver/note-details.resolver";


const  routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'note/:id',component:NoteDetailsComponent,resolve: {note:noteDetailsResolver}},
  {path:'**',component:PageNotFoundComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoteComponent,
    NoteListComponent,
    CreateNoteComponent,
    FilterComponent,
    NavigationComponent,
    PageNotFoundComponent,
    HomeComponent,
    LongTextPipe,
    ModalComponent,
    SaveNoteComponent,
    NoteDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    RouterLink,
    HttpClientModule,
    FormsModule
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
