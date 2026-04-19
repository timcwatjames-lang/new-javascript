# Expense Tracker

A simple and intuitive expense tracking application built with vanilla JavaScript, HTML, and CSS. Track your daily expenses, categorize them, and view summaries.

## Features

- Add expenses with amount, category, date, and description
- View all expenses in a clean table format
- Edit and delete existing expenses
- Automatic calculation of total expenses
- Data persistence using localStorage
- Responsive design for mobile and desktop
- **Premium Features**: Export to CSV, visual charts, ad-free experience

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js (for premium charts)

## Getting Started

### Prerequisites

- A modern web browser
- Git (for version control)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/expense-tracker.git
   ```

2. Navigate to the project directory:
   ```
   cd expense-tracker
   ```

3. Open `index.html` in your web browser.

## Deployment

### GitHub

1. Create a new repository on GitHub
2. Push your code to the repository

### Netlify

1. Go to [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Deploy the site

## Usage

1. Fill in the expense form with amount, category, date, and optional description
2. Click "Add Expense" to save it
3. View your expenses in the table below
4. Use the Edit and Delete buttons to modify or remove expenses
5. Check the total expenses in the summary section
6. **Premium**: Click "Upgrade to Premium" to access advanced features like CSV export and charts

## Monetization

This app includes built-in monetization features:

### Ads
- Integrated Google AdSense (replace placeholder codes with your actual AdSense codes)
- Banner and sidebar ad placements
- Ads are hidden for premium users

### Premium Features ($4.99/month)
- Export expenses to CSV file
- Visual pie chart of expenses by category
- Ad-free experience
- Upgrade via Stripe payment link (replace placeholder URL)

### Setting Up Payments
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. In your Stripe dashboard, go to "Products" and create a new product:
   - Name: "Expense Tracker Premium"
   - Price: $4.99/month
   - Description: "Unlock CSV export, charts, and ad-free experience"
3. Create a payment link for the product
4. Copy the payment link URL
5. Replace `YOUR_ACTUAL_PAYMENT_LINK_HERE` in `index.js` with your payment link
6. In Stripe, set the success URL to: `https://your-netlify-site.netlify.app/success/`
7. Set the cancel URL to: `https://your-netlify-site.netlify.app/failure/`
8. After successful payment, users will be redirected to the success page which activates premium features

### Testing Payments
- Use Stripe's test mode during development
- Test payment link: Use the `test-premium.html` page to activate premium without payment
- In `index.js`, uncomment the test line: `const paymentUrl = 'test-premium.html';`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).