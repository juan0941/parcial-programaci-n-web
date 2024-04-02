document.addEventListener('DOMContentLoaded', () => {
    let contenedorLenguaje1 = document.querySelector('#contenedorLenguaje1');
    let contenedorLenguaje2 = document.querySelector('#contenedorLenguaje2');
    let traducir = document.querySelector('#traducir');
    let palabraTraducida = document.querySelector('#palabraTraducida');

    let lenguaje1code;
    let lenguaje2code;

    const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b8e060530mshac4e4143a828ceap19cd84jsn64fece3baac5',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(objeto => {
            let languages = objeto.data.languages;
            languages.forEach(elemento => {
                contenedorLenguaje1.innerHTML += `<option value="${elemento.code}">${elemento.name}</option>`;
                contenedorLenguaje2.innerHTML += `<option value="${elemento.code}">${elemento.name}</option>`;
            });
            contenedorLenguaje1.addEventListener('change', () => {
                console.log(contenedorLenguaje1.value);
                lenguaje1code = contenedorLenguaje1.value;
            });
            contenedorLenguaje2.addEventListener('change', () => {
                console.log(contenedorLenguaje2.value);
                lenguaje2code = contenedorLenguaje2.value;
            });
        })
        .catch(err => console.log(err));


    traducir.addEventListener('click', () => {
        let palabraTraducir = document.querySelector('#palabraTraducir');
        let textoATraducir = palabraTraducir.value;

        const encodedParams = new URLSearchParams();
        encodedParams.append("source_language", lenguaje1code);
        encodedParams.append("target_language", lenguaje2code);
        encodedParams.append("text", textoATraducir);

        const post_option = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '3b8e060530mshac4e4143a828ceap19cd84jsn64fece3baac5',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            body: encodedParams
        }

        fetch('https://text-translator2.p.rapidapi.com/translate', post_option)
            .then(response => response.json())
            .then(response => {
                console.log(response.data); // para verificar la estructura de la respuesta
                palabraTraducida.value = response.data.translatedText; // corregido aquí
            })
            .catch(err => console.error(err));
    });
});
