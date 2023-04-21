
const video3 = document.getElementsByClassName('input_video3')[0];
const out3 = document.getElementsByClassName('output3')[0];
const controlsElement3 = document.getElementsByClassName('control3')[0];
const canvasCtx3 = out3.getContext('2d');
const fpsControl = new FPS();
var sequence = [];
let model;
var counter=0;
var result=document.getElementById("result");
(async function () {
    model = await tf.loadLayersModel('model.json');

})();

var label = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// var label = [ 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};

function onResultsHands(results) {
    document.body.classList.add('loaded');
    // fpsControl.tick();

    canvasCtx3.save();
    canvasCtx3.clearRect(0, 0, out3.width, out3.height);
    canvasCtx3.drawImage(
        results.image, 0, 0, out3.width, out3.height);
    if (results.multiHandLandmarks && results.multiHandedness) {
        var arr = [];

        for (let index = 0; index < results.multiHandLandmarks.length; index++) {
            const classification = results.multiHandedness[index];
            const isRightHand = classification.label === 'Right';
            const landmarks = results.multiHandLandmarks[index];
            // console.log(landmarks);
            drawConnectors(
                canvasCtx3, landmarks, HAND_CONNECTIONS,
                { color: isRightHand ? '#00FF00' : '#9cb3f7',lineWidth: 3 }),
                drawLandmarks(canvasCtx3, landmarks, {
                    
                    color: isRightHand ? '#f54242' : '#792CFA',
                    radius:2
                    // fillColor: isRightHand ? '#FF0000' : '#00FF00',
                    // radius: (x) => {
                    //   return lerp(x.from.z, -0.15, .1, 10, 1);
                    // }
                });

            for (let i = 0; i < landmarks.length; i++) {
                arr.push(landmarks[i]['x']);
                arr.push(landmarks[i]['y']);
                arr.push(landmarks[i]['z']);
            }
            if (results.multiHandLandmarks.length === 1 && !isRightHand) {
                const arr1 = new Array(63).fill(0.00);
                arr = arr1.concat(arr);
            }
            else if (results.multiHandLandmarks.length === 1 && isRightHand) {
                const arr1 = new Array(63).fill(0.00);
                arr = arr.concat(arr1);
               
            }



        }
        ++counter;
        sequence.push(arr);
        //  console.log(sequence)
        if (sequence.length > 30)
            sequence = sequence.slice(1);
       
            
        if (counter %10===0 && counter>30) {
            // console.log("dfgdfg");
            (async function () {
                var data = tf.tensor2d(sequence);
                data = data.expandDims(0);
                try{let predictions = await model.predict(data).dataSync();
                
                const gesture = Math.max(...predictions);
                result.innerHTML=label[predictions.indexOf(gesture)];
                // console.log(label[predictions.indexOf(gesture)]);
            }
                catch(e){
                    console.log("error");
                }
                

            })();
        }


    }
    canvasCtx3.restore();
}

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
    }
});
hands.onResults(onResultsHands);

const camera = new Camera(video3, {
    onFrame: async () => {
        await hands.send({ image: video3 });
    },
    width: 1280,
    height: 720
});
camera.start();

new ControlPanel(controlsElement3, {
    selfieMode: true,
    maxNumHands: 2,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.4
})
    .add([
        new StaticText({ title: 'MediaPipe Hands' }),
        fpsControl,
        new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
        new Slider(
            { title: 'Max Number of Hands', field: 'maxNumHands', range: [1, 4], step: 1 }),
        new Slider({
            title: 'Min Detection Confidence',
            field: 'minDetectionConfidence',
            range: [0, 1],
            step: 0.01
        }),
        new Slider({
            title: 'Min Tracking Confidence',
            field: 'minTrackingConfidence',
            range: [0, 1],
            step: 0.01
        }),
    ])
    .on(options => {
        video3.classList.toggle('selfie', options.selfieMode);
        hands.setOptions(options);
    });