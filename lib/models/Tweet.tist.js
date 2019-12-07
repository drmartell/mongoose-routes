const Tweet = require('./Tweet');

describe('Tweet model', () => {
  it('has a required handle', () => {
    const tweet = new Tweet({});

    const { errors } = tweet.validateSync();
    expect(errors.handle.message).toEqual('Path `handle` is required.');
  });

  it('has required text', () => {
    const tweet = new Tweet({});

    const { errors } = tweet.validateSync();
    expect(errors.text.message).toEqual('Path `text` is required.');
  });

  it('has text length under 301 characters', () => {
    const tweet = new Tweet({
      text: 'a'.repeat(301)
    });

    const { errors } = tweet.validateSync();
    expect(errors.text.message).toEqual(`Path \`text\` (\`${tweet.text}\`) is longer than the maximum allowed length (300).`);
  });
});
