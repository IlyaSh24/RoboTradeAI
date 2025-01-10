export function getAiTradingBtnHTML() {
    return `
        <div class="action-high-low button-ai-trading-wrap">
            <a class="ai-trading-btn">
                <div class="ai-trading-btn__icon">
                    <div class="ai-trading-btn__badge">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" class="injected-svg" data-src="/themes/cabinet/svg/icons/ai-trading/badge.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img">
                                <g filter="url(#filter0_i_301_896-1)">
                                    <path d="M16.835 21.1405H12.2638L14.3219 15.0961C14.3363 15.0239 14.3652 14.9661 14.4086 14.9228C14.4663 14.8794 14.5313 14.8578 14.6035 14.8578C14.6758 14.8578 14.7335 14.8794 14.7769 14.9228C14.8346 14.9516 14.878 15.0094 14.9068 15.0961L16.835 21.1405Z" fill="url(#paint0_linear_301_896-2)"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9981 39.9962C31.0427 39.9962 39.9962 31.0427 39.9962 19.9981C39.9962 8.95345 31.0427 0 19.9981 0C8.95345 0 0 8.95345 0 19.9981C0 31.0427 8.95345 39.9962 19.9981 39.9962ZM11.4622 13.6662L6.54431 27.0766H10.3356L11.3322 24.1519H17.7666L18.7198 27.0766H22.6411L17.7016 13.6445C17.4561 12.9657 17.0516 12.4674 16.4884 12.1497C15.9251 11.8175 15.2896 11.6514 14.5819 11.6514C13.8742 11.6514 13.2387 11.8247 12.6754 12.1713C12.1121 12.5035 11.7077 13.0018 11.4622 13.6662ZM23.6196 24.0436V27.0766H32.4804V24.0436H29.859V14.9444H32.4804V11.9114H23.6196V14.9444H26.241V24.0436H23.6196Z" fill="url(#paint1_linear_301_896-3)"></path>
                                    <path class="path" fill-rule="evenodd" clip-rule="evenodd" d="M19.9981 39.9962C31.0427 39.9962 39.9962 31.0427 39.9962 19.9981C39.9962 8.95345 31.0427 0 19.9981 0C8.95345 0 0 8.95345 0 19.9981C0 31.0427 8.95345 39.9962 19.9981 39.9962ZM11.4622 13.6662L6.54431 27.0766H10.3356L11.3322 24.1519H17.7666L18.7198 27.0766H22.6411L17.7016 13.6445C17.4561 12.9657 17.0516 12.4674 16.4884 12.1497C15.9251 11.8175 15.2896 11.6514 14.5819 11.6514C13.8742 11.6514 13.2387 11.8247 12.6754 12.1713C12.1121 12.5035 11.7077 13.0018 11.4622 13.6662ZM23.6196 24.0436V27.0766H32.4804V24.0436H29.859V14.9444H32.4804V11.9114H23.6196V14.9444H26.241V24.0436H23.6196Z" fill="url(#fill-4)"></path>
                                </g>
                                <defs>
                                    <filter id="filter0_i_301_896-1" x="0" y="0" width="39.9962" height="39.9961" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                        <feOffset></feOffset>
                                        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_301_896"></feBlend>
                                    </filter>
                                    <linearGradient id="paint0_linear_301_896-2" x1="27.4984" y1="-1.04364" x2="21.6656" y2="18.9545" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="white" stop-opacity="0"></stop>
                                        <stop offset="1" stop-color="white"></stop>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_301_896-3" x1="27.4984" y1="-1.04364" x2="21.6656" y2="18.9545" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="white" stop-opacity="0"></stop>
                                        <stop offset="1" stop-color="white"></stop>
                                    </linearGradient>
                                    <linearGradient id="fill-4" x1="27.4984" y1="-1.04364" x2="21.6656" y2="18.9545" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="white" stop-opacity="0"></stop>
                                        <stop offset="0" stop-color="white"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="ai-trading-btn__text">Trading</div>
            </a>
        </div>
    `
};