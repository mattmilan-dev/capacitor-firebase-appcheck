import Foundation
import Capacitor
import FirebaseCore
import FirebaseAppCheck

class CustomAppCheckProviderFactory: NSObject, AppCheckProviderFactory {
    func createProvider(with app: FirebaseApp) -> AppCheckProvider? {
        if #available(iOS 14.0, *) {
            return AppAttestProvider(app: app);
        } else {
            return DeviceCheckProvider(app: app);
        }
    }
}


@objc(AppcheckPlugin)
public class AppcheckPlugin: CAPPlugin {
    @objc func initialize(_ call: CAPPluginCall) {
        let debugMode = call.getBool("debug", false)
        if (debugMode) {
            NSLog("AppCheck using Debug settings")
            AppCheck.setAppCheckProviderFactory(
                AppCheckDebugProviderFactory()
            )
        } else {
            NSLog("AppCheck using App Attest or Device Check [Prod]")
            AppCheck.setAppCheckProviderFactory(
                CustomAppCheckProviderFactory()
            )
        }
        if (FirebaseApp.app() == nil) {
            FirebaseApp.configure()
        }
        call.resolve([
            "success": true
        ])
    }
    
    @objc func getAppCheckToken(_ call: CAPPluginCall) {
        AppCheck.appCheck().token(forcingRefresh: false) { token, error in
            guard error == nil else {
                call.reject("Failed to retrieve App Check token: \(error!)")
                return
            }
            guard let token = token else {
                call.reject("Unable to retreive App Check token")
                return
            }
            NSLog("Appcheck token obtained. Is: \(token.token)")
            call.resolve([
                "token": token.token,
                "exp": Int64(token.expirationDate.timeIntervalSince1970 * 1000)
            ])
        }
    }
}

