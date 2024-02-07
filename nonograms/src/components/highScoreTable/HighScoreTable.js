import highScoreStylesStr from './HighScoreTable.styles.scss';

class HighScoreTable extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    let results = JSON.parse(localStorage.getItem('highScoreTable')).slice(
      0,
      5
    );
    results.sort((a, b) => a.duration - b.duration);
    results = results.map(
      (result, i) => `  <tr class="high-scores__score">
                      <td>${i + 1}.</td>
                      <td>${result.time}</td>
                      <td>${result.level}</td>
                      <td>${result.name}</td>
                    </tr>
                  `
    );

    template.innerHTML = `
    <div class="high-scores">
      <h2>Latest 5 scores:</h2>
      <table class="high-scores__scores">
        <tr class="high-scores__score header">
          <th>No</th>
          <th>Time</th>
          <th>Level</th>
          <th>Game name</th>
        </tr>
        ${results.join('\n')}
      </table>
    </div>
`;
    shadowRoot.append(template.content.cloneNode(true));

    const highScoreStyles = document.createElement('style');
    highScoreStyles.textContent = highScoreStylesStr;
    shadowRoot.append(highScoreStyles);
  }
}

export { HighScoreTable };
