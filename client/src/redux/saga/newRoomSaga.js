import { gql } from "@apollo/client";
import { call, put } from "redux-saga/effects";
import { currentRoom, isFetching } from "../reducers/chatSlice";
import { addChatContacts } from "../reducers/userSlice";
import client from "../../apolloClient";

function* newRoom(action) {
  const options = {
    mutation: gql`
        mutation Mutation($createRoomInput: RoomInput) {
            createChatRoom(createRoomInput: $createRoomInput) {
                _id
                member
                createdBy
            }
        }
    `,
    variables: {
        createRoomInput: action.payload.newRoom,
    },
  };
  try {
    yield put(isFetching());
    const data = yield call(client.mutate, options);
    const chatId = data.data.createChatRoom._id;
    const chatMember = data.data.createChatRoom.member;
    const chatCreatedBy = data.data.createChatRoom.createdBy;
    const chatObj = {chatId, chatMember}
    const userObj = {chatId, chatMember, chatCreatedBy}
    yield put(currentRoom(chatObj));
    yield put(addChatContacts(userObj));
  } catch (err) {
    yield console.log({ error: "errorSendMessage", severity: "warning" });
  }
}

export default newRoom;