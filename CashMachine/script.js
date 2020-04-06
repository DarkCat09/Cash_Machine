var cashier = prompt("Введите имя пользователя", "");

var nal = false;
var card = true;
var posx = 0;
var toPay = 0;

function avercost(n) {
	var el1 = document.getElementById("pr" + String(n)).querySelector("#price").querySelector("input").value;
	var el2 = document.getElementById("pr" + String(n)).querySelector("#quan").querySelector("input").value;
	var ce3 = document.getElementById("pr" + String(n)).querySelector("#cost").querySelector("input");
	
	ce3.value = el1 * el2;
	toPay += (el1 * el2);
	
	document.getElementById("itogToPay").value = toPay;
};

function delprod(n) {
	var el0 = document.getElementById("pr" + String(n)).querySelector("#prod").querySelector("input");
	var el1 = document.getElementById("pr" + String(n)).querySelector("#price").querySelector("input");
	var el2 = document.getElementById("pr" + String(n)).querySelector("#quan").querySelector("input");
	var ce3 = document.getElementById("pr" + String(n)).querySelector("#cost").querySelector("input");

	toPay -= (el1.value * el2.value);
	document.getElementById("itogToPay").value = toPay;

	el0.value = "";
	el1.value = "";
	el2.value = "";
	ce3.value = "";
};

function quantityChildrenElems(elForCount) {
	//working
	var fIndex = 0;
	while (true) {
		if ((elForCount.children[fIndex] === undefined) || (elForCount.children[fIndex] === null)) {
			break;
		}
		fIndex++;
	}
	return fIndex;

	//not working
	/*var elsInEl = elForCount.getElementsByTagName("*");
	return elsInEl.lenght;*/
};

function clearItog() {
	toPay = 0;
	document.getElementById("itogToPay").value = toPay;

	for (var i = 0; i < 50; i++) {

		if ((document.getElementsByName("prodCol")[i] === null) ||
			(document.getElementsByName("prodCol")[i] === undefined)) {
			break;
		}

		document.getElementsByName("prodCol")[i].getElementById("prod").querySelector("input").value  = "";
		document.getElementsByName("prodCol")[i].getElementById("price").querySelector("input").value = "";
		document.getElementsByName("prodCol")[i].getElementById("quan").querySelector("input").value  = "";
		document.getElementsByName("prodCol")[i].getElementById("cost").querySelector("input").value  = "";
	}
};

function cloneTr() {
	var stableElem = document.getElementById("shopTable");
	var cloneEl = (document.getElementsByName("prodCol")[0]).cloneNode(true);
  	cloneEl.trN = quantityChildrenElems(document.getElementById('shopTable'));
	cloneEl.trN += 1;
	cloneEl.id = "pr" + String(cloneEl.trN);
	cloneEl.querySelector("#prod").querySelector("input").value = "";
	cloneEl.querySelector("#price").querySelector("input").value = "";
	cloneEl.querySelector("#quan").querySelector("input").value = "";
	cloneEl.querySelector("#cost").querySelector("input").value = "";
	cloneEl.querySelector("#acbutton").querySelector("button").onclick = function () {
		avercost(cloneEl.trN);
  	};

  	cloneEl.querySelector("#delbutton").querySelector("button").onclick = function () {
		delprod(cloneEl.trN);
	};
	
	stableElem.appendChild(cloneEl);
};
	
function exportCanvasAsPNG(elem, fileName) {
		
    var canvasElement = elem;

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
	};
	
function termPay(paytype) {
	alert("К оплате: " + toPay + " руб. Бонусной картой: " + String(toPay / 10 / 2) + " б.");
	
	var load = document.getElementById("load");
	var ctx = load.getContext("2d");
	var nextloadanim = false;

	if (paytype == nal) {
		var cashpaid = prompt("Внесено наличными:", String(toPay));
		if (cashpaid < toPay) {
			alert("Недоплата!");
			return;
		}
		var remainder = cashpaid - toPay;
		alert("Сдача: " + remainder + "руб.");
	}
	else if (paytype == card) {
		var confirmToPay = confirm("Безналичная оплата картой");
		if (!confirmToPay) {
			return;
		}
	}
	else {
		alert("err");
	}
	
	ctx.lineWidth = load.height;
	ctx.strokeStyle = "darkturquoise";
	
	//loading animation
	var interval = setInterval(function () {
		posx += 1;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(posx, 0);
		ctx.stroke();
		if (posx > load.width) {
			ctx.strokeStyle = "white";
			posx = 0;
			var interv1 = setInterval(function () {
				posx += 1;
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(posx, 0);
				ctx.stroke();
				if (posx > load.width) {
					ctx.clearRect(0, 0, 200, 25);
					ctx.strokeStyle = "darkturquoise";
					posx = 0;
					var interv2 = setInterval(function () {
						posx += 1;
						ctx.beginPath();
						ctx.moveTo(0, 0);
						ctx.lineTo(posx, 0);
						ctx.stroke();
						if (posx > load.width) {
							ctx.strokeStyle = "white";
							posx = 0;
							var interv3 = setInterval(function () {
								posx += 1;
								ctx.beginPath();
								ctx.moveTo(0, 0);
								ctx.lineTo(posx, 0);
								ctx.stroke();
								if (posx > load.width) {
		              				ctx.clearRect(0, 0, 200, 25);
									clearInterval(interv3);
								}
							}, 15);
							clearInterval(interv2);
						}
					}, 15);
				clearInterval(interv1);
				}
			}, 15);
			clearInterval(interval);
		}
	}, 15);

	prevCanvas = document.getElementById("printTableDiv").getElementsByTagName("canvas")[0];
	if ((prevCanvas !== null) && (prevCanvas !== undefined)) {
		prevCanvas.remove();
	}
	
	html2canvas(document.querySelector("#shopTable")).then(canvas => {
		document.querySelector("#printTableDiv").appendChild(canvas);
	});
	
	var date = new Date();

	exportCanvasAsPNG(document.getElementById("labelPrint").nextSibling,
					(date.getFullYear() + date.getMonth() + date.getDate() + "_" +
					date.getHours() + date.getMinutes() + date.getSeconds() + ".png"));
};