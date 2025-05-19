 const states = [...document.querySelectorAll('.land')];
  let currentIndex = 0;
  let timeLeft = 60;
  const timerEl = document.getElementById('timer');
  const targetStateEl = document.getElementById('targetState');

  // Shuffle the state order
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  shuffle(states);

  function setNextTarget() {
    if (currentIndex >= states.length) {
      targetStateEl.textContent = "🎉 Finished!";
      clearInterval(timerInterval);
      return;
    }
    targetStateEl.textContent = states[currentIndex].id.replace(/_/g, ' ');
  }

  // Click handling
  states.forEach(state => {
    state.addEventListener('click', () => {
      if (state === states[currentIndex]) {
        state.classList.add('correct');
        currentIndex++;
        setNextTarget();
      } else {
        state.style.fill = '#e74c3c'; // red if wrong
        setTimeout(() => {
          state.style.fill = '';
        }, 500);
      }
    });
  });

  // Timer
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      targetStateEl.textContent = "⏰ Time's up!";
    }
  }, 1000);

  // Start
  setNextTarget();