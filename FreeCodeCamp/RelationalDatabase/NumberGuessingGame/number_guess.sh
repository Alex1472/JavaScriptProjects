#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

MAIN() {
  echo "Enter your username:"
  read USERNAME

  USER_DATA=$($PSQL "SELECT games_played, best_game FROM users WHERE username='$USERNAME'")
  GAMES_PLAYED=0
  BEST_GAME=100000
  
  if [[ -z $USER_DATA ]]
  then
    echo "Welcome, $USERNAME! It looks like this is your first time here."
    INSERT_USERNAME_RESULT=$($PSQL "INSERT INTO users(username) VALUES ('$USERNAME');")
  else
    # Print user data
    echo $USER_DATA | while IFS="|" read GAMES_PLAYED BEST_GAME
    do
      echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
    done
  fi

  # Gessing a number
  echo "Guess the secret number between 1 and 1000:"
  
  SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))
  NUMBER_OF_GUESSES=0
  CURRENT_NUMBER=-1
  while (( CURRENT_NUMBER != SECRET_NUMBER ))
  do
    read CURRENT_NUMBER
    (( NUMBER_OF_GUESSES++ ))

    if [[ ! $CURRENT_NUMBER =~ [0-9]+ ]]
    then
      echo "That is not an integer, guess again:"
    else
      if (( CURRENT_NUMBER < SECRET_NUMBER ))
      then
        echo "It's lower than that, guess again:"
      else
        if (( CURRENT_NUMBER > SECRET_NUMBER ))
        then
          echo "It's higher than that, guess again:" 
        fi
      fi
    fi
    
  done
  echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!" 
  
  # Update database
  (( GAMES_PLAYED++ ))
  if (( NUMBER_OF_GUESSES < BEST_GAME ))
  then
    BEST_GAME=$NUMBER_OF_GUESSES
  fi
  UPDATE_RESULT=$($PSQL "UPDATE users SET games_played=$GAMES_PLAYED, best_game=$BEST_GAME WHERE username='$USERNAME';")
}

MAIN