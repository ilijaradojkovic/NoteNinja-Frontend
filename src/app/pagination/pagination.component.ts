import {Component, OnInit} from '@angular/core';
import {NotesService} from "../service/notes.service";
import {NoteType} from "../models/note-type";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  itemsPerPage:number=10;
  totalPages:number=0;
  currentPage:number =1;
  ngOnInit(): void {
    this.getPageNumber();
  }

  constructor(private noteService:NotesService) {}

  get numberArray(): number[] {
    return Array.from({ length: this.totalPages  }, (_, index) => index);
  }
 public getPageNumber(){
    this.noteService.getTotalItems().subscribe((total)=>{

     let totalItems=total.data['total'] as number;
      this.totalPages=this.customRound(totalItems/this.itemsPerPage);
      console.log(this.totalPages)
    });
  }



  backPage() {
    this.currentPage--;
    this.getNotesForCurrPage();
  }

  nextPage() {
    this.currentPage++;
    this.getNotesForCurrPage();
  }


  toPage(i: number) {
    this.currentPage=i;
    this.getNotesForCurrPage();
  }

  private getNotesForCurrPage(){
    this.noteService.getNotesForPage(this.currentPage);

  }
  private customRound(number: number): number {
    const decimalPart = number - Math.floor(number);
    const roundedDecimal = Math.ceil(decimalPart);

    return Math.floor(number) + roundedDecimal;
  }


}
