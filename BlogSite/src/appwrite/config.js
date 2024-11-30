import Conf from "../conf/Conf"
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
      client=new Client();
      databases;
      bucket;

    constructor() {
        this.client
        .setEndpoint(Conf.appwriteUrl)
        .setProject(Conf.appwriteProject)

        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
        async createPost({title, slug, content, featuredImage, status,userID}){
               try {
                return await this.databases.createDocument(
                    Conf.DatabaseId,
                    Conf.CollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userID,
                    }

                )
                
               } catch (error) {
                throw error;
               }
            }


            async updatePost(slug,{title,  content, featuredImage, status})
            {  
                try {
                    return await this.databases.updateDocument(
                        Conf.DatabaseId,
                        Conf.CollectionId,
                        slug,
                        {
                            title,
                            content,
                            featuredImage,
                            status
                            }
                    )

                    
                } catch (error) {
                   throw error; 
                }

            }


            async deletePost(slug)
            {
                try {
                     await this.databases.deleteDocument(
                        Conf.DatabaseId,
                        Conf.CollectionId,
                        slug,
                    )
                    return true;
                } catch (error) {
                   throw error; 
                  
                }
            }

            async getPost(slug)
            {
                try {
                    return await this.databases.getDocument(
                        Conf.DatabaseId,
                        Conf.CollectionId,
                        slug
                    )
                } catch (error) {
                    console.log("Appwrite service:: getPost:: error", error)
                }
            }

            // function to get only active posts
            async getPosts(queries=[Query.equal("status","active")])
            {
                    try {
                        return await this.databases.listDocuments(
                            Conf.DatabaseId,
                            Conf.CollectionId,
                            queries

                        )
                        
                    } catch (error) {
                        console.error("Appwrite service:: getPosts:: error", error);
                    }
            }

            //method to upload file
            async uploadFile(file){
                try {
                    return await this.bucket.createFile(
                        Conf.BucketId,
                        ID.unique,
                        file
                    )
                    
                } catch (error) {
                    console.log("Appwrite Service:: uploadFile:: error", error);
                }
            }

            //method to delete file
            async deleteFile(fileId){
                try {
                    await this.bucket.deleteFile(
                        Conf.BucketId,
                        fileId
                    )
                    return true
                    
                } catch (error) {
                    console.log("Appwrite service:: deleteFile:: error", error);
                    return false;
            
                }
            }

            getFilePreview(fileId){
                return this.bucket.getFilePreview(
                    Conf.BucketId,
                    fileId
                )
            }
    }


const service = new Service();

export default service;