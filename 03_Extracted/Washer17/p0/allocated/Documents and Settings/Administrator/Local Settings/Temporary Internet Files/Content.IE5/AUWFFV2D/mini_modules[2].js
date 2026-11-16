var weatherReq = null;
var horoReq = null;
var okCloseMini = true;
var isAuth = false;

var range = {
    "aquarius":" (1/20-2/18)",
    "pisces":" (2/19-3/20)",
    "aries":" (3/21-4/19)",
    "taurus":" (4/20-5/20)",
    "gemini":" (5/21-6/21)",
    "cancer":" (6/22-7/22)",
    "leo":" (7/23-8/22)",
    "virgo":" (8/23-9/22)",
    "libra":" (9/23-10/22)",
    "scorpio":" (10/23-11/21)",
    "sagittarius":" (11/22-12/21)",
    "capricorn":" (12/22-1/19)"
};

var weatherTabURL = "http://weather.aol.com/main.adp";
var horoTabURL = "http://horoscopes.aol.com/";

function getForm() {
    var weatherForm = document.getElementById("wthrFormContainer");
    var forecastContainer = document.getElementById("forecastContainer");
    var zipContainer = document.getElementById("wthr_zip");

    // show form
    if (weatherForm) weatherForm.className = "showDiv";
    // hide forecast
    if (forecastContainer)forecastContainer.className = "hideDiv";
    // remove zip
    if (zipContainer) removeChildren(zipContainer);
}

function getHoroForm() {
    var horoForm = document.getElementById("horoFormContainer");
    var horoContainer = document.getElementById("horoContainer");
    var signContainer = document.getElementById("horo_sign");

    // show form
    if (horoForm) horoForm.className = "showDiv";
    // hide forecast
    if (horoContainer) horoContainer.className = "hideDiv";
    // remove zip
    if (signContainer) removeChildren(signContainer);
}

function callFunc(fn, millis) {
    var t = setTimeout(fn,millis);
}

function setHoro(signin) {
    horoReq = createRequest();
    
    if (pageCookie) {
        pageCookie.setValue("sign", signin);
    }
    
    if (signin) {
        sendRequest(horoReq, "/fetchHoroscopes?sign=" + signin, horoCallback);
    }
}

function getWeather(zip) {
    weatherReq = createRequest();
    if (pageCookie) {
        pageCookie.setValue("zip", zip);
    }
    sendRequest(weatherReq, "/fetchWeather?zip=" + zip, weatherCallback);
}

function setZip() {
    var zip = document.forms["mm_weatherform"].elements["zip"].value;
    getWeather(zip);
}

function weatherCallback() {
    try {
        if (weatherReq.readyState == 4) {
            var obj = eval('(' + weatherReq.responseText + ')');
            displayWeather(obj.weatherData);
        }
    } catch (e) {}
}

