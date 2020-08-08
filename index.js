class Particle {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.initX = this.x;
        this.initY = this.x;
        this.mass = (Math.random()*10+1);
    }
}

particles = [];

const height = document.getElementById("container").clientHeight;
const width = document.getElementById("container").clientWidth;

for(let i=0;i<20;i++){
    particles.push(new Particle(Math.random()*width, Math.random()*height,3))
}
 
const x = d3.scaleLinear()
            .domain([0,2000])
            .range([0,width])
            ;

const y = d3.scaleLinear()
            .domain([0,2000])
            .range([0,height])
            ;

            
function circles(){
    let par = d3.select("#container")
                .selectAll("circle")
                .data(particles)
                .attr("cx", d => d.x)
                .attr("cy", d=>d.y)
                .attr("r", d=> d.size)
                ;
    let con = d3.select("#container");

    par .enter()
        .append("circle")
        .classed("particle", true)
        .attr("cx", d => d.x)
        .attr("cy", d=>d.y)
        .attr("r", d=> d.size)
        .attr("fill", "#d587ad")
        ;

    par.exit().remove();
}

let con = d3.select("#container");

con .on("click", function() {
    let mouse = d3.mouse(this);     // 0 is x, 1 is y
        for (let i in particles){
            setTimeout(()=>{
                let deltaX = particles[i].x - mouse[0];
                let deltaY = particles[i].y - mouse[1];
                particles[i].x = particles[i].x - (0.01*deltaX);
                particles[i].y = particles[i].y - (0.01*deltaY);
                console.log(deltaX);
            }, 100);
    
        }
        circles();
    })
    .selectAll("circle")
    .attr("cx", d => d.x)
    .attr("cy", d=>d.y)
    .attr("r", d=> d.size)
    ;

