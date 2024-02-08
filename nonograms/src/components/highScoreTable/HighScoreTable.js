import highScoreStylesStr from './HighScoreTable.styles.scss';

class HighScoreTable extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    let results = JSON.parse(localStorage.getItem('highScoreTable'));

    if (results) {
      results = results.slice(0, 5);
      results.sort((a, b) => a.duration - b.duration);
      results = results.map(
        (result, i) => `  <tr class="high-scores__score">
                        <td>${i + 1}.</td>
                        <td>${result.time}</td>
                        <td>${result.level[0].toUpperCase() + result.level.slice(1)}</td>
                        <td>${result.size}</td>
                        <td>${result.name[0].toUpperCase() + result.name.slice(1)}</td>
                      </tr>
                    `
      );
    }

    template.innerHTML = `
    <div class="high-scores">
      <h2>Latest 5 scores:</h2>
      <table class="high-scores__scores">
        ${
          results
            ? `
        <tr class="high-scores__score header">
        <th>No</th>
        <th>Time</th>
        <th>Level</th>
        <th>Size</th>
        <th>Game name</th>
        </tr>
        `
            : ''
        } 
        ${results ? results.join('\n') : '<tr><td colspan="4">No scores yet.</td></tr>'}
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
