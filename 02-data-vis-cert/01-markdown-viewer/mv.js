var mdURI = 'https://cdn.rawgit.com/chjj/marked/master/README.md';

new Vue({
  el: '#editor',
  data: {
    input: '### Hello Markdown'
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

/*
$.getJSON(mdURI,function(){})
  .done(function(data) {
	  $(textarea).text(data.responseText);
  })
  .fail(function(error){
    console.log(error)
  })
*/
