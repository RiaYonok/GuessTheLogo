
cc.Class({
    extends: cc.Component,

    properties: {
        sndSceneNav : {
            default : null,
            type : cc.AudioClip
        },

        RankingView : cc.Sprite,

        btnPlay : cc.Button,

        btnFriend : cc.Button,

        title : cc.Node,

        btnPanel : cc.Sprite,

        btnBack : cc.Button,

        background : cc.Node,
    },
    
    start () {
        this._isShow = false;
        this.RankingView.node.active = this._isShow;
        this.tex = new cc.Texture2D();

       this.changeControl();
    },

    changeControl(){
        var winWidth = cc.winSize.width;
        var winHeight = cc.winSize.height;
        //background
        this.background.width = winWidth;
        this.background.height = winHeight;

        //btns
        //var btnPlay_ratio = this.btnPlay.node.height / this.btnPlay.node.width;
        this.btnPlay.node.width = winWidth * (601 / 750);        
        this.btnPlay.node.x = this.btnPlay.node.x * (winWidth / 750);
        this.btnPlay.node.y = -1 * winHeight / 2 + this.btnPlay.node.height / 2;

        this.btnFriend.node.width = winWidth * (149 / 750);        
        this.btnFriend.node.x = this.btnFriend.node.x * (winWidth / 750);
        this.btnFriend.node.y = -1 * winHeight / 2 + this.btnFriend.node.height / 2;

        //title
        var title_ratio = this.title.height / this.title.width;
        this.title.width = winWidth * 0.9;
        this.title.height = this.title.width * title_ratio;
        
        //ranking view
        var w_h_ratio = this.RankingView.node.width / this.RankingView.node.height;
        this.RankingView.node.width = winWidth;
        this.RankingView.node.height = winWidth / w_h_ratio;

        //ranking btn
        this.btnBack.node.x = this.btnBack.node.x * (winWidth / 750);
        this.btnBack.node.y = this.btnBack.node.y * (winHeight / 1334);


    },

    onClickPlayNow(){
        var self = this;   
       
        cc.audioEngine.play(self.sndSceneNav, false, 1);
        cc.director.loadScene("game");
    
    },

    onClickShareBtn () {   
        var self = this; 
        cc.audioEngine.play(self.sndSceneNav, false, 1);
        
        this._isShow = !this._isShow;
        this._messageSharecanvas();
        this.RankingView.node.active = this._isShow;

        this.btnPanel.node.active = false;
    },

    onClickBackBtn() {
        cc.audioEngine.play(this.sndSceneNav, false, 1);

        this._isShow = false;
        this.RankingView.node.active = this._isShow;

        this.btnPanel.node.active = true;
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

    _updaetSubDomainCanvas () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.RankingView.spriteFrame = new cc.SpriteFrame(this.tex);
       
    },

    update () {
       this._updaetSubDomainCanvas();
    }
});
