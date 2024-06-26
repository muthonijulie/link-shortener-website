document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form1');
    const input = document.querySelector('#url');
    const divResult = document.querySelector('#result');

    if (!form) {
        console.error('Form not found!');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = input.value;
        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ long_url: url })
            });
            if (response.ok) {
                const data = await response.json();
                const shortUrl = data.link;

                divResult.innerHTML = `
                    <p>LONG URL: <a href="${url}" target="_blank">${url}</a></p>
                    <p>SHORT URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
                    <input type="text" id="shortenedUrl" value="${shortUrl}" readonly>
                    <button id="copyBtn">Copy</button>
                `;
                divResult.style.display = 'block';

                document.getElementById('copyBtn').addEventListener('click', () => {
                    const shortenedUrl = document.getElementById('shortUrl');
                    shortenedUrl.select();
                    document.execCommand('copy');
                    alert('Shortened URL copied to clipboard');
                });
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert('Error shortening URL: ' + (errorData.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error shortening URL');
        }
    });
});
s