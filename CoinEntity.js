var CoinEntity = me.CollectableEntity.extend(
    {
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },

        onCollision: function () {
            this.collidable = false;
            me.game.remove(this);
        }
    });