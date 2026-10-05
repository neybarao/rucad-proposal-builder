const DB_NAME = "rucad-propostas-db";
const DB_VERSION = 1;
const STORE = "proposals";

const nowIso = () => new Date().toISOString();

const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `proposal-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const today = () => new Date().toISOString().slice(0, 10);

const defaultProposal = () => ({
  id: uid(),
  createdAt: nowIso(),
  updatedAt: nowIso(),
  meta: {
    number: "044/2026",
    date: today(),
    client: "MRV Engenharia e Participações S.A.",
    contact: "",
    title: "Execução de Rede de Distribuição Urbana e Iluminação Pública",
    enterprise: "Castelo di Orleans",
    location: "Campo Grande/MS"
  },
  blocks: {
    introduction:
      "Apresentamos nossa proposta comercial para execução dos serviços de engenharia elétrica descritos neste documento, contemplando fornecimento de materiais, mão de obra especializada, equipamentos e acompanhamento técnico conforme escopo contratado.",
    scope:
      "Execução de rede de média tensão e baixa tensão, incluindo implantação de estruturas, lançamento de condutores, instalação de equipamentos de proteção, conexões, adequações necessárias e entrega técnica conforme normas aplicáveis da concessionária local.",
    materials:
      "Os materiais serão fornecidos conforme quantitativos aprovados em projeto, observando especificações técnicas, padrões de qualidade e disponibilidade comercial no momento da contratação.",
    services:
      "A execução será conduzida por equipe técnica especializada, com supervisão operacional, ferramentas adequadas, equipamentos de segurança e controles de qualidade durante as etapas da obra.",
    notes:
      "Valores sujeitos à validação final de projeto, disponibilidade de materiais e condições de acesso ao local. Serviços não descritos expressamente neste documento deverão ser avaliados em aditivo específico.",
    schedule:
      "O prazo de execução será confirmado após aprovação da proposta, liberação formal para início dos serviços e disponibilidade integral das frentes de trabalho.",
    warranties:
      "A RUCAD assegura garantia dos serviços executados conforme legislação vigente e condições técnicas de uso, operação e manutenção dos sistemas implantados.",
    payment:
      "Condições de pagamento a combinar, podendo ser estruturadas por entrada, marcos de execução e quitação final mediante conclusão dos serviços."
  },
  investment: {
    materials: [
      { id: uid(), description: "Materiais elétricos conforme projeto aprovado", value: 0 },
      { id: uid(), description: "Equipamentos, estruturas e acessórios de montagem", value: 0 }
    ],
    services: [
      { id: uid(), description: "Mão de obra especializada para execução de rede", value: 0 },
      { id: uid(), description: "Mobilização, ferramentas, supervisão e entrega técnica", value: 0 }
    ]
  }
});

const template = {
  institutional:
    "A RUCAD atua com engenharia elétrica, construção e manutenção de redes de distribuição de baixa e média tensão, subestações, sistemas fotovoltaicos, ensaios, comissionamento e laudos técnicos. Nosso compromisso é unir rigor técnico, organização de obra e entrega responsável.",
  bank:
    "RUCAD Engenharia Elétrica\nCNPJ: inserir CNPJ\nBanco: inserir banco\nAgência: inserir agência\nConta: inserir conta\nChave PIX: inserir chave",
  clients: ["MRV", "Energisa", "Plaenge", "A.Yoshii", "Águas Guariroba", "São Gabriel", "Voltalia", "Produtores Rurais"],
  signatures: {
    company: "RUCAD Engenharia Elétrica",
    client: "Contratante"
  }
};

let db = null;
let storageMode = "IndexedDB";
let proposals = [];
let activeId = null;
let activeTab = "dados";
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
      request.result.createObjectStore(STORE, { keyPath: "id" });
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

function tx(mode = "readonly") {
  return db.transaction(STORE, mode).objectStore(STORE);
}

function localKey() {
  return "rucad-propostas-local";
}

async function getAllProposals() {
  if (!db) {
    return JSON.parse(localStorage.getItem(localKey()) || "[]");
  }

  return new Promise((resolve, reject) => {
    const request = tx().getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function persistProposal(proposal) {
  if (!db) {
    const all = JSON.parse(localStorage.getItem(localKey()) || "[]");
    const next = all.some((item) => item.id === proposal.id)
      ? all.map((item) => (item.id === proposal.id ? proposal : item))
      : [proposal, ...all];
    localStorage.setItem(localKey(), JSON.stringify(next));
    return;
  }

  return new Promise((resolve, reject) => {
    const request = tx("readwrite").put(proposal);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function removeProposal(id) {
  if (!db) {
    const all = JSON.parse(localStorage.getItem(localKey()) || "[]").filter((item) => item.id !== id);
    localStorage.setItem(localKey(), JSON.stringify(all));
    return;
  }

  return new Promise((resolve, reject) => {
    const request = tx("readwrite").delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function activeProposal() {
  return proposals.find((item) => item.id === activeId) || null;
}

async function load() {
  proposals = (await getAllProposals()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  if (!proposals.length) {
    const first = defaultProposal();
    await persistProposal(first);
    proposals = [first];
  }
  activeId = proposals[0]?.id || null;
  render();
}

function scheduleSave() {
  const proposal = activeProposal();
  if (!proposal) return;
  proposal.updatedAt = nowIso();
  renderSaveState("Salvando...");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await persistProposal(proposal);
    proposals = proposals
      .map((item) => (item.id === proposal.id ? proposal : item))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    renderSaveState(`Salvo em ${storageMode}`);
    render();
  }, 350);
}

function renderSaveState(text) {
  const el = document.querySelector(".save-state");
  if (el) el.textContent = text;
}

function updateMeta(key, value) {
  const proposal = activeProposal();
  proposal.meta[key] = value;
  scheduleSave();
  renderPreviewOnly();
}

function updateBlock(key, value) {
  const proposal = activeProposal();
  proposal.blocks[key] = value;
  scheduleSave();
  renderPreviewOnly();
}

function updateInvestment(kind, rowId, field, value) {
  const proposal = activeProposal();
  const row = proposal.investment[kind].find((item) => item.id === rowId);
  row[field] = field === "value" ? Number(value || 0) : value;
  scheduleSave();
  renderPreviewOnly();
}

function addInvestmentRow(kind) {
  activeProposal().investment[kind].push({ id: uid(), description: "", value: 0 });
  scheduleSave();
  render();
}

function deleteInvestmentRow(kind, rowId) {
  const proposal = activeProposal();
  proposal.investment[kind] = proposal.investment[kind].filter((row) => row.id !== rowId);
  scheduleSave();
  render();
}

async function createProposal() {
  const proposal = defaultProposal();
  proposal.meta.number = `${String(proposals.length + 1).padStart(3, "0")}/2026`;
  await persistProposal(proposal);
  proposals = [proposal, ...proposals];
  activeId = proposal.id;
  activeTab = "dados";
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

function dateLabel(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatUpdated(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function field(label, value, oninput, type = "text", full = false) {
  return `
    <div class="field ${full ? "full" : ""}">
      <label>${label}</label>
      <input type="${type}" value="${escapeHtml(value)}" data-change="${oninput}" />
    </div>
  `;
}

function textarea(label, value, key) {
  return `
    <div class="field full">
      <label>${label}</label>
      <textarea data-block="${key}">${escapeHtml(value)}</textarea>
    </div>
  `;
}

function renderInvestmentEditor(kind, title, rows) {
  return `
    <div class="table-editor">
      <div class="locked-box"><strong>${title}</strong>Use linhas estruturadas para manter o total automático e a exportação consistente.</div>
      ${rows
        .map(
          (row) => `
            <div class="row-editor">
              <input value="${escapeHtml(row.description)}" placeholder="Descrição" data-invest-kind="${kind}" data-row="${row.id}" data-field="description" />
              <input type="number" min="0" step="0.01" value="${Number(row.value || 0)}" placeholder="Valor" data-invest-kind="${kind}" data-row="${row.id}" data-field="value" />
              <button class="icon-btn" data-delete-row="${kind}:${row.id}" title="Remover linha">×</button>
            </div>
          `
        )
        .join("")}
      <button class="btn" data-add-row="${kind}">Adicionar linha</button>
      <div class="locked-box"><strong>Total</strong>${money.format(total(rows))}</div>
    </div>
  `;
}

function renderEditor(proposal) {
  const tabs = [
    ["dados", "Dados"],
    ["texto", "Textos"],
    ["investimento", "Investimento"],
    ["padrao", "Template"]
  ];

  return `
    <section class="editor">
      <div class="tabs">
        ${tabs
          .map(
            ([id, label]) =>
              `<button class="tab ${activeTab === id ? "active" : ""}" data-tab="${id}">${label}</button>`
          )
          .join("")}
      </div>

      <div class="form-section ${activeTab === "dados" ? "active" : ""}">
        <div class="field-grid">
          ${field("Número", proposal.meta.number, "number")}
          ${field("Data", proposal.meta.date, "date", "date")}
          ${field("Cliente", proposal.meta.client, "client")}
          ${field("Contato", proposal.meta.contact, "contact")}
          ${field("Título", proposal.meta.title, "title", "text", true)}
          ${field("Empreendimento", proposal.meta.enterprise, "enterprise")}
          ${field("Local", proposal.meta.location, "location")}
        </div>
      </div>

      <div class="form-section ${activeTab === "texto" ? "active" : ""}">
        ${textarea("Introdução", proposal.blocks.introduction, "introduction")}
        ${textarea("Escopo", proposal.blocks.scope, "scope")}
        ${textarea("Materiais", proposal.blocks.materials, "materials")}
        ${textarea("Serviços", proposal.blocks.services, "services")}
        ${textarea("Observações", proposal.blocks.notes, "notes")}
        ${textarea("Cronograma", proposal.blocks.schedule, "schedule")}
        ${textarea("Garantias", proposal.blocks.warranties, "warranties")}
        ${textarea("Pagamento", proposal.blocks.payment, "payment")}
      </div>

      <div class="form-section ${activeTab === "investimento" ? "active" : ""}">
        ${renderInvestmentEditor("materials", "Materiais", proposal.investment.materials)}
        ${renderInvestmentEditor("services", "Serviços", proposal.investment.services)}
      </div>

      <div class="form-section ${activeTab === "padrao" ? "active" : ""}">
        <div class="locked-box"><strong>Conteúdo institucional protegido</strong>${escapeHtml(template.institutional)}</div>
        <div class="locked-box"><strong>Dados bancários padrão</strong>${escapeHtml(template.bank)}</div>
        <div class="locked-box"><strong>Nossos clientes</strong>${template.clients.map(escapeHtml).join(" · ")}</div>
        <div class="locked-box"><strong>Assinaturas</strong>${escapeHtml(template.signatures.company)} · ${escapeHtml(template.signatures.client)}</div>
      </div>
    </section>
  `;
}

function renderTable(title, rows) {
  return `
    <div class="doc-section">
      <h2>${title}</h2>
      <table class="doc-table">
        <thead>
          <tr><th>Descrição</th><th>Valor</th></tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) =>
                `<tr><td>${escapeHtml(row.description || "-")}</td><td class="money">${money.format(Number(row.value || 0))}</td></tr>`
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr><td>Total</td><td class="money">${money.format(total(rows))}</td></tr>
        </tfoot>
      </table>
    </div>
  `;
}

function renderPreview(proposal) {
  if (!proposal) {
    return `<div class="no-document">Crie uma proposta para começar.</div>`;
  }

  const materialsTotal = total(proposal.investment.materials);
  const servicesTotal = total(proposal.investment.services);
  const grandTotal = materialsTotal + servicesTotal;

  return `
    <div class="sheet">
      <section class="page cover">
        <div class="doc-logo"><span class="doc-logo-mark">R</span><span>RUCAD</span></div>
        <div class="cover-main">
          <span class="proposal-kicker">Proposta Comercial ${escapeHtml(proposal.meta.number)}</span>
          <h1>${escapeHtml(proposal.meta.title)}</h1>
          <div class="cover-meta">
            <div><b>Cliente</b>${escapeHtml(proposal.meta.client || "-")}</div>
            <div><b>Empreendimento</b>${escapeHtml(proposal.meta.enterprise || "-")}</div>
            <div><b>Local</b>${escapeHtml(proposal.meta.location || "-")}</div>
            <div><b>Data</b>${escapeHtml(dateLabel(proposal.meta.date))}</div>
          </div>
        </div>
        <div class="cover-foot">
          <span>Sua demanda, nossa solução.</span>
          <span>A Rucad não pára!</span>
        </div>
      </section>

      <section class="page">
        ${docHeader(proposal)}
        <div class="doc-section">
          <h2>Apresentação</h2>
          <p>${escapeHtml(template.institutional)}</p>
          <p>${escapeHtml(proposal.blocks.introduction)}</p>
        </div>
        <div class="doc-section">
          <h2>Dados da Proposta</h2>
          <div class="info-grid">
            <div class="info-box"><b>Proposta</b>${escapeHtml(proposal.meta.number)}</div>
            <div class="info-box"><b>Contato</b>${escapeHtml(proposal.meta.contact || "-")}</div>
            <div class="info-box"><b>Cliente</b>${escapeHtml(proposal.meta.client || "-")}</div>
            <div class="info-box"><b>Local</b>${escapeHtml(proposal.meta.location || "-")}</div>
          </div>
        </div>
        <div class="doc-section">
          <h2>Escopo</h2>
          <p>${escapeHtml(proposal.blocks.scope)}</p>
        </div>
        ${docFooter()}
      </section>

      <section class="page">
        ${docHeader(proposal)}
        <div class="doc-section">
          <h2>Materiais</h2>
          <p>${escapeHtml(proposal.blocks.materials)}</p>
        </div>
        <div class="doc-section">
          <h2>Serviços</h2>
          <p>${escapeHtml(proposal.blocks.services)}</p>
        </div>
        ${renderTable("Investimento em Materiais", proposal.investment.materials)}
        ${renderTable("Investimento em Serviços", proposal.investment.services)}
        <div class="doc-section">
          <table class="doc-table">
            <tfoot>
              <tr><td>Investimento Total</td><td class="money">${money.format(grandTotal)}</td></tr>
            </tfoot>
          </table>
        </div>
        ${docFooter()}
      </section>

      <section class="page">
        ${docHeader(proposal)}
        <div class="doc-section">
          <h2>Observações</h2>
          <p>${escapeHtml(proposal.blocks.notes)}</p>
        </div>
        <div class="doc-section">
          <h2>Cronograma</h2>
          <p>${escapeHtml(proposal.blocks.schedule)}</p>
        </div>
        <div class="doc-section">
          <h2>Garantias</h2>
          <p>${escapeHtml(proposal.blocks.warranties)}</p>
        </div>
        <div class="doc-section">
          <h2>Pagamento</h2>
          <p>${escapeHtml(proposal.blocks.payment)}</p>
        </div>
        <div class="doc-section">
          <h2>Dados Bancários</h2>
          <p>${escapeHtml(template.bank)}</p>
        </div>
        ${docFooter()}
      </section>

      <section class="page">
        ${docHeader(proposal)}
        <div class="doc-section">
          <h2>Nossos Clientes</h2>
          <div class="clients">
            ${template.clients.map((client) => `<div class="client-pill">${escapeHtml(client)}</div>`).join("")}
          </div>
        </div>
        <div class="signature-grid">
          <div class="signature">${escapeHtml(template.signatures.company)}</div>
          <div class="signature">${escapeHtml(template.signatures.client)}</div>
        </div>
        ${docFooter()}
      </section>
    </div>
  `;
}

function docHeader(proposal) {
  return `
    <header class="doc-header">
      <span>RUCAD Engenharia Elétrica</span>
      <span>Proposta ${escapeHtml(proposal.meta.number)}</span>
    </header>
  `;
}

function docFooter() {
  return `
    <footer class="doc-footer">
      <span>RUCAD · Engenharia elétrica</span>
      <span>Documento comercial</span>
    </footer>
  `;
}

function renderProposalList() {
  return `
    <aside class="proposal-list">
      <div class="panel-head">
        <h1>Propostas locais</h1>
        <p>Documentos salvos neste navegador. Recarregar ou fechar a aba preserva o trabalho neste dispositivo.</p>
      </div>
      <div class="list-items">
        ${
          proposals.length
            ? proposals
                .map(
                  (proposal) => `
                    <button class="proposal-card ${proposal.id === activeId ? "active" : ""}" data-open="${proposal.id}">
                      <strong>${escapeHtml(proposal.meta.number)} · ${escapeHtml(proposal.meta.client || "Sem cliente")}</strong>
                      <span>${escapeHtml(proposal.meta.title || "Sem título")}</span>
                      <span>Editado em ${formatUpdated(proposal.updatedAt)}</span>
                    </button>
                  `
                )
                .join("")
            : `<div class="empty">Nenhuma proposta criada.</div>`
        }
      </div>
    </aside>
  `;
}

function render() {
  const proposal = activeProposal();
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">R</div>
          <div>
            <div class="brand-title">RUCAD Propostas</div>
            <div class="brand-subtitle">Sem backend · autosave local · PDF pelo navegador</div>
          </div>
        </div>
        <div class="top-actions">
          <span class="save-state">Salvo em ${storageMode}</span>
          <button class="btn" data-action="new">Nova</button>
          <button class="btn" data-action="duplicate" ${proposal ? "" : "disabled"}>Duplicar</button>
          <button class="btn btn-danger" data-action="delete" ${proposal ? "" : "disabled"}>Excluir</button>
          <button class="btn btn-primary" data-action="print" ${proposal ? "" : "disabled"}>Exportar PDF</button>
        </div>
      </header>
      <main class="layout">
        ${renderProposalList()}
        <div class="workspace">
          ${proposal ? renderEditor(proposal) : ""}
          <section class="preview-wrap" id="preview">${renderPreview(proposal)}</section>
        </div>
      </main>
    </div>
  `;
  bind();
}

function renderPreviewOnly() {
  const preview = document.querySelector("#preview");
  if (preview) preview.innerHTML = renderPreview(activeProposal());
}

function bind() {
  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => {
      activeId = button.dataset.open;
      render();
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.tab;
      render();
    });
  });

  document.querySelectorAll("[data-change]").forEach((input) => {
    input.addEventListener("input", () => updateMeta(input.dataset.change, input.value));
  });

  document.querySelectorAll("[data-block]").forEach((input) => {
    input.addEventListener("input", () => updateBlock(input.dataset.block, input.value));
  });

  document.querySelectorAll("[data-invest-kind]").forEach((input) => {
    input.addEventListener("input", () =>
      updateInvestment(input.dataset.investKind, input.dataset.row, input.dataset.field, input.value)
    );
  });

  document.querySelectorAll("[data-add-row]").forEach((button) => {
    button.addEventListener("click", () => addInvestmentRow(button.dataset.addRow));
  });

  document.querySelectorAll("[data-delete-row]").forEach((button) => {
    button.addEventListener("click", () => {
      const [kind, rowId] = button.dataset.deleteRow.split(":");
      deleteInvestmentRow(kind, rowId);
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
}

await initStore();
await load();
