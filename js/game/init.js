import { newElement } from "../../src/modules/dom.mjs";
import { generateUUID } from "../utils/uuid.js";
import { Bomb } from "./bomb.js";
import data from "./data.js";
import { Player } from "./player.js";
import { Wall } from "./wall.js";

export class Game {
  constructor() {
    this.uuid = generateUUID()
    this.widthPercentage = 50;
    this.heightPercentage = 60;
    this.bombs = []
    this.element = this.createGameElement()
    this.obstacles = this.createObstaclesElements()
    this.players = [new Player(this,this.uuid)]
    // setTimeout(() => {
    //   this.players.push(new Player(this,"hello"))
    // }, 3000);
  }
  createGameElement(){
    let element = newElement({
      tag: "div",
      attrs: {
        id: "gameConatainer",
        class: "game-container",
      },
      children: [],
    })
    element.style.width = `${this.heightPercentage}vh`
    element.style.height = `${this.heightPercentage}vh`
    return element
  }
  createObstaclesElements(){
    let obstacles = []
    data.getObstaclesData().forEach((obstacle) => {
      let {x,y,type} = obstacle
      if (type === "WALL") {
        obstacles.push(new Wall(this,x,y))
      } else {

      }
    })
    return obstacles
  }

  createBomb({x,y}){
    this.bombs.push(new Bomb(this,x,y))
  }
}

function init() {
  let game = new Game()
  //onscreen resize
  window.addEventListener("resize", () => {
    game.players.forEach(player => {
      player.createElement()
      player.positionElement()
    })
    game.obstacles.forEach(obstacle => {
      obstacle.createElement()
      obstacle.positionElement()
    })
  })
}
init()