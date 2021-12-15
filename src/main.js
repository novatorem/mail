const captcha = '/.netlify/functions/captcha'

const base = new URL('https://mail.novac.dev')
const url = new URL(captcha, base)

const onsubmit = (e) => {
    // prevent refresh
    e.preventDefault()
    // get client response token, used to match client on back end
    const rt = grecaptcha.getResponse()

    return fetch(`${url.toString()}?rt=${rt}`)
        .then((res) => {
            if (res.status === 200) {
                return res.text().then((text) => {
                    if (text === '') {
                        text = '(No secret message set.)'
                    }
                    return text
                })
            } 
            return 'You failed the captcha, please try again!'
        }).then((text) => {
            document.getElementById('secret-message').textContent = text
            document.getElementById('secret-message').style.background = 'None'
            if (text === 'You failed the captcha, please try again!') {
                document.getElementById('mail-to').href = "https://support.google.com/recaptcha"
            }
            else {
                document.getElementById('mail-to').href = "mailto:" + text
                document.getElementById('copy-to-clipboard').style.display = "block"
            }
        }).catch((err) => {
            console.log(err)
        })
}

const f = document.getElementById('form')
f.addEventListener('submit', onsubmit)

function copyToClipboard() {
    var copyText = document.getElementById('secret-message');
    navigator.clipboard.writeText(copyText.textContent);

    const div = document.createElement('div')
    div.className = 'toast'
    div.innerHTML = "Copied to clipboard!"  
    setTimeout(function() { div.remove() }, 5000);
    document.body.appendChild(div);
}