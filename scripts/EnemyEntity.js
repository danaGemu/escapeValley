var EnemyEntity = me.ObjectEntity.extend(
{
    init: function (x, y, settings) {

        settings.image = "goblin";
        settings.spritewidth = 32;
        this.parent(x, y, settings);
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;

        this.pos.x = x + settings.width - settings.spritewidth;
        this.walkLeft = true;

        this.setVelocity(2, 6);

        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
        this.tipeMusuh = "musuh1";
    },

    onCollision: function (res, obj) {
        if (this.alive && (res.y > 0) && obj.falling) {
            
            //me.audio.play("stomp");
            me.game.remove(this);
            // TODO : Tambahin Skor
            me.game.HUD.updateItemValue("skor", 30);
            me.gamestat.updateValue("totalSkor", 30);
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