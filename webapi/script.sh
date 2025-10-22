echo '\n\nrequesting all students'
curl localhost:3000/students

echo '\n\nrequesting the first student'
curl localhost:3000/students/1

echo '\n\nrequesting with wrong body'
curl --silent -X POST \
     --data-binary '{"invalid": "data"}' \
     localhost:3000/students

echo '\n\ncreating a valid student'
CREATE=$(curl --silent -X POST \
     --data-binary '{"name": "Jimmy", "age": "14"}' \
     localhost:3000/students)

echo $CREATE 

ID=$(echo $CREATE | jq .id)

echo '\nrequesting the last student'
curl localhost:3000/students/$ID

echo