let coin = 'bitcoin'

function btc(){
    fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then(response =>response.json())
    .then(data => {
        console.log(data);
        
        if(!localStorage.getItem('price')){
            localStorage.setItem('price',0);
        }
    
        let price = parseFloat(data.data.priceUsd).toFixed(2);
        let priceString = Number(price).toLocaleString("pt-BR", {style:"currency", currency:"USD"});
        let h1_price = document.querySelector('#price');
        h1_price.innerHTML = priceString;
        localStorage.setItem('priceString',priceString);

        let p_price = localStorage.getItem('price');
        localStorage.setItem('price',price);
        if(price == p_price){
            h1_price.style.color = 'black';
        }else{
            if(price > p_price){
                h1_price.style.color = 'green';
            }else{
                h1_price.style.color = 'red';
            }
        }     
        
        let marketcap = parseFloat(data.data.marketCapUsd).toFixed(2);
        marketcap = Number(marketcap).toLocaleString("pt-BR", {style:"currency", currency:"USD"});
        document.querySelector('#marketcap').innerHTML = marketcap;
        localStorage.setItem('marketcap',marketcap);

        let supply = parseFloat(data.data.supply).toFixed(2);
        document.querySelector('#supply').innerHTML = supply;
        localStorage.setItem('supply',supply);
        
        let volume = parseFloat(data.data.volumeUsd24Hr).toFixed(2);
        volume = Number(volume).toLocaleString("pt-BR", {style:"currency", currency:"USD"});
        document.querySelector('#volume').innerHTML = volume;
        localStorage.setItem('volume',volume);

        let variation = parseFloat(data.data.changePercent24Hr).toFixed(2);

        variationString = new String(variation).concat("\xa0").concat('%');

        document.querySelector('#variation').innerHTML = variationString;
        localStorage.setItem('variation',variation);
        localStorage.setItem('variationString', variationString);
        if (variation < 0){
            document.querySelector('#variation').style.color = 'red';
        }else{
            if(variation == 0){
                document.querySelector('#variation').style.color = 'blue';
            }else{
                document.querySelector('#variation').style.color = 'green';
            }
        }

        let vwap = parseFloat(data.data.vwap24Hr).toFixed(2);
        vwap = Number(vwap).toLocaleString("pt-BR", {style:"currency", currency:"USD"});
        document.querySelector('#vwap').innerHTML = vwap;
        localStorage.setItem('vwap',vwap);
        
        



        
    });
}



document.addEventListener('DOMContentLoaded', function(){

    document.querySelector('#price').innerHTML = localStorage.getItem('priceString');
    document.querySelector('#variation').innerHTML = localStorage.getItem('variationString');
    document.querySelector('#vwap').innerHTML = localStorage.getItem('vwap');
    document.querySelector('#marketcap').innerHTML = localStorage.getItem('marketcap');
    document.querySelector('#volume').innerHTML = localStorage.getItem('volume');
    document.querySelector('#supply').innerHTML = localStorage.getItem('supply');

    setInterval(btc, 500)       
    
    document.querySelectorAll('.div-coin').forEach(function(div){
        div.onclick = function(){
            coin = div.dataset.name;
            setTimeout(function (){
                document.querySelector('#coin-logo').setAttribute('src', `imgs/coin-logo/${coin}.png`);
            }, 500);
            
        }
    });

    
});