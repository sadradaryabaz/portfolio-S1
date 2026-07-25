let matrixRunning = false;
let matrixCanvas = null;
let matrixCtx = null;
let matrixInterval = null;

function matrix(){

    if(matrixRunning){

        stopMatrix();
        return;

    }

    startMatrix();

}

function startMatrix(){

    matrixRunning = true;

    matrixCanvas = document.createElement("canvas");

    matrixCanvas.id = "matrixCanvas";

    matrixCanvas.style.position = "fixed";
    matrixCanvas.style.top = "0";
    matrixCanvas.style.left = "0";
    matrixCanvas.style.width = "100%";
    matrixCanvas.style.height = "100%";
    matrixCanvas.style.zIndex = "99999";
    matrixCanvas.style.background = "black";

    document.body.appendChild(matrixCanvas);

    matrixCtx = matrixCanvas.getContext("2d");

    resizeMatrix();

    const letters =
        "アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

    const fontSize = 16;

    let columns = Math.floor(matrixCanvas.width / fontSize);

    let drops = [];

    for(let i=0;i<columns;i++){

        drops[i]=1;

    }

    matrixInterval = setInterval(function(){

        matrixCtx.fillStyle = "rgba(0,0,0,0.05)";

        matrixCtx.fillRect(
            0,
            0,
            matrixCanvas.width,
            matrixCanvas.height
        );

        matrixCtx.fillStyle = "#00ff00";

        matrixCtx.font = fontSize+"px monospace";

        for(let i=0;i<drops.length;i++){

            const text =
                letters[Math.floor(Math.random()*letters.length)];

            matrixCtx.fillText(
                text,
                i*fontSize,
                drops[i]*fontSize
            );

            if(
                drops[i]*fontSize > matrixCanvas.height &&
                Math.random()>0.975
            ){

                drops[i]=0;

            }

            drops[i]++;

        }

    },33);

}

function stopMatrix(){

    matrixRunning = false;

    clearInterval(matrixInterval);

    if(matrixCanvas){

        matrixCanvas.remove();

    }

}

function resizeMatrix(){

    matrixCanvas.width = window.innerWidth;

    matrixCanvas.height = window.innerHeight;

}

window.addEventListener("resize",()=>{

    if(matrixRunning){

        resizeMatrix();

    }

});

window.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        stopMatrix();

    }

});