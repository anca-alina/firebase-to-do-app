import React, { useState, useEffect } from 'react'
import {
    Flex,
    Heading,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Text,
    IconButton,
    Divider,
} from "@chakra-ui/react"
import { AddIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons"
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
} from 'next-firebase-auth'
import getAbsoluteURL from '../utils/getAbsoluteURL'
import firebase from 'firebase/app'
import 'firebase/firestore'



const Todo = () => {
  const AuthUser = useAuthUser()
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  // console.log(AuthUser)
  // console.log(todos)

  useEffect(() => {
    AuthUser.id &&
      firebase
        .firestore()
        .collection(AuthUser.id)
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setTodos(snapshot.docs.map(doc => doc.data().todo))
        })
  })

  const sendData = () => {
    try {
      // try to update doc
      firebase
        .firestore()
        .collection(AuthUser.id) // each user will have their own collection
        .doc(input) // set the collection name to the input so that we can easily delete it later on
        .set({
          todo: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(console.log('Data was successfully sent to cloud firestore!'))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = (t) => {
    try {
      firebase
        .firestore()
        .collection(AuthUser.id)
        .doc(t)
        .delete()
        .then(console.log('Data was successfully deleted!'))
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <Flex flexDir="column" maxW={800} align="center" justify="center" minH="100vh" m="auto" px={4}>
        <Flex justify="space-between" w="100%" align="center">
          <Heading mb={4}>Welcome, {AuthUser.email}!</Heading>
          <Flex>
            
            <IconButton ml={2} onClick={AuthUser.signOut} icon={<StarIcon />} />
          </Flex>
        </Flex>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AddIcon color="gray.300" />}
          />
          <Input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Learn Chakra-UI & Next.js" />
          <Button
            ml={2}
            onClick={() => sendData()}
          >
            Add Todo
          </Button>
        </InputGroup>

        {todos.map((t, i) => {
          return (
            <React.Fragment key={i}>
              {i > 0 && <Divider />}
              <Flex
                w="100%"
                p={5}
                my={2}
                align="center"
                borderRadius={5}
                justifyContent="space-between"
              >
                <Flex align="center">
                  <Text fontSize="xl" mr={4}>{i + 1}.</Text>
                  <Text>{t}</Text>
                </Flex>
                <IconButton onClick={() => deleteTodo(t)} icon={<DeleteIcon />} />
              </Flex>
            </React.Fragment>
          )
        })}
      </Flex>
    )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  return {
    props: {
    }
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Todo)
