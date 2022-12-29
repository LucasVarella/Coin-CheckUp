let coin = 'bitcoin'

function btc(){
    fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then(response =>response.json())
    .then(data => {
        console.log(data);
        
        if(!localStorage.getItem('price')){
            localStorage.setItem('price',0);
        }
    
        var price = parseFloat(data.data.priceUsd).toFixed(2);

        let h1_price = document.querySelector('#price');
        let spaceString ='\xa0';
        let priceString = '$'.concat(spaceString.concat(new String(price)));
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
        
        var marketcap = parseFloat(data.data.marketCapUsd).toFixed(2);
        document.querySelector('#marketcap').innerHTML = marketcap;
        localStorage.setItem('marketcap',marketcap);

        var supply = parseFloat(data.data.supply).toFixed(2);
        document.querySelector('#supply').innerHTML = supply;
        localStorage.setItem('supply',supply);
        
        var volume = parseFloat(data.data.volumeUsd24Hr).toFixed(2);
        document.querySelector('#volume').innerHTML = volume;
        localStorage.setItem('volume',volume);

        var variation = parseFloat(data.data.changePercent24Hr).toFixed(2);

        variationString = new String(variation).concat(spaceString).concat('%');

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

        var vwap = parseFloat(data.data.vwap24Hr).toFixed(2);
        let vwapString ='$'.concat(spaceString.concat(new String(vwap)));
        document.querySelector('#vwap').innerHTML = vwapString;
        localStorage.setItem('vwap',vwapString);



        
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