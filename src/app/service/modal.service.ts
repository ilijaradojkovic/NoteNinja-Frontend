import { Injectable } from '@angular/core';
interface IModal{
  id:string,
  visible:boolean
}
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals:IModal[]=[];
  constructor() { }

  isModalOpen(id:string){
    return !!this.modals.find(x=>x.id===id)?.visible;
  }
  toggleModal(id:string){
    const modal=this.modals.find(x=>x.id===id);
    if(modal){
      modal.visible=!modal.visible;
      // console.log(`Modal ${id} toggle`)
      // console.log(modal);
    }

  }

  closeModal(id:string){
    const modal=this.modals.find(x=>x.id===id);
    if(modal){
      modal.visible=false;
    }
  }
  register(id: string) {

    this.modals.push({
      id,visible:false
    });
    // console.log(`Modal registered :${id}`);
    // console.log(this.modals);
  }
  unregister(id:string){
    // console.log(`Modal unregistered: ${id}`);
    // console.log(this.modals);

    this.modals= this.modals.filter(element=>element.id!==id);
  }

  ngOnInit(): void {
  }
}
