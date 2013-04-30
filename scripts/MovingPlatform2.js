var MovingPlatform2 = me.ObjectEntity.extend(
    {
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.startY = y;
            this.endY = y + settings.height;
            this.pos.y = y;
            this.upp = false;
            this.setVelocity(0, 1);
            this.gravity = 0;
            this.collidable = true;
            this.type = me.game.ACTION_OBJECT;
            this.addAnimation("move", [0, 0]);
            this.setCurrentAnimation("move");
        },

        onCollision: function (res, obj) {
            if (obj.alive) {
                if (obj.jumping && res.y < 0) {
                    obj.forceJump();
                    obj.jumping = false;
                    obj.falling = true;
                }

                if (obj.falling) {
                    obj.pos.y = this.pos.y - 31;
                    obj.vel.y = 0;
                    obj.falling = false;
                }
                else {
                    obj.vel.y = obj.initialYVel;
                }

            }
        },

        update: function () {
            if (this.upp) {
                this.vel.y = -1;
            }

            if (!this.upp) {
                this.vel.y = 1;
            }

            if (this.pos.y >= this.endY) {
                this.upp = true;
            }

            if (this.pos.y <= this.startY) {
                this.upp = false;
            }

            this.updateMovement();

            if (this.vel.y != 0) {
                this.parent(this);
                return true;
            }

            return false;
        }

    });
