'use strict';

(() => {
  const body = document.querySelector('body');

  let left = false;
  let right = false;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  const notification = (parentNode, classes, text) => {
    const node = document.createElement('div');

    node.classList.add(...classes);
    node.textContent = text;
    node.dataset.qa = 'notification';
    parentNode.append(node);
  };

  const firstPromise = new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
      left = true;
    });

    setTimeout(() => {
      if (!left) {
        reject(new Error('First promise was rejected'));
      }
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        left = true;
        resolve('Second promise was resolved');
      }

      if (e.button === 2) {
        right = true;

        resolve('Second promise was resolved');
      }
    });
  });

  const thirdPromise = new Promise((resolve) => {
    let isResolved = false;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        if (left && right && !isResolved) {
          isResolved = true;
          resolve('Third promise was resolved');
        }
      }
    });
  });

  firstPromise
    .then((res) => notification(body, ['success'], res))
    .catch((_err) => notification(body, ['error'], _err.message));

  secondPromise.then((res) => notification(body, ['success'], res));

  thirdPromise.then((res) => {
    notification(body, ['success'], res);
  });
})();
