import SwiftUI

struct ContentView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        Group {
            if !appState.hasCompletedOnboarding {
                OnboardingView()
            } else if appState.isAuthenticated {
                MainTabView()
            } else {
                AuthenticationView()
            }
        }
    }
}

// MARK: - Main Tab View
struct MainTabView: View {
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            DashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "chart.bar.fill")
                }
                .tag(0)

            TransactionsView()
                .tabItem {
                    Label("Transactions", systemImage: "list.bullet")
                }
                .tag(1)

            InvoicesView()
                .tabItem {
                    Label("Invoices", systemImage: "doc.text.fill")
                }
                .tag(2)

            ReportsView()
                .tabItem {
                    Label("Reports", systemImage: "chart.pie.fill")
                }
                .tag(3)

            SettingsView()
                .tabItem {
                    Label("More", systemImage: "ellipsis")
                }
                .tag(4)
        }
    }
}

// MARK: - Dashboard View
struct DashboardView: View {
    @StateObject private var viewModel = DashboardViewModel()

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Hero Card - Cash Balance
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Cash Balance")
                            .font(.subheadline)
                            .foregroundColor(.secondary)

                        Text(viewModel.cashBalance, format: .currency(code: "USD"))
                            .font(.system(size: 36, weight: .bold))

                        HStack {
                            Text("Net Profit")
                            Spacer()
                            Text(viewModel.netProfit, format: .currency(code: "USD"))
                                .foregroundColor(viewModel.netProfit >= 0 ? .green : .red)
                        }
                        .font(.subheadline)
                    }
                    .padding()
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .shadow(radius: 2)

                    // Summary Cards
                    HStack(spacing: 12) {
                        SummaryCard(title: "Income", amount: viewModel.totalIncome, color: .green)
                        SummaryCard(title: "Expenses", amount: viewModel.totalExpenses, color: .red)
                    }

                    // Expense Breakdown Chart
                    VStack(alignment: .leading) {
                        Text("Expense Breakdown")
                            .font(.headline)

                        // Pie chart would go here
                        Text("Chart visualization")
                            .frame(height: 200)
                            .frame(maxWidth: .infinity)
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                    }

                    // Quick Actions
                    VStack(spacing: 12) {
                        Button(action: { viewModel.scanReceipt() }) {
                            QuickActionRow(icon: "camera.fill", title: "Scan Receipt", color: .blue)
                        }

                        Button(action: { viewModel.createInvoice() }) {
                            QuickActionRow(icon: "doc.text.fill", title: "Create Invoice", color: .green)
                        }

                        Button(action: { viewModel.sendMoney() }) {
                            QuickActionRow(icon: "arrow.up.circle.fill", title: "Send Money", color: .purple)
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Dashboard")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { viewModel.refresh() }) {
                        Image(systemName: "arrow.clockwise")
                    }
                }
            }
        }
        .onAppear {
            viewModel.loadData()
        }
    }
}

struct SummaryCard: View {
    let title: String
    let amount: Decimal
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline)
                .foregroundColor(.secondary)

            Text(amount, format: .currency(code: "USD"))
                .font(.title2)
                .fontWeight(.semibold)
                .foregroundColor(color)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(radius: 2)
    }
}

struct QuickActionRow: View {
    let icon: String
    let title: String
    let color: Color

    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(color)
                .frame(width: 30)

            Text(title)
                .foregroundColor(.primary)

            Spacer()

            Image(systemName: "chevron.right")
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(radius: 1)
    }
}

// MARK: - Placeholder Views
struct OnboardingView: View {
    var body: some View {
        Text("Onboarding")
    }
}

struct AuthenticationView: View {
    var body: some View {
        Text("Authentication")
    }
}

struct TransactionsView: View {
    var body: some View {
        Text("Transactions")
    }
}

struct InvoicesView: View {
    var body: some View {
        Text("Invoices")
    }
}

struct ReportsView: View {
    var body: some View {
        Text("Reports")
    }
}

struct SettingsView: View {
    var body: some View {
        Text("Settings")
    }
}

// MARK: - View Model
class DashboardViewModel: ObservableObject {
    @Published var cashBalance: Decimal = 0
    @Published var netProfit: Decimal = 0
    @Published var totalIncome: Decimal = 0
    @Published var totalExpenses: Decimal = 0
    @Published var isLoading = false

    func loadData() {
        isLoading = true

        // Fetch dashboard data from API
        Task {
            do {
                // API call would go here
                await MainActor.run {
                    self.cashBalance = 12450.00
                    self.netProfit = 5100.00
                    self.totalIncome = 15200.00
                    self.totalExpenses = 10100.00
                    self.isLoading = false
                }
            } catch {
                print("Error loading data: \(error)")
                self.isLoading = false
            }
        }
    }

    func refresh() {
        loadData()
    }

    func scanReceipt() {
        // Navigate to receipt scanning
    }

    func createInvoice() {
        // Navigate to invoice creation
    }

    func sendMoney() {
        // Navigate to P2P transfer
    }
}

#Preview {
    ContentView()
        .environmentObject(AppState())
}
