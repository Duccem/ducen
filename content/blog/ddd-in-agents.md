---
title: "Domain-Driven Design aplicado al desarrollo de agentes de IA"
description: "Cómo aplicar DDD, arquitectura hexagonal y TDD para construir agentes de IA testeables, auditables y evolutivos"
date: 2024-06-21
---

_Por Jose Veliz, Senior Full Stack Engineer · AI Agents, SaaS & Fintech_

---

La mayoría de los agentes de IA que llegan a producción empiezan igual: un prompt largo, un par de funciones expuestas como herramientas y un bucle que llama al modelo. Funciona en la demo. A los tres meses es un monolito de strings y condicionales donde nadie sabe qué parte del prompt contiene reglas de negocio, qué herramienta puede ejecutar qué, ni por qué el agente decidió lo que decidió.

El problema no es el modelo. Es que el **dominio del negocio no tiene un lugar explícito en el código**. Ahí es donde **Domain-Driven Design (DDD)**, junto con arquitectura hexagonal y TDD, aporta más de lo que parece: un agente es, al final, software con un componente no determinista en el centro, y ese componente necesita fronteras muy claras.

Este artículo plantea cómo modelar agentes de IA con DDD: qué es el dominio, qué es infraestructura, dónde vive el LLM y cómo hacer que todo sea testeable. Los ejemplos están en TypeScript, pero el enfoque es independiente del lenguaje.

---

## 1. El problema: dominio mezclado con infraestructura

Un agente típico "ingenuo" se ve así:

```ts
async function handleMessage(msg: string) {
  const res = await llm.chat({
    system: `Eres un agente de retención. Puedes ofrecer hasta 20% de descuento
             si el cliente lleva más de 6 meses. Nunca ofrezcas descuentos
             a clientes con pagos atrasados. Usa las herramientas disponibles...`,
    messages: [{ role: "user", content: msg }],
    tools: [crmTool, discountTool, emailTool],
  });
  // ... ejecutar tool calls, reintentar, devolver respuesta
}
```

Aquí hay al menos cuatro problemas:

1. **Las reglas de negocio viven en un prompt.** "Hasta 20 %", "más de 6 meses", "nunca con pagos atrasados" son invariantes del dominio, pero ahora dependen de que el modelo las obedezca.
2. **El modelo decide y ejecuta.** No hay una capa que valide que la acción es legal antes de aplicarla.
3. **Acoplamiento al proveedor.** El SDK del LLM, el formato de tool calls y el CRM están mezclados en la misma función.
4. **Imposible de testear sin llamar al modelo.** Cada prueba es lenta, cara y no determinista.

DDD ataca exactamente esto: separar **qué es verdad en el negocio** de **cómo se implementa técnicamente**.

---

## 2. Principio rector: el LLM es infraestructura, no dominio

Esta es la idea central del artículo:

> **El modelo propone; el dominio dispone.**

El LLM interpreta lenguaje natural, razona y _sugiere_ intenciones. Pero las reglas que determinan si una acción es válida pertenecen al dominio, se escriben en código determinista y se testean sin IA.

En términos de arquitectura hexagonal:

```
                 ┌───────────────────────────────────────┐
                 │              APLICACIÓN               │
  Adaptadores    │   Casos de uso / Orquestación         │   Adaptadores
  de entrada     │   (RetenerCliente, CalificarLead)     │   de salida
 ┌───────────┐   │  ┌─────────────────────────────────┐  │  ┌────────────┐
 │ Webhook   │──►│  │            DOMINIO              │  │─►│ CRM (REST) │
 │ Chat      │   │  │ Entidades · Value Objects ·     │  │  │ Postgres   │
 │ Cola/Cron │   │  │ Agregados · Políticas · Eventos │  │  │ Email      │
 └───────────┘   │  └─────────────────────────────────┘  │  │ LLM (port) │
                 │                                       │  └────────────┘
                 └───────────────────────────────────────┘
```

