#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
TRANCATE_DATABASE=$($PSQL "TRUNCATE TABLE games, teams;")
echo $TRANCATE_DATABASE

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  # Insert winner
  if [[ $WINNER != "winner" ]]
  then
    WINNER_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER';")"
    if [[ -z $WINNER_ID ]]
    then
      INSERT_WINNER="$($PSQL "INSERT INTO teams(name) VALUES ('$WINNER');")"
      if [[ $INSERT_WINNER="INSERT 0 1" ]]
      then
        echo "Inserted into teams, $WINNER"
      fi

      WINNER_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")"
    fi
  fi

  # Insert opponent
  if [[ $OPPONENT != "opponent" ]]
  then
    OPPONENT_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT';")"
    if [[ -z $OPPONENT_ID ]]
    then
      INSERT_OPPONENT="$($PSQL "INSERT INTO teams(name) VALUES ('$OPPONENT');")"
      if [[ $INSERT_OPPENENT="INSERT 0 1" ]]
      then
        echo "Inserted into teams, $OPPONENT"
      fi

      OPPONENT_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT';")"
    fi
  fi

  # Insert games
  if [[ $ROUND != "round" ]]
  then
    INSERT_GAME_RESULT="$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS);")"
    if [[ $INSERT_GAME_RESULT == "INSERT 0 1" ]]
    then
      echo "Inserted into teams, $WINNER : $OPPONENT"
    fi
  fi

done