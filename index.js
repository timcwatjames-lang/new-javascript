// Expense Tracker App

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let isPremium = localStorage.getItem('isPremium') === 'true';

const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-body');
const totalAmount = document.getElementById('total-amount');

// Load expenses on page load
document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    checkPremium();
});

// Add expense
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    
    if (amount && category && date) {
        const expense = {
            id: Date.now(),
            amount: amount,
            category: category,
            date: date,
            description: description
        };
        
        expenses.push(expense);
        saveExpenses();
        displayExpenses();
        updateTotal();
        expenseForm.reset();
    }
});

// Display expenses
function displayExpenses() {
    expenseTable.innerHTML = '';
    
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(expense.date)}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.description || '-'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editExpense(${expense.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        
        expenseTable.appendChild(row);
    });
}

// Edit expense
function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;
        document.getElementById('date').value = expense.date;
        document.getElementById('description').value = expense.description;
        
        deleteExpense(id);
    }
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveExpenses();
    displayExpenses();
    updateTotal();
}

// Update total
function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

// Save to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses
function loadExpenses() {
    displayExpenses();
    updateTotal();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Premium features
function checkPremium() {
    const premiumFeatures = document.getElementById('premium-features');
    const ads = document.getElementById('ads');
    const bannerAd = document.getElementById('banner-ad');
    
    if (isPremium) {
        premiumFeatures.style.display = 'block';
        ads.style.display = 'none';
        bannerAd.style.display = 'none';
    } else {
        premiumFeatures.style.display = 'none';
        ads.style.display = 'block';
        bannerAd.style.display = 'block';
    }
}

function upgradeToPremium() {
    // Replace with your actual Stripe payment link
    // For testing, you can use the test page
    const paymentUrl = 'https://buy.stripe.com/YOUR_ACTUAL_PAYMENT_LINK_HERE';

    // Uncomment the line below for testing with the test page
    // const paymentUrl = 'test-premium.html';

    window.location.href = paymentUrl;
}

function activatePremium() {
    isPremium = true;
    localStorage.setItem('isPremium', 'true');
    checkPremium();
    alert('Premium activated! Enjoy your new features.');
}

function exportToCSV() {
    if (!isPremium) {
        alert('This is a premium feature. Please upgrade to access it.');
        return;
    }
    
    let csv = 'Date,Amount,Category,Description\n';
    expenses.forEach(exp => {
        csv += `${exp.date},${exp.amount},${exp.category},"${exp.description}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function renderChart() {
    if (!isPremium) {
        alert('This is a premium feature. Please upgrade to access it.');
        return;
    }
    
    const ctx = document.getElementById('expense-chart').getContext('2d');
    
    // Clear previous chart if exists
    if (window.expenseChart) {
        window.expenseChart.destroy();
    }
    
    const categories = {};
    expenses.forEach(exp => {
        categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });
    
    window.expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Expenses by Category'
                }
            }
        }
    });
}