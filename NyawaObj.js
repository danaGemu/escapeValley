var NyawaObj = me.HUD_Item.extend (
    {
        init: function (x,y)
        {
            this.parent(x, y, 3);
            this.icon = me.loader.getImage("heart_big");
        },

        update : function(val)
        {
            if (this.value + val < 0)
            {
                return false;
            }

            if (this.value + val <= 3)
            {
                return this.parent(val);
            }
            else
            {
                me.game.HUD.updateItemValue("skor", 150);
            }

            return false;

        },

        draw: function (context,x,y)
        {
            for (var i = 0;i < this.value; i++)
            {
                context.drawImage(this.icon, this.pos.x + (i * 40), this.pos.y);
            }
        }
    });