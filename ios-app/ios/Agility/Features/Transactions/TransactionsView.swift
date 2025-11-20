import SwiftUI

struct TransactionsView: View {
    @StateObject private var viewModel = TransactionsViewModel()

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Search and Filter
                VStack(spacing: 12) {
                    SearchBar(text: $viewModel.searchText, placeholder: "Search transactions...")

                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            FilterChip(title: "All", isSelected: viewModel.selectedFilter == .all) {
                                viewModel.selectedFilter = .all
                            }
                            FilterChip(title: "Income", isSelected: viewModel.selectedFilter == .income) {
                                viewModel.selectedFilter = .income
                            }
                            FilterChip(title: "Expenses", isSelected: viewModel.selectedFilter == .expenses) {
                                viewModel.selectedFilter = .expenses
                            }
                            FilterChip(title: "This Month", isSelected: viewModel.selectedFilter == .thisMonth) {
                                viewModel.selectedFilter = .thisMonth
                            }
                        }
                        .padding(.horizontal)
                    }
                }
                .padding(.vertical, 12)
                .background(Color(.systemBackground))

                // Transactions List
                if viewModel.isLoading {
                    ProgressView()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if viewModel.filteredTransactions.isEmpty {
                    emptyState
                } else {
                    List {
                        ForEach(viewModel.groupedTransactions.keys.sorted(by: >), id: \.self) { date in
                            Section(header: Text(date, style: .date).font(.headline)) {
                                ForEach(viewModel.groupedTransactions[date] ?? []) { transaction in
                                    TransactionRow(transaction: transaction)
                                        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                            Button(role: .destructive) {
                                                viewModel.deleteTransaction(transaction)
                                            } label: {
                                                Label("Delete", systemImage: "trash")
                                            }

                                            Button {
                                                viewModel.editCategory(for: transaction)
                                            } label: {
                                                Label("Edit Category", systemImage: "tag")
                                            }
                                            .tint(.blue)
                                        }
                                        .swipeActions(edge: .leading) {
                                            Button {
                                                viewModel.togglePersonal(transaction)
                                            } label: {
                                                Label(transaction.isPersonal ? "Mark Business" : "Mark Personal",
                                                      systemImage: transaction.isPersonal ? "briefcase" : "person")
                                            }
                                            .tint(.orange)
                                        }
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                    .refreshable {
                        await viewModel.refresh()
                    }
                }
            }
            .navigationTitle("Transactions")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Menu {
                        Button {
                            viewModel.scanReceipt()
                        } label: {
                            Label("Scan Receipt", systemImage: "camera")
                        }

                        Button {
                            viewModel.addManually()
                        } label: {
                            Label("Add Manually", systemImage: "plus")
                        }

                        Divider()

                        Button {
                            viewModel.exportToCSV()
                        } label: {
                            Label("Export to CSV", systemImage: "square.and.arrow.up")
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                }
            }
            .sheet(isPresented: $viewModel.showCategoryPicker) {
                if let transaction = viewModel.selectedTransaction {
                    CategoryPickerView(transaction: transaction) { category in
                        viewModel.updateCategory(category)
                    }
                }
            }
        }
        .onAppear {
            viewModel.loadTransactions()
        }
    }

    private var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "list.bullet.rectangle")
                .font(.system(size: 60))
                .foregroundColor(.secondary)

            Text("No Transactions")
                .font(.title2)
                .fontWeight(.semibold)

            Text("Scan a receipt or add a transaction to get started")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)

            Button("Scan Receipt") {
                viewModel.scanReceipt()
            }
            .buttonStyle(.borderedProminent)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Transaction Row
struct TransactionRow: View {
    let transaction: Transaction

    var body: some View {
        HStack(spacing: 12) {
            // Merchant Icon
            ZStack {
                Circle()
                    .fill(categoryColor.opacity(0.2))
                    .frame(width: 44, height: 44)

                Text(transaction.merchantIcon)
                    .font(.title3)
            }

            // Transaction Info
            VStack(alignment: .leading, spacing: 4) {
                Text(transaction.merchant)
                    .font(.body)
                    .fontWeight(.medium)

                HStack(spacing: 8) {
                    Text(transaction.category)
                        .font(.caption)
                        .foregroundColor(.secondary)

                    if transaction.isPersonal {
                        Text("• Personal")
                            .font(.caption2)
                            .foregroundColor(.orange)
                    }
                }
            }

            Spacer()

            // Amount
            Text(transaction.amount, format: .currency(code: "USD"))
                .font(.body)
                .fontWeight(.semibold)
                .foregroundColor(transaction.type == .income ? .green : .primary)
        }
        .padding(.vertical, 4)
    }

    private var categoryColor: Color {
        switch transaction.category {
        case "Food & Dining": return .orange
        case "Transportation": return .blue
        case "Shopping": return .purple
        case "Bills & Utilities": return .red
        case "Income": return .green
        default: return .gray
        }
    }
}