function displayWeather(obj) {
    if (obj) {
        try {
            weatherTabURL = "http://weather.aol.com/main.adp?location=" + obj.locid;
            var tab = document.getElementById("mini_weather_tab");
            if (tab) {
                tab.onclick = function() {
                    omo('weath_tab');
                    openPage(weatherTabURL);
                }
            }

            var ext_link = document.getElementById("ext_link");
            if (ext_link) {
                ext_link.href = weatherTabURL;
            }

            // add zip
            var zipContainer = document.getElementById("wthr_zip");
            var zip_hdr = document.getElementById("mini_wthr_hdr_desc");

            // remove previous zip
            removeChildren(zipContainer);
            removeChildren(zip_hdr);

            zipContainer.appendChild(document.createTextNode("(" + obj.zip + ")"));
            zip_hdr.innerHTML = "Today, " + obj.temp + "&deg;F";

            var formContainer = document.getElementById("wthrFormContainer");
            var forecastContainer = document.getElementById("forecastContainer");
            formContainer.className = "hideDiv";
            removeChildren(forecastContainer);
            forecastContainer.className = "showDiv";

            var forecast = document.createElement("div");
            forecast.className = "wthr_fc_cntr";

            var div = document.createElement("div");
            div.className = "pad5";

            var imgContainer = document.createElement("div");
            imgContainer.className = "wthr_image";
            imgContainer.style.float = "left";
            imgContainer.innerHTML = "<img src=\"http://cdn.digitalcity.com/aimtoday_20/" + obj.condIcon + ".gif\" alt=\"Weather Condition\" hspace=\"0\" vspace=\"0\" border=\"0\">";
            div.appendChild(imgContainer);

            var todayContainer = document.createElement("div");
            todayContainer.className = "mrgnl30";
            // Today's forecast
            if (obj.temp) {
                var today = document.createElement("div");
                today.className = "wthr_forecast";
                today.innerHTML = "Today, " + obj.temp + "&deg;F";
                todayContainer.appendChild(today);
            }

            // City
            if (obj.city) {
                var city = document.createElement("div");
                city.className = "wthr_city";
                city.innerHTML = "<a href=\"http://cityguide.aol.com/incoming.adp?pid=502&zip=" + obj.zip + "\" onclick=\"omo('weath_2');\">" + obj.city + ", " + obj.state + "</a>";
                todayContainer.appendChild(city);
            }
            div.appendChild(todayContainer);

            forecast.appendChild(div);
            var extForecastContainer = document.createElement("div");

            var ext1 = document.createElement("div");
            ext1.className = "ext_wthr";
            ext1.innerHTML = "<div class=\"wthr_ext_image\"><img src=\"http://cdn.digitalcity.com/aimtoday_20/" + obj.condiconday2 + ".gif\" alt=\"\" hspace=\"0\" vspace=\"0\" border=\"0\"></div><div style=\"clear: both;\"/>";


            // Extended forecast Day
            var ext1Day = document.createElement("div");
            ext1Day.className = "ext_wthr_day";
            ext1Day.innerHTML = obj.forecastday2 + ".";
            ext1.appendChild(ext1Day);

            var ext1Temp = document.createElement("div");
            ext1Temp.innerHTML = "<span class=\"ext_wthr_temp_hi\">" + obj.highday2 + "&deg;F</span>/<span class=\"ext_wthr_temp_lo\">" + obj.lowday2 + "&deg;F</span>";
            ext1.appendChild(ext1Temp);

            // Extended #2
            var ext2 = document.createElement("div");
            ext2.className = "ext_wthr";
            ext2.innerHTML = "<div class=\"wthr_ext_image\"><img src=\"http://cdn.digitalcity.com/aimtoday_20/" + obj.condiconday3 + ".gif\" alt=\"\" hspace=\"0\" vspace=\"0\" border=\"0\"></div><div style=\"clear: both;\"/>";

            // Extended forecast Day
            var ext2Day = document.createElement("div");
            ext2Day.className = "ext_wthr_day";
            ext2Day.innerHTML = obj.forecastday3 + ".";
            ext2.appendChild(ext2Day);

            var ext2Temp = document.createElement("div");
            ext2Temp.innerHTML = "<span class=\"ext_wthr_temp_hi\">" + obj.highday3 + "&deg;F</span>/<span class=\"ext_wthr_temp_lo\">" + obj.lowday3 + "&deg;F</span>";
            ext2.appendChild(ext2Temp);

            extForecastContainer.appendChild(ext1);
            extForecastContainer.appendChild(ext2);
            forecastContainer.appendChild(forecast);
            forecastContainer.appendChild(extForecastContainer);

         } catch (e) {}
    }
}

function horoCallback() {
    try {
        if (horoReq.readyState == 4) {
            var obj = eval('(' + horoReq.responseText + ')');
            displayHoro(obj.horoscope);
        }
    } catch (e) {}
}

function displayHoro(obj) {
    if (obj) {
        try {
            var signContainer = document.getElementById("horo_sign");
            var tabSignContainer = document.getElementById("mini_horo_hdr_desc");
            removeChildren(signContainer);
            removeChildren(tabSignContainer);

            horoTabURL = "http://horoscopes.aol.com/?_s=" + obj.sign;
            var tab = document.getElementById("mini_horo_tab");
            if (tab) {
                tab.onclick = function() {
                    openPage(horoTabURL);
                    omo('horo_tab');
                }
            }
            // update link to horo tabs.
            if (obj.sign) {
                var horoRange = range[obj.sign];
                var signHeader = obj.sign;
                if (horoRange) signHeader += horoRange;
                signContainer.appendChild(document.createTextNode(signHeader));
                tabSignContainer.appendChild(document.createTextNode(obj.sign));
            }

            var formContainer = document.getElementById("horoFormContainer");
            var contentContainer = document.getElementById("horoContainer");

            formContainer.className = "hideDiv";
            removeChildren(contentContainer);
            contentContainer.className = "showDiv";

            var horoContent = document.createElement("div");
            horoContent.className = "horoContent";

            if (obj.image) {
                var img = document.createElement("div");
                img.innerHTML = "<img src='http://cdn.digitalcity.com/aimtoday_20/" + obj.image + "' hspace='0' vspace='0' align='left'>";
                horoContent.appendChild(img);
            }

            var horoDesc = obj.description;
            if (horoDesc) {

                if (horoDesc.length > 200) {
                    horoDesc = horoDesc.substring(0, 200);
                    var lastChar = horoDesc.charAt(horoDesc.length - 1);

                    // ugly way of truncating a String, but we want to make sure we're
                    // not cutting off in the middle of a word.
                    while (lastChar != " ") {
                        horoDesc = horoDesc.substring(0, horoDesc.length - 1);
                        lastChar = horoDesc.charAt(horoDesc.length - 1);
                    }
                    horoDesc += "...";
                }

                var desc = document.createElement("div");
                desc.className = "horo_desc";
                desc.appendChild(document.createTextNode(horoDesc));
                horoContent.appendChild(desc);
            }

            var horoLinks = document.createElement("div");
            horoLinks.className = "edit";
            horoLinks.innerHTML = "<a href=\"http://horoscopes.aol.com/?_s=" + obj.sign + "\" onclick=\"omo('horo_13');\">More &raquo;</a> | <a href=\"http://horoscopes.aol.com/\" onclick=\"omo('horo_14');\">View All Horoscopes</a>";
            horoContent.appendChild(horoLinks);
            contentContainer.appendChild(horoContent);
        } catch (e) {}
    }
}

