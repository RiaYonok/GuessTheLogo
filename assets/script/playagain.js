
cc.Class({
    extends: cc.Component,

    properties: {
        sndSceneNav : {
            default : null,
            type : cc.AudioClip
        }
    },
    
    start () {
        var self = this;
        this.node.on("touchend", function(){     
            cc.audioEngine.play(self.sndSceneNav, false, 1);
            cc.director.loadScene("game");
		});
    },

    // update (dt) {},
});
