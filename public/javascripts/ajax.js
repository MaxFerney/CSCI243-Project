//const ItemList = require('./../itemData.json');

$(document).ready(()=>{
    $('#submit').on('click',(e)=>{
        //prevents POST from occuring
        e.preventDefault();
        //grab data from page
        let itemName = $("option[name=\"buildItemOption\"]:selected").val();
        let amount = $("#buildAmount").val();
        //send data to post
        $.ajax({
            url: "/buildMe",
            method: "POST",
            data:{
                itemName:itemName,
                amount:amount
            }
        }) //catch data from post
        .done((data)=>{
            $("#result").html("<h2>Results:</h2>"+
            "<table>"+
            "<tr><td>NAME:</td> <td>"+data.name+"</td></tr>"+
            "<tr><td>AMOUNT:</td> <td>"+data.amount+"</td></tr>"+
            "<tr><td>TOTAL:</td> <td>"+data.calcInfo+"</td></tr>"+
            "</table>");
        })
        .fail((xhr)=>{
            console.log("An Error occured");
        });
    })






    //THIS WILL EVENTUALLY UPDATE THE IMAGE
    // $('#buildItemOption').change((e)=>{
    //     //prevents POST from occuring
    //     e.preventDefault();
    //     //grab data from page
    //     let itemName = $("option[name=\"buildItemOption\"]:selected").val();
    //
    //     console.log(itemName);
    //     for (var i=0;i<ItemList.length;i++){
    //         if(itemName == ItemList[i].name){
    //             let itemObject = ItemList[i]
    //         }
    //         else{
    //             console.log("HOW DID YOU EVEN GET HERE?????")
    //         }
    //     }
    //     let itemImage = itemObject.imageLink;
    //     //send data to post
    //     $.ajax({
    //         url: "/updateImage",
    //         method: "POST",
    //         data:{
    //             itemName:itemName,
    //             itemImage:itemImage
    //         }
    //     }) //catch data from post
    //     .done((data)=>{
    //         $("#image").html("<img src="+data.imageLink+" alt="+data.itemName+">");
    //     })
    //     .fail((xhr)=>{
    //         console.log("An Error occured");
    //     }).change();
    // })








    // $('#buildItemImage').on('click',(e)=>{
    //     e.preventDefault();
    //     $.ajax({
    //         url: "/buildMe",
    //         method: "POST",
    //         data:{
    //             itemName:itemName,
    //             amount:amount
    //         }
    //     }) //catch data from post
    //     .done((data)=>{
    //         $("#result").html("Result: |NAME: "+data.name+" | AMOUNT "+data.amount+" | TOTAL: "+data.calcInfo+"|");
    //     })
    //     .fail((xhr)=>{
    //         console.log("An Error occured");
    //     });
    // })
});
