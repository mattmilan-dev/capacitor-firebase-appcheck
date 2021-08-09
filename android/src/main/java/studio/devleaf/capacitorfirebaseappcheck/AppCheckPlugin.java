package studio.devleaf.capacitorfirebaseappcheck;

import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.appcheck.AppCheckToken;
import com.google.firebase.appcheck.FirebaseAppCheck;
import com.google.firebase.appcheck.debug.DebugAppCheckProviderFactory;
import com.google.firebase.appcheck.safetynet.SafetyNetAppCheckProviderFactory;

@CapacitorPlugin(name = "AppCheck")
public class AppCheckPlugin extends Plugin {

    @PluginMethod()
    public void initialize(PluginCall call) {
        JSObject outcome = new JSObject();

        try {
            Boolean debugMode = call.getBoolean("debug", false);
            FirebaseAppCheck firebaseAppCheck = FirebaseAppCheck.getInstance();

            if (debugMode) {
                Log.d("AppCheck", "Appcheck is using debug settings");
                firebaseAppCheck.installAppCheckProviderFactory(
                        DebugAppCheckProviderFactory.getInstance()
                );
            } else {
                Log.d("AppCheck", "Appcheck is using SafetyNet [Prod]");
                firebaseAppCheck.installAppCheckProviderFactory(
                        SafetyNetAppCheckProviderFactory.getInstance()
                );
            }

            outcome.put("success", true);
            call.resolve(outcome);
        } catch (Error e) {
            Log.e("AppCheckInitialize", e.getMessage());
            outcome.put("success", false);
            call.resolve(outcome);
        }
    }

    @PluginMethod()
    public void getAppCheckToken(PluginCall call) {
        FirebaseAppCheck
                .getInstance()
                .getAppCheckToken(false)
                .addOnSuccessListener(appCheckToken -> {
                   JSObject ret = new JSObject();
                   ret.put("token", appCheckToken.getToken());
                   ret.put("exp", appCheckToken.getExpireTimeMillis());
                   call.resolve(ret);
                })
                .addOnFailureListener(e -> {
                    Log.e("AppCheckGetToken", e.getMessage());
                    call.reject(e.getMessage());
                });
    }
}