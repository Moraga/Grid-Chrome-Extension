var bar, plt, ipt;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	// set enviroment
	if (msg.text == 'set') {
		bar = document.createElement('div');
		plt = document.createElement('div');

		bar.style.backgroundColor = '#fff';
		bar.style.lineHeight = '35px';
		bar.style.height = '35px';
		bar.style.position = 'fixed';
		bar.style.top = '0px';
		bar.style.left = '0px';
		bar.style.textAlign = 'center';
		bar.style.width = '100%';
		bar.style.zIndex = 99999999;

		bar.innerHTML = '' +
			'cols <input type="number" id="col" value="12" style="width:35px"/> |' +
			'gutter <input type="number" id="gtr" value="15" style="width:35px"/> px | ' +
			'bg 1 <input type="color" id="bge" value="#cccccc"/> '+
			'bg 2 <input type="color" id="bgo" value="#f3f2f1"/> | '+
			'opacity <input type="number" id="opc" value="20" style="width:35px"/> | ' +
			'width <input type="number" id="wdt" value="1200" style="width:49px"/> px | ' +
			'height <input type="number" id="hgt" value="400" style="width:49px"/> px ' +
			'<label><input type="checkbox" checked/> center</label>';

		document.body.appendChild(bar);

		ipt = bar.getElementsByTagName('input');

		plt.style.boxSizing = 'border-box';
		plt.style.height = '100%';
		plt.style.overflow = 'auto';
		plt.style.opacity = '0.8';
		plt.style.position = 'fixed';
		plt.style.top = '35px';
		plt.style.left = '50%';
		plt.style.textAlign = 'center';
		plt.style.zIndex = 99999998;

		document.body.appendChild(plt);

		for (var i=0; i < ipt.length; i++)
			ipt[i].onkeyup = ipt[i].onchange = function() {
				// get input values
				for (var arg=[], o, n, j=0; j < ipt.length; o=ipt[j++], n=parseFloat(o.value), arg.push(n == o.value ? n : (o.value == 'on' ? o.checked : o.value)));
				plot.apply(null, arg);
			};
		
		// starts with default values
		ipt[0].onkeyup();
	}
	// delete enviroment
	else {
		bar.parentNode.removeChild(bar);
		plt.parentNode.removeChild(plt);
		bar = plt = ipt = null;
	}
});


function plot(cls, gtr, bge, bgo, opc, wdt, hgt, cnt) {
	var ret = '', bgn = 1, i, mke;
	
	opc /= 100;
	ret += '<div style="box-sizing:border-box; margin:0 -'+ gtr +'px; overflow:hidden">';
	for (i=0; i < cls; ret += prnt(i++ % 2 ? bgo : bge, gtr, 1 / cls, opc, '', hgt));
	ret += '</div>';
	
	do {
		mke = make(cls, bgn, gtr, bge, bgo, opc, hgt);
		bgn = mke.res;
		ret += '<div style="box-sizing:border-box; margin:0 -'+ gtr +'px; overflow:hidden">' + mke.ret + '</div>';
	} while (bgn < cls);
	
	plt.style.left = cnt ? '50%' : '0%';
	plt.style.marginLeft = cnt ? wdt / 2 * -1 + 'px' : '0px';
	plt.style.width = wdt + 'px';
	plt.innerHTML = ret;
}

function make(cls, str, gtr, bge, bgo, opc, hgt) {
	for (var ret='', j=str, k=0; k + j < cls; k += j++)
		ret += prnt(j % 2 ? bge : bgo, gtr, j / cls, opc, j, hgt);
	if (k < cls)
		ret += prnt((j + 1) % 2 ? bgo : bge, gtr, (cls - k) / cls, opc, cls - k, hgt);
	return {ret: ret, res: j};
}

function prnt(clr, gtr, dec, opc, lbl, hgt) {
	return '' +
		'<div style="background:'+ clr +'; box-sizing:border-box; float:left; height:'+ hgt +'px; padding:0 '+ gtr +'px; width:'+ (dec * 100) +'%">' +
			'<div style="background:rgba(0,0,0,'+ opc +'); display:block; height:100%; height:100%;">'+ lbl +'</div></div>';
}