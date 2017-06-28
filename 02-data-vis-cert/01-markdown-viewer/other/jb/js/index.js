

'use strict';

function getInitialData() {

  var data = "RmVhdHVyZXMNCj09PT09PT09DQoNCiogU3ludGF4IGhpZ2hsaWdodGluZw0KKiBBdXRvbWF0aWMgaW5kZW50IGFuZCBvdXRkZW50DQoqIEFuIG9wdGlvbmFsIGNvbW1hbmQgbGluZQ0KKiBIYW5kbGVzIGh1Z2UgZG9jdW1lbnRzICgxMDAsMDAwIGxpbmVzIGFuZCBtb3JlIGFyZSBubyBwcm9ibGVtKQ0KKiBGdWxseSBjdXN0b21pemFibGUga2V5IGJpbmRpbmdzIGluY2x1ZGluZyBWSSBhbmQgRW1hY3MgbW9kZXMNCiogVGhlbWVzIChUZXh0TWF0ZSB0aGVtZXMgY2FuIGJlIGltcG9ydGVkKQ0KKiBTZWFyY2ggYW5kIHJlcGxhY2Ugd2l0aCByZWd1bGFyIGV4cHJlc3Npb25zDQoqIGV0YyBldGMNCg0KDQokJCBcc3VtX3tpPTF9XnsgXGluZnR5fSBpXnsyfSAkJA0KDQoNCiQkDQpcdW5kZXJicmFjZXtuKG4tMSkobi0yKVxkb3RzKG4tbSsxKX1fDQp7XG1ib3h7dG90YWwgb2YgJG0kIGZhY3RvcnN9fQ0KJCQNCg0KCQ0KJCQNCntuKzFcY2hvb3NlIGt9ID0ge25cY2hvb3NlIGt9ICsge24gXGNob29zZSBrLTF9DQokJA0KDQoNCg0KVGhlIGVhc2llc3QgdmVyc2lvbiBpcyBzaW1wbHk6DQoNCmBgYGh0bWwNCiAgICA8ZGl2IGlkPSJlZGl0b3IiPnNvbWUgdGV4dDwvZGl2Pg0KICAgIDxzY3JpcHQgc3JjPSJzcmMvYWNlLmpzIiB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiIGNoYXJzZXQ9InV0Zi04Ij48L3NjcmlwdD4NCiAgICA8c2NyaXB0Pg0KICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHsNCiAgICAgICAgdmFyIGVkaXRvciA9IGFjZS5lZGl0KCJlZGl0b3IiKTsNCiAgICB9Ow0KICAgIDwvc2NyaXB0Pg0KYGBgDQoNCldpdGggImVkaXRvciIgYmVpbmcgdGhlIGlkIG9mIHRoZSBET00gZWxlbWVudCwgd2hpY2ggc2hvdWxkIGJlIGNvbnZlcnRlZCB0byBhbiBlZGl0b3IuIE5vdGUgdGhhdCB0aGlzIGVsZW1lbnQgbXVzdCBiZSBleHBsaWNpdGx5IHNpemVkIGFuZCBwb3NpdGlvbmVkIGBhYnNvbHV0ZWAgb3IgYHJlbGF0aXZlYCBmb3IgQWNlIHRvIHdvcmsuIGUuZy4NCg0KYGBgY3NzDQogICAgI2VkaXRvciB7DQogICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsNCiAgICAgICAgd2lkdGg6IDUwMHB4Ow0KICAgICAgICBoZWlnaHQ6IDQwMHB4Ow0KICAgIH0NCmBgYA0KDQpUbyBjaGFuZ2UgdGhlIHRoZW1lIHNpbXBseSBpbmNsdWRlIHRoZSBUaGVtZSdzIEphdmFTY3JpcHQgZmlsZQ0KDQpgYGBodG1sDQogICAgPHNjcmlwdCBzcmM9InNyYy90aGVtZS10d2lsaWdodC5qcyIgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBjaGFyc2V0PSJ1dGYtOCI+PC9zY3JpcHQ+DQpgYGANCg0KYW5kIGNvbmZpZ3VyZSB0aGUgZWRpdG9yIHRvIHVzZSB0aGUgdGhlbWU6DQoNCmBgYGphdmFzY3JpcHQNCiAgICBlZGl0b3Iuc2V0VGhlbWUoImFjZS90aGVtZS90d2lsaWdodCIpOw0KYGBgDQoNCkJ5IGRlZmF1bHQgdGhlIGVkaXRvciBvbmx5IHN1cHBvcnRzIHBsYWluIHRleHQgbW9kZTsgbWFueSBvdGhlciBsYW5ndWFnZXMgYXJlIGF2YWlsYWJsZSBhcyBzZXBhcmF0ZSBtb2R1bGVzLiBBZnRlciBpbmNsdWRpbmcgdGhlIG1vZGUncyBKYXZhU2NyaXB0IGZpbGU6DQoNCmBgYGh0bWwNCiAgICA8c2NyaXB0IHNyYz0ic3JjL21vZGUtamF2YXNjcmlwdC5qcyIgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBjaGFyc2V0PSJ1dGYtOCI+PC9zY3JpcHQ+DQpgYGANCg0KVGhlbiB0aGUgbW9kZSBjYW4gYmUgdXNlZCBsaWtlIHRoaXM6DQoNCmBgYGphdmFzY3JpcHQNCiAgICB2YXIgSmF2YVNjcmlwdE1vZGUgPSByZXF1aXJlKCJhY2UvbW9kZS9qYXZhc2NyaXB0IikuTW9kZTsNCiAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUobmV3IEphdmFTY3JpcHRNb2RlKCkpOw0KYGBgDQo=";
  return decodeBase64(data);
}

