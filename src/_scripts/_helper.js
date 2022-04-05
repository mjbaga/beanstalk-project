// https://date-fns.org/docs/
'use strict';

let bp = {
	"maxMobile": 767,
	"minDesktop": 1024
}

let timing = {
	"quick": 250,
	"medium": 400,
	"long": 800,
	"slow": 1000
}

let debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
let detectIE = function() {
	var ua = window.navigator.userAgent;

	// Test values; Uncomment to check result …

	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

	// Edge 12 (Spartan)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

	// Edge 13
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

let textAreaAdjust = function(ta) {
	ta.style.height = "1px";
	ta.style.height = (ta.scrollHeight)+"px";
}

let textInputAdjust = function(ti) {
	ti.size = ( ti.value.length > 20 ) ? ti.value.length + 2 : 22;
}

let variableFontSize = function(ti) {
	var textLength = ti.html().length;

	if(textLength < 20) {
		ti.css('font-size', '');
		ti.css('vertical-align', '');
	} else {
		// Vary the % of the text re-sizing. Change the * by value to have greater control of compression
		ti.css('font-size', (100 - (textLength * 1.3)) + '%');
		ti.css('vertical-align', 'bottom');
	}

}

/* --------------------------------------------------------------
 [1] Cookie functions
	Parameters: n/a
	Returns: n/a
-------------------------------------------------------------- */
/* --------------------------------------------------------------
 [1.1] setCookie, sets a cookie in browser
	Parameters: cookiename (name of cookie)
				value (value to set to cookie of cookiename)
	Returns: true
-------------------------------------------------------------- */
let setCookie = function(cookiename, value, maxAgeParam) {
	var maxAge=maxAgeParam;
	if (maxAge === undefined) {
		  maxAge = 86400*30; //seconds * 30days
	}
	document.cookie = cookiename + '=' + value + '; path=/; max-age='+maxAge;
	return true;
}

/* --------------------------------------------------------------
 [1.2] checkCookie, checks a cookie of cookie name if exists
	Parameters: cookiename (name of cookie)
	Returns: value of cookie if exists, false if doesn't exist
-------------------------------------------------------------- */
let checkCookie = function(cookiename) {
	//reworked to turn document.cookie into object

	// get document.cookie and store in var
	var cookies = document.cookie;
	//convert into array
	var cookiearr = cookies.split('; ');
	//get length of array items
	var arrlen = cookiearr.length;

	//declare object to store cookie details in
	var cookieobj = {};
	//declare holding array for name and values
	var holdingarr = [];

	//loop through and split into JS object
	for (var i = 0; i < arrlen; i++) {
		//split array item into name and value and store in holding array at 0 for name and 1 for value
		holdingarr = cookiearr[i].split('=');
		//store in key value pair in object
		cookieobj[holdingarr[0]] = holdingarr[1];
	}

	//check if cookie name exists as key in object
	if (cookiename in cookieobj) {
		//if does exist return cookie value
		return cookieobj[cookiename];
	} else {
		return false;
	}
}


export { bp, timing, debounce, detectIE, textAreaAdjust, textInputAdjust, variableFontSize, setCookie, checkCookie};
