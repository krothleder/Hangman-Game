    
    //sets array full of words that users will have to guess 
    var wordsList = ["helpless","satisfied","burn","hamilton","yorktown"]

    //initializes the wrong letters guessed to an empty string
    var currentWord = "";

    var splitCurrentWord = [];

    var blanks = 0;

    var correctGuessesAndBlanks = [];

    var wrongGuesses =[];


    //GAME COUNTERS
    //initializes guesses left to 15
    var guessesLeft =15;

    //initializes wins to 0
    var wins=0;

    //initializes losses to 0
    var losses=0;


    //FUNCTIONS

    function startGame() {
      // Reset the guesses back to 0.
      guessesLeft = 15;

      // Solution is chosen randomly from wordList.
      currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
      // The word is broken into individual letters.
      splitCurrentWord = currentWord.split("");
      // Count the number of letters in the word.
      blanks = splitCurrentWord.length;

      // We print the chosen word and slpit chosen word in console (for testing).
      console.log(currentWord);
      console.log(splitCurrentWord);

      // CRITICAL LINE - Here we *reset* the guess and success array at each round.
      correctGuessesAndBlanks = [];
      // CRITICAL LINE - Here we *reset* the wrong guesses from the previous round.
      wrongGuesses = [];

      // Fill up the blanksAndSuccesses list with appropriate number of blanks.
      // This is based on number of letters in solution.
      for (var i = 0; i < blanks; i++) {
        correctGuessesAndBlanks.push("_");
      }

      // Print the initial blanks in console.
      console.log(correctGuessesAndBlanks);


      // // Reprints the guessesLeft to 9
      document.getElementById("guesses-left").innerHTML = guessesLeft;

      // // Prints the blanks at the beginning of each round in the HTML
      document.getElementById("word-blanks").innerHTML = correctGuessesAndBlanks.join(" ");

      // // Clears the wrong guesses from the previous round
      document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
    }




    function checkLetter(letter){
        var letterInWord = false;

          // Check if a letter exists inside the split word at all.
        for (var i = 0; i < blanks; i++) {
          if (letter === currentWord[i]) {
            // If the letter exists then toggle this boolean to true. This will be used in the next step.
            letterInWord = true;
          }
        }

        // If the letter exists somewhere in the word, then figure out exactly where.
        if (letterInWord) {
          // Loop through the word.
          for (i = 0; i < blanks; i++) {
            // Populate the blanksAndSuccesses with every instance of the letter.
            if (letter === currentWord[i]) {
              // Here we set the specific space in blanks and letter equal to the letter when there is a match.
              correctGuessesAndBlanks[i] = letter;
            }
          }
        }

        // If the letter doesn't exist
        else {
          // add the letter to the list of wrong letters, and we subtract one of the guesses.
          wrongGuesses.push(letter);
          guessesLeft--;
        }

        console.log(correctGuessesAndBlanks);
        console.log(wrongGuesses);
        console.log(guessesLeft);
    }
    


    function display(){
       // // Reprints the guessesLeft to 9
      document.getElementById("guesses-left").innerHTML = guessesLeft;

      // // Prints the blanks at the beginning of each round in the HTML
      document.getElementById("word-blanks").innerHTML = correctGuessesAndBlanks.join(" ");

      // // Clears the wrong guesses from the previous round
      document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    }

    function roundOver(){
      display();
      if (splitCurrentWord.toString() === correctGuessesAndBlanks.toString()) {
        // ..add to the win counter & give the user an alert.
        wins++;
        alert("You win!");

        // Update the win counter in the HTML & restart the game.
        document.getElementById("win-counter").innerHTML = wins;
        startGame();
      }

      // If we've run out of guesses..
      else if (guessesLeft === 0) {
        // Add to the loss counter.
        losses++;
        // Give the user an alert.
        alert("You lose :(");

        // Update the loss counter in the HTML.
        document.getElementById("loss-counter").innerHTML = losses;
        // Restart the game.
        startGame();
      }
    }



    startGame();

    document.onkeyup = function(event) {
      // Converts all key clicks to lowercase letters.
      var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
      // Runs the code to check for correctness.
      checkLetter(letterGuessed);
      roundOver();
    };
