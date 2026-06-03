const api = require('../../../utils/api');
const localMock = require('../../../utils/ai-mock');

const AI_NAME = '小汽';
const WELCOME =
  '你好，我是小汽 🚗\n专注解答保养、故障、零件、驾驶等问题。有什么汽车上的疑惑，尽管问我～\n（非汽车话题暂时无法回答哦）';

Page({
  data: {
    messages: [],
    input: '',
    thinking: false,
    scrollTo: '',
    suggestions: [],
    canSend: false
  },

  onLoad() {
    this.loadSuggestions();
    this.streamWelcome();
  },

  onUnload() {
    this.clearStreamTimer();
  },

  clearStreamTimer() {
    if (this._streamTimer) {
      clearTimeout(this._streamTimer);
      this._streamTimer = null;
    }
  },

  async loadSuggestions() {
    try {
      const res = await api.getAiSuggestions();
      this.setData({ suggestions: res.data || [] });
    } catch (e) {
      this.setData({
        suggestions: ['机油多久换一次？', '刹车片什么时候该换？', '发动机抖动怎么办？']
      });
    }
  },

  onInput(e) {
    const val = e.detail.value;
    this.setData({ input: val, canSend: !!val.trim() });
  },

  askSuggest(e) {
    const q = e.currentTarget.dataset.q;
    this.setData({ input: q, canSend: true });
    this.send();
  },

  scrollToBottom(id) {
    this.setData({ scrollTo: id ? `msg-${id}` : '' });
  },

  updateMessage(id, patch) {
    const messages = this.data.messages.map((m) =>
      m.id === id ? { ...m, ...patch } : m
    );
    this.setData({ messages });
  },

  appendAssistantShell(rejected = false) {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const messages = [
      ...this.data.messages,
      {
        id,
        role: 'assistant',
        name: AI_NAME,
        content: '',
        streaming: true,
        rejected
      }
    ];
    this.setData({ messages, scrollTo: `msg-${id}` });
    return id;
  },

  streamWelcome() {
    const id = this.appendAssistantShell(false);
    this.streamText(id, WELCOME);
  },

  streamText(msgId, fullText) {
    this.clearStreamTimer();
    return new Promise((resolve) => {
      let index = 0;
      const tick = () => {
        if (index >= fullText.length) {
          this.updateMessage(msgId, { content: fullText, streaming: false });
          this.scrollToBottom(msgId);
          resolve();
          return;
        }
        const ch = fullText[index];
        const step = ch === '\n' ? 1 : /[，。！？、；：]/.test(ch) ? 1 : 2;
        index = Math.min(index + step, fullText.length);
        this.updateMessage(msgId, {
          content: fullText.slice(0, index),
          streaming: true
        });
        this.scrollToBottom(msgId);
        const delay = /[，。！？]/.test(fullText[index - 1]) ? 120 : 35;
        this._streamTimer = setTimeout(tick, delay + Math.random() * 20);
      };
      tick();
    });
  },

  addUserMessage(content) {
    const id = Date.now();
    const messages = [...this.data.messages, { id, role: 'user', content }];
    this.setData({ messages, input: '', canSend: false, scrollTo: `msg-${id}` });
  },

  async send() {
    const question = this.data.input.trim();
    if (!question || this.data.thinking) return;

    this.clearStreamTimer();
    this.addUserMessage(question);
    this.setData({ thinking: true });

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    let allowed = true;
    let reply = '';

    try {
      const res = await api.askAi(question);
      allowed = res.data.allowed;
      reply = res.data.reply;
    } catch (e) {
      allowed = localMock.isCarRelated(question);
      reply = allowed ? localMock.mockReply(question) : localMock.REJECT_REPLY;
    }

    this.setData({ thinking: false });
    const msgId = this.appendAssistantShell(!allowed);
    await this.streamText(msgId, reply);
  }
});
