var NyawaEntity = me.CollectableEntity.extend(
    {
        init: function (x, y, settings) {
            settings.image = "heart_small";
            settings.spritewidth = 32;
            this.parent(x, y, settings);
        },

        onCollision: function () {
            me.game.HUD.updateItemValue("nyawa", 1);
            me.audio.play("Nyawa");
            this.collidable = false;
            me.game.remove(this);
        }
    });