class Particle {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.initX = this.x;
        this.initY = this.x;
        this.density = (Math.random()+1);
        this.mass = this.density * this.size;
    }
}

const height = document.getElementById("container").clientHeight;
const width = document.getElementById("container").clientWidth;

let mousePos = {x:width/2,y:height/2};
let particles = [];

for(let i=0;i<40;i++){
    particles.push(new Particle(Math.random()*width, Math.random()*height,Math.random()*5+1))
    // console.log(particles[i]);
}

let container = d3.select("#container");
let circs = container.selectAll(".particle").data(particles);

// the scales
const x = d3.scaleLinear()
            .domain([0,2000])
            .range([0,width])
            ;

const y = d3.scaleLinear()
            .domain([0,2000])
            .range([0,height])
            ;

// update
function updateElements(){        
    container   .selectAll(".particle")
                .data(particles)
                .attr("cx", d => d.x)
                .attr("cy", d=>d.y)
                .attr("r", d=> d.size)
        ;
}
function createElements(){
    container       .selectAll(".particle")
                    .data(particles)
                    .enter()
                    .append("circle")
                    .classed("particle", true)
                    .attr("cx", d => d.x)
                    .attr("cy", d=>d.y)
                    .attr("r", d=> d.size)
                    .attr("fill", "#d587ad")

}

createElements();

container .on("mousemove", function(){
    mousePos.x = d3.mouse(this)[0];
    mousePos.y = d3.mouse(this)[1];
});

container.selectAll(".particles").exit().remove();

setInterval(() => {
    for(i in particles){
        xDiff = (particles[i].x - mousePos.x)
        yDiff = (particles[i].y - mousePos.y)
        xDir = -xDiff/Math.abs(particles[i].x - mousePos.x);
        yDir = -yDiff/Math.abs(particles[i].y - mousePos.y);
        console.log(yDir)
        if(Math.sqrt(xDiff*xDiff+yDiff*yDiff) < 300){
            particles[i].x = particles[i].x + xDir/particles[i].mass*Math.sqrt(xDiff*xDiff+yDiff*yDiff)/100;
            particles[i].y = particles[i].y + yDir/particles[i].mass*Math.sqrt(xDiff*xDiff+yDiff*yDiff)/100;
        }
    }
    updateElements();
}, 5);