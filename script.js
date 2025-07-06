const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

// Update length display
document.getElementById("lengthSlider").addEventListener("input", function () {
  document.getElementById("lengthDisplay").textContent = this.value;
});

function generatePassword() {
  const length = parseInt(document.getElementById("lengthSlider").value);
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  // Check if at least one character type is selected
  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert("Please select at least one character type!");
    return;
  }

  // Build character set
  let characters = "";
  if (includeUppercase) characters += charSets.uppercase;
  if (includeLowercase) characters += charSets.lowercase;
  if (includeNumbers) characters += charSets.numbers;
  if (includeSymbols) characters += charSets.symbols;

  // Generate password
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  // Ensure password contains at least one character from each selected type
  if (includeUppercase && !/[A-Z]/.test(password)) {
    password = replaceRandomChar(password, charSets.uppercase);
  }
  if (includeLowercase && !/[a-z]/.test(password)) {
    password = replaceRandomChar(password, charSets.lowercase);
  }
  if (includeNumbers && !/[0-9]/.test(password)) {
    password = replaceRandomChar(password, charSets.numbers);
  }
  if (includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    password = replaceRandomChar(password, charSets.symbols);
  }

  document.getElementById("passwordField").value = password;
  updateStrengthIndicator(password);

  // Reset copy button
  const copyBtn = document.getElementById("copyBtn");
  copyBtn.textContent = "Copy";
  copyBtn.classList.remove("copied");
}

function replaceRandomChar(password, charSet) {
  const randomIndex = Math.floor(Math.random() * password.length);
  const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
  return (
    password.substring(0, randomIndex) +
    randomChar +
    password.substring(randomIndex + 1)
  );
}

function updateStrengthIndicator(password) {
  const bars = ["bar1", "bar2", "bar3", "bar4"];
  const strengthText = document.getElementById("strengthText");

  // Reset bars
  bars.forEach((bar) => {
    const element = document.getElementById(bar);
    element.classList.remove("active", "weak", "medium");
  });

  // Calculate strength
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength++;

  // Update bars and text
  for (let i = 0; i < strength && i < 4; i++) {
    const bar = document.getElementById(bars[i]);
    bar.classList.add("active");

    if (strength <= 2) {
      bar.classList.add("weak");
    } else if (strength <= 3) {
      bar.classList.add("medium");
    }
  }

  // Update strength text
  if (strength <= 2) {
    strengthText.textContent = "Weak Password";
    strengthText.style.color = "#dc3545";
  } else if (strength <= 3) {
    strengthText.textContent = "Medium Password";
    strengthText.style.color = "#ffc107";
  } else {
    strengthText.textContent = "Strong Password";
    strengthText.style.color = "#28a745";
  }
}

function copyPassword() {
  const passwordField = document.getElementById("passwordField");
  const copyBtn = document.getElementById("copyBtn");

  if (passwordField.value) {
    navigator.clipboard
      .writeText(passwordField.value)
      .then(() => {
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2000);
      })
      .catch(() => {
        // Fallback for older browsers
        passwordField.select();
        document.execCommand("copy");
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2000);
      });
  }
}

function generateMultiplePasswords() {
  const passwordList = document.getElementById("passwordList");
  passwordList.innerHTML = "";
  passwordList.style.display = "flex";

  for (let i = 0; i < 5; i++) {
    const length = parseInt(document.getElementById("lengthSlider").value);
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      alert("Please select at least one character type!");
      return;
    }

    let characters = "";
    if (includeUppercase) characters += charSets.uppercase;
    if (includeLowercase) characters += charSets.lowercase;
    if (includeNumbers) characters += charSets.numbers;
    if (includeSymbols) characters += charSets.symbols;

    let password = "";
    for (let j = 0; j < length; j++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    const passwordItem = document.createElement("div");
    passwordItem.className = "password-item";
    passwordItem.innerHTML = `
                    <span>${password}</span>
                    <button class="mini-copy-btn" onclick="copyToClipboard('${password}', this)">Copy</button>
                `;
    passwordList.appendChild(passwordItem);
  }
}

function copyToClipboard(text, button) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1500);
    });
}

// Generate initial password
generatePassword();
