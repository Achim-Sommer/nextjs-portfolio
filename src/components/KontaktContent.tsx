'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Footer from '@/components/Footer';

type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
  privacy: false,
  website: '', // Honeypot
};

const inputClasses = `
  w-full rounded-xl px-4 py-3
  bg-white/[0.04] border border-white/[0.08]
  text-white placeholder-gray-600 text-sm
  focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06]
  transition-colors duration-300
`;

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
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zur Startseite
            </Link>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-3">Kontakt</h1>
            <p className="text-gray-400 mb-10 text-sm sm:text-base leading-relaxed">
              Schreib mir gerne über das Formular – ich melde mich so schnell wie möglich zurück.
              Alternativ erreichst du mich direkt per E-Mail unter{' '}
              <a href="mailto:imprint@achimsommer.com" className="text-blue-400 hover:text-blue-300">
                imprint@achimsommer.com
              </a>
              .
            </p>
          </motion.div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.06] p-8 text-center"
            >
              <FiCheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Nachricht verschickt</h2>
              <p className="text-gray-400 text-sm mb-6">
                Vielen Dank für deine Nachricht. Ich melde mich zeitnah bei dir.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
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
              className="rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 space-y-5"
            >
              {/* Honeypot — für Menschen unsichtbar, Bots füllen ihn aus */}
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

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Name <span className="text-blue-400">*</span>
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
                  <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  E-Mail <span className="text-blue-400">*</span>
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
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
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
                  <p id="subject-error" className="mt-1.5 text-xs text-red-400">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Nachricht <span className="text-blue-400">*</span>
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
                    <p id="message-error" className="text-xs text-red-400">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-gray-600 font-mono shrink-0">{form.message.length}/5000</span>
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
                    className="mt-0.5 w-4 h-4 shrink-0 rounded border-white/20 bg-white/[0.04] text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer"
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={errors.privacy ? 'privacy-error' : undefined}
                  />
                  <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                    Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage
                    verarbeitet werden. Details dazu in der{' '}
                    <Link href="/datenschutz" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                      Datenschutzerklärung
                    </Link>
                    . <span className="text-blue-400">*</span>
                  </span>
                </label>
                {errors.privacy && (
                  <p id="privacy-error" className="mt-1.5 text-xs text-red-400">{errors.privacy}</p>
                )}
              </div>

              {status === 'error' && errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.07] px-4 py-3"
                >
                  <FiAlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-300 leading-relaxed">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="
                  w-full inline-flex items-center justify-center gap-2
                  rounded-xl px-5 py-3.5
                  bg-blue-600 hover:bg-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  text-white text-sm font-semibold
                  transition-colors duration-300
                "
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Wird gesendet …
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Nachricht senden
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-600 text-center leading-relaxed">
                Mit <span className="text-blue-400">*</span> markierte Felder sind Pflichtfelder.
              </p>
            </motion.form>
          )}

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500">
            <FiMail className="w-4 h-4" />
            <span>Lieber direkt? </span>
            <a href="mailto:imprint@achimsommer.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
              imprint@achimsommer.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
