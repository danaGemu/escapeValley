﻿var GameEndScreen = me.ScreenObject.extend(
    {
        init: function () {
            this.parent(true);
            this.over = null;
            this.font = null;
            this.total = 0;
        },

        onResetEvent: function () {
            if (this.over == null) {
                this.over = me.loader.getImage("gameEndScreen");
                this.font = new me.Font('Georgia', 24, 'black', 'left');
            }

            me.input.bindKey(me.input.KEY.ENTER, "enter", true);
            //me.audio.play("");
            //me.game.HUD.removeItem("skor");
            this.total = me.gamestat.getItemValue("totalSkor");

        },

        update: function () {
            if (me.input.isKeyPressed("enter")) {
                me.state.change(me.state.MENU);
            }

            return true;
        },

        draw: function (context) {
            context.drawImage(this.over, 0, 0);

            this.font.draw(context, "PRESS ENTER TO PLAY AGAIN", 65, 170);
            this.font.draw(context, "FINAL SCORE", 160, 240);
            this.font.draw(context, this.total, 220, 280);
        },

        onDestroyEvent: function () {
            me.input.unbindKey(me.input.KEY.ENTER);
        }

    });