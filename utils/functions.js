const Calc = {
    additiveStack(firstVal,stackVal,amount){
        var total=firstVal;
        for(var i=0;i<amount-1;i++){
            total+=stackVal;
        }
        return total;
    },
    itemSuffix(item){
        if (item.stackingType1=="percentage"){
            var suffix1="%";
        }
        else{
            var suffix1="";
        }
        var suffix2="";
        if (item.stackingVar2 != null){
            if (item.stackingType2=="percentage"){
                var suffix2="%";
            }
            else{
                var suffix2="";
            }
        }
        return [suffix1,suffix2];
    }
}
module.exports = Calc;
