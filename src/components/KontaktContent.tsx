'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import LegalPage from '@/components/legal/LegalPage';

type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
  privacy: false,
  website: '', // Honeypot
};

const inputClasses =
  'w-full border border-line bg-canvas px-4 py-3 text-[15px] text-fg placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none';

export default function KontaktContent() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrors({});
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrors(data.errors ?? {});
        setErrorMessage(data.error ?? 'Es ist ein Fehler aufgetreten.');
        return;
      }

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
      setErrorMessage('Verbindung fehlgeschlagen. Bitte versuche es später erneut.');
    }
  };

  const update = (field: keyof typeof INITIAL_FORM, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (status === 'error') setStatus('idle');
  };

  return (
    <LegalPage
      eyebrow="Kontakt"
      title="Schreib mir."
      wide
      intro={
        <p>
          Fragen zu IT, einem Projekt oder einem Artikel? Schreib mir über das Formular, ich melde mich so
          schnell wie möglich. Lieber direkt per E-Mail:{' '}
          <a
            href="mailto:imprint@achimsommer.com"
            className="text-fg underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
          >
            imprint@achimsommer.com
          </a>
        </p>
      }
    >
      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative border border-line bg-surface p-8"
        >
          <span className="absolute inset-x-0 top-0 h-px bg-accent" aria-hidden="true" />
          <FiCheckCircle className="mb-4 h-8 w-8 text-accent" aria-hidden="true" />
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">Nachricht verschickt</h2>
          <p className="mt-2 mb-6 text-[15px] text-muted">
            Vielen Dank für deine Nachricht. Ich melde mich zeitnah bei dir.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
          >
            Weitere Nachricht schreiben
          </button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="relative space-y-6 border border-line bg-surface p-6 sm:p-8"
        >
          {/* Honeypot: für Menschen unsichtbar, Bots füllen ihn aus */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website (bitte leer lassen)</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </div>

          <div className="!mt-0">
            <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Name <span className="text-accent">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClasses}
              placeholder="Max Mustermann"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-xs text-[#ff8a7a]">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              E-Mail <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClasses}
              placeholder="max@beispiel.de"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-xs text-[#ff8a7a]">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Betreff
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              maxLength={150}
              value={form.subject}
              onChange={(e) => update('subject', e.target.value)}
              className={inputClasses}
              placeholder="Worum geht es?"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1.5 text-xs text-[#ff8a7a]">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Nachricht <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={7}
              minLength={10}
              maxLength={5000}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className={`${inputClasses} resize-y`}
              placeholder="Deine Nachricht …"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            <div className="flex justify-between items-start gap-4 mt-1.5">
              {errors.message ? (
                <p id="message-error" className="text-xs text-[#ff8a7a]">{errors.message}</p>
              ) : (
                <span />
              )}
              <span className="shrink-0 font-mono text-xs text-faint">{form.message.length}/5000</span>
            </div>
          </div>

          <div>
            <label htmlFor="privacy" className="flex items-start gap-3 cursor-pointer group">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                required
                checked={form.privacy}
                onChange={(e) => update('privacy', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#ff6a2b]"
                aria-invalid={Boolean(errors.privacy)}
                aria-describedby={errors.privacy ? 'privacy-error' : undefined}
              />
              <span className="text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-fg">
                Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
                verarbeitet werden. Details dazu in der{' '}
                <Link href="/datenschutz" className="text-fg underline decoration-accent/60 underline-offset-2 hover:text-accent">
                  Datenschutzerklärung
                </Link>
                . <span className="text-accent">*</span>
              </span>
            </label>
            {errors.privacy && (
              <p id="privacy-error" className="mt-1.5 text-xs text-[#ff8a7a]">{errors.privacy}</p>
            )}
          </div>

          {status === 'error' && errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-3 border border-[#5a2a22] bg-[#1a0f0d] px-4 py-3"
            >
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a7a]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-[#ffb3a8]">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex w-full items-center justify-center gap-2 bg-fg px-5 py-3.5 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending' ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas/30 border-t-canvas" />
                Wird gesendet …
              </>
            ) : (
              <>
                <FiSend className="h-4 w-4" aria-hidden="true" />
                Nachricht senden
              </>
            )}
          </button>

          <p className="text-center font-mono text-[11px] text-faint">
            Mit <span className="text-accent">*</span> markierte Felder sind Pflichtfelder.
          </p>
        </motion.form>
      )}
    </LegalPage>
  );
}
