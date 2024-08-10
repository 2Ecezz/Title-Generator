document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generateButton");
    const selectButton = document.getElementById("selectButton");
    const titleDisplay = document.getElementById("titleDisplay");
    const copyButton = document.getElementById("copyButton");
    let selectedTitle = null;

    fetch('titles.json')
        .then(response => response.json())
        .then(titles => {
            generateButton.addEventListener("click", function() {
                const randomIndex = Math.floor(Math.random() * titles.length);
                selectedTitle = titles[randomIndex];
                titleDisplay.textContent = selectedTitle.title;

                generateButton.classList.add("animate-button");
                generateButton.addEventListener("animationend", () => {
                    generateButton.classList.remove("animate-button");
                }, { once: true });
            });

            selectButton.addEventListener("click", function() {
                if (selectedTitle) {
                    const queryString = `title=${encodeURIComponent(selectedTitle.title)}&description=${encodeURIComponent(selectedTitle.description)}&sourceCode=${encodeURIComponent(selectedTitle.sourceCode)}&document=${encodeURIComponent(selectedTitle.document)}`;
                    window.location.href = `generate.html?${queryString}`;

                    selectButton.classList.add("animate-button");
                    selectButton.addEventListener("animationend", () => {
                        selectButton.classList.remove("animate-button");
                    }, { once: true });
                } else {
                    alert("Please generate a title first.");
                }
            });
        });

    copyButton.addEventListener("click", function() {
        const title = titleDisplay.textContent;
        navigator.clipboard.writeText(title).then(() => {
            alert("Title copied to clipboard!");

            copyButton.classList.add("animate-button");
            copyButton.addEventListener("animationend", () => {
                copyButton.classList.remove("animate-button");
            }, { once: true });
        });
    });
});
