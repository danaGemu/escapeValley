var PlayerEntity = me.ObjectEntity.extend(
    {
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.setVelocity(3, 15);
            this.updateColRect(5, 28, -1, 0);

            this.animated = false;
            this.berdiri = true;

            this.addAnimation("diam", [0]);
            this.addAnimation("jalan", [0, 1, 2, 3]);
            this.addAnimation("lompat", [0, 3]);
            this.setCurrentAnimation("diam");
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        },

        update: function () {
            if (me.input.isKeyPressed("kiri")) {
                this.flipX(true);
                this.vel.x -= this.accel.x * me.timer.tick;
                this.cekAnimasi(true);
            }
            else if (me.input.isKeyPressed("kanan")) {
                this.flipX(false);
                this.vel.x += this.accel.x * me.timer.tick;
                this.cekAnimasi(true);
            }
            else {
                this.vel.x = 0;
                this.cekAnimasi(false);
            }
            if (me.input.isKeyPressed("lompat")) {
                if (!this.jumping && !this.falling) {
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    this.jumping = true;
                    this.setCurrentAnimation("lompat");
                }
            }

            this.updateMovement();

            var res = me.game.collide(this);

            if (res) {
                if (res.obj.type == me.game.ENEMY_OBJECT) {
                    if ((res.y > 0) && !this.jumping) {
                        this.falling = false;
                        this.vel.y = -10 * me.timer.tick;
                        this.jumping = true;
                    }
                    else {
                        this.flicker(45);
                    }
                }
            }

            if (this.vel.x != 0 || this.vel.y != 0) {
                this.parent();
                return true;
            }

            return false;
        },

        cekAnimasi: function (bergerak) {
            if (bergerak) {
                this.animated = true;
                this.berdiri = false;
                this.setCurrentAnimation("jalan");
            }
            else {
                if (this.berdiri) {
                    return;
                }
                else {
                    this.berdiri = true;
                    this.animated = false;
                    this.setCurrentAnimation("diam");
                }
            }
        }
    });
