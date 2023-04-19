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
			let newNode = template.content.cloneNode(true);
			shadowRoot.appendChild(newNode);

			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);

				
			});
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			
		}

		
	}

	customElements.define("com-sap-sample-pytorchnn", PytorchNN);
})();