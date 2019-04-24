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

    $('#buildItemRarity').change((e)=>{
        //prevents POST from occuring
        e.preventDefault();
        //grab data from page
        let rarityName = $("option[name=\"buildRarityOption\"]:selected").val();
        console.log(rarityName);
        //send data to post
        $.ajax({
            url: "/selectRarity",
            method: "POST",
            data:{
                rarityName:rarityName,
            }
        }) //catch data from post
        .done((data)=>{
            $("#rarity").html("<h2>"+data.rarityName+"</h2>");
        })
        .fail((xhr)=>{
            console.log("An Error occured");
        }).change();
    })

    //THIS WILL EVENTUALLY UPDATE THE IMAGE
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
