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

function clearItog() {
	toPay = 0;
	document.getElementById("itogToPay").value = toPay;

	for (var i = 0; i < 50; i++) {

		if ((document.getElementsByName("prodCol")[i] === null) ||
			(document.getElementsByName("prodCol")[i] === undefined)) {
			break;
		}

		document.getElementsByName("prodCol")[i].querySelector("#prod").querySelector("input").value  = "";
		document.getElementsByName("prodCol")[i].querySelector("#price").querySelector("input").value = "";
		document.getElementsByName("prodCol")[i].querySelector("#quan").querySelector("input").value  = "";
		document.getElementsByName("prodCol")[i].querySelector("#cost").querySelector("input").value  = "";
	}

	document.getElementById("printTableDiv").children[1].remove();
};

function cloneTr() {
	var stableElem = document.getElementById("shopTable");
	var cloneEl = (document.getElementsByName("prodCol")[0]).cloneNode(true);
  	cloneEl.trN = document.getElementById('shopTable').children.length;
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

function handleKey(e) {

	if (document.getElementById("enShortcuts").checked) {
		if (e.key == "p") {
			var actx = new AudioContext();
			var o    = actx.createOscillator();
			var g    = actx.createGain();
			o.type   = "sine";
			o.connect(g);
			o.frequency.value = 1000;
			g.connect(actx.destination);
			o.start(0);
			g.gain.exponentialRampToValueAtTime(0.00001, actx.currentTime + 1);
		}

		if (e.key == "e") {
			termPay(nal);
		}
		if (e.key == "r") {
			termPay(card);
		}
	}
};

function informAboutShortcuts() {
	if (document.getElementById("enShortcuts").checked) {
		alert(
			"Горячие клавиши:\n" +
			"P - пищание\n" +
			"E - оплата наличными\n" +
			"R - оплата картой"
		);
	}
};

function addProducts() {
	var prodlist = document.getElementById("products_list");
	var prodname = "";

	while (prodname != null) {

		prodprops = prompt("Введите наименование и цену продукта продукта (разделяется точкой с запятой)", "Продукт \"Производитель\";50").split(';');
		prodname = prodprops[0];
		prodprice = prodprops[1];

		if (prodname != null && prodname != "") {

			prodlist.innerHTML +=
			'<option name = "' + prodprice + '">' + (
				new Intl.NumberFormat(
					"ru", {useGrouping: false, minimumIntegerDigits: 6}).format(
						Number(prodlist.lastElementChild.innerHTML.split(' ')[0])+1
					)
			) +
			' ' + prodname + '</option>';
		}
	}
};

function getProducts() {
	var handlerUri = prompt("Введите URI серверного скрипта-обработчика запросов к БД:", "");
	var database_opts = {
		"user": encodeURIComponent(prompt("Введите имя пользователя для доступа к БД:", "cashmachine")),
		"passwd": encodeURIComponent(prompt("Введите пароль для доступа к БД:", "user106")),
		"name": encodeURIComponent(prompt("Введите название БД с продуктами:", "cashmachine")),
		"table": encodeURIComponent(prompt("Введите название таблицы с продуктами", "products"))
	};

	var xhr = new XMLHttpRequest();
	xhr.open("POST", handlerUri);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {

			var prodlist = document.getElementById("products_list");
			var prodname = "";

			var result = xhr.response.split('\n');
			for (int i = 0; i < result.length; i++) {

				product_props = result[i].split(";");
				prodname = product_props[0];
				prodprice = product_props[1];

				prodlist.innerHTML +=
				'<option name = "' + prodprice + '">' + (
					new Intl.NumberFormat(
						"ru", {useGrouping: false, minimumIntegerDigits: 6}).format(
							Number(prodlist.lastElementChild.innerHTML.split(' ')[0])+1
						)
				) +
				' ' + prodname + '</option>';
			}
		}
	};
	xhr.send(`user=${database_opts.user}&password=${database_opts.passwd}&dbname=${database_opts.name}&dbtable=${database_opts.table}`);
};