var weather_module = null;
var horo_module = null;
var mail_module = null;

function getModules() {
    weather_module = document.getElementById("mini_weather_module");
    horo_module = document.getElementById("mini_horo_module");
    mail_module = document.getElementById("mini_mail_module");
}

function openModule(obj) {
    if (obj) {

        var id = obj.id;
        var module = null;
        getModules();

        switch (id) {
            case "mini_weather_tab":
                module = weather_module;
                document.getElementById("mini_weather_tab").className = "mini_module_selected";
                document.getElementById("mini_horo_tab").className = "mini_module_unselected";
                document.getElementById("mini_mail_tab").className = "mini_module_unselected";

                if (horo_module) horo_module.className = "hideDiv";
                if (mail_module) mail_module.className = "hideDiv";
                break;
            case "mini_horo_tab":

                module = horo_module;
                document.getElementById("mini_weather_tab").className = "mini_module_unselected";
                document.getElementById("mini_horo_tab").className = "mini_module_selected";
                document.getElementById("mini_mail_tab").className = "mini_module_unselected";

                if (weather_module) weather_module.className = "hideDiv";
                if (mail_module) mail_module.className = "hideDiv";
                break;
            case "mini_mail_tab":

                module = mail_module;
                document.getElementById("mini_weather_tab").className = "mini_module_unselected";
                document.getElementById("mini_horo_tab").className = "mini_module_unselected";
                document.getElementById("mini_mail_tab").className = "mini_module_selected";

                if (weather_module) weather_module.className = "hideDiv";
                if (horo_module) horo_module.className = "hideDiv";
                break;
        }

        module.className = "showDiv";
        module.onmouseover = function() {
            openThis(this, true);
            okCloseMini = false;
        }

        module.onmouseout = function() {
            closeThis();
            okCloseMini = true;
        }
    }
}

function openThis(obj, showOpen) {
    if (obj) {
        var objId = obj.id;
        if (showOpen) {
            obj.className = "showDiv";
        } else {
            obj.className = "hideDiv";
            // closeThis();
        }
    }
}

function openPage(url) {
    window.location=url;
}

function populate(inForm) {

    var months = document.forms[inForm].elements['month'];
    var days = document.forms[inForm].elements['day'];

    var temp = 0;
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();

    for (var i = 0; i < 31; i++) {
        var x = String(i + 1);
        days.options[i] = new Option(x, x);
    }

    for (var i = 0; i < 31; i++) {

        var d = days.options[i].value;
        if (d == day) {
            days.options[i].selected = true;
            break;
        }
    }

    for (var i = 0; i < 12; i++) {

        if (i = month) {
            months.options[i].selected = true;
            break;
        }
    }
}

function populate2(inForm2) {

    var t3 = 0;
    var months = document.forms[inForm2].elements['month'];
    var days = document.forms[inForm2].elements['day'];

    if (months.options[1].selected) {
        t3 = 28;
    } else if (months.options[8].selected || months.options[3].selected || months.options[5].selected || months.options[10].selected) {
        t3 = 30;
    } else {
        t3 = 31;
    }

    for (i = 0; i < 31; i++) {
        days.options[i] = null;
    }

    for (var i = 0; i < t3; i++) {
        var x = String(i + 1);
        days.options[i] = new Option(x);
    }
}

function closeThis() {
    callFunc(closeModule, 3000);
}

function closeModule() {
    if(okCloseMini){
        if (!weather_module && !horo_module && !mail_module) {
            getModules();
        }

        weather_module.className = "hideDiv";
        horo_module.className = "hideDiv";
        mail_module.className = "hideDiv";

        document.getElementById("mini_weather_tab").className = "mini_module_unselected";
        document.getElementById("mini_horo_tab").className = "mini_module_unselected";
        document.getElementById("mini_mail_tab").className = "mini_module_unselected";
    }
}
