const {
  createProxyCommandStream,
  expandProxyCommand,
} = require('../src/core/remote-client/proxyCommand');

describe('ProxyCommand', () => {
  test('expands OpenSSH host, port, and user tokens', () => {
    expect(
      expandProxyCommand('nc -x proxy:6565 %h %p %r %%', {
        host: '172.28.24.46',
        port: 22,
        username: 'root',
      })
    ).toBe('nc -x proxy:6565 172.28.24.46 22 root %');
  });

  test('bridges the proxy process stdin and stdout', done => {
    const stream = createProxyCommandStream(
      `${process.execPath} -e "process.stdin.pipe(process.stdout)"`,
      {
        host: 'target',
        port: 22,
      }
    );
    const chunks = [];

    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => {
      expect(Buffer.concat(chunks).toString()).toBe('hello');
      done();
    });
    stream.on('error', done);
    stream.end('hello');
  });
});
