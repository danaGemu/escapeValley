var ChestEntity = me.CollectableEntity.extend(
    {
        init: function (x, y, settings) {

            settings.image = "chest";
            settings.spritewidth = 32;
            this.parent(x, y, settings);
            this.addAnimation("diam", [0]);
            this.addAnimation("kebuka", [1]);

            this.setCurrentAnimation("diam");

            this.updateColRect(10, 16, 16, 16);
        },

        onCollision: function () {

            me.game.HUD.updateItemValue("skor", 100);
            me.gamestat.updateValue("totalSkor", 100);
            this.setCurrentAnimation("kebuka");

            this.collidable = false;
            //me.game.remove(this);
        }
    });