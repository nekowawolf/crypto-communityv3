'use client';
import { useState, useEffect, useRef } from 'react';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';
import { fetchCommunityData, submitCommunity } from '@/services/communityService';
import { Turnstile } from '@marsidev/react-turnstile';
import { Spinner } from '@/components/ui/spinner';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LiaTimesCircleSolid } from 'react-icons/lia';
const isValidPlatform = (url: string) => {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const validDomains = [
      'discord.com', 'discord.gg',
      't.me', 'telegram.me', 'telegram.org',
      'whatsapp.com', 'wa.me',
      'facebook.com', 'fb.com', 'fb.me',
      'reddit.com'
    ];
    return validDomains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
  } catch (e) {
    return false;
  }
};
export default function AddCommunityClient() {
  const [communityLink, setCommunityLink] = useState('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const turnstileRef = useRef<any>(null);
  const [existingUrls, setExistingUrls] = useState<string[]>([]);
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [urlExists, setUrlExists] = useState<boolean | null>(null);
  const [platformError, setPlatformError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCommunityData();
        const urls = data.map(r => (r.link || '').toLowerCase().replace(/\/$/, ''));
        setExistingUrls(urls);
      } catch (err) {
        console.error('Failed to load existing data for validation', err);
      }
    };
    loadData();
  }, []);
  useEffect(() => {
    setShowTooltip(false);
    if (!communityLink) {
      setUrlExists(null);
      setIsCheckingUrl(false);
      setPlatformError(null);
      return;
    }
    const urlRegex = /^https?:\/\/.+$/;
    if (!urlRegex.test(communityLink)) {
      setUrlExists(null);
      setIsCheckingUrl(false);
      setPlatformError(null);
      return;
    }
    if (!isValidPlatform(communityLink)) {
      setPlatformError("URL must be from Discord, Telegram, WhatsApp, Facebook, or Reddit");
      setUrlExists(null);
      setIsCheckingUrl(false);
      return;
    } else {
      setPlatformError(null);
    }
    setIsCheckingUrl(true);
    const timer = setTimeout(() => {
      const cleanUrl = communityLink.toLowerCase().replace(/\/$/, '');
      const exists = existingUrls.includes(cleanUrl);
      setUrlExists(exists);
      setIsCheckingUrl(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [communityLink, existingUrls]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!communityLink) {
      toast.error('Community Link is required.');
      return;
    }
    if (!!platformError || urlExists === true) return;
    if (!name) {
      toast.error('Name (Added by) is required.');
      return;
    }
    if (link) {
      const urlRegex = /^https?:\/\/.+$/;
      if (!urlRegex.test(link)) {
        toast.error('Invalid Link URL format');
        return;
      }
    }
    if (!turnstileToken) {
      toast.error('Please verify that you are a human.');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitCommunity(communityLink, name, link, turnstileToken);
      toast.success('Community submitted successfully.');
      setCommunityLink('');
      setName('');
      setLink('');
      setTurnstileToken('');
      setUrlExists(null);
      turnstileRef.current?.reset();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="flex-grow pt-36 pb-12 min-h-screen body-color text-fill-color px-4 sm:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <BackButton fallbackUrl="/activity" label="Back to Activity" forceFallback />
        <div className="mt-8 mb-12 flex flex-col items-start text-left space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight flex items-center">
            /add-community
          </h1>
          <p className="text-fill-color/60 text-sm max-w-full sm:max-w-xl leading-relaxed">
            Know a great crypto community that belongs here? Submit it below. Help us build the most comprehensive directory of crypto communities.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-fill-color">Community Link <span className="text-red-500">*</span></label>
              {isCheckingUrl && <Spinner className="w-3.5 h-3.5 text-blue-500" />}
              {!isCheckingUrl && urlExists !== null && (
                <div className="relative flex items-center gap-1.5" ref={tooltipRef}>
                  {urlExists ? (
                    <LiaTimesCircleSolid className="w-[17px] h-[17px] text-red-500" />
                  ) : (
                    <FaRegCircleCheck className="w-3.5 h-3.5 text-green-500" />
                  )}
                  <button 
                    type="button"
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="text-fill-color/50 hover:text-fill-color cursor-pointer transition-colors outline-none"
                  >
                    <AiOutlineExclamationCircle className="w-4 h-4" />
                  </button>
                  {showTooltip && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-max bg-[var(--card-color)] border border-[var(--border-divider)] px-3 py-2 rounded-lg shadow-lg z-10 text-xs font-medium animate-in fade-in zoom-in duration-200">
                      {urlExists ? "This community is already listed." : "This community is not listed yet."}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <input
                type="url"
                value={communityLink}
                onChange={(e) => setCommunityLink(e.target.value)}
                placeholder="https://t.me/community"
                className={`w-full px-4 py-3 bg-[rgba(var(--fill-color-rgb),0.03)] border rounded-xl text-fill-color focus:outline-none transition-colors ${
                  platformError || urlExists === true 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : urlExists === false
                      ? 'border-green-500/50 focus:border-green-500'
                      : 'border-[var(--border-divider)] focus:border-blue-500'
                }`}
              />
            </div>
            {platformError && (
              <p className="text-xs text-red-500 mt-1">{platformError}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-fill-color">Name (added by) <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or username"
              className="w-full px-4 py-3 bg-[rgba(var(--fill-color-rgb),0.03)] border border-[var(--border-divider)] rounded-xl text-fill-color focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-fill-color">Link <span className="text-fill-color/40 font-normal">(optional)</span></label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Your website, portfolio, or social link"
              className="w-full px-4 py-3 bg-[rgba(var(--fill-color-rgb),0.03)] border border-[var(--border-divider)] rounded-xl text-fill-color focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-start gap-5">
            <div className="order-1 sm:order-2 flex-shrink-0 flex justify-center w-full sm:w-auto">
               <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken('')}
                  onExpire={() => setTurnstileToken('')}
               />
            </div>
            <button
              type="submit"
              disabled={!turnstileToken || isSubmitting}
              className="order-2 sm:order-1 px-6 py-3 rounded-xl font-medium text-[15px] text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center cursor-pointer w-full sm:w-fit"
            >
              {isSubmitting ? <Spinner className="w-5 h-5 text-white" /> : 'Add Community'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}