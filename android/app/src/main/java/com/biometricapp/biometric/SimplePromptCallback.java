package com.lakeshoreproject.biometric;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricPrompt;

import com.facebook.react.bridge.Callback;

public class SimplePromptCallback extends BiometricPrompt.AuthenticationCallback {
    private Callback reactErrorCallback;
    private Callback reactSuccessCallback;

    public SimplePromptCallback(Callback reactErrorCallback, Callback reactSuccessCallback) {
        super();
        this.reactErrorCallback = reactErrorCallback;
        this.reactSuccessCallback = reactSuccessCallback;
    }

    @Override
    public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
        super.onAuthenticationError(errorCode, errString);
        if (errorCode == BiometricPrompt.ERROR_NEGATIVE_BUTTON || errorCode == BiometricPrompt.ERROR_USER_CANCELED) {
            this.reactErrorCallback.invoke("cancelled");
        } else {
            this.reactErrorCallback.invoke(errString.toString(), String.valueOf(errorCode));
        }
    }

    @Override
    public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
        super.onAuthenticationSucceeded(result);
        this.reactSuccessCallback.invoke("Successfully authenticated.");
    }
}
