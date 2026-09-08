'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo, socialLinks, uiText } from '@/data/content';
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  Radio,
} from 'lucide-react';

export default function ContactSection() {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject || `Message from ${senderName || 'Portfolio Visitor'}`
    );
    const bodyContent = encodeURIComponent(
      `${message}\n\n---\nSender: ${senderName || 'Anonymous'}`
    );
    window.location.href = `mailto:${socialLinks.email}?subject=${mailSubject}&body=${bodyContent}`;
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-12 text-center items-center">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-cyan-400 tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-sm bg-sky-500 dark:bg-cyan-400" />
            {uiText.contact.sectionTag[lang]}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {uiText.contact.title[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
            {uiText.contact.subtitle[lang]}
          </p>
        </div>

        {/* Social Links Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {/* Email button */}
          <a
            href={`mailto:${socialLinks.email}`}
            className="hud-glass hud-glass-hover rounded-xl p-4 sm:p-5 flex flex-col items-center text-center group border-sky-300/60 dark:border-cyan-500/20 shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 flex items-center justify-center text-sky-600 dark:text-cyan-400 group-hover:scale-110 transition-transform mb-2">
              <Mail className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Email</span>
            <span className="font-mono text-[10px] text-sky-700 dark:text-cyan-300/80 truncate max-w-full mt-0.5">
              canemircan38@gmail.com
            </span>
          </a>

          {/* LinkedIn button */}
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-glass hud-glass-hover rounded-xl p-4 sm:p-5 flex flex-col items-center text-center group border-blue-300/60 dark:border-blue-500/20 shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform mb-2">
              <Linkedin className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white">LinkedIn</span>
            <span className="font-mono text-[10px] text-blue-700 dark:text-blue-300/80 truncate max-w-full mt-0.5">
              /in/emircan-can
            </span>
          </a>

          {/* GitHub button */}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-glass hud-glass-hover rounded-xl p-4 sm:p-5 flex flex-col items-center text-center group border-slate-300 dark:border-slate-700 shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:scale-110 transition-transform mb-2">
              <Github className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white">GitHub</span>
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 truncate max-w-full mt-0.5">
              @emir-canswe
            </span>
          </a>

          {/* Instagram button */}
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-glass hud-glass-hover rounded-xl p-4 sm:p-5 flex flex-col items-center text-center group border-pink-300/60 dark:border-pink-500/20 shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-950/60 border border-pink-300 dark:border-pink-500/30 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform mb-2">
              <Instagram className="w-5 h-5" />
            </div>
            <span className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Instagram</span>
            <span className="font-mono text-[10px] text-pink-700 dark:text-pink-300/80 truncate max-w-full mt-0.5">
              @emir10_can
            </span>
          </a>
        </div>

        {/* Mailto Message Composer Area */}
        <div className="hud-glass rounded-2xl p-6 sm:p-8 border-slate-200 dark:border-cyan-500/25 hud-corner-brackets shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
              <div>
                <h3 className="font-sans font-bold text-base text-slate-900 dark:text-white">
                  {uiText.contact.quickMessageTitle[lang]}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {uiText.contact.quickMessageDesc[lang]}
                </p>
              </div>
            </div>

            <button
              onClick={copyEmailToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-cyan-500/30 bg-white dark:bg-slate-900/80 text-sky-700 dark:text-cyan-300 hover:border-sky-500 dark:hover:border-cyan-400 text-xs font-mono transition-all self-start sm:self-auto shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">{uiText.contact.emailCopied[lang]}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{uiText.contact.copyEmail[lang]}</span>
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleMailtoSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                  {uiText.contact.yourName[lang]}
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex (Engineering Lead)"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 focus:border-sky-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-sky-500 dark:focus:ring-cyan-400 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                  {uiText.contact.yourSubject[lang]}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Software Engineer Opportunity"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 focus:border-sky-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-sky-500 dark:focus:ring-cyan-400 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                {uiText.contact.yourMessage[lang]}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Emircan, we saw your SENTINEL OS and test automation work..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 focus:border-sky-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-sky-500 dark:focus:ring-cyan-400 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all font-sans resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <Radio className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                <span>Direct Mailto Protocol • 100% Client-Side</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white dark:text-slate-950 font-bold font-sans text-sm tracking-wide shadow-md dark:shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{uiText.contact.sendAction[lang]}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