function create_smart_scroll(elt, xname) {
  var entered_critical = false;
  var most_recent = null;
  return {
    init: function init() {
      entered_critical = true;
    },
    scrollToPercentage: function scrollToPercentage(x, y) {

      var view_height = elt.clientHeight;
      var scroll_height = elt.scrollHeight;

      console.log({ node: xname, wantto: y, isnow: elt.scrollTop });

      y = Math.round((scroll_height - view_height) * y);

      if (elt.clientHeight >= elt.scrollHeight) {
        return;
      }
      if (y == elt.scrollTop) {
        return; //do nothing
      }

      if (entered_critical) {
        /* ace scrolling sucks hard*/
        most_recent = { x: x, y: y };
      }
      entered_critical = true;
      elt.scrollTo(x, y);
      return;
    },
    testAndLeave: function testAndLeave() {
      if (entered_critical) {
        entered_critical = false;
        return true;
      }
      return false;
    }
  };
}

function decodeBase64(s) {
  var e = {},
      i,
      b = 0,
      c,
      x,
      l = 0,
      a,
      r = '',
      w = String.fromCharCode,
      L = s.length;
  var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (i = 0; i < 64; i++) {
    e[A.charAt(i)] = i;
  }
  for (x = 0; x < L; x++) {
    c = e[s.charAt(x)];
    b = (b << 6) + c;
    l += 6;
    while (l >= 8) {
      ((a = b >>> (l -= 8) & 0xff) || x < L - 2) && (r += w(a));
    }
  }
  return r;
};

var Seperator = React.createClass({
  displayName: 'Seperator',

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render: function render() {
    return React.createElement('div', { className: 'seperator' });
  }
});

var ContentWindow = React.createClass({
  displayName: 'ContentWindow',

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render: function render() {
    return React.createElement('div', { className: 'content-window' });
  }

});

var AboutButton = React.createClass({
  displayName: 'AboutButton',

  showModal: function showModal() {
    //console.log('Show me the money!');
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return false;
  },

  render: function render() {
    return React.createElement(
      'li',
      { onClick: this.showModal, ref: 'about' },
      React.createElement(
        'a',
        { href: '#' },
        'About'
      )
    );
  }

});

