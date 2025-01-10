export function executeScriptByFn(executeFn, ...args) {
    chrome.tabs.query({active: true}, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript({
            target: {tabId: tab.id, allFrames: false},
            func: executeFn,
            args: args
        });
    });
}

export function embedAiTradingBtnForDemo(btnHTML) {
    const optionBtnsContainer = document.querySelector('.tour-action-buttons-container');
    const callBtnWrap = document.querySelector('.button-call-wrap');

    const callBtn = document.querySelector('.btn-call');
    const putBtn = document.querySelector('.btn-put');

    const callOrPut = () => {
        const dice = Math.random() < 0.5;
        if (dice) {
            callBtn.click();   
        }
        else {
            putBtn.click();
        }
    };

    if (!optionBtnsContainer) {
        return;
    }

    if (optionBtnsContainer.classList.contains("has-ai-trading")) {
        return;
    }

    optionBtnsContainer.classList.add("has-ai-trading");

    // Embed default AI trading button offered by Pocket Option
    callBtnWrap.insertAdjacentHTML('afterend', btnHTML);

    // Change appearance for the button
    const aiTradingBtnLink = document.querySelector('.ai-trading-btn');
    const aiTradingBtnLabel = document.querySelector('.ai-trading-btn__text');

    aiTradingBtnLink.style.background = '#890000';
    aiTradingBtnLink.addEventListener('click', callOrPut);

    aiTradingBtnLabel.innerHTML = 'Open PRO';
}

export function changeApperanceToProBtn() {
    const aiTradingBtnLink = document.querySelector('.ai-trading-btn');
    const aiTradingBtnLabel = document.querySelector('.ai-trading-btn__text');
    aiTradingBtnLink.style.background = '#890000';
    aiTradingBtnLabel.innerHTML = 'Open PRO';
}

export function changeApperanceToStandardBtn() {
    const aiTradingBtnLink = document.querySelector('.ai-trading-btn');
    const aiTradingBtnLabel = document.querySelector('.ai-trading-btn__text');

    aiTradingBtnLink.style.background = 'radial-gradient(94.74% 100% at 50% 0,#70c8ff 0,#009af9 100%)';
    aiTradingBtnLabel.innerHTML = 'TRADING';
}
