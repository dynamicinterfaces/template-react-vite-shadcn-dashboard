import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewApp } from './preview-app';

const params = new URLSearchParams(window.location.search);
const componentPath = params.get('component') || document.documentElement.dataset.componentPath || '';
const view = (params.get('view') || 'preview') as 'preview' | 'properties';
const storyParam = params.get('story') || null;

// Check if preview-shell exists — the plugin sets a data attribute on <html>
const hasShell = document.documentElement.dataset.hasShell === 'true';

const root = createRoot(document.getElementById('preview-root')!);
root.render(
  <PreviewApp
    componentPath={componentPath}
    view={view}
    storyParam={storyParam}
    hasShell={hasShell}
  />,
);

