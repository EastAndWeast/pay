const TELEGRAM_URL = 'https://t.me/cs_aurellix';
const TELEGRAM_HANDLE = '@cs_aurellix';

const API_BASE = (() => {
  try {
    return new URL('./api/chatwoot', import.meta.url).href;
  } catch {
    return './api/chatwoot';
  }
})();

const SHOW_SUGGESTIONS = false;
const SESSION_KEY = 'aurellix-cw-session';
const SESSION_TTL_MS = 60 * 60 * 1000; // 1 小时会话保留

const dictionaries = {
  zh: {
    greetName: '我是 Aurellix 客服',
    greetSub: '支持网页在线客服与 Telegram 联系',
    privacy: '请勿在这里填写密码、验证码或银行账户资料。',
    nameLabel: '称呼',
    emailOptional: '联系邮箱（选填）',
    emailLabel: '回复邮箱',
    typeLabel: '问题类型',
    noteLabel: '问题简述',
    namePlaceholder: '怎么称呼您',
    notePlaceholder: '请描述您的问题，方便客服跟进',
    chatPlaceholder: '输入消息，回车发送',
    identitySubmit: '开始聊天',
    leaveSubmit: '提交留言',
    submitting: '提交中',
    sendAria: '发送消息',
    attachAria: '添加图片',
    removeAttachAria: '移除图片',
    attachFile: '图片附件',
    agentWho: 'Aurellix 客服',
    visitorWho: '我',
    emptyChat: '坐席的回复会显示在这里。',
    receiptTitle: '留言已收到',
    receiptBack: '返回',
    receiptDetail: '已进入客服队列，我们将在下一个工作日回复到您的邮箱。',
    stageBack: '返回',
    endChat: '结束会话',
    nameRequired: '请填写称呼。',
    emailInvalid: '请填写正确的邮箱地址。',
    suggestTag: '固定答复',
    tgTitle: '使用 Telegram 联系',
    tgSub: '在 Telegram 中联系专属客服 ' + TELEGRAM_HANDLE,
    tgInline: '或通过 Telegram 联系 ' + TELEGRAM_HANDLE,
    typeOptions: ['费率报价', '通道覆盖', '账户问题', '其他'],
    questions: [
      ['如何联系 Aurellix 客服？', '坐席在线时可发起人工聊天，也可直接跳转 Telegram（@cs_aurellix）。无人接待时，请通过留言表单留下邮箱和问题简述，我们会在下一个工作日回复。'],
      ['可以在这里确认费率或付款通道吗？', '请说明业务场景、相关地区和币种。具体报价、限额及可用通道由客服核实后回复，不在此公开固定答复范围。'],
      ['留言需要填写什么？', '请填写回复邮箱和问题简述。请勿填写密码、验证码、证件号码或银行账户资料。'],
    ],
    states: {
      checking: '正在查看坐席状态',
      online: '坐席在线',
      offline: '当前无人接待',
      unavailable: '暂无法确认在线状态',
    },
    panelAction: {
      checking: '正在查询',
      online: '开始在线聊天',
      offline: '填写留言',
      unavailable: '填写留言',
    },
    aria: {
      panel: 'Aurellix 在线客服',
      launcher: '打开 Aurellix 客服',
      close: '收起客服面板',
      lightbox: '图片预览',
    },
  },
  en: {
    greetName: "I'm Aurellix support",
    greetSub: 'Live web chat and Telegram support available',
    privacy: 'Keep passwords, verification codes and bank account details out of this conversation.',
    nameLabel: 'Your name',
    emailOptional: 'Email (optional)',
    emailLabel: 'Reply email',
    typeLabel: 'Topic',
    noteLabel: 'Brief description',
    namePlaceholder: 'How should we call you',
    notePlaceholder: 'Describe your question so we can follow up',
    chatPlaceholder: 'Type a message, press Enter to send',
    identitySubmit: 'Start a chat',
    leaveSubmit: 'Send message',
    submitting: 'Sending',
    sendAria: 'Send message',
    attachAria: 'Add image',
    removeAttachAria: 'Remove image',
    attachFile: 'Attachment',
    agentWho: 'Aurellix',
    visitorWho: 'Me',
    emptyChat: 'Agent replies will appear here.',
    receiptTitle: 'Message received',
    receiptBack: 'Back',
    receiptDetail: 'It is now in the support queue. We will reply to your email on the next business day.',
    stageBack: 'Back',
    endChat: 'End chat',
    nameRequired: 'Please enter your name.',
    emailInvalid: 'Please enter a valid email address.',
    suggestTag: 'Fixed answer',
    tgTitle: 'Chat via Telegram',
    tgSub: 'Continue in Telegram ' + TELEGRAM_HANDLE,
    tgInline: 'Or contact us on Telegram ' + TELEGRAM_HANDLE,
    typeOptions: ['Rates', 'Coverage', 'Account', 'Other'],
    questions: [
      ['How can I reach Aurellix support?', 'Start a live chat when an agent is available, or message us on Telegram (@cs_aurellix). Otherwise leave your email and a short message, and we will reply on the next business day.'],
      ['Can you confirm rates or payout coverage here?', 'Share your use case, the regions involved and the currency. Pricing, limits and routes are confirmed by our team individually, not as fixed answers.'],
      ['What should I include in a message?', 'Provide a reply email and a brief description. Keep passwords, verification codes, identity numbers and bank details out of your message.'],
    ],
    states: {
      checking: 'Checking agent availability',
      online: 'Agents online',
      offline: 'Agents offline',
      unavailable: 'Availability unknown',
    },
    panelAction: {
      checking: 'Checking',
      online: 'Start a live chat',
      offline: 'Leave a message',
      unavailable: 'Leave a message',
    },
    aria: {
      panel: 'Aurellix Support',
      launcher: 'Open Aurellix support',
      close: 'Collapse support panel',
      lightbox: 'Image preview',
    },
  },
};

