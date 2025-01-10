import { getAiTradingBtnHTML } from './templates.js';
import { 
    executeScriptByFn, 
    embedAiTradingBtnForDemo, 
    changeApperanceToProBtn, 
    changeApperanceToStandardBtn
} from './common.js';

// region Elements 

const yesBtn = document.querySelector("#yes-btn");
const noBtn = document.querySelector("#no-btn");

// region Event handlers

function yesBtnEventHandler() {
    //const aiTradingBtnHTML = getAiTradingBtnHTML();
    executeScriptByFn(changeApperanceToProBtn);
}

function noBtnEventHandler() {
    executeScriptByFn(changeApperanceToStandardBtn);
    window.close();
}

// region Binding events and handlers

yesBtn?.addEventListener('click', yesBtnEventHandler);
noBtn?.addEventListener('click', noBtnEventHandler);
