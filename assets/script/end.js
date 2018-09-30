
cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel : {
            default : null,
            type : cc.Label
        },

        sndSceneNav : {
            default : null,
            type : cc.AudioClip
        },

        scoreLength : 0,
              
    },
  
    start () {
       
        var ls = cc.sys.localStorage;
        var score = ls.getItem("key");
        
        this.scoreLabel.getComponent(cc.Label).string = score;

        
        if(score > 9)
            this.scoreLength = 2;
        if(score > 99)
            this.scoreLength = 3;
        if(score > 999)
            this.scoreLength = 4;
                
        this.scoreLabel.node.x = this.scoreLabel.node.x - this.scoreLength * 10; 
        
        ls.removeItem("key");
        ls.clear();

        this._messageSharecanvas('updateMaxScore', '' + score);

    },

    goHome(){
        var self = this;
        cc.audioEngine.play(self.sndSceneNav, false, 1);
        
        //label position recover
        this.scoreLabel.node.x = this.scoreLabel.node.x + this.scoreLength * 10;
        this.scoreLength = 0;
    
        cc.director.loadScene("main");
    },

    share(){
        var self = this; 
        cc.audioEngine.play(self.sndSceneNav, false, 1);
        
        // cc.loader.loadRes("texture/share",function(err,data){
        //     wx.shareAppMessage({
        //         title: "Guess the Logo",
        //         imageUrl: data.url,
        //         success(res){
        //             console.log(res)
        //         },
        //         fail(res){
        //             console.log(res)
        //         }
        //     })
        // });

        cc.loader.loadRes("textures/icon",function(err,data){
            wx.shareAppMessage({
                title: "Guess the Log",
                imageUrl: cc.loader.md5Pipe.transformURL(data.url),
                success(res){
                    console.log(res)
                },
                fail(res){
                    console.log(res)
                }
            })
        });
            
    },


    _messageSharecanvas (type, text) {
        // 排行榜也应该是实时的，所以需要sharedCanvas 绘制新的排行榜
        let openDataContext = wx.getOpenDataContext();
        console.log('type = ' + type);
        console.log('text = ' + text);
        openDataContext.postMessage({
            type: type || 'friends',
            text: text,
        });
    },

    update (dt) {

    }

    
});
