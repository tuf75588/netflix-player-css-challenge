const video = document.querySelector('.video-container video');

//play button
const playButton = document.querySelector(
	'.video-container .controls button.play',
);

//rewind
const rewind = document.querySelector(
	'.video-container .controls button.rewind',
);

//fast forward
const fastForward = document.querySelector(
	'.video-container .controls button.fast-forward',
);

playButton.addEventListener('click', function(e) {
	console.log('clicked');
	video.play();
});
