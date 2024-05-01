import { newElement } from "../../src/modules/dom.mjs";

export class Player {
  constructor(props,uuid) {
    this.container = props
    this.position = {x:0,y:0}
    this.transitionDuration = this.getTransitionDuation()
    this.cageSize = 0
    this.element = this.createElement()
    this.positionElement()
    // Moove only your player with keys based on uuid
    if (uuid === this.container.uuid) {
      this.checkKeyListener()
    }
  }
  createElement(){
    let element= this.element;
    if (!this.element) {
        element = newElement({
            tag: "div",
            attrs: {
              id: "player",
              class: "game-player",
            },
            children: [],
          },"game-container","class")
    }

    let {width,height} = this.container?.element?.getBoundingClientRect();
    element.style.width = `${height/10}px`
    element.style.height = `${height/10}px`
    return element
  }
  getTransitionDuation(){
    const element = document.documentElement;  // Generally, the root element
    const styles = getComputedStyle(element);
    // Retrieve the value of the CSS variable
    const mainColor = styles.getPropertyValue('--moving-transition');
    return parseInt(mainColor) || 0
  }
  positionElement(){
    let {top,left,width,height} = this.container?.element?.getBoundingClientRect();
    this.cageSize = height/10
    let {x,y} = this.position
    this.element.style.left = `${left+(x*this.cageSize)}px`
    this.element.style.top = `${top+(y*this.cageSize)}px`
  }
  checkKeyListener(){
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case " ":
          this.container.createBomb(this.position)
          break 
        case "ArrowUp":
          this.moveUp()
          break;
        case "ArrowDown":
          this.moveDown()
          break;
        case "ArrowLeft":
          this.moveLeft()
          break;
        case "ArrowRight":
          this.moveRight()
          break;
        default:
          break;
      }
    })
  }
  moveRight(){
    if (this.canMoove("RIGHT"))
        this.position.x += 1
        this.positionElement()
  }
  moveLeft(){
    if (this.canMoove("LEFT"))
        this.position.x -= 1
        this.positionElement()
  }
  moveUp(){
    if (this.canMoove("UP")) 
        this.position.y -= 1
        this.positionElement()
  }
  moveDown(){
    if (this.canMoove("DOWN")) 
    this.position.y += 1
    this.positionElement()
  }
  canMoove(direction){
    //swich direction
    let {x,y} = this.position
    let colleded;
    switch (direction) {
      case "RIGHT":
        colleded = this.container.obstacles.find(obs => 
          obs.position.x === x+1 && obs.position.y === y)
        return x < 10 -1  && !colleded
      case "LEFT":
        colleded = this.container.obstacles.find(obs => 
          obs.position.x === x-1 && obs.position.y === y)
        return this.position.x > 0 && !colleded
      case "UP":
        colleded = this.container.obstacles.find(obs => 
          obs.position.x === x && obs.position.y === y-1)
        return this.position.y > 0 && !colleded
      case "DOWN":
        colleded = this.container.obstacles.find(obs => 
          obs.position.x === x && obs.position.y === y+1)
        return this.position.y < 10 -1 && !colleded
      default:
        break;
    }
  }
}