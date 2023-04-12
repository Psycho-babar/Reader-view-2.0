var isChrome = !browser;
var browser = browser || chrome;
var config = config || {arrayUrlRegex: ['/.*/'], isEnable: true};

$(function(){
	$('#chkStatus').change(function () {
		var isCheck = $(this).is(":checked");
	  	setLabelStatus(isCheck);
	});

	$('#txtUrl').keypress(function(e) {
	    if(e.which == 13) {
	        getUrl();
	        e.preventDefault();
	    }
	});

	$('#btnAdd').on('click', function(){
		getUrl();
	});

	$('#btnSave').click(function() {
		var isCheck = $('#chkStatus').is(":checked");
		config.isEnable = isCheck;
		var arrayUrlRegex  = [];
		$('.url-regex').each(function(index){
		  arrayUrlRegex.push($(this).text());
		});
		//console.log(arrayUrlRegex);
		config.arrayUrlRegex = arrayUrlRegex;
	    browser.storage.local.set({config: config});
		window.close();
	});

	$('#btnCancel').click(function() {	
		initPopup(config);
	});
});

function setLabelStatus(isEnable){
  if(isEnable){
    $('#lbStatus').text('Enable')
    .parent()
    .removeClass('btn-danger')
    .addClass('btn-success');
  }else{
    $('#lbStatus').text('Disable')	
    .parent()
    .removeClass('btn-success')
    .addClass('btn-danger');
  }	
}

function getUrl(){
	var urlPattern = $('#txtUrl').val();
	if(validateRegex(urlPattern)){
		$('#txtUrl').val('');	
		addUrlSection('new', urlPattern);
	}else{
		console.log('invalid pattern');
	}
	
}

function addUrlSection(id, value){
	var content = '<div id="'+id+'" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="url-regex">'+value+'<span/></div>';
	$('.list-url .mCSB_container').prepend(content);
}

function validateRegex(pattern) {
    var parts = pattern.split('/'),
        regex = pattern,
        options = "";
    if (parts.length > 1) {
        regex = parts[1];
        options = parts[2];
    }
    if(regex === ''){
    	return false;
    }
    try {
        return new RegExp(regex, options);
    } catch(e) {
        return false;
    }
}

function initPopup(config){
	console.log('Init popup');
	$('#chkStatus').prop('checked', config.isEnable); 
	setLabelStatus(config.isEnable);
	
	$('.list-url .mCSB_container').html('');
	var arrayUrlRegex = config.arrayUrlRegex;
	for (var i = arrayUrlRegex.length - 1; i >= 0; i--) {
		var urlRegex = arrayUrlRegex[i];
		addUrlSection('index', urlRegex);
	};	
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function initialize() {  
  console.log('Run init');
  if(isChrome){
    browser.storage.local.get('config', (results) => {
      loadConfig(results);
    });
  } else {
    var storageSetting = browser.storage.local.get('config');
    storageSetting.then((results) => {
     loadConfig(results);
    }, onError);  
  }
}

function loadConfig(results){
  console.log(results)
  if(results.config){
    config = results.config;
  }
  initPopup(config);
}

$(window).on('load', function(){ 
	initialize();
	$(".list-url").mCustomScrollbar({
		theme:"dark",
		scrollbarPosition:"outside"
	});	
});