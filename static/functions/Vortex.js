  document.addEventListener('DOMContentLoaded', function() {
    const fromLanguageSelect = document.getElementById('from-language');
    const toLanguageSelect = document.getElementById('to-language');
    const inputTextArea = document.getElementById('input-text');
    const outputTextDiv = document.getElementById('output-text');
    const translateBtn = document.getElementById('translate-btn');
    const charCount = document.getElementById('char-count');
    const clearInputBtn = document.getElementById('clear-input');
    const swapLanguagesBtn = document.getElementById('swap-languages');
    const copyBtn = document.getElementById('copy-btn');
    const loader = document.getElementById('loader');

    async function translateText() {
        const inputText = inputTextArea.value.trim();
        if (!inputText) return;

        const fromLang = fromLanguageSelect.value;
        const toLang = toLanguageSelect.value;

        loader.style.display = 'inline-block';
        outputTextDiv.textContent = '';

        try {
            const response = await fetch(`/translate?from=${fromLang}&text=${encodeURIComponent(inputText)}&to=${toLang}`);
            const translatedText = await response.text();

            let i = 0;
            function typeEffect() {
                if (i < translatedText.length) {
                    outputTextDiv.textContent += translatedText.charAt(i);
                    i++;
                    setTimeout(typeEffect, 19);
                }
            }
            typeEffect();

        } catch (error) {
            outputTextDiv.textContent = 'Translation failed. Try again.';
        } finally {
            loader.style.display = 'none';
        }
    }

    translateBtn.addEventListener('click', translateText);

    swapLanguagesBtn.addEventListener('click', function() {
        const fromValue = fromLanguageSelect.value;
        const toValue = toLanguageSelect.value;

        if (fromValue === "auto") {
            alert("Auto Detect Language Cannot Be Swapped. Please Try Another Language.");
            return;
        }

        fromLanguageSelect.value = toValue;
        toLanguageSelect.value = fromValue;

        if (outputTextDiv.textContent) {
            const inputText = inputTextArea.value;
            inputTextArea.value = outputTextDiv.textContent;
            outputTextDiv.textContent = inputText;
            charCount.textContent = `${inputTextArea.value.length} Characters`;
        }
    });

    copyBtn.addEventListener('click', function() {
        if (outputTextDiv.textContent.trim()) {
            navigator.clipboard.writeText(outputTextDiv.textContent).then(function() {
                copyBtn.innerHTML = '✔ Copied!';
                setTimeout(() => copyBtn.innerHTML = 'Copy', 2000);
            }).catch(err => {
                console.error('Copy failed:', err);
            });
        }
    });

    clearInputBtn.addEventListener('click', function() {
        inputTextArea.value = '';
        outputTextDiv.textContent = '';
        charCount.textContent = '0 Characters';
    });

    inputTextArea.addEventListener('input', function() {
        charCount.textContent = `${this.value.length} Characters`;
    });
  });