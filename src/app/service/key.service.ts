import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import * as fs from "fs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeyService {
   publicKeyFilePath = 'assets/keys/key.pub';
  publicKeyPEM: string;
  constructor(private http:HttpClient) { }
  public encryptString(text){
    let publicKeyDER = this.readPublicKeyDERFromFile(this.publicKeyFilePath);
    //return this.encryptStringWithPublicKey(publicKeyDER, text);
    return  '';
  }

   private readPublicKeyDERFromFile(filePath: string): string {
    this.http.get(filePath).subscribe(data=>{
      console.log(data)
    })
    return null
  }

  private encryptStringWithPublicKey(publicKeyDER: string, plaintext: string): string {

     this.http.get('assets/public_key.pem', { responseType: 'text' }).subscribe((publicKeyPEM: string) => {
       this.publicKeyPEM = publicKeyPEM;
     });

    // Encrypt the plaintext using the public key
    const publicKey = forge.pki.publicKeyFromPem(this.publicKeyPEM);
    const encryptedBuffer = publicKey.encrypt("123456");

    // Convert the encrypted buffer to a Base64-encoded string
    const encryptedString = forge.util.encode64(encryptedBuffer);
    return encryptedString;

  }

// Example usage

}
