const w = window.innerWidth,h = window.innerHeight,size = Math.min(w,h)/20
class Vertex {
    constructor(x,y) {
        this.neighbors = []
        this.x = x
        this.y = y
        this.state = new State()
    }
    draw(context) {
        const initColor = '#f44336'
        const selectColor = '#009688'
        context.save()
        context.translate(this.x,this.y)
        this.drawVertexAndEdges(context,1,initColor)
        this.drawVertexAndEdges(context,this.state.scale,selectColor)
        context.restore()
    }
    drawVertexAndEdges(context,scale,color) {
        context.fillStyle = color
        context.strokeStyle = color
        context.beginPath()
        context.arc(0,0,size*scale,0,2*Math.PI)
        context.fill()
        this.neighbors.forEach((neighbor)=>{
            context.beginPath()
            context.moveTo(0,0)
            context.lineTo((neighbor.x-this.x),(neighbor.y-this.y))
            context.stroke()
        })
    }
    update() {
        this.state.update()
    }
    startUpdating() {
        this.state.startUpdating()
    }
    stopped() {
        return this.state.stopped()
    }
    addNeighbor(vertex) {
        this.neighbors.push(vertex)
    }
}
class State {
    constructor() {
        this.scale = 0
        this.dir = 0
    }
    update() {
        this.scale += this.dir*0.1
        if(this.scale > 1) {
            this.scale = 0
            this.dir = 0
        }
        if(this.scale < 0) {
            this.scale = 0
            this.dir = 0
        }
    }
    stopped() {
        return this.dir == 0
    }
    startUpdating() {
        this.dir = 1-2*this.scale
    }
}
