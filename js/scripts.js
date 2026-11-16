function openPDF(url) {
    window.open(url, '_blank');
}

function adjustMainContentMargin() {
    var navbarHeight = document.getElementsByClassName('navbar')[0].offsetHeight;
    document.getElementsByTagName('main')[0].style.marginTop = (navbarHeight + 50) + 'px';
}

// Adjust margin on page load
window.addEventListener('load', adjustMainContentMargin);

// Adjust margin on window resize
window.addEventListener('resize', adjustMainContentMargin);

// Adjust margin if navbar height changes dynamically
var observer = new MutationObserver(adjustMainContentMargin);
observer.observe(document.getElementsByClassName('navbar')[0], { attributes: true, childList: true, subtree: true });

// ---- BibTeX panels ----
// Clicking a "BibTex" button toggles a read-only box (with Copy / Close)
// right below the publication's buttons, instead of downloading the .bib file.
var bibtexCache = {};

function setBibtexOpen(toggle, open) {
    var panel = toggle.nextElementSibling;
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
    if (!open) return;

    var textarea = panel.querySelector('.bibtex-text');
    var url = toggle.dataset.bibtex;
    var show = function (text) {
        textarea.value = text;
        textarea.rows = Math.min(text.split('\n').length, 18);
    };

    if (bibtexCache[url]) {
        show(bibtexCache[url]);
        return;
    }
    show('Loading…');
    fetch(url)
        .then(function (res) {
            if (!res.ok) throw new Error(res.status);
            return res.text();
        })
        .then(function (text) {
            bibtexCache[url] = text.trim();
            show(bibtexCache[url]);
        })
        .catch(function () {
            show('BibTeX is not available yet.');
        });
}

function copyBibtex(button) {
    var textarea = button.closest('.bibtex-panel').querySelector('.bibtex-text');
    var label = button.querySelector('.bibtex-copy-label');
    var done = function () {
        label.textContent = 'Copied!';
        setTimeout(function () { label.textContent = 'Copy'; }, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textarea.value).then(done);
    } else {
        textarea.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        done();
    }
}

document.addEventListener('click', function (event) {
    var toggle = event.target.closest('.bibtex-toggle');
    if (toggle) {
        setBibtexOpen(toggle, !toggle.classList.contains('active'));
        return;
    }
    var copy = event.target.closest('.bibtex-copy');
    if (copy) {
        copyBibtex(copy);
        return;
    }
    var close = event.target.closest('.bibtex-close');
    if (close) {
        setBibtexOpen(close.closest('.bibtex-panel').previousElementSibling, false);
    }
});
