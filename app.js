/* eslint-disable no-use-before-define */
/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
const video = document.querySelector('.video-container video');
const videoContainer = document.querySelector('.video-container');
const controlsContainer = document.querySelector('.video-container .controls-container');

const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
const rewindButton = document.querySelector('.video-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls button.volume');
const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');
const playButton = playPauseButton.querySelector('.playing');
const pauseButton = playPauseButton.querySelector('.paused');

const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');

const progressBar = document.querySelector('.video-container .progress-controls .progress-bar');
const watchedBar = document.querySelector('.video-container .progress-controls .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .progress-controls .time-remaining');
// eslint-disable-next-line

playPauseButton.addEventListener('click', () => {
	if (video.paused) {
		// we are in a paused state, on next click the video will play
		video.play();
		playButton.style.display = 'none';
		pauseButton.style.display = '';
	} else {
		video.pause();
		playButton.style.display = '';
		pauseButton.style.display = 'none';
	}
});

// make sure some svgs do not display below their counterpart
mutedButton.style.display = 'none';

let controlsTimeout;
controlsContainer.style.opacity = '0';
watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';

const displayControls = () => {
	controlsContainer.style.opacity = '1';
	document.body.style.cursor = 'initial';
	if (controlsTimeout) {
		clearTimeout(controlsTimeout);
	}
	controlsTimeout = setTimeout(() => {
		controlsContainer.style.opacity = '0';
		document.body.style.cursor = 'none';
	}, 5000);
};

document.addEventListener('mouseover', (event) => {
	controlsContainer.style.display = '';
	controlsContainer.classList.toggle('active');
});

fastForwardButton.addEventListener('click', () => {
	video.currentTime += 10;
});

rewindButton.addEventListener('click', () => {
	video.currentTime -= 10;
});

// toggle between mute states
volumeButton.addEventListener('click', toggleMute);

// toggling full screen on video player
fullScreenButton.addEventListener('click', () => {
	if (!document.fullscreenElement) {
		videoContainer.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

function handleSpecificKeyPress(e) {
	if (e.code === 'Space') {
		if (video.paused) {
			video.play();
			pauseButton.style.display = '';
			playButton.style.display = 'none';
		} else {
			video.pause();
			pauseButton.style.display = 'none';
			playButton.style.display = '';
		}
	}
	if (e.code === 'KeyM') {
		// eslint-disable-next-line
		toggleMute();
	}
	if (e.code === 'KeyF') {
		toggleFullScreen();
	}
	displayControls();
}

function toggleFullScreen() {
	if (!document.fullscreenElement) {
		videoContainer.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

function toggleMute() {
	video.muted = !video.muted;
	if (video.muted) {
		fullVolumeButton.style.display = 'none';
		mutedButton.style.display = '';
	} else {
		fullVolumeButton.style.display = '';
		mutedButton.style.display = 'none';
	}
}
/*
use native fullscreen event change handler
for handling button press of escape to exit video full screen
*/

document.addEventListener('fullscreenchange', (event) => {
	if (!document.fullscreenElement) {
		maximizeButton.style.display = '';
		minimizeButton.style.display = 'none';
	} else {
		maximizeButton.style.display = 'none';
		minimizeButton.style.display = '';
	}
});
document.addEventListener('keydown', handleSpecificKeyPress);

video.addEventListener('timeupdate', () => {
	// eslint-disabled-next-line

	watchedBar.style.width = video.currentTime / video.duration * 100 + '%';
	const totalSecondsRemaining = video.duration - video.currentTime;
	const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
	let secondsRemaining = Math.floor(totalSecondsRemaining % 60);
	secondsRemaining =

			secondsRemaining < 10 ? '0' + secondsRemaining :
			secondsRemaining;
	// eslint-disable-next-line

	timeLeft.textContent = minutesRemaining + ':' + secondsRemaining;
});

/*
thanks to MDN for the code to properly scrub the progress bar
and adjust the time left in the video accordingly.
*/

// if i click somewhere in the bar, adjust the time.
progressBar.addEventListener('click', (e) => {
	const pos = (e.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
	video.currentTime = pos * video.duration;
});

// toggle display controls function on mousemoving too
document.addEventListener('mousemove', () => {
	displayControls();
});
