
cc.Class({
    extends: cc.Component,

    properties: {

    },

    start () {
        
        var self = this;

        this.node.on("touchend", function(){     
            if(self.node.parent.parent.getComponent(cc.Canvas).getComponent("game").isGameOver === true)  
            return;
            
            self.node.parent.parent.getComponent(cc.Canvas).getComponent("game").scene_answer =              
                self.node.getChildByName("Label").getComponent(cc.Label).string;
            
            self.node.dispatchEvent(new cc.Event.EventCustom("answer", true));    
            
            
            if(self.node.parent.parent.getComponent(cc.Canvas).getComponent("game").problems[self.node.parent.parent.getComponent(cc.Canvas).getComponent("game").testSceneNum - 1/*quizNum*/].solution === 
                self.node.getChildByName("Label").getComponent(cc.Label).string){
                    var color = new cc.Color(0, 228, 91);
                    self.node.color = color;
                }else{
                    var color = new cc.Color(243, 71, 69);
                    self.node.color = color;
                }
                
            
            
		}, this);
    },

    // update (dt) {},
});
