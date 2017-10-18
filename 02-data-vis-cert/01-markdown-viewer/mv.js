/*
var mdURI = 'https://cdn.rawgit.com/chjj/marked/master/README.md';

var mdTXT = "";

$.getJSON(mdURI,function(){})
  .done(function(data) {
	  //$(textarea).text(data.responseText);
    mdTXT = data.responseText;
    //Vue.data.input = data.responseText;
    //Vue.updata();
  })
  .fail(function(error){
    console.log(error);
  })
*/

new Vue({
  el: '#editor',
  data: {
    //input: mdTXT
    input: '#### Hello Markdown'
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value
    }, 300)
  }
});