var ToggleSyncButton = React.createClass({
  displayName: 'ToggleSyncButton',

  render: function render() {
    return React.createElement(
      'li',
      { onClick: this._handleClick, ref: 'sync_views', className: "sync-views on " + (!this.props.initial ? "off" : "") },
      React.createElement(
        'a',
        { href: '#' },
        'Sync [ ',
        React.createElement(
          'span',
          { className: 'on' },
          'On'
        ),
        React.createElement(
          'span',
          {
            className: 'off' },
          'Off'
        ),
        ' ]'
      )
    );
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },

  _handleClick: function _handleClick(evt) {
    var htmlElt = this.refs.sync_views;
    var turned_on = htmlElt.classList.contains("off") == false;
    //console.log('was turned on:'+turned_on);
    switch (turned_on) {
      case true:
        htmlElt.classList.add("off");
        break;
      case false:
        htmlElt.classList.remove("off");
        break;
      default:
    }
    this.props.appCallBack(!turned_on);
  }

});

var ContentWindow = React.createClass({
  displayName: 'ContentWindow',

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return false; // no need to redraw structure, visual changes done in css, not in html
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'content-window' },
      this.props.children
    );
  }

});

var AceEdit = React.createClass({
  displayName: 'AceEdit',

  shouldComponentUpdate: function shouldComponentUpdate() {
    return false; // no need to redraw structure, visual changes done in css, not in html
  },

  _onscroll: function _onscroll(e) {

    if (this.scroller_ace.testAndLeave()) {
      console.log('forced ace scroll event');
      return;
    }
    /* no syncing */
    if (!this.props.requestSync()) {
      console.log('ace edtior will not sync!');
      return;
    }

    //sometimes I get negative numbers, clean up poop
    var editor = this.editor;
    e = e < 0 ? 0 : e;

    var view_height = editor.renderer.scrollBarV.element.clientHeight;
    var total_height = editor.renderer.scrollBarV.element.scrollHeight;
    var undimension;

    if (total_height == 0 && view_height == 0) {
      // stupid bug
      undimension = 1;
    } else {
      undimension = Math.min(e / (total_height - view_height), 1);
    }

    /** only in debug mode later remove line below*/

    var metrics = { height: -1, scoll_height: -1 };
    if (this.props.getDisplayScrollMetrics) {
      metrics = this.props.getDisplayScrollMetrics();
    }

    /* debugging */
    console.log({
      ace_scroll: e,
      outer: view_height,
      t_height: total_height,
      dim: undimension,
      disp_ch: metrics.height,
      disp_sh: metrics.scroll_height
    });

    this.props.synchronizeDisplay(undimension);
  },

  _ondata_change: function _ondata_change(delta) {

    var all_lines = this.editor.getSession().getDocument().getAllLines();
    //console.log(JSON.stringify(all_lines));

    this.props.updateMarkDownDisplay(all_lines.join('\n'));
  },

  componentDidMount: function componentDidMount() {
    this.editor = ace.edit(this.refs.ace_edit);
    var editor = this.editor;
    editor.setTheme("ace/theme/cobalt");
    editor.getSession().setMode("ace/mode/markdown");
    editor.getSession().setUseWrapMode(true);
    editor.setShowPrintMargin(false);
    editor.setPrintMarginColumn(80);
    editor.setShowPrintMargin(true);
    editor.setHighlightActiveLine(true);

    var session = editor.getSession();

    session.on("change", this._ondata_change);
    this.scroller_ace = create_smart_scroll(editor.renderer.scrollBarV.element, 'ace');
    this.props.registerScroller(this.scroller_ace);

    session.on("changeScrollTop", this._onscroll);
    console.log("ace editor setup finished");
  },

  render: function render() {
    return React.createElement('div', { ref: 'ace_edit', className: 'flex-itm ace-pane' });
  }

});

