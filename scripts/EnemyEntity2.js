var EnemyEntity2 = me.ObjectEntity.extend(
{
    init: function (x, y, settings) {

        settings.image = "grue";
        settings.spritewidth = 56;
        this.parent(x, y, settings);
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;

        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        this.setVelocity(2, 6);

        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
        this.tipeMusuh = "musuh2";
    },

    onCollision: function (res, obj) {
        if (this.alive && (res.y > 0) && obj.falling) {
            
            //me.audio.play("stomp");
            me.game.HUD.updateItemValue("skor", 50);
            me.gamestat.updateValue("totalSkor", 50);
            me.game.remove(this);
            // TODO : Tambahin Skor
            // BIKIN KURANGIN NYAWA 2 POIN
        }
    },

    update: function () {
        if (!this.visible)
            return false;

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            }
            else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }

            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        }
        else {
            this.vel.x = 0;
        }

        this.updateMovement();

        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent();
            return true;
        }

        return false;
    }
});