// MARK: - Search Bar
struct SearchBar: View {
    @Binding var text: String
    let placeholder: String

    var body: some View {
        HStack {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.secondary)

            TextField(placeholder, text: $text)

            if !text.isEmpty {
                Button {
                    text = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.secondary)
                }
            }
        }
        .padding(10)
        .background(Color(.systemGray6))
        .cornerRadius(10)
        .padding(.horizontal)
    }
}

// MARK: - Filter Chip
struct FilterChip: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.subheadline)
                .fontWeight(isSelected ? .semibold : .regular)
                .foregroundColor(isSelected ? .white : .primary)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(isSelected ? Color.blue : Color(.systemGray6))
                .cornerRadius(20)
        }
    }
}

// MARK: - Transaction Model
struct Transaction: Identifiable, Codable {
    let id: String
    let merchant: String
    let merchantIcon: String
    let amount: Decimal
    let date: Date
    var category: String
    let type: TransactionType
    var isPersonal: Bool
    let receiptURL: String?

    enum TransactionType: String, Codable {
        case income
        case expense
    }
}

// MARK: - View Model
@MainActor
class TransactionsViewModel: ObservableObject {
    @Published var transactions: [Transaction] = []
    @Published var searchText = ""
    @Published var selectedFilter: FilterType = .all
    @Published var isLoading = false
    @Published var showCategoryPicker = false
    @Published var selectedTransaction: Transaction?

    enum FilterType {
        case all, income, expenses, thisMonth
    }

    var filteredTransactions: [Transaction] {
        var result = transactions

        // Apply search
        if !searchText.isEmpty {
            result = result.filter { $0.merchant.localizedCaseInsensitiveContains(searchText) }
        }

        // Apply filter
        switch selectedFilter {
        case .all:
            break
        case .income:
            result = result.filter { $0.type == .income }
        case .expenses:
            result = result.filter { $0.type == .expense }
        case .thisMonth:
            let calendar = Calendar.current
            let now = Date()
            result = result.filter { calendar.isDate($0.date, equalTo: now, toGranularity: .month) }
        }

        return result.sorted { $0.date > $1.date }
    }

    var groupedTransactions: [Date: [Transaction]] {
        Dictionary(grouping: filteredTransactions) { transaction in
            Calendar.current.startOfDay(for: transaction.date)
        }
    }

    func loadTransactions() {
        isLoading = true

        Task {
            // TODO: Load from API
            await Task.sleep(1_000_000_000)

            // Sample data
            self.transactions = [
                Transaction(id: "1", merchant: "Starbucks", merchantIcon: "☕️", amount: 5.75,
                           date: Date(), category: "Food & Dining", type: .expense, isPersonal: false, receiptURL: nil),
                Transaction(id: "2", merchant: "Client Payment", merchantIcon: "💰", amount: 1250.00,
                           date: Date().addingTimeInterval(-86400), category: "Income", type: .income, isPersonal: false, receiptURL: nil),
            ]

            self.isLoading = false
        }
    }

    func refresh() async {
        loadTransactions()
    }

    func deleteTransaction(_ transaction: Transaction) {
        transactions.removeAll { $0.id == transaction.id }
    }

    func editCategory(for transaction: Transaction) {
        selectedTransaction = transaction
        showCategoryPicker = true
    }

    func updateCategory(_ category: String) {
        guard let transaction = selectedTransaction,
              let index = transactions.firstIndex(where: { $0.id == transaction.id }) else {
            return
        }

        transactions[index].category = category
        showCategoryPicker = false
        selectedTransaction = nil
    }

    func togglePersonal(_ transaction: Transaction) {
        guard let index = transactions.firstIndex(where: { $0.id == transaction.id }) else {
            return
        }

        transactions[index].isPersonal.toggle()
    }

    func scanReceipt() {
        // TODO: Navigate to receipt scanner
    }

    func addManually() {
        // TODO: Navigate to manual entry
    }

    func exportToCSV() {
        // TODO: Generate CSV
    }
}

// MARK: - Category Picker
struct CategoryPickerView: View {
    let transaction: Transaction
    let onSelect: (String) -> Void
    @Environment(\.dismiss) var dismiss

    let categories = ["Food & Dining", "Transportation", "Shopping", "Bills & Utilities",
                     "Entertainment", "Healthcare", "Business Services", "Office Supplies", "Income"]

    var body: some View {
        NavigationView {
            List(categories, id: \.self) { category in
                Button {
                    onSelect(category)
                    dismiss()
                } label: {
                    HStack {
                        Text(category)
                        Spacer()
                        if category == transaction.category {
                            Image(systemName: "checkmark")
                                .foregroundColor(.blue)
                        }
                    }
                }
            }
            .navigationTitle("Select Category")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }
}

#Preview {
    TransactionsView()
}