El LLM aparece como **un puerto de salida más**, igual que una base de datos. El dominio no sabe qué proveedor hay detrás.

---

## 3. Lenguaje ubicuo: el vocabulario compartido (y el del prompt)

DDD empieza por el **lenguaje ubicuo**: un vocabulario único entre negocio, producto y código. En agentes, este vocabulario tiene un beneficio adicional: **es también el vocabulario del prompt y de las herramientas**.

Si el negocio habla de "cuenta en riesgo", "oferta de retención" y "escalamiento", esos mismos términos deben aparecer como:

- Nombres de clases y métodos en el dominio.
- Nombres y descripciones de las herramientas del agente.
- Etiquetas en logs y métricas.

Cuando el modelo, el código y el equipo comercial usan las mismas palabras, se reducen los errores de interpretación y la depuración se vuelve mucho más simple.

---

## 4. Bounded Contexts: dónde termina cada agente

Un error común es construir "un agente que lo hace todo". DDD sugiere lo contrario: dividir por **bounded contexts**, cada uno con su modelo y su lenguaje.

Ejemplo para un negocio SaaS:

| Bounded Context | Responsabilidad                     | Concepto "Cliente" significa…                   |
| --------------- | ----------------------------------- | ----------------------------------------------- |
| **Ventas**      | Calificar y convertir leads         | Un prospecto con un score y una etapa de embudo |
| **Retención**   | Detectar riesgo y proponer acciones | Una cuenta activa con salud, uso y contrato     |
| **Soporte**     | Resolver incidencias                | Un solicitante con tickets e historial          |
| **Facturación** | Cobros y pagos                      | Un pagador con métodos de pago y deuda          |

Cada contexto puede tener su propio agente, con herramientas, políticas y prompts propios. La comunicación entre ellos se hace con **eventos de dominio** o interfaces explícitas (_anti-corruption layer_), no compartiendo estado ni prompts.

Beneficios técnicos:

- **Superficie de herramientas reducida:** cada agente solo ve las herramientas de su contexto, lo que mejora la precisión del modelo y reduce el riesgo.
- **Evolución independiente:** cambiar la política de retención no rompe el agente de ventas.
- **Permisos claros:** el agente de soporte no puede, por construcción, emitir un reembolso de Facturación.

---

## 5. Modelando el dominio: bloques tácticos

### 5.1 Value Objects: validación en la frontera

Los _value objects_ son inmutables, se comparan por valor y **validan en el constructor**. Son ideales para blindar los argumentos que el LLM propone.

```ts
export class PorcentajeDescuento {
  private constructor(readonly valor: number) {}

  static crear(valor: number): PorcentajeDescuento {
    if (!Number.isFinite(valor) || valor <= 0 || valor > 100) {
      throw new DescuentoInvalidoError(valor);
    }
    return new PorcentajeDescuento(valor);
  }
}
```

Si el modelo alucina `descuento: 95`, el value object no lo rechaza por el prompt sino por **código**. Y eso no depende de la obediencia del modelo.

### 5.2 Entidades y agregados: invariantes de negocio

Un **agregado** es un clúster de objetos con una raíz que garantiza sus invariantes. Aquí viven las reglas que antes estaban en el prompt.

```ts
export class CuentaCliente {
  constructor(
    readonly id: CuentaId,
    private estado: EstadoCuenta,
    private antiguedadMeses: number,
    private pagosAtrasados: number,
    private ofertas: OfertaRetencion[] = [],
  ) {}

  ofrecerDescuento(
    pct: PorcentajeDescuento,
    politica: PoliticaRetencion,
  ): OfertaRetencion {
    if (this.pagosAtrasados > 0) {
      throw new OfertaNoPermitida("La cuenta tiene pagos atrasados");
    }
    if (!politica.permite(pct, this.antiguedadMeses)) {
      throw new OfertaNoPermitida("El descuento excede la política vigente");
    }
    const oferta = OfertaRetencion.crear(this.id, pct);
    this.ofertas.push(oferta);
    return oferta;
  }
}
```

