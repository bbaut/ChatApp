import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import { currentRoom, isFetching } from "../reducers/chatSlice";
import client from "../../apolloClient";

function* newRoom(action) {
  const options = {
    mutation: gql`
        mutation Mutation($createRoomInput: RoomInput) {
            createChatRoom(createRoomInput: $createRoomInput) {
                _id
                member
            }
        }
    `,
    variables: {
        createRoomInput: action.payload.newRoom,
    },
  };
  try {
    // console.log("hey")
    yield put(isFetching());
    const data = yield call(client.mutate, options);
    const chatId = data.data.createChatRoom._id;
    const chatMember = data.data.createChatRoom.member;
    const chatObj = {chatId, chatMember}
    yield put(currentRoom(chatObj));
  } catch (err) {
    yield console.log({ error: "errorSendMessage", severity: "warning" });
  }
}

export default newRoom;