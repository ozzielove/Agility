import SwiftUI
import LocalAuthentication

// MARK: - Authentication View
struct AuthenticationView: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var viewModel = AuthenticationViewModel()

    var body: some View {
        NavigationView {
            ZStack {
                // Background gradient
                LinearGradient(
                    gradient: Gradient(colors: [Color.blue.opacity(0.6), Color.purple.opacity(0.6)]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()

                VStack(spacing: 30) {
                    // Logo and Title
                    VStack(spacing: 16) {
                        Image(systemName: "dollarsign.circle.fill")
                            .resizable()
                            .frame(width: 80, height: 80)
                            .foregroundColor(.white)

                        Text("Agility")
                            .font(.system(size: 42, weight: .bold))
                            .foregroundColor(.white)

                        Text("Your Financial Command Center")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.9))
                    }
                    .padding(.top, 60)

                    Spacer()

                    // Auth Form
                    VStack(spacing: 20) {
                        if viewModel.isLoginMode {
                            loginForm
                        } else {
                            signupForm
                        }

                        // Biometric Auth Button (if available)
                        if viewModel.biometricType != .none {
                            Button(action: {
                                viewModel.authenticateWithBiometrics()
                            }) {
                                HStack {
                                    Image(systemName: viewModel.biometricType == .faceID ? "faceid" : "touchid")
                                    Text("Use \(viewModel.biometricType == .faceID ? "Face ID" : "Touch ID")")
                                }
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.white.opacity(0.2))
                                .foregroundColor(.white)
                                .cornerRadius(12)
                            }
                        }

                        // Toggle Login/Signup
                        Button(action: {
                            withAnimation {
                                viewModel.isLoginMode.toggle()
                            }
                        }) {
                            Text(viewModel.isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Log In")
                                .foregroundColor(.white)
                                .font(.footnote)
                        }
                        .padding(.top, 8)
                    }
                    .padding(.horizontal, 30)
                    .padding(.bottom, 50)
                }
            }
        }
        .alert("Error", isPresented: $viewModel.showError) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(viewModel.errorMessage)
        }
    }

    private var loginForm: some View {
        VStack(spacing: 16) {
            TextField("Email", text: $viewModel.email)
                .textFieldStyle(RoundedTextFieldStyle())
                .textContentType(.emailAddress)
                .autocapitalization(.none)
                .keyboardType(.emailAddress)

            SecureField("Password", text: $viewModel.password)
                .textFieldStyle(RoundedTextFieldStyle())
                .textContentType(.password)

            Button(action: {
                viewModel.login()
            }) {
                if viewModel.isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                } else {
                    Text("Log In")
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.white.opacity(0.9))
            .foregroundColor(.blue)
            .cornerRadius(12)
            .disabled(viewModel.isLoading)

            Button("Forgot Password?") {
                viewModel.resetPassword()
            }
            .foregroundColor(.white.opacity(0.8))
            .font(.footnote)
        }
    }

    private var signupForm: some View {
        VStack(spacing: 16) {
            TextField("Full Name", text: $viewModel.name)
                .textFieldStyle(RoundedTextFieldStyle())
                .textContentType(.name)

            TextField("Email", text: $viewModel.email)
                .textFieldStyle(RoundedTextFieldStyle())
                .textContentType(.emailAddress)
                .autocapitalization(.none)
                .keyboardType(.emailAddress)

            SecureField("Password", text: $viewModel.password)
                .textFieldStyle(RoundedTextFieldStyle())
                .textContentType(.newPassword)

            SecureField("Confirm Password", text: $viewModel.confirmPassword)
                .textFieldStyle(RoundedTextFieldStyle())
                .textContentType(.newPassword)

            Button(action: {
                viewModel.signup()
            }) {
                if viewModel.isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                } else {
                    Text("Sign Up")
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.white.opacity(0.9))
            .foregroundColor(.blue)
            .cornerRadius(12)
            .disabled(viewModel.isLoading)
        }
    }
}

// MARK: - Custom TextField Style
struct RoundedTextFieldStyle: TextFieldStyle {
    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .padding()
            .background(Color.white.opacity(0.9))
            .cornerRadius(12)
    }
}

