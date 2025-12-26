import React, { useState } from "react";

const useReferralShareCard = ({ link, onShareSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  const openShareWindow = (url) => {
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
};

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      onShareSuccess?.("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async (channel) => {
    setLoadingShare(true);
    try {
      if (navigator.share && channel === "native") {
        await navigator.share({ title: "Join me on Flowva Hub", text: "Sign up and earn points:", url: link });
        onShareSuccess?.("native");
      } else {
        let url;
        if (channel === "facebook") {
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
        } else if (channel === "twitter") {
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent("Join me on Flowva Hub")}&url=${encodeURIComponent(link)}`;
        } else if (channel === "linkedin") {
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
        } else if (channel === "whatsapp") {
          url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${link}`)}`;
        }
        if (url) openShareWindow(url);
        onShareSuccess?.(channel);
      }
    } catch {
      // ignore: global handler will surface errors
    } finally {
      setLoadingShare(false);
    }
  };

  return {
    copied,
    loadingShare,
    handleCopy,
    handleShare,
    openShareWindow,
  }
}

export default useReferralShareCard