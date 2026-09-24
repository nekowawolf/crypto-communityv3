'use client';

import { useState, useEffect, useRef } from 'react';
import BackButton from '@/components/BackButton';
import { toast } from 'sonner';
import { fetchCommunityData, submitCommunity } from '@/services/communityService';
import { Turnstile } from '@marsidev/react-turnstile';
import { Spinner } from '@/components/ui/spinner';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

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
      return;
    }

    const urlRegex = /^https?:\/\/.+$/;
    if (!urlRegex.test(communityLink)) {
      setUrlExists(null);
      setIsCheckingUrl(false);
      return;
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

    const urlRegex = /^https?:\/\/.+$/;
    if (!urlRegex.test(communityLink)) {
      toast.error('Invalid URL format for Community Link');
      return;
    }

    if (urlExists === true) {
      toast.error('This community is already listed.');
      return;
    }

    if (!name) {
      toast.error('Name (Added by) is required.');
      return;
    }

    if (link) {
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
        <BackButton fallbackUrl="/activity" label="Back to Activity" />

        <div className="mt-8 mb-12 flex flex-col items-start text-left space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight flex items-center">
            /add-community
          </h1>
          <p className="text-fill-color/60 text-sm max-w-full sm:max-w-xl leading-relaxed">
            Know a great crypto community that belongs here? Submit it below. Help us build the most comprehensive directory of crypto communities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-fill-color">Community Link <span className="text-red-500">*</span></label>
              {isCheckingUrl && <Spinner className="w-4 h-4 text-blue-500" />}
            </div>
            <div className="relative">
              <input
                type="url"
                value={communityLink}
                onChange={(e) => setCommunityLink(e.target.value)}
                placeholder="https://t.me/community"
                className={`w-full px-4 py-3 bg-[rgba(var(--fill-color-rgb),0.03)] border rounded-xl text-fill-color focus:outline-none transition-colors ${ urlExists === true ? 'border-red-500/50 focus:border-red-500' : urlExists === false ? 'border-green-500/50 focus:border-green-500' : 'border-[var(--border-divider)] focus:border-blue-500' }`}
              />
              {urlExists === true && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                  <AiOutlineExclamationCircle 
                    className="w-5 h-5 text-red-500 cursor-pointer" 
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                  />
                  {showTooltip && (
                    <div 
                      ref={tooltipRef}
                      className="absolute right-0 top-full mt-2 w-48 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-500 z-10 shadow-lg backdrop-blur-sm"
                    >
                      This URL is already submitted or listed in the directory.
                    </div>
                  )}
                </div>
              )}
            </div>
            {urlExists === false && (
              <p className="text-xs text-green-500 mt-1">This URL is available to submit.</p>
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