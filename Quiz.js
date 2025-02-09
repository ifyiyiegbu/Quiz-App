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
      question: "What is the capital of Canada??",
      answers: [
        { text: "Ottawa", correct: true },
        { text: "Vancouver", correct: false },
        { text: "Toronto", correct: false },
        { text: "Montreal", correct: false }
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
  let selectedAnswer = null;
  
  const questionContainer = document.getElementById("question-container")
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const submitButton = document.getElementById("submit-btn");
  const progressElement = document.getElementById("progress");
  const resultsContainer = document.getElementById("results-container");
  const finalScoreElement = document.getElementById("final-score");
  const restartButton = document.getElementById("restart-btn");
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    submitButton.innerHTML = "Submit";
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
      button.addEventListener("click", () => selectAnswer(button,answer.correct));
    });
  }
  
  function resetState() {
    submitButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(button, isCorrect) {
    // Deselect all buttons
    Array.from(answerButtonsElement.children).forEach(btn => {
      btn.classList.remove("selected");
    });
    // Select the clicked button
    button.classList.add("selected");
    selectedAnswer = isCorrect; // Store the selected answer's correctness
    submitButton.style.display = "block"; // Show the Submit button
  }

  function handleSubmit() {
    if (selectedAnswer === null) return; // No answer selected
  
    // Update score if the answer is correct
    if (selectedAnswer) {
      score++;
    }
  
    // Move to the next question or show results
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    questionContainer.classList.add("hidden");
    progressElement.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    finalScoreElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    restartButton.classList.remove("hidden");
  }
  
  submitButton.addEventListener("click", handleSubmit);
  
  restartButton.addEventListener("click", () => {
    resultsContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    progressElement.classList.remove("hidden");
    restartButton.classList.add("hidden");
    startQuiz();
  });
  
  startQuiz();