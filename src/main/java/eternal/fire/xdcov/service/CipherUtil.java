package eternal.fire.xdcov.service;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.security.*;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.util.Base64;

@Component
@Scope("singleton")
public class CipherUtil {
    private final PublicKey publicKey;
    private final Cipher decryptCipher;

    public CipherUtil() throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(1024);
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        PrivateKey privateKey = keyPair.getPrivate();
        this.publicKey = keyPair.getPublic();
        this.decryptCipher = Cipher.getInstance("RSA");
        decryptCipher.init(Cipher.DECRYPT_MODE, privateKey);
    }

    public String getPublicKey() {
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }

    public String decrypt(String content) throws BadPaddingException, IllegalBlockSizeException {
        return new String(decryptCipher.doFinal(Base64.getDecoder().decode(content)));
    }
}

