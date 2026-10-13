function calculateFineBill() {
    const lateDays = Number(document.getElementById("lateDays").value);
    const bookCount = Number(document.getElementById("bookCount").value);
    const memberType = document.getElementById("memberType").value;
     if (
        !Number.isInteger(lateDays) ||
        lateDays < 0 ||
        lateDays > 10 ||
        !Number.isInteger(bookCount) ||
        bookCount < 1 ||
        bookCount > 5
    ) {
        document.getElementById("result").textContent =
            "Error: Late days must be 0–10 and books must be 1–5.";
        document.getElementById("breakdown").textContent =
            "No calculation performed.";
        return;
    }
   const rate = chooseRate(memberType);
    const basicFine = calculateFine(lateDays, bookCount, rate);
    const processingCharge = basicFine > 0 ? 10 : 0;
    const total = calculateTotal(basicFine, processingCharge);

    document.getElementById("result").textContent =
        "Rate: ₹" + rate +
        " | Basic fine: ₹" + basicFine +
        " | Processing charge: ₹" + processingCharge +
        " | Total: ₹" + total;

    document.getElementById("breakdown").textContent =
        buildBreakdown(lateDays, bookCount, rate);
}

function calculateFine(days, books, rate) {
    return days * books * rate;
}

function chooseRate(type) {
    if (type === "Student") {
        return 5;
    } else if (type === "Staff") {
        return 3;
    } else if (type === "Visitor") {
        return 10;
    } else {
        return 0;
    }
}

function calculateTotal(fine, processingCharge) {
    if (fine <= 0) {
        return 0;
    } else {
        return fine + processingCharge;
    }
}

function buildBreakdown(days, books, rate) {
    if (days === 0) {
        return "No late days. Basic fine: ₹0";
    }

    let summary = "";

    for (let day = 1; day <= days; day++) {
        const cumulativeFine = day * books * rate;
        summary += "Day " + day + ": ₹" + cumulativeFine + "\n";
    }

    return summary.trim();
}
