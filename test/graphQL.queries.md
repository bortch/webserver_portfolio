mutation createNewUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    _id
    username
    language
    salt
    password
  }
}

{"input" :{
  "email": "bortch303@gmail.com",
  "language": "FR",
  "password": "123456789abcd",
  "salt": "azerty",
  "username": "bortch"
}
}