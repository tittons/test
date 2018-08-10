var detector = {
    getBrowser: function(){
        for (var i=0; i<this.browserList.length; i++){
            var item = this.browserList[i]
            if(navigator.userAgent.indexOf(item.userAgent)!=-1) return item.browser;
        }
        return "unknown";
    },
    getOS: function(){
        for (var i=0; i<this.osList.length; i++){
            var item = this.osList[i]
            if(navigator.platform.indexOf(item.platform)!=-1){
                return item.os;
            }else if(navigator.userAgent.indexOf(item.userAgent)!=-1){
                return item.os;
            }
        }
        return "unknown"
    },
    getFullIdentity: function(){
        var url = "http://ip-api.com/json";
        if(fetch !== undefined){
            fetch(url)
                .then(res=>res.json(), err=>console.log(err))
                .then(data=>{
                    const text = `Ваш браузер: ${this.getBrowser()}, ваша ОС: ${this.getOS()}, ваша страна: ${data.country}`;
                    this.updateHTML(text)
            });
        }else{
            var xmlhttp = new XMLHttpRequest();
            var self = this;
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    var text = "Ваш браузер: "+self.getBrowser()+", ваша ОС: "+self.getOS()+", ваша страна: "+data.country;
                    self.updateHTML(text)
                }
            };
            xmlhttp.open('GET', url);
            xmlhttp.send();
        }
    },
    updateHTML: function(text){
        var messageContainer = document.getElementById("test-message");
        messageContainer.innerHTML = text;
    },
    browserList: [
        {
            userAgent: "Opera",
            browser: "Opera"
        },
        {
            userAgent: "OPR",
            browser: "Opera"
        },
        {
            userAgent: "Apple",
            browser: "Safari"
        },
        {
            userAgent: "MSIE",
            browser: "Internet Explorer"
        },
        {
            userAgent: "Chrome",
            browser: "Chrome"
        },
        {
            userAgent: "Firefox",
            browser: "Firefox"
        }
    ],
    osList: [
        {
            platform: "Win",
            os: "Windows"
        },
        {
            platform: "Mac",
            os: "Mac"
        },
        {
            userAgent: "iPhone",
            os: "iPhone/iPod"
        },
        {
            platform: "Linux",
            os: "Linux"
        }
    ]
}

detector.getFullIdentity()