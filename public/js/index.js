const paragraph = document.getElementById('typewrighter');

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function playTypingAnimation(text) {
  paragraph.innerHTML = text;
  const characterCount = text.length;

  const keyframes = [{ width: '0%' }, { width: '100%' }];
  const options = {
    easing: `steps(${characterCount}, end)`,
    duration: characterCount * 50,
  };

  const animation = paragraph.animate(keyframes, options);
  await animation.finished;
}

async function playRemovingAnimation() {
  const text = paragraph.innerHTML;
  const characterCount = text.length;

  const keyframes = [{ width: '100%' }, { width: '0%' }];
  const options = {
    easing: `steps(${characterCount}, end)`,
    duration: characterCount * 25,
  };

  const animation = paragraph.animate(keyframes, options);
  await animation.finished;
  paragraph.innerHTML = '';
}

(async () => {
  const firstResponse = await fetch('/api/messages/first');
  const secondResponse = await fetch('/api/message/second');

  const firstMessage = await firstResponse.text();
  const secondMessage = await secondResponse.text();

  await playTypingAnimation(firstMessage);
  await wait(2500);
  await playRemovingAnimation();
  await wait(1000);
  await playTypingAnimation(secondMessage);
})();
