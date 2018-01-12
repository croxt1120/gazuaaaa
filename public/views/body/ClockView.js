define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'text!views/body/clock.html'
], function(
    $,
    _,
    Backbone,
    moment,
    ClockHTML
){
    var hidden; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      hidden = "hidden";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
    }
     
    var ClockView = Backbone.View.extend({
        tagName : "div",
        className : "container",
        template : _.template(ClockHTML),
        initialize : function(){
            this.render();      
            this.interval = setInterval(this.setClock.bind(this), 1000);
        },
        render : function(){
            this.$el.append(this.template());
            this.$el.attr("id", "clock");
        },
        setClock : function(){
            this.getDate(moment());
        },
        getDate : function(now){
            var to = moment([2019,0,1]);
            
            var days = '000' + (to.diff(now, 'days'));
            var hours = '00' + (to.diff(now, 'hours') % 24);
            var minutes = '00' + (to.diff(now, 'minutes') % 60);
            var seconds = '00' + (to.diff(now, 'seconds') % 60);
            
            var before = $.extend(true, {}, this.time);
            
            this.time = {
                days : days.slice(-3),
                hours :hours.slice(-2),
                minutes :minutes.slice(-2),
                seconds :seconds.slice(-2)
            };
            
            var beforeStr = before.days+before.hours+before.minutes+before.seconds;
            var nowStr = this.time.days+this.time.hours+this.time.minutes+this.time.seconds;
            this.setClockDisplay(beforeStr, nowStr);
        },
        setClockDisplay : function(before, now){
            if(document[hidden] == true){
                return;
            }
            $("body").removeClass("play");
            
            var uls = $("ul.secondPlay");
            for(var i=0;i<now.length;i++){
                var prev = before[i];
                var current = now[i];
                if(prev == current){
                    continue;
                }
                var ul = uls.eq(i);
                
                var aa = ul.find("li.active");
                if (aa.is(":last-child")) {
                    ul.find("li").removeClass("before");
                    aa.addClass("before").removeClass("active");
                    aa = ul.find("li").eq(0);
                    aa.find(".inn").text(current);
                    aa.addClass("active");
                }
                else {
                    ul.find("li").removeClass("before");
                    aa.next("li").find(".inn").text(current);
                    aa.addClass("before")
                        .removeClass("active")
                        .next("li")
                        .addClass("active");
                }
            }
            
            $("body").addClass("play");
        }
    });
    
    return ClockView;
});
