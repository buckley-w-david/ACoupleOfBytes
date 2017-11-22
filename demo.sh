#!/bin/bash

ENDPOINT="acoupleofbytes.jordonsmith.ca"
BACKUP="http://ec2-52-37-97-34.us-west-2.compute.amazonaws.com"

curl -s -o /dev/null -d '{"username": "test26", "password": "abcd", "firstname": "dave", "lastname": "buck", "email": "dbuckl02@uoguelph.ca"}' "$BACKUP/signup/" 2>&1

RESP=`curl -s -d '{"username": "test26", "password": "abcd"}' "$BACKUP/login/"`
echo "Login Respnse: $RESP" 

SESSION=`echo $RESP | python3 -c "import sys, json; print(json.load(sys.stdin)['session_key'])"`
echo "Session Key: $SESSION"

HEADER="SESSION-KEY: $SESSION"

echo "Medication list: `curl -s -H "$HEADER" "$BACKUP/meds/"`"
echo

curl -s -o /dev/null -d '{"name": "medication_1", "dosage": "5mg", "times": ["0:12:00:00", "2:22:00:00", "4:12:00:00", "6:15:00:00"]}' -H "$HEADER" "$BACKUP/meds/" 2>&1
curl -s -o /dev/null -d '{"name": "medication_2", "dosage": "10mg", "times": ["2:20:00:00"]}' -H "$HEADER" "$BACKUP/meds/" 2>&1
curl -s -o /dev/null -d '{"name": "medication_3", "dosage": "10mg", "times": ["2:0:30:00"]}' -H "$HEADER" "$BACKUP/meds/" 2>&1
curl -s -o /dev/null -d '{"name": "medication_4", "dosage": "10mg", "times": ["1:8:30:00"]}' -H "$HEADER" "$BACKUP/meds/" 2>&1
curl -s -o /dev/null -d '{"name": "medication_5", "dosage": "1mg", "times": ["0:13:00:00", "3:22:00:00", "4:13:00:00", "6:13:00:00"]}' -H "$HEADER" "$BACKUP/meds/" 2>&1

echo "Medication list: `curl -s -H "$HEADER" "$BACKUP/meds/"`"
echo
curl -s -o /dev/null -H "$HEADER" "$BACKUP/logout/" 2>&1
echo "Medication list request after logout: `curl -s -H "$HEADER" "$BACKUP/meds/"`"
echo

RESP=`curl -s -d '{"username": "test26", "password": "abcd"}' "$BACKUP/login/"`
SESSION=`echo $RESP | python3 -c "import sys, json; print(json.load(sys.stdin)['session_key'])"`
HEADER="SESSION-KEY: $SESSION"

MEDICATION=`curl -s -H "$HEADER" "$BACKUP/meds/"`
echo "Logged back in medication list: $MEDICATION"
echo

DEL=`echo $MEDICATION | python3 -c "import sys, json; print(json.load(sys.stdin)['medications'][0]['id'])"`
TAKE=`echo $MEDICATION | python3 -c "import sys, json; print(json.load(sys.stdin)['medications'][2]['id'])"`
EDIT=`echo $MEDICATION | python3 -c "import sys, json; print(json.load(sys.stdin)['medications'][4]['id'])"`

curl -s -o /dev/null -X DELETE -H "$HEADER" "$BACKUP/meds/$DEL/" 2>&1

echo "Medication list deleting $DEL: `curl -s -H "$HEADER" "$BACKUP/meds/"`"
echo

curl -s -o /dev/null -X PATCH -d '{"times": ["0:11:00:00", "3:20:00:00", "4:11:00:00", "6:11:00:00"]}' -H "$HEADER" "$BACKUP/meds/$EDIT/" 2>&1

echo "Medication list editing $EDIT: `curl -s -H "$HEADER" "$BACKUP/meds/"`"
echo

echo "Next medication to take: `curl -s -H "$HEADER" "$BACKUP/meds/next/"`"
echo
echo "Medication overdue: `curl -s -H "$HEADER" "$BACKUP/meds/due/"`"
echo

curl -s -o /dev/null -X PATCH -H "$HEADER" "$BACKUP/meds/take/$TAKE/" 2>&1

echo "Medication overdue after taking $TAKE: `curl -s -H "$HEADER" "$BACKUP/meds/due/"`"
echo

curl -s -o /dev/null -H "$HEADER" "$BACKUP/logout/" 2>&1