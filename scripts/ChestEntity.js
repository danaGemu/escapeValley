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
            
            this.money = Math.floor(Math.random() * 100 + 50);
        },

        onCollision: function () {

            me.game.HUD.updateItemValue("skor", this.money);
            me.gamestat.updateValue("totalSkor", this.money);
            this.setCurrentAnimation("kebuka");

            this.collidable = false;
            //me.game.remove(this);
        }
    });