function formatData(number){
    if(number>=10000000){
        const value= Math.floor((number / 10000000) *100)/100;
        return value+ 'Cr'
    }
    else if(number >= 100000){
        const value= Math.floor((number / 100000) * 100)/ 100;
        return value+ ' Lakh'
    }
    else{
        return number.toString();
    }
}

module.exports= formatData