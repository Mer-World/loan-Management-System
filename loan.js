let loanersList = []; //to store loaners

const checkEligibility = loaner => loaner.income > (loaner.loanAmount * 0.2);//loaner income must be > than 20% of loan amount

const calculateInterestRate = (loanAmount, duration) => {
    let loanRate = loanAmount * 0.10;
    let durationRate = duration * 0.5;
    return loanRate + (loanAmount * (durationRate / 100));
};

const calculateRepayments = loaners =>
    loaners.map(loaner => {
        const isEligible = checkEligibility(loaner);
        const totalInterest = calculateInterestRate(loaner.loanAmount, loaner.duration);
        const totalRepayment = loaner.loanAmount + totalInterest;
        const monthlyRepayment = totalRepayment / (loaner.duration * 12);

        return { ...loaner, isEligible, totalInterest, totalRepayment, monthlyRepayment };
    });

function checkLoanEligibility() {
    const name = document.getElementById("exampleFormControlInput1").value;
    const income = parseFloat(document.getElementById("exampleFormControlInput2").value);
    const loanAmount = parseFloat(document.getElementById("exampleFormControlInput3").value);
    const duration = parseInt(document.getElementById("exampleFormControlInput4").value);

    if (!name || isNaN(income) || isNaN(loanAmount) || isNaN(duration)) {
        alert("Please enter valid information.");
        return;
    }

    const userLoan = { name, income, loanAmount, duration };
    loanersList.push(userLoan); // Add the user loan to the list

    const isEligible = checkEligibility(userLoan);
    alert(isEligible ? `Dear ${name}, you are eligible for a loan :)` : `Dear ${name}, I'm afraid you are not eligible for a loan :(`);
}

function displayLoanSummary() {
    const name = document.getElementById("exampleFormControlInput1").value;
    const income = parseFloat(document.getElementById("exampleFormControlInput2").value);
    const loanAmount = parseFloat(document.getElementById("exampleFormControlInput3").value);
    const duration = parseInt(document.getElementById("exampleFormControlInput4").value);

    if (!name || isNaN(income) || isNaN(loanAmount) || isNaN(duration)) {
        document.getElementById("result").innerHTML = "<p style='color:red'>Please enter valid information.</p>";
        return;
    }

    const userLoan = { name, income, loanAmount, duration };
    const finalizedUserLoan = calculateRepayments([userLoan])[0];

    document.getElementById("result").innerHTML = finalizedUserLoan.isEligible ? `
        <h3>Loan Summary for ${name}</h3>
        <p><strong>Loan Amount:</strong> $${finalizedUserLoan.loanAmount}</p>
        <p><strong>Total Interest:</strong> $${finalizedUserLoan.totalInterest.toFixed(2)}</p>
        <p><strong>Total Repayment:</strong> $${finalizedUserLoan.totalRepayment.toFixed(2)}</p>
        <p><strong>Monthly Payment:</strong> $${finalizedUserLoan.monthlyRepayment.toFixed(2)}</p>
    ` : `<p style='color:red'><strong>${name}, I am afraid you are not eligible for a loan.</strong></p>`;
}
function finalizedAllEligibleLoans() {
    if (loanersList.length === 0) {
        document.getElementById("allResult").innerHTML = "<p style='color:red'>No loan applications found.</p>";
        return;
    }
    const processedLoans = calculateRepayments(loanersList);

    //.filter() to only keep eligible loaners
    const eligibleLoaners = processedLoans.filter(loaner => loaner.isEligible);

    let resultHTML = "<h3>Loan Summary for Approved Loaners</h3>";

    if (eligibleLoaners.length === 0) {
        resultHTML += "<p style='color:red'>No applicants were eligible for a loan.</p>";
    } else {
        eligibleLoaners.forEach(loaner => {
            resultHTML += `
                <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;">
                    <p><strong>Name:</strong> ${loaner.name}</p>
                    <p><strong>Loan Amount:</strong> $${loaner.loanAmount}</p>
                    <p><strong>Total Interest:</strong> $${loaner.totalInterest.toFixed(2)}</p>
                    <p><strong>Total Repayment:</strong> $${loaner.totalRepayment.toFixed(2)}</p>
                    <p><strong>Monthly Payment:</strong> $${loaner.monthlyRepayment.toFixed(2)}</p>
                </div>
            `;
        });
    }

    document.getElementById("allResult").innerHTML = resultHTML;
}
