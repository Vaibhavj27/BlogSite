import Conf from "../conf/Conf"
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client=new Client()
    account;
    
    constructor() {
        this.client
        .setEndpoint(Conf.appwriteUrl)
        .setProject(Conf.ProjectId)
        this.account=new Account(this.client)
    }

    async  CreateAccount({email,password,name}) {
        try {
            const userAccount=await this.account.create(ID.unique,email,password,name)
            if (userAccount) {
                //if account created then login user directly
                return this.Login({email,password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;     
        }
    }

    async Login({email,password})
    {
        try {
            return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser()
    {
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
        }

        return null;
    }


    async Logout()
    {
       try {
          return await this.account.deleteSessions()
       } catch (error) {
        throw error;
       }
    }
}

const authService= new AuthService();

export default authService;