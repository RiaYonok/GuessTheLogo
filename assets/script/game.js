
cc.Class({

    extends: cc.Component,

    properties: {

        background : {
            default : null,
            type : cc.Node
        },
        
        btn1 : {
            default : null,
            type : cc.Button
        },
        btn2 : {
            default : null,
            type : cc.Button
        },
        btn3 : {
            default : null,
            type : cc.Button
        },
        btn4 : {
            default : null,
            type : cc.Button
        },

        btnLabels : {
            default : [],
            type : cc.Label
        },
                
        oldScoreSum : 0,

        scoreSum : 10,

        scoreSumLabel : {
            default : null,
            type : cc.Label
        },
        
        testSceneNum : 0,

        testSceneNumLabel : {
            default : null,
            type : cc.Label
        },
        
        clockProgressBar : {
            default : null,
            type : cc.ProgressBar
        },        
        
        clock : 0,
 
        remainTimeLabel : {
            default : null,
            type : cc.Label
        },

        quizSprite : {
            default : null,
            type : cc.Sprite
        },

        answerSprite : {
            default : null,
            type : cc.Sprite
        },        
        
        problems : { 
            default : [],
            type : [Problem]
        },
        
        quizLimit : 0,

        scene_answer : '',
     
        isNewTestSceneStart : false,
          
        sndCorrect : {
            default : null,
            type : cc.AudioClip
        },

        sndIncorrect : {
            default : null,
            type : cc.AudioClip
        },

        back_trans : {
            default : null,
            type : cc.Node
        },

        isGameOver : false,

        bar : {
            default : null,
            type : cc.Node
        },

       scorePanel : {
           default : null,
           type : cc.Node
       },

       logo_bg : cc.Node,
       scoresumIcon : cc.Node,
       timerIcon : cc.Node,
       btnHome : cc.Node,
       btnPlayAgain : cc.Node,
       btnShare : cc.Node,
       yourScoreSprite : cc.Node,
       ptsSprite : cc.Node,
       finalScoreLabel : cc.Node,
      
    },

    onLoad () {       
        this.changeControls();

        this.initProblems();
        
        var width = this.background.width;        
        this.background.x += width;
              
        var trans = cc.moveBy(0.2, cc.v2(-width, 0));
        this.background.runAction(trans);

        this.updateTestSceneNumLabel();  
        this.loadTestScene(this.testSceneNum);
        this.isNewTestSceneStart = true;

        var self = this;

        this.node.on("answer", function(event){            
			self.sceneAnswerCheck(this.testSceneNum);
		}, this);
    },

    changeControls(){
        var winWidth = cc.winSize.width;
        var winHeight = cc.winSize.height;        
        
        //background
        this.background.width = winWidth;
        this.background.height = winHeight;
        //backtrans
        this.back_trans.width = winWidth;
        this.back_trans.height = winHeight;
        //clockprogressbar, bar
        this.clockProgressBar.node.width = this.clockProgressBar.node.width * (winWidth / 750);
        this.clockProgressBar.node.height = this.clockProgressBar.node.height * (winHeight / 1334);
        this.clockProgressBar.node.y = this.clockProgressBar.node.y * (winHeight / 1334);
        this.clockProgressBar.node.getComponent(cc.ProgressBar).totalLength = this.clockProgressBar.node.getComponent(cc.ProgressBar).totalLength * (winWidth / 750);

        this.bar.width = this.bar.width * (winWidth / 750);
        this.bar.height = this.bar.height * (winHeight / 1334);
        this.bar.x = this.bar.x * (winWidth / 750);
        this.bar.y = this.bar.y * (winHeight / 1334);

        //btns
        this.btn1.node.y = this.btn1.node.y * (winHeight / 1334);
        this.btn2.node.y = this.btn2.node.y * (winHeight / 1334);
        this.btn3.node.y = this.btn3.node.y * (winHeight / 1334);
        this.btn4.node.y = this.btn4.node.y * (winHeight / 1334);

        this.btn1.node.width = this.btn1.node.width * (winWidth / 750);
        this.btn2.node.width = this.btn2.node.width * (winWidth / 750);
        this.btn3.node.width = this.btn3.node.width * (winWidth / 750);
        this.btn4.node.width = this.btn4.node.width * (winWidth / 750);
        
        this.btn1.height = this.btn1.height * (winHeight / 1334);
        this.btn2.height = this.btn2.height * (winHeight / 1334);
        this.btn3.height = this.btn3.height * (winHeight / 1334);
        this.btn4.height = this.btn4.height * (winHeight / 1334);

        //logo_bg
        this.logo_bg.width = this.logo_bg.width * (winWidth / 750);
        this.logo_bg.height = this.logo_bg.height * (winHeight / 1334);        
        this.logo_bg.y = this.logo_bg.y * (winHeight / 1334);

        //quiz sprite, answer sprite
        this.quizSprite.node.width = this.quizSprite.node.width * (winWidth / 750);
        this.quizSprite.node.height = this.quizSprite.node.height * (winHeight / 1334);
        this.quizSprite.node.y = this.quizSprite.node.y *  (winHeight / 1334);

        this.answerSprite.node.width = this.answerSprite.node.width * (winWidth / 750);
        this.answerSprite.node.height = this.answerSprite.node.height * (winHeight / 1334);
        this.answerSprite.node.y = this.answerSprite.node.y *  (winHeight / 1334);

        //scoresumIcon, timerIcon
        this.scoresumIcon.x = this.scoresumIcon.x * (winWidth / 750);
        this.scoresumIcon.y = this.scoresumIcon.y * (winHeight / 1334);
        
        this.timerIcon.x = this.timerIcon.x * (winWidth / 750);
        this.timerIcon.y = this.timerIcon.y * (winHeight / 1334);

        //scoresumLabel, remainTimeLabel
        this.scoreSumLabel.node.x = this.scoreSumLabel.node.x * (winWidth / 750);
        this.scoreSumLabel.node.y = this.scoreSumLabel.node.y * (winHeight / 1334);

        this.remainTimeLabel.node.x = this.remainTimeLabel.node.x * (winWidth / 750);
        this.remainTimeLabel.node.y = this.remainTimeLabel.node.y * (winHeight / 1334);

        //btnPlayAgain, btnHome, btnShare
        this.btnPlayAgain.x = this.btnPlayAgain.x * (winWidth / 750);
        this.btnPlayAgain.y = this.btnPlayAgain.y * (winHeight / 1334);
        this.btnPlayAgain.width = this.btnPlayAgain.width * (winWidth / 750);
        this.btnPlayAgain.height = this.btnPlayAgain.height * (winHeight / 1334);

        this.btnHome.x = this.btnHome.x * (winWidth / 750);
        this.btnHome.y = this.btnHome.y * (winHeight / 1334);
        this.btnHome.width = this.btnHome.width * (winWidth / 750);
        this.btnHome.height = this.btnHome.height * (winHeight / 1334);

        this.btnShare.x = this.btnShare.x * (winWidth / 750);
        this.btnShare.y = this.btnShare.y * (winHeight / 1334);
        this.btnShare.width = this.btnShare.width * (winWidth / 750);
        this.btnShare.height = this.btnShare.height * (winHeight / 1334);

        //finalScoreLabel, ptsLabel, yourscore sprite
        this.yourScoreSprite.y = this.yourScoreSprite.y * (winHeight / 1334);

        this.finalScoreLabel.x = this.finalScoreLabel.x * (winWidth / 750);
        this.finalScoreLabel.y = this.finalScoreLabel.y * (winHeight / 1334);

        this.ptsSprite.x = this.ptsSprite.x * (winWidth / 750);
        this.ptsSprite.y = this.ptsSprite.y * (winHeight / 1334);

    },

    resetBtnColor(){
        this.btn1.node.color = cc.Color.WHITE;
        this.btn2.node.color = cc.Color.WHITE;
        this.btn3.node.color = cc.Color.WHITE;
        this.btn4.node.color = cc.Color.WHITE;
    },

    sceneAnswerCheck(index){            
        var self = this;    
        
        if(this.problems[this.testSceneNum].solution === this.scene_answer){
            cc.audioEngine.play(self.sndCorrect, false, 1);
            this.isNewTestSceneStart = false;
            this.IncOpacitySlowly(self.answerSprite.node, 0.1);
            
            this.oldScoreSum = this.scoreSum;
            this.scoreSum += Math.round(11 - this.clock);
                                    
            this.testSceneNum++;
            
            
            if(this.testSceneNum === this.quizLimit){

                var ls = cc.sys.localStorage;
                ls.setItem("key", this.scoreSum);

                this.scheduleOnce(function(){     
                    //cc.director.loadScene("end");     
                    this.background.opacity = 52;                              
                    this.back_trans.active = true;
                    this.scorePanel.active = true;
                    this.isGameOver = true;
                }, 1);
                
            }else{
                var nextScene = function(){                  

                    this.loadTestScene(this.testSceneNum);    
                     this.remainTimeLabel.getComponent(cc.Label).string = 10;
                    this.moveButtons();    
                    this.updateTestSceneNumLabel();    
                    this.isNewTestSceneStart = true;                
                }
                this.scheduleOnce(nextScene, 2);                
                
            }
            
        }else{
            this.testSceneNum++;
            this.isNewTestSceneStart = false;
            
            //this.inCorrect = true;
            var ls = cc.sys.localStorage;
            ls.setItem("key", self.scoreSum);

            this.scheduleOnce(function(){
                //cc.director.loadScene("end");
                cc.audioEngine.play(self.sndIncorrect, false, 1);
                this.background.opacity = 52;
                this.back_trans.active = true;
                this.scorePanel.active = true;
                this.isGameOver = true;
            }, 0.5)
            
        }
    },

    updateScoreSumLabel(dt){

        this.oldScoreSum += dt * 10;
        if(this.oldScoreSum > this.scoreSum){
            
        }else{
            this.scoreSumLabel.getComponent(cc.Label).string = Math.round(this.oldScoreSum);
        }
                
    },

    updateTestSceneNumLabel(){
        this.testSceneNumLabel.getComponent(cc.Label).string = this.testSceneNum + 1;
    },

    start () {
        
    },

    loadTestScene(index){
        
        var self = this;        

        this.DecOpacitySlowly(self.quizSprite.node, 0.01);
        this.DecOpacitySlowly(self.answerSprite.node, 0.01);
        
        var sprite = self.quizSprite.getComponent(cc.Sprite);        
        var spriteurl = self.problems[index].quiz_imgurl;
        cc.loader.loadRes(spriteurl, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        this.IncOpacitySlowly(self.quizSprite.node, 0.7);

        
        var sprite_ = self.answerSprite.getComponent(cc.Sprite);        
        spriteurl = self.problems[index].answer_imgurl;
        cc.loader.loadRes(spriteurl, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite_));

        this.setBtnTxtRandom(index);
    
        self.resetBtnColor();

    },

    setBtnTxtRandom(index){
        var numArray = [0, 1, 2, 3];
        numArray.sort(function(a, b){return 0.5 - Math.random()});
        var temp = numArray[0];
        this.btnLabels[temp].string = this.problems[index].quiz1;
        temp = numArray[1];
        this.btnLabels[temp].string = this.problems[index].quiz2;
        temp = numArray[2];
        this.btnLabels[temp].string = this.problems[index].quiz3;
        temp = numArray[3];
        this.btnLabels[temp].string = this.problems[index].quiz4;
    },

    IncOpacitySlowly(node, time){    
        node.runAction(cc.sequence( 
            cc.fadeIn(time), 
            cc.callFunc(function () {                
            })
        ));
    },
 
    DecOpacitySlowly(node, time){        
        node.runAction(cc.sequence( 
            cc.fadeOut(time), 
            cc.callFunc(function () {
            })
        ));
    },

    moveButtons(){   
        
        var bgwidth = this.background.width;
        this.btn1.node.setPosition(this.createBtnPosition(this.btn1));        
        var move1 = cc.moveBy(0.3, cc.v2(-bgwidth, 0));
        this.btn1.node.runAction(move1);

        
        this.btn2.node.setPosition(this.createBtnPosition(this.btn2));        
        var move2 = cc.moveBy(0.3, cc.v2(-bgwidth, 0));
        this.btn2.node.runAction(move2);


        this.btn3.node.setPosition(this.createBtnPosition(this.btn3));        
        var move3 = cc.moveBy(0.3, cc.v2(-bgwidth, 0));
        this.btn3.node.runAction(move3);
        
        this.btn4.node.setPosition(this.createBtnPosition(this.btn4));        
        var move4 = cc.moveBy(0.3, cc.v2(-bgwidth, 0));
        this.btn4.node.runAction(move4);


    },

    createQuizNum(){
        return Math.round(Math.random() * (this.quizLimit - 1));
    },

    createBtnPosition(btn){                
        var width = this.background.width;
        var x = btn.node.x + width;
        var y = btn.node.y;
        return cc.v2(x, y);
    },

    updateRemainTime(){
        if(this.isGameOver === true) return;
        var elapseTime = Math.round(this.clock);
        if(elapseTime > 10 || elapseTime < 1) return;
        this.remainTimeLabel.getComponent(cc.Label).string = 11 - elapseTime;
    },

    updateClockProgressBar(){
        if(this.isGameOver === true) return;
        this.clockProgressBar.progress = 1 - (this.clock / 10);

        if(this.clockProgressBar.progress > 0.95){//10
            this.bar.color = new cc.Color(45, 150, 132);
        }else if(this.clockProgressBar.progress > 0.9){
            this.bar.color = new cc.Color(37, 202, 52);
        }else if(this.clockProgressBar.progress > 0.87){//9
            this.bar.color = new cc.Color(75, 201, 43);
        }else if(this.clockProgressBar.progress > 0.83){
            this.bar.color = new cc.Color(83, 200, 41);
        }else if(this.clockProgressBar.progress > 0.8){
            this.bar.color = new cc.Color(109, 200, 35);
        }else if(this.clockProgressBar.progress > 0.75){//8
            this.bar.color = new cc.Color(123, 199, 31);
        }else if(this.clockProgressBar.progress > 0.7){
            this.bar.color = new cc.Color(138, 199, 28);
        }else if(this.clockProgressBar.progress > 0.67){//7
            this.bar.color = new cc.Color(165, 198, 21);
        }else if(this.clockProgressBar.progress > 0.64){
            this.bar.color = new cc.Color(169, 198, 21);
        }else if(this.clockProgressBar.progress > 0.6){
            this.bar.color = new cc.Color(188, 198, 16);
        }else if(this.clockProgressBar.progress > 0.57){//6
            this.bar.color = new cc.Color(216, 197, 9);
        }else if(this.clockProgressBar.progress > 0.54){
            this.bar.color = new cc.Color(219, 197, 9);
        }else if(this.clockProgressBar.progress > 0.5){
            this.bar.color = new cc.Color(240, 196, 4);
        }else if(this.clockProgressBar.progress > 0.45){//5
            this.bar.color = new cc.Color(255, 189, 0);
        }else if(this.clockProgressBar.progress > 0.4){
            this.bar.color = new cc.Color(254, 169, 0);
        }else if(this.clockProgressBar.progress > 0.37){//4
            this.bar.color = new cc.Color(253, 150, 0);
        }else if(this.clockProgressBar.progress > 0.34){
            this.bar.color = new cc.Color(253, 146, 0);
        }else if(this.clockProgressBar.progress > 0.3){
            this.bar.color = new cc.Color(252, 130, 0);
        }else if(this.clockProgressBar.progress > 0.27){//3
            this.bar.color = new cc.Color(252, 111, 0);
        }else if(this.clockProgressBar.progress > 0.24){
            this.bar.color = new cc.Color(251, 110, 0);
        }else if(this.clockProgressBar.progress > 0.2){
            this.bar.color = new cc.Color(251, 91, 0);
        }else if(this.clockProgressBar.progress > 0.15){//2
            this.bar.color = new cc.Color(250, 73, 0);
        }else if(this.clockProgressBar.progress > 0.1){
            this.bar.color = new cc.Color(250, 71, 0);
        }else if(this.clockProgressBar.progress > 0.07){
            this.bar.color = new cc.Color(249, 39, 0);//1
        }else if(this.clockProgressBar.progress > 0.04){
            this.bar.color = new cc.Color(248, 35, 0);
        }else if(this.clockProgressBar.progress <= 0.04){
            this.bar.color = new cc.Color(248, 15, 0);
        }
        
    },

    checkTimeOver(dt){
        if(this.isNewTestSceneStart === true){            
            this.clock += dt;            
            this.updateRemainTime();
            this.updateClockProgressBar();
            if(this.clock > 10){
                var ls = cc.sys.localStorage;
                ls.setItem("key", this.scoreSum);

                this.isNewTestSceneStart = false;

                //cc.director.loadScene("end");      
                this.background.opacity = 52;          
                this.back_trans.active = true;
                this.scorePanel.active = true;
                this.isGameOver = true;
                
            }else{
                return;
            }
                    
            
        }else {
            this.clock = 0;
            return;
        }
    },

    update (dt) { 
        
        this.updateScoreSumLabel(dt);        
        
        this.checkTimeOver(dt);        
    },

    initProblems(){
        this.problems = [
			{ quiz_imgurl: "Adidas_", answer_imgurl: "Adidas", quiz1: "Mountain Equipment", quiz2: "Adidas", quiz3: "New Balance", quiz4: "Majestic Athletic", solution: "Adidas"},
			{ quiz_imgurl: "Allrecipes_", answer_imgurl: "Allrecipes", quiz1: "Allstate", quiz2: "Allrecipes", quiz3: "All Star", quiz4: "Allianz", solution: "Allrecipes"},
			{ quiz_imgurl: "amazon_", answer_imgurl: "amazon", quiz1: "AirTran", quiz2: "Avon", quiz3: "Amazon", quiz4: "Aspirin", solution: "Amazon"},        
			{ quiz_imgurl: "Android_", answer_imgurl: "Android", quiz1: "Intel", quiz2: "Verizon Wireless", quiz3: "Samsung", quiz4: "Android", solution: "Android"},
			{ quiz_imgurl: "Apple_", answer_imgurl: "Apple", quiz1: "Dole", quiz2: "Apple", quiz3: "Fruit of the Loom", quiz4: "Del Monte", solution: "Apple"},
			{ quiz_imgurl: "Applebees_", answer_imgurl: "Applebees", quiz1: "Burt's Bees", quiz2: "Billy Bee", quiz3: "Applebee's", quiz4: "Bumble Bee", solution: "Applebee's"},
			{ quiz_imgurl: "Asics_", answer_imgurl: "Asics", quiz1: "ASICS", quiz2: "ABC", quiz3: "Alcoa", quiz4: "Alcan", solution: "ASICS"},
			{ quiz_imgurl: "Barbie_", answer_imgurl: "Barbie", quiz1: "Barielle", quiz2: "Bebe", quiz3: "Barbie", quiz4: "Barrie", solution: "Barbie"},
			{ quiz_imgurl: "BBM_", answer_imgurl: "BBM", quiz1: "Android", quiz2: "iPhone", quiz3: "Facebook Messenger", quiz4: "BBM", solution: "BBM"},
			{ quiz_imgurl: "Bluetooth_", answer_imgurl: "Bluetooth", quiz1: "Busch", quiz2: "Von Dutch", quiz3: "Bluetooth", quiz4: "Baby Ruch", solution: "Bluetooth"},
			{ quiz_imgurl: "Calvin Klein_", answer_imgurl: "Calvin Klein", quiz1: "Christopher Kane", quiz2: "Cath Kidston", quiz3: "Calvin Klein", quiz4: "Clarks", solution: "Calvin Klein"},
			{ quiz_imgurl: "Camel_", answer_imgurl: "Camel", quiz1: "Marlboro", quiz2: "Fiji Water", quiz3: "Camel", quiz4: "Coppertone", solution: "Camel"},
			{ quiz_imgurl: "Canon_", answer_imgurl: "Canon", quiz1: "Canon", quiz2: "Carnation", quiz3: "Claritin", quiz4: "Citroen", solution: "Canon"},
			{ quiz_imgurl: "Cartoon Network_", answer_imgurl: "Cartoon Network", quiz1: "Canadian National Railway", quiz2: "CN-Software", quiz3: "Columbia national", quiz4: "Cartoon Network", solution: "Cartoon Network"},
			{ quiz_imgurl: "Champions League_", answer_imgurl: "Champions League", quiz1: "Crystal Light", quiz2: "Coors Light", quiz3: "Carling Black Label", quiz4: "Champions League", solution: "Champions League"},
			{ quiz_imgurl: "Centrum_", answer_imgurl: "Centrum", quiz1: "Cadbury", quiz2: "Centrum", quiz3: "Citigroup", quiz4: "Capri Sun", solution: "Centrum"},
			{ quiz_imgurl: "Colgate_", answer_imgurl: "Colgate", quiz1: "Coleman", quiz2: "Comcast", quiz3: "Coors", quiz4: "Colgate", solution: "Colgate"},            
			{ quiz_imgurl: "Converse_", answer_imgurl: "Converse", quiz1: "Dove", quiz2: "Harvey's", quiz3: "Versace", quiz4: "Converse", solution: "Converse"},            
			{ quiz_imgurl: "Disney_", answer_imgurl: "Disney", quiz1: "DKNY", quiz2: "Disney", quiz3: "Discovery", quiz4: "Delsey", solution: "Disney"},            
			{ quiz_imgurl: "Dove_", answer_imgurl: "Dove", quiz1: "Dial", quiz2: "Dove", quiz3: "Downy", quiz4: "Dior", solution: "Dove"},
			{ quiz_imgurl: "DreamWorks_", answer_imgurl: "DreamWorks", quiz1: "DreamWorks", quiz2: "Dolby Laboratories", quiz3: "Disney", quiz4: "Downy", solution: "DreamWorks"},
			{ quiz_imgurl: "EY_", answer_imgurl: "EY", quiz1: "RBC", quiz2: "EY", quiz3: "NASA", quiz4: "OPP", solution: "EY"},
			{ quiz_imgurl: "Facebook_", answer_imgurl: "Facebook", quiz1: "FedEx", quiz2: "Fossil", quiz3: "Facebook", quiz4: "Fox", solution: "Facebook"},
			{ quiz_imgurl: "Fedex_", answer_imgurl: "Fedex", quiz1: "Fairtex", quiz2: "Folex", quiz3: "Fostex", quiz4: "FedEx", solution: "FedEx"},
			{ quiz_imgurl: "Google_", answer_imgurl: "Google", quiz1: "Google", quiz2: "Glade", quiz3: "George", quiz4: "Gedore", solution: "Google"},                       
			{ quiz_imgurl: "Harry Potter_", answer_imgurl: "Harry Potter", quiz1: "Hermes Paris", quiz2: "Hush Puppies", quiz3: "Hewlett-Packard", quiz4: "Harry Potter", solution: "Harry Potter"},
			{ quiz_imgurl: "HM_", answer_imgurl: "HM", quiz1: "M&M's", quiz2: "M&M Food Market", quiz3: "A & M Wood Specialty", quiz4: "H&M", solution: "H&M"},
			{ quiz_imgurl: "Hush Puppies_", answer_imgurl: "Hush Puppies", quiz1: "Harry Potter", quiz2: "Hush Puppies", quiz3: "HP", quiz4: "Hewlett-Packard", solution: "Hush Puppies"},
			{ quiz_imgurl: "IBM_", answer_imgurl: "IBM", quiz1: "3M", quiz2: "GM", quiz3: "IBM", quiz4: "H&M", solution: "IBM"},
			{ quiz_imgurl: "Intel_", answer_imgurl: "Intel", quiz1: "Intel", quiz2: "Ideal Industries", quiz3: "Imperial Oil", quiz4: "Indesit Co.", solution: "Intel"},
			{ quiz_imgurl: "James Bond_", answer_imgurl: "James Bond", quiz1: "Remington", quiz2: "Smith & Wessen", quiz3: "7UP", quiz4: "James Bond", solution: "James Bond"},
			{ quiz_imgurl: "Kellogs_", answer_imgurl: "Kellogs", quiz1: "Kelsey's", quiz2: "Kelkoo", quiz3: "Kellogg's", quiz4: "Keller Williams Realty", solution: "Kellogg's"},
			{ quiz_imgurl: "Kinder_", answer_imgurl: "Kinder", quiz1: "Kinder", quiz2: "Keebler", quiz3: "Kroger", quiz4: "Kohler", solution: "Kinder"},            
			{ quiz_imgurl: "Lavazza_", answer_imgurl: "Lavazza", quiz1: "Lavazza", quiz2: "L'Oreal", quiz3: "L.L. Bean", quiz4: "Lunchables", solution: "Lavazza"},			
			{ quiz_imgurl: "Levis_", answer_imgurl: "Levis", quiz1: "Levi's", quiz2: "Luvs", quiz3: "Levy's", quiz4: "Level", solution: "Levi's"},
			{ quiz_imgurl: "LG_", answer_imgurl: "LG", quiz1: "Lean Cuisine", quiz2: "LG", quiz3: "Lipton", quiz4: "La-Z-Boy", solution: "LG"},            
			{ quiz_imgurl: "Lindt_", answer_imgurl: "Lindt", quiz1: "Louis Vuitton", quiz2: "LaCoste", quiz3: "Louis Vuitton", quiz4: "Lindt", solution: "Lindt"},
			{ quiz_imgurl: "Lukoil_", answer_imgurl: "Lukoil", quiz1: "Lukoil", quiz2: "L'Oreal", quiz3: "Levi's", quiz4: "Lipton", solution: "Lukoil"},
			{ quiz_imgurl: "Marlboro_", answer_imgurl: "Marlboro", quiz1: "Caboodles", quiz2: "Billabong", quiz3: "Marlboro", quiz4: "Cinnabon", solution: "Marlboro"},
			{ quiz_imgurl: "McDonalds_", answer_imgurl: "McDonalds", quiz1: "McDonald's", quiz2: "Marshall", quiz3: "Muller", quiz4: "Macy's", solution: "McDonald's"},
			{ quiz_imgurl: "NETFLIX_", answer_imgurl: "NETFLIX", quiz1: "New York Fries", quiz2: "Nescafe", quiz3: "Netflix", quiz4: "Nathan's Famous", solution: "Netflix"},            
			{ quiz_imgurl: "Nickelodeon_", answer_imgurl: "Nickelodeon", quiz1: "Nicorette", quiz2: "Nickelodeon", quiz3: "Nine West", quiz4: "Nintendo", solution: "Nickelodeon"},            
			{ quiz_imgurl: "Nike_", answer_imgurl: "Nike", quiz1: "Reebok", quiz2: "Under Armour", quiz3: "Nike", quiz4: "Puma", solution: "Nike"},
			{ quiz_imgurl: "Nintendo_", answer_imgurl: "Nintendo", quiz1: "Nintendo", quiz2: "Speedo", quiz3: "Shiseido", quiz4: "Luxardo", solution: "Nintendo"},
			{ quiz_imgurl: "No Parking_", answer_imgurl: "No Parking", quiz1: "NO To Pest", quiz2: "Permit Only", quiz3: "No Doubt", quiz4: "No Parking", solution: "No Parking"},            
			{ quiz_imgurl: "NY Yankees_", answer_imgurl: "NY Yankees", quiz1: "New York Knicks", quiz2: "New York Rangers", quiz3: "NY Yankees", quiz4: "New York Islanders", solution: "NY Yankees"},
			{ quiz_imgurl: "Orbit_", answer_imgurl: "Orbit", quiz1: "Orbit", quiz2: "Oral-B", quiz3: "Obey", quiz4: "Obama", solution: "Orbit"},
			{ quiz_imgurl: "outback_", answer_imgurl: "outback", quiz1: "Outback", quiz2: "Olive Garden", quiz3: "Ocean Pacific", quiz4: "Onstar", solution: "Outback"},            
			{ quiz_imgurl: "Pantene_", answer_imgurl: "Pantene", quiz1: "Pledge", quiz2: "Pediasure", quiz3: "Pedigree", quiz4: "Pantene", solution: "Pantene"},
			{ quiz_imgurl: "Papermate_", answer_imgurl: "Papermate", quiz1: "Pac-Man", quiz2: "Papermate", quiz3: "Papa Murphy's", quiz4: "Paul Mitchell", solution: "Papermate"},            
			{ quiz_imgurl: "Paramount_", answer_imgurl: "Paramount", quiz1: "Evian", quiz2: "Mountain Dew", quiz3: "The North Face", quiz4: "Paramount", solution: "Paramount"},
			{ quiz_imgurl: "Pepsi_", answer_imgurl: "Pepsi", quiz1: "Pepsi", quiz2: "Brisk", quiz3: "Red Bull", quiz4: "Budweiser", solution: "Pepsi"},
			{ quiz_imgurl: "Pioneer_", answer_imgurl: "Pioneer", quiz1: "Pioneer", quiz2: "Pillsbury", quiz3: "Pizza Hut", quiz4: "Pixar", solution: "Pioneer"},
			{ quiz_imgurl: "PlayStation_", answer_imgurl: "PlayStation", quiz1: "Perrier", quiz2: "Post-it", quiz3: "Purina", quiz4: "PlayStation", solution: "PlayStation"},
			{ quiz_imgurl: "Poker Stars_", answer_imgurl: "Poker Stars", quiz1: "Polar Electro", quiz2: "Poker Stars", quiz3: "Porsche", quiz4: "Polaris", solution: "Poker Stars"},            
			/*{ quiz_imgurl: "Puma_", answer_imgurl: "Puma", quiz1: "Fila", quiz2: "Puma", quiz3: "Zara", quiz4: "Purina", solution: "Puma"},            
			{ quiz_imgurl: "Ray Ban_", answer_imgurl: "Ray Ban", quiz1: "Ray Ban", quiz2: "Rembrandt", quiz3: "Reebok", quiz4: "Renato Balestro", solution: "Ray Ban"},
			{ quiz_imgurl: "Samsung_", answer_imgurl: "Samsung", quiz1: "Selsun Blue", quiz2: "Speed Stick", quiz3: "Samsung", quiz4: "Samsonite", solution: "Samsung"},
			{ quiz_imgurl: "Schalke 04_", answer_imgurl: "Schalke 04", quiz1: "Sarotti", quiz2: "Schwarzkopf", quiz3: "Schalke 04", quiz4: "Sectra", solution: "Schalke 04"},            
			{ quiz_imgurl: "Shutterfly_", answer_imgurl: "Shutterfly", quiz1: "Butterball", quiz2: "Shutterfly", quiz3: "Twitter", quiz4: "Metters", solution: "Shutterfly"},
			{ quiz_imgurl: "SKF_", answer_imgurl: "SKF", quiz1: "Saab", quiz2: "SAP", quiz3: "SKF", quiz4: "SLK", solution: "SKF"},            
			{ quiz_imgurl: "Skype_", answer_imgurl: "Skype", quiz1: "PayPal", quiz2: "Egypt", quiz3: "Skype", quiz4: "Sky Bet", solution: "Skype"},
			{ quiz_imgurl: "Snapchat_", answer_imgurl: "Snapchat", quiz1: "Snapchat", quiz2: "Kik", quiz3: "Ghost Busters", quiz4: "Scream", solution: "Snapchat"},
			{ quiz_imgurl: "Sony_", answer_imgurl: "Sony", quiz1: "Sperry", quiz2: "Skyy", quiz3: "Sony", quiz4: "Skippy", solution: "Sony"},
			{ quiz_imgurl: "Sparco_", answer_imgurl: "Sparco", quiz1: "Spanx", quiz2: "Sparco", quiz3: "Spar Nord", quiz4: "SPAM", solution: "Sparco"},
			{ quiz_imgurl: "Star wars_", answer_imgurl: "Star wars", quiz1: "Dave & Busters", quiz2: "General Motors", quiz3: "Star Wars", quiz4: "Head & Shoulders", solution: "Star Wars"},
			{ quiz_imgurl: "Subway_", answer_imgurl: "Subway", quiz1: "Skullcandy", quiz2: "Sealy", quiz3: "Sprite", quiz4: "Subway", solution: "Subway"},
			{ quiz_imgurl: "SuperMan_", answer_imgurl: "SuperMan", quiz1: "Super Soaker", quiz2: "Super-Man", quiz3: "SuperSport", quiz4: "Supervalu", solution: "Super-Man"},
			{ quiz_imgurl: "suzuki_", answer_imgurl: "suzuki", quiz1: "Suzuki", quiz2: "Samsonite", quiz3: "Speedo", quiz4: "Scotch", solution: "Suzuki"},
			{ quiz_imgurl: "TED_", answer_imgurl: "TED", quiz1: "TBS", quiz2: "Teva", quiz3: "TiVo", quiz4: "TED", solution: "TED"},
			{ quiz_imgurl: "The Big Bang Theory_", answer_imgurl: "The Big Bang Theory", quiz1: "Big Rock Brewery", quiz2: "The Big Bang Theory", quiz3: "Big Boy", quiz4: "Big Brothers Big Sisters", solution: "The Big Bang Theory"},
			{ quiz_imgurl: "The New York Times_", answer_imgurl: "The New York Times", quiz1: "New York Times", quiz2: "New York Fries", quiz3: "New York Yankees", quiz4: "Jones New York", solution: "New York Times"},
			{ quiz_imgurl: "Tiffanys_", answer_imgurl: "Tiffanys", quiz1: "Tanqueray", quiz2: "Tiffany's", quiz3: "T.G.I. Friday's", quiz4: "Travelocity", solution: "Tiffany's"},
			{ quiz_imgurl: "Tumblr_", answer_imgurl: "Tumblr", quiz1: "Tumblr", quiz2: "Tom Tom", quiz3: "Timex", quiz4: "Thomson", solution: "Tumblr"},
			{ quiz_imgurl: "Tupperware_", answer_imgurl: "Tupperware", quiz1: "Time Warner", quiz2: "Tupperware", quiz3: "Turtle Wax", quiz4: "TWA", solution: "Tupperware"},            
			{ quiz_imgurl: "Twitter_", answer_imgurl: "Twitter", quiz1: "Flickr", quiz2: "Twitter", quiz3: "Instagram", quiz4: "Tumblr", solution: "Twitter"},
			{ quiz_imgurl: "Umbro_", answer_imgurl: "Umbro", quiz1: "Umbro", quiz2: "Pep Boys", quiz3: "Maybelline", quiz4: "CBC", solution: "Umbro"},
			{ quiz_imgurl: "WALL-E_", answer_imgurl: "WALL-E", quiz1: "Adobe", quiz2: "WALL-E", quiz3: "Carefree", quiz4: "AAdvantage", solution: "WALL-E"},
			{ quiz_imgurl: "Wella_", answer_imgurl: "Wella", quiz1: "Welch's", quiz2: "Walgreens", quiz3: "Wuliangye", quiz4: "Wella", solution: "Wella"},
			{ quiz_imgurl: "WiFi_", answer_imgurl: "WiFi", quiz1: "Clif Bar", quiz2: "Jiffy", quiz3: "Wi-Fi", quiz4: "CIF", solution: "Wi-Fi"},
			{ quiz_imgurl: "Yin-Yang_", answer_imgurl: "Yin-Yang", quiz1: "Peace Corps", quiz2: "Greenpeace", quiz3: "Yin-Yang", quiz4: "New Balance", solution: "Yin-Yang"},            
			{ quiz_imgurl: "YouTube_", answer_imgurl: "YouTube", quiz1: "Yahoo!", quiz2: "Yamaha", quiz3: "YouTube", quiz4: "Yoplait", solution: "YouTube"},
*/


        ];

        this.problems.sort(function(a, b){return 0.5 - Math.random()});
        
        this.quizLimit = this.problems.length;

    },

});




var Problem = cc.Class({
    name: 'Problem',
    properties: {
        quiz_imgurl: "",
        answer_imgurl: "",
        quiz1: "",
        quiz2: "",
        quiz3: "",
        quiz4: "",
        solution: "",
        score : 0
    }
})