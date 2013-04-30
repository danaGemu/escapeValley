var MovingPlatform1 = me.ObjectEntity.extend(
    {
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.startX = x;
            this.endX = x + settings.width - settings.spritewidth;
            this.pos.x = x;
            this.walkLeft = true;
            this.setVelocity(1, 0);
            this.gravity = 0;
            this.collidable = true;
            this.type = me.game.ACTION_OBJECT;
            this.addAnimation("move", [0, 0]);
            this.setCurrentAnimation("move");
        },

        onCollision: function (res, obj) {

            if (obj.alive)
            {
                if (obj.jumping && res.y < 0) 
                {
                    obj.forceJump();
                    obj.jumping = false;
                    obj.falling = true;
                }

                if (obj.falling) {
                    obj.pos.y = this.pos.y - 31;
                    obj.vel.y = 0;
                    obj.falling = false;

                    if (res.y > 0) {
                        switch (this.walkLeft) {
                            case true:
                                obj.pos.x = obj.pos.x - 1;
                                break;
                            case false:
                                obj.pos.x = obj.pos.x + 1;
                                break;
                            default: break;
                        }
                    }
                }

                else {
                    obj.vel.y = obj.initialYVel;
                }
            }
        },

        update: function () {

            if (!this.visible) return false;
            if (this.alive) {

                if (this.walkLeft && this.pos.x <= this.startX) {

                    this.walkLeft = false;
                }
                else if (!this.walkLeft && this.pos.x >= this.endX) {

                    this.walkLeft = true;
                }
                this.doWalk(this.walkLeft);
            }
            else {
                this.vel.x = 0;
            }

            this.updateMovement();

            if (this.vel.x != 0)
            {
                this.parent(this);
                return true;
            }

            return false;
        }
    });