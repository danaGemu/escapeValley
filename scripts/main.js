// GAME RESOURCES

var g_resources = [
    // LEVEL TILESETS
    { name: "tile_ground", type: "image", src: "data/tiles/tile_ground.png" },
    { name: "tile_spikes", type: "image", src: "data/tiles/tile_spikes.png"},
    { name: "tile_surface", type: "image", src: "data/tiles/tile_surface.png" },
    { name: "moving1", type: "image", src: "data/chara/moving1.png"},
    { name: "moving2", type: "image", src: "data/chara/moving2.png"},

    { name: "level01", type: "tmx", src: "data/tiles/level01.tmx" },
    { name: "level02", type: "tmx", src: "data/tiles/level02.tmx" },
    { name: "level03", type: "tmx", src: "data/tiles/level03.tmx" },

    // CHARA SPRITESHEET
    { name: "player", type: "image", src: "data/chara/player.png" },
    { name: "goblin", type: "image", src: "data/chara/goblin.png" },
    { name: "grue", type: "image", src: "data/chara/grue.png" },
    { name: "spike", type: "image", src: "data/chara/spike.png" },
    { name: "end_door", type: "image", src: "data/chara/end_door.png"},

    // HUD sprites
    { name: "coin", type: "image", src: "data/chara/coin.png" },
    { name: "heart_big", type: "image", src: "data/chara/heart_big.png" },
    { name: "heart_small", type: "image", src: "data/chara/heart_small.png" },
    { name: "chest", type: "image", src: "data/chara/chest.png"},

    // SCREENS
    { name: "gameTitleScreen", type: "image", src: "data/screens/gameTitleScreen.png"},
    { name: "gameOverScreen", type: "image", src: "data/screens/gameOverScreen.png" },
    { name: "gameEndScreen", type: "image", src: "data/screens/gameEndScreen.png" }

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
            TAMBAHIN SOUND
        */

        me.state.set(me.state.MENU, new TitleScreen());
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.GAMEOVER, new GameOverScreen());
        me.state.set(me.state.GAME_END, new GameEndScreen());

        me.entityPool.add("startPlayer", PlayerEntity);
        me.entityPool.add("Coin", CoinEntity);
        me.entityPool.add("Chest", ChestEntity);
        me.entityPool.add("Spike", SpikeEntity);
        me.entityPool.add("Nyawaa", NyawaEntity);
        me.entityPool.add("Musuh", EnemyEntity);
        me.entityPool.add("Musuh2", EnemyEntity2);
        me.entityPool.add("endObj", GameEndObj);
        me.entityPool.add("HoriPlat", MovingPlatform1);
        me.entityPool.add("VertiPlat", MovingPlatform2);

        me.gamestat.add("totalSkor", 0);

        me.state.change(me.state.MENU);
    }
};

var PlayScreen = me.ScreenObject.extend(
{
    onResetEvent: function () {
        me.levelDirector.loadLevel("level01");
        //game.levelid = levelId ? me.game.currentLevel.levelid : 0;

        //if (!levelId) {}

        me.game.addHUD(0, 0, 480, 480);

        me.game.HUD.addItem("skor", new ScoreObj(410, 25));
        me.game.HUD.addItem("nyawa", new NyawaObj(12, 10));

        me.input.bindKey(me.input.KEY.LEFT, "kiri");
        me.input.bindKey(me.input.KEY.RIGHT, "kanan");
        me.input.bindKey(me.input.KEY.X, "lompat", true);
        me.input.bindKey(me.input.KEY.UP, "lompat2", true);

        me.gamestat.reset();

        //me.debug.renderHitBox = true;
    },

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.X);
        me.input.unbindKey(me.input.KEY.UP);

        me.game.disableHUD();
    }
});


window.onReady(function () {
    game.onload();
});