La regla "nunca descuentos con pagos atrasados" ahora es **una línea de código con test**, no una frase en un prompt.

### 5.3 Políticas (Domain Services): reglas que cambian

Las reglas que varían por negocio, región o campaña se modelan como **políticas** intercambiables:

```ts
export interface PoliticaRetencion {
  permite(pct: PorcentajeDescuento, antiguedadMeses: number): boolean;
}

export class PoliticaRetencionEstandar implements PoliticaRetencion {
  permite(pct: PorcentajeDescuento, antiguedadMeses: number) {
    const tope = antiguedadMeses >= 6 ? 20 : 10;
    return pct.valor <= tope;
  }
}
```

Marketing puede cambiar el tope sin tocar prompts ni lógica del agente.

### 5.4 Eventos de dominio: trazabilidad y desacoplamiento

Cada hecho relevante se emite como evento inmutable:

```ts
export type OfertaRetencionAplicada = {
  type: "OfertaRetencionAplicada";
  cuentaId: string;
  porcentaje: number;
  decididaPor: "agente" | "humano";
  ocurridoEn: Date;
};
```

Los eventos permiten:

- **Auditoría:** quién (o qué) decidió qué y cuándo.
- **Desacoplamiento:** el contexto de Facturación reacciona al evento sin que Retención lo conozca.
- **Evaluación:** reconstruir el comportamiento del agente a partir de hechos, no de logs de texto.

---

## 6. La capa de aplicación: el agente como orquestador

El **caso de uso** coordina; el dominio decide. El agente vive aquí, detrás de un puerto.

### 6.1 El puerto del razonamiento

```ts
export interface RazonadorPort {
  proponerAccion(contexto: ContextoDecision): Promise<AccionPropuesta>;
}

export type AccionPropuesta =
  | { tipo: "ofrecer_descuento"; porcentaje: number; justificacion: string }
  | { tipo: "escalar_a_humano"; motivo: string }
  | { tipo: "no_hacer_nada"; motivo: string };
```

Fíjate en dos decisiones de diseño:

- La salida del modelo es una **unión discriminada y tipada**, no texto libre. Se valida con un esquema (por ejemplo Zod) antes de entrar al dominio.
- El puerto no menciona ningún proveedor. El adaptador concreto (Claude, otro modelo, un _stub_ de pruebas) vive en infraestructura.

### 6.2 El caso de uso

```ts
export class EvaluarCuentaEnRiesgo {
  constructor(
    private cuentas: CuentaRepository,
    private razonador: RazonadorPort,
    private politica: PoliticaRetencion,
    private eventos: EventBus,
  ) {}

  async ejecutar(cuentaId: CuentaId) {
    const cuenta = await this.cuentas.obtener(cuentaId);
    const contexto = ContextoDecision.desde(cuenta);

    const propuesta = await this.razonador.proponerAccion(contexto);

    switch (propuesta.tipo) {
      case "ofrecer_descuento": {
        try {
          const pct = PorcentajeDescuento.crear(propuesta.porcentaje);
          const oferta = cuenta.ofrecerDescuento(pct, this.politica);
          await this.cuentas.guardar(cuenta);
          await this.eventos.publicar(
            OfertaRetencionAplicada.desde(oferta, "agente"),
          );
        } catch (e) {
          if (e instanceof ErrorDeDominio) {
            await this.eventos.publicar(
              PropuestaRechazada.desde(cuentaId, propuesta, e),
            );
            return this.escalar(cuentaId, e.message);
          }
          throw e;
        }
        break;
      }
      case "escalar_a_humano":
        return this.escalar(cuentaId, propuesta.motivo);
      case "no_hacer_nada":
        return;
    }
  }
}
```

Observa el patrón: **propuesta → validación por el dominio → efecto o escalamiento**. Si el modelo se equivoca, el dominio lo detiene y el sistema escala a un humano. El fallo del modelo se convierte en un caso de negocio manejado, no en un incidente.

