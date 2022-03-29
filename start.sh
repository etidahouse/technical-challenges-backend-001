#!/bin/bash

function all(){
  echo "all"
}

START=$1

if [ $START = "pg" ]
then
  echo $START
else
  all
fi


# start-postgres: # TODO: start postgresql instance
# 	...

# stop-postgres: # TODO: stop the postgresql instance
# 	...

# start-rabbitmq: # TODO: start a rabbitmq instance
# 	...

# stop-rabbitmq: # TODO: stop a rabbitmq instance
# 	...

# TODO: add a "start" rule to start everything

# TODO: add a "stop" rule to stop everything