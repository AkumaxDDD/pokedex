const contenedor = document.getElementById("contenedor");
        const card = document.getElementById("card");
        const mostrar = document.getElementById("mostrar");
        const imgPoke = document.getElementById("img");
        const buscar = document.getElementById("buscar");
        const info = document.getElementById("info");
        const nombre = document.getElementById("nombre");
        const detalles = document.getElementById("detalles");
        const tipo = document.getElementById("tipo");
        const audio = document.getElementById("audio");
        const tiposo = document.getElementById("tiposo");
        const opciones = document.getElementById("opciones");
        
        mostrar.addEventListener("click", async () => {
            if(tiposo){
                tiposo.remove()
            }
                body.appendChild(contenedor)
            contenedor.style.display = 'block';
            if (buscar.value.charAt(0) === buscar.value.charAt(0).toUpperCase()){
                buscar.value.charAt(0).toLowerCase += buscar.value.slice(1)
            } 
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${buscar.value.toLowerCase()}`);
            if (res.ok) {
                const pokemon = await res.json();
                imgPoke.style.background = `url(${pokemon.sprites.front_default}) no-repeat`;
                imgPoke.style.backgroundSize = "cover";
                imgPoke.style.zIndex="1"
                nombre.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                detalles.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;
                tipo.textContent = `Type: ${pokemon.types.map(t => t.type.name).join(', ')}`;
                audio.src=pokemon.cries.latest
            }
        });

        opciones.addEventListener("change", async () => {
            body.appendChild(tiposo)
            if(contenedor){
                contenedor.remove()
            }
            while (tiposo.firstChild) {
                tiposo.removeChild(tiposo.firstChild);
            }
            const res = await fetch(`https://pokeapi.co/api/v2/type/${opciones.value}/`);
            if (res.ok) {
                const data = await res.json();
                data.pokemon.forEach(async (p) => {
                    const pokeRes = await fetch(p.pokemon.url);
                    if (pokeRes.ok) {
                        const pokeData = await pokeRes.json();
                        if (pokeData.sprites.front_default) {
                            const li = document.createElement("li");
                            const img = document.createElement("img");
                            img.src = pokeData.sprites.front_default;
                            img.style.width = "180px";
                            li.textContent =`${pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}, (ID ${pokeData.id})` ;
                            li.style.display="flex"
                            li.style.flexDirection="column"
                            li.style.alignItems="center"
                            li.appendChild(img);
                            tiposo.appendChild(li);
                        }
                    }
                });
            }
        });
