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
            document.getElementById('mail-to').href = "mailto:" + text
        }).catch((err) => {
            console.log(err)
        })
}

const f = document.getElementById('form')
f.addEventListener('submit', onsubmit)
