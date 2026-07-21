## OnKeyDown event - Triggers as soon as key is pressed down (before the text is modified)
For Indian government exams like **SSC (CGL, CHSL, Steno)**, **RRB**, and **State High Court Skill Tests**, typing speed (WPM) and accuracy are calculated using specific standard formulas defined by government examination boards (like TCS/SSC).

Here is the exact formula used by exam boards and how to implement it in your app:

---

## 1. The Standard Exam Formula

Government exams measure speed using **Gross WPM** and **Net WPM** (or Correct WPM).

### Step A: Gross WPM (Total Typing Speed)

In Indian government exams, **5 key presses (characters including spaces) = 1 word**.

$$\text{Gross WPM} = \frac{\text{Total Characters Typed} / 5}{\text{Time in Minutes}}$$

> **Example:** If you typed 1500 characters in 10 minutes:
> 
> $$\text{Gross WPM} = \frac{1500 / 5}{10} = \frac{300}{10} = 30 \text{ WPM}$$
> 
> 

---

### Step B: Net WPM (Final Speed After Penalties)

Errors are deducted from your gross speed to calculate your qualifying speed.

$$\text{Net WPM} = \text{Gross WPM} - \left(\frac{\text{Total Wrong Words}}{\text{Time in Minutes}}\right)$$

---

## 2. Full vs. Half Errors (SSC Marking Scheme)

SSC distinguishes between two types of errors:

* **Full Errors (1 Mistake):** Omission of a word, substitution of a wrong word, or addition of an extra word.
* **Half Errors (0.5 Mistake):** Capitalization errors, spelling errors, or punctuation errors.

$$\text{Total Errors} = \text{Full Errors} + \left(0.5 \times \text{Half Errors}\right)$$

$$\text{Error Percentage (\%)} = \left(\frac{\text{Total Errors}}{\text{Total Words in Master Text}}\right) \times 100$$

> **SSC Allowance:** SSC CHSL/CGL usually allows up to **5% error** for UR (General) candidates and **7% error** for reserved categories. If errors exceed this limit, the candidate fails the skill test.

---

## 3. How to Add WPM to Your React Code

Here is how you can update your `calcResult` function to compute both **Gross WPM**, **Net WPM**, and **Error Percentage** based on exam standards:

```javascript
const calcResult = () => {
  const currentTypedText = textRef.current;
  
  if (!currentTypedText.trim()) {
    setAccuracy(0);
    setWpm(0);
    return;
  }

  // 1. Calculate Gross WPM based on character count (5 chars = 1 word)
  const totalCharacters = currentTypedText.length;
  const timeInMinutes = 10; // Change to your timer duration in minutes
  const grossWPM = (totalCharacters / 5) / timeInMinutes;

  // 2. Count Word Errors
  const words_demo = demo.split(/\s+/);
  const words_typed = currentTypedText.trim().split(/\s+/);
  
  let wrongWords = 0;
  let correctWords = 0;

  for (let i = 0; i < words_typed.length; i++) {
    if (words_demo[i] === words_typed[i]) {
      correctWords++;
    } else {
      wrongWords++;
    }
  }

  // 3. Net WPM (Deducting errors)
  const netWPM = Math.max(0, grossWPM - (wrongWords / timeInMinutes));

  // 4. Accuracy %
  const accuracyPct = ((correctWords / words_typed.length) * 100).toFixed(2);

  setAccuracy(accuracyPct);
  setWpm(Math.round(netWPM)); // Final Net Speed in WPM
};

```

---

> **Key Rule to Remember:** Exam authorities **never** count words by simply using spaces (`.split(' ')`) because a 12-letter word and a 2-letter word are not equal. They **always** use the $1 \text{ Word} = 5 \text{ Characters}$ standard rule.