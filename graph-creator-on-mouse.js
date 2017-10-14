const w = window.innerWidth,h = window.innerHeight,size = Math.min(w,h)/20
class Vertex {
    constructor(x,y) {
        this.neighbors = []
        this.x = x
        this.y = y
    }
    draw(context) {
        const initColor = '#f44336'
        context.save()
        context.translate(this.x,this.y)
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
      
    }
    startUpdating() {

    }
    stopped() {

    }
}
