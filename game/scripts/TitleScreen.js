var TitleScreen = me.ScreenObject.extend(
    {
        init: function () {
            this.parent(true);
            this.title = null;
            this.font = null;
        },

        onResetEvent: function () {
            if (this.title == null) {
                this.title = me.loader.getImage("gameTitleScreen");
                this.font = new me.Font('Georgia', 24, 'yellow', 'left');
            }

            me.input.bindKey(me.input.KEY.ENTER, "enter", true);
            //me.audio.play("");

        },

        update: function () {
            if (me.input.isKeyPressed("enter")) {
                me.state.change(me.state.PLAY);
            }

            return true;
        },

        draw: function (context) {
            context.drawImage(this.title, 0, 0);

            this.font.draw(context, "PRESS ENTER TO PLAY", 105, 420);
        },

        onDestroyEvent: function () {
            me.input.unbindKey(me.input.KEY.ENTER);
        }

    });