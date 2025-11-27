import SwiftUI

@main
struct AgilityApp: App {
    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .onAppear {
                    setupApp()
                }
        }
    }

    private func setupApp() {
        // Configure app-level settings
        configureAppearance()
        configureSecurity()
        configureAnalytics()
    }

    private func configureAppearance() {
        // Support Dark Mode
        // Configure global appearance
    }

    private func configureSecurity() {
        // Initialize biometric authentication
        // Configure keychain
        // Set up encryption
    }

    private func configureAnalytics() {
        // Initialize analytics (if enabled)
        // Configure crash reporting
    }
}

// MARK: - App State
class AppState: ObservableObject {
    @Published var isAuthenticated = false
    @Published var user: User?
    @Published var hasCompletedOnboarding = false

    init() {
        checkAuthenticationStatus()
    }

    private func checkAuthenticationStatus() {
        // Check if user is logged in
        // Verify token validity
    }
}

// MARK: - User Model
struct User: Codable, Identifiable {
    let id: String
    let email: String
    let name: String
    let subscriptionTier: SubscriptionTier
    let createdAt: Date
}

enum SubscriptionTier: String, Codable {
    case free = "free"
    case starter = "starter"
    case pro = "pro"
    case premium = "premium"
}
