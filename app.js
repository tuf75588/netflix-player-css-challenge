const video = document.querySelector('.video-container video');
const videoContainer = document.querySelector('.video-container');
// play button
const playButton = document.querySelector(
	'.video-container .controls button.play',
);
// rewind
const rewind = document.querySelector(
	'.video-container .controls button.rewind',
);
// fast forward
const fastForward = document.querySelector(
	'.video-container .controls button.fast-forward',
);
// volume
const toggleVolume = document.querySelector(
	'.video-container .controls button.volume',
);

const fullScreen = document.querySelector(
	'.video-container .controls button.full-screen',
);

// eslint-disable-next-line
playButton.addEventListener('click', () => {
	if (video.paused) {
		// we are in a paused state, on next click the video will play
		video.play();
	} else {
		video.pause();
	}
});

fastForward.addEventListener('click', () => {
	video.currentTime += 10;
});

rewind.addEventListener('click', () => {
	video.currentTime -= 10;
});

// toggle between mute states
toggleVolume.addEventListener('click', () => {
	video.muted = !video.muted;
});

fullScreen.addEventListener('click', () => {
	if (!document.fullscreenElement) {
		videoContainer.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
