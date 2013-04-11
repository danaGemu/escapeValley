﻿var EnemyEntity2 = me.ObjectEntity.extend(
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
    },

    onCollision: function (res, obj) {
        if (this.alive && (res.y > 0) && obj.falling) {
            this.flicker(45);
            //me.audio.play("stomp");
            //me.game.remove(this);
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