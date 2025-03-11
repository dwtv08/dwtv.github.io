document.addEventListener('DOMContentLoaded', () => {
  const source = 'https://yhjkrf.site/chunklist/hlsch1.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9My8xMS8yMDI1IDUgOjU0IDoxMCAgUE0maGFzaF92YWx1ZT1yYXI4WFpFY0xwSDZLSlNVQUZDeGpnPT0mdmFsaWRtaW51dGVzPTcyMCZpZD0xMDMuMjQyLjEwNS4zMSZzdHJtX2xlbj01';
  const video = document.querySelector('video');

  // For more options see: https://github.com/sampotts/plyr/#options
  // captions.update is required for captions to work with hls.js
  const player = new Plyr(video, { captions: { active: true, update: true, language: 'en' } });

  if (!Hls.isSupported()) {
    video.src = source;
  } else {
    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    window.hls = hls;

    // Handle changing captions
    player.on('languagechange', () => {
      // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
    });
  }

  // Expose player so it can be used from the console
  window.player = player;
});
