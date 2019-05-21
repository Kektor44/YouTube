const main = document.getElementById('main');
const switch1 = document.getElementById('switch1');
const switch2 = document.getElementById('switch2');
let left = 0;
let downX;
let upX;
let switchValue = 1;

const next = () => {
  if (window.screen.width < 768 && window.screen.width > 576 && left !== -281.4) {
    left -= 93.8;
    main.style.left = `${left}%`;
  }
  if (window.screen.width < 576 && left !== -568.4) {
    left -= 81.2;
    main.style.left = `${left}%`;
  }
  if (left !== -97.2 && window.screen.width >= 768) {
    left -= 97.2;
    main.style.left = `${left}%`;
  }
  switch1.style.backgroundColor = 'white';
  switch2.style.backgroundColor = 'red';
  if (switchValue < 4 && window.screen.width < 768 && window.screen.width > 576) {
    switchValue += 1;
    if (switchValue > 2) {
      switch1.innerHTML = switchValue - 1;
      switch2.innerHTML = switchValue;
    }
  }
  if (switchValue < 8 && window.screen.width < 576) {
    switchValue += 1;
    if (switchValue > 2) {
      switch1.innerHTML = switchValue - 1;
      switch2.innerHTML = switchValue;
    }
  }
};

const prev = () => {
  if (window.screen.width < 768 && window.screen.width > 576 && left <= 0 && left !== 0) {
    left += 93.8;
    main.style.left = `${left}%`;
  }
  if (window.screen.width < 576 && left !== 0 && left < -3) {
    left += 81.2;
    main.style.left = `${left}%`;
  }
  if (left !== 0 && window.screen.width >= 768) {
    left += 97.2;
    main.style.left = `${left}%`;
  }
  switch2.style.backgroundColor = 'white';
  switch1.style.backgroundColor = 'red';
  if (switchValue > 1 && window.screen.width < 768 && window.screen.width > 576) {
    switchValue -= 1;
    if (switchValue < 3) {
      switch1.innerHTML = switchValue;
      switch2.innerHTML = switchValue + 1;
    }
  }
  if (switchValue > 1 && window.screen.width < 576) {
    switchValue -= 1;
    if (switchValue < 7) {
      switch1.innerHTML = switchValue;
      switch2.innerHTML = switchValue + 1;
    }
  }
};
switch2.addEventListener('click', next);
switch1.addEventListener('click', prev);

main.addEventListener('mousemove', (event) => {
  const x = event.clientX;

main.onmousedown = function moudeDown() {
  downX = x;
};
main.onmouseup = function mouseUp() {
  upX = x;
};
if (downX - upX > 20) {
  next();
  downX = undefined;
  upX = undefined;
} else if (upX - downX > 20) {
  prev();
  downX = undefined;
  upX = undefined;
}
});
const slider = document.getElementById('slider');
const input = document.getElementById('input');
const button = document.getElementById('button');
const author = document.getElementsByClassName('author');
const date = document.getElementsByClassName('date');
const views = document.getElementsByClassName('views');
const description = document.getElementsByClassName('description');
const trambnail = document.getElementsByClassName('trambnail');
const link = document.getElementsByClassName('link');
let strId = '';

const req = () => {
  main.style.opacity = '1';
  main.style.transition = 'opacity 0.5s, left 0.5s';
  slider.style.opacity = '1';
  slider.style.transition = 'opacity 0.5s';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDpYhRmfpFnIW6LguSwP_fRZoXHP92dxQ0&type=video&part=snippet&maxResults=8&q='}${input.value}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
    const arr = JSON.parse(xhr.response);
    for (let i = 0; i <= author.length; i += 1) {
      if (typeof (arr.items[i]) !== 'undefined') {
        if (arr.items[i].snippet.channelTitle.length > 16) {
          author[i].innerHTML = `${arr.items[i].snippet.channelTitle.slice(0, 13)}...`;
        } else {
          author[i].innerHTML = arr.items[i].snippet.channelTitle;
        }
        date[i].innerHTML = arr.items[i].snippet.publishedAt.slice(0, 10);
        trambnail[i].src = arr.items[i].snippet.thumbnails.medium.url;
        link[i].innerHTML = arr.items[i].snippet.title;
        link[i].href = `https://www.youtube.com/watch?v=${arr.items[i].id.videoId}`;
        const arrWords = arr.items[i].snippet.description.split(' ');
        arrWords.forEach((el, j) => {
          if (el.length > 25) {
          arrWords[j] = `${el.slice(0, 25)}...`;
        }
      });
        description[i].innerHTML = arrWords.join(' ');
        strId = `${strId + arr.items[i].id.videoId},`;
        if (strId.length === 96) {
          const xhr1 = new XMLHttpRequest();
          xhr1.open('GET', `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDpYhRmfpFnIW6LguSwP_fRZoXHP92dxQ0&type=video&id=${strId.slice(0, -1)}&part=snippet,statistics`);
          strId = '';
          xhr1.send();
          xhr1.addEventListener('load', () => {
            if (xhr1.status === 200) {
            const stat = JSON.parse(xhr1.response);
            for (let k = 0; k <= author.length; k += 1) {
              if (typeof (stat.items[k]) !== 'undefined') {
                views[k].innerHTML = stat.items[k].statistics.viewCount;
              }
            }
          }
        });
        }
      }
    }
  }
});
};
button.addEventListener('click', req);
document.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
  req();
}
});