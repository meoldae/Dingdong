package com.ssafy.dingdong.global.util;

import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class EncryptUtils {
    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final String SECRET_KEY_FACTORY_ALG = "PBKDF2WithHmacSHA256";

    @Value("${letter.password}")
    private String PASSWORD;
    @Value("${letter.salt}")
    private String SALT;
    private static final int ITERATION_COUNT = 65536;
    private static final int KEY_LENGTH = 256;

    public String encrypt(String value) {

        try {
            byte[] iv = new byte[16];
            SecureRandom random = new SecureRandom();
            random.nextBytes(iv);
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);

            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(SECRET_KEY_FACTORY_ALG);
            PBEKeySpec spec = new PBEKeySpec(PASSWORD.toCharArray(), SALT.getBytes(), ITERATION_COUNT, KEY_LENGTH);
            SecretKey tmp = secretKeyFactory.generateSecret(spec);
            SecretKeySpec secretKeySpec = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);

            byte[] encryptedValue = cipher.doFinal(value.getBytes());

            byte[] combined = new byte[iv.length + encryptedValue.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(encryptedValue, 0, combined, iv.length, encryptedValue.length);

            return Base64.getEncoder().encodeToString(combined);
        } catch (Exception e){
            throw new CustomException(ExceptionStatus.FAILED_ENCRYPT_LETTER);
        }


    }

    public String decrypt(String encryptedValueWithIV) {
        try {
            byte[] combined = Base64.getDecoder().decode(encryptedValueWithIV);
            byte[] iv = new byte[16];
            System.arraycopy(combined, 0, iv, 0, iv.length);
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);

            byte[] encryptedValue = new byte[combined.length - iv.length];
            System.arraycopy(combined, iv.length, encryptedValue, 0, encryptedValue.length);

            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(SECRET_KEY_FACTORY_ALG);
            PBEKeySpec spec = new PBEKeySpec(PASSWORD.toCharArray(), SALT.getBytes(), ITERATION_COUNT, KEY_LENGTH);
            SecretKey tmp = secretKeyFactory.generateSecret(spec);
            SecretKeySpec secretKeySpec = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);

            byte[] decryptedValue = cipher.doFinal(encryptedValue);

            return new String(decryptedValue);

        } catch (Exception e) {
            throw new CustomException(ExceptionStatus.FAILED_DECRYPT_LETTER);
        }
    }
}
