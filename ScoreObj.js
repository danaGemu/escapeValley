var ScoreObj = me.HUD_Item.extend(
    {
        init: function (x, y) {
            this.parent(x, y);
            this.font = new me.Font('Georgia', 24, 'yellow');
        },

        draw: function (context, x, y) {
            this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
        },
    });
    