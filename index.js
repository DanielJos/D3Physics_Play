class Particle {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.xVel = 0;
        this.yVel = 0;
        this.size = size;
        this.initX = this.x;
        this.initY = this.y;
        this.density = (Math.random()+1);
        this.mass = this.density * this.size;
        this.dirVec = [0,0];
        this.vel = 0;
    }
}

const height = document.getElementById("container").clientHeight;
const width = document.getElementById("container").clientWidth;

let mousePos = {x:width/2,y:height/2};
let prts = [];

for(let i=0;i<40;i++){
    prts.push(new Particle(Math.random()*width, Math.random()*height,Math.random()*5+1))
    // console.log(particles[i]);
}

let container = d3.select("#container");
let circs = container.selectAll(".particle").data(prts);

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
                .data(prts)
                .attr("cx", d => d.x)
                .attr("cy", d=>d.y)
                .attr("r", d=> d.size);

    container   .selectAll("text")
                .data(prts)
                .attr("x", d => d.x+10)
                .attr("y", d=>d.y+10)
                .attr("font-size", 20)
                .attr("fill", "black")
                .text(d=>{
                    return xDir/(prts[i].dirVec[0]*prts[i].dirVec[0]);
                });
}
function createElements(){
    container       .selectAll(".particle")
                    .data(prts)
                    .enter()
                    .append("circle")
                    .classed("particle", true)
                    .attr("cx", d => d.x)
                    .attr("cy", d=>d.y)
                    .attr("r", d=> d.size)
                    .attr("fill", "#d587ad");

    container       .selectAll(".text")
                    .data(prts)
                    .enter()
                    .append("text")
                    .classed("text", true)
                    .attr("x", d => d.x)
                    .attr("y", d=>d.y);

}

createElements();

container .on("mousemove", function(){
    mousePos.x = d3.mouse(this)[0];
    mousePos.y = d3.mouse(this)[1];
});

container.selectAll(".particles").exit().remove();

setInterval(() => {
    for(i in prts){
        xDiff = (mousePos.x - prts[i].x)
        yDiff = (mousePos.y - prts[i].y)
        prts[i].dirVec = [xDiff,yDiff]; 

        xDir = -xDiff/Math.abs(prts[i].x - mousePos.x);
        yDir = -yDiff/Math.abs(prts[i].y - mousePos.y);
        // console.log(yDir)
        // if(Math.sqrt(xDiff*xDiff+yDiff*yDiff) < 300){
        //     prtArr[i].x = prtArr[i].x + xDir/prtArr[i].mass*Math.sqrt(xDiff*xDiff+yDiff*yDiff)/100;
        //     prtArr[i].y = prtArr[i].y + yDir/prtArr[i].mass*Math.sqrt(xDiff*xDiff+yDiff*yDiff)/100;
        // }
        prts[i].xVel = -1/(prts[i].dirVec[0]*prts[i].dirVec[0]);
        prts[i].yVel = -1/(prts[i].dirVec[1]*prts[i].dirVec[1]);

        prts[i].x += 100*prts[i].xVel;
        prts[i].y += 100*prts[i].yVel;
    }
    updateElements();
}, 25);