function createWidgetDOM() {
  const existing = document.getElementById('cw-root');
  if (existing) existing.remove();

  const root = document.createElement('div');
  root.id = 'cw-root';
  root.innerHTML = `
    <button type="button" id="cw-launcher" class="cw-launcher" aria-haspopup="dialog" aria-controls="cw-panel" aria-expanded="false" aria-label="打开 Aurellix 客服">
      <svg class="cw-icon-chat" viewBox="0 0 24 24" width="25" height="25" aria-hidden="true">
        <path d="M4.5 4.5h15A1.5 1.5 0 0 1 21 6v9a1.5 1.5 0 0 1-1.5 1.5H12l-4.6 3.7c-.5.4-1.2 0-1.2-.6V16.5H4.5A1.5 1.5 0 0 1 3 15V6a1.5 1.5 0 0 1 1.5-1.5Z" fill="currentColor"/>
      </svg>
      <svg class="cw-icon-close" viewBox="0 0 24 24" width="23" height="23" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      </svg>
      <span id="cw-unread" class="cw-unread" hidden></span>
    </button>

    <section id="cw-panel" class="cw-panel" role="dialog" aria-modal="false" aria-label="Aurellix 在线客服" hidden>
      <header class="cw-head">
        <div>
          <p class="cw-hi">Hi ~</p>
          <h2 class="cw-greet"><span data-cw-text="greetName">我是 Aurellix 客服</span> <span aria-hidden="true">🙌</span></h2>
          <p class="cw-greet-sub" data-cw-text="greetSub">支持网页在线客服与 Telegram 即时沟通</p>
        </div>
        <div class="cw-head-tools">
          <nav class="cw-languages" aria-label="Language">
            <button type="button" data-cw-lang="zh" lang="zh-CN" aria-pressed="true">中文</button>
            <button type="button" data-cw-lang="en" lang="en" aria-pressed="false">EN</button>
          </nav>
          <button type="button" id="cw-panel-close" class="cw-icon-btn" aria-label="收起客服面板">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
            </svg>
          </button>
        </div>
      </header>

      <div class="cw-presence-line">
        <span class="cw-presence" id="cw-presence" data-state="checking" role="status">
          <span class="cw-presence-dot" aria-hidden="true"></span>
          <span id="cw-presence-text">正在查看坐席状态</span>
        </span>
      </div>

      <div class="cw-action-row" id="cw-action-row">
        <button class="cw-primary wide" id="cw-panel-action" type="button" aria-controls="cw-stage" aria-expanded="false" disabled>正在查询</button>
        <a class="cw-tg-card" href="${TELEGRAM_URL}" target="_blank" rel="noopener noreferrer">
          <span class="cw-tg-left">
            <span class="cw-tg-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M21.9 4.6c.2-.9-.6-1.6-1.4-1.3L2.7 10.2c-.9.3-.9 1.6.1 1.9l4.4 1.4 1.7 5.3c.2.7 1.1.9 1.6.4l2.5-2.5 4.7 3.4c.7.5 1.7.1 1.9-.7L21.9 4.6ZM9.3 13.7l8.2-5.1c.2-.1.4.2.2.4l-6.7 6.2-.3 2.9-1.4-4.4Z"/>
              </svg>
            </span>
            <span>
              <span class="cw-tg-title" data-cw-text="tgTitle">Telegram 人工客服</span>
              <span class="cw-tg-sub" data-cw-text="tgSub">跳转 ${TELEGRAM_HANDLE} 即时沟通</span>
            </span>
          </span>
          <svg class="cw-tg-arrow" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </a>
      </div>

      <div class="cw-suggest" id="cw-suggest">
        <div class="cw-suggest-list" id="cw-suggest-list"></div>
      </div>

      <div class="cw-stage" id="cw-stage" hidden>
        <div class="cw-stage-bar" id="cw-stage-bar">
          <button type="button" id="cw-stage-back" class="cw-back-btn">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
            <span data-cw-text="stageBack">返回</span>
          </button>
          <button type="button" id="cw-end-chat" class="cw-end-btn" data-cw-text="endChat" hidden>结束会话</button>
        </div>

        <form id="cw-identity-form" hidden novalidate>
          <label><span data-cw-text="nameLabel">称呼</span>
            <input id="cw-visitor-name" name="name" maxlength="60" autocomplete="name" data-cw-placeholder="namePlaceholder" placeholder="怎么称呼您">
          </label>
          <label><span data-cw-text="emailOptional">联系邮箱（选填）</span>
            <input id="cw-visitor-email" name="email" type="email" maxlength="120" autocomplete="email" placeholder="name@example.com">
          </label>
          <p class="cw-notice" data-cw-text="privacy">请勿在这里填写密码、验证码或银行账户资料。</p>
          <button class="cw-primary wide" type="submit" id="cw-identity-submit">开始聊天</button>
        </form>

        <div id="cw-chat-view" hidden>
          <div id="cw-messages" role="log" aria-live="polite"></div>
          <p class="cw-notice slim" data-cw-text="privacy">请勿在这里填写密码、验证码或银行账户资料。</p>
          <div id="cw-attach-chip" hidden>
            <img id="cw-attach-thumb" alt="">
            <span id="cw-attach-name"></span>
            <button type="button" id="cw-attach-remove" aria-label="移除图片">✕</button>
          </div>
          <div class="cw-composer">
            <button type="button" id="cw-chat-attach" class="cw-icon-attach" aria-label="添加图片">
              <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              </svg>
            </button>
            <input type="file" id="cw-chat-file" accept="image/png,image/jpeg,image/webp,image/gif" hidden>
            <input id="cw-chat-input" maxlength="1500" autocomplete="off" data-cw-placeholder="chatPlaceholder" placeholder="输入消息，回车发送">
            <button class="cw-primary round" id="cw-chat-send" type="button" aria-label="发送消息">
              <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
                <path d="M12 19V6M6 11.5 12 5.5l6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </button>
          </div>
        </div>

        <form id="cw-leave-form" hidden novalidate>
          <label><span data-cw-text="emailLabel">回复邮箱</span>
            <input id="cw-leave-email" name="email" type="email" maxlength="120" autocomplete="email" placeholder="name@example.com">
          </label>
          <label><span data-cw-text="typeLabel">问题类型</span>
            <select id="cw-leave-type" name="type"></select>
          </label>
          <label><span data-cw-text="noteLabel">问题简述</span>
            <textarea id="cw-leave-note" name="note" maxlength="1200" data-cw-placeholder="notePlaceholder" placeholder="请描述您的问题，方便客服跟进"></textarea>
          </label>
          <p class="cw-notice" data-cw-text="privacy">请勿在这里填写密码、验证码或银行账户资料。</p>
          <button class="cw-primary wide" type="submit" id="cw-leave-submit">提交留言</button>
          <a class="cw-tg-inline" href="${TELEGRAM_URL}" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="M21.9 4.6c.2-.9-.6-1.6-1.4-1.3L2.7 10.2c-.9.3-.9 1.6.1 1.9l4.4 1.4 1.7 5.3c.2.7 1.1.9 1.6.4l2.5-2.5 4.7 3.4c.7.5 1.7.1 1.9-.7L21.9 4.6ZM9.3 13.7l8.2-5.1c.2-.1.4.2.2.4l-6.7 6.2-.3 2.9-1.4-4.4Z"/>
            </svg>
            <span data-cw-text="tgInline">或通过 Telegram 联系 ${TELEGRAM_HANDLE}</span>
          </a>
        </form>

        <div id="cw-receipt" hidden>
          <p class="cw-receipt-title" data-cw-text="receiptTitle">留言已收到</p>
          <p data-cw-text="receiptDetail">已进入客服队列，我们将在下一个工作日回复到您的邮箱。</p>
          <button class="cw-text-btn" id="cw-receipt-back" type="button" data-cw-text="receiptBack">返回</button>
        </div>
      </div>
    </section>
  `;

  document.body.appendChild(root);
  return root;
}

