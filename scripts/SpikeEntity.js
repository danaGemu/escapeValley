var SpikeEntity = me.ObjectEntity.extend(
{
    init: function (x, y, settings) {

        settings.image = "spike";
        settings.spritewidth = 32;
        this.parent(x, y, settings);
  

        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
        this.tipeMusuh = "spikee";
    },

    onCollision: function (res, obj) {

            obj.vel.y = -obj.maxVel.y * me.timer.tick;
            if (!obj.flickering) {
                obj.kena(1);
                
            }
            //me.audio.play("stomp");
            
            
        
    },

    
});