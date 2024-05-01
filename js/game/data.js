let ALL_PLAYERS = ["CHEIKH","MASSECK","VINCENT","SDIENE"]
/**
 * @returns {Boolean}
 */
const isProtectedCage = ({x,y})=> {
    let protectedCages = []
    if (ALL_PLAYERS.length>0) // protect TOP-LEFT coner
        protectedCages.push({x:0,y:0},{x:1,y:0},{x:0,y:1},)
    if (ALL_PLAYERS.length>1) // protect RIGHT-BOTTOM coner
        protectedCages.push({x:10-1,y:10-1},{x:10-2,y:10-1},{x:10-1,y:10-2},)
    if (ALL_PLAYERS.length>2) // protect TOP-RIGHT coner
        protectedCages.push({x:10-1,y:0},{x:10-2,y:0},{x:10-1,y:1},)
    if (ALL_PLAYERS.length>3) // protect BOTTOM-LEFT coner
        protectedCages.push({x:0,y:(10-2)},{x:0,y:(10-1)},{x:1,y:(10-1)},)
    return protectedCages.find(cage => cage.x === x && cage.y === y)
}
const getObstaclesData =()=> {
    let obstacles = []
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let random = Math.floor(Math.random() * 10)
            if (random <= 5) { // 2/10 of probalblity to create an Obstacle
                if (!isProtectedCage({x,y})) {
                    obstacles.push({x,y,type:random===1?'BLOCK':'WALL'}) // 1/3 of probalblity of type BLOCK
                }
            }
        }
    }
    return obstacles
}
export default {
    getObstaclesData
}