// MARK: - View Model
@MainActor
class AuthenticationViewModel: ObservableObject {
    @Published var email = ""
    @Published var password = ""
    @Published var confirmPassword = ""
    @Published var name = ""
    @Published var isLoginMode = true
    @Published var isLoading = false
    @Published var showError = false
    @Published var errorMessage = ""
    @Published var biometricType: BiometricType = .none

    private let context = LAContext()

    enum BiometricType {
        case none, touchID, faceID
    }

    init() {
        checkBiometricAvailability()
    }

    func checkBiometricAvailability() {
        var error: NSError?

        guard context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
            biometricType = .none
            return
        }

        switch context.biometryType {
        case .faceID:
            biometricType = .faceID
        case .touchID:
            biometricType = .touchID
        default:
            biometricType = .none
        }
    }

    func authenticateWithBiometrics() {
        let reason = "Authenticate to access your financial data"

        context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) { success, error in
            Task { @MainActor in
                if success {
                    // TODO: Retrieve stored credentials and login
                    self.loginWithStoredCredentials()
                } else {
                    self.errorMessage = error?.localizedDescription ?? "Biometric authentication failed"
                    self.showError = true
                }
            }
        }
    }

    func login() {
        guard validateLoginInput() else { return }

        isLoading = true

        Task {
            do {
                // TODO: Call backend API
                try await AuthService.shared.login(email: email, password: password)

                // Store credentials for biometric auth
                try KeychainService.shared.saveCredentials(email: email, password: password)

                // Update app state
                // appState.isAuthenticated = true

            } catch {
                errorMessage = error.localizedDescription
                showError = true
            }

            isLoading = false
        }
    }

    func signup() {
        guard validateSignupInput() else { return }

        isLoading = true

        Task {
            do {
                // TODO: Call backend API
                try await AuthService.shared.signup(name: name, email: email, password: password)

                // Auto-login after signup
                try await AuthService.shared.login(email: email, password: password)

            } catch {
                errorMessage = error.localizedDescription
                showError = true
            }

            isLoading = false
        }
    }

    func resetPassword() {
        // TODO: Implement password reset
    }

    private func loginWithStoredCredentials() {
        // TODO: Retrieve from keychain and login
    }

    private func validateLoginInput() -> Bool {
        guard !email.isEmpty else {
            errorMessage = "Please enter your email"
            showError = true
            return false
        }

        guard email.contains("@") else {
            errorMessage = "Please enter a valid email"
            showError = true
            return false
        }

        guard !password.isEmpty else {
            errorMessage = "Please enter your password"
            showError = true
            return false
        }

        return true
    }

    private func validateSignupInput() -> Bool {
        guard !name.isEmpty else {
            errorMessage = "Please enter your name"
            showError = true
            return false
        }

        guard !email.isEmpty, email.contains("@") else {
            errorMessage = "Please enter a valid email"
            showError = true
            return false
        }

        guard password.count >= 8 else {
            errorMessage = "Password must be at least 8 characters"
            showError = true
            return false
        }

        guard password == confirmPassword else {
            errorMessage = "Passwords do not match"
            showError = true
            return false
        }

        return true
    }
}

// MARK: - Auth Service
class AuthService {
    static let shared = AuthService()

    private init() {}

    func login(email: String, password: String) async throws {
        // TODO: Implement API call
        // For now, simulate network delay
        try await Task.sleep(nanoseconds: 1_000_000_000)

        // throw URLError(.badServerResponse)
    }

    func signup(name: String, email: String, password: String) async throws {
        // TODO: Implement API call
        try await Task.sleep(nanoseconds: 1_000_000_000)
    }

    func logout() {
        // TODO: Clear tokens, keychain
    }
}

// MARK: - Keychain Service
class KeychainService {
    static let shared = KeychainService()

    private init() {}

    func saveCredentials(email: String, password: String) throws {
        // TODO: Implement keychain storage
    }

    func retrieveCredentials() throws -> (email: String, password: String)? {
        // TODO: Implement keychain retrieval
        return nil
    }

    func deleteCredentials() {
        // TODO: Implement keychain deletion
    }
}

#Preview {
    AuthenticationView()
        .environmentObject(AppState())
}
