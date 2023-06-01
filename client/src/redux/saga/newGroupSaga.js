import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import { currentRoom, isFetching } from "../reducers/chatSlice";
import client from "../../apolloClient";

function* newGroup(action) {
  const options = {
    mutation: gql`
        mutation Mutation($createGroupInput: GroupInput) {
            createGroupRoom(createGroupInput: $createGroupInput) {
                _id
                groupName
                members
            }
        }
    `,
    variables: {
        createGroupInput: action.payload,
    },
  };
  try {
    yield put(isFetching());
    const data = yield call(client.mutate, options);
    const chatId = data.data.createGroupRoom._id;
    const chatMembers = data.data.createGroupRoom.members;
    const groupName = data.data.createGroupRoom.groupName;
    const chatObj = {chatId, chatMembers, groupName}
    yield put(currentRoom(chatObj));
  } catch (err) {
    yield console.log({ error: "errorSendMessage", severity: "warning" });
  }
}

export default newGroup;