---

## 7. Herramientas del agente como adaptadores

Cuando el agente usa _tool calling_, cada herramienta debe ser un **adaptador delgado** hacia un caso de uso, nunca una función con lógica de negocio propia.

```ts
export const herramientaOfrecerDescuento = {
  name: "ofrecer_descuento_retencion",
  description: "Propone un descuento de retención para una cuenta en riesgo",
  schema: z.object({
    cuentaId: z.string(),
    porcentaje: z.number(),
  }),
  handler: async (args: unknown) => {
    const { cuentaId, porcentaje } = schema.parse(args);
    return ofrecerDescuento.ejecutar(CuentaId.de(cuentaId), porcentaje);
  },
};
```

Reglas prácticas:

- **Una herramienta = un caso de uso.** Sin lógica propia.
- **Esquema estricto** en la entrada y **errores de dominio legibles** en la salida: el mensaje de error vuelve al modelo y le permite corregir su siguiente paso.
- **Idempotencia:** el modelo puede reintentar. Una herramienta con efectos debe tolerarlo (claves de idempotencia, comprobaciones de estado).
- **Lectura vs. escritura separadas:** las herramientas de solo lectura se exponen con libertad; las de escritura pasan por políticas y, si procede, por aprobación humana.

---

## 8. Repositorios y memoria

La **memoria del agente** es persistencia, y DDD ya tiene un patrón para eso: el **repositorio**.

- **Estado del negocio** (cuentas, ofertas, leads) → repositorios de agregados sobre PostgreSQL u otra base.
- **Historial de conversación y decisiones** → repositorio propio, a menudo como _event store_ o tabla de eventos.
- **Conocimiento recuperable (RAG)** → un puerto `BaseConocimiento` con un método tipo `buscar(consulta, contexto)`. El almacén vectorial es un detalle de infraestructura intercambiable.

```ts
export interface BaseConocimiento {
  buscar(consulta: string, limite: number): Promise<FragmentoConocimiento[]>;
}
```

Así, cambiar de almacén vectorial o de estrategia de recuperación no afecta al dominio ni a los casos de uso.

---

## 9. Testing: TDD con un componente no determinista

Esta es probablemente la mayor ventaja práctica. Al aislar el LLM detrás de un puerto, aparecen **tres niveles de pruebas**, cada uno con un propósito distinto.

### Nivel 1: Dominio (determinista, rápido, sin IA)

Se prueban invariantes y políticas con TDD clásico:

```ts
it("rechaza descuentos en cuentas con pagos atrasados", () => {
  const cuenta = CuentaBuilder.conPagosAtrasados(1).build();
  expect(() =>
    cuenta.ofrecerDescuento(PorcentajeDescuento.crear(10), politicaEstandar),
  ).toThrow(OfertaNoPermitida);
});
```

Miles de casos corren en milisegundos y no cuestan tokens.

### Nivel 2: Casos de uso con un razonador falso

Se sustituye el puerto por un _stub_ que devuelve propuestas controladas, incluidas las **malas**:

```ts
it("escala a humano cuando el modelo propone un descuento fuera de política", async () => {
  const razonador = new RazonadorFalso({
    tipo: "ofrecer_descuento",
    porcentaje: 95,
    justificacion: "…",
  });
  const uc = new EvaluarCuentaEnRiesgo(
    repo,
    razonador,
    politicaEstandar,
    eventos,
  );

  await uc.ejecutar(cuentaId);

  expect(eventos.publicados).toContainEqual(
    expect.objectContaining({ type: "PropuestaRechazada" }),
  );
  expect(escalamientos).toHaveLength(1);
});
```

Aquí se verifica algo crucial: **el sistema es seguro incluso cuando el modelo falla**.

### Nivel 3: Evaluaciones del modelo (no determinista, con datos reales)

