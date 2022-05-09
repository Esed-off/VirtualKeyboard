
 var keyLayout =[
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace","Tab",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[","]",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";","'","enter", "Shift",
    "z", "x", "c", "v", "b", "n", "m", ",", ".","↑", "?",  
    "Control",'Fn',"Win","Alt","space", "Control", "Alt","←","↓", "→"
];


const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },



    

    init() {
        
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

       
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

       
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
       

       
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "enter", "?"].indexOf(key) !== -1;

          
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
    
 
            
           

            switch (key) {
            
                case "Shift":
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("mouseup", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });
                    keyElement.addEventListener("mousedown", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;


                case 'Alt':     
                keyElement.textContent = key.toLowerCase();          
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "";
                        this._triggerEvent("oninput");
                    });
                    break;

                    case 'Win':     
                    keyElement.textContent = key.toLowerCase();          
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "";
                            this._triggerEvent("oninput");
                        });
                        break;


                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;
                case 'Ctrl':     
                keyElement.textContent = key.toLowerCase();          
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "";
                        this._triggerEvent("oninput");
                    });
                    break;
                    case 'Fn':     
                    keyElement.textContent = key.toLowerCase();          
                        keyElement.addEventListener("click", () => {
                            this.properties.value += "";
                            this._triggerEvent("oninput");
                        });
                        break;
                        case 'Tab':     
                        keyElement.textContent = key.toLowerCase();          
                            keyElement.addEventListener("click", () => {
                                this.properties.value += "";
                                this._triggerEvent("oninput");
                            });
                            break;
                default:
                    keyElement.textContent = key.toLowerCase();
                   
                    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

  
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

document.addEventListener("keypress", (event) =>{
let list = document.querySelectorAll('button')
    for(let i = 0; i< keyLayout.length; i++){
        list[i].id = `${keyLayout[i]}`;
}


});

document.addEventListener("keydown", (event) =>{
    let list = document.querySelectorAll('button')
        for(let i = 0; i< keyLayout.length; i++){
            list[i].id = `${keyLayout[i]}`;
    }
    let ii = event.key;
    let g = 0;    
    if(ii == "Backspace"){
        ii = "backspace";
      g++;
    };
    
    if(ii == "Shift"){
        ii = "Shift";
      g++
    };

    if(ii == " "){
        ii = "space";
     g++;
    };
    
    if(ii == "CapsLock"){
         ii = "caps";
         g++;
         let jj = document.getElementById(ii);
         jj.classList.toggle("keyboard__key--active");
    };        
    if(ii == "ArrowUp"){
        ii = "↑";
        g++;
    };

    if(ii == "ArrowLeft"){
        ii = "←";
        g++;
    };

    if(ii == "ArrowDown"){
        ii = "↓";
       g++;
    };
    if(ii == "ArrowRight"){
        ii = "→";
        g++;
    };
    
    if(ii == "Meta"){
        ii = "Win";
        g++;
     
    };
    if(ii == "Control"){
        ii = "Control";
        g++;
   };
    
   if(ii == "Alt"){
    ii = "Alt";
    g++;
};

    if(g<1){
        let j = String(ii.toLowerCase());
        ii = j;
   }
let gg = document.getElementById(ii);
   console.log('event == > /'+ event.key+'/   test ==>' + ii); 
gg.classList.add("active")
    });
    
    
    
    document.addEventListener("keyup", (event) =>{
        let list = document.querySelectorAll('button')
            for(let i = 0; i< keyLayout.length; i++){
                list[i].id = `${keyLayout[i]}`;
        }
        let ii = event.key;
        let g = 0;
        
        if(ii == "Backspace"){
            ii = "backspace";
          g++;
        };
        
        if(ii == "Shift"){
            ii = "Shift";
          g++
        };
    
        if(ii == " "){
            ii = "space";
         g++;
        };
        
        if(ii == "ArrowUp"){
            ii = "↑";
            g++;
        };

        if(ii == "ArrowLeft"){
            ii = "←";
            g++;
        };

        if(ii == "ArrowDown"){
            ii = "↓";
            g++;
        };
        if(ii == "ArrowRight"){
            ii = "→";
            g++;
        };
        if(ii == " "){
            ii = "space";
            g++;
        };
        
        if(ii == "CapsLock"){
             ii = "caps";
             g++;
        };        
       
        if(ii == "Control"){
            ii = "Control";
            g++;
       };
        
       if(ii == "Alt"){
        ii = "Alt";
        g++;
   };

        
        if(ii == "Meta"){
            ii = "Win";
            g++;
        };
        if(g<1){
            let j = String(ii.toLowerCase());
            ii = j;
       }
       let gg = document.getElementById(ii);
        
        console.log('event == > /'+ event.key+'/   test ==>' + ii);
        
    gg.classList.remove("active")
        
        });
    

