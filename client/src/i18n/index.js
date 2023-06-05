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
            groups: "Groups"
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
            groups: "Grupos"
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
            groups: "Groupes"
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
            groups: "Grupos"
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
            groups: "Gruppi"
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
            groups: "Gruppen"
            
        }
    }
}

i18next.use(initReactI18next).init({
    resources,
    fallbackLng: "en"
})

export default i18next