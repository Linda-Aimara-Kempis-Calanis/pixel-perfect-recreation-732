import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import {
  Dna, Menu, X, Award, FileText, GitBranch, LineChart, Mail, Sigma, ArrowRight, Heart,
  Check, MessageSquare, Zap, ClipboardList, Code2, FlaskConical, Users, Send, Microscope,
  Moon, Sun,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BioInnova Lab — Bioinformática en R y análisis ómico" },
      { name: "description", content: "Cursos de bioinformática con constancia UAEM y servicios de análisis RNA-seq profesional en México." },
      { property: "og:title", content: "BioInnova Lab — Bioinformática en R y análisis ómico" },
      { property: "og:description", content: "Cursos con valor curricular UAEM y paquetes de análisis de datos ómicos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMAIL = "linda.kempiscal@uaem.edu.mx";

const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#cursos", label: "Cursos" },
  { href: "#analisis", label: "Análisis de Datos" },
  { href: "#colaboraciones", label: "Colaboraciones" },
];

const cursos = [
  { icon: FileText, t: "Reportes Dinámicos con R Markdown", d: "Aprende a automatizar tus reportes científicos y documentos reproducibles de forma profesional." },
  { icon: GitBranch, t: "Control de Versiones con Git y GitHub", d: "Aprende a trabajar en equipo, respaldar tu código y gestionar proyectos científicos eficientemente." },
  { icon: LineChart, t: "Visualización de Datos con ggplot2", d: "Domina la creación de gráficos científicos de alta calidad, listos para publicación." },
  { icon: Sigma, t: "Análisis Estadísticos en R", d: "Aplica pruebas estadísticas robustas e interpretación de datos biológicos paso a paso." },
];

const beneficios = [
  { icon: MessageSquare, t: "Consultorías incluidas" },
  { icon: Zap, t: "Entrega rápida" },
  { icon: ClipboardList, t: "Reportes claros y completos" },
  { icon: Code2, t: "Código en scripts de R reproducibles" },
];

const btnCta = "inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3 font-semibold text-cta-foreground shadow-soft transition hover:brightness-110";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-navy-foreground/30 px-6 py-3 font-semibold text-navy-foreground transition hover:bg-navy-foreground/10";

const THEME_KEY = "bioinnova-theme";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = window.localStorage.getItem(THEME_KEY) === "dark";
    setDark(isDark);
    applyTheme(isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy-foreground/30 text-navy-foreground transition hover:bg-navy-foreground/10",
        className,
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Contacto BioInnova Lab: ${f.get("tipo")}`;
    const body = `Nombre: ${f.get("Nombre")}\nCorreo: ${f.get("Correo")}\nInstitución: ${f.get("Institución")}\nTipo de proyecto: ${f.get("tipo")}\n\n${f.get("mensaje")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-navy/95 text-navy-foreground backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal text-navy"><Dna className="h-5 w-5" /></span>
            BioInnova Lab
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => <a key={n.href} href={n.href} className="text-sm opacity-80 hover:text-teal hover:opacity-100">{n.label}</a>)}
            <a href="#contacto" className="rounded-full bg-cta px-5 py-2 text-sm font-semibold text-cta-foreground hover:brightness-110">Contacto</a>
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button className="grid h-9 w-9 place-items-center" onClick={() => setOpen(!open)} aria-label="Menú">{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-3 px-5 pb-5 md:hidden">
            {[...nav, { href: "#contacto", label: "Contacto" }].map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-1">{n.label}</a>)}
          </nav>
        )}
      </header>

      <section id="inicio" className="bg-hero text-navy-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
              <Microscope className="h-4 w-4" /> Omics Analysis · México
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              Bioinformática avanzada en <span className="text-teal">R</span> y análisis ómico
            </h1>
            <p className="mt-5 max-w-xl text-lg text-navy-foreground/80 md:text-xl">
              Cursos con valor curricular y servicios de análisis profesional para tu investigación.
            </p>
            <ul className="mt-6 space-y-3 text-lg opacity-90">
              <li className="flex gap-3"><Award className="mt-1 h-5 w-5 shrink-0 text-teal" /><span>Cursos especializados con constancia oficial con valor curricular por la <strong>Universidad Autónoma del Estado de Morelos (UAEM)</strong>.</span></li>
              <li className="flex gap-3"><FlaskConical className="mt-1 h-5 w-5 shrink-0 text-teal" />Servicios de análisis bioinformático profesional.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#analisis" className={btnCta}>Ver Paquetes de Análisis <ArrowRight className="h-4 w-4" /></a>
              <a href="#cursos" className={btnGhost}>Inscribirme a Cursos</a>
            </div>
          </div>
          <div className="self-center rounded-2xl border border-teal/30 bg-navy-foreground/5 p-7 backdrop-blur">
            <Heart className="h-8 w-8 text-cta" />
            <p className="mt-4 font-display text-xl font-semibold leading-snug">
              Todas las ganancias de los cursos y servicios son destinadas al apoyo del Laboratorio de Inmunología Celular y de Sistemas.
            </p>
            <p className="mt-3 text-sm opacity-70">Tu aprendizaje impulsa la investigación científica en México.</p>
          </div>
        </div>
      </section>

      <section id="cursos" className="relative mx-auto max-w-6xl overflow-hidden px-5 py-28 md:py-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-16 right-[-6rem] h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
          <div className="absolute bottom-[-6rem] left-[-6rem] h-80 w-80 rounded-full bg-cta/15 blur-3xl" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wider text-link">Cursos con aval UAEM</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Aprende bioinformática práctica</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Programas intensivos y prácticos para investigadores, clínicos y estudiantes.</p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {cursos.map(({ icon: I, t, d }) => (
            <article key={t} className="glass flex flex-col rounded-2xl p-7 transition hover:-translate-y-1">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-foreground"><I className="h-6 w-6" /></span>
              <h3 className="mt-5 text-xl font-semibold">{t}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{d}</p>
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cta/10 px-3 py-1 text-xs font-semibold text-cta">
                <Award className="h-4 w-4" /> Constancia con valor curricular por la UAEM
              </span>
              <a href="#contacto" className="mt-5 inline-flex items-center gap-2 font-semibold text-link hover:opacity-80">Más información / Registro <ArrowRight className="h-4 w-4" /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="analisis" className="bg-muted py-28 md:py-36">
        <div className="relative mx-auto max-w-5xl overflow-hidden px-5">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-10 right-[-8rem] h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
            <div className="absolute bottom-[-8rem] left-[-8rem] h-80 w-80 rounded-full bg-cta/15 blur-3xl" />
          </div>
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-link">Análisis de datos</p>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight md:text-4xl">Paquetes de análisis profesional</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-muted-foreground">Entregables claros, código reproducible en R y consultoría incluida.</p>
          <div className="glass mt-14 overflow-hidden rounded-3xl">
            <div className="bg-hero p-8 text-navy-foreground md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-teal">Paquete de análisis de datos</p>
              <h3 className="mt-2 text-3xl font-extrabold md:text-4xl">RNAseq <span className="font-medium opacity-80">(Expresión Diferencial)</span></h3>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-navy-foreground/10 px-4 py-1.5">Hasta 18 muestras</span>
                <span className="rounded-full bg-navy-foreground/10 px-4 py-1.5">Hasta 6 grupos experimentales</span>
              </div>
            </div>
            <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-10">
              <ul className="space-y-4">
                {["Agrupamiento entre muestras (PCA / Heatmap)", "Genes con cambios de expresión (Volcano plots)", "Análisis de las funciones de los genes DE (GO / KEGG)"].map((f) => (
                  <li key={f} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><Check className="h-4 w-4" /></span>{f}</li>
                ))}
              </ul>
              <div className="rounded-2xl bg-secondary p-6 text-center">
                <p className="text-sm text-muted-foreground">Inversión</p>
                <p className="mt-1 font-display text-4xl font-extrabold">$40,000</p>
                <p className="text-sm font-semibold text-muted-foreground">MXN + IVA</p>
                <a href="#contacto" className={`${btnCta} mt-5 w-full`}>Solicitar análisis</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px border-t bg-border md:grid-cols-4">
              {beneficios.map(({ icon: I, t }) => (
                <div key={t} className="flex flex-col items-center gap-2 p-5 text-center text-sm font-medium">
                  <I className="h-6 w-6 text-link" />{t}
                </div>
              ))}
            </div>
          </div>
            <div className="mt-14 flex items-center justify-center gap-3 text-muted-foreground">
            <Dna className="h-6 w-6 text-link" />
            <span className="font-display font-semibold">Laboratorio de Inmunología Celular y de Sistemas</span>
          </div>
        </div>
      </section>

      <section id="colaboraciones" className="mx-auto grid max-w-6xl gap-16 px-5 py-28 md:grid-cols-2 md:py-36">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-link">Colaboraciones</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Hagamos ciencia juntos</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Invitamos a investigadores, clínicos y estudiantes a desarrollar colaboraciones científicas y coinvestigaciones en análisis ómico, inmunología y biología de sistemas.
          </p>
          <ul className="mt-8 space-y-4">
            {["Investigadores", "Clínicos", "Estudiantes de posgrado"].map((x) => (
              <li key={x} className="flex items-center gap-3 font-medium"><Users className="h-5 w-5 text-link" />{x}</li>
            ))}
          </ul>
        </div>
        <div id="contacto" className="scroll-mt-24 rounded-3xl border bg-card p-8 shadow-soft">
          {sent ? (
            <div className="py-16 text-center">
              <Check className="mx-auto h-12 w-12 text-link" />
              <h3 className="mt-4 text-2xl font-bold">¡Gracias por escribirnos!</h3>
              <p className="mt-2 text-muted-foreground">Se abrió tu correo para enviar el mensaje. También puedes escribir directamente a <a className="font-semibold text-accent" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h3 className="text-2xl font-bold">Contáctanos</h3>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm font-medium text-link"><Mail className="h-4 w-4" />{EMAIL}</a>
              {[["Nombre", "text"], ["Correo", "email"], ["Institución", "text"]].map(([l, t]) => (
                <label key={l} className="block text-sm font-medium">{l}
                  <input required name={l} type={t} className="mt-1 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
                </label>
              ))}
              <label className="block text-sm font-medium">Tipo de proyecto
                <select name="tipo" className="mt-1 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-accent">
                  <option>Curso</option><option>Análisis RNA-seq</option><option>Colaboración científica</option><option>Otro</option>
                </select>
              </label>
              <label className="block text-sm font-medium">Mensaje
                <textarea name="mensaje" required rows={4} className="mt-1 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-accent" />
              </label>
              <button type="submit" className={`${btnCta} w-full`}>Enviar mensaje <Send className="h-4 w-4" /></button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-navy py-10 text-center text-sm text-navy-foreground/70">
        © {new Date().getFullYear()} BioInnova Lab · Laboratorio de Inmunología Celular y de Sistemas
      </footer>
    </div>
  );
}
