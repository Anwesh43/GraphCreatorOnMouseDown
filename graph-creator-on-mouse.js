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
            context.lineTo((neighbor.x-this.x)*scale,(neighbor.y-this.y)*scale)
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
    handleTap(x,y) {
        return x>=this.x-size && x<=this.x+size && y>=this.y-size && y<=this.y+size
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
//mode is 0 it is create mode if mode is selection
class Graph {
    constructor() {
        this.mode = 0
        this.root = null
    }
    drawVertex(context,root) {
        root.draw(context)
        root.neighbors.forEach((vertex)=>{
            this.drawVertex(context,vertex)
        })
    }
    draw(context) {
        if(this.root != null) {
            this.drawVertex(context,this.root)
        }
    }
    handleTapForVertex(x,y,root) {
        if(root.handleTap(x,y)) {
            if(this.curr) {
                this.curr.state.scale = 0
            }
            this.curr = root
            this.curr.state.scale = 1
            return true
        }
        else {
            for(var i=0;i<root.neighbors.length;i++) {
                const tapped =  this.handleTapForVertex(x,y,root.neighbors[i])
                if(tapped) {
                    return tapped
                }
            }
        }
    }
    handleTap(x,y) {
        if(this.root != null) {
            return this.handleTapForVertex(x,y,this.root)
        }
        return false
    }
    createVertex(x,y) {
        if(this.root == null) {
            this.root = new Vertex(x,y)
            this.curr = this.root
            this.curr.state.scale = 1
        }
        else {
            this.curr.neighbors.push(new Vertex(x,y))
        }
    }
}
class Stage {
    constructor(w,h) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        this.graph = new Graph()
        this.graph.draw(this.context)
    }
    initMouseEvent() {
        this.canvas.onmousedown = (event) => {
            const x = event.offsetX,y = event.offsetY
            if(!this.graph.handleTap(x,y)) {
                this.graph.createVertex(x,y)
            }
            this.graph.draw(this.context)
        }

    }
}
const stage = new Stage(w,h)
stage.initMouseEvent()
