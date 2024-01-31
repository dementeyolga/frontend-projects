import restartBtnStylesStr from './restartBtn.styles.scss';

const restartBtnStyles = document.createElement('style');
restartBtnStyles.textContent = restartBtnStylesStr;

class RestartBtn extends HTMLButtonElement {
	connectedCallback() {
		this.append(restartBtnStyles);
	}
}

export { RestartBtn };
