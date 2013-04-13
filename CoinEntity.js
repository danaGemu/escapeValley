﻿var CoinEntity = me.CollectableEntity.extend(
    {
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },

        onCollision: function () {

            me.game.HUD.updateItemValue("skor", 10);
            me.gamestat.updateValue("totalSkor", 10);

            this.collidable = false;
            me.game.remove(this);
        }
    });