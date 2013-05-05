var GameEndObj = me.ObjectEntity.extend(
    {
        init: function (x, y, settings) {
            settings.image = "end_door";
            settings.spritewidth = 32;
            this.parent(x, y, settings);
            this.collidable = true;
        },

        onCollision: function (res, obj) {
            
            
            me.state.change(me.state.GAME_END);
            
            game.persistent.player.level = "level01";
            
        }
    });