const video = document.querySelector('.video-container video');

//play button
const playButton = document.querySelector(
	'.video-container .controls button.play',
);
/* listeners on different buttons

//play

//pause

*/

playButton.addEventListener('click', function(e) {
	console.log('clicked');
	video.play();
});
