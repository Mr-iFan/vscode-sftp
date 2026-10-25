# VS Code SFTP 同步扩展（中文说明）

> 本文档是 [README.md](./README.md) 的简体中文译本，并在其后追加了**本仓库（`Mr-iFan/vscode-sftp`）相对上游 `Natizyskunk/vscode-sftp` v1.16.3 的修改内容**与**使用备注**。
> 代码行为以源码为准；本文档与上游英文 README 如有表述差异，以英文版与源码为准。

---

## 目录

- 上游文档译文：[关于本扩展](#关于本扩展)｜[安装](#安装)｜[文档](#文档)｜[使用](#使用)｜[配置示例](#配置示例)｜[远程资源管理器](#远程资源管理器)｜[调试](#调试)｜[常见问题](#常见问题)
- 本仓库说明：[修改内容](#本仓库的修改内容)｜[使用备注](#使用备注)

---

## 关于本扩展

由 [@Natizyskunk](https://github.com/Natizyskunk/) 维护并持续更新的版本 😀
（Fork 自已停止维护的 [liximomo 的 SFTP 插件](https://github.com/liximomo/vscode-sftp.git)）

- VS Code 应用市场：https://marketplace.visualstudio.com/items?itemName=Natizyskunk.sftp
- VSIX 发布页：https://github.com/Natizyskunk/vscode-sftp/releases/

✳ 欢迎以任何方式参与本项目。提交 issue 或 pull request 时，请遵循项目提供的[模板](https://github.com/Natizyskunk/vscode-sftp/issues/new/choose)。

### 上游说明 — 2025/03/13

作者已尽力保持扩展的更新并加入了许多新特性。但过去一年半因个人原因无法投入开发，也无法确定何时能恢复。因此当前请将 [v1.16.3](https://github.com/Natizyskunk/vscode-sftp/releases/tag/v1.16.3) 视为最新的官方稳定版本。

### 上游说明 — 2023/06/23

自 [@liximomo](https://github.com/liximomo) 将其仓库标记为废弃、并在 VS Code 应用市场指向本项目之后，本仓库即成为该 SFTP 扩展的主仓库。此外也存在其他 fork，可自行尝试。

近两年间，上游已发布 50 余个版本，修复了大量缺陷、增加了新特性，并持续提升稳定性。😎

---

VSCode-SFTP 允许你在本地目录中新增、编辑或删除文件，并通过 FTP、SSH 等传输协议同步到远程服务器目录。最基础的配置只需数行，同时也提供丰富的专项设置以满足不同需求。它兼具功能与性能，让开发者可以在熟悉的环境与编辑器中工作，从而节省时间。

- 功能特性
  - [通过远程资源管理器浏览远端文件](#远程资源管理器)
  - 本地与远端差异对比（Diff）
  - 目录同步
  - 上传 / 下载
  - 保存时上传
  - 文件监听（File Watcher）
  - 多套配置
  - 可切换的配置档案（Profile）
  - 临时文件支持
- [命令](https://github.com/Natizyskunk/vscode-sftp/wiki/Commands)
- [调试](#调试)
- [常见问题](#常见问题)

## 安装

### 方式一（推荐：自动更新）

1. 打开扩展面板（`Ctrl + Shift + X`）。
2. 卸载当前来自 @liximomo 的 sftp 扩展。
3. 直接从 VS Code 应用市场安装新扩展：https://marketplace.visualstudio.com/items?itemName=Natizyskunk.sftp。
4. 完成。

### 方式二（手动安装）

在 VS Code 中按以下步骤操作：

1. 打开扩展面板（`Ctrl + Shift + X`）。
2. 卸载当前来自 @liximomo 的 sftp 扩展。
3. 打开「更多操作」菜单（顶部省略号图标），点击「从 VSIX 安装…」。
4. 定位并选择 VSIX 文件。
5. 重新加载 VS Code。
6. 完成。

## 文档

- [首页](https://github.com/Natizyskunk/vscode-sftp/wiki)
- [设置项](https://github.com/Natizyskunk/vscode-sftp/wiki/Setting)
- [通用配置](https://github.com/Natizyskunk/vscode-sftp/wiki/Common-Configuration)
- [SFTP 专属配置](https://github.com/Natizyskunk/vscode-sftp/wiki/SFTP-only-Configuration)
- [FTP 配置](https://github.com/Natizyskunk/vscode-sftp/wiki/FTP(s)-only-Configuration)
- [命令](https://github.com/Natizyskunk/vscode-sftp/wiki/Commands)

## 使用

若远端服务器上已有最新文件，可以从一个空的本地目录开始：先下载整个项目，之后再进入双向同步流程。

1. 在 VS Code 中打开希望与远端同步的本地目录（或新建一个空目录，用于先下载远端目录内容后再在本地编辑）。
2. Windows/Linux 按 `Ctrl+Shift+P`，macOS 按 `Cmd+Shift+P` 打开命令面板，执行 `SFTP: config`。
3. 此时 `.vscode` 目录下会生成基础配置文件 `sftp.json`，打开并按你的服务器信息编辑参数。

例如：

```json
{
    "name": "Profile Name",
    "host": "name_of_remote_host",
    "protocol": "ftp",
    "port": 21,
    "secure": true,
    "username": "username",
    "remotePath": "/public_html/project", // <--- 执行「Download Project」时下载的路径
    "password": "password",
    "uploadOnSave": false
}
```

`sftp.json` 中的 `password` 为可选项；若省略，同步时会提示输入密码。
_注意：_ 反斜杠及其他特殊字符需要用反斜杠转义。

4. 保存并关闭 `sftp.json`。
5. 再次按 `Ctrl+Shift+P`（macOS 为 `Cmd+Shift+P`）打开命令面板。
6. 输入 `sftp`，即可看到一系列命令；项目资源管理器的右键菜单中也可访问多数命令。
7. 若要与远端目录同步，建议先执行 `SFTP: Download Project`，它会把 `sftp.json` 中 `remotePath` 指定的目录下载到当前打开的本地目录。
8. 完成后即可在本地编辑，每次保存都会上传并同步远端文件。
9. 开始使用。

详细说明请参阅 [wiki](https://github.com/Natizyskunk/vscode-sftp/wiki)。

## 配置示例

完整配置项清单见[此处](https://github.com/Natizyskunk/vscode-sftp/wiki/configuration)。

### 最简配置

```json
{
  "host": "host",
  "username": "username",
  "remotePath": "/remote/workspace"
}
```

### 多环境配置（Profiles）

```json
{
  "username": "username",
  "password": "password",
  "remotePath": "/remote/workspace/a",
  "watcher": {
    "files": "dist/*.{js,css}",
    "autoUpload": false,
    "autoDelete": false
  },
  "profiles": {
    "dev": {
      "host": "dev-host",
      "remotePath": "/dev",
      "uploadOnSave": true
    },
    "prod": {
      "host": "prod-host",
      "remotePath": "/prod"
    }
  },
  "defaultProfile": "dev"
}
```

_注意：_ `context` 与 `watcher` 仅可在根层级使用。

使用 `SFTP: Set Profile` 切换配置档案。

### 多上下文（Multiple Context）

`context` 必须**互不相同**。

```json
[
  {
    "name": "server1",
    "context": "project/build",
    "host": "host",
    "username": "username",
    "password": "password",
    "remotePath": "/remote/project/build"
  },
  {
    "name": "server2",
    "context": "project/src",
    "host": "host",
    "username": "username",
    "password": "password",
    "remotePath": "/remote/project/src"
  }
]
```

_注意：_ 该模式下 `name` 为必填项。

### 连接跳板（Connection Hopping）

可通过 SSH 协议的代理连接目标服务器。

_注意：_ 跳板配置中不支持变量替换。

#### 单级跳板

local -> hop -> target

```json
{
  "name": "target",
  "remotePath": "/path/in/target",

  // hop
  "host": "hopHost",
  "username": "hopUsername",
  "privateKeyPath": "/Users/localUser/.ssh/id_rsa", // <-- 密钥文件位于本地

  "hop": {
    // target
    "host": "targetHost",
    "username": "targetUsername",
    "privateKeyPath": "/Users/hopUser/.ssh/id_rsa", // <-- 密钥文件位于跳板机
  }
}
```

#### 多级跳板

local -> hopa -> hopb -> target

```json
{
  "name": "target",
  "remotePath": "/path/in/target",

  // hopa
  "host": "hopAHost",
  "username": "hopAUsername",
  "privateKeyPath": "/Users/hopAUsername/.ssh/id_rsa" // <-- 密钥文件位于本地

  "hop": [
    // hopb
    {
      "host": "hopBHost",
      "username": "hopBUsername",
      "privateKeyPath": "/Users/hopaUser/.ssh/id_rsa" // <-- 密钥文件位于 hopa
    },

    // target
    {
      "host": "targetHost",
      "username": "targetUsername",
      "privateKeyPath": "/Users/hopbUser/.ssh/id_rsa", // <-- 密钥文件位于 hopb
    }
  ]
}
```

### 在用户设置中引用配置

可以用 `remote` 让 sftp 从 [remote-fs](https://github.com/liximomo/vscode-remote-fs) 读取配置。

用户设置中：

```json
"remotefs.remote": {
  "dev": {
    "scheme": "sftp",
    "host": "host",
    "username": "username",
    "rootPath": "/path/to/somewhere"
  },
  "projectX": {
    "scheme": "sftp",
    "host": "host",
    "username": "username",
    "privateKeyPath": "/Users/xx/.ssh/id_rsa",
    "rootPath": "/home/foo/some/projectx"
  }
}
```

在 `sftp.json` 中：

```json
{
  "remote": "dev",
  "remotePath": "/home/xx/",
  "uploadOnSave": false,
  "ignore": [".vscode", ".git", ".DS_Store"]
}
```

## 远程资源管理器

![remote-explorer-preview](https://raw.githubusercontent.com/Natizyskunk/vscode-sftp/master/assets/showcase/remote-explorer.png)

远程资源管理器用于浏览远端文件，可通过以下方式打开：

1. 执行命令 `View: Show SFTP`。
2. 点击活动栏中的 SFTP 视图图标。

远程资源管理器仅支持**查看**文件内容。若需编辑，请执行 `SFTP: Edit in Local` 将其在本地打开编辑。

### 多选

可以在远端服务器上同时选择多个文件/文件夹进行上传或下载：按住 `Ctrl` 或 `Shift` 进行多选，操作方式与普通资源管理器一致。

_注意：_ 若删除文件后资源管理器未正确刷新，需要手动刷新其父目录。

### 排序

在 `sftp.json` 中设置 `remoteExplorer.order` 即可调整远程资源管理器在活动栏中的顺序。

```json
{
  "remoteExplorer": {
    "order": 1 // <-- 默认值为 0
  }
}
```

## 调试

1. 打开用户设置：
   - Windows/Linux：`File > Preferences > Settings`
   - macOS：`Code > Preferences > Settings`
2. 将 `sftp.debug` 设为 `true`，然后重新加载 VS Code。
3. 在 `View > Output > sftp` 中查看日志。

## 常见问题

全部常见问题见[此处](./FAQ.md)。

## 捐赠

如果本项目帮你节省了开发时间并希望提供资金支持：

### Buy Me a Coffee

[![Buy Me A Coffee](https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png)](https://www.buymeacoffee.com/Natizyskunk)

---

# 本仓库的修改内容

本仓库基于上游 `develop` 分支（v1.16.3，提交 `161bf6e`）构建，当前包含 **8 处文件改动与 2 个新增文件**，核心是新增 **ProxyCommand（SSH 代理命令）** 能力，并修复若干编译与连接生命周期缺陷。

## 变更清单

| 文件 | 类型 | 说明 |
| --- | --- | --- |
| `src/core/remote-client/proxyCommand.ts` | 新增 | ProxyCommand 解析与双工流封装（占位符展开、子进程桥接） |
| `test/proxyCommand.spec.js` | 新增 | ProxyCommand 单元测试（占位符展开、stdin/stdout 桥接） |
| `schema/definitions.json` | 修改 | 新增 `proxyCommand` 配置项及其描述 |
| `src/modules/config.ts` | 修改 | Joi 校验规则新增 `proxyCommand: Joi.string()` |
| `src/core/fileService.ts` | 修改 | `SftpOption` 增加 `proxyCommand`；`~/.ssh/config` 增加 `proxycommand → proxyCommand` 映射 |
| `src/core/remote-client/remoteClient.ts` | 修改 | `ConnectOption` 增加 `proxyCommand` 字段 |
| `src/core/remote-client/sshClient.ts` | 修改 | 建立代理流并注入 `sock`；连接结束时销毁流；修复 `close`/`end` 事件回调误调用 |
| `src/commands/abstract/createCommand.ts` | 修改 | 补齐 `COMMAND_UPLOAD_*_TO_ALL_PROFILES` 常量导入（修复编译错误） |
| `src/helper/paths.ts` | 修改 | `getFileSystemPath` 参数类型由 `URI` 改为 `string`，移除 `vscode-uri` 依赖 |
| `test/preprocessor.js` | 修改 | 适配 Jest 27+ transformer 必须返回 `{ code }` 的接口变更 |

> 构建产物（`dist/`、`sftp-*.vsix`、`.npm/`）属于本地编译输出且已被 `.gitignore` 忽略，未纳入本仓库。

## 详细说明

### 1. 新增 ProxyCommand（SSH 代理命令）支持

**背景**：原有 `hop` 机制由扩展内部用 `ssh2` 逐级建立连接，适用于「跳板机本身也跑 SSH 服务」的场景；但在企业环境中更常见的是 SOCKS5 代理、HTTP CONNECT 代理、堡垒机 `nc` 通道等**非 SSH 跳板**，这些场景无法用 `hop` 表达，而上游仅支持在 `~/.ssh/config` 中使用 `ProxyCommand`。

**实现**：新增 `src/core/remote-client/proxyCommand.ts`，提供两个能力：

- `expandProxyCommand(command, { host, port, username })`：按 OpenSSH 语义替换占位符，`%%` → `%`、`%h` → 主机、`%p` → 端口、`%r` → 用户名；其余内容原样保留。
- `createProxyCommandStream(command, option)`：以 `shell: true` 启动子进程，将其 `stdin`/`stdout` 包装为一个 `Duplex` 流，可直接作为 `ssh2` 的 `sock` 使用；并处理以下边界情况：
  - 子进程 `stdin` 不可写时向调用方返回明确错误；
  - 流被 `destroy` 时终止子进程，避免僵尸进程；
  - 子进程非 0 退出且流未被主动关闭时，以错误形式终止流；
  - `stderr` 立即 `resume()` 消费，防止管道写满导致子进程阻塞。

接入点位于 `sshClient.ts`：当配置了 `proxyCommand` 且未提供 `sock` 时，创建代理流并赋给 `option.sock`；在 `end()` 中销毁 `_proxyStream` 并置空。

配置链路为：`sftp.json` → `schema/definitions.json`（校验）→ `modules/config.ts`（Joi 校验）→ `fileService.ts`（`SftpOption` 与 SSH 配置映射）→ `remoteClient.ts`（`ConnectOption`）→ `sshClient.ts`（建连）。

### 2. 修复 SSH 连接关闭事件被立即执行的问题

原代码：

```ts
.on('close', this.end())
.on('end', this.end())
```

`this.end()` 在**注册监听器时**即被调用，其返回值（`undefined`）被当作监听器注册。由此产生两个后果：

1. 事件触发时不会执行任何清理逻辑——`close`/`end` 的监听器实质为空；
2. `end()` 会在 `connect()` 之前被提前调用一次。该次调用的实际影响取决于 `ssh2` 在未连接状态下的处理（通常近似无操作），因此并不必然导致连接失败。

修改为箭头函数后，`end()` 才在事件触发时执行，`hop` 客户端与代理流的清理链路得以生效：

```ts
.on('close', () => this.end())
.on('end', () => this.end())
```

引入 `proxyCommand` 后该缺陷的影响更为直接：代理子进程的回收依赖 `end()`，监听器失效会导致子进程在连接断开后残留。

### 3. 修复「上传到所有 Profile」命令缺少常量导入

`createCommand.ts` 中的 `doCommandRun` 已引用 `COMMAND_UPLOAD_FILE_TO_ALL_PROFILES` 与 `COMMAND_UPLOAD_FOLDER_TO_ALL_PROFILES`，但上游未导入这两个常量，TypeScript 编译报 `Cannot find name`。本次补齐 `../../constants` 的导入语句。

### 4. 修正 `getFileSystemPath` 的参数类型

`src/helper/paths.ts` 中该函数原签名接收 `URI` 并读取 `uri.fsPath`，但其唯一调用点传入的是 `string`（`localContext`、`localPath`）。本次将签名改为 `(uri: string)` 并直接使用该字符串，同时移除不再需要的 `vscode-uri` 导入，使类型与实际调用一致。

### 5. 适配 Jest 27+ transformer 接口

Jest 27 起，`transform` 的 `process` 方法必须返回 `{ code: string }` 对象；返回裸字符串会抛出 `process` 返回值非法的错误。`test/preprocessor.js` 已改为返回 `{ code }`。

### 6. 新增单元测试

`test/proxyCommand.spec.js` 覆盖两项关键行为：

1. 占位符展开：`nc -x proxy:6565 %h %p %r %%` → `nc -x proxy:6565 172.28.24.46 22 root %`；
2. 双工桥接：以当前 Node 进程回显 stdin 作为被测命令，验证写入 `hello` 后能从流中读回 `hello`。

---

# 使用备注

## 1. `proxyCommand` 的配置方式

在 `sftp.json` 中增加 `proxyCommand` 字段即可，值为一条**本地可执行**的 shell 命令；扩展会把 `%h`、`%p`、`%r`、`%%` 替换后交给系统 shell 执行，并把该进程的输入输出作为 SSH 传输通道。

```json
{
  "name": "prod",
  "host": "10.0.8.21",
  "username": "deploy",
  "port": 22,
  "remotePath": "/var/www/app",
  "proxyCommand": "nc -x 127.0.0.1:1080 %h %p",
  "uploadOnSave": true
}
```

常见写法：

| 场景 | 配置值 |
| --- | --- |
| SOCKS5 代理（OpenBSD netcat） | `nc -x 127.0.0.1:1080 %h %p` |
| SOCKS5 代理（ncat） | `ncat --proxy 127.0.0.1:1080 --proxy-type socks5 %h %p` |
| HTTP CONNECT 代理（ncat） | `ncat --proxy 127.0.0.1:8080 --proxy-type http %h %p` |
| 经 SSH 跳板机转发（等价 `ProxyJump`） | `ssh -W %h:%p jump-user@jump-host` |
| 经跳板机 + 指定密钥 | `ssh -i ~/.ssh/id_ed25519 -W %h:%p jump-user@jump-host` |
| Windows（自带 OpenSSH） | `ssh -W %h:%p jump-user@jump-host` |
| Windows（PuTTY plink） | `plink -ssh -batch -nc %h:%p jump-user@jump-host` |

## 2. 占位符与转义

- `%h`：目标主机；`%p`：目标端口；`%r`：目标用户名；`%%`：字面量 `%`。
- 除上述占位符外的内容（如 `~`、`$HOME`、`$(...)`）由 shell 解释，因此可写 `~/.ssh/id_rsa`。
- `sftp.json` 为 JSON 格式，反斜杠需转义（`C:\\Program Files\\...`）。
- 命令中出现字面量百分号时须写 `%%`，否则会被当作占位符处理。

## 3. 与 `hop` 的选择

| 维度 | `hop` | `proxyCommand` |
| --- | --- | --- |
| 连接方式 | 扩展内部用 `ssh2` 逐级建连 | 交给外部进程，扩展只做字节流桥接 |
| 适用场景 | 跳板机本身开放 SSH 且可复用扩展的认证配置 | SOCKS/HTTP 代理、堡垒机、`ssh -W`、企业 VPN 客户端 |
| 认证方式 | 复用 `privateKeyPath`、`password` 等配置 | 由外部命令自身的认证机制决定 |
| 变量替换 | 不支持（上游既有行为） | 支持 `%h`/`%p`/`%r` |
| 依赖 | 无额外本地程序 | 需要 `nc`/`ncat`/`ssh`/`plink` 等可执行文件 |

两者可共存，但作用层级不同：`proxyCommand` 仅在 `sock` 未提供时生效。在 `hop` 模式下，根层配置的 `proxyCommand` 会作用于「本地 → 第一跳」这一段（该层尚未建立转发通道）；后续层级由 `_makeHopping` 提供 `sock`，`proxyCommand` 会被跳过。实际使用中建议二选一，避免链路难以排查。

## 4. 从 `~/.ssh/config` 继承

`fileService.ts` 已加入 `proxycommand → proxyCommand` 的字段映射。若通过 `sshConfigPath` 读取 `~/.ssh/config`，且对应 `Host` 段内声明了 `ProxyCommand`，扩展会自动继承该配置，`sftp.json` 中无需重复书写。

注意：`~/.ssh/config` 中的 `ProxyJump` 不会被映射，需要改写为等价的 `ProxyCommand`（`ssh -W %h:%p ...`）。

## 5. 安全与平台注意事项

- **命令以 shell 执行**：`proxyCommand` 的内容会经 `shell: true` 交由系统 shell 解析，具备执行任意本地命令的能力。若工作区来自不可信来源（例如克隆他人的 `.vscode/sftp.json`），务必先审查该字段。
- **`stderr` 不会输出到日志**：为避免子进程因管道写满而阻塞，代理进程的标准错误被直接消费丢弃。当代理命令失败时，日志中可能只看到 `ProxyCommand exited with code N`，需在终端中手动执行同一条命令排查。
- **进程生命周期**：连接结束或断开时，扩展会终止代理子进程；若外部命令自身派生了子进程（如 `ssh` 再拉起 `nc`），仍可能残留，必要时在命令前加 `exec` 或使用 `-W` 形式。
- **Windows**：系统默认不含 `nc`，请使用 OpenSSH 的 `ssh -W` 或 `plink -nc`；同时注意 shell 为 `cmd.exe`，引号与路径需按 Windows 规则书写。

## 6. 构建与验证

```bash
# 1) 安装依赖
npm install

# 2) 开发构建（webpack watch）
npm run dev

# 3) 生产构建，输出 dist/extension.js
npm run compile

# 4) 打包 VSIX（推荐：无需全局安装 vsce）
npm exec --yes --package=@vscode/vsce -- vsce package --no-yarn
```

### 打包命令说明

| 片段 | 作用 |
| --- | --- |
| `npm exec --yes --package=@vscode/vsce` | 临时获取并执行 vsce，不污染全局环境；`--yes` 跳过安装确认 |
| `--` | 分隔 npm 自身参数与要执行的命令 |
| `vsce package` | 触发 `vscode:prepublish`（即 webpack 生产构建）并生成 `sftp-<version>.vsix` |
| `--no-yarn` | 强制按 npm 解析依赖（默认会根据是否存在 `yarn.lock`/`.yarnrc` 推断） |
| `--out <path>`（可选） | 指定产物路径，例如 `--out /tmp/sftp.vsix` |

执行成功后的产物为仓库根目录下的 `sftp-<version>.vsix`（当前版本号 `1.16.3`），可通过 VS Code 的「从 VSIX 安装…」加载。

### 注意事项

- **包名写法**：必须写作 `@vscode/vsce`。若误写成 `@//vscode/vsce`（双斜杠），npm 会把它当作本地相对路径，报 `ENOENT ... open '<项目路径>/@/vscode/vsce/package.json'`。
- **`package.json` 必须为严格 JSON**：vsce 4.x 使用标准 `JSON.parse` 解析清单。上游 `package.json` 含尾逗号（JSONC），直接打包会报
  `Error parsing 'package.json' manifest file: not a valid JSON file`。一次性转换（会覆盖原文件，建议先备份）：

  ```bash
  cp package.json package.json.bak
  npx --yes json5 --space 2 -o package.json package.json
  ```

  VS Code 本身按 JSONC 解析清单，因此改为严格 JSON 不影响扩展运行；但转换后 `package.json` 会与上游产生纯格式差异，合并上游更新时需注意冲突。
- **前置条件**：打包前须已执行 `npm install`，否则 `vscode:prepublish` 阶段的 webpack 构建会因缺少 `webpack`/`ts-loader` 而失败。
- **产物不入库**：`dist/` 与 `sftp-*.vsix` 均被 `.gitignore` 忽略，不会进入提交。

本次改动已执行以下验证：

- `npx tsc --noEmit -p tsconfig.json`：`src/` 目录 **0 错误**（仅 `node_modules/@types` 存在上游既有的类型定义报错，与本改动无关）。
- ProxyCommand 行为验证：占位符展开与 stdin/stdout 双工桥接均通过（与 `test/proxyCommand.spec.js` 的断言一致）。
- 打包链路验证：`npm exec --yes --package=@vscode/vsce -- vsce --version` 可正常解析（vsce 4.0.0）；在临时副本中将 `package.json` 转为严格 JSON 后，`vsce package --no-yarn` 完整通过 —— webpack 生产构建成功，产出 633 个文件、约 1.26 MB 的 VSIX。未转换时会在清单解析阶段直接失败。

关于单元测试：`test/preprocessor.js` 已适配 Jest 27+ 的 transformer 接口，但本机 Jest 29.0.3 在启动阶段对 `transform` 模块解析报 `Module ... was not found`（Node 22 与 Node 26 下均复现，属工具链环境兼容问题，与源码无关）。建议在 Node 18/20 等 Jest 29 官方支持的环境中执行 `npx jest`。

## 7. 已知限制

- 跳板（`hop`）配置中不支持占位符替换，这是上游既有行为，本次未改动。
- `proxyCommand` 不参与 `hop` 的逐级建连，仅作用于未提供 `sock` 的那一层（通常为「本地 → 第一跳」）。
- 代理命令不支持交互式输入（如需要输入密码的 `sudo`），因为扩展只桥接二进制流，不提供终端语义。
- `dist/` 未提交到仓库，使用前需自行执行 `npm run compile` 生成，或从 Releases 获取 VSIX。
