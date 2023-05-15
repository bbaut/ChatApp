import List from '@mui/material/List';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Search from "../components/SearchContact"
import { useSubscription } from '@apollo/client';
import ACCEPT_CONTACT_REQUEST from "../gql/acceptContact"
import ContactLayer from '../components/ContactLayer';

const Contacts = () => {

    const dispatch = useDispatch();

    const { contacts } = useSelector(
      (state) => state.user.value
    );


    useSubscription(ACCEPT_CONTACT_REQUEST, {
      onData: (data) => {
        dispatch({
          type: "acceptRequest",
          payload: data.data.data.acceptContactRequest,
      })
      },
      onError: (error) => {
          console.log(error)
      }
    })

    let contactsArray = [];

    if (contacts.length !== 0) {
        for (let i = 0; i<  contacts.length; i++){
            contactsArray.push(contacts[i])
        }

    return (
      <Box
      bgcolor="white"
      flex={5}
      p={2}
    >
          <h1>Contacts</h1>
          <Search/>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {contactsArray.map((contact) => (
                  <ContactLayer item={contact} key={contact}/>
              ))}
          </List>
        </Box>
    );
    }

    else {
    return (
        <Box
        bgcolor="white"
        flex={5}
        p={2}
      >
          <h1>Contacts</h1>
          <h2> You don't have contacts yet</h2>
          <h3>Start by adding a contact</h3>
          <Search/>
      </Box>
    )
    }
   
    

}
    

export default Contacts