var MarkDownDisplay = React.createClass({
  displayName: 'MarkDownDisplay',

  componentDidMount: function componentDidMount() {

    var elt = this.refs.display;

    elt.addEventListener('scroll', this._handleScroll);
    this.smart_scroller = create_smart_scroll(elt, 'disp');
    this.props.registerScroller(this.smart_scroller);

    console.log("markup display setup finished");
  },

  componentWillUnmount: function componentWillUnmount() {
    var elt = this.refs.display;
    elt.removeEventListener('scroll', this._handleScroll);
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    return false; // no need to redraw structure, visual changes done in css, not in html
  },

  _handleScroll: function _handleScroll(evt) {

    if (this.smart_scroller.testAndLeave()) {
      console.log('forced display scroll event');
      return;
    }
    /* no syncing */
    if (!this.props.requestSync()) {
      console.log('display will not sync!!');
      return;
    }

    var dElt = this.refs.display;

    var posy = dElt.scrollTop;
    var disp_height = dElt.clientHeight;
    var scroll_height = dElt.scrollHeight;

    var undimension = Math.min(1, posy / (scroll_height - disp_height));

    var metrics = { disp_height: -1, scroll_height: -1 };

    if (this.props.getDisplayScrollMetrics) {
      metrics = this.props.getDisplayScrollMetrics();
    }

    console.log({
      display_scroll: evt,
      ace_disp_height: metrics.disp_height,
      ace_scroll_height: metrics.scroll_height,
      undim: undimension
    });

    this.props.synchronizeAceEditor(undimension);
  },

  render: function render() {
    return React.createElement('div', { ref: 'display', className: 'flex-itm markdown-pane' });
  }

});

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return { scrollSync: true };
  },

  componentDidMount: function componentDidMount() {
    var editor = this.refs.ace_editor.editor;
    editor.setValue(getInitialData());
    editor.gotoLine(1, 60);
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    return false; // no need to redraw structure, visual changes done in css, not in html
  },

  _set_scroll_synced_call_back: function _set_scroll_synced_call_back(on) {
    this.setState({ scrollSync: on });
    if (this.state) {
      console.log("toggle button state is now:" + on);
    } else {
      console.log("toggle button state undefined");
    }
  },

  _get_scroll_synched: function _get_scroll_synched() {
    return this.state.scrollSync;
  },

  _register_scroller_common: function _register_scroller_common(who, scrollerObj) {
    var obj = {};
    obj['scroll_' + who] = scrollerObj;
    console.log(obj);
    this.setState(obj);
  },

  _register_scroll_ace: function _register_scroll_ace(scrollerObj) {
    this._register_scroller_common('ace', scrollerObj);
  },
  _register_scroll_display: function _register_scroll_display(scrollerObj) {
    this._register_scroller_common('display', scrollerObj);
  },

  _synchronize_display: function _synchronize_display(target) {
    console.log('trying to sync display');
    if (this.state.scroll_display) {
      console.log('calling smart scroller');
      this.state.scroll_display.scrollToPercentage(0, target);
    }
  },

  _synchronize_ace_editor: function _synchronize_ace_editor(target) {
    if (this.state.scroll_ace) {
      this.state.scroll_ace.scrollToPercentage(0, target);
    }
  },

  _update_markdown_display: function _update_markdown_display(data) {

    var md = ReactDOM.findDOMNode(this.refs.markdown_display);
    MathJax.Hub.Queue([function (d) {
      md.innerHTML = marked(d);
    }, data], ["Typeset", MathJax.Hub, md]);
  },

  render: function render() {
    return React.createElement(
      'div',
      { ref: 'innercanvas', className: 'innercanvas' },
      React.createElement(
        'div',
        { className: 'header' },
        React.createElement(
          'div',
          { className: 'icon fit' },
          React.createElement(Image, null),
          React.createElement(
            'span',
            null,
            'markdown'
          )
        ),
        React.createElement(
          'div',
          { className: 'main-menu' },
          React.createElement(
            'ul',
            null,
            React.createElement(ToggleSyncButton, {
              initial: this.state.scrollSync,
              appCallBack: this._set_scroll_synced_call_back }),
            React.createElement(AboutButton, null)
          )
        )
      ),
      React.createElement(Seperator, null),
      React.createElement(
        ContentWindow,
        null,
        React.createElement(AceEdit, {
          ref: 'ace_editor',
          requestSync: this._get_scroll_synched,
          registerScroller: this._register_scroll_ace,
          synchronizeDisplay: this._synchronize_display,
          updateMarkDownDisplay: this._update_markdown_display
        }),
        React.createElement(MarkDownDisplay, {
          ref: 'markdown_display',
          requestSync: this._get_scroll_synched,
          registerScroller: this._register_scroll_display,
          synchronizeAceEditor: this._synchronize_ace_editor
        })
      )
    );
  }
});

var Image = React.createClass({
  displayName: 'Image',

  render: function render() {
    var data = "data:image/png;base64,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";
    return React.createElement('img', { className: 'markd-icon', src: data });
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));