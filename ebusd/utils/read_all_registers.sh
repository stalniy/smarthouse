#!/bin/bash

# Script to read all registers/states from heater

port=8888
if [ "x$1" = "x-p" ]; then
  shift
  port=$1
  shift
fi
addr=08
if [ "x$1" = "x-a" ]; then
  shift
  addr=$1
  shift
fi
for (( i=0; i<512; i++ )) ; do
  h=`printf "%4.4X" $i`
  ret=`echo "hex ${addr}b509030d${h##??}${h%%??}"|nc -q 1 localhost $port|head -n 1`
  retry_count=0
  while echo "$ret" | grep -i "ERR:"; do
    ret=`echo "hex ${addr}b509030d${h##??}${h%%??}"|nc -q 1 localhost $port|head -n 1`
    retry_count=$((retry_count+1))
    if [ "$retry_count" = "10" ]; then
      break;
    fi
  done;

  echo "${addr}b509030d${h##??}${h%%??} (index: ${i}, retried = ${retry_count}) = $ret"
done
