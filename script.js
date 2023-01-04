document.addEventListener('DOMContentLoaded', function () {
  const tracksList = [
     {
      audioSrc:
        './tracks/johan.mp3',
      coverSrc: './images/Johan.jpg',
      name: 'Johan Liebert',
      desc: 'Monster',
      id: 0,
    },
    {
      audioSrc: './tracks/heatwaves.mp3',
      coverSrc: './images/glass.jpg',
      name: 'Heat Waves',
      desc: 'Glass Animals',
      id: 1,
    },
    {
      audioSrc: './tracks/ghostj.mp3',
      coverSrc: './images/justin.jpg',
      name: 'Justin Bieber',
      desc: 'Ghost',
      id: 2,
    },
    {
      audioSrc: './tracks/Seafret  Atlantis.mp3',
      coverSrc: './images/seafret.jpg',
      name: 'Seafret',
      desc: 'Atlantis',
      id: 3,
    },
    {
      audioSrc: './tracks/aots3.webm',
      coverSrc: './images/shingeki-no-kyojin-eren-jeager-mikasa-ackerman-armin-arlert-wallpaper-preview.jpg',
      name: 'YOSHIKI feat. Hyde',
      desc: 'Red Swan',
      id: 4,
    },
    {
      audioSrc: './tracks/Berserk soundtrack  4 Gatsu.mp3',
      coverSrc: './images/berserk-berserk-armor-guts-kentaro-miura-wallpaper-preview.jpg',
      name: 'Berserk soundtrack',
      desc: '4 Gatsu',
      id: 5,
    },
    {
      audioSrc: './tracks/asitwas.mp3',
      coverSrc: './images/asitwass.png',
      name: 'Harry Styles',
      desc: 'As it was',
      id: 6,
    },
    {
      audioSrc: './tracks/Coyote theory  This Side Of Paradise.mp3',
      coverSrc: './images/coyote.jpg',
      name: 'Coyote theory',
      desc: 'This Side Of Paradise',
      id: 7,
    },
    {
      audioSrc: './tracks/fireforce.mp3',
      coverSrc: './images/shinra.png',
      name: 'Mrs. GREEN APPLE',
      desc: 'Inferno op fireforce',
      id: 8,
    },
    {
      audioSrc: './tracks/bluencount.mp3',
      coverSrc: './images/polaris.jpg',
      name: 'Blue Encount',
      desc: 'Polaris',
      id: 9,
    },
    {
      audioSrc: './tracks/Yoh Kamiyama  Irokousui.mp3',
      coverSrc: './images/pic12.jpg',
      name: 'Yoh Kamiyama',
      desc: 'Irokousui',
      id: 10,
    },
     {
      audioSrc: './tracks/Your Name  Kimi no nawa.mp3',
      coverSrc: './images/kimi.jpg',
      name: 'Sparkle',
      desc: 'Kimi No Nawa',
      id: 11,
    },
  ];

  const currentTrackName = document.querySelector('header h3');
  const currentTrackDesc = document.querySelector('header p');
  const currentTrackCover = document.querySelector('header img');
  const currentTrackAudio = document.querySelector('audio');
  const playPauseBtn = document.querySelector('.event-playPause');
  const muteUnmuteBtn = document.querySelector('.event-muteUnmute');
  const playNextBtn = document.querySelector('.event-next');
  const playPrevBtn = document.querySelector('.event-prev');
  const progress = document.querySelector('.slider-progress');
  const currentTrackTime = document.querySelector('.count-current');
  const finalTrackTime = document.querySelector('.count-final');
  // ADD TRACKS TO MY PLAYLIST ON PAGE LOAD
  (function addMyTracksList() {
    for (let track of tracksList) {
      var li = document.createElement('li');
      li.id = track.id;
      li.innerHTML = `
                    <div class="track-number">0${track.id}</div>
                    <img
                    src=${track.coverSrc}
                    class="track-img"
                    alt=""
                    />

                    <div class="track-detail">
                    <div class="track-detail_name">${track.name}</div>
                    <div class="track-detail_desc">
                        <small>${track.desc}</small>
                    </div>
                    </div>
        `;
      document.querySelector('ul').appendChild(li);
      (function (id) {
        li.addEventListener(
          'click',
          () => {
            playSelectedTrack(id);
          },
          false
        );
      })(track.id);
    }
  })();

  let trackId = 0;

  const loadTrack = (songId) => {
    const song = tracksList.find((track) => track.id === songId);

    const { audioSrc, coverSrc, name, desc } = song;
    currentTrackName.innerText = name;
    currentTrackDesc.innerText = desc;
    currentTrackAudio.src = audioSrc;
    currentTrackCover.src = coverSrc;
  };

  const playSelectedTrack = (songId) => {
    trackId = songId;
    loadTrack(songId);
    playTrack();
  };

  loadTrack(trackId);

  const playTrack = () => {
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');

    currentTrackAudio.play();
  };

  const pauseTrack = () => {
    playPauseBtn.classList.remove('fa-pause');
    playPauseBtn.classList.add('fa-play');

    currentTrackAudio.pause();
  };

  const playPrevTrack = () => {
    trackId--;

    if (trackId < 0) {
      trackId = tracksList.length - 1;
    }
    loadTrack(trackId);
    playTrack();
  };

  const playNextTrack = () => {
    trackId++;
    if (trackId > tracksList.length - 1) {
      trackId = 0;
    }
    loadTrack(trackId);
    playTrack();
  };

  const updateProgress = () => {
    const currentTime = currentTrackAudio.currentTime;
    const trackDuration = currentTrackAudio.duration;
    const percent = (currentTime / trackDuration) * 100;
    progress.style.width = percent + '%';
    let curMins = Math.floor(currentTime / 60);
    let curSecs = Math.floor(currentTime - curMins * 60);
    let durMins = Math.floor(trackDuration / 60) || '--';
    let durSecs = Math.floor(trackDuration - durMins * 60) || '--';

    if (curMins < 10) {
      curMins = `0${curMins}`;
    }
    if (curSecs < 10) {
      curSecs = `0${curSecs}`;
    }
    if (durMins < 10) {
      durMins = `0${durMins}`;
    }
    if (durSecs < 10) {
      durSecs = `0${durSecs}`;
    }

    currentTrackTime.innerText = `${curMins}:${curSecs}`;
    finalTrackTime.innerText = `${durMins}:${durSecs}`;
  };

  const muteUnmuteTrack = () => {
    if (currentTrackAudio.muted) {
      currentTrackAudio.muted = false;
      muteUnmuteBtn.classList.remove('fa-volume-mute');
      muteUnmuteBtn.classList.add('fa-volume-up');
    } else {
      currentTrackAudio.muted = true;
      muteUnmuteBtn.classList.remove('fa-volume-up');
      muteUnmuteBtn.classList.add('fa-volume-mute');
    }
  };

  playPauseBtn.addEventListener('click', () => {
    const currentlyPlaying = playPauseBtn.classList.contains('fa-pause');

    currentlyPlaying ? pauseTrack() : playTrack();
  });
  muteUnmuteBtn.addEventListener('click', () => muteUnmuteTrack());

  playPrevBtn.addEventListener('click', () => playPrevTrack());
  playNextBtn.addEventListener('click', () => playNextTrack());

  currentTrackAudio.addEventListener('timeupdate', () => updateProgress());
});
