import { ChildProcess, spawn } from 'child_process';
import { Duplex } from 'stream';

export interface ProxyCommandOption {
  host: string;
  port: number;
  username?: string;
}

export function expandProxyCommand(
  command: string,
  option: ProxyCommandOption
): string {
  return command.replace(/%%|%[hpr]/g, token => {
    switch (token) {
      case '%%':
        return '%';
      case '%h':
        return option.host;
      case '%p':
        return String(option.port);
      case '%r':
        return option.username || '';
      default:
        return token;
    }
  });
}

function stopProxyProcess(proxyProcess: ChildProcess): void {
  if (proxyProcess.exitCode === null && !proxyProcess.killed) {
    proxyProcess.kill();
  }
}

export function createProxyCommandStream(
  command: string,
  option: ProxyCommandOption
): Duplex {
  const proxyProcess = spawn(
    expandProxyCommand(command, option),
    [],
    {
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe'],
    }
  );
  let streamClosed = false;

  const stream = new Duplex({
    read() {
      // Proxy stdout is forwarded below.
    },
    write(chunk, encoding, callback) {
      if (!proxyProcess.stdin || !proxyProcess.stdin.writable) {
        callback(new Error('ProxyCommand stdin is unavailable'));
        return;
      }

      proxyProcess.stdin.write(chunk, encoding, callback);
    },
    final(callback) {
      if (proxyProcess.stdin && proxyProcess.stdin.writable) {
        proxyProcess.stdin.end();
      }
      callback();
    },
    destroy(error, callback) {
      streamClosed = true;
      stopProxyProcess(proxyProcess);
      callback(error || undefined);
    },
  });

  proxyProcess.stdout!.on('data', chunk => stream.push(chunk));
  proxyProcess.stdout!.on('end', () => stream.push(null));
  proxyProcess.stdout!.on('error', error => stream.destroy(error));
  proxyProcess.stderr!.resume();
  proxyProcess.stdin!.on('error', error => stream.destroy(error));
  proxyProcess.on('error', error => stream.destroy(error));
  proxyProcess.on('exit', (code, signal) => {
    if (code !== 0 && !streamClosed) {
      stream.destroy(
        new Error(
          `ProxyCommand exited with ${signal ? `signal ${signal}` : `code ${code}`}`
        )
      );
    }
  });

  return stream;
}
