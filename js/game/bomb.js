import { newElement } from "../../src/modules/dom.mjs";

export class Bomb {
  constructor(props,x,y) {
    this.container = props
    this.position = {x:x||0,y:y||0}
    this.wait = 2000 // en millisecondes
    this.element = this.createElement()
    this.positionElement()
    this.startCountdown()
  }
  
  createElement(){
    let element= this.element;
    if (!this.element) {
        element = newElement({
            tag: "div",
            attrs: {
              class: "game-bombe",
            },
            children: [],
          },"game-container","class")
    }

    let {width,height} = this.container?.element?.getBoundingClientRect();
    element.style.width = `${height/10}px`
    element.style.height = `${height/10}px`
    return element
  }
  positionElement(){
    let {top,left,width,height} = this.container?.element?.getBoundingClientRect();
    let cageSize = height/10
    let {x,y} = this.position
    this.element.style.left = `${left+(x*cageSize)}px`
    this.element.style.top = `${top+(y*cageSize)}px`
  }
  startCountdown(){
    setTimeout(() => {
      //Supprimer les wall voisins
      this.container.obstacles = this.container.obstacles.filter(obstacle => {
        if ( obstacle.position.x === this.position.x+1 && obstacle.position.y === this.position.y
          || obstacle.position.x === this.position.x-1 && obstacle.position.y === this.position.y
          || obstacle.position.y === this.position.y+1 && obstacle.position.x === this.position.x
          || obstacle.position.y === this.position.y-1 && obstacle.position.x === this.position.x
        ) { // le supprimer si false
          if (obstacle.type === 'WALL') {
            obstacle.element.remove()
            return false
          }
          return true
        } else { // le garder
          return true
        }
      })
      //Remove the bomb from the game
      this.container.bombs = this.container.bombs.filter(bomb => bomb!== this)
      this.element.remove()
    }, this.wait);
  }
}