import dotenv from 'dotenv';
dotenv.config();

//process.env.MONGODB_URI 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://HasanAsins:HamdulilahElLoco666@clusterappphonebook.hcwfwel.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAppPhonebook';;
const PORT = process.env.PORT || 3003;

if (process.env.MONGODB_URI === 'test') {
    MONGODB_URI = process.env.MONGODB_URI
} else if (process.env.MONGODB_URI === 'development') {
    MONGODB_URI = process.env.MONGODB_URI
}

export default { MONGODB_URI, PORT }

