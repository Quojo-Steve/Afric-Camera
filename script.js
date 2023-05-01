// const videoButton = document.getElementById('main__video-button');
// const video = document.getElementById('main__video');

// let mediaRecorder;

// videoButton.onclick = () => {
//     switch (videoButton.textContent) {
//         case 'Record':
//             videoButton.textContent = 'Stop';
//             startRecording();
//             break;
//         case 'Stop':
//             videoButton.textContent = 'Record';
//             stopRecording();
//             break;
//     }

// }

// async function init() {
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true,
//             video: true
//         });
//         startWebCamera(stream);
//     } catch (err) {
//         console.log('Error retrieving media device.')
//         console.log(err)
//     }

// }

// function startWebCamera(stream) {
//     video.srcObject = stream;
//     window.stream = stream;
// }

// function startRecording() {
//     if (video.srcObject === null) {
//         video.srcObject = window.stream;
//     }
//     mediaRecorder = new MediaRecorder(window.stream, { mimeType: 'video/webm;codecs=vp9,opus' });
//     mediaRecorder.start();
//     mediaRecorder.ondataavailable = recordVideo;
// }

// function recordVideo(e) {
//     if (e.data && e.data.size > 0) {
//         video.srcObject = null;
//         let videoUrl = URL.createObjectURL(e.data);
//         console.log(videoUrl);
//         video.src = videoUrl;
//     }
// }

// function stopRecording() {
//     mediaRecorder.stop();
// }

// init();

const videoButton = document.getElementById('main__video-button');
const video = document.getElementById('main__video');
const saveButton = document.getElementById('main__save-button');

let mediaRecorder;
let recordedChunks = [];

videoButton.onclick = () => {
    switch (videoButton.textContent) {
        case 'Record':
            videoButton.textContent = 'Stop';
            startRecording();
            break;
        case 'Stop':
            videoButton.textContent = 'Record';
            stopRecording();
            break;
    }
}

saveButton.onclick = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recorded-video.webm';
    a.click();
    window.URL.revokeObjectURL(url);
}

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        startWebCamera(stream);
    } catch (err) {
        console.log('Error retrieving media device.')
        console.log(err)
    }
}

function startWebCamera(stream) {
    video.srcObject = stream;
    window.stream = stream;
}

function startRecording() {
    if (video.srcObject === null) {
        video.srcObject = window.stream;
    }
    mediaRecorder = new MediaRecorder(window.stream, { mimeType: 'video/webm;codecs=vp9,opus' });
    mediaRecorder.start();
    mediaRecorder.ondataavailable = (e) => {
        recordedChunks.push(e.data);
    }
}

function stopRecording() {
    mediaRecorder.stop();
    saveButton.style.display = 'block';
}

init();