function initWidget() {
  // 清理旧版本曾使用的本地会话残留键（访客身份仅存页面内存变量）。
  try {
    localStorage.removeItem('aurellix-cw-visitor');
  } catch { }

  const root = createWidgetDOM();

  const launcher = root.querySelector('#cw-launcher');
  const panel = root.querySelector('#cw-panel');
  const panelClose = root.querySelector('#cw-panel-close');
  const presenceEl = root.querySelector('#cw-presence');
  const presenceText = root.querySelector('#cw-presence-text');
  const actionRow = root.querySelector('#cw-action-row');
  const panelAction = root.querySelector('#cw-panel-action');
  const suggestList = root.querySelector('#cw-suggest-list');
  const suggestWrap = root.querySelector('#cw-suggest');
  const stage = root.querySelector('#cw-stage');
  const stageBar = root.querySelector('#cw-stage-bar');
  const stageBack = root.querySelector('#cw-stage-back');
  const endChatBtn = root.querySelector('#cw-end-chat');
  const unreadBadge = root.querySelector('#cw-unread');
  const identityForm = root.querySelector('#cw-identity-form');
  const identitySubmit = root.querySelector('#cw-identity-submit');
  const nameInput = root.querySelector('#cw-visitor-name');
  const emailInput = root.querySelector('#cw-visitor-email');
  const chatView = root.querySelector('#cw-chat-view');
  const messagesEl = root.querySelector('#cw-messages');
  const chatInput = root.querySelector('#cw-chat-input');
  const chatSend = root.querySelector('#cw-chat-send');
  const chatAttach = root.querySelector('#cw-chat-attach');
  const chatFile = root.querySelector('#cw-chat-file');
  const attachChip = root.querySelector('#cw-attach-chip');
  const attachThumb = root.querySelector('#cw-attach-thumb');
  const attachName = root.querySelector('#cw-attach-name');
  const attachRemove = root.querySelector('#cw-attach-remove');
  const leaveForm = root.querySelector('#cw-leave-form');
  const leaveSubmit = root.querySelector('#cw-leave-submit');
  const leaveEmail = root.querySelector('#cw-leave-email');
  const leaveType = root.querySelector('#cw-leave-type');
  const leaveNote = root.querySelector('#cw-leave-note');
  const receipt = root.querySelector('#cw-receipt');
  const receiptBack = root.querySelector('#cw-receipt-back');
  const langButtons = root.querySelectorAll('[data-cw-lang]');

  let language = detectLanguage();
  let state = 'checking';
  let statusRequest;
  let presenceTimer;
  let panelOpen = false;
  let stageOpen = false;
  let pollTimer;
  let sendPending = false;
  let lastMessages = [];
  let identity = null;
  let lastSeenMsgId = 0;
  let unreadCount = 0;
  let pendingAttachment = null;

  function loadSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.sourceId || !data.conversationId || Number(data.expiresAt) <= Date.now()) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  function saveSession() {
    if (!identity) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        sourceId: identity.sourceId,
        conversationId: identity.conversationId,
        lastSeenMsgId,
        expiresAt: Date.now() + SESSION_TTL_MS,
      }));
    } catch { }
  }

  function clearSession() {
    identity = null;
    lastSeenMsgId = 0;
    unreadCount = 0;
    lastMessages = [];
    renderUnread();
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch { }
  }

  function renderUnread() {
    if (unreadCount > 0) {
      unreadBadge.textContent = unreadCount > 9 ? '9+' : String(unreadCount);
      unreadBadge.hidden = false;
    } else {
      unreadBadge.hidden = true;
      unreadBadge.textContent = '';
    }
  }

  function detectLanguage() {
    const fromUrl = new URL(location.href).searchParams.get('lang');
    if (fromUrl === 'en' || fromUrl === 'zh') return fromUrl;
    const browser = (navigator.languages && navigator.languages[0]) || navigator.language || 'zh';
    return /^zh\b/i.test(browser) ? 'zh' : 'en';
  }

  function api(action, options) {
    return fetch(API_BASE + '?action=' + action, {
      cache: 'no-store',
      signal: AbortSignal.timeout(7000),
      ...options,
    }).then(async (response) => {
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'request_failed');
      return body;
    });
  }

  function visitorMeta() {
    return {
      pageLang: language,
      browserLang: (navigator.languages && navigator.languages[0]) || navigator.language || '',
      userAgent: navigator.userAgent,
    };
  }

  function renderLanguage() {
    const copy = dictionaries[language];
    for (const item of root.querySelectorAll('[data-cw-text]')) {
      item.textContent = copy[item.dataset.cwText];
    }
    for (const item of root.querySelectorAll('[data-cw-placeholder]')) {
      item.placeholder = copy[item.dataset.cwPlaceholder];
    }
    for (const button of langButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.cwLang === language));
    }
    const previous = leaveType.value;
    leaveType.replaceChildren(...copy.typeOptions.map((label) => new Option(label, label)));
    if (copy.typeOptions.includes(previous)) leaveType.value = previous;
    identitySubmit.textContent = copy.identitySubmit;
    leaveSubmit.textContent = copy.leaveSubmit;
    chatSend.setAttribute('aria-label', copy.sendAria);
    chatAttach.setAttribute('aria-label', copy.attachAria);
    attachRemove.setAttribute('aria-label', copy.removeAttachAria);
    panel.setAttribute('aria-label', copy.aria.panel);
    launcher.setAttribute('aria-label', copy.aria.launcher);
    panelClose.setAttribute('aria-label', copy.aria.close);
    renderPresence();
    renderSuggestions();
    renderMessages(lastMessages);
  }

  function renderPresence() {
    const copy = dictionaries[language];
    presenceEl.dataset.state = state;
    presenceText.textContent = copy.states[state];
    panelAction.textContent = copy.panelAction[state];
    panelAction.disabled = state === 'checking';
  }

  function renderSuggestions() {
    if (!SHOW_SUGGESTIONS) {
      suggestWrap.hidden = true;
      return;
    }
    const copy = dictionaries[language];
    suggestList.replaceChildren(...copy.questions.map(([question, answer]) => {
      const item = document.createElement('div');
      item.className = 'cw-suggest-item';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cw-suggest-q';
      const label = document.createElement('span');
      label.textContent = question;
      const chev = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      chev.setAttribute('viewBox', '0 0 24 24');
      chev.setAttribute('width', '15');
      chev.setAttribute('height', '15');
      chev.setAttribute('aria-hidden', 'true');
      chev.setAttribute('class', 'cw-chev');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M9 5l7 7-7 7');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      chev.append(path);
      button.append(label, chev);
      const body = document.createElement('div');
      body.className = 'cw-suggest-a';
      body.hidden = true;
      const tag = document.createElement('span');
      tag.className = 'cw-suggest-tag';
      tag.textContent = copy.suggestTag;
      body.append(tag, document.createTextNode(answer));
      button.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        body.hidden = !isOpen;
      });
      item.append(button, body);
      return item;
    }));
  }

  function openLightbox(src) {
    document.querySelector('dialog.cw-lightbox')?.remove();
    const box = document.createElement('dialog');
    box.className = 'cw-lightbox';
    box.setAttribute('closedby', 'any');
    box.setAttribute('aria-label', dictionaries[language].aria.lightbox);

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    box.append(img);

    const cleanup = () => {
      box.remove();
    };
    box.addEventListener('click', () => {
      if (box.open) box.close();
    });
    box.addEventListener('close', cleanup);

    document.body.append(box);
    box.showModal();
  }

  function appendBubbleText(bubble, text) {
    const parts = text.split(/(https?:\/\/[^\s<>"'）)]+)/gi);
    for (const part of parts) {
      if (/^https?:\/\//i.test(part)) {
        const link = document.createElement('a');
        link.href = part;
        link.textContent = part;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'cw-msg-link';
        bubble.append(link);
      } else if (part !== '') {
        bubble.append(document.createTextNode(part));
      }
    }
  }

  function renderMessages(messages) {
    const copy = dictionaries[language];
    lastMessages = messages;
    if (messages.length === 0) {
      messagesEl.replaceChildren(Object.assign(document.createElement('p'), { className: 'cw-msg-empty', textContent: copy.emptyChat }));
      return;
    }
    messagesEl.replaceChildren(...messages.map((message) => {
      const bubble = document.createElement('div');
      bubble.className = 'cw-msg ' + (message.from_agent ? 'agent' : 'visitor');
      const who = document.createElement('span');
      who.className = 'cw-who';
      who.textContent = message.from_agent ? copy.agentWho : copy.visitorWho;
      bubble.append(who);
      if (message.content) {
        const text = document.createElement('span');
        appendBubbleText(text, message.content);
        bubble.append(text);
      }
      for (const attachment of message.attachments || []) {
        if (!attachment.data_url) continue;
        if (attachment.file_type === 'image') {
          const img = document.createElement('img');
          img.src = attachment.data_url;
          img.className = 'cw-msg-img';
          img.alt = '';
          img.addEventListener('click', () => openLightbox(attachment.data_url));
          bubble.append(img);
        } else {
          const fileLink = document.createElement('a');
          fileLink.href = attachment.data_url;
          fileLink.target = '_blank';
          fileLink.rel = 'noopener noreferrer';
          fileLink.className = 'cw-msg-link';
          fileLink.textContent = copy.attachFile;
          bubble.append(fileLink);
        }
      }
      return bubble;
    }));
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideAllViews() {
    identityForm.hidden = true;
    chatView.hidden = true;
    leaveForm.hidden = true;
    receipt.hidden = true;
    stage.hidden = true;
  }

  function showView(view) {
    hideAllViews();
    suggestWrap.hidden = true;
    actionRow.hidden = true;
    panelAction.setAttribute('aria-expanded', 'true');
    stage.hidden = false;
    stageBar.hidden = view === receipt;
    endChatBtn.hidden = view !== chatView || !identity;
    view.hidden = false;
    stageOpen = true;
  }

  function backToSuggestions() {
    hideAllViews();
    suggestWrap.hidden = !SHOW_SUGGESTIONS;
    actionRow.hidden = false;
    panelAction.setAttribute('aria-expanded', 'false');
    stageOpen = false;
    stopPolling();
  }

  async function refreshStatus() {
    if (statusRequest) return statusRequest;
    statusRequest = (async () => {
      try {
        const result = await api('presence');
        if (typeof result.online !== 'boolean') throw new Error('invalid_presence');
        state = result.online ? 'online' : 'offline';
      } catch {
        state = 'unavailable';
      } finally {
        renderPresence();
        statusRequest = undefined;
      }
    })();
    return statusRequest;
  }

  function startPresencePolling() {
    if (presenceTimer) clearInterval(presenceTimer);
    void refreshStatus();
    presenceTimer = setInterval(() => {
      if (!document.hidden) void refreshStatus();
    }, 7000);
  }

  function beginChatFlow() {
    if (identity) {
      showView(chatView);
      startPolling();
      chatInput.focus();
      return;
    }
    if (state === 'online') {
      showView(identityForm);
      nameInput.focus();
    } else {
      showView(leaveForm);
      leaveEmail.focus();
    }
  }

  async function pollMessages() {
    if (!identity) return;
    try {
      const result = await api('messages&conversation_id=' + identity.conversationId + '&source_id=' + encodeURIComponent(identity.sourceId));
      const msgs = result.messages || [];
      renderMessages(msgs);

      const viewingChat = panelOpen && stageOpen && !chatView.hidden && !document.hidden;
      const maxId = msgs.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);
      if (viewingChat) {
        if (maxId > lastSeenMsgId) lastSeenMsgId = maxId;
        unreadCount = 0;
        renderUnread();
        saveSession();
      } else {
        unreadCount = msgs.filter((m) => m.from_agent && (Number(m.id) || 0) > lastSeenMsgId).length;
        renderUnread();
      }
    } catch { }
  }

  function startPolling(intervalMs = 3000) {
    stopPolling();
    void pollMessages();
    pollTimer = setInterval(() => {
      if (!document.hidden) void pollMessages();
    }, intervalMs);
  }

  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = undefined;
  }

  function setPanel(open) {
    panelOpen = open;
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      void refreshStatus();
      if (identity) {
        showView(chatView);
        startPolling(3000);
        chatInput.focus();
      }
    } else if (identity) {
      // 存在进行中会话且未过期时，收起面板后保持低频后台轮询以便提示未读新消息
      startPolling(5000);
    } else {
      stopPolling();
    }
  }

  launcher.addEventListener('click', () => setPanel(!panelOpen));
  panelClose.addEventListener('click', () => setPanel(false));
  panelAction.addEventListener('click', beginChatFlow);
  stageBack.addEventListener('click', backToSuggestions);
  endChatBtn.addEventListener('click', () => {
    clearSession();
    backToSuggestions();
  });

  document.addEventListener('keydown', (event) => {
    // 灯箱打开时 Esc 只关闭灯箱，不收起客服面板
    if (event.key === 'Escape' && panelOpen && !document.querySelector('dialog.cw-lightbox[open]')) {
      setPanel(false);
    }
  });

  identityForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const copy = dictionaries[language];
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name) {
      nameInput.focus();
      nameInput.placeholder = copy.nameRequired;
      return;
    }
    if (email && !email.includes('@')) {
      emailInput.focus();
      emailInput.placeholder = copy.emailInvalid;
      return;
    }
    identitySubmit.disabled = true;
    identitySubmit.textContent = copy.submitting;
    try {
      const started = await api('start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, meta: visitorMeta() }),
      });
      const conversation = await api('conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId: started.source_id, lang: language }),
      });
      identity = { sourceId: started.source_id, conversationId: conversation.conversation_id };
      lastSeenMsgId = 0;
      unreadCount = 0;
      saveSession();
      lastMessages = [];
      showView(chatView);
      renderMessages(lastMessages);
      startPolling();
      chatInput.focus();
    } catch {
      nameInput.focus();
    } finally {
      identitySubmit.disabled = false;
      identitySubmit.textContent = copy.identitySubmit;
    }
  });

  async function sendChatMessage() {
    if (sendPending || !identity) return;
    const content = chatInput.value.trim();
    const attachments = pendingAttachment ? [pendingAttachment.dataUrl] : [];
    if (!content && attachments.length === 0) return;
    sendPending = true;
    chatSend.disabled = true;
    try {
      await api('send&conversation_id=' + identity.conversationId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId: identity.sourceId, content, attachments }),
      });
      chatInput.value = '';
      clearPendingAttachment();
      await pollMessages();
    } catch { } finally {
      sendPending = false;
      chatSend.disabled = false;
      chatInput.focus();
    }
  }

  function clearPendingAttachment() {
    pendingAttachment = null;
    attachChip.hidden = true;
    chatFile.value = '';
  }

  function setPendingAttachment(file) {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif)$/i.test(file.type)) return;
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => {
      pendingAttachment = { name: file.name, dataUrl: String(reader.result) };
      attachThumb.src = pendingAttachment.dataUrl;
      attachName.textContent = file.name;
      attachChip.hidden = false;
    };
    reader.readAsDataURL(file);
  }

  chatAttach.addEventListener('click', () => chatFile.click());
  chatFile.addEventListener('change', () => setPendingAttachment(chatFile.files[0]));
  attachRemove.addEventListener('click', clearPendingAttachment);

  chatSend.addEventListener('click', () => void sendChatMessage());
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendChatMessage();
    }
  });

  leaveForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const copy = dictionaries[language];
    const email = leaveEmail.value.trim();
    const note = leaveNote.value.trim();
    if (!email.includes('@')) {
      leaveEmail.focus();
      leaveEmail.placeholder = copy.emailInvalid;
      return;
    }
    if (!note) {
      leaveNote.focus();
      leaveNote.placeholder = copy.notePlaceholder;
      return;
    }
    leaveSubmit.disabled = true;
    leaveSubmit.textContent = copy.submitting;
    try {
      await api('leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: leaveType.value, note, lang: language, meta: visitorMeta() }),
      });
      showView(receipt);
      receiptBack.focus();
      leaveForm.reset();
    } catch { } finally {
      leaveSubmit.disabled = false;
      leaveSubmit.textContent = copy.leaveSubmit;
    }
  });

  receiptBack.addEventListener('click', backToSuggestions);

  for (const button of langButtons) {
    button.addEventListener('click', () => {
      if (language === button.dataset.cwLang) return;
      language = button.dataset.cwLang;
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
      if (!identity) {
        backToSuggestions();
      }
      renderLanguage();
    });
  }

  // 与官网顶部语言切换保持同步（当且仅当用户未在 URL 强制指定或页面 lang 变化时）
  const htmlObserver = new MutationObserver(() => {
    const docLang = /^zh/i.test(document.documentElement.lang) ? 'zh' : 'en';
    if (docLang !== language) {
      language = docLang;
      renderLanguage();
    }
  });
  htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      void refreshStatus();
      if (panelOpen && stageOpen && !chatView.hidden) void pollMessages();
    }
  });

  // 移动端导航栏（<1024px）外露“咨询客服”按钮，与 PC 端保持一致的“默认隐藏气泡、点击头部再展示”逻辑
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn && !document.getElementById('cw-mobile-nav-contact')) {
    const mobileContactBtn = document.createElement('button');
    mobileContactBtn.type = 'button';
    mobileContactBtn.id = 'cw-mobile-nav-contact';
    mobileContactBtn.className = 'lg:hidden ml-auto mr-1 btn-contact px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shrink-0';
    mobileContactBtn.setAttribute('data-i18n', 'nav_contact');
    mobileContactBtn.innerHTML = `${/^zh/i.test(document.documentElement.lang) ? '咨询客服' : 'Contact'} <i class="fa-solid fa-comment-dots text-xs" data-keep-icon="true" aria-hidden="true"></i>`;
    mobileMenuBtn.classList.remove('ml-auto');
    mobileMenuBtn.parentNode.insertBefore(mobileContactBtn, mobileMenuBtn);
  }

  const navTriggers = document.querySelectorAll('a[data-i18n="nav_contact"], button[data-i18n="nav_contact"], a:has([data-i18n="nav_contact"]), a[data-i18n="hero_btn2"], a:has([data-i18n="wallet_btn_consult"])');

  const savedSession = loadSession();
  if (savedSession) {
    identity = { sourceId: savedSession.sourceId, conversationId: savedSession.conversationId };
    lastSeenMsgId = Number(savedSession.lastSeenMsgId) || 0;
    launcher.hidden = false;
    startPolling(5000);
  } else if (navTriggers.length > 0) {
    launcher.hidden = true;
  }

  renderLanguage();
  startPresencePolling();

  window.AurellixCW = {
    open: () => {
      launcher.hidden = false;
      setPanel(true);
    },
    close: () => setPanel(false),
    toggle: () => {
      launcher.hidden = false;
      setPanel(!panelOpen);
    },
  };

  // 将官网“咨询客服”入口（nav_contact）绑定为展开右下角客服面板，而非直接跳转 Telegram
  for (const trigger of navTriggers) {
    const tgIcon = trigger.querySelector('i.fa-telegram');
    if (tgIcon) {
      tgIcon.classList.remove('fa-brands', 'fa-telegram');
      tgIcon.classList.add('fa-solid', 'fa-comment-dots');
    }
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      if (trigger.closest('#mobile-menu') && window.AurellixV2?.toggleMobileMenu) {
        window.AurellixV2.toggleMobileMenu(true);
      }
      launcher.hidden = false;
      setPanel(true);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}
