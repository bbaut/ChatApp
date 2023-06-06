import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import { currentGroup, isFetching } from "../reducers/chatSlice";
import client from "../../apolloClient";

function* newGroup(action) {
  const options = {
    mutation: gql`
        mutation Mutation($createGroupInput: GroupInput) {
            createGroupRoom(createGroupInput: $createGroupInput) {
                _id
                groupName
                members
                createdBy
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
    const members = data.data.createGroupRoom.members;
    const groupName = data.data.createGroupRoom.groupName;
    const createdBy = data.data.createGroupRoom.createdBy;
    const chatObj = {chatId, members, groupName, createdBy}
    yield put(currentGroup(chatObj));
  } catch (err) {
    yield console.log({ error: "errorSendMessage", severity: "warning" });
  }
}

export default newGroup;