/**
 * Created by jacobbogers on 5/18/16.
 */

var _polmodoro;

_polmodoro = (function () {

    var _opt = {
        state: 0, /* -1 = boot, 0= initialize anim , 1= user mode , 2= running, 3= ended/cancelled.*/
        start_time: null, /* this is a moment object */
        time_work: 25, //default is 25 min expressed as milliseconds
        time_break: 5,  // default is 5 min expressed as milliseconds
        time_bin: 5, //display 15 sec as 1 block in the svg progress
        interval_id: null,
        // functions
        total_time_in_millis: function () {
            return (this.time_work + this.time_break) * 60 * 1000;
        },
        time_work_in_millis: function () {
            return this.time_work * 60 * 1000;
        },
        time_break_in_millis: function () {
            return this.time_break * 60 * 1000;
        },
        time_bin_in_millis: function () {
            return this.time_bin * 1000;
        }
    };

    var paths = {
        s: _opt,
        _prefix: "__l",
        canvas_size: 320, // 320x320 box we use svg viewBox so this doesn't have to change
        stroke_width: 16,
        cursor: null,
        arcs: [], //pre-calculated gradient info
        /* helper functions to create snippets */
        prefix: function (i) {
            return this._prefix + (i < 100 ? ((i < 10) ? '00' : '0') : '') + i;

        },
        bin_size: function () {
            return Math.PI * 2 / this.s.total_time_in_millis() * (this.s.time_bin_in_millis());  //radians per [15] seconds
        },
        bin_count: function () {
            return Math.round(this.s.total_time_in_millis() / this.s.time_bin_in_millis());
        },
        color: function (i) {

            var lambda = Math.round((1 - i / this.arcs.length) * 255);

            return 'hsl(' + lambda + ',85%, 51%)';

            /*           var $ = {
             r: (this.color_end.r - this.color_start.r) * lambda + this.color_start.r,
             g: (this.color_end.g - this.color_start.g) * lambda + this.color_start.g,
             b: (this.color_end.b - this.color_start.b) * lambda + this.color_start.b
             };
             $.r = Math.round($.r);
             $.g = Math.round($.g);
             $.b = Math.round($.b);
             return ' rgb(' + $.r + ',' + $.g + ',' + $.b + ')';*/
        },
        path_segment: function (i) {
            /** <path
             * d="M160 8 A 152 152 0 0 1  267.4802  52.51977"
             * fill="transparent"
             * stroke="rgb(255,128,64)"
             * stroke-width="16"/>
             *
             */
            if (i < 1) {
                return '';
            }

            var delta_rad = this.bin_size(),
                r = (this.canvas_size - this.stroke_width) / 2,
                o1 = this.canvas_size / 2,
                o2 = o1;

            var y1 = o2 - r * Math.cos(delta_rad * (i - 1) - delta_rad * 0.2);
            var x1 = o1 + r * Math.sin(delta_rad * (i - 1) - delta_rad * 0.2);
            var y2 = o2 - r * Math.cos(delta_rad * i);
            var x2 = o1 + r * Math.sin(delta_rad * i);

            var template = "<path id=\"{prefix}\" class=\"piece\" d=\"M{x1} {y1} A {r} {r} 0 0 1 {x2} {y2}\" " +
                "fill=\"transparent\" stroke =\"{color}\" stroke-width=\"{stroke-width}\" />";
            template = template.replace("{prefix}", this.prefix(i));
            template = template.replace("{x1}", x1);
            template = template.replace("{y1}", y1);
            template = template.replace("{x2}", x2);
            template = template.replace("{y2}", y2);
            template = template.replace(/\{r\}/g, r);
            template = template.replace("{color}", this.color(i));
            template = template.replace("{stroke-width}", this.stroke_width);
            return template;

        },
        init: function () {
            this.arcs = new Array(this.bin_count());
            this.cursor = 0;
            for (var i = 0; i < this.arcs.length; i++) {
                this.arcs[i] = this.path_segment(i + 1);
            }
            //console.log(this.arcs.join('\n'));
        }
    };

    var ctrl = {
        state: 0 /* 0=configurable, 1=buttons disabled and start animation , 2=start-clock, buttons disabled */
    };

    var svg;

    /* break */
    var break_up;
    var break_down;
    var break_minutes;

    /*work*/
    var work_up;
    var work_down;
    var work_minutes;

    var svg_text;


    /* utilities */
    /* utilities */
    /* utilities */

    function max(a, b) {
        return (a > b ? a : b);
    }

    function min(a, b) {
        return (a < b ? a : b);
    }

    /* timer */
    /* timer */
    /* timer */

    function start_clock() {
        paths.cursor = 0;
        var dt = 250; //0.25 seconds
        _opt.start_time = moment();
        var func = call_back.bind(this);
        _opt.interval_id = window.setInterval(func, dt);
    }

    function cancel_clock() {
        if (_opt.interval_id) {
            window.clearInterval(_opt.interval_id);
            _opt.interval_id = null;
        }
        ctrl.state = 0;
    }

    function call_back() {
        var progress = generate_paths();
        console.log(progress);
        if (progress.work_done && progress.break_done) {
            cancel_clock();
            //TODO make sound
        }
    }

    function collect_min_sec(millis, rc) {
        rc.min = Math.trunc(millis / 1000 / 60);
        rc.sec = Math.round(millis / 1000 - rc.min * 60);
        //console.log(millis);
    }


    function get_total_percentages() {
        var w = 0, p = 0;

        var work = {};

        var duration = (moment() - _opt.start_time);

        /* work */
        var work_left_millis = Math.max(_opt.time_work_in_millis() - duration, 0);

        collect_min_sec(work_left_millis, work);

        /* break */
        var break_left_millis = _opt.time_break_in_millis() - Math.max(duration - _opt.time_work_in_millis(), 0);

        var _break = {};
        collect_min_sec(break_left_millis, _break);

        work_left_millis = work_left_millis > 0 ? 0 : 1;
        break_left_millis = break_left_millis > 0 ? 0 : 1;
        return ({
            index: Math.trunc(duration / _opt.total_time_in_millis() * (paths.arcs.length - 1)),
            work_done: work_left_millis,
            break_done: break_left_millis,
            bmin: _break.min,
            bsec: _break.sec,
            wmin: work.min,
            wsec: work.sec
        });
    }


    function generate_paths() {

        var pr = get_total_percentages();
        var elt = document.getElementById(paths.prefix(pr.index + 1));
        if (elt) {
            elt.classList.add('v');
        }

        elt = document.getElementById("break_time");

        if (!pr.work_done) {
            update_clock_text({min: pr.wmin, sec: pr.wsec, is_work: true});
            if (elt) {
                elt.classList.add("hide");
            }
        }
        if (pr.work_done && !pr.break_done) {
            update_clock_text({min: pr.bmin, sec: pr.bsec, is_work: false});
            if (elt) {
                elt.classList.remove("hide");
            }
        }


        console.log(pr);

        return pr;
    }


    /* display */
    /* display */
    /* display */
    /* display */

    function update_button_ui() {
        break_minutes.textContent = (_opt.time_break < 10 ? "0" : '' ) + _opt.time_break;
        work_minutes.textContent = (_opt.time_work < 10 ? "0" : '') + _opt.time_work;
    }


    function do_animation(end_func) {
        var i = 0;
        return function () {
            //console.log('[' + i + '/' + paths.arcs.length + ']');
            var n_elt;
            var d = 3;
            for (; d > 0; d--) {
                if (i < paths.arcs.length) {
                    n_elt = document.getElementById(paths.prefix(i + 1));
                    n_elt.classList.add('v');

                }
                i++;
            }
            d = 3
            for (; d > 0; d--) {
                var j = i - 3 - d;
                if (j >= 0 && j < paths.arcs.length) {
                    n_elt = document.getElementById(paths.prefix(i - 3 - d + 1));
                    n_elt.classList.remove('v');

                }
            }
            /*if (i > 0){
             n_elt = document.getElementById(paths.prefix(i));
             n_elt.classList.remove('v');
             }*/
            if (i >= paths.arcs.length + 4) {
                window.clearInterval(_opt.interval_id);
                _opt.interval_id = null;
                end_func();
            }
        };
    }


    function start_animation(func) {
        _opt.interval_id = window.setInterval(do_animation(func), 25);
    }

    function add_new_paths() {
        var _svg_temp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        paths.init(); //generate new progress-bar, based on current settings
        paths.arcs.forEach(function (cur, idx, arr) {
            _svg_temp.innerHTML = cur;
            var node = _svg_temp.firstChild.cloneNode(false);
            svg.appendChild(node);
        });
    }


    function remove_existing_paths() {
        var node_list = document.getElementsByClassName("piece");
        var arr_nodes = [];
        Array.prototype.push.apply(arr_nodes, node_list);

        arr_nodes.forEach(function (cur, idx, arr) {
            cur.remove();
        });
        //all nodes removed
    }


    function toggle_btn_ui(enable) {
        var not_all = "not-allowed";
        var allow = "pointer";
        if (!enable) {//start the clock
            break_up.style.cursor = not_all;
            break_down.style.cursor = not_all;
            work_up.style.cursor = not_all;
            work_down.style.cursor = not_all;
            //TODO start clock
        }
        else {//stop the clock
            break_up.style.cursor = allow;
            break_down.style.cursor = allow;
            work_up.style.cursor = allow;
            work_down.style.cursor = allow;

        }

    }

    function update_clock_text(dur) {
        dur.sec = dur.sec % 60;
        svg_text.textContent =
            ( dur.min < 10 ? '0' : '') + dur.min + ' '
            + ( dur.sec < 10 ? '0' : '') + dur.sec;

        svg_text.style.fill = dur.is_work ? "white" : "red";
    }

    function start_stop_clock(evt) {

        var elt;

        if (ctrl.state == 0) {//start the clock
            ctrl.state = 2;
            toggle_btn_ui(false);//disable

            var cl = {};
            collect_min_sec(_opt.time_work_in_millis(), cl);

            elt = document.getElementById('ui-ctrls');
            if (elt) {
                elt.classList.add('dim');
            }

            elt = document.getElementById("break_time");
            if (elt) {
                elt.classList.add("hide");
            }


            update_clock_text({min: cl.min, sec: cl.sec, is_work: true});
            remove_existing_paths();
            add_new_paths();
            start_animation(start_clock);
            return;
        }
        if (ctrl.state == 1) {
            /* do nothing */
            return;
        }
        if (ctrl.state == 2) {
            elt = document.getElementById('ui-ctrls');
            if (elt) {
                elt.classList.remove('dim');
            }
            cancel_clock();
            toggle_btn_ui(true);
            ctrl.state = 0;
            return;
        }

    }

    function spin_up_down_btn(evt) {

        if (ctrl.state != 0) {
            return;
        }

        switch (evt.extra) {
            case "break_up":
                _opt.time_break = min(_opt.time_break + 1, 60);
                break;
            case "break_down":
                _opt.time_break = max(_opt.time_break - 1, 1);
                break;
            case "work_up":
                _opt.time_work = min(_opt.time_work + 1, 60);
                break;
            case "work_down":
                _opt.time_work = max(_opt.time_work - 1, 1);
                break;
            default:
        }
        update_button_ui();


    }

    function wrap_button_evt_handler(func, value) {
        return function (evt) {
            evt.extra = value; //enrich event
            func(evt);
        }
    }

    function expose(id) {
        var ui = document.getElementById(id);
        if (!ui) {
            throw new Error("oops, no #" + id + " found in DOM");
        }
        return ui;
    }


    function init() {
        ctrl.state = 1;
        /* expose the ui */
        svg = expose("angular-progress");

        /* break */
        break_up = expose("arrow-up-break");
        break_down = expose("arrow-down-break");
        break_minutes = expose("minutes-break");

        /*work*/
        work_up = expose("arrow-up-work");
        work_down = expose("arrow-down-work");
        work_minutes = expose("minutes-work");

        /* svg text-time display */
        svg_text = expose("time");

        break_up.addEventListener("click", wrap_button_evt_handler(spin_up_down_btn, "break_up"));
        break_down.addEventListener("click", wrap_button_evt_handler(spin_up_down_btn, "break_down"));

        work_up.addEventListener("click", wrap_button_evt_handler(spin_up_down_btn, "work_up"));
        work_down.addEventListener("click", wrap_button_evt_handler(spin_up_down_btn, "work_down"));

        svg.addEventListener("click", start_stop_clock);


        _opt.time_break = 5; //5 min
        _opt.time_work = 25; //25 min
        //toggle_btn_ui( false );//
        //update_clock_text({millis:_opt.time_work_in_millis(), is_work:true});
        remove_existing_paths();
        add_new_paths();
        start_animation(function () {
            ctrl.state = 0;
        });

    }

    /*  I export this function to public so it can be tested */
    init.set_arc = function (arc_sofar) {


    };


    return init;

})();

window.onload = _polmodoro;