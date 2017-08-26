    
    //sets array full of words that users will have to guess 
    var wordsList = ["helpless","satisfied","burn","hamilton","yorktown"]

    //initializes the current work chosen to an empty string
    var currentWord = "";

    //initializes the split word to an empty array that will be filled with the induvidual letters in the chosen word
    var splitCurrentWord = [];

    //initializes the blanks in chosen word to0
    var blanks = 0;

    var correctGuessesAndBlanks = [];

    //initializes the wrong letters guessed to an empty string
    var wrongGuesses =[];


    //GAME COUNTERS
    //initializes guesses left to 10
    var guessesLeft =10;

    //initializes wins to 0
    var wins=0;

    //initializes losses to 0
    var losses=0;


    //FUNCTIONS

    function startGame() {
      // Reset the guesses left back to 10.
      guessesLeft = 10;

      // Current word is chosen randomly from wordsList.
      currentWord = wordsList[Math.floor(Math.random() * wordsList.length)];
      // The word is broken into individual letters and placed in array.
      splitCurrentWord = currentWord.split("");
      // Count the number of letters in the word.
      blanks = splitCurrentWord.length;

      // We print the chosen word and slpit chosen word in console (for testing).
      console.log(currentWord);
      console.log(splitCurrentWord);

      //Reset the guesses and success array for new round.
      correctGuessesAndBlanks = [];
      //Reset the wrong guesses from the previous round.
      wrongGuesses = [];

      // Fill up the correctGuessesAndBlanks list with appropriate number of blanks.
      // This is based on number of letters in solution.
      for (var i = 0; i < blanks; i++) {
        correctGuessesAndBlanks.push("_");
      }

      // Print the initial blanks in console.(for testing)
      console.log(correctGuessesAndBlanks);


      // // Reprints the guessesLeft to 10
      document.getElementById("guesses-left").innerHTML = guessesLeft;

      // // Prints the blanks at the beginning of each round in the HTML
      document.getElementById("word-blanks").innerHTML = correctGuessesAndBlanks.join(" ");

      // // Clears the wrong guesses from the previous round
      document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
    }




    function checkLetter(letter){
        //initialize a boolean to false so lettter in word is first set to false
        var letterInWord = false;

          // Check if a letter exists inside the split word at all.
        for (var i = 0; i < blanks; i++) {
          if (letter === currentWord[i]) {
            // If the letter exists then set letterInWord to true. 
            letterInWord = true;
          }
        }

        // If the letter exists somewhere in the word, then find exactly where.
        if (letterInWord) {
          // Loop through the word.
          for (i = 0; i < blanks; i++) {
            // Populate the correctGuessesAndBlanks with every instance of the letter.
            if (letter === currentWord[i]) {
              // Here we set the specific space in blanks and letter equal to the letter when there is a match.
              correctGuessesAndBlanks[i] = letter;
            }
          }
        }

        else {
              //if letter guess has already been made alert player that letter is already guessed
              if(wrongGuesses.includes(letter)){
                alert("Letter already guessed");
              }
              else{
                 // else if new guess is maded add the letter to the list of wrong letters, and subtract one of the guesses.
                wrongGuesses.push(letter);
                guessesLeft--;
              }
        }

        //Logs for testing

        console.log(correctGuessesAndBlanks);
        console.log(wrongGuesses);
        console.log(guessesLeft);
    }
    



    function display(){
       // // Displays the guessesLeft to page
      document.getElementById("guesses-left").innerHTML = guessesLeft;

      // // Displays the blanks to page
      document.getElementById("word-blanks").innerHTML = correctGuessesAndBlanks.join(" ");

      // // Displays the wrong guesses to page
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


    //main function of game starts the game and on a key event begins the game logic

    startGame();


    document.onkeyup = function(event) {
      // Converts all key clicks to lowercase letters.
      var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
      // Runs the code to check for correctness.
      checkLetter(letterGuessed);
      roundOver();
    };
