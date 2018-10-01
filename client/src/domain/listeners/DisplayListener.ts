// export class DisplayListener {
//     private canvas: any;
//     private canvasContext: any;
//     private last16thNoteDrawn: number = -1;
//
//     constructor() {
//         let container = document.createElement('div');
//
//         container.className = "container";
//         this.canvas = document.createElement('canvas');
//         this.canvasContext = this.canvas.getContext('2d');
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
//         document.body.appendChild(container);
//         container.appendChild(this.canvas);
//         this.canvasContext.strokeStyle = "#ffffff";
//         this.canvasContext.lineWidth = 2;
//
//         // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
//         // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
//         // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
//         // spec-compliant, and work on Chrome, Safari and Firefox.
//
//         // if we wanted to load audio files, etc., this is where we should do it.
//
//         window.onorientationchange = this.resetCanvas;
//         window.onresize = this.resetCanvas;
//
//         window.requestAnimFrame(this.draw);
//
//         window.requestAnimFrame = (function () {
//             return window.requestAnimationFrame ||
//                 window.webkitRequestAnimationFrame ||
//                 window.mozRequestAnimationFrame ||
//                 window.oRequestAnimationFrame ||
//                 window.msRequestAnimationFrame ||
//                 function (callback) {
//                     window.setTimeout(callback, 1000 / 60);
//                 };
//         })();
//     }
//
//     private resetCanvas(e) {
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
//
//         window.scrollTo(0, 0);
//     }
//
//     private draw() {
//         var currentNote = this.last16thNoteDrawn;
//         var currentTime = this.audioContext.currentTime;
//
//         while (notesInQueue.length && notesInQueue[0].time < currentTime) {
//             currentNote = notesInQueue[0].note;
//             notesInQueue.splice(0, 1);   // remove note from queue
//         }
//
//         // We only need to draw if the note has moved.
//         if (this.last16thNoteDrawn != currentNote) {
//             var x = Math.floor(this.canvas.width / 18);
//             this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
//             for (var i = 0; i < 16; i++) {
//                 this.canvasContext.fillStyle = ( currentNote == i ) ?
//                     ((currentNote % 4 === 0) ? "red" : "blue") : "black";
//                 this.canvasContext.fillRect(x * (i + 1), x, x / 2, x / 2);
//             }
//
//             this.last16thNoteDrawn = currentNote;
//         }
//
//         this.requestAnimFrame(draw);
//     }
// }