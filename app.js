/* eslint-disable no-use-before-define */
/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
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

// this watched bar is what displays how much of the video has been watched so far.
const watchedBar = document.querySelector(
	'.video-container .progress-controls .watched-bar',
);

// element for showing how much time is left in the video
const timeLeft = document.querySelector(
	'.video-container .progress-controls .time-remaining',
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
toggleVolume.addEventListener('click', toggleMute);

fullScreen.addEventListener('click', () => {
	if (!document.fullscreenElement) {
		videoContainer.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

function handleSpecificKeyPress(e) {
	if (e.code === 'Space') {
		if (video.paused) video.play();
		else video.pause();
	}
	if (e.code === 'KeyM') {
		// eslint-disable-next-line
		toggleMute();
	}
}

function toggleMute() {
	video.muted = !video.muted;
}

document.addEventListener('keydown', handleSpecificKeyPress);

video.addEventListener('timeupdate', () => {
	// eslint-disabled-next-line

	watchedBar.style.width = (video.currentTime / video.duration) * 100 + '%';
	const totalSecondsRemaining = video.duration - video.currentTime;
	const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
	let secondsRemaining = Math.floor(totalSecondsRemaining % 60);
	secondsRemaining =
		secondsRemaining < 10 ? '0' + secondsRemaining : secondsRemaining;
	// eslint-disable-next-line

	timeLeft.textContent = minutesRemaining + ':' + secondsRemaining;
});
