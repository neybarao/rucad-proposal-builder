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

const clientLogos = Array.from({ length: 30 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return { src: `assets/clients/logo${number}.png`, alt: `Cliente RUCAD ${number}` };
});

const defaultTemplate = () => ({
  id: SETTINGS_ID,
  presentation:
    "Oferecemos soluções completas em assessoria, consultorias e laudos elétricos, com expertise em comissionamento de sistemas elétricos de potência, manutenção preventiva e corretiva de subestações e usinas fotovoltaicas. Atuamos na elaboração de projetos elétricos, SPDA, construção de subestações e redes de média e baixa tensão, tanto em áreas urbanas quanto rurais.\n\nNossa atuação também inclui a manutenção de grupos geradores, além de soluções em eficiência energética para otimizar o consumo e reduzir custos. Com foco na confiabilidade e segurança, realizamos comissionamento de transformadores, cabines primárias e sistemas de aterramento.\n\nNosso compromisso é entregar soluções técnicas de alta qualidade, com foco em inovação e sustentabilidade, para garantir a máxima performance e segurança nos sistemas elétricos.",
  bank:
    "Razão Social: RUCAD ENGENHARIA LTDA\nNome Fantasia: RUCAD ENGENHARIA\nCNPJ: 44.499.587/0001-09\nData de Constituição: 06/12/2021\nInscrição Estadual: 28.483.794-6 (leia a observação)\nInscrição Municipal: 0032131600-0\nEndereço: Av. Gunter Hans, 3281\nBairro: Conjunto Aero Rancho\nCEP: 79.085-108\nCidade/UF: Campo Grande/MS\nTelefone: (67) 99650-6767\nE-mail: financeiro@rucadengenharia.com.br\n\nBanco: 077 (Banco Inter)\nAgência: 0001\nConta Corrente: 17533554-0\nChave Pix: 44.499.587/0001-09\n\nBanco: 001 (Banco do Brasil)\nAgência: 2936-0\nConta Corrente: 50011-9\nChave Pix: financeiro@rucadengenharia.com.br",
  validity: "Esta proposta tem validade de 7 (sete) dias.",
  engineers:
    "Jônatas de Almeida Carvalho\nEngenheiro Eletricista\nResponsável Técnico\nCREA-SP 5063066987\nCPF 405.229.188-32\nTelefone (67) 99254-4268\n\nWellington Ruffo de Souza\nEngenheiro Eletricista\nResponsável Técnico\nCREA-MS 18135-D\nCPF 031.650.681-86\nTelefone (67) 99629-1947"
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
    tables: [
      {
        id: uid(),
        title: "Materiais (Faturamento Direto)",
        rows: [
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
        ]
      },
      {
        id: uid(),
        title: "Serviços (Empreitada Global)",
        rows: [
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
    "1 - Considerando a disponibilidade de todos os materiais.\n2 - Para solicitar a ligação da unidade, a extensão de rede (se houver) deve estar concluída, bem como a execução do Ponto de Entrega, cuja responsabilidade pela execução é da Energisa MS e a mesma dispõe de 120 dias para execução.\n\nTEMPO ESTIMADO TOTAL 100 DIAS",
  touchedSections: {}
});

let db = null;
let storageMode = "IndexedDB";
let proposals = [];
let activeId = null;
let template = defaultTemplate();
let saveTimer = null;
let undoStack = [];
let redoStack = [];
let isRestoringHistory = false;
const HISTORY_LIMIT = 80;

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

function normalizeInvestment(source, base) {
  const investment = source?.investment || {};
  if (Array.isArray(investment.tables)) {
    return {
      tables: investment.tables.map((table, index) => ({
        id: table.id || uid(),
        title: table.title || `Tabela ${index + 1}`,
        rows: Array.isArray(table.rows) ? table.rows : []
      }))
    };
  }

  if (Array.isArray(investment.materials) || Array.isArray(investment.services)) {
    return {
      tables: [
        {
          id: uid(),
          title: "Materiais (Faturamento Direto)",
          rows: investment.materials || []
        },
        {
          id: uid(),
          title: "Serviços (Empreitada Global)",
          rows: investment.services || []
        }
      ]
    };
  }

  return structuredClone(base.investment);
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
    investment: isLegacy ? structuredClone(base.investment) : normalizeInvestment(source, base),
    schedule: isLegacy ? base.schedule : source.schedule || base.schedule,
    scheduleNotes: isLegacy ? base.scheduleNotes : source.scheduleNotes || base.scheduleNotes,
    touchedSections: isLegacy ? {} : source.touchedSections || {}
  };
}

function migrateTemplate(source) {
  const defaults = defaultTemplate();
  const nextTemplate = { ...defaults, ...(source || {}) };
  if (!String(nextTemplate.bank || "").includes("financeiro@rucadengenharia.com.br")) {
    nextTemplate.bank = defaults.bank;
  }
  if (!String(nextTemplate.engineers || "").includes("Jônatas de Almeida Carvalho")) {
    nextTemplate.engineers = defaults.engineers;
  }
  return nextTemplate;
}

async function load() {
  template = migrateTemplate(await getTemplate());
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

function historySnapshot() {
  return structuredClone({
    activeId,
    template,
    proposals
  });
}

function pushHistory() {
  if (isRestoringHistory) return;
  undoStack.push(historySnapshot());
  if (undoStack.length > HISTORY_LIMIT) undoStack.shift();
  redoStack = [];
  updateHistoryButtons();
}

async function restoreHistory(snapshot) {
  isRestoringHistory = true;
  activeId = snapshot.activeId;
  template = structuredClone(snapshot.template);
  proposals = structuredClone(snapshot.proposals);
  const nextIds = new Set(proposals.map((proposal) => proposal.id));
  const existing = await getAllProposals();
  await Promise.all([
    persistTemplate(template),
    ...existing.filter((proposal) => !nextIds.has(proposal.id)).map((proposal) => removeProposal(proposal.id)),
    ...proposals.map((proposal) => persistProposal(proposal))
  ]);
  render();
  isRestoringHistory = false;
}

async function undo() {
  if (!undoStack.length) return;
  redoStack.push(historySnapshot());
  const snapshot = undoStack.pop();
  await restoreHistory(snapshot);
}

async function redo() {
  if (!redoStack.length) return;
  undoStack.push(historySnapshot());
  const snapshot = redoStack.pop();
  await restoreHistory(snapshot);
}

function updateHistoryButtons() {
  const undoButton = document.querySelector('[data-action="undo"]');
  const redoButton = document.querySelector('[data-action="redo"]');
  if (undoButton) undoButton.disabled = !undoStack.length;
  if (redoButton) redoButton.disabled = !redoStack.length;
}

function markTouched(section) {
  const proposal = activeProposal();
  if (!proposal || !section) return;
  proposal.touchedSections = { ...(proposal.touchedSections || {}), [section]: nowIso() };
  const nav = document.querySelector(`[data-nav-section="${section}"]`);
  nav?.classList.add("updated");
}

async function createProposal() {
  pushHistory();
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
  pushHistory();
  const proposal = structuredClone(source);
  proposal.id = uid();
  proposal.createdAt = nowIso();
  proposal.updatedAt = nowIso();
  proposal.meta.number = `${source.meta.number} - cópia`;
  proposal.investment.tables = proposal.investment.tables.map((table) => ({
    ...table,
    id: uid(),
    rows: table.rows.map((row) => ({ ...row, id: uid() }))
  }));
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
  pushHistory();
  await removeProposal(proposal.id);
  proposals = proposals.filter((item) => item.id !== proposal.id);
  activeId = proposals[0]?.id || null;
  render();
}

function total(rows) {
  return rows.reduce((sum, row) => sum + Number(row.value || 0), 0);
}

function investmentTotal(tables) {
  return (tables || []).reduce((sum, table) => sum + total(table.rows || []), 0);
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

function bankGroups(value) {
  const groups = [];
  let current = [];
  String(value || "")
    .split("\n")
    .forEach((line) => {
      if (!line.trim()) {
        if (current.length) groups.push(current);
        current = [];
        return;
      }
      current.push(line.trim());
    });
  if (current.length) groups.push(current);
  return groups;
}

function bankHtml(value) {
  let lineIndex = 0;
  return `
    <div class="bank-grid">
      ${bankGroups(value)
        .map((group, groupIndex) => {
          const titleLine = group.find((line) => line.toLowerCase().startsWith("banco:"));
          const companyLine = group.find((line) => line.toLowerCase().startsWith("razão social:"));
          const title =
            groupIndex === 0
              ? companyLine?.replace(/^Razão Social:\s*/i, "") || "Dados da empresa"
              : titleLine?.replace(/^Banco:\s*/i, "") || `Conta ${groupIndex + 1}`;
          return `
            <div class="bank-card">
              <h3>${escapeHtml(title)}</h3>
              <dl>
                ${group
                  .map((line) => {
                    const currentIndex = lineIndex;
                    lineIndex += 1;
                    const [label, ...rest] = line.split(":");
                    const valueText = rest.join(":").trim();
                    return `
                      <div class="bank-row">
                        <dt>${escapeHtml(label.trim())}</dt>
                        <dd>${editable(valueText || line, `data-bank-line="${currentIndex}"`, "editable bank-value")}</dd>
                      </div>
                    `;
                  })
                  .join("")}
              </dl>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function engineerGroups(value) {
  const groups = [];
  let current = [];
  String(value || "")
    .split("\n")
    .forEach((line) => {
      if (!line.trim()) {
        if (current.length) groups.push(current);
        current = [];
        return;
      }
      current.push(line.trim());
    });
  if (current.length) groups.push(current);
  return groups;
}

function engineersHtml(value) {
  let lineIndex = 0;
  return `
    <div class="engineers-grid">
      ${engineerGroups(value)
        .map(
          (group) => `
            <div class="engineer-card">
              ${group
                .map((line, index) => {
                  const currentIndex = lineIndex;
                  lineIndex += 1;
                  return editable(
                    line,
                    `data-engineer-line="${currentIndex}"`,
                    `editable engineer-line ${index === 0 ? "engineer-name" : ""}`
                  );
                })
                .join("")}
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function clientsHtml() {
  return clientLogos
    .map(
      (client) => `
        <div class="client-logo-card">
          <img src="${client.src}" alt="${escapeHtml(client.alt)}" />
        </div>
      `
    )
    .join("");
}

function navLink(section, label, href) {
  const proposal = activeProposal();
  const updated = Boolean(proposal?.touchedSections?.[section]);
  return `
    <a class="nav-link ${updated ? "updated" : ""}" href="${href}" data-nav-section="${section}">
      <span>${label}</span>
      <small>editado</small>
    </a>
  `;
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
        ${navLink("dados", "Dados", "#dados")}
        ${navLink("apresentacao", "Apresentação", "#apresentacao")}
        ${navLink("escopo", "Escopo", "#escopo")}
        ${navLink("investimento", "Investimento", "#investimento")}
        ${navLink("cronograma", "Cronograma", "#cronograma")}
        ${navLink("fechamento", "Fechamento", "#fechamento")}
      </div>
    </aside>
  `;
}

function renderTable(table, index) {
  return renderTablePage(table, index, table.rows || [], { isFirstChunk: true, isLastChunk: true, pageNumber: 1, pageCount: 1 });
}

function rowWeight(row) {
  const descriptionLines = String(row.description || "").split("\n").length;
  return Math.max(1.4, 1 + descriptionLines * 0.62);
}

function chunkRows(rows, maxWeight = 10.6) {
  const chunks = [];
  let current = [];
  let weight = 0;
  rows.forEach((row) => {
    const nextWeight = rowWeight(row);
    if (current.length && weight + nextWeight > maxWeight) {
      chunks.push(current);
      current = [];
      weight = 0;
    }
    current.push(row);
    weight += nextWeight;
  });
  if (current.length) chunks.push(current);
  return chunks.length ? chunks : [[]];
}

function renderTablePage(table, index, pageRows, options) {
  const rows = table.rows || [];
  const title = table.title || `Tabela ${index + 1}`;
  const continuation = options.pageCount > 1 && !options.isFirstChunk ? " continuação" : "";
  return `
    <section class="doc-section investment-section" id="${index === 0 ? "materiais" : `investimento-${table.id}`}">
      <div class="section-heading-row">
        <h2 class="numbered-heading"><span>${index + 1}.</span> ${editable(title, `data-table-title="${table.id}"`, "editable heading-edit")}${continuation ? `<small>${continuation}</small>` : ""}</h2>
        <button class="icon-btn section-remove" data-delete-table="${table.id}" title="Remover tabela">×</button>
      </div>
      <table class="doc-table" data-table="${table.id}">
        <thead>
          <tr>
            <th class="col-item">Item</th>
            <th>Descrição</th>
            <th class="col-money">Valor</th>
            <th class="row-tools"></th>
          </tr>
        </thead>
        <tbody>
          ${pageRows
            .map(
              (row) => `
                <tr data-row="${row.id}">
                  <td>${editable(row.item || "", `data-table-id="${table.id}" data-row="${row.id}" data-field="item"`, "editable cell-edit")}</td>
                  <td>${editableBlock(row.description || "", `data-table-id="${table.id}" data-row="${row.id}" data-field="description"`, "editable cell-edit rich-cell")}</td>
                  <td class="money-cell">${editable(currencyInput(row.value, row.label), `data-table-id="${table.id}" data-row="${row.id}" data-field="value"`, "editable cell-edit money-edit")}</td>
                  <td class="row-tools"><button class="icon-btn" data-delete-row="${table.id}:${row.id}" title="Remover linha">×</button></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
        ${
          options.isLastChunk
            ? `
              <tfoot>
                <tr>
                  <td colspan="2">Total</td>
                  <td class="money-cell" data-total="${table.id}">${money.format(total(rows))}</td>
                  <td class="row-tools"></td>
                </tr>
              </tfoot>
            `
            : ""
        }
      </table>
      ${options.isLastChunk ? `<button class="ghost-add" data-add-row="${table.id}">Adicionar linha em ${escapeHtml(title.toLowerCase())}</button>` : ""}
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

function scheduleRowWeight(row) {
  const taskLines = Math.ceil(String(row.task || "").length / 52);
  const responsibleLines = Math.ceil(String(row.responsible || "").length / 20);
  return Math.max(1.15, Math.max(taskLines, responsibleLines) * 1.15);
}

function chunkScheduleRows(rows, maxWeight = 10.8) {
  const chunks = [];
  let current = [];
  let weight = 0;

  rows.forEach((row) => {
    const nextWeight = scheduleRowWeight(row);
    if (current.length && weight + nextWeight > maxWeight) {
      chunks.push(current);
      current = [];
      weight = 0;
    }
    current.push(row);
    weight += nextWeight;
  });

  if (current.length) chunks.push(current);
  return chunks.length ? chunks : [[]];
}

function renderSchedulePage(proposal, rows, pageIndex, pageCount) {
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pageCount - 1;

  return `
    <section class="page content-page">
      ${pageBg()}
      ${docTop(proposal)}
      <section class="doc-section" id="${isFirstPage ? "cronograma" : `cronograma-pagina-${pageIndex + 1}`}">
        <h2>Cronograma${isFirstPage ? "" : " <small>continuação</small>"}</h2>
        <table class="doc-table schedule-table">
          <thead>
            <tr><th>Tarefa</th><th>Responsável</th><th>Início</th><th>Término</th><th class="row-tools"></th></tr>
          </thead>
          <tbody>${renderScheduleRows(rows)}</tbody>
        </table>
        ${
          isLastPage
            ? `
              <button class="ghost-add" data-add-schedule>Adicionar linha no cronograma</button>
              ${editableBlock(proposal.scheduleNotes, 'data-block="scheduleNotes"', "editable block-edit note-block")}
            `
            : ""
        }
      </section>
      ${
        isLastPage
          ? `
            <section class="doc-section">
              <h2>Garantias</h2>
              ${editableBlock(proposal.blocks.guarantees, 'data-block="guarantees"')}
            </section>
          `
          : ""
      }
      ${docFoot()}
    </section>
  `;
}

function renderSchedulePages(proposal) {
  return chunkScheduleRows(proposal.schedule || [])
    .map((rows, index, pages) => renderSchedulePage(proposal, rows, index, pages.length))
    .join("");
}

function renderInvestmentPages(proposal, grandTotal) {
  const tables = proposal.investment.tables || [];
  const tablePages = tables.flatMap((table, tableIndex) => {
    const chunks = chunkRows(table.rows || []);
    return chunks.map((chunk, chunkIndex) => ({
      table,
      tableIndex,
      chunk,
      chunkIndex,
      chunkCount: chunks.length
    }));
  });

  const pages = tablePages.length
    ? tablePages.map((page, pageIndex) => {
        const isLastInvestmentPage = pageIndex === tablePages.length - 1;
        const isFirstChunk = page.chunkIndex === 0;
        const isLastChunk = page.chunkIndex === page.chunkCount - 1;
        return `
          <section class="page content-page investment-page" id="${pageIndex === 0 ? "investimento" : `investimento-pagina-${pageIndex + 1}`}">
            ${pageBg()}
            ${docTop(proposal)}
            ${renderTablePage(page.table, page.tableIndex, page.chunk, {
              isFirstChunk,
              isLastChunk,
              pageNumber: page.chunkIndex + 1,
              pageCount: page.chunkCount
            })}
            ${
              isLastInvestmentPage
                ? `
                  <button class="ghost-add add-table" data-add-table>Adicionar tabela de investimento</button>
                  <div class="grand-total">
                    <span>Investimento total</span>
                    <strong data-grand-total>${money.format(grandTotal)}</strong>
                  </div>
                `
                : ""
            }
            ${docFoot()}
          </section>
        `;
      })
    : [
        `
          <section class="page content-page investment-page" id="investimento">
            ${pageBg()}
            ${docTop(proposal)}
            <section class="doc-section">
              <h2>Investimento</h2>
              <button class="ghost-add add-table" data-add-table>Adicionar tabela de investimento</button>
            </section>
            <div class="grand-total">
              <span>Investimento total</span>
              <strong data-grand-total>${money.format(grandTotal)}</strong>
            </div>
            ${docFoot()}
          </section>
        `
      ];

  return pages.join("");
}

function renderDocument(proposal) {
  if (!proposal) {
    return `<main class="document-stage"><div class="empty-state">Crie uma proposta para começar.</div></main>`;
  }

  const grandTotal = investmentTotal(proposal.investment.tables);

  return `
    <main class="document-stage">
      <article class="paper">
        <section class="cover-page page">
          ${pageBg()}
          <img class="cover-logo" src="assets/rucad-logotype-color-dark-h.svg" alt="RUCAD" />
          <div class="cover-content">
            <div class="eyebrow">Proposta Comercial Nº ${editable(proposal.meta.number, 'data-meta="number"', "editable inline-dark")}</div>
            <h1>${editable(proposal.meta.title, 'data-meta="title"', "editable title-edit")}</h1>
            <div class="cover-client">Cliente: ${editable(proposal.meta.client, 'data-meta="client"', "editable inline-dark")}</div>
          </div>
        </section>

        <section class="page content-page" id="apresentacao">
          ${pageBg()}
          ${docTop(proposal)}
          <section class="doc-section">
            <h2>Apresentação</h2>
            ${editableBlock(template.presentation, 'data-template="presentation"')}
          </section>
          <section class="doc-section compact">
            <h2>Nossos clientes</h2>
            <div class="client-grid" data-client-grid>${clientsHtml()}</div>
          </section>
          ${docFoot()}
        </section>

        <section class="page content-page" id="dados">
          ${pageBg()}
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

        ${renderInvestmentPages(proposal, grandTotal)}

        <section class="page content-page">
          ${pageBg()}
          ${docTop(proposal)}
          <section class="doc-section">
            <h2>Observações</h2>
            ${editableBlock(proposal.blocks.notes, 'data-block="notes"')}
          </section>
          ${docFoot()}
        </section>

        ${renderSchedulePages(proposal)}

        <section class="page content-page" id="fechamento">
          ${pageBg()}
          ${docTop(proposal)}
          <section class="doc-section">
            <h2>Pagamento</h2>
            ${editableBlock(proposal.blocks.payment, 'data-block="payment"')}
          </section>
          <section class="doc-section">
            <h2>Dados da RUCAD</h2>
            ${bankHtml(template.bank)}
          </section>
          <section class="doc-section closing">
            ${editableBlock(template.validity, 'data-template="validity"')}
            <p>Atenciosamente,</p>
            ${engineersHtml(template.engineers)}
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

function pageBg() {
  return `<img class="page-bg" src="assets/timbrado-a4.svg" alt="" aria-hidden="true" />`;
}

function docFoot() {
  return `
    <footer class="doc-footer">
      <span>RUCAD Engenharia LTDA</span>
      <span>financeiro@rucadengenharia.com.br</span>
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
          <button class="btn icon-action" data-action="undo" title="Desfazer (Ctrl+Z)" ${undoStack.length ? "" : "disabled"}>↶</button>
          <button class="btn icon-action" data-action="redo" title="Refazer (Ctrl+Shift+Z)" ${redoStack.length ? "" : "disabled"}>↷</button>
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
      if (action === "undo") await undo();
      if (action === "redo") await redo();
      if (action === "new") await createProposal();
      if (action === "duplicate") await duplicateProposal();
      if (action === "delete") await deleteActiveProposal();
      if (action === "print") window.print();
    });
  });

  document.querySelectorAll("[data-meta]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      const proposal = activeProposal();
      proposal.meta[node.dataset.meta] = node.innerText.trim();
      markTouched("dados");
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-block]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      const proposal = activeProposal();
      const key = node.dataset.block;
      if (key === "scheduleNotes") {
        proposal.scheduleNotes = node.innerText.trim();
      } else {
        proposal.blocks[key] = node.innerText.trim();
      }
      markTouched(key === "scope" || key === "compliance" ? "escopo" : key === "scheduleNotes" ? "cronograma" : key === "payment" ? "fechamento" : "dados");
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-template]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      template[node.dataset.template] = node.innerText.trim();
      markTouched(node.dataset.template === "presentation" ? "apresentacao" : "fechamento");
      scheduleSave("template");
    });
  });

  document.querySelectorAll("[data-bank-line]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      const targetIndex = Number(node.dataset.bankLine);
      let currentIndex = 0;
      template.bank = String(template.bank || "")
        .split("\n")
        .map((line) => {
          if (!line.trim()) return line;
          if (currentIndex !== targetIndex) {
            currentIndex += 1;
            return line;
          }
          currentIndex += 1;
          const [label] = line.split(":");
          return `${label}: ${node.innerText.trim()}`;
        })
        .join("\n");
      markTouched("fechamento");
      scheduleSave("template");
    });
  });

  document.querySelectorAll("[data-engineer-line]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      const targetIndex = Number(node.dataset.engineerLine);
      let currentIndex = 0;
      template.engineers = String(template.engineers || "")
        .split("\n")
        .map((line) => {
          if (!line.trim()) return line;
          if (currentIndex !== targetIndex) {
            currentIndex += 1;
            return line;
          }
          currentIndex += 1;
          return node.innerText.trim();
        })
        .join("\n");
      markTouched("fechamento");
      scheduleSave("template");
    });
  });

  document.querySelectorAll("[data-table-title]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      const proposal = activeProposal();
      const table = proposal.investment.tables.find((item) => item.id === node.dataset.tableTitle);
      if (!table) return;
      table.title = node.innerText.trim();
      markTouched("investimento");
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-table-id]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      const proposal = activeProposal();
      const table = proposal.investment.tables.find((item) => item.id === node.dataset.tableId);
      const row = table?.rows.find((item) => item.id === node.dataset.row);
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
      markTouched("investimento");
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-schedule]").forEach((node) => {
    node.addEventListener("input", () => {
      pushHistory();
      const proposal = activeProposal();
      const row = proposal.schedule.find((item) => item.id === node.dataset.schedule);
      if (!row) return;
      row[node.dataset.field] = node.innerText.trim();
      markTouched("cronograma");
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-add-row]").forEach((button) => {
    button.addEventListener("click", () => {
      const proposal = activeProposal();
      const table = proposal.investment.tables.find((item) => item.id === button.dataset.addRow);
      if (!table) return;
      pushHistory();
      table.rows.push({ id: uid(), item: String(table.rows.length + 1), description: "Nova linha", value: 0 });
      markTouched("investimento");
      scheduleSave();
      render();
    });
  });

  document.querySelectorAll("[data-delete-row]").forEach((button) => {
    button.addEventListener("click", () => {
      const proposal = activeProposal();
      const [tableId, rowId] = button.dataset.deleteRow.split(":");
      const table = proposal.investment.tables.find((item) => item.id === tableId);
      if (!table) return;
      pushHistory();
      table.rows = table.rows.filter((row) => row.id !== rowId);
      markTouched("investimento");
      scheduleSave();
      render();
    });
  });

  document.querySelector("[data-add-table]")?.addEventListener("click", () => {
    const proposal = activeProposal();
    pushHistory();
    proposal.investment.tables.push({
      id: uid(),
      title: `Nova tabela ${proposal.investment.tables.length + 1}`,
      rows: [{ id: uid(), item: "1", description: "Nova linha", value: 0 }]
    });
    markTouched("investimento");
    scheduleSave();
    render();
  });

  document.querySelectorAll("[data-delete-table]").forEach((button) => {
    button.addEventListener("click", () => {
      const proposal = activeProposal();
      pushHistory();
      proposal.investment.tables = proposal.investment.tables.filter((table) => table.id !== button.dataset.deleteTable);
      markTouched("investimento");
      scheduleSave();
      render();
    });
  });

  document.querySelector("[data-add-schedule]")?.addEventListener("click", () => {
    const proposal = activeProposal();
    pushHistory();
    proposal.schedule.push({ id: uid(), task: "Nova tarefa", responsible: "", start: "", end: "" });
    markTouched("cronograma");
    scheduleSave();
    render();
  });

  document.querySelectorAll("[data-delete-schedule]").forEach((button) => {
    button.addEventListener("click", () => {
      const proposal = activeProposal();
      pushHistory();
      proposal.schedule = proposal.schedule.filter((row) => row.id !== button.dataset.deleteSchedule);
      markTouched("cronograma");
      scheduleSave();
      render();
    });
  });
}

function updateTotals() {
  const proposal = activeProposal();
  if (!proposal) return;
  proposal.investment.tables.forEach((table) => {
    const node = document.querySelector(`[data-total="${table.id}"]`);
    if (node) node.textContent = money.format(total(table.rows || []));
  });
  const grandNode = document.querySelector("[data-grand-total]");
  if (grandNode) grandNode.textContent = money.format(investmentTotal(proposal.investment.tables));
}

document.addEventListener("keydown", async (event) => {
  const key = event.key.toLowerCase();
  if (!(event.ctrlKey || event.metaKey) || key !== "z") return;
  event.preventDefault();
  if (event.shiftKey) {
    await redo();
  } else {
    await undo();
  }
});

await initStore();
await load();
