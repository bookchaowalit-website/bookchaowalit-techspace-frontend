'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  children: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  language = 'text',
  children,
  title,
  showLineNumbers = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.trim().split('\n');

  return (
    <Card className="condensed-card overflow-hidden mb-6">
      {/* Header */}
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
          <div className="flex items-center space-x-2">
            {title && (
              <span className="text-sm font-semibold text-foreground">{title}</span>
            )}
            <span className="font-mono text-xs text-muted-foreground uppercase">
              {language}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0 hover:shadow-sm transition"
          >
            {copied ? (
              <Check className="h-3 w-3 text-primary" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      )}

      {/* Code Content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code className="text-foreground">
            {showLineNumbers ? (
              lines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-muted-foreground mr-4 select-none w-8 text-right">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              children.trim()
            )}
          </code>
        </pre>
      </div>
    </Card>
  );
}
