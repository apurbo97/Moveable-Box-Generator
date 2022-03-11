import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  boxCount = 0;
  zindex = 0;
  innerBoxs = [] as  any;
  isUseKey = true;
  selectedBoxElement:any;
  Transval1:any = [];
  Transval2:any = [];
  constructor() { }

  ngOnInit(): void {

  }

  addBoxs(){
    let boxVal = {
      id:this.boxCount,
      boxColor: '#'+Math.floor(Math.random()*16777215).toString(16),
      zindex: this.zindex,
      selected:false
    }
    this.innerBoxs.push(boxVal);
    this.zindex = this.zindex + 1;
    this.boxCount = this.boxCount + 1;
  }

  innerBokClick(box:any){
    box.selected = !box.selected;
    box.zindex = this.zindex;
    this.zindex = this.zindex + 1
    this.innerBoxs.map((ele:any) => {
      if(ele.id === box.id)
        ele.selected = true;
      else
        ele.selected = false;
    });
  }

  deleteBox(){
    this.innerBoxs = this.innerBoxs.filter((ele:any)=> !ele.selected);
  }

  updateBoxTransVal(id:number){
    const oldTransVal = this.selectedBoxElement?.style.getPropertyValue("transform");
    if(oldTransVal){
      const val = oldTransVal.slice(11).split(/(-?\d+)/);
      this.Transval1[id] = parseInt(val[1]);
      this.Transval2[id] = parseInt(val[3]);
      console.log(this.Transval1[id],this.Transval2[id]);
      
    }
    else{
      this.Transval1[id] = 0;
      this.Transval2[id] = 0;
    }
  }

  moveBox(direction:string){
    const selectedBox = this.innerBoxs.filter((ele:any)=> ele.selected);
    this.selectedBoxElement = document.getElementById(selectedBox[0].id.toString());
    const ElePosition = this.selectedBoxElement.getBoundingClientRect();
    console.log(ElePosition);
      this.updateBoxTransVal(selectedBox[0].id);
      if( this.selectedBoxElement){
        if(direction === 'l' && ElePosition.left > 2){
          this.Transval1[selectedBox[0].id] = this.Transval1[selectedBox[0].id]-5
          this.selectedBoxElement.style.transform = 'translate3d('+this.Transval1[selectedBox[0].id]+'px, '+this.Transval2[selectedBox[0].id]+'px, 0px)';
        }
        if(direction === 'r' && ElePosition.right < 1000){
          this.Transval1[selectedBox[0].id] = this.Transval1[selectedBox[0].id]+5
          this.selectedBoxElement.style.transform = 'translate3d('+this.Transval1[selectedBox[0].id]+'px, '+this.Transval2[selectedBox[0].id]+'px, 0px)';
        }
        if(direction === 'u' && ElePosition.top > 68){
          this.Transval2[selectedBox[0].id] = this.Transval2[selectedBox[0].id]-5
          this.selectedBoxElement.style.transform = 'translate3d('+this.Transval1[selectedBox[0].id]+'px, '+this.Transval2[selectedBox[0].id]+'px, 0px)';
        }
        if(direction === 'd' && ElePosition.bottom < 670){
          this.Transval2[selectedBox[0].id] = this.Transval2[selectedBox[0].id]+5
          this.selectedBoxElement.style.transform = 'translate3d('+this.Transval1[selectedBox[0].id]+'px, '+this.Transval2[selectedBox[0].id]+'px, 0px)';
        }
      }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.isUseKey){
      event.preventDefault();
      switch(event.code){
        case 'Backspace':
          this.deleteBox();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.moveBox('l');
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.moveBox('r');
          break;
        case 'ArrowUp':
        case 'KeyW':
          this.moveBox('u');
          break;
        case 'ArrowDown':
        case 'KeyS':
          this.moveBox('d');
          break;
      }
      
    }
  }
}
