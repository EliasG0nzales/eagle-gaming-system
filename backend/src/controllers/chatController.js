const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function chatbot(req, res) {
  try {
    const { mensaje, inventario, movimientos, proveedores } = req.body;

    if (!mensaje) {
      return res.status(400).json({ message: "Mensaje requerido" });
    }

    // Resumen del inventario en vez de lista completa
    const cats = [...new Set(inventario?.map(p => p.categoria) || [])];
    const resumenInventario = cats.map(cat => {
      const prods = inventario.filter(p => p.categoria === cat);
      const precios = prods.map(p => p.precio || 0);
      const stocks  = prods.map(p => p.stock || 0);
      return `${cat}: ${prods.length} productos | Precio: S/${Math.min(...precios)}-S/${Math.max(...precios)} | Stock total: ${stocks.reduce((a,b)=>a+b,0)}`;
    }).join("\n");

    // Top 20 productos más relevantes
    const top20 = [...(inventario||[])]
      .sort((a,b) => (b.precio||0)*(b.stock||0) - (a.precio||0)*(a.stock||0))
      .slice(0,20)
      .map(p => `- ${p.categoria}: ${p.modelo} | S/${p.precio} | Stock:${p.stock}`)
      .join("\n");

    const contexto = `
Eres Eagle Bot, asistente de Eagle Gaming (tienda gaming en Perú). Responde en español.

RESUMEN POR CATEGORÍA:
${resumenInventario}

TOP 20 PRODUCTOS MÁS VALIOSOS:
${top20}

TOTAL INVENTARIO: ${inventario?.length || 0} productos | Valor total: S/${inventario?.reduce((a,b)=>a+(b.precio||0)*(b.stock||0),0).toLocaleString() || 0}

MOVIMIENTOS RECIENTES: ${movimientos?.length || 0} registros
PROVEEDORES: ${proveedores?.map(p=>`${p.nombre}(${p.producto})`).join(", ") || "ninguno"}

Responde preguntas sobre precios, stock, categorías, cálculos y recomendaciones de negocio.
Sé preciso, directo y útil. Máximo 4 líneas.
    `;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 400,
      messages: [
        { role: "system", content: contexto },
        { role: "user",   content: mensaje }
      ],
    });

    return res.json({ respuesta: response.choices[0].message.content });

  } catch (err) {
    console.error("[chatbot]", err);
    return res.status(500).json({ message: "Error al procesar mensaje" });
  }
}

module.exports = { chatbot };