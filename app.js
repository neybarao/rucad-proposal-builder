const DB_NAME = "rucad-propostas-db";
const DB_VERSION = 2;
const PROPOSAL_STORE = "proposals";
const SETTINGS_STORE = "settings";
const SETTINGS_ID = "global-template";

const nowIso = () => new Date().toISOString();
const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `proposal-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const defaultTemplate = () => ({
  id: SETTINGS_ID,
  presentation:
    "Oferecemos soluções completas em assessoria, consultorias e laudos elétricos, com expertise em comissionamento de sistemas elétricos de potência, manutenção preventiva e corretiva de subestações e usinas fotovoltaicas. Atuamos na elaboração de projetos elétricos, SPDA, construção de subestações e redes de média e baixa tensão, tanto em áreas urbanas quanto rurais.\n\nNossa atuação também inclui a manutenção de grupos geradores, além de soluções em eficiência energética para otimizar o consumo e reduzir custos. Com foco na confiabilidade e segurança, realizamos comissionamento de transformadores, cabines primárias e sistemas de aterramento.\n\nNosso compromisso é entregar soluções técnicas de alta qualidade, com foco em inovação e sustentabilidade, para garantir a máxima performance e segurança nos sistemas elétricos.",
  clients: "MRV\nEnergisa\nPlaenge\nA.Yoshii\nÁguas Guariroba\nSão Gabriel\nVoltalia\nProdutores rurais",
  bank:
    "CNPJ: 44.499.587/0001-09\nRazão Social: Rucad Engenharia Ltda\nBanco: 077 (Banco Inter)\nAgência: 0001\nConta Corrente: 17533554-0\nChave Pix: 44.499.587/0001-09\n\nBanco: 001 (Banco do Brasil)\nAgência: 2936-0\nConta Corrente: 50011-9\nChave Pix: rucad.engenharia@gmail.com",
  validity: "Esta proposta tem validade de 7 (sete) dias.",
  engineers:
    "Jônatas Carvalho\nEngenheiro Eletricista\nResponsável Técnico\nCREA-SP 5063066987\n\nWellington Ruffo\nEngenheiro Eletricista\nResponsável Técnico\nCREA-MS 18135-D"
});

const defaultProposal = () => ({
  id: uid(),
  createdAt: nowIso(),
  updatedAt: nowIso(),
  meta: {
    number: "044/2026",
    date: "Campo Grande - MS, 15 de mai. de 2026.",
    client: "MRV",
    contact: "Wellington Arruda",
    title: "Execução de Redes de Distribuição Urbana e Iluminação Pública",
    enterprise: "Residencial Castelo Di Orleans",
    location: "Campo Grande/MS"
  },
  blocks: {
    opening:
      "Conforme solicitado, enviamos proposta de EXECUÇÃO DE REDES DE DISTRIBUIÇÃO URBANA E ILUMINAÇÃO PÚBLICA, a ser realizada no Residencial Castelo Di Orleans na cidade de Campo Grande/MS, tendo como premissas as seguintes informações:",
    scope:
      "Construção de rede de distribuição de energia elétrica urbana, MT e BT do Residencial Castelo Di Orleans.\n\nLocal da Obra: Campo Grande/MS.\n\n1. Implantação de todos os postes e demais itens conforme projeto.\n2. Montagem eletromecânica das redes, MT e BT com cabos e acessórios.\n3. Montagem eletromecânica dos postos de transformadores.\n4. Concretagem de base de postes, conforme exigência da concessionária e detalhe previsto em projeto.\n5. Conferência e validação da lista de materiais contidas nos anexos, para aquisição pela CONTRATADA.\n6. Registro de ART de execução.\n7. Doação junto a concessionária.",
    compliance:
      "A contratada deverá cumprir integralmente as exigências técnicas, normativas e documentais da concessionária Energisa, incluindo utilização de materiais homologados, observância das normas NBR e NR aplicáveis, e apresentação de toda a documentação técnica exigida para aceite da obra, sob pena de retenção de pagamentos até a regularização.",
    notes:
      "1. Os valores dos materiais são estimados, assim, poderão sofrer alteração em virtude do refinamento do escopo do projeto.\n2. A proposta em questão contempla o faturamento direto à RUCAD ENGENHARIA na aquisição dos materiais necessários para a realização dos serviços (empreitada global), EXCETO: postes e transformadores.\n3. Na execução dos serviços por terceiros, os materiais e equipamentos utilizados na execução direta da obra pelo interessado devem ser novos e de fornecedores homologados pela Energisa MS, acompanhados das respectivas notas fiscais e termos de garantia dos fabricantes, sendo vedada a utilização de materiais ou equipamentos reformados ou reaproveitados, por tratar-se de ativos a serem incorporados.\n4. A RUCAD ENGENHARIA será responsável por todo o transporte interno no canteiro de obras, dos materiais e equipamentos, tanto o seu transporte vertical como horizontal.\n5. Os valores referentes ao FRETE, previstos no escopo de materiais, poderão ser dispensados caso a contratada utilize fornecedores homologados sediados na mesma cidade da obra ou que ofereçam entrega gratuita.\n6. O prazo estimado para fabricação, transporte e entrega de materiais críticos como postes e transformadores é de aproximadamente 60 dias, considerando os fornecedores base desta proposta. Caso haja necessidade de acelerar o cronograma, o contratante poderá optar por fornecedores de outras praças que ofereçam prazos reduzidos, ainda que isso possa impactar o custo final.",
    guarantees:
      "O prazo de garantia dos serviços será de 90 (noventa) dias, contados a partir da data de doação da rede à concessionária de energia.\n\nDurante o período de garantia, a Contratada obriga-se a reparar, corrigir, remover, reconstruir ou substituir, às suas expensas, no prazo estabelecido pela fiscalização, quaisquer defeitos, falhas ou incorreções resultantes da execução dos serviços, ainda que ocultos, nos termos do art. 618 do Código Civil Brasileiro.\n\nNos casos de vícios ocultos, o prazo de garantia será contado a partir da constatação do defeito, observando-se o disposto no referido artigo.",
    payment: "30 DDL"
  },
  investment: {
    materials: [
      {
        id: uid(),
        item: "1",
        description: "Postes (Concreto Circular)\n- 6 CC 12m/1.000 daN\n- 2 CC 11m/1.500 daN\n- 5 CC 11m/600 daN\n- 1 CC 10m/600 daN",
        value: 39470
      },
      {
        id: uid(),
        item: "2",
        description: "Transformadores\n- 1 Transformador 75 kVA (13,8 kV | 220/127V)\n- 5 Transformadores 112,5 kVA (13,8 kV | 220/127V)",
        value: 116630
      },
      { id: uid(), item: "3", description: "Frete (postes e transformadores)", value: 7900 }
    ],
    services: [
      {
        id: uid(),
        item: "1",
        description:
          "Serviços\n- Infraestrutura e Obras Civis\n- Montagem de Estruturas e Posteamento\n- Instalações Elétricas e Equipamentos\n- Comissionamento da RDU\n- Incluso deslocamento, alimentação da equipe técnica",
        value: 68000
      },
      {
        id: uid(),
        item: "2",
        description: "Materiais\n- Cabos, ferragens, iluminação pública, proteções, miscelâneas, etc.",
        value: 178500
      },
      {
        id: uid(),
        item: "3",
        description: "Impostos e Encargos\n- IRPJ, CSLL, PIS, COFINS, ISS e demais encargos",
        value: 0,
        label: "Incluso"
      }
    ]
  },
  schedule: [
    {
      id: uid(),
      task: "Aprovação da Proposta Comercial 044/26 (até 10 dias)",
      responsible: "MRV",
      start: "18/05/26",
      end: "28/05/26"
    },
    {
      id: uid(),
      task: "Aquisição/fabricação dos materiais e entrega no local da obra (até 60 dias)",
      responsible: "Fornecedores",
      start: "28/05/26",
      end: "27/07/26"
    },
    {
      id: uid(),
      task: "Execução da Obra (por residencial) (até 30 dias)",
      responsible: "Rucad Engenharia",
      start: "27/07/26",
      end: "26/08/26"
    }
  ],
  scheduleNotes:
    "1 - Considerando a disponibilidade de todos os materiais.\n2 - Para solicitar a ligação da unidade, a extensão de rede (se houver) deve estar concluída, bem como a execução do Ponto de Entrega, cuja responsabilidade pela execução é da Energisa MS e a mesma dispõe de 120 dias para execução.\n\nTEMPO ESTIMADO TOTAL 100 DIAS"
});

let db = null;
let storageMode = "IndexedDB";
let proposals = [];
let activeId = null;
let template = defaultTemplate();
let saveTimer = null;

const app = document.querySelector("#app");

function openDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB indisponível"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(PROPOSAL_STORE)) {
        database.createObjectStore(PROPOSAL_STORE, { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains(SETTINGS_STORE)) {
        database.createObjectStore(SETTINGS_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function initStore() {
  try {
    db = await openDb();
  } catch (error) {
    storageMode = "localStorage";
  }
}

function store(name, mode = "readonly") {
  return db.transaction(name, mode).objectStore(name);
}

function localKey(key) {
  return `rucad-propostas-${key}`;
}

async function getAllProposals() {
  if (!db) {
    return JSON.parse(localStorage.getItem(localKey("proposals")) || "[]");
  }
  return new Promise((resolve, reject) => {
    const request = store(PROPOSAL_STORE).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function getTemplate() {
  if (!db) {
    return JSON.parse(localStorage.getItem(localKey("template")) || "null");
  }
  return new Promise((resolve, reject) => {
    const request = store(SETTINGS_STORE).get(SETTINGS_ID);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function persistProposal(proposal) {
  if (!db) {
    const all = JSON.parse(localStorage.getItem(localKey("proposals")) || "[]");
    const next = all.some((item) => item.id === proposal.id)
      ? all.map((item) => (item.id === proposal.id ? proposal : item))
      : [proposal, ...all];
    localStorage.setItem(localKey("proposals"), JSON.stringify(next));
    return;
  }
  return new Promise((resolve, reject) => {
    const request = store(PROPOSAL_STORE, "readwrite").put(proposal);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function persistTemplate(nextTemplate) {
  if (!db) {
    localStorage.setItem(localKey("template"), JSON.stringify(nextTemplate));
    return;
  }
  return new Promise((resolve, reject) => {
    const request = store(SETTINGS_STORE, "readwrite").put(nextTemplate);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function removeProposal(id) {
  if (!db) {
    const all = JSON.parse(localStorage.getItem(localKey("proposals")) || "[]").filter((item) => item.id !== id);
    localStorage.setItem(localKey("proposals"), JSON.stringify(all));
    return;
  }
  return new Promise((resolve, reject) => {
    const request = store(PROPOSAL_STORE, "readwrite").delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function activeProposal() {
  return proposals.find((item) => item.id === activeId) || null;
}

function migrateProposal(source) {
  const base = defaultProposal();
  const isLegacy = !Array.isArray(source.schedule);
  return {
    ...base,
    ...source,
    meta: isLegacy
      ? { ...base.meta, number: source.meta?.number || base.meta.number }
      : { ...base.meta, ...(source.meta || {}) },
    blocks: isLegacy ? base.blocks : { ...base.blocks, ...(source.blocks || {}) },
    investment: {
      materials: isLegacy ? base.investment.materials : source.investment?.materials || base.investment.materials,
      services: isLegacy ? base.investment.services : source.investment?.services || base.investment.services
    },
    schedule: isLegacy ? base.schedule : source.schedule || base.schedule,
    scheduleNotes: isLegacy ? base.scheduleNotes : source.scheduleNotes || base.scheduleNotes
  };
}

async function load() {
  template = { ...defaultTemplate(), ...((await getTemplate()) || {}) };
  proposals = (await getAllProposals()).map(migrateProposal).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  if (!proposals.length) {
    const first = defaultProposal();
    await persistProposal(first);
    proposals = [first];
  }
  activeId = proposals[0]?.id || null;
  await persistTemplate(template);
  render();
}

function scheduleSave(kind = "proposal") {
  clearTimeout(saveTimer);
  renderSaveState("Salvando...");
  saveTimer = setTimeout(async () => {
    if (kind === "template") {
      await persistTemplate(template);
    } else {
      const proposal = activeProposal();
      if (proposal) {
        proposal.updatedAt = nowIso();
        await persistProposal(proposal);
        proposals = proposals
          .map((item) => (item.id === proposal.id ? proposal : item))
          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      }
    }
    renderSaveState(`Salvo em ${storageMode}`);
  }, 350);
}

function renderSaveState(text) {
  const el = document.querySelector(".save-state");
  if (el) el.textContent = text;
}

async function createProposal() {
  const proposal = defaultProposal();
  proposal.meta.number = `${String(proposals.length + 1).padStart(3, "0")}/2026`;
  await persistProposal(proposal);
  proposals = [proposal, ...proposals];
  activeId = proposal.id;
  render();
}

async function duplicateProposal() {
  const source = activeProposal();
  if (!source) return;
  const proposal = structuredClone(source);
  proposal.id = uid();
  proposal.createdAt = nowIso();
  proposal.updatedAt = nowIso();
  proposal.meta.number = `${source.meta.number} - cópia`;
  proposal.investment.materials = proposal.investment.materials.map((row) => ({ ...row, id: uid() }));
  proposal.investment.services = proposal.investment.services.map((row) => ({ ...row, id: uid() }));
  proposal.schedule = proposal.schedule.map((row) => ({ ...row, id: uid() }));
  await persistProposal(proposal);
  proposals = [proposal, ...proposals];
  activeId = proposal.id;
  render();
}

async function deleteActiveProposal() {
  const proposal = activeProposal();
  if (!proposal) return;
  const ok = window.confirm(`Excluir a proposta ${proposal.meta.number}? Esta ação remove apenas o registro local deste navegador.`);
  if (!ok) return;
  await removeProposal(proposal.id);
  proposals = proposals.filter((item) => item.id !== proposal.id);
  activeId = proposals[0]?.id || null;
  render();
}

function total(rows) {
  return rows.reduce((sum, row) => sum + Number(row.value || 0), 0);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatUpdated(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function currencyInput(value, label = "") {
  return label || money.format(Number(value || 0));
}

function editable(value, attrs, className = "editable") {
  return `<span class="${className}" contenteditable="true" spellcheck="true" ${attrs}>${escapeHtml(value)}</span>`;
}

function editableBlock(value, attrs, className = "editable block-edit") {
  return `<div class="${className}" contenteditable="true" spellcheck="true" ${attrs}>${escapeHtml(value)}</div>`;
}

function clientsHtml(value) {
  return String(value || "")
    .split("\n")
    .map((client) => client.trim())
    .filter(Boolean)
    .map((client) => `<span>${escapeHtml(client)}</span>`)
    .join("");
}

function renderProposalList() {
  return `
    <aside class="sidebar">
      <div class="sidebar-section">
        <div class="section-title">Propostas</div>
        <button class="btn btn-primary full-width" data-action="new">Nova proposta</button>
        <div class="proposal-stack">
          ${proposals
            .map(
              (proposal) => `
                <button class="proposal-card ${proposal.id === activeId ? "active" : ""}" data-open="${proposal.id}">
                  <strong>${escapeHtml(proposal.meta.number)}</strong>
                  <span>${escapeHtml(proposal.meta.client || "Sem cliente")}</span>
                  <small>${formatUpdated(proposal.updatedAt)}</small>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="sidebar-section">
        <div class="section-title">Documento</div>
        <a class="nav-link" href="#dados">Dados</a>
        <a class="nav-link" href="#apresentacao">Apresentação</a>
        <a class="nav-link" href="#escopo">Escopo</a>
        <a class="nav-link" href="#investimento">Investimento</a>
        <a class="nav-link" href="#cronograma">Cronograma</a>
        <a class="nav-link" href="#fechamento">Fechamento</a>
      </div>
    </aside>
  `;
}

function renderTable(kind, title, rows) {
  return `
    <section class="doc-section" id="${kind === "materials" ? "materiais" : "servicos"}">
      <div class="section-kicker">${kind === "materials" ? "1." : "2."}</div>
      <h2>${title}</h2>
      <table class="doc-table" data-table="${kind}">
        <thead>
          <tr>
            <th class="col-item">Item</th>
            <th>Descrição</th>
            <th class="col-money">Valor</th>
            <th class="row-tools"></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr data-row="${row.id}">
                  <td>${editable(row.item || "", `data-kind="${kind}" data-row="${row.id}" data-field="item"`, "editable cell-edit")}</td>
                  <td>${editableBlock(row.description || "", `data-kind="${kind}" data-row="${row.id}" data-field="description"`, "editable cell-edit rich-cell")}</td>
                  <td class="money-cell">${editable(currencyInput(row.value, row.label), `data-kind="${kind}" data-row="${row.id}" data-field="value"`, "editable cell-edit money-edit")}</td>
                  <td class="row-tools"><button class="icon-btn" data-delete-row="${kind}:${row.id}" title="Remover linha">×</button></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">Total</td>
            <td class="money-cell" data-total="${kind}">${money.format(total(rows))}</td>
            <td class="row-tools"></td>
          </tr>
        </tfoot>
      </table>
      <button class="ghost-add" data-add-row="${kind}">Adicionar linha em ${title.toLowerCase()}</button>
    </section>
  `;
}

function renderScheduleRows(rows) {
  return rows
    .map(
      (row) => `
        <tr data-schedule-row="${row.id}">
          <td>${editableBlock(row.task, `data-schedule="${row.id}" data-field="task"`, "editable cell-edit")}</td>
          <td>${editable(row.responsible, `data-schedule="${row.id}" data-field="responsible"`, "editable cell-edit")}</td>
          <td>${editable(row.start, `data-schedule="${row.id}" data-field="start"`, "editable cell-edit")}</td>
          <td>${editable(row.end, `data-schedule="${row.id}" data-field="end"`, "editable cell-edit")}</td>
          <td class="row-tools"><button class="icon-btn" data-delete-schedule="${row.id}" title="Remover linha">×</button></td>
        </tr>
      `
    )
    .join("");
}

function renderDocument(proposal) {
  if (!proposal) {
    return `<main class="document-stage"><div class="empty-state">Crie uma proposta para começar.</div></main>`;
  }

  const grandTotal = total(proposal.investment.materials) + total(proposal.investment.services);

  return `
    <main class="document-stage">
      <article class="paper">
        <section class="cover-page page">
          <img class="cover-logo" src="assets/rucad-logotype-color-dark-h.svg" alt="RUCAD" />
          <div class="cover-content">
            <div class="eyebrow">Proposta Comercial Nº ${editable(proposal.meta.number, 'data-meta="number"', "editable inline-dark")}</div>
            <h1>${editable(proposal.meta.title, 'data-meta="title"', "editable title-edit")}</h1>
            <div class="cover-client">Cliente: ${editable(proposal.meta.client, 'data-meta="client"', "editable inline-dark")}</div>
          </div>
        </section>

        <section class="page content-page" id="apresentacao">
          ${docTop(proposal)}
          <section class="doc-section">
            <div class="section-kicker">1</div>
            <h2>Apresentação</h2>
            ${editableBlock(template.presentation, 'data-template="presentation"')}
          </section>
          <section class="doc-section compact">
            <h2>Nossos clientes</h2>
            <div class="client-grid" data-client-grid>${clientsHtml(template.clients)}</div>
            ${editableBlock(template.clients, 'data-template="clients"', "editable block-edit client-source")}
          </section>
          ${docFoot()}
        </section>

        <section class="page content-page" id="dados">
          ${docTop(proposal)}
          <div class="letter-head">
            <div>${editable(proposal.meta.date, 'data-meta="date"', "editable line-edit")}</div>
            <strong>PROPOSTA COMERCIAL - ${editable(proposal.meta.number, 'data-meta="number"', "editable line-edit")}</strong>
            <div>À ${editable(proposal.meta.client, 'data-meta="client"', "editable line-edit")}</div>
            <div>A/C ${editable(proposal.meta.contact, 'data-meta="contact"', "editable line-edit")}</div>
          </div>
          <section class="doc-section">
            ${editableBlock(proposal.blocks.opening, 'data-block="opening"')}
          </section>
          <section class="doc-section" id="escopo">
            <h2>Escopo</h2>
            ${editableBlock(proposal.blocks.scope, 'data-block="scope"')}
            ${editableBlock(proposal.blocks.compliance, 'data-block="compliance"', "editable block-edit note-block")}
          </section>
          ${docFoot()}
        </section>

        <section class="page content-page" id="investimento">
          ${docTop(proposal)}
          ${renderTable("materials", "Materiais (Faturamento Direto)", proposal.investment.materials)}
          ${renderTable("services", "Serviços (Empreitada Global)", proposal.investment.services)}
          <div class="grand-total">
            <span>Investimento total</span>
            <strong data-grand-total>${money.format(grandTotal)}</strong>
          </div>
          ${docFoot()}
        </section>

        <section class="page content-page">
          ${docTop(proposal)}
          <section class="doc-section">
            <h2>Observações</h2>
            ${editableBlock(proposal.blocks.notes, 'data-block="notes"')}
          </section>
          <section class="doc-section" id="cronograma">
            <h2>Cronograma</h2>
            <table class="doc-table schedule-table">
              <thead>
                <tr><th>Tarefa</th><th>Responsável</th><th>Início</th><th>Término</th><th class="row-tools"></th></tr>
              </thead>
              <tbody>${renderScheduleRows(proposal.schedule)}</tbody>
            </table>
            <button class="ghost-add" data-add-schedule>Adicionar linha no cronograma</button>
            ${editableBlock(proposal.scheduleNotes, 'data-block="scheduleNotes"', "editable block-edit note-block")}
          </section>
          <section class="doc-section">
            <h2>Garantias</h2>
            ${editableBlock(proposal.blocks.guarantees, 'data-block="guarantees"')}
          </section>
          ${docFoot()}
        </section>

        <section class="page content-page" id="fechamento">
          ${docTop(proposal)}
          <section class="doc-section">
            <h2>Pagamento</h2>
            ${editableBlock(proposal.blocks.payment, 'data-block="payment"')}
          </section>
          <section class="doc-section">
            <h2>Dados Bancários</h2>
            ${editableBlock(template.bank, 'data-template="bank"')}
          </section>
          <section class="doc-section closing">
            ${editableBlock(template.validity, 'data-template="validity"')}
            <p>Atenciosamente,</p>
            ${editableBlock(template.engineers, 'data-template="engineers"', "editable engineers-edit")}
          </section>
          ${docFoot()}
        </section>
      </article>
    </main>
  `;
}

function docTop(proposal) {
  return `
    <header class="doc-header">
      <img src="assets/rucad-logotype-color-dark-h.svg" alt="RUCAD" />
      <span>Proposta ${escapeHtml(proposal.meta.number)}</span>
    </header>
  `;
}

function docFoot() {
  return `
    <footer class="doc-footer">
      <span>RUCAD Engenharia</span>
      <span>Documento comercial</span>
    </footer>
  `;
}

function render() {
  const proposal = activeProposal();
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <img src="assets/rucad-logotype-color-dark-h.svg" alt="RUCAD" />
        </div>
        <div class="top-actions">
          <span class="save-state">Salvo em ${storageMode}</span>
          <button class="btn" data-action="duplicate" ${proposal ? "" : "disabled"}>Duplicar</button>
          <button class="btn btn-danger" data-action="delete" ${proposal ? "" : "disabled"}>Excluir</button>
          <button class="btn btn-primary" data-action="print" ${proposal ? "" : "disabled"}>Exportar PDF</button>
        </div>
      </header>
      <div class="layout">
        ${renderProposalList()}
        ${renderDocument(proposal)}
      </div>
    </div>
  `;
  bind();
}

function bind() {
  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => {
      activeId = button.dataset.open;
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.action;
      if (action === "new") await createProposal();
      if (action === "duplicate") await duplicateProposal();
      if (action === "delete") await deleteActiveProposal();
      if (action === "print") window.print();
    });
  });

  document.querySelectorAll("[data-meta]").forEach((node) => {
    node.addEventListener("input", () => {
      const proposal = activeProposal();
      proposal.meta[node.dataset.meta] = node.innerText.trim();
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-block]").forEach((node) => {
    node.addEventListener("input", () => {
      const proposal = activeProposal();
      const key = node.dataset.block;
      if (key === "scheduleNotes") {
        proposal.scheduleNotes = node.innerText.trim();
      } else {
        proposal.blocks[key] = node.innerText.trim();
      }
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-template]").forEach((node) => {
    node.addEventListener("input", () => {
      template[node.dataset.template] = node.innerText.trim();
      if (node.dataset.template === "clients") {
        const grid = document.querySelector("[data-client-grid]");
        if (grid) grid.innerHTML = clientsHtml(template.clients);
      }
      scheduleSave("template");
    });
  });

  document.querySelectorAll("[data-kind]").forEach((node) => {
    node.addEventListener("input", () => {
      const proposal = activeProposal();
      const row = proposal.investment[node.dataset.kind].find((item) => item.id === node.dataset.row);
      if (!row) return;
      const value = node.innerText.trim();
      if (node.dataset.field === "value") {
        const normalized = value.replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3})/g, "").replace(",", ".");
        const parsed = Number(normalized);
        if (Number.isFinite(parsed)) {
          row.value = parsed;
          row.label = value.toLowerCase().includes("incluso") ? "Incluso" : "";
          updateTotals();
        }
      } else {
        row[node.dataset.field] = value;
      }
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-schedule]").forEach((node) => {
    node.addEventListener("input", () => {
      const proposal = activeProposal();
      const row = proposal.schedule.find((item) => item.id === node.dataset.schedule);
      if (!row) return;
      row[node.dataset.field] = node.innerText.trim();
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-add-row]").forEach((button) => {
    button.addEventListener("click", () => {
      const proposal = activeProposal();
      proposal.investment[button.dataset.addRow].push({ id: uid(), item: "", description: "Nova linha", value: 0 });
      scheduleSave();
      render();
    });
  });

  document.querySelectorAll("[data-delete-row]").forEach((button) => {
    button.addEventListener("click", () => {
      const proposal = activeProposal();
      const [kind, id] = button.dataset.deleteRow.split(":");
      proposal.investment[kind] = proposal.investment[kind].filter((row) => row.id !== id);
      scheduleSave();
      render();
    });
  });

  document.querySelector("[data-add-schedule]")?.addEventListener("click", () => {
    const proposal = activeProposal();
    proposal.schedule.push({ id: uid(), task: "Nova tarefa", responsible: "", start: "", end: "" });
    scheduleSave();
    render();
  });

  document.querySelectorAll("[data-delete-schedule]").forEach((button) => {
    button.addEventListener("click", () => {
      const proposal = activeProposal();
      proposal.schedule = proposal.schedule.filter((row) => row.id !== button.dataset.deleteSchedule);
      scheduleSave();
      render();
    });
  });
}

function updateTotals() {
  const proposal = activeProposal();
  if (!proposal) return;
  const materialsTotal = total(proposal.investment.materials);
  const servicesTotal = total(proposal.investment.services);
  const materialsNode = document.querySelector('[data-total="materials"]');
  const servicesNode = document.querySelector('[data-total="services"]');
  const grandNode = document.querySelector("[data-grand-total]");
  if (materialsNode) materialsNode.textContent = money.format(materialsTotal);
  if (servicesNode) servicesNode.textContent = money.format(servicesTotal);
  if (grandNode) grandNode.textContent = money.format(materialsTotal + servicesTotal);
}

await initStore();
await load();
