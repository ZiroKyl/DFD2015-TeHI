//////////////////////////
//All
//////P.S. querySelectorAll faster than getElementsByClassName, getElementsByTagName and getElementById
//////But do not use querySelector! is so slow
"use strict";	//ECMAscript 5

window.MathJax = {
	jax: ["input/TeX","output/HTML-CSS"],
	extensions: ["tex2jax.js"],
	TeX: {
		extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"],
		equationNumbers: {
			autoNumber: "AMS", formatNumber: function(n){ return "0." + n }
		},
		menuSettings: {
			zoom: "Hover",
			zscale: "150%"
		}/*,
		Macros: {
			"$(": "{\\left(}",
			")$": "{\\right)}"
		}*/
	},
	"HTML-CSS": {
		availableFonts: [],
		preferredFont: null,
		webFont: "STIX-Web",
		imageFont: null,
		undefinedFamily: "STIXGeneral, 'Cambria Math', 'Arial Unicode MS', serif"
	}
};

document.addEventListener("DOMContentLoaded", function() {
	SyntaxHighlighter.config.tagName = "code";
	SyntaxHighlighter.defaults.toolbar = false;
	SyntaxHighlighter.all();
	
	var fig = document.querySelectorAll("img, pre");
	var i,j;
	for(i=fig.length;i--;){
		//fig[i].dataset["fig_num"] = (i+1);
		fig[i].outerHTML = "<figure>" + fig[i].outerHTML + "<figcaption>" + "Пикча " + (i+1) + " — " + fig[i].title[0].toUpperCase() + fig[i].title.slice(1) + ".</figcaption></figure>";
		
		if(fig[i].id){
			var ref = document.querySelectorAll(".ref."+fig[i].id);
			for(j=ref.length;j--;){
				ref[j].innerHTML = "(Пик.<a href='#" + fig[i].id + "'>" + (i+1) + "</a>)";
			}
		}
	}
	
	if(!(document.body.spellcheck && document.body.contentEditable==="true")){
		(function() { //hyphenate
			var RusA = "[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]";
			var RusV = "[аеёиоуыэю\я]";
			var RusN = "[бвгджзклмнпрстфхцчшщ]";
			var RusX = "[йъь]";
			var Hyphen = "\xAD";
			
			var re1 = new RegExp("("+RusX+")("+RusA+RusA+")","ig");
			var re2 = new RegExp("("+RusV+")("+RusV+RusA+")","ig");
			var re3 = new RegExp("("+RusV+RusN+")("+RusN+RusV+")","ig");
			var re4 = new RegExp("("+RusN+RusV+")("+RusN+RusV+")","ig");
			var re5 = new RegExp("("+RusV+RusN+")("+RusN+RusN+RusV+")","ig");
			var re6 = new RegExp("("+RusV+RusN+RusN+")("+RusN+RusN+RusV+")","ig");
			
			[].forEach.call(document.querySelectorAll("p"), function(item){
					var text = item.innerHTML;
					text = text.replace(re1, "$1"+Hyphen+"$2");
					text = text.replace(re2, "$1"+Hyphen+"$2");
					text = text.replace(re3, "$1"+Hyphen+"$2");
					text = text.replace(re4, "$1"+Hyphen+"$2");
					text = text.replace(re5, "$1"+Hyphen+"$2");
					text = text.replace(re6, "$1"+Hyphen+"$2");
					item.innerHTML = text;
			});
		})();
	}
}, false);