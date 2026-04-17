const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

const images = [
  { name: "mini-urso-01.jpg", label: "Urso - Frente", bg: "#F5E6E0", accent: "#D8A09B" },
  { name: "mini-urso-02.jpg", label: "Urso - Lateral", bg: "#EDE3DC", accent: "#C4908A" },
  { name: "mini-urso-03.jpg", label: "Urso - Costas", bg: "#F0E0D8", accent: "#B8817A" },
  { name: "mini-urso-04.jpg", label: "Urso - Detalhe", bg: "#F8EDE8", accent: "#D8A09B" },
  { name: "mini-urso-05.jpg", label: "Urso - Escala", bg: "#F2E5DE", accent: "#C89890" },
  { name: "embalagem-caixa.jpg", label: "Caixa Premium", bg: "#FDF6F0", accent: "#D8A09B" },
  { name: "embalagem-saquinho.jpg", label: "Saquinho Craft", bg: "#F5EDE6", accent: "#C4908A" },
];

const WIDTH = 800;
const HEIGHT = 800;
const outDir = path.join(__dirname, "..", "public", "images");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

images.forEach(({ name, label, bg, accent }) => {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  // Fundo
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Círculo decorativo central
  ctx.beginPath();
  ctx.arc(WIDTH / 2, HEIGHT / 2 - 30, 180, 0, Math.PI * 2);
  ctx.fillStyle = accent + "33";
  ctx.fill();

  // Círculo menor interno
  ctx.beginPath();
  ctx.arc(WIDTH / 2, HEIGHT / 2 - 30, 100, 0, Math.PI * 2);
  ctx.fillStyle = accent + "55";
  ctx.fill();

  // Ícone de crochê (novelo estilizado)
  ctx.beginPath();
  ctx.arc(WIDTH / 2, HEIGHT / 2 - 30, 50, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();

  // Linha do novelo
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2 + 35, HEIGHT / 2 - 30);
  ctx.quadraticCurveTo(WIDTH / 2 + 100, HEIGHT / 2 + 40, WIDTH / 2 + 60, HEIGHT / 2 + 80);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Texto do label
  ctx.fillStyle = "#4A4443";
  ctx.font = "bold 36px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, WIDTH / 2, HEIGHT / 2 + 150);

  // Texto "Sara Crochê"
  ctx.fillStyle = accent;
  ctx.font = "24px sans-serif";
  ctx.fillText("Sara Crochê", WIDTH / 2, HEIGHT / 2 + 190);

  // Borda sutil
  ctx.strokeStyle = accent + "44";
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, WIDTH - 40, HEIGHT - 40);

  // Salvar
  const buffer = canvas.toBuffer("image/jpeg", { quality: 0.9 });
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ ${name} criado`);
});

console.log("\n🎉 Todas as imagens foram geradas em public/images/");