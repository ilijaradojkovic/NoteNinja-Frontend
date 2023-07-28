import {Component, OnInit} from '@angular/core';
import {NotesService} from "../service/notes.service";
import {NoteType} from "../models/note-type";
import {DataNotifierService} from "../data-notifier.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  itemsPerPage:number=9;
  totalPages:number=0;
  currentPage:number =1;
  ngOnInit(): void {
    this.getPageNumber();
    this.dataAlertNotifier.alert$.subscribe(
      ()=>{
        this.currentPage=1;
        this.getPageNumber();
        this.getNotesForCurrPage();
      }
    )
  }

  constructor(private noteService:NotesService,private dataAlertNotifier:DataNotifierService) {}

  get numberArray(): number[] {
    return Array.from({ length: this.totalPages  }, (_, index) => index);
  }
 public getPageNumber(){
    this.noteService.getTotalItems().subscribe((total)=>{

     let totalItems=total.data['total'] as number;
      this.totalPages=this.customRound(totalItems/this.itemsPerPage);
    });
  }


  canGoBack() {
    return 0 != this.currentPage - 1
  }
    canGoForward(){
    return this.totalPages>=this.currentPage+1
    }


  backPage() {
    if(!this.canGoBack()) return;

    this.currentPage--;
    this.getNotesForCurrPage();
  }

  nextPage() {
    if(!this.canGoForward()) return;
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
    console.log(decimalPart +"-"+roundedDecimal)
    return Math.floor(number) + roundedDecimal;
  }


}
