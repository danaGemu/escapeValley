// GAME RESOURCES

var g_resources = [
    // LEVEL TILESETS
    { name: "tile_ground", type: "image", src: "data/tiles/tile_ground.png" },
    { name: "tile_spikes", type: "image", src: "data/tiles/tile_spikes.png" },
    { name: "tile_surface", type: "image", src: "data/tiles/tile_surface.png" },

    { name: "level01", type: "tmx", src: "data/tiles/level01.tmx"},

    // CHARA SPRITESHEET
    { name: "player", type: "image", src: "data/chara/player.png" },
    { name: "goblin", type: "image", src: "data/chara/goblin.png" },

    // HUD sprites
    { name: "coin", type: "image", src: "data/chara/coin.png" },
    { name: "heart_big", type: "image", src: "data/chara/heart_big.png" },
    { name: "heart_small", type: "image", src: "data/chara/heart_small.png" }
];

var game = {

    levelid : 0,

    onload: function () {
        if (!me.video.init('gamescreen', 480, 480, false, 1.0)) {
            alert("Sorry your browser does not support HTML5 canvas.");
            return;
        }

        me.audio.init("mp3, ogg");
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(g_resources);
        me.state.change(me.state.LOADING);
    },

    loaded: function () {

        /* 
            TODO:
            BIKIN PLAYSCREEN DAN CLASSNYA
            BIKIN TITLESCREEN DAN CLASSNYA
            BIKIN CREDITSCREEN DAN CLASSNYA
            BIKIN LEVEL COMPLETE SCREEN DAN CLASSNYA
            BIKIN MAP BUAT PLAYSCREEN AWAL
        */

        me.state.set(me.state.PLAY, new PlayScreen());

        me.entityPool.add("startPlayer", PlayerEntity);
        me.entityPool.add("Coin", CoinEntity);
        me.entityPool.add("Musuh", EnemyEntity);

        

        me.state.change(me.state.PLAY);
    }
};

var PlayScreen = me.ScreenObject.extend(
{
    onResetEvent: function (levelId) {
        me.levelDirector.loadLevel(levelId || "level01");
        game.levelid = levelId ? me.game.currentLevel.levelid : 0;

        if (!levelId) {
        }

        me.input.bindKey(me.input.KEY.LEFT, "kiri");
        me.input.bindKey(me.input.KEY.RIGHT, "kanan");
        me.input.bindKey(me.input.KEY.X, "lompat", true);

        //me.debug.renderHitBox = true;
    },

    onDestroyEvent: function () {
    }
});


window.onReady(function () {
    game.onload();
});