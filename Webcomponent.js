(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<button type="button" id="myBtn">Helper Button</button>` ;   

    class PerformanceHelp extends HTMLElement {
        constructor() {
            super();
            this.init();           
        }

        init() {            
              
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(tmpl);

            this.addEventListener("click", event => {
                callNNService().then(
                    function(jsonData) {
                        if(jsonData != null) {
                            jsonData.forEach(e => {
                                var p = document.createElement('p');
                                p.innerHTML = JSON.stringify(e);
                                tmpl.appendChild(p);
                            });
                        }
                        else {
                            var p = document.createElement('p');
                            p.innerHTML = "Data is null.";
                            tmpl.appendChild(p);
                        }
                    },
                    function(err) {
                        console.log(err);
                    }
                );

            });

            async function callNNService() {
              const response = await fetch("http://127.0.0.1:5000/api/v1/resources/models/cnn");
              const jsonData = await response.json();
              console.log(jsonData);
              return jsonData;
            }

        }

        fireChanged() {
            console.log("OnClick Triggered");     
            
        }        
        
    }

    customElements.define('custom-button', PerformanceHelp);
})();