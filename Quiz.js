const questions = [
    {
      question: "What is the largest ocean on Earth?",
      answers: [
        { text: "Pacific Ocean", correct: true },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false },
        { text: "Atlantic Ocean", correct: false }
      ]
    },
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false }
      ]
    },
    {
      question: "What is the largest mammal in the world?",
      answers: [
        { text: "Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Lion", correct: false }
      ]
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
        answers: [
          { text: "Issac Newton", correct: false },
          { text: "Galileo Galilei", correct: false },
          { text: "Albert Einstein", correct: true },
          { text: "Stephen Hawkings", correct: false }
        ]
      },
      {
        question: "Which is the largest desert in the world?",
        answers: [
          { text: "Gobi Desert", correct: false },
          { text: "Sahara Desert", correct: true },
          { text: "Arctic Desert", correct: false },
          { text: "Antartica", correct: false }
        ]
      }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionContainer = document.getElementById("question-container")
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const progressElement = document.getElementById("progress");
  const resultsContainer = document.getElementById("results-container");
  const finalScoreElement = document.getElementById("final-score");
  const restartButton = document.getElementById("restart-btn");
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    progressElement.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtonsElement.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
      score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct === "true");
    });
    nextButton.style.display = "block";
  }
  
  function setStatusClass(element, correct) {
    if (correct) {
      element.style.backgroundColor = "green";
    } else {
      element.style.backgroundColor = "red";
    }
  }
  
  function showResults() {
    questionContainer.classList.add("hidden");
    progressElement.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    finalScoreElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    restartButton.classList.remove("hidden");
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    }
  });
  
  restartButton.addEventListener("click", () => {
    resultsContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    progressElement.classList.remove("hidden");
    restartButton.classList.add("hidden");
    startQuiz();
  });
  
  startQuiz();