Aquí sí se llama al modelo real, sobre un conjunto de casos etiquetados, y se miden métricas agregadas: tasa de acierto de la acción propuesta, tasa de escalamiento, propuestas rechazadas por el dominio, latencia y costo por caso. Estas evaluaciones se ejecutan en CI ante cambios de prompt, de modelo o de herramientas, y detectan regresiones que ningún test unitario vería.

La separación es clave: **los niveles 1 y 2 garantizan seguridad y corrección; el nivel 3 mide calidad.**

---

## 10. Estructura de carpetas sugerida

```
src/
├── retencion/                     # Bounded context
│   ├── domain/
│   │   ├── cuenta-cliente.ts      # Agregado
│   │   ├── oferta-retencion.ts    # Entidad
│   │   ├── porcentaje-descuento.ts# Value Object
│   │   ├── politica-retencion.ts  # Política
│   │   └── eventos/
│   ├── application/
│   │   ├── evaluar-cuenta-en-riesgo.ts   # Caso de uso
│   │   └── puertos/
│   │       ├── razonador.port.ts
│   │       └── base-conocimiento.port.ts
│   ├── infrastructure/
│   │   ├── razonador-llm.adapter.ts      # Adaptador al proveedor de LLM
│   │   ├── cuenta.repository.pg.ts
│   │   └── herramientas/                 # Tool adapters del agente
│   └── interfaces/
│       └── webhooks / cron / http
└── ventas/                        # Otro bounded context
    └── ...
```

Esta estructura encaja de forma natural con frameworks como NestJS, donde los módulos, la inyección de dependencias y los proveedores facilitan registrar adaptadores intercambiables para cada puerto.

---

## 11. Errores frecuentes al aplicar DDD en agentes

1. **Poner reglas de negocio en el prompt "por comodidad".** El prompt orienta; el dominio garantiza. Si una regla es crítica, debe existir en código.
2. **Un único agente gigante.** Rompe la idea de bounded contexts y multiplica la superficie de riesgo.
3. **Herramientas con lógica propia.** Duplican reglas, las hacen divergir y las vuelven difíciles de testear.
4. **Confiar en texto libre como salida.** Sin esquemas y tipos, el dominio recibe basura.
5. **Sobre-modelar desde el día uno.** DDD no exige agregados para todo. Empieza por el contexto con más reglas y más riesgo, y modela lo que duele.
6. **Ignorar los eventos.** Sin ellos, se pierde la trazabilidad que hace posible auditar y evaluar al agente.

---

## 12. Cuándo no vale la pena

DDD tiene un costo. Para un prototipo de una tarde, una automatización trivial o un agente sin efectos sobre sistemas reales, probablemente sea excesivo. Empieza a compensar cuando:

- El agente **ejecuta acciones con consecuencias** (dinero, datos, comunicaciones a clientes).
- Existen **reglas de negocio complejas o cambiantes**.
- Hay **varios equipos o contextos** involucrados.
- Necesitas **auditar, evaluar y mejorar** el comportamiento de forma continua.

---

## Conclusión

Construir agentes de IA en producción es, en gran medida, un problema clásico de ingeniería de software con una pieza nueva y no determinista en el centro. DDD, arquitectura hexagonal y TDD ofrecen una respuesta probada: **mantener el dominio explícito y determinista, y tratar al modelo como un colaborador que propone, nunca como la autoridad que decide.**

Cuando esa frontera está bien trazada, el agente se vuelve testeable, auditable y evolutivo: puedes cambiar de modelo, ajustar políticas o añadir herramientas sin miedo a romper las reglas que sostienen al negocio.

---

### Sobre el autor

**Jose Veliz** es Senior Full Stack Engineer con 8 años de experiencia construyendo productos web y móviles. Trabaja con TypeScript, Python, Node.js y NestJS, con enfoque en DDD, TDD y arquitectura limpia y hexagonal. Ha desarrollado agentes de IA y sistemas sobre plataformas con más de 1.000 microservicios, y está disponible para proyectos freelance.

📩 ducen29@gmail.com · 🌐 ducen.dev
