let grid = [];
let next = [];
let sz = 20;
let celltotal = 0; // need to get cell total becaue array has some parts undefined in order to get change pixel size
let gotToOne = 0;

function setup() {

  // square canvas based on the smallest length
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
    print("height");
  } else {
    createCanvas(windowWidth, windowWidth);
    print("width");

  }
  colorMode(HSB,255) // set the maximum for all colors at 255
  noStroke();
  //stroke(255);
  
  makeStartGrid();
  
  print(grid.length, (grid.length - 1) / sz, celltotal)
}

function draw() {
  background(220);
  
  // check for clear grid
  if (celltotal === gotToOne){
   grid = [[]]; // clear the grids
   next = [[]];
   makeStartGrid();   // restart when all have reached one
   gotToOne = 0; // clear got to one
   }
  
  // repeatedly run the three functions
  drawGrid();
  getNextGen();
  swap();
  

}

function makeStartGrid(){
  
  celltotal =0;
  // make the grid and next with a  simple javaScript object litteral 
  for (let x = 0; x < width/sz; x++) {
    grid[x] = [];
    next[x] = []
    for (let y = 0; y < height/sz; y++) {
      grid[x][y] = {
        a: floor(random(7, 255)), // random seed, must be an int , floor it!
      
        b: 0
      }; // js object litteral
      next[x][y] = {
        a: 0,
        b: 0
      }; // js object litteral
      celltotal++
    }

  }
  
  
}

function getNextGen() {
  gotToOne = 0; // need to clear the variable each time through
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      
      // colatz conjecture 

      if (grid[x][y].a % 2 == 0 && grid[x][y].a > 0) { // if it is even and greater thean zero divide by two

        next[x][y].a = grid[x][y].a / 2

      } else { // else multiply by 3 and add one

        next[x][y].a = (grid[x][y].a * 3) + 1
      }
      
      // check to see if it made it to one
      if (grid[x][y].a === 1) {
        grid[x][y].a = 0; // set that cell to zero since it has reached its goal
        gotToOne++;

      }


    }

  }



}

function drawGrid() {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      //let c = map(grid[x][y].a,0,9555555555555,50,255);
      fill(grid[x][y].a,255, grid[x][y].a); // full satuatioin h and b are from grid
      // fill(127-c,255-c,125-c);
      //fill(c,grid[x][y].b,c);
      rect(x*sz, y*sz, sz, sz);
    }
  }

}

function swap() {
  grid = next;

}