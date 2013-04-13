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
                me.state.change(me.state.GAMEOVER);
            }

            if (this.value + val <= 5)
            {
                return this.parent(val);
            }
            else
            {
                me.game.HUD.updateItemValue("skor", 50);
                me.gamestat.updateValue("totalSkor", 50);
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