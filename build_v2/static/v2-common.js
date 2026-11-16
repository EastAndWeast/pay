/* Shared i18n, navigation, drawer, and accessibility utilities for Aurellix Pay V2 */
window.AurellixV2 = (function () {
  const COMMON_TRANSLATIONS = {
    en: {
      nav_home: 'Home',
      nav_products: 'Products',
      nav_solutions: 'Solutions',
      nav_resources: 'Resources',
      nav_prod_collect: 'Global Collection',
      nav_prod_collect_desc: '22+ local & global VA accounts',
      nav_prod_payout: 'Global Payout',
      nav_prod_payout_desc: '33+ local rails, SWIFT & e-wallets',
      nav_prod_otc: 'FX & Stablecoin OTC',
      nav_prod_otc_desc: '0-fee FX & 26-fiat USDT/USDC OTC',
      nav_prod_acq: 'Global Acquiring',
      nav_prod_acq_desc: '94+ countries cards, APMs & crypto',
      nav_sol_b2b: 'B2B Foreign Trade',
      nav_sol_b2b_desc: 'Local-currency collect, FX & supplier payout',
      nav_sol_otc: 'Institutional OTC',
      nav_sol_otc_desc: 'Fiat ⇄ Stablecoin T+0 treasury rails',
      nav_sol_ecom: 'E-Commerce & Digital',
      nav_sol_ecom_desc: 'Marketplace, checkout & global payouts',
      nav_sol_rwa: 'RWA Tokenization',
      nav_sol_rwa_desc: 'Real-world asset mint & global settlement',
      nav_partners: 'Compliance & Ecosystem',
      nav_partners_desc: 'Licensed rails & global settlement network',
      nav_api_desc: 'REST APIs, SDKs & Webhook reference',
      nav_demo_desc: 'Live institutional checkout sandbox',
      nav_fx: 'Global FX',
      nav_fx_pill: 'B2B Fiat',
      nav_otc: 'OTC',
      nav_otc_pill: 'Stablecoin',
      nav_acquiring: 'Acquiring',
      nav_coverage: 'Coverage',
      nav_api: 'API Docs',
      nav_demo: 'Demo',
      nav_contact: 'Contact',
      nav_portal: 'Merchant Portal',
      mobile_lang_label: 'Select Language',
      footer_desc: 'Aurellix Pay is a global institutional treasury, B2B cross-border collection/payout, stablecoin OTC settlement, and merchant acquiring platform.',
      footer_group: 'Aurellix Group',
      footer_product: 'Solutions',
      footer_resources: 'Resources',
      footer_privacy: 'Privacy Policy',
      footer_terms: 'Terms of Service',
      copyright: '© 2026 Aurellix Pay. All rights reserved.',
      cta_banner_tag: 'Get Started',
      cta_banner_title: 'Open Aurellix Pay & Power Global Payments',
      cta_banner_desc: 'One-stop global treasury infrastructure for B2B collection, payout, FX, OTC & acquiring.',
      cta_banner_btn: 'Launch Portal',
      btn_merchant: 'Open Merchant Portal'
    },
    zh: {
      nav_home: '首页',
      nav_products: '产品服务',
      nav_solutions: '解决方案',
      nav_resources: '开发与生态',
      nav_prod_collect: '全球收款',
      nav_prod_collect_desc: '22+ 国本地与全球收款账户',
      nav_prod_payout: '全球付款',
      nav_prod_payout_desc: '33+ 币种本地清算与电子钱包',
      nav_prod_otc: '换汇与承兑',
      nav_prod_otc_desc: '19 币种零费率换汇与 26 国稳定币承兑',
      nav_prod_acq: '全球收单',
      nav_prod_acq_desc: '94+ 国卡支付、本地钱包与稳定币收银台',
      nav_sol_b2b: 'B2B 外贸收付',
      nav_sol_b2b_desc: '本币报价收款、实时换汇与供应商直付',
      nav_sol_otc: '法币 ⇄ 稳定币清结算',
      nav_sol_otc_desc: '机构级深度流动与 T+0 极速交割',
      nav_sol_ecom: '跨境电商与泛娱出海',
      nav_sol_ecom_desc: '电商归集、内嵌收银与全球分账下发',
      nav_sol_rwa: 'RWA 资产代币化',
      nav_sol_rwa_desc: '美股、黄金与大宗资产全球清算通道',
      nav_partners: '合规资质与清算生态',
      nav_partners_desc: '持牌监管体系与全球银行清算网络',
      nav_api_desc: 'Open API 文档与 Webhook 回调集成',
      nav_demo_desc: '交互式收银台在线演示环境',
      nav_fx: '全球收付',
      nav_fx_pill: '外贸·本币',
      nav_otc: '全球承兑',
      nav_otc_pill: '法币·稳定币',
      nav_acquiring: '聚合收单',
      nav_coverage: '全球覆盖',
      nav_api: 'API 接口文档',
      nav_demo: '演示 Demo',
      nav_contact: '咨询顾问',
      nav_portal: '商户管理后台',
      mobile_lang_label: '选择语言 / Language',
      footer_desc: 'Aurellix Pay 是企业级全球资金清结算平台，提供 B2B 跨境收付款、多币种实时换汇、法币⇄稳定币双向承兑与全球聚合收单服务。',
      footer_group: 'Aurellix 集团',
      footer_product: '核心方案',
      footer_resources: '开发与入口',
      footer_privacy: '隐私政策',
      footer_terms: '服务条款',
      copyright: '© 2026 Aurellix Pay. All rights reserved.',
      cta_banner_tag: '开启全球收付',
      cta_banner_title: '开通 Aurellix Pay，开启全球收付',
      cta_banner_desc: '一站式资金管理解决方案 · 赋能企业全球业务拓展',
      cta_banner_btn: '立即体验',
      btn_merchant: '进入商户后台'
    }
  };

  let currentLang = 'en';

  function getInitialLang() {
    const params = new URLSearchParams(location.search);
    let lang = params.get('lang') || localStorage.getItem('pref-lang');
    if (!lang) {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      lang = browserLang.startsWith('zh') ? 'zh' : 'en';
    }
    return lang === 'zh' ? 'zh' : 'en';
  }

  function applyLang(lang, pageDict, metaMap, onAfterChange) {
    currentLang = lang === 'zh' ? 'zh' : 'en';
    localStorage.setItem('pref-lang', currentLang);
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

    const merged = Object.assign(
      {},
      COMMON_TRANSLATIONS[currentLang],
      (pageDict && pageDict[currentLang]) || {}
    );

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!merged[key]) return;
      const trailIcon = el.querySelector('i[data-keep-icon="true"]');
      el.textContent = merged[key];
      if (trailIcon) {
        el.appendChild(document.createTextNode(' '));
        el.appendChild(trailIcon);
      }
    });

    // Preserve ?lang= on all internal .html links (including anchored links like coverage.html#channel-matrix)
    document.querySelectorAll('a[href*=".html"]').forEach((link) => {
      try {
        const rawHref = link.getAttribute('href');
        if (!rawHref || rawHref.startsWith('http')) return;
        const url = new URL(rawHref, location.origin + location.pathname);
        url.searchParams.set('lang', currentLang);
        const fileName = url.pathname.split('/').pop();
        link.setAttribute('href', fileName + url.search + url.hash);
      } catch (e) {}
    });

    // Dynamic API Docs & Group links
    document.querySelectorAll('a[data-i18n="nav_api"], a[data-api-link="true"]').forEach((link) => {
      link.setAttribute('href', currentLang === 'zh' ? 'https://docs.rail.aurellix.com/zh/' : 'https://docs.rail.aurellix.com/');
    });

    const groupLink = document.getElementById('group-link');
    if (groupLink) {
      groupLink.setAttribute('href', 'https://www.aurellix.com/' + (currentLang === 'zh' ? '?lang=zh' : ''));
    }

    // Dynamic Meta / OG / Twitter tags
    if (metaMap && metaMap[currentLang]) {
      const m = metaMap[currentLang];
      const baseHost = (location.origin && location.origin.startsWith('http')) ? location.origin : 'https://pay-52p.pages.dev';
      const shareImg = currentLang === 'zh' ? (baseHost + '/static/share_zh.png') : (baseHost + '/static/share_en.png');

      if (m.title) document.title = m.title;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl && m.desc) descEl.setAttribute('content', m.desc);
      const ogTitle = document.getElementById('og-title');
      if (ogTitle && m.title) ogTitle.setAttribute('content', m.title);
      const ogDesc = document.getElementById('og-desc');
      if (ogDesc && m.desc) ogDesc.setAttribute('content', m.desc);
      const ogImg = document.getElementById('og-image');
      if (ogImg) ogImg.setAttribute('content', shareImg);
      const twTitle = document.getElementById('tw-title');
      if (twTitle && m.title) twTitle.setAttribute('content', m.title);
      const twDesc = document.getElementById('tw-desc');
      if (twDesc && m.desc) twDesc.setAttribute('content', m.desc);
      const twImg = document.getElementById('tw-image');
      if (twImg) twImg.setAttribute('content', shareImg);
    }

    const label = currentLang === 'zh' ? '中文' : 'EN';
    const deskLabel = document.getElementById('current-lang-label');
    if (deskLabel) deskLabel.textContent = label;

    document.querySelectorAll('.lang-option').forEach((opt) => {
      const isEnOpt = opt.getAttribute('data-lang') === 'en';
      const active = (isEnOpt && currentLang === 'en') || (!isEnOpt && currentLang === 'zh');
      opt.style.color = active ? 'var(--hex-blue)' : '#475569';
      opt.style.backgroundColor = active ? '#eff6ff' : '';
    });

    if (typeof onAfterChange === 'function') {
      onAfterChange(currentLang);
    }
    return currentLang;
  }

  function toggleMobileMenu(forceClose) {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu) return;
    const shouldOpen = forceClose === true ? false : !menu.classList.contains('open');
    menu.classList.toggle('open', shouldOpen);
    menu.setAttribute('aria-hidden', String(!shouldOpen));
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
    if (btn) btn.setAttribute('aria-expanded', String(shouldOpen));
    if (icon) {
      icon.className = shouldOpen ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
    }
  }

  function initAccessibilityAndMotion() {
    // Grouped dropdown toggle & outside/Escape close
    const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
    function closeDropdowns(except) {
      dropdowns.forEach((dd) => {
        if (dd === except) return;
        dd.classList.remove('open');
        const btn = dd.querySelector('.nav-dropdown-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    dropdowns.forEach((dd) => {
      const btn = dd.querySelector('.nav-dropdown-trigger');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !dd.classList.contains('open');
        closeDropdowns(dd);
        dd.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', String(willOpen));
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest || !e.target.closest('.nav-dropdown')) {
        closeDropdowns(null);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdowns(null);
        const menu = document.getElementById('mobile-menu');
        if (menu && menu.classList.contains('open')) {
          toggleMobileMenu(true);
        }
      }
    });

    // Activate matching tabpanel or <details> drawer when navigating by #hash
    function syncHashTarget() {
      const hash = (location.hash || '').replace(/^#/, '');
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;

      const parentDetails = target.tagName === 'DETAILS' ? target : target.closest('details');
      if (parentDetails) {
        parentDetails.open = true;
      }

      if (target.getAttribute('role') === 'tabpanel') {
        const controllingTab = document.querySelector(`[role="tab"][aria-controls="${hash}"], [role="tab"][data-panel="${hash}"]`);
        if (controllingTab) {
          controllingTab.click();
        }
      }
      closeDropdowns(null);
    }

    syncHashTarget();
    window.addEventListener('hashchange', syncHashTarget);

    document.querySelectorAll('.nav-popover a').forEach((link) => {
      link.addEventListener('click', () => closeDropdowns(null));
    });

    // Only animate scroll reveal when motion is allowed
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.95) {
        el.classList.add('reveal-pending');
        observer.observe(el);
      } else {
        el.classList.add('active');
      }
    });
  }

  // Accessible tablist helper (modern-web-guidance: tabs)
  function initTablist(tablistEl, onSelect) {
    if (!tablistEl) return;
    const tabs = Array.from(tablistEl.querySelectorAll('[role="tab"]'));
    function activate(tab, shouldFocus) {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.setAttribute('tabindex', selected ? '0' : '-1');
      });
      if (shouldFocus) tab.focus();
      if (typeof tab.scrollIntoView === 'function') {
        try {
          tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        } catch (e) {}
      }
      if (typeof onSelect === 'function') {
        onSelect(tab);
      }
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activate(tab, false));
      tab.addEventListener('keydown', (e) => {
        let nextIdx = -1;
        if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') nextIdx = 0;
        else if (e.key === 'End') nextIdx = tabs.length - 1;
        if (nextIdx >= 0) {
          e.preventDefault();
          activate(tabs[nextIdx], true);
        }
      });
    });
  }

  return {
    getInitialLang,
    applyLang,
    toggleMobileMenu,
    initAccessibilityAndMotion,
    initTablist,
    getLang: () => currentLang
  };
})();
