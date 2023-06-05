import i18next from "i18next";
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            welcome: "Welcome",
            email: "Email address",
            password: "Password",
            login: "Log In",
            account: "Don't have an account?",
            register: "Join now",
            createAccount: "Create your account",
            welcomeText: "and stay in touch with your friends anytime",
            username: "Username",
            confirmPassword: "Confirm password",
            alreadyAccount: "Have an account?",
            fieldsRequired: "All fields required",
            passwordsDontMatch: "Passwords do not match. Try again",
            succesfulCreation: "User created successfully. Go to login page",
            logout: "logout",
            profile: "Profile",
            friends: "Friends",
            messages: "Messages",
            groups: "Groups",
            deleteFriend: "Delete friend",
            chats:"Chats",
            searchContact: "Search friend",
            selectContact: "Select a friend",
            createGroup: "Create group",
            groupName: "Name of the group",
            writeChatName: "Write the name of the group el",
            changeGroupName: "Change the name of the group",
            cancel: "Cancel",
            save: "Save"
        }
    },
    es: {
        translation: {
            welcome: "Bienvenido",
            email: "Correo electrónico",
            password: "Contraseña",
            login: "Iniciar sesión",
            account: "¿Aún no tienes una cuenta?",
            register: "Unirse ahora",
            createAccount: "Crea tu cuenta",
            welcomeText: "y permanece en contacto con tus amigos en cualquier momento",
            username: "Usuario",
            confirmPassword: "Confirma tu contraseña",
            alreadyAccount: "¿Ya tienes una cuenta?",
            fieldsRequired: "Todos los campos son requeridos",
            passwordsDontMatch: "Contraseñas no coinciden. Inténtalo de nuevo",
            succesfulCreation: "Usuario creado exitosamente. Ve a la página de iniciar sesión",
            logout: "Cerrar Sesión",
            profile: "Perfil",
            friends: "Amigos",
            messages: "Mensajes",
            groups: "Grupos",
            deleteFriend: "Eliminar amigo",
            chat:"Chats",
            searchContact: "Buscar amigo",
            selectContact: "Selecciona un amigo",
            createGroup: "Crear un grupo",
            groupName: "Nombre del grupo",
            writeChatName: "Escribir el nombre del grupo",
            changeGroupName: "Modificar el nombre del grupo",
            cancel: "Cancelar",
            save: "Guardar"
        }
    },
    fr: {
        translation: {
            welcome: "Bienvenue",
            email: "Adresse e-mail",
            password: "Mot de passe",
            login: "Se connecter",
            account: "Vous n'avez pas de compte?",
            register: "Inscrivez-vous",
            createAccount: "Créez votre compte",
            welcomeText: "et restez en contact avec ton copains à tout moment",
            username: "Nom d’utilisateur",
            confirmPassword: "Confirmez le mot de passe",
            alreadyAccount: "Déjà inscrit(e)?",
            logout: "Se déconnecter",
            profile:"Profil",
            friends: "Amis",
            messages: "Messages",
            groups: "Groupes",
            deleteFriend: "Retirer des amis",
            chats: "Discussions",
            searchContact: "Rechercher un ami",
            selectContact: "Choisir un ami",
            createGroup: "Créer un groupe",
            groupName: "Nom de la discussion",
            writeChatName: "Écrivez le nom de la discussion de groupe",
            changeGroupName: "Modifier le nom de la discussion",
            cancel: "Annuler",
            save: "Enregistrer"
        }
    },
    br: {
        translation: {
            welcome: "Bem-vindo",
            email: "Endereço de e-mail",
            password: "Senha",
            login: "Login",
            account: "Você não tem uma conta?",
            register: "Inscreva-se agora",
            createAccount: "Faça login em sua conta",
            welcomeText: "e manter contato com amigos, a qualquer hora",
            username: "Nome de utilizador(a)",
            confirmPassword: "Confirmar a senha",
            alreadyAccount: "Já se cadastrou?",
            logout: "Sair",
            profile: "Perfil",
            friends: "Amigos",
            messages: "Mensagens",
            groups: "Grupos",
            deleteFriend: "Desamigar",
            chats:"Bate-papos",
            searchContact: "Pesquisar um amigo",
            selectContact: "Escolha um amigo",
            createGroup: "Criar grupo",
            groupName: "Nome do bate-papo",
            writeChatName: "Escreva o nome do chat em grupo",
            changeGroupName: "Alterar o nome do bate-papo",
            cancel: "Cancelar",
            save: "Salvar"
            
        }
    },
    it: {
        translation: {
            welcome: "Benvenuto",
            email: "Indirizzo di posta elettronica",
            password: "Password",
            login: "Accedi",
            account: "Non hai un account?",
            register: "Inscriviti ora",
            createAccount: "Crea il tuo account",
            welcomeText: "e rimaner in contatto con amici sempre",
            username: "Nome utente",
            confirmPassword: "Conferma password",
            alreadyAccount:"Hai già un account?",
            logout: "Esci",
            profile: "Profilo",
            friends: "Amici",
            messages: "Mesaggi",
            groups: "Gruppi",
            deleteFriend: "Rimuovi dagli amici",
            chats: "Chat",
            searchContact: "Cerca un amico",
            selectContact: "Scegli un amico",
            createGroup: "Crea gruppo",
            groupName: "Nome della chat",
            writeChatName: "Scrivi il nome della chat di gruppo",
            changeGroupName: "Modifica nome della chat",
            cancel: "Annulla",
            save: "Salva"
        }
    },
    dt: {
        translation: {
            welcome: "Willkommen",
            email: "E-mail-Adresse",
            password: "Kennwort",
            login: "Anmelden",
            account: "Sie haben kein Konto?",
            register: "Jetzt anmelden.",
            createAccount: "Ihr Konto erstellen",
            welcomeText: "und jederzeit mit Freunden in Kontakt bleiben",
            username: "Benutzername",
            confirmPassword: "Passwort bestätigen",
            alreadyAccount:"Bereits Mitglied?",
            logout: "Abmelden",
            profile: "Profilinformationen",
            friends: "Freunde",
            messages: "Mitteilungen",
            groups: "Gruppen",
            deleteFriend: "Als Freund/in entfernen",
            chats:"Chats",
            searchContact: "Finde einen Freund",
            selectContact: "Wähle einen Freund aus",
            createGroup: "Gruppe erstellen",
            groupName: "Chatname",
            writeChatName: "Geben Sie den Namen des Gruppenchats ein",
            changeGroupName: "Chatnamen ändern",
            cancel: "Abbrechen",
            save: "Speichern"
        }
    }
}

i18next.use(initReactI18next).init({
    resources,
    fallbackLng: "en"
})

export default i18next