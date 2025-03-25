posició = [1,2,3,4,5,6,7,8]
colors = ['red','blue','yellow','green','purple','pink','orange','black']


async function mostrar_colors(temps){
    for (let i=0;i<colors.length;i++){
        //TODO instruccions per mostrar el color. Per exemple

        //Crida al mètode esperar
        await esperar(temps);
        console.log(colors[Math.floor(Math.random() * 9)]);
    }
}
function esperar(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

mostrar_colors(500);