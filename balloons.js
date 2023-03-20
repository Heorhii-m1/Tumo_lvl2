

    function setup(){
        createCanvas(400,730)
    }

    function draw(){
        background('skyblue')

        for (const balloon of Game.balloons){
            balloon.display()
            balloon.move()
            balloon.delete()
            if(mouseIsPressed){
            balloon.burst()
        }
        }

        for(const cloud of Game.obsticles){
            cloud.display()
            cloud.move()
        }

        textSize(32)
        fill('black')
        text(Game.score, 20, 40)

        // if(mouseIsPressed && isLooping() == false) {
        //     background('skyblue')
        //     loop()
        // }
       if(keyIsPressed){
        if(Game.timeStops >0){
            let zero = Game.speed
            Game.speed = 0
            setTimeout(Game.speed = zero, 3000)
        }
        }

        if(frameCount % 50 == 0){
            Game.addCommonBaloon()
        }

        if (frameCount % 168 == 0) {
            Game.addRareBaloon()
        }

        if (frameCount % 75 == 0) {
            Game.addBadBalloon()
        }

        if(frameCount % 321 == 0) {
            Game.addCloud()
        }

        if(frameCount % 602 == 0){
            Game.addGravBalloon()
        }

        if(frameCount % 765 == 0){
            Game.addTheWorldballoon()
        }

        if(Game.score >= 200 && Game.score <= 220){
            Game.speed += 0.01;
        }

        if(Game.score > 350 && Game.score <= 352){
            Game.speed += 0.1;
        }
        
    }

    class Game {
        static obsticles = []
        static balloons = []
        static score = 0
        static speed = 1
        static direction = 1
        static timeStops = 0

        static addCommonBaloon(){
            let balloon = new CommonBalloon('blue', 50, 10)
            this.balloons.push(balloon)
        }

        static addRareBaloon(){
            let balloon = new CommonBalloon('green', 25, 10)
            this.balloons.push(balloon)
        }

        static addBadBalloon(){
            let balloon = new CommonBalloon('black', 50, -10)
            this.balloons.push(balloon)
        }

        static addGravBalloon(){
            let balloon = new CommonBalloon('red', 30, 15)
            this.balloons.push(balloon)
        }

        static addTheWorldballoon(){
            let balloon = new CommonBalloon('yellow', 30, -1)
            this.balloons.push(balloon)
        }

        static addCloud(){
            let cloud = new Cloud(50)
            this.obsticles.push(cloud)
        }

    }

    class CommonBalloon {
        constructor(color, size, score_addup){
            this.x = size/2 + random(width - size)
            if(Game.direction == 1){
                this.y = random(height-10, height - 20)
            }   else {
                this.y = random(100, 115)
            }
            this.color = color
            this.size = size
            this.score_addup = score_addup
        }

        display(){
            fill(this.color)
            ellipse(this.x, this.y, this.size)
            line(this.x, this.y + (this.size/2), this.x, this.y + (2*this.size))
        }

        delete(){
            for(let i = 0; i < Game.balloons.length; i++){
                if(Game.balloons[i].color != 'black'){
                    if(Game.balloons[i].y < Game.balloons[i].size/3 || Game.balloons[i].y > height - 5){
                        Game.balloons.splice(0)
                        Game.obsticles.splice(0)
                        noLoop()    
                        background(136, 220, 166)
                        let final_score = Game.score
                        Game.score = ''
                        textSize(52)
                        fill('white') 
                        textAlign(CENTER, CENTER)
                        text('FINISH', 200, 200)
                        textSize(32)
                        text('Score: ' + final_score, 200, 300)
                    }  
                }   else{
                    if(Game.balloons[i].y <= -100 || Game.balloons[i].y >= height + 100){
                        Game.balloons.splice(i,1)
                    }  
                }
                }
            }
        

        move(){
            this.y -= Game.speed * Game.direction
        }

        burst(){
                outer: for(let i = 0; i < Game.balloons.length; i++){
                    if(Math.pow((Game.balloons[i].size)/2, 2) >= (Math.pow((mouseX - Game.balloons[i].x), 2) + Math.pow((mouseY - Game.balloons[i].y), 2))) {
                        Game.score += Game.balloons[i].score_addup
                        if(Game.balloons[i].color == 'red'){
                            if(Game.direction == 1){
                                
                                inner:for(let j = Game.balloons.length - 1; j > 0; j--){
                                    console.log(i,'- ', j, '- ',Game.balloons.length);
                                    if(Game.balloons[j].y > height/2){
                                        Game.balloons.splice(j, 1)
                                    }
                                Game.direction = -1
                                break outer
                                }
                            }   else{
                                Game.direction = 1;
                                inner:for(let j = Game.balloons.length - 1; j > 0; j--){
                                    if(Game.balloons[j].y < height/2){
                                        Game.balloons.splice(j, 1)
                                    }
                                    break outer
                                }
                            }
                        }
                        if(Game.balloons[i].color == 'yellow'){
                            if(Game.timeStops < 3){
                                Game.timeStops += 1;
                            }
                        }
                        Game.balloons.splice(i,1)
                        break outer
                    }
                }
                
            
        }
    }

    class Cloud {
        constructor(size){
        this.size = random(size, size+10)
        this.x = -11
        this.y = random(height/3, height * 2/3)
        }

        display(){
            fill('white')
            ellipse(this.x, this.y, 2*this.size, this.size)
            ellipse(this.x + this.size/4, this.y- this.size/3, this.size)
            ellipse(this.x + this.size/2, this.y + this.size/6, this.size)
        }

        move(){
            this.x += Game.speed * 4/7;
            for(let i = 0; i < Game.obsticles.length, i++;){
                if(Game.obsticles[i].x >= width*1.5){
                    Game.obsticles.splice[i,1]
                }
            }
        }
    }

