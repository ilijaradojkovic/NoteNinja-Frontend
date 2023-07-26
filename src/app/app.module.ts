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
import { NotesComponent } from './notes/notes.component';
import { LongTextPipe } from './long-text.pipe';
import { ModalComponent } from './modal/modal.component';
import {FormsModule} from "@angular/forms";
import { SaveNoteComponent } from './save-note/save-note.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import {noteDetailsResolver} from "./resolver/note-details.resolver";
import { PaginationComponent } from './pagination/pagination.component';
import {AuthInterceptor, AuthTokenInterceptor} from "./interceptor/auth-token.interceptor";
import {LottieModule} from "ngx-lottie";
import { RegisterComponent } from './signup/register.component';

export function playerFactory(): any {
  return import('lottie-web');
}

const  routes:Routes=[
  {path:'',redirectTo:'/login',pathMatch:"full"},
  {path:'notes',component:NotesComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
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
    NotesComponent,
    LongTextPipe,
    ModalComponent,
    SaveNoteComponent,
    NoteDetailsComponent,
    PaginationComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    RouterLink,
    HttpClientModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),

  ],
  providers: [NotesService,AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
