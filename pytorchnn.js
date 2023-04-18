(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
	`;

	class PytorchNN extends HTMLElement {
		constructor() {
			super(); 

			let shadowRoot = this.attachShadow({mode: "open"});
			let newNode = template.content.cloneNode(true)
			shadowRoot.appendChild(newNode);

			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);

				/*
				callNNService().then(
					function(jsonData) {
						if(jsonData != null) {
							jsonData.forEach(e => {
								var p = document.createElement('p');
					    		p.innerHTML = JSON.stringify(e);
					    		newNode.appendChild(p);
							});
						}
						else {
							var p = document.createElement('p');
				    		p.innerHTML = "Data is null.";
				    		newNode.appendChild(p);
						}
					},
					function(err) {
						console.log(err);
					}
				);*/
			});
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			
		}

		async function callNNService() {
		  const response = await fetch("http://127.0.0.1:5000/api/v1/resources/models/cnn");
		  const jsonData = await response.json();
		  console.log(jsonData);
		  return jsonData;
		}
	}

	customElements.define("com-sap-sample-pytorchnn", PytorchNN);
})();