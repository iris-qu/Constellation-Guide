$(document).ready(function () {
  var token = '052b97827c94c0dee56c29433c897a2e7c5de807a1140234ba5514643976b32b';
  var category = 'VU';

  function Species() {
    return {
      'id':   '',
      'class':    '',
      'category':     ''
    };
  };

  function download(text, name, type) {
      var a = document.createElement("a");
      var file = new Blob([text], {type: type});
      a.href = URL.createObjectURL(file);
      a.download = name;
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent(
              "click", true, false, window, 0, 0, 0, 0, 0
              , false, false, false, false, 0, null
      );
      a.dispatchEvent(event);
      a.click();
  }

  function getClassName(id, callback) {
    var fullname = "default";
    $.getJSON('http://apiv3.iucnredlist.org/api/v3/species/id/'+id+'?token='+token, function(c){
      var detail = c.result;
      var num = detail[0].taxonid;
      var cl = detail[0].class;
      var classNum;
      switch (cl) {
        case 'MAMMALIA':
          classNum = 0;
          break;
        case 'AVES':
          classNum = 1;
          break;
        case 'REPTILIA':
          classNum = 2;
          break;
        case 'AMPHIBIA':
          classNum = 3;
          break;
        case 'CEPHALASPIDOMORPHI':
        case 'MYXINI':
        case 'CHONDRICHTHYES':
        case 'ACTINOPTERYGII':
        case 'SARCOPTERYGII':
          classNum = 4;
          break;
        case 'MALACOSTRACA':
          classNum = 5;
          break;
        case 'INSECTA':
          classNum = 6;
          break;
        case 'GASTROPODA':
          classNum = 7;
          break;
        case 'ANTHOZOA':
        case 'HYDROZOA':
          classNum = 8;
          break;
        case 'HOLOTHUROIDEA':
        case 'ECHINOIDEA':
        case 'ARACHNIDA':
        case 'CHILOPODA':
        case 'DIPLOPODA':
        case 'ENTOGNATHA':
        case 'BRANCHIOPODA':
        case 'MAXILLOPODA':
        case 'OSTRACODA':
        case 'MEROSTOMATA':
        case 'ONYCHOPHORA':
        case 'CLITELLATA':
        case 'POLYCHAETA':
        case 'BIVALVIA':
        case 'CEPHALOPODA':
        case 'ENOPLA':
        case 'TURBELLARIA':
          classNum = 9;
          break;
        case 'LILIOPSIDA':
          classNum = 10;
          break;
        case 'MAGNOLIOPSIDA':
          classNum = 11;
          break;
        default:
          classNum = 12;
      }
      callback(classNum, num);
    });
  }

  $.ajax({
    url: 'http://apiv3.iucnredlist.org/api/v3/species/category/'+category+'?token='+token,
    timeout: 3000, //change it to any value you want in milliseconds
  })
  .done(function(d) {
    var data = d.result;
    console.log(data.length);
    var list=[];
    for(i=8588; i<data.length; i++){
      getClassName(data[i].taxonid, function(classname, idnum) {
        var s = Species();
        s.id = idnum;
        s.class = classname;
        s.category = 1;
        list.push(s);
      });
    }

    setTimeout(function(){
      console.log(list);
      var f = JSON.stringify(list, 0, 4);
      download(f, 'test.json', 'text/json');
    }, 1200000);
  });

  

});
